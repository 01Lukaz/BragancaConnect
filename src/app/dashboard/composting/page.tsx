'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Scale, CheckCircle, Gift, Info } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function CompostingPage() {
  const [weight, setWeight] = useState('');
  const [points, setPoints] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  const handleDeposit = () => {
    if (parseFloat(weight) > 0) {
      setStep(2);
      // Simulating a delay for the deposit process
      setTimeout(() => {
        const calculatedPoints = Math.round(parseFloat(weight) * 10);
        setPoints(calculatedPoints);
        setStep(3);
      }, 2000);
    }
  };

  const handleReset = () => {
    setWeight('');
    setPoints(null);
    setStep(1);
  };

  return (
    <div>
      <PageTitle title="Compostagem de Orgânicos" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              Registar Depósito
            </CardTitle>
            <CardDescription>
              Pese os seus resíduos orgânicos para ganhar pontos de recompensa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in-50">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base">
                    Peso dos Resíduos (kg)
                  </Label>
                  <div className="relative">
                     <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 1.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-14 text-lg pl-10"
                    />
                  </div>
                </div>
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Como funciona?</AlertTitle>
                    <AlertDescription>
                        Coloque o seu saco no contentor inteligente. O peso será detetado e inserido automaticamente. Se necessário, pode ajustar o valor manualmente.
                    </AlertDescription>
                </Alert>
              </div>
            )}
            {step === 2 && (
              <div className="text-center py-10 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary mx-auto flex items-center justify-center animate-pulse">
                    <Scale className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mt-4">A processar...</h3>
                <p className="text-muted-foreground">A registar o seu depósito. Por favor, aguarde.</p>
              </div>
            )}
            {step === 3 && points !== null && (
              <div className="text-center py-10 animate-in fade-in-50">
                 <CheckCircle className="mx-auto h-16 w-16 text-accent mb-4" />
                 <h3 className="text-2xl font-semibold">Depósito Concluído!</h3>
                 <p className="text-muted-foreground">Obrigado por contribuir para um futuro mais verde.</p>
                 <div className="mt-6 bg-accent/10 border-2 border-dashed border-accent rounded-xl p-6">
                    <p className="text-lg">Ganhou</p>
                    <p className="text-6xl font-bold text-accent-foreground">{points}</p>
                    <p className="text-lg">pontos!</p>
                 </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             {step === 1 && (
                 <Button
                    onClick={handleDeposit}
                    disabled={!weight || parseFloat(weight) <= 0}
                    className="w-full h-14 text-lg"
                    >
                    Confirmar Depósito
                </Button>
            )}
            {step === 3 && (
                <>
                    <Button onClick={handleReset} className="w-full h-12 text-lg">
                        Fazer Novo Depósito
                    </Button>
                     <Button asChild variant="outline" className="w-full h-12 text-lg">
                        <Link href="/dashboard/wallet">
                            <Gift className="mr-2" /> Ver as minhas recompensas
                        </Link>
                    </Button>
                </>
            )}
          </CardFooter>
        </Card>
        <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <Leaf className="h-20 w-20 text-primary mb-6" />
            <h3 className="text-3xl font-bold mb-4">A sua contribuição faz a diferença!</h3>
            <p className="text-lg text-muted-foreground max-w-md">
                Cada quilo de resíduo orgânico que composta ajuda a reduzir o lixo em aterros, diminui a emissão de gases de efeito estufa e cria um fertilizante natural para os nossos solos.
            </p>
        </div>
      </div>
    </div>
  );
}
