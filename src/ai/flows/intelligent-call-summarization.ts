'use server';

/**
 * @fileOverview A flow that summarizes call transcripts, highlighting key discussion points and action items.
 *
 * - intelligentCallSummarization - A function that handles the call transcript summarization process.
 * - IntelligentCallSummarizationInput - The input type for the intelligentCallSummarization function.
 * - IntelligentCallSummarizationOutput - The return type for the intelligentCallSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentCallSummarizationInputSchema = z.object({
  transcript: z
    .string()
    .describe('The transcript of the call to be summarized.'),
});
export type IntelligentCallSummarizationInput = z.infer<
  typeof IntelligentCallSummarizationInputSchema
>;

const IntelligentCallSummarizationOutputSchema = z.object({
  summary: z.string().describe('A summary of the call transcript.'),
  actionItems: z
    .array(z.string())
    .describe('A list of action items identified in the call transcript.'),
  sentiment: z
    .string()
    .describe('The overall sentiment of the call (positive, negative, neutral).'),
});
export type IntelligentCallSummarizationOutput = z.infer<
  typeof IntelligentCallSummarizationOutputSchema
>;

export async function intelligentCallSummarization(
  input: IntelligentCallSummarizationInput
): Promise<IntelligentCallSummarizationOutput> {
  return intelligentCallSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentCallSummarizationPrompt',
  input: {schema: IntelligentCallSummarizationInputSchema},
  output: {schema: IntelligentCallSummarizationOutputSchema},
  prompt: `You are an AI assistant that analyzes call transcripts and provides summaries, action items, and sentiment analysis.

  Analyze the following call transcript:
  {{transcript}}

  Provide a summary of the call, identify any action items, and determine the overall sentiment of the call.
  Return the results in JSON format.
  Make sure to return valid JSON.
  Here is the schema you must follow:
  Summary: describes in short the content of the call.
  ActionItems: A list of things that need to be done as a result of the call.
  Sentiment: Overall sentiment of the call. Accepted values are 'positive', 'negative', 'neutral'.
  `,
});

const intelligentCallSummarizationFlow = ai.defineFlow(
  {
    name: 'intelligentCallSummarizationFlow',
    inputSchema: IntelligentCallSummarizationInputSchema,
    outputSchema: IntelligentCallSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
