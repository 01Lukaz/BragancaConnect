'use client';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Data extracted from maps.html
const stops = [
    { nome: "Rodoviária", lat: 41.809415, lng: -6.760639 },
    { nome: "Tribunal", lat: 41.807603, lng: -6.758991 },
    { nome: "Rua 5 de Outubro", lat: 41.806847, lng: -6.758414 },
    { nome: "Rua Alexandre Herculano 1", lat: 41.805292, lng: -6.758664 },
    { nome: "Rua Alexandre Herculano 2", lat: 41.803494, lng: -6.759249 },
    { nome: "Flor da Ponte", lat: 41.800309, lng: -6.761267 },
    { nome: "Escola Agraria", lat: 41.796821, lng: -6.764754 },
    { nome: "Escola superior de Tecnologia", lat: 41.795326, lng: -6.767155 },
    { nome: "Planatorio", lat: 41.792746, lng: -6.769520 },
    { nome: "Avenida das Cantarias 1", lat: 41.790137, lng: -6.771144 },
    { nome: "Avenida das Cantarias", lat: 41.787688, lng: -6.773416 },
    { nome: "Rua Arquitecto Viana de Lima 1", lat: 41.788376, lng: -6.775767 },
    { nome: "Rua Arquitecto Viana de Lima 2", lat: 41.790521, lng: -6.779245 },
    { nome: "Rua Coronal Teófilo de Morais 1", lat: 41.791228, lng: -6.784129 },
    { nome: "Rua Coronel Teófilo de Morais 2", lat: 41.788297, lng: -6.780605 },
    { nome: "Rua Coronel Teófilo de Morais 3", lat: 41.787320, lng: -6.778463 },
    { nome: "Avenida das Cantarias 2", lat: 41.785224, lng: -6.775720 },
    { nome: "Avenida das Cantaias 3", lat: 41.783334, lng: -6.777509 },
    { nome: "Nerba", lat: 41.780167, lng: -6.779058 },
    { nome: "Avenida das CAntarias 4", lat: 41.780293, lng: -6.778807 },
    { nome: "Avenida das Cantarias 5", lat: 41.783100, lng: -6.777420 },
    { nome: "Avenida das Cantarias 6", lat: 41.784864, lng: -6.775736 },
    { nome: "Polidesportivo IPB", lat: 41.787401, lng: -6.773324 },
    { nome: "Avenida das Cantarias 7", lat: 41.789334, lng: -6.771464 },
    { nome: "Planatorio (Volta)", lat: 41.792702, lng: -6.769343 },
    { nome: "Escola Superior de TEcnologia (Volta)", lat: 41.795073, lng: -6.767225 },
    { nome: "Rua Artur Mirandela 1", lat: 41.794060, lng: -6.765672 },
    { nome: "Rua Artur Mirandela 2", lat: 41.794202, lng: -6.763812 },
    { nome: "Rua do Vale Churido", lat: 41.793875, lng: -6.761712 },
    { nome: "Rua do Vale Churido 2", lat: 41.794947, lng: -6.760367 },
    { nome: "Rua São João de BRito", lat: 41.798301, lng: -6.759672 },
    { nome: "Flor da Ponte (Volta)", lat: 41.800118, lng: -6.760573 },
    { nome: "Rua da República", lat: 41.805793, lng: -6.757107 },
    { nome: "Avenida João da Cruz", lat: 41.807384, lng: -6.758440 }
].map(p => ({ name: p.nome, coord: [p.lat, p.lng] as [number, number] }));

const routePolyline = stops.map(s => s.coord);
if (routePolyline.length > 0) {
    routePolyline.push(routePolyline[0]); // Close the loop
}

const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -12],
});

const stopIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
});


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

const segLens = routePolyline.slice(0, -1).map((p, i) => segmentDistanceMeters(p, routePolyline[i + 1]!));

const BusSimulator = () => {
    const map = useMap();
    const [busPosition, setBusPosition] = useState<[number, number] | null>(null);
    const busState = useRef({ seg: 0, t: 0, speed: 6.11 });
    const lastTime = useRef(performance.now());
    
    useEffect(() => {
        let animationFrameId: number;

        const animate = (now: number) => {
            const dt = (now - lastTime.current) / 1000;
            lastTime.current = now;

            const state = busState.current;
            let advance = state.speed * dt; // meters

            while (advance > 0 && segLens.length > 0) {
                const segLen = segLens[state.seg] || 0;
                if (segLen === 0) {
                    state.seg = (state.seg + 1) % (routePolyline.length - 1);
                    state.t = 0;
                    continue;
                }
                const rem = (1 - state.t) * segLen;

                if (advance < rem) {
                    state.t += advance / segLen;
                    advance = 0;
                } else {
                    advance -= rem;
                    state.seg = (state.seg + 1) % (routePolyline.length - 1);
                    state.t = 0;
                }
            }
            
            const currentPoint = routePolyline[state.seg];
            const nextPoint = routePolyline[state.seg + 1];

            if(currentPoint && nextPoint) {
                 const newPos = interpolateLatLng(currentPoint, nextPoint, state.t);
                 setBusPosition(newPos);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        if(routePolyline.length > 1) {
            const bounds = L.latLngBounds(routePolyline);
            map.fitBounds(bounds, { padding: [40, 40] });
        }
    }, [map]);


    return busPosition ? <Marker position={busPosition} icon={busIcon} /> : null;
}

export default function BusMap({ className }: { className?: string }) {
     const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient &&
                <MapContainer
                    center={[41.8061, -6.7569]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className={cn("h-full w-full", className)}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Polyline positions={routePolyline} color="blue" weight={4} opacity={0.8} />
                    {stops.map(stop => (
                        <Marker key={stop.name} position={stop.coord} icon={stopIcon}>
                            <Tooltip>{stop.name}</Tooltip>
                        </Marker>
                    ))}
                    <BusSimulator />
                </MapContainer>
            }
        </>
    );
}

    