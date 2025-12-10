
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageTitle } from '@/components/layout/page-title';
import {
  Bus,
  Trash2,
  Leaf,
  ArrowRight,
  Circle,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import dynamic from 'next/dynamic';
import { busRoutes } from '@/lib/bus-routes';

const CityMap = dynamic(() => import('@/components/city-map'), { ssr: false });
const WasteBinChart = dynamic(() => import('@/components/waste-bin-chart'), { ssr: false });

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000;
    const toRad = (d: number) => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + 
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

export default function DashboardPage() {
  const [satellite, setSatellite] = useState(true);
  const [busInfo, setBusInfo] = useState<{ [key: string]: { nextStop: string; timeToNext: number } }>({
    U1: { nextStop: '', timeToNext: 0 },
    U2: { nextStop: '', timeToNext: 0 }
  });

  useEffect(() => {
    // Simulate bus positions - in a real app, this would come from an API
    // For now, we'll show the first stop as next stop with a random time
    const U1Route = busRoutes['U1'];
    const U2Route = busRoutes['U2'];
    
    if (U1Route && U1Route.stops.length > 0) {
      const nextStopU1 = U1Route.stops[1]?.nome || U1Route.stops[0]?.nome || 'Parada Desconhecida';
      setBusInfo(prev => ({
        ...prev,
        U1: { nextStop: nextStopU1, timeToNext: Math.floor(Math.random() * 15) + 2 }
      }));
    }

    if (U2Route && U2Route.stops.length > 0) {
      const nextStopU2 = U2Route.stops[1]?.nome || U2Route.stops[0]?.nome || 'Parada Desconhecida';
      setBusInfo(prev => ({
        ...prev,
        U2: { nextStop: nextStopU2, timeToNext: Math.floor(Math.random() * 15) + 2 }
      }));
    }
  }, []);
  return (
    <div>
      <PageTitle title="Painel de Controlo" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild variant="outline" className="justify-start h-14 text-base">
              <Link href="/dashboard/composting">
                <Trash2 className="mr-4 h-6 w-6 text-primary" /> Registar Compostagem
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Reward Points */}
        <Card className="flex flex-col justify-center bg-accent/20 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-accent-foreground" />
              <span>Pontos de Compostagem</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">1,250 PTS</div>
            <p className="text-sm text-muted-foreground mt-2">
              Continue a reciclar para ganhar mais!
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/dashboard/wallet">Ver Carteira <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Bus Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-6 w-6" />
              <span>Próximos Autocarros</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Linha U1</p>
                <p className="text-sm text-muted-foreground">Dest: {busInfo.U1.nextStop}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{busInfo.U1.timeToNext} min</p>
                <p className="text-xs text-accent-foreground flex items-center gap-1 justify-end"><Circle fill="#2563EB" className="h-2 w-2" style={{ color: '#2563EB' }} /> A tempo</p>
              </div>
            </div>
             <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Linha U2</p>
                <p className="text-sm text-muted-foreground">Dest: {busInfo.U2.nextStop}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{busInfo.U2.timeToNext} min</p>
                <p className="text-xs text-accent-foreground flex items-center gap-1 justify-end"><Circle fill="#DC2626" className="h-2 w-2" style={{ color: '#DC2626' }} /> A tempo</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link href="/dashboard/buses">Ver Mapa de Autocarros <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Waste Bins */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-6 w-6" />
              <span>Contentores de Lixo</span>
            </CardTitle>
            <CardDescription>Estado da rede de contentores</CardDescription>
          </CardHeader>
          <CardContent>
            <WasteBinChart />
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/dashboard/waste-bins">Ver Mapa de Contentores <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Map Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <CardTitle>Mapa da Cidade</CardTitle>
                  <CardDescription>Vista geral dos serviços inteligentes.</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Satélite</span>
                  <Switch checked={satellite} onCheckedChange={(v: boolean) => setSatellite(!!v)} />
                </div>
              </div>
            </CardHeader>
          <CardContent>
            <CityMap satellite={satellite} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
