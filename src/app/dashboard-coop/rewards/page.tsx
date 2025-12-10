
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
import { Gift, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Create a new placeholder image for fertilizer
const rewards = [
  {
    id: 'reward-fertilizer',
    title: 'Saco de Adubo Orgânico (10kg)',
    description: 'Fertilizante de alta qualidade, produzido localmente a partir da compostagem.',
    points: 2000,
  },
   {
    id: 'reward-tools',
    title: 'Kit de Jardinagem',
    description: 'Ferramentas básicas para começar a sua horta em casa.',
    points: 5000,
  },
];

export default function RewardsPage() {
  return (
    <div>
      <PageTitle title="Trocar Pontos" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
                // Find a placeholder image. If one for the reward id exists, use it. Otherwise, use a default one.
                let image = PlaceHolderImages.find(img => img.id === reward.id);
                if (!image) image = PlaceHolderImages.find(img => img.id === 'reward-1');

                return (
                    <Card key={reward.id} className="flex flex-col shadow-lg">
                        {image && (
                            <div className="relative w-full h-48">
                                <Image src={image.imageUrl} alt={image.description} fill className="object-cover rounded-t-lg" data-ai-hint={image.imageHint}/>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl">{reward.title}</CardTitle>
                            <CardDescription>{reward.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-3xl font-bold text-primary">{reward.points} PONTOS</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full h-12 text-lg">
                                Trocar <ArrowRight className="ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  );
}

