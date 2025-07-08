import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-headline font-bold">Privacy Policy</h1>
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
                <h2 className="text-xl font-semibold font-headline">1. Introduction</h2>
                <p className="text-muted-foreground">Welcome to Kabuli Coins. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">2. Information We Collect</h2>
                <p className="text-muted-foreground">We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application or otherwise when you contact us.</p>
                <p className="text-muted-foreground">The personal information that we collect depends on the context of your interactions with us and the application, the choices you make and the products and features you use.</p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">3. How We Use Your Information</h2>
                <p className="text-muted-foreground">We use personal information collected via our application for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">4. Will Your Information Be Shared With Anyone?</h2>
                <p className="text-muted-foreground">We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-xl font-semibold font-headline">5. How We Keep Your Information Safe</h2>
                <p className="text-muted-foreground">We aim to protect your personal information through a system of organizational and technical security measures.</p>
            </div>
            
            <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground">This is a placeholder document. Please replace with your full privacy policy.</p>
                <p className="text-sm text-muted-foreground">Last updated: [Date]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
