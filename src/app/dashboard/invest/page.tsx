"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PiggyBank, Target, Users, Heart, Percent, LineChart } from "lucide-react";

const stakingPositions = [
    { id: 1, amount: 15000, apr: 25, lockPeriod: "30 days", unlocks: "in 21 days", compounded: true },
    { id: 2, amount: 10000, apr: 20, lockPeriod: "7 days", unlocks: "in 3 days", compounded: false },
];

const savingsGoals = [
    { name: "Hajj Pilgrimage", current: 12500, target: 150000, progress: (12500 / 150000) * 100 },
    { name: "Education Fund", current: 50000, target: 100000, progress: 50 },
    { name: "Wedding Fund", current: 20000, target: 250000, progress: 8 },
];

export default function InvestPage() {
    const [totalStaked, setTotalStaked] = useState(25000);
    const [lifetimeEarnings, setLifetimeEarnings] = useState(3450);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalStaked(prev => prev + 1);
            setLifetimeEarnings(prev => prev + (Math.random() * 0.05));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Staking & Investments</h1>
                <p className="text-muted-foreground">Grow your Points through staking and savings goals.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium font-headline">Total Staked</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">{totalStaked.toLocaleString()} Points</div>
                        <p className="text-xs text-muted-foreground">+5,000 this week</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium font-headline">Average APR</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-accent">23%</div>
                        <p className="text-xs text-muted-foreground">Weighted average rate</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium font-headline">Lifetime Earnings</CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono text-accent/90">+{Math.round(lifetimeEarnings).toLocaleString()} Points</div>
                        <p className="text-xs text-muted-foreground">Total staking rewards</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">Staking Positions</CardTitle>
                        <CardDescription>Manage your active staking lock-ups.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <Tabs defaultValue="my-positions">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="my-positions">My Positions</TabsTrigger>
                                <TabsTrigger value="community" disabled>Community</TabsTrigger>
                                <TabsTrigger value="charitable" disabled>Charitable</TabsTrigger>
                            </TabsList>
                            <TabsContent value="my-positions" className="mt-4">
                                <div className="overflow-x-auto rounded-lg border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>APR</TableHead>
                                                <TableHead>Unlocks</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stakingPositions.map((pos) => (
                                                <TableRow key={pos.id}>
                                                    <TableCell className="font-mono font-medium">{pos.amount.toLocaleString()} Points</TableCell>
                                                    <TableCell className="text-accent font-semibold">{pos.apr}%</TableCell>
                                                    <TableCell>{pos.unlocks}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" disabled>Unstake</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full font-bold">Stake More Points</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Savings Goals</CardTitle>
                        <CardDescription>Set and track financial goals for your future.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {savingsGoals.map((goal) => (
                            <div key={goal.name} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold">{goal.name}</p>
                                    <p className="text-sm text-muted-foreground font-mono">{goal.current.toLocaleString()} / {goal.target.toLocaleString()}</p>
                                </div>
                                <Progress value={goal.progress} />
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Create New Goal</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
