import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-headline text-center font-semibold text-foreground mb-2">
          Create an Account
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Join MullaCoin and start your quest!
        </p>
        <SignupForm />
        <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
            Already have an account?{" "}
            <Link
                href="/"
                className="font-medium text-primary hover:underline underline-offset-4"
            >
                Sign in
            </Link>
            </p>
            <p className="px-8 mt-4 text-xs">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
      </div>
    </div>
  );
}
