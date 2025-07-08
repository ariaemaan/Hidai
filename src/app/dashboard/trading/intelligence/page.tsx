
"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BrainCircuit, CalendarClock, TrendingUp, Link2, Newspaper, Gauge, Shield, Scaling } from "lucide-react";
import type { MarketIntelligenceSummary, EconomicEvent, MarketCorrelation, TrendAnalysis, EconomicEventImpact, TrendBias } from "@/lib/types";
import { cn } from "@/lib/utils";

// Mock Data
const summary: MarketIntelligenceSummary = {
  sentiment: 'Bullish',
  sentimentScore: 72,
  volatilityIndex: 18.3,
  volatilityDescription: 'Normal',
  usdStrength: 0.8,
  cryptoFearGreed: 65,
  cryptoFearGreedDescription: 'Greed',
  highImpactEvents: 2,
  newsSentiment: 'Positive',
  technicalBias: 'Bullish',
  riskAppetite: 'Moderate'
};

const events: EconomicEvent[] = [
  { impact: 'High', event: 'US NFP (Non-Farm Payroll)', time: 'Friday 8:30 AM' },
  { impact: 'Medium', event: 'ECB President Speech', time: 'Today 2:00 PM' },
  { impact: 'Low', event: 'German CPI Data', time: 'Tomorrow 9:00 AM' },
];

const correlations: MarketCorrelation[] = [
  { pair: 'EUR/USD ↔ DXY', correlation: -0.89, description: 'Strong Negative' },
  { pair: 'BTC/USD ↔ Gold', correlation: 0.34, description: 'Weak Positive' },
  { pair: 'Oil ↔ USD/CAD', correlation: -0.76, description: 'Strong Negative' },
  { pair: 'S&P 500 ↔ VIX', correlation: -0.82, description: 'Strong Negative' },
];

const trends: TrendAnalysis[] = [
  { asset: 'EUR/USD', trends: [{ timeframe: '4H', bias: 'Bullish' }, { timeframe: '1D', bias: 'Neutral' }] },
  { asset: 'GBP/USD', trends: [{ timeframe: '1H', bias: 'Bearish' }, { timeframe: '4H', bias: 'Bullish' }] },
  { asset: 'BTC/USD', trends: [{ timeframe: '4H', bias: 'Bullish' }, { timeframe: '1D', bias: 'Bullish' }] },
  { asset: 'Gold', trends: [{ timeframe: '1D', bias: 'Consolidating' }] },
];

const impactColors: Record<EconomicEventImpact, string> = {
  High: 'bg-destructive/20 text-destructive',
  Medium: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  Low: 'bg-accent/20 text-accent',
};

const trendColors: Record<TrendBias, string> = {
    Bullish: 'text-accent',
    Bearish: 'text-destructive',
    Neutral: 'text-muted-foreground',
    Consolidating: 'text-blue-500',
}

const summaryItems = [
    { icon: Gauge, label: "Market Sentiment", value: `${summary.sentiment} (${summary.sentimentScore}%)`, color: "text-accent" },
    { icon: Scaling, label: "Volatility Index (VIX)", value: `${summary.volatilityIndex} (${summary.volatilityDescription})` },
    { icon: Gauge, label: "Crypto Fear & Greed", value: `${summary.cryptoFearGreed} (${summary.cryptoFearGreedDescription})`, color: "text-accent" },
    { icon: Shield, label: "Risk Appetite", value: summary.riskAppetite },
    { icon: CalendarClock, label: "High Impact Events", value: summary.highImpactEvents },
    { icon: Newspaper, label: "News Sentiment", value: summary.newsSentiment, color: "text-accent" },
];


export default function MarketIntelligencePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Market Intelligence Center</h1>
                    <p className="text-muted-foreground">Advanced analytics for informed trading decisions.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trading Hub
                    </Link>
                </Button>
            </div>

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-primary">
                        <BrainCircuit /> AI Market Pulse
                    </CardTitle>
                    <CardDescription>A real-time summary of key market indicators, analyzed by AI.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {summaryItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-background border">
                                <item.icon className={cn("h-6 w-6 text-muted-foreground", item.color)} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className={cn("text-xl font-bold font-mono", item.color)}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><TrendingUp /> Trend Analysis</CardTitle>
                        <CardDescription>AI-detected trends across multiple timeframes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Asset</TableHead>
                                    <TableHead>Timeframe</TableHead>
                                    <TableHead className="text-right">Bias</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trends.map((asset) => (
                                    <React.Fragment key={asset.asset}>
                                        {asset.trends.map((trend, index) => (
                                            <TableRow key={trend.timeframe}>
                                                {index === 0 && <TableCell rowSpan={asset.trends.length} className="font-medium align-middle">{asset.asset}</TableCell>}
                                                <TableCell>{trend.timeframe}</TableCell>
                                                <TableCell className={cn("text-right font-semibold", trendColors[trend.bias])}>{trend.bias}</TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                       </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><CalendarClock /> Upcoming Economic Events</CardTitle>
                        <CardDescription>Key events that may impact market volatility.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead className="text-right">Impact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{event.event}</TableCell>
                                        <TableCell>{event.time}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className={cn("font-semibold", impactColors[event.impact])}>{event.impact}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Link2 /> Market Correlations</CardTitle>
                    <CardDescription>Understand how different assets move in relation to each other.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Asset Pair</TableHead>
                                <TableHead>Coefficient</TableHead>
                                <TableHead className="text-right">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {correlations.map((corr, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{corr.pair}</TableCell>
                                    <TableCell className={cn("font-mono", corr.correlation > 0 ? 'text-accent' : 'text-destructive')}>
                                        {corr.correlation.toFixed(2)}
                                    </TableCell>
                                    <TableCell className={cn("text-right font-medium", corr.correlation > 0.5 || corr.correlation < -0.5 ? 'text-foreground' : 'text-muted-foreground')}>
                                        {corr.description}
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
