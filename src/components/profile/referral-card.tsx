"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AIReferralDialog } from "./ai-referral-dialog";

export function ReferralCard() {
    const { toast } = useToast();
    const referralCode = "MULLA-1A2B3C"; // Mock referral code
    const [isAiDialogOpen, setIsAiDialogOpen] = React.useState(false);

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
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Gift className="w-5 h-5 text-primary" />
                        <span>Referral Program</span>
                    </CardTitle>
                    <CardDescription>Share your code and earn 1,000 MullaCoin for each friend who joins!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-2">Your Referral Code</p>
                        <div className="flex gap-2">
                            <Input value={referralCode} readOnly className="font-mono text-center" />
                            <Button size="icon" variant="outline" onClick={copyToClipboard} aria-label="Copy referral code">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <Button className="w-full" onClick={() => setIsAiDialogOpen(true)}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Share Message with AI
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        Your friend will also receive a bonus when they sign up with your code.
                     </p>
                </CardContent>
            </Card>
            <AIReferralDialog
                open={isAiDialogOpen}
                onOpenChange={setIsAiDialogOpen}
                referralCode={referralCode}
            />
        </>
    );
}
