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
import { Gamepad2, Gift } from "lucide-react"


const transactions = [
    { type: 'Game Reward', amount: 1500, description: 'Victory in "Kabul Towers"', icon: Gamepad2, time: '20 mins ago' },
    { type: 'Daily Bonus', amount: 500, description: 'Daily login reward', icon: Gift, time: '1 day ago' },
    { type: 'Game Reward', amount: 850, description: 'High score in "Afghan Runner"', icon: Gamepad2, time: '2 days ago' },
    { type: 'Game Reward', amount: 1200, description: 'Victory in "Kabul Towers"', icon: Gamepad2, time: '2 days ago' },
    { type: 'Daily Bonus', amount: 500, description: 'Daily login reward', icon: Gift, time: '3 days ago' },
]

export function TransactionsHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Transaction History</CardTitle>
        <CardDescription>
          Your recent coin earnings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center">
                 <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                        <transaction.icon className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.type}</p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
                </div>
                <div className="ml-auto text-right">
                    <p className="font-mono font-medium">+ {transaction.amount.toLocaleString()} coins</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}
