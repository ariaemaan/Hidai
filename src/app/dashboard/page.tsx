import { StatsCard } from "@/components/dashboard/stats-card";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";
import { AfghanAiChat } from "@/components/dashboard/mulla-bot-chat";
import { TrendingDown, TrendingUp, Coins, Bot, Briefcase, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { XBotChat } from "@/components/dashboard/x-bot-chat";

export default function DashboardPage() {
  const balance = 1250340;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">An overview of your AAaiAA economy.</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Welcome to the AAaiAA Ecosystem</CardTitle>
          <CardDescription>Your points are the key to a universe of AI-powered platforms.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-muted"><Briefcase className="h-6 w-6 text-primary" /></div>
                <div>
                    <h4 className="font-semibold">EduAfghanX</h4>
                    <p className="text-sm text-muted-foreground">The learning platform where your journey begins. Earn points by exploring culture and knowledge.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                 <div className="p-3 rounded-full bg-muted"><FileText className="h-6 w-6 text-primary" /></div>
                <div>
                    <h4 className="font-semibold">Doc Aria</h4>
                    <p className="text-sm text-muted-foreground">An intelligent assistant for document analysis and summarization. (Coming Soon)</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                 <div className="p-3 rounded-full bg-muted"><Bot className="h-6 w-6 text-primary" /></div>
                <div>
                    <h4 className="font-semibold">Unified Currency</h4>
                    <p className="text-sm text-muted-foreground">Points you earn here can be used across all our platforms. Soon, you'll be able to transfer and redeem them for a variety of products and services.</p>
                </div>
            </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <XBotChat />
        </div>
        <div className="lg:col-span-2">
            <AfghanAiChat />
        </div>
      </div>
    </div>
  );
}
