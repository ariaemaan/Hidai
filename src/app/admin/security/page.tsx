import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminSecurityPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Security Monitoring</h1>
        <p className="text-muted-foreground">View security alerts and manage platform integrity.</p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Dashboards for fraud detection, suspicious activity reports, and transaction anomaly detection will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
