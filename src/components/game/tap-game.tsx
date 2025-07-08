"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Zap, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Game Configuration Constants ---
const INITIAL_SCORE = 10000000000000;
const INITIAL_ENERGY = 1000;
const MAX_ENERGY = 1000;
const ENERGY_REGEN_RATE_MS = 1000; // 1 energy per second
const ENERGY_REGEN_AMOUNT = 1;
const XP_PER_TAP = 1;
const XP_MULTIPLIER_PER_LEVEL = 100;
const TAP_LIMIT_PER_SECOND = 10;
const FLOATING_NUMBER_DURATION_MS = 1000;
const TAP_ANIMATION_DURATION_MS = 100;


// This is a placeholder for a more complex cultural symbol
const TapIcon = () => (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary drop-shadow-lg">
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
    const [score, setScore] = useState(INITIAL_SCORE);
    const [energy, setEnergy] = useState(INITIAL_ENERGY);
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const coinsPerTap = 1 + Math.floor(level / 10);
    const taps = useRef<number[]>([]);
    const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
    const [isTapping, setIsTapping] = useState(false);
    
    // Energy regeneration
    useEffect(() => {
        const timer = setInterval(() => {
            setEnergy((prevEnergy) => Math.min(prevEnergy + ENERGY_REGEN_AMOUNT, MAX_ENERGY));
        }, ENERGY_REGEN_RATE_MS);
        return () => clearInterval(timer);
    }, []);

    // XP and Leveling
    useEffect(() => {
        const xpToNextLevel = level * XP_MULTIPLIER_PER_LEVEL;
        if (xp >= xpToNextLevel) {
            setLevel(prevLevel => prevLevel + 1);
            setXp(xp - xpToNextLevel); // Carry over extra XP
        }
    }, [xp, level]);


    const handleTap = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Anti-cheat: Max taps per second
        const now = Date.now();
        taps.current.push(now);
        taps.current = taps.current.filter(timestamp => now - timestamp < 1000);
        if (taps.current.length > TAP_LIMIT_PER_SECOND) {
            return;
        }

        if (energy >= 1) {
            setScore(prev => prev + coinsPerTap);
            setEnergy(prev => prev - 1);
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
            {/* Score and Level */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                    <Coins className="w-10 h-10 text-yellow-400" />
                    <h1 className="text-5xl font-bold font-mono tracking-tighter">{score.toLocaleString()}</h1>
                </div>
                <p className="text-muted-foreground">MullaCoins</p>
                 <div className="flex items-center justify-center gap-2 mt-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <p className="font-semibold">Level {level} ({xp} / {level * XP_MULTIPLIER_PER_LEVEL} XP)</p>
                </div>
            </div>

            {/* Tapping Area */}
            <div className="relative w-full max-w-xs flex justify-center items-center">
                 <AnimatePresence>
                    {floatingNumbers.map(({ id, value, x, y }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 1, y: 0, x: 0 }}
                            animate={{ opacity: 0, y: -100 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute font-bold text-2xl text-primary pointer-events-none"
                            style={{ left: x, top: y }}
                        >
                            {value}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.button
                    onClick={handleTap}
                    className="relative focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: isTapping ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                    <TapIcon />
                </motion.button>
            </div>
            
            {/* Energy Bar */}
            <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between items-center font-semibold">
                    <div className="flex items-center gap-2">
                       <Zap className="w-5 h-5 text-yellow-400" />
                       <span>Energy</span>
                    </div>
                    <span className="font-mono">{energy}/{MAX_ENERGY}</span>
                </div>
                <Progress value={(energy / MAX_ENERGY) * 100} className="h-4" />
                <p className="text-xs text-muted-foreground text-center">+1 energy / second</p>
            </div>
            
            {/* Boosters */}
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Boosters</CardTitle>
                        <CardDescription>Activate power-ups for extra rewards.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="flex-col h-20" disabled>
                            <span className="text-xl">🚀</span>
                            <span>2x Coins</span>
                            <span className="text-xs text-muted-foreground">30 min</span>
                        </Button>
                        <Button variant="outline" className="flex-col h-20" disabled>
                             <span className="text-xl">⚡️</span>
                            <span>Refill</span>
                            <span className="text-xs text-muted-foreground">Energy</span>
                        </Button>
                         <Button variant="outline" className="flex-col h-20" disabled>
                             <span className="text-xl">🤖</span>
                            <span>Auto-Tap</span>
                             <span className="text-xs text-muted-foreground">10 sec</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
