import { BalanceCard } from "@/components/dashboard/balance-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { KabiBotChat } from "@/components/dashboard/kabi-bot-chat";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">An overview of your KabuliCoin economy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard />
        <StatsCard
          title="Earned (7d)"
          value="15,350"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          details="KBC"
        />
        <StatsCard
          title="Spent (7d)"
          value="12,500"
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          details="KBC"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <TransactionsHistory />
        </div>
        <div className="lg:col-span-3">
            <KabiBotChat />
        </div>
      </div>
    </div>
  );
}
