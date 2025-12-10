'use client';

import { PageTitle } from '@/components/layout/page-title';
import { MapPlaceholder } from '@/components/map-placeholder';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2, Circle } from 'lucide-react';

const organicBins = [
  { id: 'bin-003', location: 'Avenida Sá Carneiro', level: 25, status: 'Vazio' },
  { id: 'bin-006', location: 'Parque dos Tupis', level: 55, status: 'Médio' },
  { id: 'bin-007', location: 'Escola Superior de Educação', level: 90, status: 'Cheio' },
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


export default function WasteBinsPage() {
  return (
    <div>
      <PageTitle title="Contentores Orgânicos" />
       <Card>
        <CardHeader>
          <CardTitle>Mapa de Contentores Orgânicos</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>
                Encontre os pontos de recolha de resíduos orgânicos na cidade.
            </CardDescription>
            <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--destructive))" className="h-3 w-3 text-destructive" /> Cheio (&gt;80%)</span>
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--chart-3))" className="h-3 w-3 text-chart-3" /> Médio (50-80%)</span>
                <span className="flex items-center gap-2"><Circle fill="hsl(var(--accent))" className="h-3 w-3 text-accent" /> Vazio (&lt;50%)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <MapPlaceholder className="aspect-video h-[70vh] min-h-[600px]" />
        </CardContent>
      </Card>
    </div>
  );
}
