import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Footprints, Heart } from "lucide-react";

const challenges = [
  {
    icon: Footprints,
    title: "Weekly Step Challenge",
    description: "Help the community reach 10,000,000 steps this week!",
    current: 6750000,
    target: 10000000,
    reward: "5,000 MullaCoin",
    unit: "steps"
  },
  {
    icon: Heart,
    title: "Charity Drive: Education",
    description: "Contribute to a community fund to provide school supplies for children in Kabul.",
    current: 12500000,
    target: 50000000,
    reward: "Special Badge",
    unit: "MullaCoin"
  },
  {
    icon: Users,
    title: "Community Growth",
    description: "Invite new members to MullaCoin. Let's reach 1,000 new users this month.",
    current: 450,
    target: 1000,
    reward: "2x Earnings Boost",
    unit: "users"
  }
];

export function CommunityChallenges() {
  return (
    <div className="space-y-6">
      {challenges.map((challenge, index) => {
        const progress = (challenge.current / challenge.target) * 100;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-start gap-4">
               <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <challenge.icon className="w-6 h-6" />
                </div>
              <div>
                <CardTitle className="font-headline text-xl">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </div>
               <Button variant="outline" className="ml-auto">Participate</Button>
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
                Reward for all participants: <span className="font-semibold text-primary">{challenge.reward}</span>
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
