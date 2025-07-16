'use server';
/**
 * @fileOverview Generates marketing copy for various campaigns.
 *
 * - generateMarketingCopy - A function that creates marketing content.
 * - GenerateMarketingCopyInput - The input type for the function.
 * - GenerateMarketingCopyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateMarketingCopyInputSchema = z.object({
    goal: z.string().describe("The primary objective of the marketing campaign (e.g., 'Drive new user sign-ups', 'Promote new feature')."),
    audience: z.string().describe("The target audience for the message (e.g., 'Afghan diaspora in the US', 'Crypto enthusiasts', 'Religious leaders')."),
    tone: z.string().describe("The desired tone of the message (e.g., 'Inspirational', 'Educational', 'Urgent', 'Community-focused')."),
    platform: z.string().describe("The social media platform the content is for (e.g., 'Facebook', 'Instagram', 'TikTok')."),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
    headline: z.string().describe("A short, catchy headline for the post."),
    body: z.string().describe("The main body of the marketing message."),
    hashtags: z.string().describe("A string of relevant hashtags, separated by spaces."),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are an expert marketing copywriter for Afghan AiHub, an app where users earn rewards by learning about Afghan culture.
  Your task is to generate compelling, culturally appropriate marketing content tailored for specific campaigns, audiences, and platforms.

  The generated content must be respectful, authentic, and align with Islamic values. Use languages and references that resonate with the target audience.

  Campaign Details:
  - Goal: {{goal}}
  - Target Audience: {{audience}}
  - Desired Tone: {{tone}}
  - Platform: {{platform}}

  Based on these details, generate the following:
  1.  **Headline**: A powerful and concise headline that grabs attention.
  2.  **Body**: The main text of the post. It should be persuasive and clearly communicate the message. Adapt the length and style for the specified platform.
  3.  **Hashtags**: A set of relevant hashtags, including brand hashtags like #AfghanAiHub, #AfghanQuest, and others relevant to the campaign.

  Ensure the output is ready to be used in a marketing campaign.
  `,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
