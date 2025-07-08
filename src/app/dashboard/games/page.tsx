import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Games</h1>
        <p className="text-muted-foreground">Select a game to start earning coins.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <Gamepad2 className="w-24 h-24 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-semibold font-headline">New Games are on the Way!</h2>
            <p className="text-muted-foreground mt-2">We are working hard to bring you new and exciting games. Stay tuned!</p>
        </CardContent>
       </Card>
    </div>
  );
}
