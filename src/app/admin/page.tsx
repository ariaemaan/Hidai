import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart2, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 780 },
  { name: 'May', users: 1890 },
  { name: 'Jun', users: 2390 },
  { name: 'Jul', users: 3490 },
];

const chartConfig = {
    users: {
        label: "Users",
        color: "hsl(var(--primary))",
    }
};

const suspiciousActivity = [
    { user: "user_1ab2c", reason: "Tap limit exceeded multiple times", time: "2 min ago", level: "high" },
    { user: "user_3de4f", reason: "Impossible step count claimed", time: "15 min ago", level: "critical" },
    { user: "user_5gh6i", reason: "Multiple accounts from same IP", time: "1 hour ago", level: "medium" },
    { user: "user_7jk8l", reason: "Unusual transaction pattern", time: "3 hours ago", level: "low" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the MullaCoin ecosystem.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <div className="text-2xl font-bold">1.2B KBC</div>
            <p className="text-xs text-muted-foreground">25% of circulating supply</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        {/* User Growth Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly new user registrations.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={userGrowthData}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Suspicious Activity */}
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Security Alerts
                </CardTitle>
                <CardDescription>Recent suspicious activities detected.</CardDescription>
            </CardHeader>
            <CardContent>
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
                                    <Badge variant={activity.level === 'critical' || activity.level === 'high' ? 'destructive' : 'secondary'}>
                                        {activity.level}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
