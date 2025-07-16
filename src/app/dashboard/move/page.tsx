
import { StepTracker } from "@/components/move/step-tracker";
import { DailyGoals } from "@/components/move/daily-goals";
import { ActivityBonuses } from "@/components/move/activity-bonuses";

export default function MoveToEarnPage() {
  return (
    div className="space-y-8">
      div>
        h1 className="text-3xl font-headline font-bold tracking-tight">Move to Earnh1>
        p className="text-muted-foreground">Get rewarded for your daily activities and stay healthy!p>
      div>

      div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        div className="lg:col-span-2">
          StepTracker />
        div>
        div className="lg:col-span-1">
             DailyGoals />
        div>
      div>
      
       ActivityBonuses />
      
    div>
  );
}
