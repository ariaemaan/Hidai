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
import { Home, Gamepad2, Trophy, Footprints, ClipboardList, PiggyBank, TrendingUp, GraduationCap, Shield, BookMarked } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

const menuItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/games", label: "Games", icon: Gamepad2 },
  { href: "/dashboard/move", label: "Move", icon: Footprints },
  { href: "/dashboard/learn", label: "Learn", icon: GraduationCap },
  { href: "/dashboard/kankor", label: "Kankor Prep", icon: BookMarked },
  { href: "/dashboard/quests", label: "Quests", icon: ClipboardList },
  { href: "/dashboard/invest", label: "Invest", icon: PiggyBank },
  { href: "/dashboard/trading", label: "Trading", icon: TrendingUp },
];

const userMenuItems = [
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
]

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
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href) && (item.href !== "/dashboard" || pathname === "/dashboard")}
                tooltip={{
                  children: item.label,
                  className: "font-headline",
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarSeparator className="my-2"/>
           {userMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{
                  children: item.label,
                  className: "font-headline",
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            <SidebarSeparator className="my-2"/>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{
                  children: "Admin Panel",
                  className: "font-headline",
                }}
              >
                <Link href="/admin">
                  <Shield />
                  <span>Admin Panel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
