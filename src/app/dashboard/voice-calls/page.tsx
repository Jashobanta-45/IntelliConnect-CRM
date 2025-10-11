"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clients } from "@/lib/data";
import { Phone, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const callScripts = [
  { id: "script1", name: "Appointment Confirmation" },
  { id: "script2", name: "Feedback Collection" },
  { id: "script3", name: "Promotional Offer" },
];

type CallStatus = "idle" | "calling" | "success" | "error";

export default function VoiceCallsPage() {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedScript, setSelectedScript] = useState("");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const { toast } = useToast();

  const handleInitiateCall = () => {
    if (!selectedClient || !selectedScript) {
      toast({
        title: "Missing Information",
        description: "Please select a client and a script before initiating a call.",
        variant: "destructive",
      });
      return;
    }
    setCallStatus("calling");
    setTimeout(() => {
      // Simulate call success/error
      const success = Math.random() > 0.2;
      if (success) {
        setCallStatus("success");
        toast({
          title: "Call Completed",
          description: "The AI-powered call has been successfully completed.",
        });
        setTimeout(() => setCallStatus("idle"), 5000);
      } else {
        setCallStatus("error");
        toast({
          title: "Call Failed",
          description: "The call could not be completed. Please try again.",
          variant: "destructive",
        });
        setTimeout(() => setCallStatus("idle"), 5000);
      }
    }, 3000);
  };

  const getStatusContent = () => {
    switch (callStatus) {
      case "calling":
        return (
          <div className="flex items-center text-primary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Calling...</span>
          </div>
        );
      case "success":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Call successful! A summary will be generated.</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Call failed. Please check logs.</span>
          </div>
        );
      default:
        return <span>Ready to initiate AI call.</span>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI-Driven Voice Calls</CardTitle>
        <CardDescription>
          Automate outbound calls with natural voice using dynamic scripts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="client-select">Select Client</Label>
          <Select onValueChange={setSelectedClient} value={selectedClient}>
            <SelectTrigger id="client-select">
              <SelectValue placeholder="Choose a client..." />
            </SelectTrigger>
            <SelectContent>
              {clients
                .filter((c) => c.status !== "Archived")
                .map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} - {client.company}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="script-select">Select Call Script</Label>
          <Select onValueChange={setSelectedScript} value={selectedScript}>
            <SelectTrigger id="script-select">
              <SelectValue placeholder="Choose a script..." />
            </SelectTrigger>
            <SelectContent>
              {callScripts.map((script) => (
                <SelectItem key={script.id} value={script.id}>
                  {script.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground p-4 border rounded-md min-h-[50px] flex items-center justify-center">
            {getStatusContent()}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleInitiateCall} disabled={callStatus === "calling"}>
          <Phone className="mr-2 h-4 w-4" />
          Initiate Call
        </Button>
      </CardFooter>
    </Card>
  );
}
