
'use client';

import { PageTitle } from '@/components/layout/page-title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Circle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WasteBinMap = dynamic(() => import('@/components/waste-bin-map'), { ssr: false });

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <PageTitle title="Contentores Orgânicos" />
       <Card>
        <CardHeader>
          <CardTitle>Mapa de Contentores Orgânicos</CardTitle>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardDescription>
                Encontre os pontos de recolha de resíduos orgânicos na cidade.
            </CardDescription>
            <div className="flex items-center flex-wrap gap-4 text-sm mt-2 sm:mt-0">
                <span className="flex items-center gap-2"><Circle fill={getStatusColor('Cheio')} className="h-3 w-3 text-destructive" /> Cheio (&gt;80%)</span>
                <span className="flex items-center gap-2"><Circle fill={getStatusColor('Médio')} className="h-3 w-3 text-chart-3" /> Médio (50-80%)</span>
                <span className="flex items-center gap-2"><Circle fill={getStatusColor('Vazio')} className="h-3 w-3 text-accent" /> Vazio (&lt;50%)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-square md:aspect-video h-auto max-h-[70vh] min-h-[500px]">
            {isClient && <WasteBinMap />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
