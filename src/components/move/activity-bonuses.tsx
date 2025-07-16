
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";

// Simple Mosque SVG icon
const MosqueIcon = () => (
    svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        path d="M2 22h20"/>path d="M4 12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2Z"/>path d="M17 12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2Z"/>path d="M8 22V8.5l4-2.5 4 2.5V22"/>path d="M12 2v1.5"/>path d="m10.5 4.5 1.5-1 1.5 1"/>
    svg>
)

export function ActivityBonuses() {
    return (
        Card>
             CardHeader>
                 CardTitle className="font-headline">Activity BonusesCardTitle>
                 CardDescription>Earn extra rewards for specific activities.CardDescription>
            CardHeader>
             CardContent>
                Tabs defaultValue="prayer" className="w-full">
                    TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4">
                        TabsTrigger value="prayer">PrayerTabsTrigger>
                        TabsTrigger value="sports">SportsTabsTrigger>
                        TabsTrigger value="chores">ChoresTabsTrigger>
                        TabsTrigger value="walking">WalksTabsTrigger>
                    TabsList>
                    TabsContent value="prayer" className="mt-4">
                        div className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-lg">
                            div className="text-center">
                                MosqueIcon />
                                h3 className="text-lg font-semibold mt-2">Prayer Bonush3>
                                p className="text-muted-foreground text-sm">Earn 500 Points for each of the 5 daily prayers.p>
                            div>
                            div className="flex-1 space-y-2">
                                div className="flex justify-between items-center">pFajr (Dawn)p>  Button size="sm" variant="outline">ClaimButton>div>
                                div className="flex justify-between items-center">pDhuhr (Noon)p>  Button size="sm" variant="outline">ClaimButton>div>
                                div className="flex justify-between items-center">pAsr (Afternoon)p>  Button size="sm" variant="outline" disabled>ClaimedButton>div>
                                div className="flex justify-between items-center">pMaghrib (Sunset)p>  Button size="sm" variant="outline" disabled>ClaimedButton>div>
                                div className="flex justify-between items-center">pIsha (Night)p>  Button size="sm" variant="outline" disabled>ClaimedButton>div>
                            div>
                        div>
                    TabsContent>
                    TabsContent value="sports" className="mt-4">
                         div className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-lg">
                             Image src="https://placehold.co/150x150.png?text=Keep+building,+founder." alt="Buzkashi" width={150} height={150} className="rounded-md" data-ai-hint="buzkashi afghan sport" />
                             div className="flex-1">
                                h3 className="text-lg font-semibold">Buzkashi Challengeh3>
                                p className="text-muted-foreground text-sm mb-4">Participate in or watch a game of Buzkashi to earn a massive bonus!p>
                                Button>Claim 10,000 PointsButton>
                             div>
                         div>
                    TabsContent>
                    TabsContent value="chores" className="mt-4">
                        div className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-lg">
                             Home className="w-16 h-16 text-accent" />
                             div className="flex-1">
                                h3 className="text-lg font-semibold">Household Heroh3>
                                p className="text-muted-foreground text-sm mb-4">Get rewarded for helping around the house. Complete 3 chores for a bonus.p>
                                Button>Claim 1,500 PointsButton>
                             div>
                         div>
                    TabsContent>
                    TabsContent value="walking" className="mt-4">
                         div className="flex flex-col sm:flex-row items-center gap-6 p-4 border rounded-lg">
                             Image src="https://placehold.co/150x150.png?text=Your+vision+matters." alt="Kabul Market" width={150} height={150} className="rounded-md" data-ai-hint="kabul market" />
                             div className="flex-1">
                                h3 className="text-lg font-semibold">Bazaar Walkh3>
                                p className="text-muted-foreground text-sm mb-4">Walk to a local market or bazaar. Upload a photo to claim your reward.p>
                                Button>Claim 2,000 PointsButton>
                             div>
                         div>
                    TabsContent>
                Tabs>
            CardContent>
        Card>
    );
}
