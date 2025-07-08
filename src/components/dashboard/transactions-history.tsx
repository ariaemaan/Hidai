import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Gamepad2, Gift, PiggyBank, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"


const transactions = [
    { type: 'Game Reward', amount: 1500, description: 'Victory in "Kabul Towers"', icon: Gamepad2, time: '20 mins ago', direction: 'in' as const },
    { type: 'Staking Deposit', amount: -10000, description: 'Locked for 30 days', icon: PiggyBank, time: '1 hour ago', direction: 'out' as const },
    { type: 'Daily Bonus', amount: 500, description: 'Daily login reward', icon: Gift, time: '1 day ago', direction: 'in' as const },
    { type: 'Game Reward', amount: 850, description: 'High score in "Afghan Runner"', icon: Gamepad2, time: '2 days ago', direction: 'in' as const },
    { type: 'Booster Purchase', amount: -2500, description: '2x Coin Multiplier', icon: ShoppingCart, time: '2 days ago', direction: 'out' as const },
    { type: 'Game Reward', amount: 1200, description: 'Victory in "Kabul Towers"', icon: Gamepad2, time: '2 days ago', direction: 'in' as const },
]

export function TransactionsHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Transaction History</CardTitle>
        <CardDescription>
          Your recent coin earnings and spendings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center">
                 <Avatar className="h-9 w-9">
                    <AvatarFallback className={cn(
                        transaction.direction === 'in' ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                    )}>
                        <transaction.icon className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.type}</p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
                </div>
                <div className="ml-auto text-right">
                    <p className={cn(
                        "font-mono font-medium",
                        transaction.direction === 'in' ? "text-accent" : "text-destructive"
                    )}>
                        {transaction.direction === 'in' ? '+' : ''}{transaction.amount.toLocaleString()} coins
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}
