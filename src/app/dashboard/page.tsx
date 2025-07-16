import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { AfghanAiChat } from "@/components/dashboard/mulla-bot-chat";
import { TrendingDown, TrendingUp, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const balance = 1250340;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">An overview of your Afghan AiHub economy.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="font-headline text-primary-foreground/80 flex items-center justify-between">
                    <span>Point Balance</span>
                    <Coins className="w-6 h-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-mono">{balance.toLocaleString()}</div>
                <p className="text-xs text-primary-foreground/80 mt-1">Your available rewards balance.</p>
            </CardContent>
        </Card>
        <StatsCard
          title="Earned (7d)"
          value="15,350"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          details="Points"
        />
        <StatsCard
          title="Spent (7d)"
          value="12,500"
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          details="Points"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TransactionsHistory />
        </div>
        <div className="lg:col-span-2">
            <AfghanAiChat />
        </div>
      </div>
    </div>
  );
}
