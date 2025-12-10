// import { ai } from '@/ai/genkit';
// import { appRoute } from '@genkit-ai/next';

// export const POST = appRoute(ai);

// src/app/api/genkit/route.ts
import { appRoute } from '@genkit-ai/next';
import { chatFlow } from '@/ai/flows/chatFlow'; // ajuste o caminho conforme seu tsconfig

export const POST = appRoute(chatFlow);
