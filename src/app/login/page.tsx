import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <h1 className="text-2xl font-headline text-center font-semibold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Enter your credentials to access your account.
        </p>
        <LoginForm />
        <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-primary hover:underline underline-offset-4"
                >
                    Sign up
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
