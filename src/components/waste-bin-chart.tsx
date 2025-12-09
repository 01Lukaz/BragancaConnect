
'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const binData = [
  { name: 'Cheio', value: 8, fill: 'hsl(var(--destructive))' },
  { name: 'Médio', value: 25, fill: 'hsl(var(--chart-3))' },
  { name: 'Vazio', value: 67, fill: 'hsl(var(--accent))' },
];

export default function WasteBinChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={binData} layout="vertical" margin={{ left: -10 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderRadius: 'var(--radius)',
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
