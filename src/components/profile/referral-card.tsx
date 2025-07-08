"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ReferralCard() {
    const { toast } = useToast();
    const referralCode = "MULLA-1A2B3C"; // Mock referral code

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(referralCode);
            toast({
                title: "Copied to clipboard!",
                description: "Your referral code has been copied.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <span>Referral Program</span>
                </CardTitle>
                <CardDescription>Share your code and earn 1,000 MullaCoin for each friend who joins!</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm font-medium mb-2">Your Referral Code</p>
                <div className="flex gap-2">
                    <Input value={referralCode} readOnly className="font-mono text-center" />
                    <Button size="icon" variant="outline" onClick={copyToClipboard} aria-label="Copy referral code">
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground mt-4">
                    Your friend will also receive a bonus when they sign up with your code.
                 </p>
            </CardContent>
        </Card>
    );
}
