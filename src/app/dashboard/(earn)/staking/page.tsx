import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnStakingPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">AXC Staking</h1>
        <p className="text-muted-foreground">Lock your coins to earn a 20% APR.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your staking dashboard and options will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
