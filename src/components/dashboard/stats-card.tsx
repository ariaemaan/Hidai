import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

type StatsCardProps = {
    title: string;
    value: string;
    icon: LucideIcon | React.ReactNode;
    details: string;
}

export function StatsCard({ title, value, icon: Icon, details }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">{title}</CardTitle>
                {typeof Icon === 'function' ? <Icon className="h-4 w-4 text-muted-foreground" /> : Icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{details}</p>
            </CardContent>
        </Card>
    )
}
