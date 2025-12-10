
'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { busRoutes, RouteKey } from '@/lib/bus-routes';

// Utility functions
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function interpolateLatLng(a: [number, number], b: [number, number], t: number): [number, number] {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}
function segmentDistanceMeters(a: [number, number], b: [number, number]) {
    const R = 6371000;
    const toRad = (d: number) => d * Math.PI / 180;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

export default function BusMap({ className, onStopChange, routeKey = 'U1', onBusInfoChange }: { className?: string; onStopChange?: (index: number) => void; routeKey?: RouteKey; onBusInfoChange?: (info: { lastStop: string; nextStop: string; timeToNext: number }) => void }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const [busInfo, setBusInfo] = useState({ lastStop: '', nextStop: '', timeToNext: 0 });
    const routeData = busRoutes[routeKey];
    const stops = routeData ? routeData.stops.map(p => ({ name: p.nome, coord: [p.lat, p.lng] as [number, number] })) : [];
    const routePolyline: [number, number][] = stops.map(s => s.coord);
    if (routePolyline.length > 0) {
        routePolyline.push(routePolyline[0]);
    }

    if (!routeData) {
        return <div className={cn('w-full h-full flex items-center justify-center bg-muted', className)}>Rota não encontrada</div>;
    }

    useEffect(() => {
        console.log('Initializing map for route', routeKey);
        if (!mapContainerRef.current) return;

        // if an existing map is present, remove it so we can recreate for new route
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        // Initialize map
        const map = L.map(mapContainerRef.current).setView(routePolyline[0] || [41.8061, -6.7569], 15);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Icons
        const busIcon = L.divIcon({
            className: 'bus-icon',
            html: '<div style="background-color: #FFEB3B; border: 2px solid #FBC02D; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px;">🚌</div>',
            iconSize: [34, 34],
            iconAnchor: [17, 17],
        });
        const stopIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [22, 22], iconAnchor: [11, 11],
        });

        // Draw route and stops
        const routeLine = L.polyline(routePolyline, { weight: 4, opacity: .8, color: routeData.color || 'blue' }).addTo(map);
        if (routePolyline.length > 0) map.fitBounds(routeLine.getBounds(), { padding: [40,40] });
        stops.forEach(s => {
            if (!s.name) return; // do not show unnamed points
            L.marker(s.coord, { icon: stopIcon }).addTo(map).bindTooltip(s.name);
        });

        // Bus simulation
        const busState = { seg: 0, t: 0, speed: 12.22 };
        const busMarker = routePolyline.length > 0 ? L.marker(routePolyline[0], { icon: busIcon }).addTo(map) : L.marker([0,0], { icon: busIcon });
        const segLens = routePolyline.length > 1 ? routePolyline.slice(0, -1).map((p, i) => segmentDistanceMeters(p, routePolyline[i + 1]!)) : [];

        let lastTime = performance.now();
        let animationFrameId: number;

        const animate = (now: number) => {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            let advance = busState.speed * dt; // meters

            while (advance > 0 && segLens.length > 0) {
                const currentSeg = busState.seg % segLens.length;
                const segLen = segLens[currentSeg] || 0;
                if (segLen === 0) {
                    busState.seg = (busState.seg + 1) % (routePolyline.length -1);
                    busState.t = 0;
                    continue;
                }
                const rem = (1 - busState.t) * segLen;

                if (advance < rem) {
                    busState.t += advance / segLen;
                    advance = 0;
                } else {
                    advance -= rem;
                    busState.seg = (busState.seg + 1) % (routePolyline.length - 1);
                    busState.t = 0;
                }
            }
            
            const currentPoint = routePolyline[busState.seg];
            const nextPoint = routePolyline[busState.seg + 1];

            if (currentPoint && nextPoint) {
                 const newPos = interpolateLatLng(currentPoint, nextPoint, busState.t);
                 busMarker.setLatLng(newPos);
                 
                 // Update bus info
                 const nextStopIndex = (busState.seg + 1) % routePolyline.length;
                 const currentStop = stops[busState.seg];
                 const nextStop = stops[nextStopIndex];
                 
                 // Calculate distance remaining to next stop
                 const segLen = segLens[busState.seg] || 0;
                 const distRemaining = (1 - busState.t) * segLen;
                 const timeToNext = Math.ceil(distRemaining / busState.speed);
                 
                 setBusInfo({
                     lastStop: currentStop?.name || 'Parada Desconhecida',
                     nextStop: nextStop?.name || 'Parada Desconhecida',
                     timeToNext: timeToNext
                 });

                 // Notify parent about bus info update
                 if (onBusInfoChange) {
                     onBusInfoChange({
                         lastStop: currentStop?.name || 'Parada Desconhecida',
                         nextStop: nextStop?.name || 'Parada Desconhecida',
                         timeToNext: timeToNext
                     });
                 }

                 // Notify parent component about stop change
                 if (onStopChange) {
                     onStopChange(busState.seg);
                 }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

    }, [routeKey]);

    return (
        <div className="w-full h-full relative">
            <div
                ref={mapContainerRef}
                className={cn("w-full rounded-b-lg", className)}
                style={{ zIndex: 0, minHeight: '360px' }}
            ></div>
        </div>
    );
}
