import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <UserNav />
        </div>
      </div>
    </header>
  );
}
