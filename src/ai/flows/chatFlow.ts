// src/ai/flows/chatFlow.ts
import { z } from 'zod';
import { ai } from '../genkit';

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      prompt: z.string(),
    }),
    outputSchema: z.object({
      answer: z.string(),
    }),
  },
  async ({ prompt }) => {
    const { text } = await ai.generate({
      prompt,
      // se quiser, pode declarar o model aqui em vez do genkit.ts
      // model: 'googleai/gemini-2.5-flash',
    });

    return { answer: text ?? '' };
  }
);
