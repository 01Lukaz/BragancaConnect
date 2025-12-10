
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
import { NORDESTE_NAV_ITEMS } from '@/lib/nav-items-nordeste';
import { Settings, LogOut } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

export function NordesteAppSidebar() {
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
          href="/dashboard-nordeste"
          className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
          <Icons.logo className="h-8 w-8 text-primary shrink-0" />
          <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
            Portal Nordeste
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {NORDESTE_NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href) && (item.href === '/dashboard-nordeste' ? pathname === item.href : true)}
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
