'use client';

import { PageTitle } from '@/components/layout/page-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit, Save } from 'lucide-react';

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(
    (img) => img.id === 'user-avatar-1'
  );

  return (
    <div>
      <PageTitle title="O Meu Perfil" />
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className='relative'>
                 <Avatar className="h-28 w-28 border-4 border-primary">
              {userAvatar && (
                <AvatarImage
                  src={userAvatar.imageUrl}
                  alt={userAvatar.description}
                />
              )}
              <AvatarFallback className="text-4xl">JD</AvatarFallback>
            </Avatar>
            <Button size="icon" className="rounded-full absolute bottom-1 right-1 h-8 w-8">
                <Edit className="h-4 w-4"/>
            </Button>
            </div>
            <div>
              <CardTitle className="text-4xl">João Dinis</CardTitle>
              <CardDescription className="text-base mt-1">
                Membro desde 2023
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  defaultValue="João Dinis"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="joao.dinis@email.com"
                  className="h-12 text-base"
                />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label htmlFor="nif" className="text-base">
                  NIF (Número de Identificação Fiscal)
                </Label>
                <Input
                  id="nif"
                  defaultValue="123******9"
                  disabled
                  className="h-12 text-base"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Telemóvel
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+351 912 345 678"
                  className="h-12 text-base"
                />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="address" className="text-base">
                  Morada
                </Label>
                <Input
                  id="address"
                  defaultValue="Rua da Liberdade, 123, 5300-123 Bragança"
                  className="h-12 text-base"
                />
              </div>
            <div className="flex justify-end">
              <Button size="lg" className="h-12 text-lg">
                <Save className="mr-2" />
                Guardar Alterações
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
