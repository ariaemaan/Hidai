"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronsUp, ChevronUp, Minus, ChevronDown, ChevronsDown, Trophy, Sparkles, Loader2, Users, BrainCircuit, Gem, MessageSquare } from "lucide-react";
import { generateTradingSignal, type GenerateTradingSignalOutput } from "@/ai/flows/generateTradingSignalFlow";
import type { TradingSignal, SignalType, MarketAsset } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


const marketData: MarketAsset[] = [
    { name: "EUR/USD", ticker: "EURUSD", price: "1.0845", change: "+0.0025", isUp: true },
    { name: "BTC/USD", ticker: "BTCUSD", price: "67,250", change: "-1,230", isUp: false },
    { name: "Gold", ticker: "XAUUSD", price: "2,350.75", change: "+15.50", isUp: true },
    { name: "S&P 500", ticker: "SPX500", price: "5,280.41", change: "+30.15", isUp: true },
    { name: "Oil (WTI)", ticker: "USO", price: "78.90", change: "-0.50", isUp: false },
    { name: "ETH/USD", ticker: "ETHUSD", price: "3,780.10", change: "+120.45", isUp: true },
];
const timeframes = ["5min", "15min", "1H", "4H", "1D"];

const signalData: TradingSignal[] = [
  { id: "1247", asset: "EUR/USD", assetClass: 'forex', type: "STRONG_BUY", entry: 1.0845, tp: [1.0875, 1.0910, 1.0945], sl: 1.0815, riskReward: "1:2.2", confidence: 87, timeframe: "4H", status: "active" },
  { id: "1248", asset: "BTC/USD", assetClass: 'crypto', type: "BUY", entry: 67250, tp: [68500, 69800, 71200], sl: 66000, riskReward: "1:3.2", confidence: 78, timeframe: "1D", status: "active" },
  { id: "1249", asset: "Gold (XAU/USD)", assetClass: 'commodity', type: "SELL", entry: 2350.75, tp: [2330.50, 2315.00], sl: 2365.25, riskReward: "1:1.8", confidence: 72, timeframe: "1H", status: "active" },
  { id: "1245", asset: "GBP/USD", assetClass: 'forex', type: "BUY", entry: 1.2710, tp: [1.2750], sl: 1.2680, riskReward: "1:1.3", confidence: 92, timeframe: "15min", status: "closed_win" },
  { id: "1244", asset: "ETH/USD", assetClass: 'crypto', type: "STRONG_SELL", entry: 3850.00, tp: [3700.00], sl: 3950.00, riskReward: "1:1.5", confidence: 81, timeframe: "4H", status: "closed_loss" },
  { id: "1246", asset: "USD/JPY", assetClass: 'forex', type: "HOLD", entry: 157.20, tp: [], sl: 0, riskReward: "N/A", confidence: 50, timeframe: "1H", status: "active" },
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

const SignalStrengthIndicator = ({ type }: { type: SignalType }) => {
    const strengthMap: Record<SignalType, { label: string; color: string; icon: React.ReactNode }> = {
        STRONG_BUY: { label: "Strong Buy", color: "text-accent", icon: <ChevronsUp /> },
        BUY: { label: "Buy", color: "text-accent", icon: <ChevronUp /> },
        HOLD: { label: "Hold", color: "text-muted-foreground", icon: <Minus /> },
        SELL: { label: "Sell", color: "text-destructive", icon: <ChevronDown /> },
        STRONG_SELL: { label: "Strong Sell", color: "text-destructive", icon: <ChevronsDown /> },
    };
    const { label, color, icon } = strengthMap[type];
    return (
        <div className={cn("flex items-center gap-2 text-2xl font-bold", color)}>
            {icon}
            <span>{label}</span>
        </div>
    );
};

function GeneratedSignalCard({ signal }: { signal: GenerateTradingSignalOutput }) {
    return (
        <Card className="border-primary/50 shadow-lg animate-in fade-in-50">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <CardTitle className="font-headline text-2xl text-primary">{signal.asset} Signal ({signal.timeframe})</CardTitle>
                        <CardDescription>AI-generated signal based on multi-factor analysis.</CardDescription>
                    </div>
                     <Badge variant="secondary" className="text-sm self-start sm:self-center">Confidence: {signal.confidence}%</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="p-6 rounded-lg bg-muted/50 text-center">
                        <p className="text-sm text-muted-foreground">Signal Type</p>
                        <SignalStrengthIndicator type={signal.type} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 rounded-lg">
                            <p className="text-sm text-muted-foreground">Entry Price</p>
                            <p className="text-xl font-bold font-mono">{signal.entry.toLocaleString()}</p>
                        </div>
                         <div className="p-2 rounded-lg">
                            <p className="text-sm text-muted-foreground">Stop Loss</p>
                            <p className="text-xl font-bold font-mono text-destructive">{signal.sl.toLocaleString()}</p>
                        </div>
                         <div className="p-2 rounded-lg col-span-2">
                            <p className="text-sm text-muted-foreground">Risk/Reward Ratio</p>
                            <p className="text-xl font-bold font-mono">{signal.riskReward}</p>
                        </div>
                    </div>
                </div>
                
                 <div>
                    <h4 className="font-semibold mb-2">Take Profit Levels</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {signal.tp.map((target, i) => (
                             <div key={i} className="p-3 rounded-md border text-center bg-accent/10 border-accent/20">
                                <p className="text-xs font-semibold text-accent/80">TP{i+1}</p>
                                <p className="font-mono font-bold text-accent">{target.toLocaleString()}</p>
                             </div>
                        ))}
                    </div>
                 </div>

                 <div>
                    <h4 className="font-semibold mb-2">AI Reasoning</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{signal.reasoning}</p>
                 </div>
            </CardContent>
        </Card>
    )
}


export default function TradingPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(marketData[0].name);
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[2]);
    const [generatedSignal, setGeneratedSignal] = useState<GenerateTradingSignalOutput | null>(null);

    const handleGenerateSignal = async () => {
        setIsLoading(true);
        setGeneratedSignal(null);
        try {
            const result = await generateTradingSignal({
                asset: selectedAsset,
                timeframe: selectedTimeframe,
            });
            setGeneratedSignal(result);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "AI Signal Error",
                description: "Failed to generate a trading signal. The AI may be busy or the request timed out.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">AI Trading Signals</h1>
                <p className="text-muted-foreground">Professional-grade market analysis powered by Gemini AI.</p>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">On-Demand Signal Generation</CardTitle>
                    <CardDescription>Select an asset and timeframe to get a new AI-powered trading signal instantly.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
                    <div className="space-y-2">
                        <Label htmlFor="asset-select">Asset</Label>
                        <Select value={selectedAsset} onValueChange={setSelectedAsset} disabled={isLoading}>
                            <SelectTrigger id="asset-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {marketData.map(asset => <SelectItem key={asset.ticker} value={asset.name}>{asset.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeframe-select">Timeframe</Label>
                        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe} disabled={isLoading}>
                            <SelectTrigger id="timeframe-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {timeframes.map(tf => <SelectItem key={tf} value={tf}>{tf}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleGenerateSignal} className="w-full font-bold" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        {isLoading ? "Analyzing..." : "Generate Signal"}
                    </Button>
                </CardContent>
            </Card>

            {isLoading && (
                <Card className="flex items-center justify-center p-8 bg-muted/50 border-dashed">
                    <div className="text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>Our AI is analyzing the market... This may take a moment.</p>
                    </div>
                </Card>
            )}

            {generatedSignal && <GeneratedSignalCard signal={generatedSignal} />}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                 <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2">
                            <Gem className="w-6 h-6" />
                            <span>Unlock Premium Features</span>
                        </CardTitle>
                        <CardDescription>
                            Upgrade your plan to access more signals, advanced analytics, and exclusive content.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild className="w-full sm:w-auto">
                            <Link href="/dashboard/trading/subscriptions">
                                View Subscription Plans
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                
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
                    <CardFooter>
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/dashboard/trading/live-account">
                                View Live Account Dashboard
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <BrainCircuit className="w-6 h-6 text-primary" />
                            <span>Market Intelligence Center</span>
                        </CardTitle>
                        <CardDescription>
                            Access advanced AI-powered analytics, sentiment tracking, and economic event data.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/dashboard/trading/intelligence">
                                Go to Intelligence Center
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            <span>Copy & Social Trading</span>
                        </CardTitle>
                        <CardDescription>
                            Follow the strategies of top-performing community members. Copy their trades automatically and share in their success.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild className="w-full sm:w-auto" variant="outline">
                            <Link href="/dashboard/trading/copy-trading">
                                Explore Master Traders
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-full bg-accent/10 border-accent/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-accent flex items-center gap-2">
                            <MessageSquare className="w-6 h-6" />
                            <span>New: Community Hub</span>
                        </CardTitle>
                        <CardDescription>
                            Join the conversation. Share strategies, ask questions, and learn from fellow traders in our new community hub, featuring forums and educational resources.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild className="w-full sm:w-auto" variant="outline">
                            <Link href="/dashboard/trading/community">
                                Explore the Community
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {marketData.map((asset) => (
                        <div key={asset.ticker} className="p-3 rounded-lg bg-muted/50">
                            <p className="text-sm font-semibold">{asset.name}</p>
                            <p className="text-xl font-bold font-mono">{asset.price}</p>
                            <p className={cn("text-sm font-mono", asset.isUp ? 'text-accent' : 'text-destructive')}>{asset.change}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent AI Signals</CardTitle>
                    <CardDescription>Real-time signals generated by our AI. Use with caution and your own analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
