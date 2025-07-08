"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon, AppleIcon, FacebookIcon } from "@/components/icons";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (!auth) {
      toast({
        variant: "destructive",
        title: "Firebase Not Configured",
        description: "The Firebase API keys are missing. Please add them to your .env file.",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Invalid credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
        await signInWithGoogle();
        router.push('/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Google Sign-In Failed",
            description: error.message || "There was a problem signing in with Google.",
        });
    } finally {
        setIsGoogleLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
            {isGoogleLoading ? <Loader2 className="animate-spin" /> : <GoogleIcon/>} 
            Google
          </Button>
          <Button variant="outline" className="w-full" disabled><FacebookIcon /> Facebook</Button>
          <Button variant="outline" className="w-full sm:col-span-2" disabled><AppleIcon /> Apple</Button>
        </div>
        <div className="relative mb-6">
          <Separator />
          <p className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">
            OR
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
