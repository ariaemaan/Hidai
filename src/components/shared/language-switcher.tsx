"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSidebar } from "@/components/ui/sidebar";

export function LanguageSwitcher() {
  const { state } = useSidebar();

  if (state === "collapsed") {
     return (
        <Select>
            <SelectTrigger className="w-10 h-10 p-0 justify-center">
                <span className="text-sm">EN</span>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="dr">DR</SelectItem>
                <SelectItem value="ps">PS</SelectItem>
            </SelectContent>
        </Select>
     )
  }

  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="dr">Dari (دری)</SelectItem>
        <SelectItem value="ps">Pashto (پښتو)</SelectItem>
      </SelectContent>
    </Select>
  );
}
