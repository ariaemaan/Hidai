
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Footprints, Trophy } from "lucide-react";

const goals = [
    { name: "Beginner", steps: 5000, bonus: 1.1 },
    { name: "Intermediate", steps: 8000, bonus: 1.25 },
    { name: "Advanced", steps: 12000, bonus: 1.5 },
]

// Mock current steps for UI display
const currentSteps = 6540;

export function DailyGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Daily Goals</CardTitle>
        <CardDescription>Reach step goals for bonus multipliers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
            const progress = Math.min((currentSteps / goal.steps) * 100, 100);
            const isCompleted = currentSteps >= goal.steps;
            return (
                <div key={goal.name}>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium flex items-center gap-2">
                           {isCompleted ? <Trophy className="w-4 h-4 text-yellow-500" /> : <Footprints className="w-4 h-4 text-muted-foreground" />}
                           {goal.name} Goal
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                            {goal.steps.toLocaleString()} steps
                        </p>
                    </div>
                    <Progress value={progress} />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                       Bonus: {goal.bonus}x Points
                    </p>
                </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
