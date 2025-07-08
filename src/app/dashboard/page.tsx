import { BalanceCard } from "@/components/dashboard/balance-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gamepad2, Trophy, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, get an overview of your progress.</p>
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
          title="Friends"
          value="32"
          icon={Users}
          details="+2 new friends"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <TransactionsHistory />
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Start a New Game</CardTitle>
              <CardDescription>
                Choose a game to play and earn more coins.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center">
              <div className="text-center">
                 <div className="flex justify-center mb-4">
                  <Gamepad2 className="w-16 h-16 text-accent" />
                 </div>
                 <p className="text-muted-foreground mb-4">Ready for a new challenge?</p>
                 <Button size="lg" className="font-bold">Play Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
