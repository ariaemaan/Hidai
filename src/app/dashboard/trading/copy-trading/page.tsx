
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, UserPlus, ShieldCheck, Copy } from "lucide-react";
import type { MasterTrader } from "@/lib/types";
import { cn } from "@/lib/utils";

const masterTraders: MasterTrader[] = [
    {
        id: "trader1",
        name: "AhmadKabuli_Pro",
        avatarUrl: "https://placehold.co/100x100.png",
        performance_12m: 156,
        winRate: 78.5,
        riskScore: "Moderate",
        followers: 2847,
        specialty: "EUR/USD, GBP/USD",
        strategy: "Swing Trading",
        isIslamicCompliant: true,
    },
    {
        id: "trader2",
        name: "CryptoHalal_Expert",
        avatarUrl: "https://placehold.co/100x100.png",
        performance_12m: 89,
        winRate: 71.2,
        riskScore: "High",
        followers: 1256,
        specialty: "BTC, ETH, Major Altcoins",
        strategy: "Trend Following",
        isIslamicCompliant: true,
    },
    {
        id: "trader3",
        name: "Safi_Momentum",
        avatarUrl: "https://placehold.co/100x100.png",
        performance_12m: 210,
        winRate: 65.8,
        riskScore: "High",
        followers: 982,
        specialty: "Indices & Gold",
        strategy: "Momentum Scalping",
        isIslamicCompliant: false,
    },
];

const yourCopiedTraders = [
    { ...masterTraders[0], myPnl: 1250.75, status: "Active" },
];


export default function CopyTradingPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Copy & Social Trading</h1>
                    <p className="text-muted-foreground">Follow and copy the best traders in the community.</p>
                </div>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trading Hub
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Copy Trading Portfolio</CardTitle>
                    <CardDescription>Track the performance of traders you are currently copying.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Trader</TableHead>
                                    <TableHead>Risk Score</TableHead>
                                    <TableHead className="text-right">My P&L (USD)</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {yourCopiedTraders.map((trader) => (
                                    <TableRow key={trader.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`${trader.avatarUrl}?text=${trader.name.charAt(0)}`} alt={trader.name} data-ai-hint="avatar trader"/>
                                                    <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <p className="font-medium">{trader.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={trader.riskScore === 'High' ? 'destructive' : 'secondary'}>{trader.riskScore}</Badge>
                                        </TableCell>
                                        <TableCell className={cn("text-right font-mono", trader.myPnl > 0 ? "text-accent" : "text-destructive")}>
                                            {trader.myPnl > 0 ? "+" : ""}${trader.myPnl.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge>{trader.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Stop Copying</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-headline font-bold tracking-tight mb-4">Top Master Traders</h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {masterTraders.map((trader) => (
                        <Card key={trader.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary">
                                            <AvatarImage src={`${trader.avatarUrl}?text=${trader.name.charAt(0)}`} alt={trader.name} data-ai-hint="avatar trader profile"/>
                                            <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="font-headline text-xl">{trader.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <UserPlus className="h-4 w-4" /> {trader.followers.toLocaleString()} Followers
                                            </CardDescription>
                                        </div>
                                    </div>
                                    {trader.isIslamicCompliant && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Badge variant="outline" className="border-accent text-accent gap-1">
                                                        <ShieldCheck className="h-3 w-3" /> Halal
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>This trader adheres to Islamic finance principles.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-2 bg-muted rounded-md">
                                        <p className="text-xs text-muted-foreground">Performance (12m)</p>
                                        <p className="font-bold text-lg text-accent">+{trader.performance_12m}%</p>
                                    </div>
                                     <div className="p-2 bg-muted rounded-md">
                                        <p className="text-xs text-muted-foreground">Win Rate</p>
                                        <p className="font-bold text-lg">{trader.winRate}%</p>
                                    </div>
                                     <div className="p-2 bg-muted rounded-md">
                                        <p className="text-xs text-muted-foreground">Risk</p>
                                        <p className="font-bold text-lg">{trader.riskScore}</p>
                                    </div>
                                </div>
                                <div className="text-sm space-y-2">
                                    <p><span className="font-semibold">Specialty:</span> {trader.specialty}</p>
                                    <p><span className="font-semibold">Strategy:</span> {trader.strategy}</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full font-bold">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Trader
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}
