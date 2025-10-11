import { intelligentCallSummarization } from "@/ai/flows/intelligent-call-summarization";
import { SummarizationForm } from "./components/summarization-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SummarizationPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Intelligent Call Summarization</CardTitle>
        <CardDescription>
          Paste a call transcript below to automatically generate a summary, extract action items, and analyze sentiment.
        </CardDescription>
      </CardHeader>
      <SummarizationForm
        intelligentCallSummarization={intelligentCallSummarization}
      />
    </Card>
  );
}
