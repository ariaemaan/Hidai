
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import type { LeaderboardPlayer } from "@/lib/types";

const regions = [
  { value: "pk", label: "Pakistan" },
  { value: "ae", label: "UAE" },
  { value: "us", label: "USA" },
  { value: "de", label: "Germany" },
  { value: "gb", label: "UK" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "ir", label: "Iran" },
];

const regionalData: Record<string, LeaderboardPlayer[]> = {
  pk: [
    { rank: 1, name: "Ali Khan", score: 98000, trend: 'up', change: 2 },
    { rank: 2, name: "Sana Gul", score: 95000, trend: 'same', change: 0 },
    { rank: 3, name: "Zarak Shah", score: 91200, trend: 'down', change: 2 },
  ],
  ae: [
    { rank: 1, name: "Rashid Al Maktoum", score: 115000, trend: 'up', change: 1 },
    { rank: 2, name: "Noora Al Suwaidi", score: 112300, trend: 'up', change: 3 },
    { rank: 3, name: "Abdullah Al Futtaim", score: 108500, trend: 'same', change: 0 },
  ],
  us: [
    { rank: 1, name: "John Smith", score: 105000, trend: 'same', change: 0 },
    { rank: 2, name: "Maria Garcia", score: 104500, trend: 'down', change: 1 },
    { rank: 3, name: "David Chen", score: 101000, trend: 'up', change: 1 },
  ],
  de: [
    { rank: 1, name: "Maximilian Müller", score: 99500, trend: 'up', change: 1 },
    { rank: 2, name: "Sophie Schmidt", score: 96000, trend: 'down', change: 1 },
    { rank: 3, name: "Lukas Weber", score: 94300, trend: 'up', change: 2 },
  ],
  gb: [
    { rank: 1, name: "Oliver Smith", score: 102000, trend: 'same', change: 0 },
    { rank: 2, name: "Amelia Jones", score: 99800, trend: 'up', change: 2 },
    { rank: 3, name: "Harry Williams", score: 97500, trend: 'down', change: 2 },
  ],
  ca: [
    { rank: 1, name: "Liam Tremblay", score: 103000, trend: 'up', change: 1 },
    { rank: 2, name: "Olivia Kim", score: 101200, trend: 'down', change: 1 },
    { rank: 3, name: "Noah Patel", score: 98500, trend: 'same', change: 0 },
  ],
  au: [
    { rank: 1, name: "Jack Wilson", score: 99000, trend: 'up', change: 2 },
    { rank: 2, name: "Charlotte Nguyen", score: 96500, trend: 'same', change: 0 },
    { rank: 3, name: "William Lee", score: 93000, trend: 'up', change: 3 },
  ],
   ir: [
    { rank: 1, name: "Amir Hosseini", score: 97000, trend: 'down', change: 1 },
    { rank: 2, name: "Zahra Mohammadi", score: 96500, trend: 'up', change: 1 },
    { rank: 3, name: "Reza Karimi", score: 92100, trend: 'up', change: 2 },
  ],
};

export function RegionalLeaderboard() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0].value);
  const players = regionalData[selectedRegion] || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="font-headline">Regional Rankings</CardTitle>
            <CardDescription>Top players from different Afghan diaspora communities.</CardDescription>
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {players.map((player) => (
                <TableRow key={player.rank}>
                    <TableCell className="font-bold text-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {player.rank <= 3 ? <Trophy className={`w-6 h-6 ${player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-slate-400' : 'text-orange-600' }`} /> : player.rank}
                    </div>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-4">
                        <Avatar>
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${player.name.charAt(0)}`} alt={player.name} data-ai-hint="avatar user"/>
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                    </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-lg">{player.score.toLocaleString()}</TableCell>
                </TableRow>
                ))}
                {players.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                            No data available for this region yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
