
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Rocket } from "lucide-react";

const challenges = [
  {
    icon: Users,
    title: "Launch Week Growth",
    description: "Help the community reach 10,000 users in our first week!",
    current: 1250,
    target: 10000,
    reward: "Founder Status + 2x Earnings",
    unit: "users"
  },
  {
    icon: Trophy,
    title: "Founder's Quest Challenge",
    description: "Complete 10 quests this week to earn an exclusive 'Founder's Trophy' badge.",
    current: 2,
    target: 10,
    reward: "Exclusive Badge",
    unit: "quests"
  },
  {
    icon: Rocket,
    title: "Social Media Blast",
    description: "Help us spread the word! Let's reach 1,000 shares with #KabuliCoins.",
    current: 150,
    target: 1000,
    reward: "5,000 KBC Drop",
    unit: "shares"
  }
];

export function CommunityChallenges() {
  return (
    <div className="space-y-6">
      {challenges.map((challenge, index) => {
        const progress = (challenge.current / challenge.target) * 100;
        return (
          <Card key={index}>
             <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                          <challenge.icon className="w-6 h-6" />
                      </div>
                      <div>
                          <CardTitle className="font-headline text-xl">{challenge.title}</CardTitle>
                          <CardDescription>{challenge.description}</CardDescription>
                      </div>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto shrink-0">Participate</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-sm">Progress</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {challenge.current.toLocaleString()} / {challenge.target.toLocaleString()} {challenge.unit}
                </p>
              </div>
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground mt-2">
                Community Reward: <span className="font-semibold text-primary">{challenge.reward}</span>
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
