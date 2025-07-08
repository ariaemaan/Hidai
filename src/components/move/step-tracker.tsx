"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export function StepTracker() {
  const [steps, setSteps] = useState(0);
  const [sliderValue, setSliderValue] = useState([50]);
  const { toast } = useToast();

  const handleClaim = () => {
    if (steps <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid number of steps.",
      });
      return;
    }
    // 1 KBC per 100 steps
    const coinsEarned = Math.floor(steps / 100);
    toast({
      title: "Rewards Claimed!",
      description: `You've earned ${coinsEarned.toLocaleString()} KabuliCoins for ${steps.toLocaleString()} steps.`,
    });
    setSteps(0);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Track Your Steps</CardTitle>
        <CardDescription>Manually input your steps for the day to earn rewards. Max 25,000 steps per day.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <label htmlFor="steps" className="text-sm font-medium">Number of Steps</label>
            <Input 
                id="steps"
                type="number"
                placeholder="e.g., 8000"
                value={steps > 0 ? steps : ''}
                onChange={(e) => setSteps(Math.min(25000, Number(e.target.value)))}
                className="font-mono text-lg"
            />
        </div>
        <div className="space-y-2">
             <label htmlFor="verification" className="text-sm font-medium">Verification Slider</label>
             <p className="text-xs text-muted-foreground">Slide to verify you are human.</p>
             <Slider
                id="verification"
                defaultValue={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
            />
        </div>
        <div className="space-y-2">
             <label className="text-sm font-medium">Photo Proof (Optional)</label>
             <p className="text-xs text-muted-foreground">Upload a photo of your activity (e.g., treadmill screen, map screenshot).</p>
             <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
            </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClaim} className="w-full font-bold" disabled={steps <= 0}>
            Claim {Math.floor(steps / 100).toLocaleString()} KBC
        </Button>
      </CardFooter>
    </Card>
  );
}
