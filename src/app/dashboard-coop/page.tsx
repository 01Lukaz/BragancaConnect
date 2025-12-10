
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
import { Leaf, QrCode, DollarSign } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function CooperadoDashboardPage() {
  const [amount, setAmount] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  const handleGenerateQr = () => {
    if (parseFloat(amount) > 0) {
      // In a real app, this would generate a QR code with payment info
      const qrValue = `smart-braganca-points:${amount}`;
      setQrCodeValue(qrValue);
    }
  };
  
  const handleNewPayment = () => {
    setAmount('');
    setQrCodeValue(null);
  };

  return (
    <div>
      <PageTitle title="Receber Pagamento" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Nova Cobrança
            </CardTitle>
            <CardDescription>
              Insira o valor em pontos a ser cobrado do cidadão.
            </CardDescription>
          </CardHeader>
          {!qrCodeValue ? (
            <>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base">
                    Valor em Pontos
                  </Label>
                  <div className="relative">
                    <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Ex: 500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-14 text-lg pl-10"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerateQr}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full h-14 text-lg"
                >
                  <QrCode className="mr-2" />
                  Gerar QR Code
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="flex flex-col items-center justify-center text-center p-8">
                <p className="text-muted-foreground">Apresente este QR Code ao cidadão para pagamento.</p>
                <div className="relative w-64 h-64 my-4 bg-muted flex items-center justify-center rounded-lg">
                  {/* Placeholder for actual QR code */}
                   <Image src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${qrCodeValue}" alt="QR Code" width={256} height={256} />

                </div>
                 <div className="bg-accent/10 border-2 border-dashed border-accent rounded-xl p-4 w-full">
                    <p className="text-lg">Valor a ser pago</p>
                    <p className="text-5xl font-bold text-accent-foreground">{amount}</p>
                    <p className="text-lg">pontos</p>
                 </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNewPayment} className="w-full h-12 text-lg">
                  Nova Cobrança
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
        <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <Leaf className="h-20 w-20 text-primary mb-6" />
            <h3 className="text-3xl font-bold mb-4">Como funciona?</h3>
            <p className="text-lg text-muted-foreground max-w-md">
                O cidadão usa a app para ler o QR Code, transferindo os pontos da sua carteira de compostagem diretamente para a sua conta de cooperado.
            </p>
        </div>
      </div>
    </div>
  );
}
