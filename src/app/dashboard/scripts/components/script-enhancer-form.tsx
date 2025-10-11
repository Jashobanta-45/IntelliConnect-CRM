"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  EnhanceCallScriptInput,
  EnhanceCallScriptOutput,
} from "@/ai/flows/automated-call-script-enhancement";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  script: z
    .string()
    .min(20, "Script must be at least 20 characters long."),
  context: z.string().optional(),
});

type ScriptEnhancerFormProps = {
  enhanceCallScript: (
    input: EnhanceCallScriptInput
  ) => Promise<EnhanceCallScriptOutput>;
};

export function ScriptEnhancerForm({
  enhanceCallScript,
}: ScriptEnhancerFormProps) {
  const [result, setResult] = useState<EnhanceCallScriptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: "",
      context: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await enhanceCallScript(values);
      setResult(response);
    } catch (error) {
      console.error("Error enhancing script:", error);
      toast({
        title: "An error occurred.",
        description: "Failed to enhance the script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="script"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Script</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="[Agent]: Hello, is this [Customer Name]? We're calling from..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Context (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Calling a new lead for a demo, following up on a support ticket."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide any additional context to help the AI tailor the script.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {result && (
            <div className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Original Script</h3>
                        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md whitespace-pre-wrap min-h-[150px]">
                            {form.getValues('script')}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                           <Sparkles className="text-primary" /> AI Enhanced Script
                        </h3>
                        <div className="text-sm text-foreground bg-primary/10 p-4 rounded-md whitespace-pre-wrap min-h-[150px]">
                           {result.enhancedScript}
                        </div>
                    </div>
                </div>
                {result.explanation && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Lightbulb /> Explanation
                        </h3>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                            {result.explanation}
                        </p>
                    </div>
                )}
            </div>
          )}

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enhancing...
              </>
            ) : (
              "Enhance Script"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
