"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Home, Users, BarChart2, Settings, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/economy", label: "Economy", icon: BarChart2 },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/security", label: "Security", icon: Shield },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r">
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <Button
              variant={pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            Back to App
          </Button>
        </Link>
      </div>
    </div>
  );
}
