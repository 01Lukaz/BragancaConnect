
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
import { Trash2, Circle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const binData = [
  { id: 'bin-001', location: 'Praça da Sé', level: 95, status: 'Cheio', type: 'Indiferenciado' },
  { id: 'bin-002', location: 'Jardim do Castelo', level: 60, status: 'Médio', type: 'Reciclável' },
  { id: 'bin-003', location: 'Avenida Sá Carneiro', level: 25, status: 'Vazio', type: 'Orgânico' },
  { id: 'bin-004', location: 'Mercado Municipal', level: 88, status: 'Cheio', type: 'Indiferenciado' },
  { id: 'bin-005', location: 'Parque do Eixo Atlântico', level: 45, status: 'Médio', type: 'Reciclável' },
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
      <PageTitle title="Contentores de Lixo Inteligentes" />
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtrar por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Selecionar estado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="full">Cheios</SelectItem>
                  <SelectItem value="medium">Médios</SelectItem>
                  <SelectItem value="empty">Vazios</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Estado dos Contentores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {binData.map((bin) => (
                 <Button asChild variant="ghost" className="h-auto w-full justify-start p-0" key={bin.id}>
                    <Link href={`/dashboard/waste-bins/${bin.id}`}>
                        <div
                        className="flex items-center justify-between p-3 bg-muted rounded-lg w-full hover:bg-accent/50 transition-colors"
                        >
                        <div className="flex items-center gap-3 text-left">
                            <Trash2 className="h-6 w-6 text-primary" />
                            <div>
                            <p className="font-semibold">{bin.location}</p>
                            <p className="text-xs text-muted-foreground">{bin.type}</p>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                            <Circle
                                fill={getStatusColor(bin.status)}
                                className="h-3 w-3"
                                style={{color: getStatusColor(bin.status)}}
                            />
                            <p className="font-bold text-lg">{bin.level}%</p>
                        </div>
                        </div>
                    </Link>
                </Button>
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
