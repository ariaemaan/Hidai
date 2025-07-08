
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronsUp, ChevronUp, Minus, ChevronDown, ChevronsDown, AlertCircle, CheckCircle, XCircle, Trophy } from "lucide-react";
import type { TradingSignal, SignalType, MarketAsset } from "@/lib/types";
import { cn } from "@/lib/utils";


const marketData: MarketAsset[] = [
    { name: "EUR/USD", ticker: "EURUSD", price: "1.0845", change: "+0.0025", isUp: true },
    { name: "BTC/USD", ticker: "BTCUSD", price: "67,250", change: "-1,230", isUp: false },
    { name: "Gold", ticker: "XAUUSD", price: "2,350.75", change: "+15.50", isUp: true },
    { name: "S&P 500", ticker: "SPX500", price: "5,280.41", change: "+30.15", isUp: true },
    { name: "Oil (WTI)", ticker: "USO", price: "78.90", change: "-0.50", isUp: false },
    { name: "ETH/USD", ticker: "ETHUSD", price: "3,780.10", change: "+120.45", isUp: true },
];

const signalData: TradingSignal[] = [
  { id: "1247", asset: "EUR/USD", assetClass: 'forex', type: "STRONG_BUY", entry: 1.0845, tp: [1.0875, 1.0910, 1.0945], sl: 1.0815, riskReward: "1:2.2", confidence: 87, timeframe: "4H", status: "active" },
  { id: "1248", asset: "BTC/USD", assetClass: 'crypto', type: "BUY", entry: 67250, tp: [68500, 69800, 71200], sl: 66000, riskReward: "1:3.2", confidence: 78, timeframe: "1D", status: "active" },
  { id: "1249", asset: "Gold (XAU/USD)", assetClass: 'commodity', type: "SELL", entry: 2350.75, tp: [2330.50, 2315.00], sl: 2365.25, riskReward: "1:1.8", confidence: 72, timeframe: "1H", status: "active" },
  { id: "1245", asset: "GBP/USD", assetClass: 'forex', type: "BUY", entry: 1.2710, tp: [1.2750], sl: 1.2680, riskReward: "1:1.3", confidence: 92, timeframe: "15min", status: "closed_win" },
  { id: "1244", asset: "ETH/USD", assetClass: 'crypto', type: "STRONG_SELL", entry: 3850.00, tp: [3700.00], sl: 3950.00, riskReward: "1:1.5", confidence: 81, timeframe: "4H", status: "closed_loss" },
  { id: "1246", asset: "USD/JPY", assetClass: 'forex', type: "HOLD", entry: 157.20, tp: [], sl: 0, riskReward: "N/A", confidence: 50, timeframe: "1D", status: "active" },
];

const SignalBadge = ({ type }: { type: SignalType }) => {
  const styles: Record<SignalType, string> = {
    STRONG_BUY: "bg-accent/20 text-accent border-accent/30",
    BUY: "bg-accent/20 text-accent border-accent/30",
    HOLD: "bg-muted text-muted-foreground border-border",
    SELL: "bg-destructive/20 text-destructive border-destructive/30",
    STRONG_SELL: "bg-destructive/20 text-destructive border-destructive/30",
  };
  const icons: Record<SignalType, React.ReactNode> = {
    STRONG_BUY: <ChevronsUp className="h-3 w-3" />,
    BUY: <ChevronUp className="h-3 w-3" />,
    HOLD: <Minus className="h-3 w-3" />,
    SELL: <ChevronDown className="h-3 w-3" />,
    STRONG_SELL: <ChevronsDown className="h-3 w-3" />,
  };

  return (
    <Badge variant="outline" className={cn("gap-1 pl-1.5 pr-2.5", styles[type])}>
      {icons[type]}
      <span className="font-semibold">{type.replace('_', ' ')}</span>
    </Badge>
  );
};


export default function TradingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">AI Trading Signals</h1>
                <p className="text-muted-foreground">Professional-grade market analysis powered by Gemini AI.</p>
            </div>
            
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        <span>Live Performance Showcase</span>
                    </CardTitle>
                    <CardDescription>
                        See our AI-generated signals traded on a real account. We believe in full transparency.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">Total Return</p>
                        <p className="text-2xl font-bold font-mono text-accent">+89.4%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-bold font-mono">76.8%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">Starting Balance</p>
                        <p className="text-2xl font-bold font-mono">$25,000</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-2xl font-bold font-mono">$47,350</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/dashboard/trading/live-account">
                            View Live Account Dashboard
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Market Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {marketData.map((asset) => (
                        <div key={asset.ticker} className="p-3 rounded-lg bg-muted/50">
                            <p className="text-sm font-semibold">{asset.name}</p>
                            <p className="text-xl font-bold font-mono">{asset.price}</p>
                            <p className={cn("text-sm font-mono", asset.isUp ? 'text-accent' : 'text-destructive')}>{asset.change}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Active Signals */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Active Trading Signals</CardTitle>
                    <CardDescription>Real-time signals generated by our AI. Use with caution and your own analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Asset</TableHead>
                                <TableHead>Signal</TableHead>
                                <TableHead className="text-right">Entry Price</TableHead>
                                <TableHead>Take Profit</TableHead>
                                <TableHead className="text-right">Stop Loss</TableHead>
                                <TableHead className="text-center">Details</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {signalData.map((signal) => (
                                <TableRow key={signal.id}>
                                    <TableCell className="font-medium">{signal.asset}</TableCell>
                                    <TableCell><SignalBadge type={signal.type} /></TableCell>
                                    <TableCell className="text-right font-mono">{signal.entry.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {signal.tp.map((target, i) => (
                                                <span key={i} className="text-xs font-mono text-accent">TP{i + 1}: {target.toLocaleString()}</span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-destructive">{signal.sl > 0 ? signal.sl.toLocaleString() : 'N/A'}</TableCell>
                                    <TableCell className="text-center text-xs">
                                        <p>R/R: {signal.riskReward}</p>
                                        <p>Conf: {signal.confidence}%</p>
                                        <p>Frame: {signal.timeframe}</p>
                                    </TableCell>
                                     <TableCell className="text-center">
                                       <Badge variant={signal.status === "active" ? "secondary" : signal.status === "closed_win" ? "default" : "destructive"}>
                                         {signal.status.replace('_', ' ')}
                                       </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid gap-8 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Signal Accuracy (30d)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2">
                            <p className="text-4xl font-bold">82.5%</p>
                            <p className="text-accent font-semibold">+3.2%</p>
                        </div>
                        <Progress value={82.5} className="mt-2 h-2" />
                        <p className="text-sm text-muted-foreground mt-2">Based on 1,247 closed signals.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Win/Loss Ratio (30d)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2 text-green-500">
                               <CheckCircle className="w-5 h-5"/>
                               <span className="font-bold text-lg">1029 Wins</span>
                           </div>
                           <div className="flex items-center gap-2 text-red-500">
                               <XCircle className="w-5 h-5"/>
                               <span className="font-bold text-lg">218 Losses</span>
                           </div>
                       </div>
                       <p className="text-sm text-muted-foreground">A 4.72 win/loss ratio demonstrates consistent performance.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">Average Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2">
                            <p className="text-4xl font-bold">+1.2%</p>
                            <p className="text-muted-foreground">per trade</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Calculated across all asset classes, net of losses.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
