
'use client';

import { PageTitle } from '@/components/layout/page-title';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bus, Circle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BusMap = dynamic(() => import('@/components/bus-map'), { ssr: false });


const busLines = [
  { id: '3A', name: 'Linha 3A: Sé', status: 'A tempo', nextArrival: 5 },
  { id: '1', name: 'Linha 1: Hospital', status: 'A tempo', nextArrival: 12 },
  { id: '2B', name: 'Linha 2B: Estação', status: 'Atrasado', nextArrival: 8 },
  { id: '5', name: 'Linha 5: Circular', status: 'A tempo', nextArrival: 15 },
];

export default function BusesPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <div>
      <PageTitle title="Autocarros em Tempo Real" />
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtrar por Linha</CardTitle>
            </CardHeader>
            <CardContent>
             {isClient && <Select defaultValue="all">
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Selecionar linha..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Linhas</SelectItem>
                  {busLines.map((line) => (
                    <SelectItem key={line.id} value={line.id}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>}
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Próximas Chegadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {busLines.map((line) => (
                <Button asChild variant="ghost" className="h-auto w-full justify-start p-0" key={line.id}>
                  <Link href={`/dashboard/buses/${line.id}`}>
                    <div className="flex w-full items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bus className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-semibold">{line.name}</p>
                          <p
                            className={`text-xs flex items-center gap-1 ${
                              line.status === 'Atrasado'
                                ? 'text-destructive'
                                : 'text-accent-foreground'
                            }`}
                          >
                            <Circle
                              fill={
                                line.status === 'Atrasado'
                                  ? 'hsl(var(--destructive))'
                                  : 'hsl(var(--accent))'
                              }
                              className={`h-2 w-2 ${
                                line.status === 'Atrasado'
                                  ? 'text-destructive'
                                  : 'text-accent'
                              }`}
                            />{' '}
                            {line.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <p className="font-bold text-lg">{line.nextArrival} min</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </aside>
        <main>
           <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle>Mapa em Tempo Real</CardTitle>
                <CardDescription>Visualização de todas as linhas ativas.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-full">
                <div className="h-full w-full rounded-b-lg bg-muted flex items-center justify-center min-h-[500px] lg:min-h-0">
                    {isClient && <BusMap />}
                </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
