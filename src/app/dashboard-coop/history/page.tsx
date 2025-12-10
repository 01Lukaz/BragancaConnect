
'use client';

import { PageTitle } from '@/components/layout/page-title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { History, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const transactionHistory = [
    { date: '2024-07-22', type: 'Cobrança', description: 'Pagamento de João Dinis', amount: '+500 PTS', status: 'received' },
    { date: '2024-07-21', type: 'Troca', description: 'Levantamento de 10kg de Adubo', amount: '-2000 PTS', status: 'spent' },
    { date: '2024-07-20', type: 'Cobrança', description: 'Pagamento de Maria Silva', amount: '+250 PTS', status: 'received' },
    { date: '2024-07-18', type: 'Cobrança', description: 'Pagamento de Carlos Pereira', amount: '+750 PTS', status: 'received' },
     { date: '2024-07-15', type: 'Troca', description: 'Levantamento de 5kg de Adubo', amount: '-1000 PTS', status: 'spent' },
];

export default function HistoryPage() {
  return (
    <div>
      <PageTitle title="Histórico de Transações" />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History />
            A sua atividade
          </CardTitle>
          <CardDescription>
            Consulte todas as cobranças de pontos e trocas por recompensas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {transactionHistory.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                    {item.status === 'received' ? <ArrowUpCircle className="h-8 w-8 text-accent"/> : <ArrowDownCircle className="h-8 w-8 text-destructive"/>}
                    <div>
                        <p className="font-semibold text-lg">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground sm:hidden mt-1">{item.date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 mt-2 sm:mt-0 w-full sm:w-auto">
                    <p className="text-sm text-muted-foreground hidden sm:block">{item.date}</p>
                    <p className={`font-bold text-xl w-full text-right sm:w-auto ${item.status === 'received' ? 'text-accent-foreground' : 'text-destructive'}`}>
                        {item.amount}
                    </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
