
'use client';

import Link from 'next/link';
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
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function CooperadoLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the cooperado dashboard
    router.push('/dashboard-coop');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <Link href="/" className='flex justify-center mb-4'>
              <Icons.logo className="h-16 w-16 text-primary" />
            </Link>
            <CardTitle className="text-3xl">Portal do Cooperado</CardTitle>
            <CardDescription className="text-base">
              Aceda à sua conta de parceiro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cooperado-code" className="text-base">
                Código de Cooperado
              </Label>
              <Input
                id="cooperado-code"
                type="text"
                placeholder="Ex: COOP12345"
                required
                className="h-14 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Palavra-passe
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="h-14 text-lg"
                placeholder="********"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full h-14 text-lg">
              Entrar
            </Button>
            <p className="text-sm text-muted-foreground">
              Ainda não é parceiro?{' '}
              <Link
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Saiba mais aqui.
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
