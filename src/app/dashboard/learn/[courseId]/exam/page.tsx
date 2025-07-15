"use client";

import { useState, useEffect } from "react";
import { generateExam, type GenerateExamOutput, type ExamQuestion } from "@/ai/flows/generateExamFlow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Award, Check, X, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const courseTopics: Record<string, string> = {
    "afghan-history-101": "Key Events in Afghan History",
    "art-of-afghanistan": "Afghan Art and Architecture",
    "dari-language-basics": "Fundamentals of the Dari Language",
    "pashto-for-beginners": "Fundamentals of the Pashto Language",
};

type ExamStatus = 'loading' | 'ready' | 'in_progress' | 'finished';

export default function ExamPage({ params }: { params: { courseId: string } }) {
    const { toast } = useToast();
    const courseId = params.courseId;
    const topic = courseTopics[courseId] || "Afghan Culture";

    const [status, setStatus] = useState<ExamStatus>('loading');
    const [exam, setExam] = useState<GenerateExamOutput | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    useEffect(() => {
        generateExam({ topic })
            .then(data => {
                setExam(data);
                setStatus('ready');
            })
            .catch(err => {
                console.error("Failed to generate exam", err);
                toast({ variant: "destructive", title: "Error", description: "Could not load the exam. Please try again." });
                setStatus('loading'); // Or an error state
            });
    }, [topic, toast]);

    const handleAnswerSelect = (optionIndex: number) => {
        if (isAnswered) return;
        setSelectedAnswer(optionIndex);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;
        setIsAnswered(true);
        setAnswers(prev => [...prev, selectedAnswer]);
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < (exam?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStatus('finished');
        }
    };
    
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h1 className="text-2xl font-bold font-headline">Generating Your Exam...</h1>
                <p className="text-muted-foreground">Our AI is preparing a unique set of questions on {topic}.</p>
            </div>
        );
    }
    
    if (status === 'ready') {
         return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <Award className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-3xl font-bold font-headline">Final Exam: {topic}</h1>
                <p className="text-muted-foreground mt-2 mb-6">
                    This exam consists of {exam?.questions.length} multiple-choice questions. You must score at least 80% to pass and earn your reward. Good luck!
                </p>
                 <div className="flex gap-4">
                    <Button asChild variant="outline">
                         <Link href={`/dashboard/learn/${courseId}`}>
                             <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                        </Link>
                    </Button>
                    <Button size="lg" onClick={() => setStatus('in_progress')}>
                        <Sparkles className="mr-2 h-4 w-4" /> Start Exam
                    </Button>
                 </div>
            </div>
        );
    }

    const currentQuestion = exam?.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / (exam?.questions.length || 1)) * 100;

    if (status === 'in_progress' && currentQuestion) {
        return (
            <div className="max-w-3xl mx-auto">
                 <Progress value={progress} className="mb-4" />
                 <Card>
                    <CardHeader>
                        <CardDescription>Question {currentQuestionIndex + 1} of {exam.questions.length}</CardDescription>
                        <CardTitle className="text-2xl font-headline">{currentQuestion.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {currentQuestion.options.map((option, index) => {
                            const isCorrect = index === currentQuestion.correctAnswerIndex;
                            const isSelected = index === selectedAnswer;
                            
                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="lg"
                                    className={cn(
                                        "w-full justify-start h-auto py-3 text-left",
                                        isAnswered && isCorrect && "bg-accent/20 border-accent text-accent-foreground",
                                        isAnswered && isSelected && !isCorrect && "bg-destructive/20 border-destructive text-destructive-foreground",
                                        !isAnswered && isSelected && "bg-primary/10 border-primary"
                                    )}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={isAnswered}
                                >
                                    <div className="flex items-center w-full">
                                        <div className="flex-1">{option}</div>
                                        {isAnswered && isCorrect && <Check className="h-5 w-5" />}
                                        {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5" />}
                                    </div>
                                </Button>
                            )
                        })}
                        
                        {isAnswered && (
                            <div className="p-4 bg-muted rounded-lg animate-in fade-in-50">
                                <h4 className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Explanation</h4>
                                <p className="text-sm text-muted-foreground mt-1">{currentQuestion.explanation}</p>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            {isAnswered ? (
                                <Button onClick={handleNextQuestion} size="lg">
                                    {currentQuestionIndex === exam.questions.length - 1 ? "Finish Exam" : "Next Question"}
                                </Button>
                            ) : (
                                <Button onClick={handleSubmitAnswer} size="lg" disabled={selectedAnswer === null}>
                                    Submit Answer
                                </Button>
                            )}
                        </div>
                    </CardContent>
                 </Card>
            </div>
        )
    }

    if (status === 'finished') {
        const score = answers.reduce((correct, answer, index) => {
            return exam?.questions[index].correctAnswerIndex === answer ? correct + 1 : correct;
        }, 0);
        const total = exam?.questions.length || 0;
        const percentage = total > 0 ? (score / total) * 100 : 0;
        const passed = percentage >= 80;

        return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <Award className={cn("h-16 w-16 mb-4", passed ? "text-yellow-500" : "text-muted-foreground")} />
                <h1 className="text-3xl font-bold font-headline">{passed ? "Congratulations! You Passed!" : "Exam Completed"}</h1>
                 <p className="text-xl text-muted-foreground mt-2 mb-4">You scored {score} out of {total} ({percentage.toFixed(0)}%)</p>

                <Card className="w-full mb-6">
                    <CardContent className="p-6">
                        {exam?.questions.map((q, i) => (
                             <div key={i} className="flex items-center gap-4 py-2 border-b last:border-b-0">
                                {answers[i] === q.correctAnswerIndex ? (
                                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                                ) : (
                                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                                )}
                                <p className="text-sm text-left flex-1">{q.question}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {passed && (
                     <div className="p-4 rounded-lg bg-accent/10 text-accent-foreground border border-accent/20 mb-6 w-full">
                         <h3 className="font-bold text-accent">Reward Unlocked!</h3>
                         <p className="font-mono font-bold">+10,000 Kabuli Coins have been added to your wallet.</p>
                     </div>
                )}
                 
                 <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button asChild variant="outline" className="w-full">
                         <Link href={`/dashboard/learn`}>
                             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
                        </Link>
                    </Button>
                    {passed && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="lg" className="w-full">
                                    <Award className="mr-2 h-4 w-4" /> View Certificate
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="font-headline text-center text-primary text-2xl">Certificate of Completion</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center">This certifies that</AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="text-center my-4">
                                    <p className="text-3xl font-bold font-headline">Valued Player</p>
                                    <p className="text-muted-foreground mt-2">has successfully completed the course</p>
                                    <p className="font-semibold text-lg mt-1">{topic}</p>
                                    <p className="text-sm text-muted-foreground mt-4">Issued: {new Date().toLocaleDateString()}</p>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogAction className="w-full">Download</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                 </div>
            </div>
        )
    }

    return null;
}
