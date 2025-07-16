import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnTapPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Tap to Earn</h1>
        <p className="text-muted-foreground">Tap the coin to earn AXC.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>The tap-to-earn game screen will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
