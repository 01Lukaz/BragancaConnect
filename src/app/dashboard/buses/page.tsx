'use client';

import { PageTitle } from '@/components/layout/page-title';
import { MapPlaceholder } from '@/components/map-placeholder';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bus, Circle, Clock } from 'lucide-react';

const busLines = [
  { id: '3A', name: 'Linha 3A: Sé', status: 'A tempo', nextArrival: 5 },
  { id: '1', name: 'Linha 1: Hospital', status: 'A tempo', nextArrival: 12 },
  { id: '2B', name: 'Linha 2B: Estação', status: 'Atrasado', nextArrival: 8 },
  { id: '5', name: 'Linha 5: Circular', status: 'A tempo', nextArrival: 15 },
];

export default function BusesPage() {
  return (
    <div>
      <PageTitle title="Autocarros em Tempo Real" />
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtrar por Linha</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
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
              </Select>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Próximas Chegadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {busLines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
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
              ))}
            </CardContent>
          </Card>
        </aside>
        <main>
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <MapPlaceholder className="aspect-auto h-full min-h-[600px]" />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
