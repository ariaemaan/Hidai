"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from "lucide-react"

export function BalanceCard() {
    const [balance, setBalance] = useState(1250340);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setBalance(prev => prev + (Math.floor(Math.random() * 10)));
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);
    
    return (
        <Card className="bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="font-headline text-primary-foreground/80 flex items-center justify-between">
                    <span>Point Balance</span>
                    <Coins className="w-6 h-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold font-mono">{balance.toLocaleString()}</div>
                <p className="text-xs text-primary-foreground/80 mt-1">Your available rewards balance.</p>
            </CardContent>
        </Card>
    )
}
