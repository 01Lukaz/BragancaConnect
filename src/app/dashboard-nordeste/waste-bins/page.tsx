
'use client';

import { PageTitle } from '@/components/layout/page-title';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Trash2, Circle, Route, Clock, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WasteBinMap = dynamic(() => import('@/components/waste-bin-map'), { ssr: false });


const binsOnRoute = [
  { id: 'bin-001', location: 'Praça da Sé', level: 95, status: 'Cheio' },
  { id: 'bin-002', location: 'Jardim do Castelo', level: 60, status: 'Médio' },
  { id: 'bin-004', location: 'Mercado Municipal', level: 88, status: 'Cheio' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Cheio':
      return 'hsl(var(--destructive))';
    case 'Médio':
      return 'hsl(var(--chart-3))';
    case 'Vazio':
      return 'hsl(var(--accent))';
    default:
      return 'hsl(var(--muted))';
  }
};


export default function OptimizedRoutePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <div>
      <PageTitle title="Rota Otimizada de Recolha" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contentores na Rota</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{binsOnRoute.length}</div>
            <p className="text-xs text-muted-foreground">
              Contentores com mais de 50% de capacidade.
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distância Total da Rota</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.7 km</div>
            <p className="text-xs text-muted-foreground">
              Percurso otimizado.
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Estimado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">
              Tempo estimado para conclusão da rota.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mapa da Rota de Recolha</CardTitle>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardDescription>
                Visualização do trajeto otimizado passando pelos contentores que necessitam de atenção.
            </CardDescription>
            <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--destructive))" className="h-3 w-3 text-destructive" /> Cheio (&gt;80%)</span>
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--chart-3))" className="h-3 w-3 text-chart-3" /> Médio (50-80%)</span>
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--accent))" className="h-3 w-3 text-accent" /> Vazio (&lt;50%)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video h-auto">
            {isClient && <WasteBinMap />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
