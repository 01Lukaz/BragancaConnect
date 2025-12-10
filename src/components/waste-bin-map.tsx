
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { collectionPoints } from '@/lib/collection-points';

const createColoredIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="white" stroke-width="1.5"><path d="M12 2C7.03 2 3 6.03 3 11c0 6.5 9 11 9 11s9-4.5 9-11C21 6.03 16.97 2 12 2zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="12" cy="11" r="2.5" fill="white"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const statusConfig = {
  'Cheio': { color: 'hsl(var(--destructive))', icon: createColoredIcon('hsl(var(--destructive))') },
  'Médio': { color: 'hsl(var(--chart-3))', icon: createColoredIcon('hsl(var(--chart-3))') },
  'Vazio': { color: 'hsl(var(--accent))', icon: createColoredIcon('hsl(var(--accent))') },
};


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


        // Add bin markers
        collectionPoints.forEach(bin => {
            const config = statusConfig[bin.status as keyof typeof statusConfig] || statusConfig['Médio'];
            L.marker(bin.coord, { icon: config.icon }).addTo(mapRef.current!).bindPopup(`<b>${bin.name}</b><br>Estado: ${bin.status}`);
        });

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

    }, []); 

    return <div ref={mapContainerRef} className={cn("h-full w-full", className)} style={{ zIndex: 0 }}></div>;
}
