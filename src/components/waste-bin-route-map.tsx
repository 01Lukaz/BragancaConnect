
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { collectionPoints } from '@/lib/collection-points';

// The component accepts a list of bins; if not provided, fall back to collectionPoints
// bins should be an array of { id, location, coord, status }

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

export default function WasteBinRouteMap({ className, highlightName, bins }: { className?: string; highlightName?: string; bins?: Array<{ id?: string; location: string; coord: [number, number]; status?: string }> }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const stops = (bins && bins.length > 0)
            ? bins.map(b => ({ name: b.location, coord: b.coord, status: b.status }))
            : collectionPoints.map(p => ({ name: p.name, coord: p.coord, status: p.status }));

        const routePolyline: [number, number][] = stops.map(s => s.coord);
        if (routePolyline.length > 0) routePolyline.push(routePolyline[0]); // close loop

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current).setView([41.8061, -6.7569], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Icons / markers
        const truckIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448633.png',
            iconSize: [38, 38], iconAnchor: [19, 19],
        });

        // Draw route and stops
        const routeLine = L.polyline(routePolyline, { weight: 4, opacity: .8, color: '#16a34a' }).addTo(mapRef.current);
        if (routePolyline.length > 0) mapRef.current.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

        // store markers to allow highlighting
        const stopMarkers: Record<string, L.Layer> = {};

        const getColorForStatus = (status?: string) => {
            switch ((status || '').toLowerCase()) {
                case 'cheio': return '#dc2626'; // red
                case 'médio':
                case 'medio': return '#f59e0b'; // amber
                case 'vazio': return '#10b981'; // green
                default: return '#64748b';
            }
        };

        stops.forEach(s => {
            const color = getColorForStatus(s.status);
            const m = L.circleMarker(s.coord, { radius: 8, fillColor: color, color: '#ffffff', weight: 1, fillOpacity: 1 }).addTo(mapRef.current!).bindTooltip(`${s.name} (${s.status ?? 'N/A'})`);
            stopMarkers[s.name] = m;
        });

        // If a highlightName was provided, try to find and highlight that stop
        if (highlightName) {
            const targetName = decodeURIComponent(highlightName as string).toLowerCase();
            const target = stops.find(s => s.name.toLowerCase() === targetName || s.name.toLowerCase().includes(targetName) || targetName.includes(s.name.toLowerCase()));
            if (target) {
                const circle = L.circle(target.coord, { radius: 40, color: '#f97316', weight: 3, fillOpacity: 0.15 }).addTo(mapRef.current);
                L.popup({ closeButton: true, closeOnClick: true })
                    .setLatLng(target.coord)
                    .setContent(`<b>${target.name}</b><br/><small>Status: ${target.status ?? 'N/A'}</small>`)
                    .openOn(mapRef.current);
                mapRef.current.setView(target.coord, 16);
            }
        }

        // Truck simulation
        const truckState = { seg: 0, t: 0, speed: 5.5 }; // ~20 km/h
        const truckMarker = L.marker(routePolyline[0], { icon: truckIcon }).addTo(mapRef.current);
        const segLens = routePolyline.length > 1 ? routePolyline.slice(0, -1).map((p, i) => segmentDistanceMeters(p, routePolyline[i + 1]!)) : [];

        let lastTime = performance.now();
        let animationFrameId: number;

        const animate = (now: number) => {
            if(!mapRef.current) return;
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            let advance = truckState.speed * dt; // meters

            while (advance > 0 && segLens.length > 0) {
                const currentSeg = truckState.seg % segLens.length;
                const segLen = segLens[currentSeg] || 0;
                if (segLen === 0) {
                    truckState.seg = (truckState.seg + 1) % (routePolyline.length -1);
                    truckState.t = 0;
                    continue;
                }
                const rem = (1 - truckState.t) * segLen;

                if (advance < rem) {
                    truckState.t += advance / segLen;
                    advance = 0;
                } else {
                    advance -= rem;
                    truckState.seg = (truckState.seg + 1) % (routePolyline.length - 1);
                    truckState.t = 0;
                }
            }
            
            const currentPoint = routePolyline[truckState.seg];
            const nextPoint = routePolyline[truckState.seg + 1];

            if (currentPoint && nextPoint) {
                 const newPos = interpolateLatLng(currentPoint, nextPoint, truckState.t);
                 truckMarker.setLatLng(newPos);
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

    }, []); 

    return <div ref={mapContainerRef} className={cn("h-full w-full rounded-b-lg", className)} style={{ zIndex: 0 }}></div>;
}
