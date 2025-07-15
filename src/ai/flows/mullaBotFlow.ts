
'use server';
/**
 * @fileOverview A file containing the MullaBot AI assistant flow.
 *
 * - mullaBot - A function that provides contextual assistance to the user.
 * - MullaBotInput - The input type for the mullaBot function.
 * - MullaBotOutput - The return type for the mullaBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const MullaBotInputSchema = z.object({
  message: z.string().describe('The user\'s message to MullaBot.'),
});
export type MullaBotInput = z.infer<typeof MullaBotInputSchema>;

const MullaBotOutputSchema = z.string().describe("MullaBot's helpful and culturally-aware response.");
export type MullaBotOutput = z.infer<typeof MullaBotOutputSchema>;


export async function mullaBot(input: MullaBotInput): Promise<MullaBotOutput> {
  return mullaBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mullaBotPrompt',
  input: {schema: MullaBotInputSchema},
  output: {format: 'text'},
  prompt: `You are MullaBot, a friendly AI assistant for the "EduAfghanX" app.
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

const mullaBotFlow = ai.defineFlow(
  {
    name: 'mullaBotFlow',
    inputSchema: MullaBotInputSchema,
    outputSchema: MullaBotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
