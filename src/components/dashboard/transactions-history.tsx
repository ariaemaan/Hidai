
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Gamepad2, Gift, PiggyBank, ShoppingCart, Rocket, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DisplayTransaction } from "@/lib/types"
import { Button } from "../ui/button"


const transactions: DisplayTransaction[] = [
    { type: 'Launch Bonus', amount: 1000, description: 'Welcome to the EduAfghanX community!', icon: Rocket, time: '1 min ago', direction: 'in' },
    { type: 'Game Reward', amount: 1500, description: 'Victory in "Kabul Towers"', icon: Gamepad2, time: '20 mins ago', direction: 'in' },
    { type: 'Staking Deposit', amount: -10000, description: 'Locked for 30 days', icon: PiggyBank, time: '1 hour ago', direction: 'out' },
    { type: 'Daily Bonus', amount: 500, description: 'Daily login reward', icon: Gift, time: '1 day ago', direction: 'in' },
    { type: 'Game Reward', amount: 850, description: 'High score in "Afghan Runner"', icon: Gamepad2, time: '2 days ago', direction: 'in' },
    { type: 'Booster Purchase', amount: -2500, description: '2x Point Multiplier', icon: ShoppingCart, time: '2 days ago', direction: 'out' },
]

export function TransactionsHistory() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Transaction History</CardTitle>
        <CardDescription>
          Your recent point earnings and spendings.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center p-3 -mx-3 rounded-lg transition-colors hover:bg-muted/50">
                 <Avatar className="h-10 w-10 border">
                    <AvatarFallback className={cn(
                        transaction.direction === 'in' ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    )}>
                        <transaction.icon className="h-5 w-5" />
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
                        {transaction.direction === 'in' ? '+' : ''}{transaction.amount.toLocaleString()} Points
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                </div>
            </div>
        ))}
      </CardContent>
       <CardFooter>
        <Button variant="outline" className="w-full">
          View All Transactions <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
