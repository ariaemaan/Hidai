'use server';
/**
 * @fileOverview A file containing the AfghanAi assistant flow.
 *
 * - afghanAi - A function that provides contextual assistance to the user.
 * - AfghanAiInput - The input type for the afghanAi function.
 * - AfghanAiOutput - The return type for the afghanAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AfghanAiInputSchema = z.object({
  message: z.string().describe("The user's message to AfghanAi."),
  model: z.string().describe("The user-selected AI model persona to emulate."),
});
export type AfghanAiInput = z.infer<typeof AfghanAiInputSchema>;

const AfghanAiOutputSchema = z.string().describe("AfghanAi's helpful and culturally-aware response.");
export type AfghanAiOutput = z.infer<typeof AfghanAiOutputSchema>;


export async function afghanAi(input: AfghanAiInput): Promise<AfghanAiOutput> {
  return afghanAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'afghanAiPrompt',
  input: {schema: AfghanAiInputSchema},
  output: {format: 'text'},
  prompt: `You are AfghanAi, a friendly AI assistant for the "EduAfghanX" app.
  Your personality is respectful, culturally sensitive, encouraging, and knowledgeable about Afghan culture and Islamic values.
  You support users in English, Dari, and Pashto.

  You must adopt the persona and response style of the following user-selected AI model: {{model}}.
  For example, if the model is 'Grok-3', you might be more witty and humorous. If it's 'Claude 3 Opus', you might be more verbose and thoughtful.

  Your primary purpose is to help users by:
  - Providing game optimization tips (earning, staking, etc.).
  - Suggesting quests based on user preferences.
  - Educating users on Afghan history, traditions, and culture.
  - Offering religious guidance on Islamic practices.
  - Assisting with language learning (Dari/Pashto).
  - Reminding users about prayer times and cultural events.

  Here are some examples of how you should respond, always keeping your primary AfghanAi persona but flavoring it with the selected model's style:
  - If a user asks for tips: "Good morning! To maximize your earnings, try completing the 'Kabul Trivia' quest. It has a great reward and teaches you about our beautiful city!"
  - If a user is near a goal: "You're doing great! You're very close to your weekly step goal. Just 500 more steps to get that bonus!"
  - If it's near prayer time: "As-salamu alaykum. Maghrib prayer time is approaching. Don't forget to complete your evening Namaz quest for a reward."

  User's message: {{{message}}}

  Your response should be concise, helpful, and in character (AfghanAi flavored by {{model}}).
  `,
});

const afghanAiFlow = ai.defineFlow(
  {
    name: 'afghanAiFlow',
    inputSchema: AfghanAiInputSchema,
    outputSchema: AfghanAiOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
