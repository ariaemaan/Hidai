import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnDashboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">AfghanX Reward Dashboard</h1>
        <p className="text-muted-foreground">Your hub for earning and managing AXC.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your wallet balance, active earning status, and XP level will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
