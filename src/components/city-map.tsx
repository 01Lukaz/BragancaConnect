'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { busRoutes } from '@/lib/bus-routes';
import { collectionPoints } from '@/lib/collection-points';

// Combine all bus stops from routes and dedupe by coordinates
function gatherBusStops() {
  const seen = new Map<string, { name: string; coord: [number, number] }>();
  Object.values(busRoutes).forEach(route => {
    route.stops.forEach(s => {
      const key = `${s.lat.toFixed(6)},${s.lng.toFixed(6)}`;
      if (!seen.has(key)) seen.set(key, { name: s.nome, coord: [s.lat, s.lng] });
    });
  });
  return Array.from(seen.values());
}

export default function CityMap({ className, satellite = true }: { className?: string; satellite?: boolean }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Initialize map centered on the city
    mapRef.current = L.map(mapContainerRef.current).setView([41.8061, -6.7569], 13);

    // Satellite tiles (Esri World Imagery) or default OSM
    const tileUrl = satellite
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: satellite
        ? 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Bus stop markers
    const busStops = gatherBusStops();
    const busIcon = L.divIcon({ className: 'bus-stop-icon', html: '<div class="bg-blue-600 rounded-full w-4 h-4 border-2 border-white"></div>', iconSize: [12,12], iconAnchor: [6,6] });
    busStops.forEach(s => {
      L.marker(s.coord, { icon: busIcon }).addTo(mapRef.current!).bindTooltip(s.name);
    });

    // Collection points (reuse same marker style from waste-bin)
    const createColoredIcon = (color: string) => {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${color}" stroke="white" stroke-width="1.5"><path d="M12 2C7.03 2 3 6.03 3 11c0 6.5 9 11 9 11s9-4.5 9-11C21 6.03 16.97 2 12 2zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="12" cy="11" r="2.5" fill="white"/></svg>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
      });
    };

    const statusConfig: Record<string, { color: string; icon: L.DivIcon }> = {
      'Cheio': { color: '#ef4444', icon: createColoredIcon('#ef4444') },
      'Médio': { color: '#f59e0b', icon: createColoredIcon('#f59e0b') },
      'Vazio': { color: '#10b981', icon: createColoredIcon('#10b981') },
    };

    collectionPoints.forEach(p => {
      const cfg = statusConfig[p.status] || statusConfig['Médio'];
      L.marker(p.coord, { icon: cfg.icon }).addTo(mapRef.current!).bindPopup(`<b>${p.name}</b><br>Estado: ${p.status}`);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className={cn(
        'w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-lg overflow-hidden',
        className,
      )}
    />
  );
}
