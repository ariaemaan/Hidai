'use server';
/**
 * @fileOverview Generates Kankor exam questions.
 *
 * - generateKankorQuestions - A function that creates Kankor exam questions.
 * - GenerateKankorInput - The input type for the function.
 * - GenerateKankorOutput - The return type for the function.
 * - KankorQuestion - The structure for a single exam question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateKankorInputSchema = z.object({
  subject: z.string().describe("The Kankor subject for the exam. e.g., 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Islamic Studies'."),
  count: z.number().min(1).max(20).default(5).describe("The number of questions to generate."),
});
export type GenerateKankorInput = z.infer<typeof GenerateKankorInputSchema>;

const KankorQuestionSchema = z.object({
  question: z.string().describe("The question text."),
  options: z.array(z.string()).length(4).describe("An array of exactly four possible answers."),
  correctAnswerIndex: z.number().min(0).max(3).describe("The index (0-3) of the correct answer in the options array."),
  explanation: z.string().describe("A brief explanation of why the correct answer is right.")
});
export type KankorQuestion = z.infer<typeof KankorQuestionSchema>;

const GenerateKankorOutputSchema = z.object({
    questions: z.array(KankorQuestionSchema).describe('An array of Kankor exam questions.'),
});
export type GenerateKankorOutput = z.infer<typeof GenerateKankorOutputSchema>;

export async function generateKankorQuestions(input: GenerateKankorInput): Promise<GenerateKankorOutput> {
  return generateKankorQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKankorQuestionsPrompt',
  input: {schema: GenerateKankorInputSchema},
  output: {schema: GenerateKankorOutputSchema},
  prompt: `You are an expert curriculum developer for the Afghan Kankor exam.
  Your task is to create a set of {{count}} high-quality, multiple-choice questions for the subject: "{{subject}}".

  For each question, you must provide:
  1.  A clear, concise, and challenging question appropriate for Kankor level.
  2.  Four distinct options (A, B, C, D). One must be correct.
  3.  The index of the correct answer (0 for A, 1 for B, etc.).
  4.  A brief, helpful explanation for the correct answer that clarifies the concept.

  The questions should be accurate, culturally sensitive, and reflect the Kankor curriculum.
  `,
});

const generateKankorQuestionsFlow = ai.defineFlow(
  {
    name: 'generateKankorQuestionsFlow',
    inputSchema: GenerateKankorInputSchema,
    outputSchema: GenerateKankorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
