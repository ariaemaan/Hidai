import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Coins } from "lucide-react"

export function BalanceCard() {
    return (
        <Card className="bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="font-headline text-primary-foreground/80 flex items-center justify-between">
                    <span>Coin Balance</span>
                    <Coins className="w-6 h-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-mono">1,250,830</div>
                <p className="text-xs text-primary-foreground/80 mt-1">+1,500 from last game</p>
            </CardContent>
        </Card>
    )
}
