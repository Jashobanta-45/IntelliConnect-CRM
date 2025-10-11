import Link from "next/link"
import { clients, Client } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

export default function ClientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>
          Manage your clients and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.email}</div>
                </TableCell>
                <TableCell>{client.company}</TableCell>
                <TableCell>
                  <Badge variant={client.status === 'Client' ? 'default' : client.status === 'Lead' ? 'secondary' : 'outline'}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(client.lastContacted).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button asChild variant="ghost" className="h-8 w-8 p-0">
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">View client</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
