import { BalanceCard } from "@/components/dashboard/balance-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { WalletActionsCard } from "@/components/dashboard/wallet-actions-card";
import { Gamepad2, Trophy, PiggyBank } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">An overview of your KabuliCoin economy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BalanceCard />
        <StatsCard
          title="Games Played"
          value="128"
          icon={Gamepad2}
          details="+5 from last week"
        />
        <StatsCard
          title="Rank"
          value="#1,204"
          icon={Trophy}
          details="Top 15%"
        />
        <StatsCard
          title="Total Staked"
          value="25,000"
          icon={PiggyBank}
          details="+5,000 this week"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <TransactionsHistory />
        </div>
        <div className="lg:col-span-3">
            <WalletActionsCard />
        </div>
      </div>
    </div>
  );
}
