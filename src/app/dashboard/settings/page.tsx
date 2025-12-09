'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Accessibility,
  Languages,
  Moon,
  Palette,
  Save,
  Type,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <PageTitle title="Definições e Acessibilidade" />
      <Card className="shadow-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-6 w-6" />
            Ajustes para uma melhor experiência
          </CardTitle>
          <CardDescription>
            Personalize a aparência e o comportamento da aplicação para atender
            às suas necessidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border">
              <div>
                <Label htmlFor="dark-mode" className="text-lg font-semibold">
                  Modo Escuro
                </Label>
                <p className="text-muted-foreground">
                  Ative para um tema com cores escuras, ideal para ambientes com
                  pouca luz.
                </p>
              </div>
              <Switch id="dark-mode" className="h-6 w-11" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border">
              <div>
                <Label
                  htmlFor="high-contrast"
                  className="text-lg font-semibold"
                >
                  Modo de Alto Contraste
                </Label>
                <p className="text-muted-foreground">
                  Aumenta o contraste das cores para facilitar a leitura.
                </p>
              </div>
              <Switch id="high-contrast" className="h-6 w-11" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border">
              <div>
                <Label htmlFor="font-size" className="text-lg font-semibold">
                  Tamanho da Fonte
                </Label>
                <p className="text-muted-foreground">
                  Ajuste o tamanho do texto em toda a aplicação.
                </p>
              </div>
              <Select defaultValue="normal">
                <SelectTrigger className="w-full sm:w-[180px] h-12 text-base">
                  <SelectValue placeholder="Tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                  <SelectItem value="extra-large">Extra Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border">
              <div>
                <Label htmlFor="language" className="text-lg font-semibold">
                  Idioma
                </Label>
                <p className="text-muted-foreground">
                  Escolha o seu idioma de preferência.
                </p>
              </div>
               <Select defaultValue="pt">
                <SelectTrigger className="w-full sm:w-[180px] h-12 text-base">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </div>
           <div className="flex justify-end mt-8">
              <Button size="lg" className="h-12 text-lg">
                <Save className="mr-2" />
                Guardar Preferências
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
