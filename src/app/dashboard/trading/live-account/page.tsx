
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, BookOpen, HeartHandshake, AlertTriangle, Ban } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { LiveAccountStats, LiveTrade, RiskAlert, RiskAlertLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

// Mock Data
const accountStats: LiveAccountStats = {
  startingBalance: 25000,
  currentBalance: 47350,
  totalProfit: 22350,
  totalReturnPercentage: 89.4,
  winRatePercentage: 76.8,
  riskScore: "Moderate",
  activeTrades: 3,
  maxDrawdown: 8.3,
  sharpeRatio: 2.14,
  dailyVaR: 1250,
  currentExposure: 45,
  correlationRisk: "Low"
};

const tradeHistory: LiveTrade[] = [
  { id: 't1', asset: 'EUR/USD', type: 'LONG', entryPrice: 1.0845, exitPrice: 1.0875, pnl: 450, status: 'CLOSED_WIN', timestamp: '2024-05-20T10:00:00Z' },
  { id: 't2', asset: 'BTC/USD', type: 'LONG', entryPrice: 67250, exitPrice: 68500, pnl: 350, status: 'CLOSED_WIN', timestamp: '2024-05-20T14:30:00Z' },
  { id: 't3', asset: 'GBP/USD', type: 'LONG', entryPrice: 1.2650, currentPrice: 1.2665, pnl: 75, status: 'OPEN', timestamp: '2024-05-21T09:15:00Z' },
  { id: 't4', asset: 'Gold', type: 'LONG', entryPrice: 2045, exitPrice: 2062, pnl: 680, status: 'CLOSED_WIN', timestamp: '2024-05-19T11:00:00Z' },
  { id: 't5', asset: 'USD/JPY', type: 'SHORT', entryPrice: 149.85, exitPrice: 150.15, pnl: -150, status: 'CLOSED_LOSS', timestamp: '2024-05-18T16:45:00Z' },
  { id: 't6', asset: 'ETH/USD', type: 'LONG', entryPrice: 3780, currentPrice: 3815, pnl: 150, status: 'OPEN', timestamp: '2024-05-21T11:05:00Z' },
  { id: 't7', asset: 'Oil (WTI)', type: 'SHORT', entryPrice: 78.90, currentPrice: 78.50, pnl: 200, status: 'OPEN', timestamp: '2024-05-21T12:00:00Z' },
];

const riskAlerts: RiskAlert[] = [
    { level: 'High', message: 'High correlation detected between open EUR/USD and GBP/USD positions.', asset: 'Portfolio' },
    { level: 'Medium', message: 'Upcoming high-impact news event (US CPI) may cause significant volatility.', asset: 'USD Pairs' },
    { level: 'Low', message: 'BTC/USD volatility is within normal parameters for the current trend.', asset: 'BTC/USD' },
];

const accountGrowthData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 28500 },
    { month: 'Mar', value: 33200 },
    { month: 'Apr', value: 39800 },
    { month: 'May', value: 47350 },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const TradeStatusIcon = ({ status }: { status: LiveTrade['status'] }) => {
    if (status.startsWith('CLOSED')) {
        return status === 'CLOSED_WIN' ? 
            <CheckCircle2 className="h-5 w-5 text-accent" /> : 
            <XCircle className="h-5 w-5 text-destructive" />;
    }
    return <Clock className="h-5 w-5 text-yellow-500" />;
}

const RiskAlertIcon = ({ level }: { level: RiskAlertLevel }) => {
    switch (level) {
        case 'High': return <AlertTriangle className="h-5 w-5 mt-1 text-destructive flex-shrink-0" />;
        case 'Medium': return <AlertTriangle className="h-5 w-5 mt-1 text-yellow-500 flex-shrink-0" />;
        case 'Low': return <ShieldCheck className="h-5 w-5 mt-1 text-accent flex-shrink-0" />;
    }
}

export default function LiveAccountPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Live Trading Account</h1>
                    <p className="text-muted-foreground">Real performance and risk data for our AI signals.</p>
                </div>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Signals
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Live Risk & Performance Dashboard</CardTitle>
                    <CardDescription>Comprehensive real-time analysis of the live trading account. Last updated: 2 minutes ago</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-2xl sm:text-3xl font-bold font-mono">{formatCurrency(accountStats.currentBalance)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Return</p>
                        <p className="text-2xl sm:text-3xl font-bold font-mono text-accent">+{accountStats.totalReturnPercentage}%</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold font-mono">{accountStats.winRatePercentage}%</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                        <p className="text-2xl sm:text-3xl font-bold font-mono">{accountStats.sharpeRatio}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Max Drawdown</p>
                        <p className="text-xl font-bold font-mono text-destructive">{accountStats.maxDrawdown}%</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Daily VaR (95%)</p>
                        <p className="text-xl font-bold font-mono">{formatCurrency(accountStats.dailyVaR)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Exposure</p>
                        <p className="text-xl font-bold font-mono">{accountStats.currentExposure}%</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Correlation Risk</p>
                        <p className="text-xl font-bold">{accountStats.correlationRisk}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" /> Risk Alerts
                        </CardTitle>
                        <CardDescription>Live monitor for portfolio risks.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {riskAlerts.map((alert, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <RiskAlertIcon level={alert.level} />
                                <div>
                                    <p className="font-semibold text-sm">{alert.asset}</p>
                                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Account Growth</CardTitle>
                        <CardDescription>Starting Balance: {formatCurrency(accountStats.startingBalance)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={accountGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} domain={['dataMin - 5000', 'dataMax + 5000']} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                    }}
                                    formatter={(value) => formatCurrency(Number(value))}
                                />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Trades</CardTitle>
                    <CardDescription>A transparent history of all executed trades.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Asset</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Entry</TableHead>
                                    <TableHead className="text-right">Exit / Current</TableHead>
                                    <TableHead className="text-right">P&L</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tradeHistory.map((trade) => (
                                    <TableRow key={trade.id}>
                                        <TableCell><TradeStatusIcon status={trade.status} /></TableCell>
                                        <TableCell className="font-medium">{trade.asset}</TableCell>
                                        <TableCell>
                                            <Badge variant={trade.type === 'LONG' ? 'default' : 'destructive'} className="bg-opacity-20 border-opacity-30">
                                                {trade.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono">{trade.entryPrice.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-mono">
                                            {trade.status.startsWith('CLOSED') ? trade.exitPrice?.toLocaleString() : trade.currentPrice?.toLocaleString()}
                                        </TableCell>
                                        <TableCell className={cn(
                                            "text-right font-mono",
                                            (trade.pnl ?? 0) >= 0 ? 'text-accent' : 'text-destructive'
                                        )}>
                                            {trade.pnl ? formatCurrency(trade.pnl) : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck className="text-primary" /> Islamic Finance Principles</CardTitle>
                    <CardDescription>Our commitment to Sharia-compliant trading and risk management.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                        <BookOpen className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Spot Trading Only (No Riba)</h4>
                            <p className="text-sm text-muted-foreground">We avoid interest-based derivatives and focus on direct asset ownership through spot trading.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Ban className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Gharar-Free (No Speculation)</h4>
                            <p className="text-sm text-muted-foreground">Trades are based on clear analysis, avoiding excessive uncertainty or gambling, which is forbidden.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <HeartHandshake className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Ethical Screening & Zakat</h4>
                            <p className="text-sm text-muted-foreground">We trade ethically screened assets and allocate a portion of profits to charity, fulfilling Zakat.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
