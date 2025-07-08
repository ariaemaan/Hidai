
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, BookOpen, HeartHandshake } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { LiveAccountStats, LiveTrade, PerformanceMetric } from "@/lib/types";
import { cn } from "@/lib/utils";

// Mock Data
const accountStats: LiveAccountStats = {
  startingBalance: 25000,
  currentBalance: 47350,
  totalProfit: 22350,
  totalReturnPercentage: 89.4,
  monthlyReturnPercentage: 12.3,
  winRatePercentage: 76.8,
  riskScore: "Moderate",
  activeTrades: 3,
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

const performanceMetrics: PerformanceMetric[] = [
    { label: "Max Drawdown", value: "8.2%", description: "Largest peak-to-trough decline." },
    { label: "Sharpe Ratio", value: "1.85", description: "Risk-adjusted return." },
    { label: "Average Trade Duration", value: "8.5 Hours", description: "Average time a trade is held." },
    { label: "Profit Factor", value: "2.5", description: "Gross profits / gross losses." },
];

const accountGrowthData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 28500 },
    { month: 'Mar', value: 33200 },
    { month: 'Apr', value: 39800 },
    { month: 'May', value: 47350 },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const TradeStatusIcon = ({ status, pnl }: { status: LiveTrade['status'], pnl?: number }) => {
    if (status.startsWith('CLOSED')) {
        return status === 'CLOSED_WIN' ? 
            <CheckCircle2 className="h-5 w-5 text-accent" /> : 
            <XCircle className="h-5 w-5 text-destructive" />;
    }
    return <Clock className="h-5 w-5 text-yellow-500" />;
}

export default function LiveAccountPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Live Trading Account</h1>
                    <p className="text-muted-foreground">Real performance data for our AI signals.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Signals
                    </Link>
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Live Performance Dashboard</CardTitle>
                        <CardDescription>Last updated: 2 minutes ago</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-3xl font-bold font-mono">{formatCurrency(accountStats.currentBalance)}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Profit</p>
                            <p className="text-3xl font-bold font-mono text-accent">{formatCurrency(accountStats.totalProfit)}</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Return</p>
                            <p className="text-3xl font-bold font-mono text-accent">+{accountStats.totalReturnPercentage}%</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Win Rate</p>
                            <p className="text-2xl font-bold font-mono">{accountStats.winRatePercentage}%</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Monthly Return</p>
                            <p className="text-2xl font-bold font-mono">+{accountStats.monthlyReturnPercentage}%</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Risk Score</p>
                            <p className="text-2xl font-bold">{accountStats.riskScore}</p>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
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
                                    <TableCell><TradeStatusIcon status={trade.status} pnl={trade.pnl} /></TableCell>
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
                </CardContent>
            </Card>
            
             <div className="grid gap-8 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Performance Metrics</CardTitle>
                        <CardDescription>Detailed risk and performance analytics.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 sm:grid-cols-2">
                        {performanceMetrics.map((metric) => (
                            <div key={metric.label}>
                                <p className="text-sm text-muted-foreground">{metric.label}</p>
                                <p className="text-2xl font-bold font-mono">{metric.value}</p>
                                <p className="text-xs text-muted-foreground">{metric.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck className="text-primary" /> Islamic Trading Compliance</CardTitle>
                        <CardDescription>Our commitment to Sharia-compliant principles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 mt-1 text-accent" />
                            <div>
                                <h4 className="font-semibold">Spot Trading Only</h4>
                                <p className="text-sm text-muted-foreground">We avoid interest-based (Riba) derivatives and focus on direct asset ownership through spot trading.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <HeartHandshake className="h-5 w-5 mt-1 text-accent" />
                            <div>
                                <h4 className="font-semibold">Charitable Contributions</h4>
                                <p className="text-sm text-muted-foreground">A portion of profits is allocated to charitable causes, fulfilling the principle of Zakat.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
