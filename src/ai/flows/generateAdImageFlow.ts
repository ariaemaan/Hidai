'use server';
/**
 * @fileOverview Generates an advertising image for a marketing campaign.
 *
 * - generateAdImage - A function that creates an ad image.
 * - GenerateAdImageInput - The input type for the function.
 * - GenerateAdImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateAdImageInputSchema = z.object({
  campaignDetails: z.string().describe("A summary of the marketing campaign, including goal, audience, and tone. This will be used to generate a relevant ad image."),
});
export type GenerateAdImageInput = z.infer<typeof GenerateAdImageInputSchema>;

const GenerateAdImageOutputSchema = z.object({
  imageUrl: z.string().url().describe("A data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateAdImageOutput = z.infer<typeof GenerateAdImageOutputSchema>;

export async function generateAdImage(input: GenerateAdImageInput): Promise<GenerateAdImageOutput> {
  return generateAdImageFlow(input);
}

const generateAdImageFlow = ai.defineFlow(
  {
    name: 'generateAdImageFlow',
    inputSchema: GenerateAdImageInputSchema,
    outputSchema: GenerateAdImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a visually appealing and culturally appropriate advertisement image for "Ayyan Afg Ai Automation Agency (AAaiAA)", an app about earning rewards by learning about Afghan culture. The image should be inspiring and positive.

      The campaign is about: ${input.campaignDetails}

      Consider themes of Afghan culture (without using explicit religious symbols unless requested), community, technology, and financial empowerment. The style should be modern, clean, inviting, and suitable for a social media ad. It should evoke feelings of pride, connection, and opportunity.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed to return a valid image URL.');
    }

    return {imageUrl: media.url};
  }
);
