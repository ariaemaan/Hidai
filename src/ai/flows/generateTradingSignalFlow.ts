
'use server';
/**
 * @fileOverview Generates professional trading signals using AI analysis.
 *
 * - generateTradingSignal - A function that creates a trading signal for a given asset.
 * - GenerateTradingSignalInput - The input type for the function.
 * - GenerateTradingSignalOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateTradingSignalInputSchema = z.object({
  asset: z.string().describe("The financial asset to analyze (e.g., 'EUR/USD', 'BTC/USD')."),
  timeframe: z.string().describe("The time frame for the analysis (e.g., '15min', '1H', '4H', '1D').")
});
export type GenerateTradingSignalInput = z.infer<typeof GenerateTradingSignalInputSchema>;

const GenerateTradingSignalOutputSchema = z.object({
    asset: z.string(),
    type: z.enum(['STRONG_BUY', 'BUY', 'HOLD', 'SELL', 'STRONG_SELL']),
    entry: z.number(),
    tp: z.array(z.number()).describe("An array of take profit price levels."),
    sl: z.number().describe("The stop loss price level."),
    riskReward: z.string().describe("The risk-to-reward ratio, as a string (e.g., '1:2.5')."),
    confidence: z.number().min(0).max(100).describe("The AI's confidence level in the signal, from 0 to 100."),
    timeframe: z.string(),
    reasoning: z.string().describe("A brief explanation of the technical and fundamental analysis behind the signal.")
});
export type GenerateTradingSignalOutput = z.infer<typeof GenerateTradingSignalOutputSchema>;

export async function generateTradingSignal(input: GenerateTradingSignalInput): Promise<GenerateTradingSignalOutput> {
  return generateTradingSignalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTradingSignalPrompt',
  input: {schema: GenerateTradingSignalInputSchema},
  output: {schema: GenerateTradingSignalOutputSchema},
  prompt: `You are a professional trading analyst AI for MullaCoin. Your task is to generate a high-quality, actionable trading signal for the asset: {{asset}} on the {{timeframe}} timeframe.

  Analyze all available data, including:
  1.  **Technical Analysis**: Use indicators like RSI, MACD, Bollinger Bands, Fibonacci retracements, and support/resistance levels.
  2.  **Price Action**: Identify key chart patterns (e.g., head and shoulders, double tops/bottoms, trendlines).
  3.  **Fundamental Analysis**: Consider relevant economic news, market sentiment, and geopolitical events.
  4.  **Risk Management**: Calculate a safe stop loss and multiple take-profit levels to create a favorable risk-to-reward ratio.

  Provide a clear signal with all the required parameters in the specified output format. The reasoning should be concise but justify the signal based on your analysis. Ensure the signal is responsible and includes appropriate risk management.
  `,
});

const generateTradingSignalFlow = ai.defineFlow(
  {
    name: 'generateTradingSignalFlow',
    inputSchema: GenerateTradingSignalInputSchema,
    outputSchema: GenerateTradingSignalOutputSchema,
  },
  async (input) => {
    // In a real application, this would call the prompt:
    // const {output} = await prompt(input);
    // return output!;
    
    // For this prototype, we return realistic mock data.
    console.log(`Generating signal for ${input.asset} on ${input.timeframe} timeframe...`);
    
    const mockSignal: GenerateTradingSignalOutput = {
        asset: input.asset,
        type: "BUY",
        entry: 1.0850,
        tp: [1.0880, 1.0920],
        sl: 1.0820,
        riskReward: "1:2.3",
        confidence: 82,
        timeframe: input.timeframe,
        reasoning: "Bullish divergence on the 4H MACD, with price finding support at a key Fibonacci level. Market sentiment is positive following recent economic data."
    };
    
    return mockSignal;
  }
);
