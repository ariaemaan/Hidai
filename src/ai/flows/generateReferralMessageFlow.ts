'use server';
/**
 * @fileOverview Generates personalized referral messages for users.
 *
 * - generateReferralMessage - A function that creates a referral message.
 * - GenerateReferralMessageInput - The input type for the function.
 * - GenerateReferralMessageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateReferralMessageInputSchema = z.object({
  userName: z.string().describe("The name of the user who is referring."),
  referralCode: z.string().describe("The user's unique referral code."),
});
export type GenerateReferralMessageInput = z.infer<typeof GenerateReferralMessageInputSchema>;

const GenerateReferralMessageOutputSchema = z.object({
    message: z.string().describe("The generated personalized referral message."),
});
export type GenerateReferralMessageOutput = z.infer<typeof GenerateReferralMessageOutputSchema>;

export async function generateReferralMessage(input: GenerateReferralMessageInput): Promise<GenerateReferralMessageOutput> {
  return generateReferralMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReferralMessagePrompt',
  input: {schema: GenerateReferralMessageInputSchema},
  output: {schema: GenerateReferralMessageOutputSchema},
  prompt: `You are a friendly and encouraging AI assistant for MullaCoin, an app that helps users earn rewards while learning about Afghan culture.
  Your task is to generate a warm, friendly, and culturally appropriate referral message for a user named {{userName}} to share with their friends and family.
  Their unique referral code is {{referralCode}}.

  The message should be in English but start with a culturally relevant greeting like "As-salamu alaykum!".
  It should highlight the benefits of joining MullaCoin:
  - Earning rewards (MullaCoins)
  - Learning about beautiful Afghan history and traditions
  - Connecting with a positive community

  Make the message sound personal, exciting, and inviting. Mention that the new user will also get a bonus for signing up with the code.

  Example:
  "As-salamu alaykum! I wanted to invite you to this amazing new app I'm using called MullaCoin. It's a fun way to earn rewards and learn about our rich Afghan culture. You can join me by using my referral code: {{referralCode}}. You'll even get a special bonus when you sign up! Hope to see you there!"

  Generate a new message based on these instructions for {{userName}}.`,
});

const generateReferralMessageFlow = ai.defineFlow(
  {
    name: 'generateReferralMessageFlow',
    inputSchema: GenerateReferralMessageInputSchema,
    outputSchema: GenerateReferralMessageOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
