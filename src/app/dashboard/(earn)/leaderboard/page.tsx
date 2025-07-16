import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnLeaderboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">AXC Leaderboard</h1>
        <p className="text-muted-foreground">See the top AXC holders in the community.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>The leaderboard of top coin holders will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
