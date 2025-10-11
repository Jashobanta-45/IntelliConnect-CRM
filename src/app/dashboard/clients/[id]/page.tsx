import { clients } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find(c => c.id === params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={`https://picsum.photos/seed/${client.id}/100/100`} />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{client.name}</CardTitle>
            <CardDescription>{client.company}</CardDescription>
            <Badge variant={client.status === 'Client' ? 'default' : client.status === 'Lead' ? 'secondary' : 'outline'} className="mt-2">
              {client.status}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm">
            <Separator className="my-4" />
            <div className="space-y-2">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{client.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{client.phone}</p>
              </div>
              <div>
                <p className="font-medium">Last Contacted</p>
                <p className="text-muted-foreground">{new Date(client.lastContacted).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Interaction History</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Record of all interactions with {client.name}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mock data for history */}
                <div className="flex items-start gap-4">
                  <div className="text-sm">
                    <p className="font-medium">AI Call initiated</p>
                    <p className="text-muted-foreground">Follow-up for service renewal.</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">2 days ago</div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                  <div className="text-sm">
                    <p className="font-medium">Email Sent</p>
                    <p className="text-muted-foreground">Sent promotional offer for Q3.</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">1 week ago</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Internal notes about {client.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Client is interested in upgrading their plan in the next quarter. Mentioned budget constraints but is open to a good offer.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Campaigns {client.name} is currently a part of.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge>Q3 Promotion</Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
