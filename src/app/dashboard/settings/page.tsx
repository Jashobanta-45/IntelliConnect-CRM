
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Construction, Settings } from "lucide-react"
  
export default function SettingsPage() {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>
              Manage your account and application settings. This page is currently under development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                <Construction className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Under Construction</h3>
                <p className="text-muted-foreground">
                    We are working hard to bring you more settings and features. Check back soon!
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}
