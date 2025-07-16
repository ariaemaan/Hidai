import { XBotChat } from "@/components/earn/xbot-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Flame, Gem } from "lucide-react";

export default function EarnDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          AfghanX Reward Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your hub for earning and managing AXC.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
          <Card className="sm:col-span-3">
            <CardHeader>
              <CardTitle className="text-primary font-headline">
                Your AXC Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold font-mono">1,250,340</p>
                <span className="font-mono text-xl text-muted-foreground">AXC</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Earnings</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
             <CardContent>
                <div className="text-2xl font-bold font-mono">+25,000</div>
                <p className="text-xs text-muted-foreground">From all activities</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">XP Level</CardTitle>
                <Gem className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
             <CardContent>
                <div className="text-2xl font-bold font-mono">12</div>
                <p className="text-xs text-muted-foreground">5,200 XP to next level</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Earning Rate</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
             <CardContent>
                <div className="text-2xl font-bold font-mono">1.25x</div>
                <p className="text-xs text-muted-foreground">Active bonuses</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:row-start-1 lg:col-start-2">
           <XBotChat />
        </div>
      </div>
    </div>
  );
}
