'"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart2, DollarSign, Activity, AlertTriangle, Flame, Coins, ArrowRightLeft, Shield } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useState } from "react";
import { analyzeCompetitiveAdvantage, type CompetitiveAdvantage } from "@/ai/flows/analyzeCompetitiveAdvantageFlow";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof icons;

const RenderIcon = ({ name, className }: { name: IconName; className?: string }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return <Shield className={className} />;
  }
  return <LucideIcon className={className} />;
};


const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 780 },
  { name: 'May', users: 1890 },
  { name: 'Jun', users: 2390 },
  { name: 'Jul', users: 3490 },
];

const userGrowthChartConfig = {
    users: {
        label: "Users",
        color: "hsl(var(--primary))",
    }
};

const questEngagementData = [
  { name: 'Move', engagement: 7800, fill: 'hsl(var(--chart-1))' },
  { name: 'Religious', engagement: 6200, fill: 'hsl(var(--chart-2))' },
  { name: 'Cultural', engagement: 4500, fill: 'hsl(var(--chart-3))' },
  { name: 'Social', engagement: 3100, fill: 'hsl(var(--chart-4))' },
  { name: 'Educational', engagement: 2500, fill: 'hsl(var(--chart-5))' },
];

const questChartConfig = {
  engagement: { label: "Engagement" },
};

const suspiciousActivity = [
    { user: "user_1ab2c", reason: "Tap limit exceeded multiple times", time: "2 min ago", level: "high" },
    { user: "user_3de4f", reason: "Impossible step count claimed", time: "15 min ago", level: "critical" },
    { user: "user_5gh6i", reason: "Multiple accounts from same IP", time: "1 hour ago", level: "medium" },
    { user: "user_7jk8l", reason: "Unusual transaction pattern", time: "3 hours ago", level: "low" },
];


export default function AdminDashboardPage() {
  const [advantages, setAdvantages] = useState<CompetitiveAdvantage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setIsLoading(true);
      analyzeCompetitiveAdvantage()
          .then(result => setAdvantages(result.advantages))
          .catch(() => {})
          .finally(() => setIsLoading(false));
  }, []);

  const getRiskBadgeVariant = (level: string): 'destructive' | 'secondary' => {
    switch (level) {
        case 'critical':
        case 'high':
            return 'destructive';
        default:
            return 'secondary';
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the Afghan AiHub ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,542</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users (DAU)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,128</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+12.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Staked</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2B Points</div>
            <p className="text-xs text-muted-foreground">25% of circulating supply</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly new user registrations.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={userGrowthChartConfig} className="h-[300px] w-full">
                <BarChart data={userGrowthData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quest Engagement</CardTitle>
            <CardDescription>Weekly user interactions by quest type.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={questChartConfig} className="h-[300px] w-full">
                <BarChart data={questEngagementData} layout="vertical" margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} width={80} />
                    <XAxis type="number" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="engagement" radius={[0, 4, 4, 0]} barSize={32}>
                        {questEngagementData.map((entry) => (
                           <Cell key={entry.name} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Competitive Advantage</CardTitle>
                <CardDescription>AI-driven analysis of our unique cultural and community-focused market position.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))
              ) : (
                advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="p-3 rounded-full bg-primary/10">
                           <RenderIcon name={advantage.icon as IconName} className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">{advantage.title}</h4>
                            <p className="text-sm text-muted-foreground">{advantage.description}</p>
                        </div>
                    </div>
                ))
              )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Economic Health</CardTitle>
                <CardDescription>Real-time economy vitals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-accent/10 mr-4">
                        <ArrowRightLeft className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Token Velocity (24h)</p>
                        <p className="text-2xl font-bold font-mono">0.85</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                        <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Daily Issuance</p>
                        <p className="text-2xl font-bold font-mono">1.2M Points</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="p-3 rounded-full bg-destructive/10 mr-4">
                        <Flame className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Daily Burn</p>
                        <p className="text-2xl font-bold font-mono">350K Points</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Security Alerts
                </CardTitle>
                <CardDescription>Recent suspicious activities detected.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-right">Risk</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suspiciousActivity.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono text-xs">{activity.user}</TableCell>
                                    <TableCell className="text-xs">{activity.reason}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={getRiskBadgeVariant(activity.level)}>
                                            {activity.level}
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
    </div>
  );
}

    
