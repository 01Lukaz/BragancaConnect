
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { NAV_ITEMS } from '@/lib/nav-items';
import { Settings, LogOut } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar
      className="border-r max-w-[1440px]"
      collapsible={state === 'collapsed' ? 'icon' : 'offcanvas'}
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="h-16 items-center flex">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
          <Icons.logo className="h-8 w-8 text-primary shrink-0" />
          <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
            Bragança Connect
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/settings'}
                tooltip="Definições"
              >
                <Link href="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                  <span>Definições</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Sair">
                  <Link href="/">
                    <LogOut className="h-5 w-5 text-destructive" />
                    <span className="text-destructive">Sair</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
