import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Ahmad Wali", score: 125030, change: 1 },
  { rank: 2, name: "Fatima Noori", score: 122500, change: -1 },
  { rank: 3, name: "Yusuf Ahmadi", score: 119800, change: 0 },
  { rank: 4, name: "Zainab Popal", score: 115210, change: 2 },
  { rank: 5, name: "Mustafa Khan", score: 112000, change: 0 },
  { rank: 6, name: "Layla Hotak", score: 109750, change: 3 },
  { rank: 7, name: "Your Rank", score: 85200, change: 0, isCurrentUser: true },
  { rank: 8, name: "Samira Ghafari", score: 81300, change: -2 },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">See how you stack up against other players.</p>
      </div>
      <Card>
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
                <TableHead className="text-right">Score</TableHead>
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
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${player.name.charAt(0)}`} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.name}</span>
                      {player.isCurrentUser && <Badge>You</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-lg">{player.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
