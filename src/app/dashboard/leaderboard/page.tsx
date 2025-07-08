
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowUp, ArrowDown, Minus, Share2, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CommunityChallenges } from "@/components/leaderboard/community-challenges";
import { Button } from "@/components/ui/button";
import type { LeaderboardPlayer } from "@/lib/types";
import { AIShareDialog } from "@/components/social/ai-share-dialog";
import { RegionalLeaderboard } from "@/components/leaderboard/regional-leaderboard";

const leaderboardData: LeaderboardPlayer[] = [
  { rank: 1, name: "Ahmad Wali", score: 125030, trend: 'up', change: 1, isFounder: true },
  { rank: 2, name: "Fatima Noori", score: 122500, trend: 'down', change: 1, isFounder: true },
  { rank: 3, name: "Yusuf Ahmadi", score: 119800, trend: 'same', change: 0, isFounder: true },
  { rank: 4, name: "Zainab Popal", score: 115210, trend: 'up', change: 2 },
  { rank: 5, name: "Mustafa Khan", score: 112000, trend: 'same', change: 0 },
  { rank: 6, name: "Layla Hotak", score: 109750, trend: 'up', change: 3 },
  { rank: 7, name: "Your Rank", score: 85200, trend: 'same', change: 0, isCurrentUser: true },
  { rank: 8, name: "Samira Ghafari", score: 81300, trend: 'down', change: 2 },
  { rank: 9, name: "Omar Zakhilwal", score: 79500, trend: 'up', change: 1 },
  { rank: 10, name: "Aisha Barakzai", score: 78200, trend: 'down', change: 1 },
];

const RankChange = ({ trend, change }: { trend: 'up' | 'down' | 'same'; change: number }) => {
  if (trend === 'same' || change === 0) {
    return <Minus className="h-4 w-4 text-muted-foreground mx-auto" />;
  }
  const isUp = trend === 'up';
  return (
    <div className={cn("flex items-center justify-center gap-1 font-medium", isUp ? "text-green-500" : "text-destructive")}>
      {isUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      <span>{Math.abs(change)}</span>
    </div>
  );
};


export default function LeaderboardPage() {
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [postContext, setPostContext] = useState("");

  const handleShareClick = (player: LeaderboardPlayer) => {
    setPostContext(`I'm celebrating my achievement on MullaCoin! I'm currently rank #${player.rank} on the global leaderboard with ${player.score.toLocaleString()} points.`);
    setIsAiDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Community Hub</h1>
        <p className="text-muted-foreground">See how you stack up, join challenges, and connect with others.</p>
      </div>
       <Tabs defaultValue="global">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="friends" disabled>Friends</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
            <Card className="mt-4">
                <CardHeader>
                <CardTitle className="font-headline">Global Rankings</CardTitle>
                <CardDescription>Top players from around the world.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-center w-[100px]">Change</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {leaderboardData.map((player) => (
                        <TableRow key={player.rank} className={player.isCurrentUser ? "bg-accent/50" : ""}>
                        <TableCell className="font-bold text-lg">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                                {player.rank <= 3 ? <Trophy className={`w-6 h-6 ${player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-slate-400' : 'text-orange-600' }`} /> : player.rank}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/40x40.png?text=${player.name.charAt(0)}`} alt={player.name} data-ai-hint="avatar user" />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div>
                                <span className="font-medium">{player.name}</span>
                                {player.isCurrentUser && <Badge variant="outline" className="ml-2">You</Badge>}
                                {player.isFounder && <Badge variant="default" className="ml-2"><ShieldCheck className="h-3 w-3 mr-1" />Founder</Badge>}
                            </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            <RankChange trend={player.trend} change={player.change} />
                        </TableCell>
                        <TableCell className="text-right font-mono text-lg">{player.score.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                           {player.isCurrentUser && (
                             <Button variant="ghost" size="icon" onClick={() => handleShareClick(player)}>
                               <Share2 className="h-4 w-4" />
                             </Button>
                           )}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="regional">
            <div className="mt-4">
                <RegionalLeaderboard />
            </div>
        </TabsContent>
        <TabsContent value="challenges">
             <div className="mt-4">
                <CommunityChallenges />
            </div>
        </TabsContent>
      </Tabs>
      </div>
      <AIShareDialog
        open={isAiDialogOpen}
        onOpenChange={setIsAiDialogOpen}
        postContext={postContext}
      />
    </>
  );
}
