"use client";

import * as React from "react";
import { generateSocialPost } from "@/ai/flows/generateSocialPostFlow";
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

type AIShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postContext: string;
};

export function AIShareDialog({ open, onOpenChange, postContext }: AIShareDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [post, setPost] = React.useState("");

  React.useEffect(() => {
    if (open && user && postContext) {
      setIsLoading(true);
      generateSocialPost({
        userName: user.displayName || "a friend",
        context: postContext,
      })
        .then((response) => {
          setPost(response.post);
        })
        .catch((error) => {
          console.error("Error generating social post:", error);
          toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not generate a post. Please try again.",
          });
          // Fallback message
          setPost(`Come join me on Kabuli Coins! It's a fun way to learn about Afghan culture and earn rewards. #KabuliCoins`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, user, postContext, toast]);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post);
      toast({
        title: "Copied to clipboard!",
        description: "Your message has been copied.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">Create a Social Post</DialogTitle>
          <DialogDescription>
            Our AI has crafted a post for you to share your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40 bg-muted rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              rows={8}
              className="resize-none"
            />
          )}
        </div>
        <DialogFooter className="sm:justify-between">
             <Button onClick={copyToClipboard} variant="outline" disabled={isLoading}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Message
            </Button>
             <Button disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Share
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
