import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Landmark, Palette, Languages } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const courses = [
  {
    id: "afghan-history-101",
    title: "Afghan History 101",
    description: "Journey through the ancient empires and pivotal moments that shaped modern Afghanistan.",
    icon: Landmark,
    image: "https://placehold.co/600x400.png",
    aiHint: "ancient ruins",
    lessons: 5,
    duration: "45 mins"
  },
  {
    id: "art-of-afghanistan",
    title: "The Art of Afghanistan",
    description: "Explore the rich traditions of calligraphy, ceramics, and intricate rug weaving.",
    icon: Palette,
    image: "https://placehold.co/600x400.png",
    aiHint: "afghan rug",
    lessons: 4,
    duration: "30 mins"
  },
  {
    id: "dari-language-basics",
    title: "Dari Language Basics",
    description: "Learn essential greetings, phrases, and the alphabet of one of Afghanistan's official languages.",
    icon: Languages,
    image: "https://placehold.co/600x400.png",
    aiHint: "language book",
    lessons: 6,
    duration: "60 mins"
  },
  {
    id: "pashto-for-beginners",
    title: "Pashto for Beginners",
    description: "An introduction to the Pashto language, focusing on conversational skills and cultural nuances.",
    icon: Languages,
    image: "https://placehold.co/600x400.png",
    aiHint: "people talking",
    lessons: 6,
    duration: "60 mins"
  }
];

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Learn to Earn</h1>
        <p className="text-muted-foreground">Deepen your knowledge of Afghan culture and earn rewards by passing exams.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="p-0">
               <Image src={course.image} alt={course.title} width={600} height={400} data-ai-hint={course.aiHint} className="rounded-t-lg aspect-video object-cover" />
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary -mt-10 bg-background border-4 border-background">
                        <course.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                </div>
                <CardDescription className="mt-4">{course.description}</CardDescription>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
                <span>{course.lessons} Lessons</span>
                <span>{course.duration}</span>
              </div>
              <Button asChild className="mt-4 w-full font-bold">
                <Link href={`/dashboard/learn/${course.id}`}>
                  Start Course <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
