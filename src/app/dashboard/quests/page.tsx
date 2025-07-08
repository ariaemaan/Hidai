import { QuestList } from "@/components/quests/quest-list";

export default function QuestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Quests</h1>
        <p className="text-muted-foreground">Complete daily tasks to earn rewards and learn more about Afghan culture.</p>
      </div>
      <QuestList />
    </div>
  );
}
