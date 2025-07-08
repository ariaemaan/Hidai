"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { day: "Mon", tap: 1500, move: 400, quest: 200 },
  { day: "Tue", tap: 1200, move: 300, quest: 500 },
  { day: "Wed", tap: 1800, move: 600, quest: 100 },
  { day: "Thu", tap: 2200, move: 550, quest: 300 },
  { day: "Fri", tap: 1600, move: 700, quest: 250 },
  { day: "Sat", tap: 2500, move: 900, quest: 600 },
  { day: "Sun", tap: 3000, move: 1200, quest: 1000 },
];

const chartConfig = {
  tap: {
    label: "Tap",
    color: "hsl(var(--chart-1))",
  },
  move: {
    label: "Move",
    color: "hsl(var(--chart-2))",
  },
  quest: {
    label: "Quest",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function WalletActionsCard() {
    const stakedAmount = 25000;
    const apr = 20;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Wallet & Earnings</CardTitle>
              <CardDescription>
                Stake your coins and track your earnings.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Tabs defaultValue="staking" className="w-full flex-1 flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="staking">Staking</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="staking" className="flex-1 flex flex-col justify-center items-center text-center mt-4">
                        <h3 className="text-lg font-semibold">Staking Portfolio</h3>
                        <p className="text-muted-foreground text-sm mb-4">Lock your KBC to earn passive rewards.</p>
                        <div className="w-full max-w-xs space-y-4">
                            <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Currently Staked</p>
                                <p className="text-3xl font-bold font-mono">{stakedAmount.toLocaleString()} KBC</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Annual Rate (APR)</p>
                                <p className="text-3xl font-bold text-accent">{apr}%</p>
                            </div>
                             <div className="flex gap-2 pt-2">
                                <Button className="w-full font-bold">Stake More</Button>
                                <Button variant="outline" className="w-full">Unstake</Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4 flex-1">
                       <p className="text-sm text-muted-foreground mb-2">Earnings last 7 days</p>
                       <ChartContainer config={chartConfig} className="h-[200px] w-full">
                         <BarChart accessibilityLayer data={chartData}>
                           <XAxis
                             dataKey="day"
                             tickLine={false}
                             tickMargin={10}
                             axisLine={false}
                             tickFormatter={(value) => value.slice(0, 3)}
                           />
                           <ChartTooltip
                             cursor={false}
                             content={<ChartTooltipContent indicator="dot" />}
                           />
                           <Bar dataKey="tap" fill="var(--color-tap)" radius={4} />
                           <Bar dataKey="move" fill="var(--color-move)" radius={4} />
                           <Bar dataKey="quest" fill="var(--color-quest)" radius={4} />
                         </BarChart>
                       </ChartContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
          </Card>
    )
}
