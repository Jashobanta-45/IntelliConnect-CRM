"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  IntelligentCallSummarizationInput,
  IntelligentCallSummarizationOutput,
} from "@/ai/flows/intelligent-call-summarization";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ListTodo, Smile, Angry, Meh } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  transcript: z
    .string()
    .min(50, "Transcript must be at least 50 characters long."),
});

type SummarizationFormProps = {
  intelligentCallSummarization: (
    input: IntelligentCallSummarizationInput
  ) => Promise<IntelligentCallSummarizationOutput>;
};

export function SummarizationForm({
  intelligentCallSummarization,
}: SummarizationFormProps) {
  const [result, setResult] = useState<IntelligentCallSummarizationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transcript: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await intelligentCallSummarization(values);
      setResult(response);
    } catch (error) {
      console.error("Error summarizing transcript:", error);
      toast({
        title: "An error occurred.",
        description: "Failed to summarize the transcript. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const SentimentIcon = ({ sentiment }: { sentiment: string }) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <Smile className="h-5 w-5 text-green-500" />;
      case "negative":
        return <Angry className="h-5 w-5 text-red-500" />;
      default:
        return <Meh className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="transcript"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call Transcript</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full call transcript here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {result && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <Badge variant={
                    result.sentiment === 'positive' ? 'default' : result.sentiment === 'negative' ? 'destructive' : 'secondary'
                  } className="capitalize flex items-center gap-1">
                      <SentimentIcon sentiment={result.sentiment} />
                      {result.sentiment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                  {result.summary}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ListTodo /> Action Items
                </h3>
                {result.actionItems.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                    {result.actionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">No action items identified.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate Summary"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
