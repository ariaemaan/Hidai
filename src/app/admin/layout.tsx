import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/layout/site-header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
           <SiteHeader />
           <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/40">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
  );
}
