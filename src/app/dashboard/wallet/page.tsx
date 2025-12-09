'use client';

import Image from 'next/image';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Gift, History, ShoppingBag, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const rewards = [
  {
    id: 'reward-1',
    title: '10% Desconto em Produtos Locais',
    description: 'Válido nos mercados aderentes.',
    points: 500,
  },
  {
    id: 'reward-2',
    title: 'Voucher de 5€ para a Feira',
    description: 'Use na próxima Feira de Agricultores.',
    points: 1000,
  },
  {
    id: 'reward-3',
    title: 'Café Grátis',
    description: 'Numa cafetaria local à sua escolha.',
    points: 250,
  },
];

const history = [
    { date: '2024-07-21', type: 'Depósito de Orgânicos', points: '+50 PTS' },
    { date: '2024-07-18', type: 'Depósito de Orgânicos', points: '+35 PTS' },
    { date: '2024-07-15', type: 'Troca de Recompensa', points: '-500 PTS' },
    { date: '2024-07-10', type: 'Depósito de Orgânicos', points: '+45 PTS' },
]

export default function WalletPage() {
  return (
    <div>
      <PageTitle title="A Minha Carteira" />
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <Card className="bg-accent/20 border-accent text-center shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Leaf className="h-6 w-6" />
                <span>Pontos de Compostagem</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-7xl font-bold">1,250</p>
              <p className="text-lg text-muted-foreground">PONTOS</p>
            </CardContent>
            <CardFooter>
                <Button size="lg" className="w-full text-lg h-12">
                    <ShoppingBag className="mr-2" /> Trocar Pontos
                </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs for Rewards and History */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="rewards" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="rewards" className="text-base h-10"><Gift className="mr-2"/> Recompensas</TabsTrigger>
              <TabsTrigger value="history" className="text-base h-10"><History className="mr-2"/> Histórico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loja de Recompensas</CardTitle>
                  <CardDescription>
                    Use os seus pontos para obter descontos e ofertas exclusivas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map((reward) => {
                    const image = PlaceHolderImages.find(img => img.id === reward.id);
                    return (
                        <Card key={reward.id} className="flex flex-col sm:flex-row items-center overflow-hidden">
                            {image && (
                                <div className="relative w-full h-40 sm:w-48 sm:h-full">
                                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint}/>
                                </div>
                            )}
                            <div className="flex-1 p-4">
                               <CardTitle className="text-xl mb-1">{reward.title}</CardTitle>
                               <p className="text-muted-foreground mb-3">{reward.description}</p>
                               <div className="flex items-center justify-between">
                                 <p className="text-lg font-bold text-primary">{reward.points} PTS</p>
                                 <Button>Trocar <ArrowRight className="ml-2 h-4 w-4" /></Button>
                               </div>
                            </div>
                        </Card>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Transações</CardTitle>
                   <CardDescription>
                    Veja a sua atividade recente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {history.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <div>
                                    <p className="font-medium">{item.type}</p>
                                    <p className="text-sm text-muted-foreground">{item.date}</p>
                                </div>
                                <p className={`font-bold text-lg ${item.points.startsWith('+') ? 'text-accent-foreground' : 'text-destructive'}`}>
                                    {item.points}
                                </p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
