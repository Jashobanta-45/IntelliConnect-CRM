'use server';

/**
 * @fileOverview An AI agent that suggests improvements to call scripts.
 *
 * - enhanceCallScript - A function that suggests improvements to a call script.
 * - EnhanceCallScriptInput - The input type for the enhanceCallScript function.
 * - EnhanceCallScriptOutput - The return type for the enhanceCallScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceCallScriptInputSchema = z.object({
  script: z.string().describe('The call script to improve.'),
  context: z
    .string()
    .optional()
    .describe('Additional context about the call, such as the recipient.'),
});
export type EnhanceCallScriptInput = z.infer<typeof EnhanceCallScriptInputSchema>;

const EnhanceCallScriptOutputSchema = z.object({
  enhancedScript: z
    .string()
    .describe('The enhanced call script with suggested improvements.'),
  explanation: z
    .string()
    .optional()
    .describe('Explanation of the changes made to the script.'),
});
export type EnhanceCallScriptOutput = z.infer<typeof EnhanceCallScriptOutputSchema>;

export async function enhanceCallScript(input: EnhanceCallScriptInput): Promise<EnhanceCallScriptOutput> {
  return enhanceCallScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceCallScriptPrompt',
  input: {schema: EnhanceCallScriptInputSchema},
  output: {schema: EnhanceCallScriptOutputSchema},
  prompt: `You are an AI assistant that helps improve call scripts for CRM systems.

You are given a call script and optionally, additional context about the call.

Your task is to suggest improvements to the script to make it more effective and engaging.

Consider factors such as clarity, conciseness, and emotional tone.

Respond with an enhanced script and an explanation of the changes you made.

Context: {{{context}}}

Original Script: {{{script}}}

Enhanced Script:`,
});

const enhanceCallScriptFlow = ai.defineFlow(
  {
    name: 'enhanceCallScriptFlow',
    inputSchema: EnhanceCallScriptInputSchema,
    outputSchema: EnhanceCallScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
