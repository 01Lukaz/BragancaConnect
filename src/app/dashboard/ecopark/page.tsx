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
import { Trees, Sun, Zap, Bike, Smartphone, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ecoparkData = [
    { id: 'ep-01', name: 'Ecoparque do Castelo', energy: 15.2, slots: 8, occupied: 3 },
    { id: 'ep-02', name: 'Ecoparque do Eixo Atlântico', energy: 22.5, slots: 12, occupied: 10 },
    { id: 'ep-03', name: 'Ecoparque do Mercado', energy: 8.9, slots: 6, occupied: 2 },
];


export default function EcoparkPage() {
  return (
    <div>
      <PageTitle title="Ecoparques Solares" />
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6">
           <Card>
            <CardHeader>
              <CardTitle>Filtrar por Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Selecionar disponibilidade..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Com Vagas Livres</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Lista de Ecoparques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ecoparkData.map((park) => (
                <Card key={park.id} className="p-4 overflow-hidden">
                  <Link href={`/dashboard/ecopark/${park.id}`} className="block hover:bg-muted/50 -m-4 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <Trees className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{park.name}</p>
                             <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Sun className="h-3 w-3 text-chart-3" /> Gerado hoje: {park.energy} kWh
                             </p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Vagas para carregamento:</p>
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        <Progress value={(park.occupied / park.slots) * 100} className="h-3 flex-1"/>
                        <p className="font-bold text-base">{park.slots - park.occupied} / {park.slots}</p>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground mt-2 text-sm">
                        <div className='flex items-center gap-4'>
                          <p className="flex items-center gap-1"><Bike className="h-4 w-4"/>Bicicletas</p>
                          <p className="flex items-center gap-1"><Smartphone className="h-4 w-4"/>Dispositivos</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </Link>
                </Card>
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
