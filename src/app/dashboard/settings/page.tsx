"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>This is your account information. It cannot be changed at this time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <>
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </>
          ) : user ? (
            <>
               <div className="flex items-center gap-4">
                 <Avatar className="h-20 w-20 text-3xl">
                    <AvatarFallback>
                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-bold font-headline">{user.email}</h2>
                    <p className="text-muted-foreground">Welcome to AAaiAA!</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uid">User ID</Label>
                <Input id="uid" value={user.uid} readOnly />
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
