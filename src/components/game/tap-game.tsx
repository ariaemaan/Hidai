"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Zap, Star, ChevronsUp, BatteryCharging, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Game Configuration Constants ---
const INITIAL_SCORE = 0;
const INITIAL_ENERGY = 500;
const INITIAL_MAX_ENERGY = 500;
const ENERGY_REGEN_RATE_MS = 1000;
const XP_PER_TAP = 1;
const XP_MULTIPLIER_PER_LEVEL = 100;
const TAP_LIMIT_PER_SECOND = 10;
const FLOATING_NUMBER_DURATION_MS = 1000;
const TAP_ANIMATION_DURATION_MS = 100;


// This is a placeholder for a more complex cultural symbol
const TapIcon = () => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary drop-shadow-[0_4px_15px_hsl(var(--primary)/0.4)]">
        <path d="M50 2.5C23.75 2.5 2.5 23.75 2.5 50C2.5 76.25 23.75 97.5 50 97.5C76.25 97.5 97.5 76.25 97.5 50C97.5 23.75 76.25 2.5 50 2.5Z" fill="currentColor" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5"/>
        <path d="M58.3333 29.1667L41.6666 70.8334" stroke="hsl(var(--primary-foreground))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M41.6667 29.1667H64.5833" stroke="hsl(var(--primary-foreground))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M35.4167 70.8334H58.3333" stroke="hsl(var(--primary-foreground))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

type FloatingNumber = {
    id: number;
    value: string;
    x: number;
    y: number;
};

export function TapGame() {
    const { toast } = useToast();
    const [score, setScore] = useState(INITIAL_SCORE);
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const xpToNextLevel = level * XP_MULTIPLIER_PER_LEVEL;

    // Dynamic attributes based on level
    const coinsPerTap = 1 + Math.floor(level * 0.5);
    const maxEnergy = INITIAL_MAX_ENERGY + (level - 1) * 50;
    const energyRegenAmount = 1 + Math.floor(level / 5);

    const [energy, setEnergy] = useState(INITIAL_ENERGY);
    const taps = useRef<number[]>([]);
    const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
    const [isTapping, setIsTapping] = useState(false);
    
    // Energy regeneration
    useEffect(() => {
        const timer = setInterval(() => {
            setEnergy((prevEnergy) => Math.min(prevEnergy + energyRegenAmount, maxEnergy));
        }, ENERGY_REGEN_RATE_MS);
        return () => clearInterval(timer);
    }, [energyRegenAmount, maxEnergy]);

    // XP and Leveling
    useEffect(() => {
        if (xp >= xpToNextLevel) {
            const newLevel = level + 1;
            setLevel(newLevel);
            setXp(xp - xpToNextLevel); // Carry over extra XP
            toast({
                title: `Level Up! You are now Level ${newLevel}!`,
                description: `Your rewards are now greater.`,
            });
        }
    }, [xp, level, xpToNextLevel, toast]);


    const handleTap = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Anti-cheat: Max taps per second
        const now = Date.now();
        taps.current.push(now);
        taps.current = taps.current.filter(timestamp => now - timestamp < 1000);
        if (taps.current.length > TAP_LIMIT_PER_SECOND) {
            toast({
                variant: "destructive",
                title: "Slow down!",
                description: "You are tapping too fast.",
            })
            return;
        }

        if (energy >= coinsPerTap) {
            setScore(prev => prev + coinsPerTap);
            setEnergy(prev => prev - coinsPerTap);
            setXp(prev => prev + XP_PER_TAP);

            // Floating number animation
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const newFloatingNumber = { id: now, value: `+${coinsPerTap}`, x, y };
            setFloatingNumbers(current => [...current, newFloatingNumber]);
            setTimeout(() => {
                setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
            }, FLOATING_NUMBER_DURATION_MS);

            // Tap animation
            setIsTapping(true);
            setTimeout(() => setIsTapping(false), TAP_ANIMATION_DURATION_MS);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center gap-8 py-8">
            <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                    <Coins className="w-10 h-10 text-yellow-400" />
                    <h1 className="text-5xl font-bold font-mono tracking-tighter">{score.toLocaleString()}</h1>
                </div>
                <p className="text-muted-foreground">Points Earned</p>
                 <div className="flex items-center justify-center gap-2 mt-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <p className="font-semibold">Level {level}</p>
                </div>
                <div className="w-48 mx-auto mt-2">
                    <Progress value={(xp / xpToNextLevel) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP</p>
                </div>
            </div>

            <div className="relative w-full max-w-xs flex justify-center items-center h-32">
                 <AnimatePresence>
                    {floatingNumbers.map(({ id, value, x, y }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 0, y: -100 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute font-bold text-3xl text-primary pointer-events-none"
                            style={{ left: x, top: y, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        >
                            {value}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.button
                    onClick={handleTap}
                    className="absolute focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: isTapping ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    disabled={energy < coinsPerTap}
                >
                    <TapIcon />
                </motion.button>
            </div>
            
            <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between items-center font-semibold">
                    <div className="flex items-center gap-2">
                       <Zap className="w-5 h-5 text-yellow-400" />
                       <span>Energy</span>
                    </div>
                    <span className="font-mono">{energy.toFixed(0)}/{maxEnergy}</span>
                </div>
                <Progress value={(energy / maxEnergy) * 100} className="h-4" />
                <p className="text-xs text-muted-foreground text-center">+{energyRegenAmount} energy / second</p>
            </div>
            
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Boosters</CardTitle>
                        <CardDescription>Upgrade your abilities to earn faster.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-lg">
                            <ChevronsUp className="w-8 h-8 text-primary"/>
                            <p className="font-semibold">Multi-Tap</p>
                            <p className="text-xs text-muted-foreground">Level {level}</p>
                            <Button size="sm" variant="outline" disabled>Upgrade</Button>
                         </div>
                          <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-lg">
                            <BatteryCharging className="w-8 h-8 text-primary"/>
                            <p className="font-semibold">Energy Limit</p>
                            <p className="text-xs text-muted-foreground">Level {level}</p>
                            <Button size="sm" variant="outline" disabled>Upgrade</Button>
                         </div>
                          <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-lg">
                            <Bot className="w-8 h-8 text-primary"/>
                            <p className="font-semibold">Tap Bot</p>
                            <p className="text-xs text-muted-foreground">Coming Soon</p>
                            <Button size="sm" variant="outline" disabled>Activate</Button>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
