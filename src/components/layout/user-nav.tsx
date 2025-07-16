"use client"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User } from "lucide-react"
import Link from "next/link"


export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
                <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-body" align="end" forceMount>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              <span>Homepage</span>
            </Link>
          </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
