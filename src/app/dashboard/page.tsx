import { BalanceCard } from "@/components/dashboard/balance-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { MullaBotChat } from "@/components/dashboard/mulla-bot-chat";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">An overview of your Kabuli Coins economy.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard />
        <StatsCard
          title="Earned (7d)"
          value="15,350"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          details="Kabuli Coins"
        />
        <StatsCard
          title="Spent (7d)"
          value="12,500"
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          details="Kabuli Coins"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TransactionsHistory />
        </div>
        <div className="lg:col-span-2">
            <MullaBotChat />
        </div>
      </div>
    </div>
  );
}
