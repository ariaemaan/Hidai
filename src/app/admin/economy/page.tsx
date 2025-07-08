import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminEconomyPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Economy Management</h1>
        <p className="text-muted-foreground">Monitor and manage the Kabuli Coins token economy.</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Detailed economic reports, reward rate adjustments, and staking statistics will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
