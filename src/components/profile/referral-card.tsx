"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AIShareDialog } from "@/components/social/ai-share-dialog";

export function ReferralCard() {
    const { toast } = useToast();
    const referralCode = "KABUL-1A2B3C"; // Mock referral code
    const [isAiDialogOpen, setIsAiDialogOpen] = React.useState(false);
    const [postContext, setPostContext] = React.useState("");

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(referralCode);
            toast({
                title: "Copied to clipboard!",
                description: "Your referral code has been copied.",
            });
        }
    };

    const handleShareClick = () => {
        setPostContext(`I want to invite my friends and family to Kabuli Coins. Please write a friendly invitation and include my referral code: ${referralCode}`);
        setIsAiDialogOpen(true);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Gift className="w-5 h-5 text-primary" />
                        <span>Referral Program</span>
                    </CardTitle>
                    <CardDescription>Share your code and earn 1,000 Kabuli Coins for each friend who joins!</CardDescription>
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
                    <Button className="w-full" onClick={handleShareClick}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Share Message with AI
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        Your friend will also receive a bonus when they sign up with your code.
                     </p>
                </CardContent>
            </Card>
            <AIShareDialog
                open={isAiDialogOpen}
                onOpenChange={setIsAiDialogOpen}
                postContext={postContext}
            />
        </>
    );
}
