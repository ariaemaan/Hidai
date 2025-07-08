import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

type StatsCardProps = {
    title: string;
    value: string;
    icon: ReactNode;
    details: string;
}

export function StatsCard({ title, value, icon, details }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-mono">{value}</div>
                <p className="text-xs text-muted-foreground">{details}</p>
            </CardContent>
        </Card>
    )
}
