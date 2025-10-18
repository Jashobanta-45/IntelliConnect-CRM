
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Settings, User, LogOut } from "lucide-react"
import { useUser, useAuth } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          toast({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
          });
          router.push('/login');
        } catch (error) {
          toast({
            title: 'Logout Failed',
            description: 'Could not log you out. Please try again.',
            variant: 'destructive',
          });
        }
      };

    return (
      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>
              Manage your account and application preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account
                </h3>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                    {isUserLoading ? (
                        <>
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </>
                    ) : user ? (
                        <>
                            <Avatar className="h-16 w-16">
                                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />}
                                <AvatarFallback className="text-2xl">
                                    {user.email ? user.email.charAt(0).toUpperCase() : <User />}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.displayName || 'No display name'}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </>
                    ) : (
                        <p>No user information available.</p>
                    )}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2" /> Log Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
}
