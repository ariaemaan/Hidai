'use server';
/**
 * @fileOverview Generates a multiple-choice exam for a given cultural topic.
 *
 * - generateExam - A function that creates an exam.
 * - GenerateExamInput - The input type for the function.
 * - GenerateExamOutput - The return type for the function.
 * - ExamQuestion - The structure for a single exam question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateExamInputSchema = z.object({
  topic: z.string().describe("The cultural topic for the exam. e.g., 'History of the Durrani Empire', 'Symbolism in Afghan Rugs', 'Basics of Pashto Grammar'."),
});
export type GenerateExamInput = z.infer<typeof GenerateExamInputSchema>;

const ExamQuestionSchema = z.object({
  question: z.string().describe("The question text."),
  options: z.array(z.string()).length(4).describe("An array of exactly four possible answers."),
  correctAnswerIndex: z.number().min(0).max(3).describe("The index (0-3) of the correct answer in the options array."),
  explanation: z.string().describe("A brief explanation of why the correct answer is right.")
});
export type ExamQuestion = z.infer<typeof ExamQuestionSchema>;

const GenerateExamOutputSchema = z.object({
    questions: z.array(ExamQuestionSchema).length(5).describe('An array of exactly 5 exam questions.'),
});
export type GenerateExamOutput = z.infer<typeof GenerateExamOutputSchema>;

export async function generateExam(input: GenerateExamInput): Promise<GenerateExamOutput> {
  return generateExamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExamPrompt',
  input: {schema: GenerateExamInputSchema},
  output: {schema: GenerateExamOutputSchema},
  prompt: `You are an expert curriculum developer specializing in Afghan culture and history.
  Your task is to create a challenging but fair 5-question multiple-choice exam on the following topic: "{{topic}}".

  For each question, provide:
  1.  A clear and concise question.
  2.  Four distinct options (A, B, C, D). One must be correct.
  3.  The index of the correct answer (0 for A, 1 for B, etc.).
  4.  A brief, helpful explanation for the correct answer.

  The questions should test understanding and not just rote memorization. The incorrect options should be plausible but clearly wrong.
  The entire exam must be culturally sensitive and accurate.
  `,
});

const generateExamFlow = ai.defineFlow(
  {
    name: 'generateExamFlow',
    inputSchema: GenerateExamInputSchema,
    outputSchema: GenerateExamOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
