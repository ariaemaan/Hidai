import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnProfilePage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Your AXC Profile</h1>
        <p className="text-muted-foreground">Manage your avatar, referral code, and migration status.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your profile details for the AfghanX Reward module will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
