'use server';
/**
 * @fileOverview Generates personalized social media posts for users.
 *
 * - generateSocialPost - A function that creates a social media post.
 * - GenerateSocialPostInput - The input type for the function.
 * - GenerateSocialPostOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateSocialPostInputSchema = z.object({
  userName: z.string().describe("The name of the user who is sharing."),
  context: z.string().describe("A description of what the user wants to share. e.g., 'I want to invite friends, my code is XYZ' or 'I reached rank 5 on the leaderboard'"),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GenerateSocialPostOutputSchema = z.object({
    post: z.string().describe("The generated personalized social media post."),
});
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are a creative and encouraging social media expert for MullaCoin, an app where users earn rewards by learning about Afghan culture.
  Your task is to generate a short, exciting, and culturally appropriate social media post for a user named {{userName}}.
  The post should be in English but feel free to start with a culturally relevant greeting like "As-salamu alaykum!" or use words like "Alhamdulillah".
  Include relevant hashtags like #MullaCoin, #AfghanCulture, and #Afghanistan.

  The user wants to create a post about the following:
  "{{context}}"

  Based on the user's request, create a compelling social media post.
  - If it's an invitation for friends, make it warm and welcoming. Ensure you include any referral code mentioned in the context.
  - If it's an achievement (like a leaderboard rank), make it celebratory and proud.
  - If it's about learning something new, highlight the educational aspect.

  Generate one single post, ready to be copied and pasted.`,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
