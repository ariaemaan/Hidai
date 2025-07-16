import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EarnWalletPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">AXC Wallet</h1>
        <p className="text-muted-foreground">View your transaction history and send AXC.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your transaction history and transfer options will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
