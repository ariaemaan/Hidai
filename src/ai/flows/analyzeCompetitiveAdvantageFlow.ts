'use server';
/**
 * @fileOverview Analyzes the competitive landscape to identify unique advantages.
 *
 * - analyzeCompetitiveAdvantage - A function that identifies key market differentiators.
 * - CompetitiveAdvantage - The structure of a single competitive advantage.
 * - AnalyzeCompetitiveAdvantageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { icons } from 'lucide-react';

const validIconNames = Object.keys(icons) as [string, ...string[]];

const CompetitiveAdvantageSchema = z.object({
  icon: z.enum(validIconNames).describe(`A valid lucide-react icon name. Examples: 'BookOpen', 'Users', 'Globe', 'Sparkles', 'ShieldCheck'.`),
  title: z.string().describe('The title of the competitive advantage.'),
  description: z.string().describe('A brief description of the advantage.'),
});
export type CompetitiveAdvantage = z.infer<typeof CompetitiveAdvantageSchema>;

const AnalyzeCompetitiveAdvantageOutputSchema = z.object({
    advantages: z.array(CompetitiveAdvantageSchema).length(4).describe('An array of exactly 4 competitive advantages.'),
});
export type AnalyzeCompetitiveAdvantageOutput = z.infer<typeof AnalyzeCompetitiveAdvantageOutputSchema>;

export async function analyzeCompetitiveAdvantage(): Promise<AnalyzeCompetitiveAdvantageOutput> {
  return analyzeCompetitiveAdvantageFlow();
}

const prompt = ai.definePrompt({
  name: 'analyzeCompetitiveAdvantagePrompt',
  output: {schema: AnalyzeCompetitiveAdvantageOutputSchema},
  prompt: `You are a strategic market analyst AI. Your task is to analyze "Afghan AiHub," an app that rewards users for learning about Afghan culture, and identify its key competitive advantages.

  Provide exactly four unique advantages. For each advantage, provide:
  1. A compelling title.
  2. A concise description (1-2 sentences).
  3. A relevant icon name from the lucide-react library.

  Focus on differentiators like cultural authenticity, community focus, hyper-localization, and AI-driven personalization.

  Example icon names: BookOpen, Users, Globe, Sparkles, ShieldCheck, Heart.
  `,
});

const analyzeCompetitiveAdvantageFlow = ai.defineFlow(
  {
    name: 'analyzeCompetitiveAdvantageFlow',
    outputSchema: AnalyzeCompetitiveAdvantageOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
