import { TapGame } from "@/components/game/tap-game";

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">MullaCoin</h1>
        <p className="text-muted-foreground">Tap to earn MullaCoins and climb the ranks!</p>
      </div>
       <TapGame />
    </div>
  );
}
