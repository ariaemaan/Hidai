import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminContentPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Manage quests, cultural content, and events.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Tools for creating and editing quests, managing translations, and scheduling events will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
