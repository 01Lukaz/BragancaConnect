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
import { BatteryCharging, Circle, Zap } from 'lucide-react';

const chargerData = [
    { id: 'ev-01', location: 'Câmara Municipal', status: 'Disponível', type: 'CCS', distance: '500m' },
    { id: 'ev-02', location: 'Intermarché', status: 'Ocupado', type: 'CHAdeMO', distance: '1.2km' },
    { id: 'ev-03', location: 'Bragança Shopping', status: 'Disponível', type: 'Type 2', distance: '2.5km' },
    { id: 'ev-04', location: 'Estação de Comboios (Desativada)', status: 'Disponível', type: 'CCS', distance: '3.1km' },
    { id: 'ev-05', location: 'Hospital', status: 'Ocupado', type: 'Type 2', distance: '4km' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponível':
      return 'hsl(var(--accent))';
    case 'Ocupado':
      return 'hsl(var(--destructive))';
    default:
      return 'hsl(var(--muted))';
  }
};


export default function ChargersPage() {
  return (
    <div>
      <PageTitle title="Postos de Carregamento EV" />
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtrar por Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Selecionar estado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="occupied">Ocupados</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Postos Próximos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chargerData.map((charger) => (
                <div
                  key={charger.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <BatteryCharging className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">{charger.location}</p>
                       <p className="text-xs text-muted-foreground">{charger.type} - {charger.distance}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                     <Circle
                        fill={getStatusColor(charger.status)}
                        className="h-3 w-3"
                        style={{color: getStatusColor(charger.status)}}
                      />
                    <p className="font-semibold text-sm">{charger.status}</p>
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
