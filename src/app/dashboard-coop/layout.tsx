import { AppHeader } from '@/components/layout/app-header';
import { CoopAppSidebar } from '@/components/layout/coop-app-sidebar';
import {
  SidebarProvider
} from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full" style={{ WebkitTapHighlightColor: 'transparent' }}>
        <CoopAppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
