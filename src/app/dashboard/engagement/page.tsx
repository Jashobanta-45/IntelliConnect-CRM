import { composeMultiChannelMessage } from "@/ai/flows/ai-powered-multi-channel-message-composition";
import { EngagementForm } from "./components/engagement-form";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function EngagementPage() {
  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>AI-Powered Multi-Channel Message Composition</CardTitle>
            <CardDescription>
            Generate personalized messages for SMS, WhatsApp, and Email using AI. Provide customer data and your goal to compose tailored content for each channel.
            </CardDescription>
        </CardHeader>
        <EngagementForm composeMultiChannelMessage={composeMultiChannelMessage} />
    </Card>
  );
}
