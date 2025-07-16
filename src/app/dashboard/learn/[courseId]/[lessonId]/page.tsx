import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This is mock data. A real app would fetch this based on params.
const lessonData = {
    "afghan-history-101": {
        "3": {
            title: "The Mongol Invasion and its Aftermath",
            content: [
                "The 13th century marked a devastating period in Afghan history with the arrival of the Mongol Empire, led by Genghis Khan. In 1221, the Mongols laid siege to major cultural and economic centers like Balkh, Herat, and Bamiyan, leading to widespread destruction and loss of life.",
                "The invasion shattered existing political structures and trade routes, including the Silk Road, causing a significant decline in the region's prosperity. irrigation systems that had supported agriculture for centuries were destroyed, leading to long-term ecological and demographic changes.",
                "However, the aftermath was not solely one of destruction. The subsequent Ilkhanate and Timurid periods, particularly under Timur (Tamerlane), saw a resurgence of art, architecture, and science, especially in cities like Herat, which became a jewel of the Islamic world. This era of cultural rebirth, known as the Timurid Renaissance, left a lasting legacy on the region's identity.",
                "Understanding the Mongol invasion is crucial to appreciating the resilience of Afghan culture and its ability to rebuild and flourish even after periods of immense hardship."
            ],
            image: "https://placehold.co/1200x600.png",
            aiHint: "mongol warriors",
            nextLessonId: "4"
        }
    }
};

type CourseId = keyof typeof lessonData;
type LessonId = keyof typeof lessonData[CourseId];

export default function LessonPage({ params }: { params: { courseId: string, lessonId: string } }) {
    const courseId = params.courseId as CourseId;
    const lessonId = params.lessonId as LessonId;

    const lesson = lessonData[courseId]?.[lessonId] || {
        title: "Lesson Not Found",
        content: ["The content for this lesson could not be found. Please go back to the course page."],
        image: "https://placehold.co/1200x600.png",
        aiHint: "empty book",
        nextLessonId: null
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                 <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href={`/dashboard/learn/${courseId}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Course
                    </Link>
                </Button>
                <p className="text-sm font-semibold text-primary">Lesson Content</p>
                <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">{lesson.title}</h1>
            </div>

            <Card>
                 <CardHeader className="p-0">
                    <Image src={lesson.image} alt={lesson.title} width={1200} height={600} data-ai-hint={lesson.aiHint} className="rounded-t-lg aspect-video object-cover" />
                 </CardHeader>
                 <CardContent className="p-6 md:p-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {lesson.content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                 </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border rounded-lg bg-muted/50">
                <p className="font-semibold text-center sm:text-left">Finished with the lesson? Mark it as complete to proceed.</p>
                <div className="flex gap-2 w-full sm:w-auto">
                     <Button variant="outline" className="w-full">
                         <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Complete
                    </Button>
                    {lesson.nextLessonId ? (
                        <Button asChild className="w-full">
                            <Link href={`/dashboard/learn/${courseId}/${lesson.nextLessonId}`}>
                                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    ) : (
                         <Button asChild className="w-full">
                            <Link href={`/dashboard/learn/${courseId}/exam`}>
                                Go to Exam <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
