import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-headline text-center font-semibold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Enter your credentials to access your account.
        </p>
        <LoginForm />
        <div className="mt-4 text-center text-sm text-muted-foreground">
            <p className="mb-2">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-primary hover:underline underline-offset-4"
                >
                    Sign up
                </Link>
            </p>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
            </div>
            <Link href="/dashboard" passHref>
                <Button variant="outline" className="w-full">Continue as a Guest</Button>
            </Link>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
