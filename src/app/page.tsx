
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { User, Building, Landmark } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profiles = [
  {
    type: 'Cidadão',
    description: 'Aceda aos serviços da cidade como residente.',
    icon: User,
    href: '/dashboard',
  },
  {
    type: 'Cooperado',
    description: 'Acesso para parceiros e empresas da rede.',
    icon: Building,
    href: '/dashboard-coop',
  },
  {
    type: 'Nordeste',
    description: 'Explore os dados e serviços da região.',
    icon: Landmark,
    href: '/dashboard-nordeste',
  },
];

export default function ProfileSelectionPage() {
  const splashBg = PlaceHolderImages.find((img) => img.id === 'splash-bg');

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      {splashBg && (
        <Image
          src={splashBg.imageUrl}
          alt={splashBg.description}
          fill
          className="object-cover"
          data-ai-hint={splashBg.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center text-white py-12">
        <Icons.logo className="h-20 w-20 mb-4 text-white" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Bem-vindo à Bragança Connect
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl font-light max-w-2xl">
          Selecione o seu perfil para aceder à plataforma e descobrir uma cidade
          mais conectada e sustentável.
        </p>
        <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {profiles.map((profile) => {
            const ProfileIcon = profile.icon;
            return (
              <Link key={profile.type} href={profile.href} className="h-full">
                <Card className="flex h-full transform-gpu cursor-pointer flex-col items-center justify-center border-2 border-white/20 bg-background/80 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-background/95 hover:scale-105">
                  <CardHeader className="items-center p-6 pb-4">
                    <ProfileIcon className="h-14 w-14 text-primary" />
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-center">
                    <CardTitle className="text-2xl">{profile.type}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">
                      {profile.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-6 z-10 text-center text-xs text-white/50 px-4">
        <p>Um projeto para um futuro mais sustentável e conectado.</p>
      </div>
    </main>
  );
}
