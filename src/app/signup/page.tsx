// This file was created by the AI assistant.
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { GoogleIcon, AppleIcon, FacebookIcon } from '@/components/icons';


export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Account Created",
                description: "Welcome to AAaiAA! You can now log in.",
            });
            router.push("/login");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Signup Failed",
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                     <div className="mx-auto mb-4">
                       <Logo />
                    </div>
                    <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
                    <CardDescription>Join our community to start your journey of learning and earning.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                     <div className="grid grid-cols-3 gap-3">
                         <Button variant="outline" disabled={isLoading}><GoogleIcon /></Button>
                         <Button variant="outline" disabled={isLoading}><FacebookIcon /></Button>
                         <Button variant="outline" disabled={isLoading}><AppleIcon /></Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center text-sm">
                    <p className="text-muted-foreground">
                        Already have an account?&nbsp;
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
