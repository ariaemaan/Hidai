import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Award, CheckCircle, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data, in a real app this would be fetched based on params.courseId
const courseData = {
    "afghan-history-101": {
        title: "Afghan History 101",
        description: "Journey through the ancient empires and pivotal moments that shaped modern Afghanistan.",
        lessons: [
            { id: "1", title: "The Bronze Age and Early Civilizations", status: "completed" },
            { id: "2", title: "The Arrival of Islam and the Ghaznavids", status: "completed" },
            { id: "3", title: "The Mongol Invasion and its Aftermath", status: "in_progress" },
            { id: "4", title: "The Durrani Empire: Birth of Modern Afghanistan", status: "locked" },
            { id: "5", title: "The Great Game and 20th Century Politics", status: "locked" },
        ]
    },
     "art-of-afghanistan": {
        title: "The Art of Afghanistan",
        description: "Explore the rich traditions of calligraphy, ceramics, and intricate rug weaving.",
        lessons: [
            { id: "1", title: "Introduction to Islamic Calligraphy Styles", status: "completed" },
            { id: "2", title: "The Symbolism of Afghan Rugs", status: "in_progress" },
            { id: "3", title: "Lapis Lazuli and Gemstone Art", status: "locked" },
            { id: "4", title: "The Buddhas of Bamiyan: A Lost Treasure", status: "locked" },
        ]
    },
    "dari-language-basics": {
        title: "Dari Language Basics",
        description: "Learn essential greetings, phrases, and the alphabet of one of Afghanistan's official languages.",
        lessons: [
            { id: "1", title: "The Dari Alphabet and Pronunciation", status: "completed" },
            { id: "2", title: "Greetings and Common Phrases", status: "completed" },
            { id: "3", title: "Introducing Yourself", status: "completed" },
            { id: "4", title: "Asking Basic Questions", status: "in_progress" },
            { id: "5", title: "Numbers and Counting", status: "locked" },
            { id: "6", title: "Family and Relationships", status: "locked" },
        ]
    },
     "pashto-for-beginners": {
        title: "Pashto for Beginners",
        description: "An introduction to the Pashto language, focusing on conversational skills and cultural nuances.",
        lessons: [
             { id: "1", title: "The Pashto Alphabet and Unique Sounds", status: "in_progress" },
             { id: "2", title: "Essential Greetings and 'Pashtunwali'", status: "locked" },
             { id: "3", title: "Basic Introductions", status: "locked" },
             { id: "4", title: "Everyday Vocabulary", status: "locked" },
             { id: "5", title: "Simple Sentence Structure", status: "locked" },
             { id: "6", title: "Understanding Tense", status: "locked" },
        ]
    }
};

type CourseId = keyof typeof courseData;

const LessonStatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "completed": return <CheckCircle className="h-6 w-6 text-accent" />;
        case "in_progress": return <ArrowRight className="h-6 w-6 text-primary animate-pulse" />;
        case "locked": return <Lock className="h-6 w-6 text-muted-foreground" />;
        default: return <BookOpen className="h-6 w-6 text-muted-foreground" />;
    }
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
    const courseId = params.courseId as CourseId;
    const course = courseData[courseId] || courseData['afghan-history-101']; // Fallback to a default

    const allLessonsCompleted = course.lessons.every(lesson => lesson.status === 'completed');

    return (
        <div className="space-y-8">
            <div>
                 <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/dashboard/learn">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Link>
                </Button>
                <h1 className="text-3xl font-headline font-bold tracking-tight">{course.title}</h1>
                <p className="text-muted-foreground max-w-2xl">{course.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-4">
                    {course.lessons.map((lesson, index) => (
                         <Link key={lesson.id} href={`/dashboard/learn/${courseId}/${lesson.id}`} className={cn(
                            "block",
                            lesson.status === 'locked' && "pointer-events-none"
                         )}>
                            <Card className={cn(
                                "hover:shadow-lg transition-shadow hover:border-primary/50",
                                lesson.status === 'in_progress' && "border-primary/50 ring-2 ring-primary/20",
                                lesson.status === 'locked' && "bg-muted/50 hover:shadow-none"
                            )}>
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-3 bg-muted rounded-full">
                                        <LessonStatusIcon status={lesson.status} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Lesson {index + 1}</p>
                                        <h3 className="font-semibold">{lesson.title}</h3>
                                    </div>
                                     {lesson.status !== 'locked' && <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="md:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <Award className="text-primary" />
                                Final Exam
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">
                                Complete all lessons to unlock the final exam. Pass the exam to earn your certificate and a grand reward!
                            </p>
                            <Button asChild className="w-full font-bold" disabled={!allLessonsCompleted}>
                                <Link href={`/dashboard/learn/${courseId}/exam`}>
                                    Start Exam
                                </Link>
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-2">Reward: 10,000 Kabuli Coins</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
