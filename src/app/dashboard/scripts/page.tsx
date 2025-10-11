import { enhanceCallScript } from "@/ai/flows/automated-call-script-enhancement";
import { ScriptEnhancerForm } from "./components/script-enhancer-form";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function ScriptsPage() {
  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Dynamic Call Script Configuration</CardTitle>
            <CardDescription>
                Improve your call scripts with AI-powered suggestions. Enter your script and optional context to receive an enhanced version with explanations.
            </CardDescription>
        </CardHeader>
        <ScriptEnhancerForm enhanceCallScript={enhanceCallScript} />
    </Card>
  );
}
