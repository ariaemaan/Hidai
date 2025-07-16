import type { ReactNode } from "react";
import { EarnSidebar } from "@/components/earn/earn-sidebar";

export default function EarnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
        <EarnSidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </div>
    </div>
  );
}
