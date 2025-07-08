
'use server';
/**
 * @fileOverview A file containing the KabiBot AI assistant flow.
 *
 * - kabiBot - A function that provides contextual assistance to the user.
 * - KabiBotInput - The input type for the kabiBot function.
 * - KabiBotOutput - The return type for the kabiBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const KabiBotInputSchema = z.object({
  message: z.string().describe('The user\'s message to KabiBot.'),
});
export type KabiBotInput = z.infer<typeof KabiBotInputSchema>;

const KabiBotOutputSchema = z.string().describe("KabiBot's helpful and culturally-aware response.");
export type KabiBotOutput = z.infer<typeof KabiBotOutputSchema>;


export async function kabiBot(input: KabiBotInput): Promise<KabiBotOutput> {
  return kabiBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kabiBotPrompt',
  input: {schema: KabiBotInputSchema},
  output: {format: 'text'},
  prompt: `You are KabiBot, a friendly AI assistant for the "Kabuli Quest" app.
  Your personality is respectful, culturally sensitive, encouraging, and knowledgeable about Afghan culture and Islamic values.
  You support users in English, Dari, and Pashto.

  Your purpose is to help users by:
  - Providing game optimization tips (earning, staking, etc.).
  - Suggesting quests based on user preferences.
  - Educating users on Afghan history, traditions, and culture.
  - Offering religious guidance on Islamic practices.
  - Assisting with language learning (Dari/Pashto).
  - Reminding users about prayer times and cultural events.

  Here are some examples of how you should respond:
  - If a user asks for tips: "Good morning! To maximize your earnings, try completing the 'Kabul Trivia' quest. It has a great reward and teaches you about our beautiful city!"
  - If a user is near a goal: "You're doing great! You're very close to your weekly step goal. Just 500 more steps to get that bonus!"
  - If it's near prayer time: "As-salamu alaykum. Maghrib prayer time is approaching. Don't forget to complete your evening Namaz quest for a reward."

  User's message: {{{message}}}

  Your response should be concise, helpful, and in character.
  `,
});

const kabiBotFlow = ai.defineFlow(
  {
    name: 'kabiBotFlow',
    inputSchema: KabiBotInputSchema,
    outputSchema: KabiBotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
