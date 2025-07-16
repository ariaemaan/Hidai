import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Edit, Trophy, Zap } from "lucide-react";
import Link from 'next/link';

const kankorFeatures = [
    {
        icon: Edit,
        title: "AI Quiz Generator",
        description: "Generate custom quizzes on any subject to test your knowledge.",
        link: "/dashboard/kankor/quiz",
        cta: "Create a Quiz"
    },
    {
        icon: Book,
        title: "Practice Questions",
        description: "Access thousands of MCQs categorized by subject.",
        link: "/dashboard/kankor/quiz",
        cta: "Start Practicing"
    },
    {
        icon: Zap,
        title: "Daily Challenge",
        description: "A quick, mixed-subject quiz to warm you up.",
        link: "/dashboard/kankor/quiz",
        cta: "Start Challenge"
    },
    {
        icon: Trophy,
        title: "Leaderboard",
        description: "See how you rank against other students.",
        link: "#",
        cta: "View Rankings"
    }
]

export default function KankorPrepPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Kankor Preparation Hub</h1>
        <p className="text-muted-foreground">Your complete toolkit for Kankor success. Powered by AI.</p>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Welcome to the Kankor Prep Hub!</CardTitle>
          <CardDescription>
            This section is your dedicated resource for mastering the Kankor exam. Here you can access a vast question bank, take smart quizzes, participate in daily challenges, and track your progress on the leaderboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Select an option from the features below to get started on your journey to success.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kankorFeatures.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                           <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full font-bold">
                        <Link href={feature.link}>
                            {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>

       <Card className="bg-accent/10 border-accent/20">
        <CardHeader>
          <CardTitle className="font-headline text-accent flex items-center gap-2">
            Top-up Your Phone
          </CardTitle>
          <CardDescription>
            Redeem the points you earn from quizzes and exams for mobile top-ups on AWCC, Roshan, MTN, and Etisalat.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="bg-background">
            <a href="#">
              Redeem Points
            </a>
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}

    
