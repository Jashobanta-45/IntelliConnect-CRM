'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart2,
  BotMessageSquare,
  Users,
  MessageSquareHeart,
  FileText,
  Phone,
  Settings,
  CircleHelp,
  Contact,
  Star,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { useUser } from '@/firebase';

const navItems = [
  {
    href: '/dashboard',
    icon: BarChart2,
    label: 'Dashboard',
    tooltip: 'Analytics Dashboard',
  },
  {
    href: '/dashboard/clients',
    icon: Users,
    label: 'Clients',
    tooltip: 'Client Database',
  },
  {
    href: '/dashboard/contacts',
    icon: Contact,
    label: 'Contacts',
    tooltip: 'Contact Submissions',
  },
  {
    href: '/dashboard/reviews',
    icon: Star,
    label: 'Reviews',
    tooltip: 'Customer Reviews',
  },
  {
    href: '/dashboard/voice-calls',
    icon: Phone,
    label: 'Voice Calls',
    tooltip: 'AI Voice Calls',
  },
  {
    href: '/dashboard/engagement',
    icon: BotMessageSquare,
    label: 'Engagement',
    tooltip: 'Multi-Channel Engagement',
  },
  {
    href: '/dashboard/summarization',
    icon: MessageSquareHeart,
    label: 'Summarization',
    tooltip: 'Call Summary & Analysis',
  },
  {
    href: '/dashboard/scripts',
    icon: FileText,
    label: 'Scripts',
    tooltip: 'Call Script Configuration',
  },
];

const bottomNavItems = [
    {
      href: '/dashboard/settings',
      icon: Settings,
      label: 'Settings',
      tooltip: 'Settings',
    },
    {
        href: '#',
        icon: CircleHelp,
        label: 'Help',
        tooltip: 'Help',
      },
  ];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Icons.logo className="h-8 w-8 text-primary shrink-0" />
            <span className="font-bold text-lg font-headline truncate">
              IntelliConnect CRM
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.tooltip }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.tooltip }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="shrink-0 md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    