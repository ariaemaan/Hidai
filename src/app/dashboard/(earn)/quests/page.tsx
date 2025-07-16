import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnQuestsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">AXC Quests</h1>
        <p className="text-muted-foreground">Complete daily cultural tasks to earn AXC rewards.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>A list of daily quests for earning AXC will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
