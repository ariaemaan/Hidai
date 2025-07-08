"use client";

import * as React from "react";
import { generateReferralMessage } from "@/ai/flows/generateReferralMessageFlow";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Send } from "lucide-react";

type AIReferralDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referralCode: string;
};

export function AIReferralDialog({ open, onOpenChange, referralCode }: AIReferralDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (open && user) {
      setIsLoading(true);
      generateReferralMessage({
        userName: user.displayName || "a friend",
        referralCode,
      })
        .then((response) => {
          setMessage(response.message);
        })
        .catch((error) => {
          console.error("Error generating referral message:", error);
          toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate a referral message. Please try again.",
          });
          // Fallback message
          setMessage(`As-salamu alaykum! Join me on MullaCoin to earn rewards and learn about Afghan culture. Use my code: ${referralCode}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, user, referralCode, toast]);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      toast({
        title: "Copied to clipboard!",
        description: "Your referral message has been copied.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">Share with a Friend</DialogTitle>
          <DialogDescription>
            Our AI has crafted a personalized message for you to share.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40 bg-muted rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
          )}
        </div>
        <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" disabled={isLoading}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Message
                </Button>
            </div>
             <Button disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Share
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
