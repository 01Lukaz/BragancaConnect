
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
import { Button } from '@/components/ui/button';
import { MapPlaceholder } from '@/components/map-placeholder';
import dynamic from 'next/dynamic';

const WasteBinChart = dynamic(() => import('@/components/waste-bin-chart'), { ssr: false });

export default function DashboardPage() {
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
                <p className="font-semibold">Linha 3A</p>
                <p className="text-sm text-muted-foreground">Dest: Sé</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">5 min</p>
                <p className="text-xs text-accent-foreground flex items-center gap-1"><Circle fill="hsl(var(--accent))" className="h-2 w-2 text-accent" /> A tempo</p>
              </div>
            </div>
             <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Linha 1</p>
                <p className="text-sm text-muted-foreground">Dest: Hospital</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">12 min</p>
                 <p className="text-xs text-accent-foreground flex items-center gap-1"><Circle fill="hsl(var(--accent))" className="h-2 w-2 text-accent" /> A tempo</p>
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
            <CardTitle>Mapa da Cidade</CardTitle>
            <CardDescription>
              Vista geral dos serviços inteligentes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapPlaceholder />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
