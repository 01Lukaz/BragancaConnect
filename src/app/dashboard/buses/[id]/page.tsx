
'use client';

import { PageProps } from 'next';
import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Bus, Clock, MapPin, Circle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BusMap = dynamic(() => import('@/components/bus-map'), { ssr: false });

// Static data for a single bus line
const busLineDetails = {
  id: '3A',
  name: 'Linha 3A: Sé via Hospital',
  status: 'A tempo',
  nextArrival: 5,
  stops: [
    { id: 1, name: 'Estação Rodoviária', arrival: '2 min' },
    { id:2, name: 'Av. Sá Carneiro', arrival: '5 min' },
    { id:3, name: 'Hospital', arrival: '8 min' },
    { id:4, name: 'Praça da Sé', arrival: '12 min' },
    { id:5, name: 'Castelo', arrival: '15 min' },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Atrasado':
      return 'hsl(var(--destructive))';
    case 'A tempo':
      return 'hsl(var(--accent))';
    default:
      return 'hsl(var(--muted))';
  }
};

export default function BusLineDetailPage({ params }: PageProps<{ id: string }>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <PageTitle title="Detalhes da Linha">
        <Button asChild variant="outline">
          <Link href="/dashboard/buses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Mapa
          </Link>
        </Button>
      </PageTitle>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Bus className="h-8 w-8 text-primary" />
                {busLineDetails.name}
                </CardTitle>
                <div
                className="flex items-center gap-2 text-lg font-semibold"
                style={{ color: getStatusColor(busLineDetails.status) }}
              >
                <Circle fill={getStatusColor(busLineDetails.status)} className="h-3 w-3" />
                <span>{busLineDetails.status}</span>
              </div>
            </div>
             <CardDescription className="pt-2">
              Veja as próximas paragens e os tempos de chegada estimados para esta linha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="mb-4 text-xl font-semibold">Próximas Paragens</h3>
            <div className="space-y-4">
              {busLineDetails.stops.map((stop) => (
                <div
                  key={stop.id}
                  className="flex items-center justify-between rounded-lg bg-muted p-4"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                    <p className="text-lg font-medium">{stop.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{stop.arrival}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg h-[400px] md:h-auto">
            <CardHeader>
                <CardTitle>Percurso no Mapa</CardTitle>
                <CardDescription>Visualização do trajeto completo da linha.</CardDescription>
            </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="h-full w-full rounded-b-lg bg-muted flex items-center justify-center min-h-[300px] md:min-h-0">
                 {isClient && <BusMap />}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
