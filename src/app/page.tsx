import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Gamepad2, BookOpen, Users, Palette, Heart, BrainCircuit } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
    {
      icon: Gamepad2,
      title: "Play & Earn",
      description: "Engage in fun, culturally-themed games like Tap-to-Earn and Move-to-Earn. Every action rewards you with Points that can be used within the app.",
      image: "https://placehold.co/600x400.png",
      aiHint: "game controller",
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Dive into interactive lessons on Afghan history, art, and language. Pass quizzes and exams to unlock significant rewards and climb the leaderboards.",
      image: "https://placehold.co/600x400.png",
      aiHint: "ancient book",
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with a global diaspora. Compete in community-wide challenges, see your rank, and share your achievements with friends.",
      image: "https://placehold.co/600x400.png",
      aiHint: "community gathering",
    },
];

const whyUsItems = [
    {
        icon: Palette,
        title: "Culturally Authentic",
        description: "Designed with deep respect for Afghan traditions, offering a genuine connection to the culture."
    },
    {
        icon: Heart,
        title: "Community Focused",
        description: "Built to connect the Afghan diaspora and friends of Afghanistan in a positive, shared experience."
    },
    {
        icon: BrainCircuit,
        title: "AI-Powered Learning",
        description: "Utilizes advanced AI to create personalized educational content and engaging quests."
    }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
           <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
           </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Explore Afghan Culture. Earn Rewards.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    EduAfghanX is a unique platform that rewards you for learning about the rich history, traditions, and beauty of Afghanistan.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="w-full min-[400px]:w-auto">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="afghanistan landscape"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-primary font-semibold">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Rich Cultural Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dive into an interactive experience that goes beyond the game. Learn, connect, and grow with our community-focused features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                     <CardTitle className="text-center font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                   <CardContent className="flex-1 text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">Why Choose Us?</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">More Than Just a Game</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are building a bridge to Afghan culture, powered by technology and a passion for community.
                </p>
                 <div className="space-y-6 pt-4">
                    {whyUsItems.map((item) => (
                        <div key={item.title} className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </div>
              <Image
                alt="Map"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="400"
                src="https://placehold.co/600x400.png"
                data-ai-hint="afghanistan map art"
                width="600"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Join the EduAfghanX Community Today
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start your journey of discovery and earning. Become part of our growing global family.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 EduAfghanX. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
