"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, ClipboardList, PiggyBank, Wallet, Trophy, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/dashboard/earn/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/earn/tap", label: "Tap to Earn", icon: Gamepad2 },
  { href: "/dashboard/earn/quests", label: "Quests", icon: ClipboardList },
  { href: "/dashboard/earn/staking", label: "Staking", icon: PiggyBank },
  { href: "/dashboard/earn/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/earn/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/earn/profile", label: "Profile", icon: User },
];

export function EarnSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 border-r bg-muted/40 p-4 flex-col hidden md:flex">
        <div className="mb-4">
            <h2 className="text-2xl font-headline font-bold">AfghanX Reward</h2>
            <p className="text-sm text-muted-foreground">Play-and-Earn Module</p>
        </div>
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === item.href && "bg-primary/10 text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
        <div className="mt-auto">
            <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to EduAfghanX
                </Link>
            </Button>
        </div>
    </aside>
  );
}
