"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Home, Gamepad2, User, Trophy, Footprints, ClipboardList, PiggyBank } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

const menuItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/games", label: "Games", icon: Gamepad2 },
  { href: "/dashboard/move", label: "Move", icon: Footprints },
  { href: "/dashboard/quests", label: "Quests", icon: ClipboardList },
  { href: "/dashboard/invest", label: "Invest", icon: PiggyBank },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
            <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} asChild>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "font-headline",
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex items-center justify-between p-2 gap-2 group-data-[collapsible=icon]:flex-col">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
