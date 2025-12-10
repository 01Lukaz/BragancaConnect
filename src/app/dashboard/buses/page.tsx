
'use client';

import { PageTitle } from '@/components/layout/page-title';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { busRoutes, RouteKey } from '@/lib/bus-routes';

const BusMap = dynamic(() => import('@/components/bus-map'), { ssr: false });


function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000;
    const toRad = (d: number) => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + 
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

export default function BusesPage() {
    const [isClient, setIsClient] = useState(false);
    const [nextStops, setNextStops] = useState<Array<{ name: string; time: number }>>([]);
    const [currentStopIndex, setCurrentStopIndex] = useState(0);
    const [busInfo, setBusInfo] = useState({ lastStop: '', nextStop: '', timeToNext: 0 });

    const [selectedRoute, setSelectedRoute] = useState<RouteKey>('U1');
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const route = busRoutes[selectedRoute];
        if (!route) return;
        const stops = route.stops;
        
        if (currentStopIndex >= 0 && currentStopIndex < stops.length) {
            const next = [];
            
            for (let i = 1; i <= 5; i++) {
                const idx = (currentStopIndex + i) % stops.length;
                const nextStop = stops[idx];
                
                let totalDistance = 0;
                for (let j = 0; j < i; j++) {
                    const fromIdx = (currentStopIndex + j) % stops.length;
                    const toIdx = (currentStopIndex + j + 1) % stops.length;
                    const from = stops[fromIdx];
                    const to = stops[toIdx];
                    totalDistance += calculateDistance(from.lat, from.lng, to.lat, to.lng);
                }
                
                const busSpeed = 6.11;
                const timeToArrive = Math.ceil(totalDistance / busSpeed);
                
                next.push({ 
                    name: nextStop.nome,
                    time: timeToArrive 
                });
            }
            
            setNextStops(next);
        }
    }, [currentStopIndex, selectedRoute]);

    return (
        <div>
            <PageTitle title="Autocarros em Tempo Real" />
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
                <aside className="flex flex-col gap-4">
                    <div className="px-4 py-3 flex gap-2 items-center border-2 border-blue-600 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                        {Object.entries(busRoutes).map(([key, route]) => (
                            <Button
                                key={key}
                                onClick={() => {
                                    setSelectedRoute(key as RouteKey);
                                    setCurrentStopIndex(0);
                                }}
                                variant={selectedRoute === key ? 'default' : 'outline'}
                                size="sm"
                            >
                                {key}
                            </Button>
                        ))}
                    </div>

                    <div className="px-4 py-3 bg-white dark:bg-slate-950 rounded-lg border space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">ÚLTIMA PARADA</p>
                                <p className="font-bold text-sm text-blue-600 truncate">{busInfo.lastStop || '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">PRÓXIMA PARADA</p>
                                <p className="font-bold text-sm text-gray-800 truncate">{busInfo.nextStop || '—'}</p>
                            </div>
                        </div>
                        <div className="text-center bg-orange-100 dark:bg-orange-950/30 rounded p-2">
                            <p className="text-xs text-orange-600 dark:text-orange-400">⏱ {busInfo.timeToNext} seg</p>
                        </div>
                    </div>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Próximas Paradas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {nextStops.length === 0 ? (
                                <p className="text-sm text-gray-500">Carregando paradas...</p>
                            ) : (
                                nextStops.map((stop, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                                            <span className="text-sm font-bold text-blue-600">{idx + 1}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm truncate">{stop.name}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {Math.floor(stop.time / 60)} min {stop.time % 60} seg
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </aside>
                <main className="w-full">
                    <Card className="shadow-lg h-full">
                        <CardHeader>
                            <CardTitle>Mapa em Tempo Real</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-full">
                            <div className="h-full w-full rounded-b-lg bg-muted flex items-center justify-center min-h-[600px] lg:min-h-0">
                                {isClient && <BusMap onStopChange={(idx) => setCurrentStopIndex(idx)} routeKey={selectedRoute} onBusInfoChange={setBusInfo} />}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
