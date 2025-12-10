
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

// Hardcoded coordinates for the organic bins for simplicity
// In a real app, you would fetch these or pass them as props.
const stops = [
    { name: "Avenida Sá Carneiro", coord: [41.8080, -6.7590] as [number, number] },
    { name: "Parque dos Tupis", coord: [41.8050, -6.7540] as [number, number] },
    { name: "Escola Superior de Educação", coord: [41.8000, -6.7600] as [number, number] },
];

const routePolyline: [number, number][] = stops.map(s => s.coord);
if (routePolyline.length > 0) {
    routePolyline.push(routePolyline[0]); // Close the loop
}

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

export default function WasteBinMap({ className }: { className?: string }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current).setView([41.8061, -6.7569], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Icons
        const truckIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/2200/2200331.png',
            iconSize: [38, 38], iconAnchor: [19, 19],
        });
        const stopIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484662.png',
            iconSize: [28, 28], iconAnchor: [14, 28],
        });

        // Draw route and stops
        const routeLine = L.polyline(routePolyline, { weight: 4, opacity: .8, color: '#16a34a' }).addTo(mapRef.current);
        mapRef.current.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
        stops.forEach(s => L.marker(s.coord, { icon: stopIcon }).addTo(mapRef.current!).bindTooltip(s.name));

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

    return <div ref={mapContainerRef} className={cn("h-full w-full rounded-b-lg", className)}></div>;
}
