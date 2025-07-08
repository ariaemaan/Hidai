import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-headline font-bold">Terms of Service</h1>
            <Button asChild variant="outline" size="sm">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-sm sm:text-base">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">1. Agreement to Terms</h2>
                <p className="text-muted-foreground">By using our services, you agree to be bound by these terms. If you do not agree to these terms, do not use the services.</p>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">2. Your Account</h2>
                <p className="text-muted-foreground">You are responsible for safeguarding your account, and you agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">3. Prohibited Activities</h2>
                <p className="text-muted-foreground">You may not use the services for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the services.</p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">4. Termination</h2>
                <p className="text-muted-foreground">We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            </div>
            
            <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground">This is a placeholder document. Please replace with your full terms of service.</p>
                <p className="text-sm text-muted-foreground">Last updated: [Date]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
