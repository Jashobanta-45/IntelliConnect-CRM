"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MultiChannelMessageInput,
  MultiChannelMessageOutput,
} from "@/ai/flows/ai-powered-multi-channel-message-composition";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquareText, Mail, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customerData: z.string().min(10, "Please provide more customer data."),
  interactionHistory: z.string().min(10, "Please provide more interaction history."),
  channelPreferences: z.string().min(2, "Please provide channel preferences."),
  messageGoal: z.string().min(5, "Please describe the message goal."),
});

type EngagementFormProps = {
  composeMultiChannelMessage: (
    input: MultiChannelMessageInput
  ) => Promise<MultiChannelMessageOutput>;
};

export function EngagementForm({
  composeMultiChannelMessage,
}: EngagementFormProps) {
  const [result, setResult] = useState<MultiChannelMessageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerData: "",
      interactionHistory: "",
      channelPreferences: "",
      messageGoal: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await composeMultiChannelMessage(values);
      setResult(response);
    } catch (error) {
      console.error("Error composing message:", error);
      toast({
        title: "An error occurred.",
        description: "Failed to generate messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customerData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Age: 34, Location: New York, Interests: Tech, Hiking" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interactionHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interaction History</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Last purchase: 3 months ago (Product X), Viewed pricing page yesterday." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="channelPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Preferences</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Prefers Email for promotions, WhatsApp for updates" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="messageGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Goal</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Announce a new feature and offer a discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {result && (
            <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold">Generated Messages</h3>
                <Tabs defaultValue="sms" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="sms"><Smartphone className="mr-2 h-4 w-4"/>SMS</TabsTrigger>
                        <TabsTrigger value="whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12.01 2.011a10.435 10.435 0 0 0-7.345 3.123 10.436 10.436 0 0 0-3.124 7.345 10.435 10.435 0 0 0 3.124 7.345 10.436 10.436 0 0 0 7.345 3.123h.01c2.812 0 5.513-1.127 7.464-3.153l1.832-1.832a.5.5 0 0 0-.354-.854l-2.43-.348a.5.5 0 0 0-.488.225l-.715.952a6.604 6.604 0 0 1-8.73-8.73l.952-.715a.5.5 0 0 0 .225-.488l-.348-2.43a.5.5 0 0 0-.854-.354L9.57 3.011A10.38 10.38 0 0 0 2.5 10c0 5.799 4.701 10.5 10.5 10.5a10.38 10.38 0 0 0 6.989-2.57l.001-.001a10.436 10.436 0 0 0 3.124-7.345 10.435 10.435 0 0 0-3.124-7.345A10.436 10.436 0 0 0 12.01 2.011z"/></svg>
                            WhatsApp
                        </TabsTrigger>
                        <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4"/>Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sms">
                        <Card>
                            <CardContent className="p-4 text-sm whitespace-pre-wrap font-mono bg-muted/50 rounded-md">
                                {result.smsMessage}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="whatsapp">
                        <Card>
                            <CardContent className="p-4 text-sm whitespace-pre-wrap font-mono bg-muted/50 rounded-md">
                                {result.whatsAppMessage}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="email">
                        <Card>
                            <CardContent className="p-4 text-sm whitespace-pre-wrap font-mono bg-muted/50 rounded-md">
                                {result.emailMessage}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
          )}

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Compose Messages"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
