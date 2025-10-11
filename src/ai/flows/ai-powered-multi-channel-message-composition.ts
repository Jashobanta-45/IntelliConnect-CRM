// The ai-powered-multi-channel-message-composition.ts file defines a Genkit flow for composing messages across multiple channels using AI.
// It exports the composeMultiChannelMessage function, along with its input and output types.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultiChannelMessageInputSchema = z.object({
  customerData: z.string().describe('Customer data including demographics and preferences.'),
  interactionHistory: z.string().describe('History of interactions with the customer.'),
  channelPreferences: z.string().describe('Preferred communication channels (SMS, WhatsApp, Email).'),
  messageGoal: z.string().describe('The goal of the message (e.g., promotion, update, feedback).'),
});

export type MultiChannelMessageInput = z.infer<typeof MultiChannelMessageInputSchema>;

const MultiChannelMessageOutputSchema = z.object({
  smsMessage: z.string().describe('AI-composed SMS message.'),
  whatsAppMessage: z.string().describe('AI-composed WhatsApp message.'),
  emailMessage: z.string().describe('AI-composed Email message.'),
});

export type MultiChannelMessageOutput = z.infer<typeof MultiChannelMessageOutputSchema>;

export async function composeMultiChannelMessage(
  input: MultiChannelMessageInput
): Promise<MultiChannelMessageOutput> {
  return composeMultiChannelMessageFlow(input);
}

const multiChannelMessagePrompt = ai.definePrompt({
  name: 'multiChannelMessagePrompt',
  input: {schema: MultiChannelMessageInputSchema},
  output: {schema: MultiChannelMessageOutputSchema},
  prompt: `You are an AI assistant specialized in composing personalized messages across multiple channels.

  Based on the following customer data, interaction history, channel preferences, and message goal, create engaging and effective messages for SMS, WhatsApp, and Email.

  Customer Data: {{{customerData}}}
  Interaction History: {{{interactionHistory}}}
  Channel Preferences: {{{channelPreferences}}}
  Message Goal: {{{messageGoal}}}

  Compose messages that are tailored to each channel, considering character limits and best practices for engagement.
  Make use of emojis in the WhatsApp messages, and use a professional but friendly tone for emails.
  The SMS message should be short and to the point.`,
});

const composeMultiChannelMessageFlow = ai.defineFlow(
  {
    name: 'composeMultiChannelMessageFlow',
    inputSchema: MultiChannelMessageInputSchema,
    outputSchema: MultiChannelMessageOutputSchema,
  },
  async input => {
    const {output} = await multiChannelMessagePrompt(input);
    return output!;
  }
);
