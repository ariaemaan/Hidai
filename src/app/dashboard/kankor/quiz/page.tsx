'"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { generateKankorQuestions, type GenerateKankorOutput, type KankorQuestion } from "@/ai/flows/generateKankorQuestionsFlow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, Award, Check, X, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const kankorSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Islamic Studies'];
const questionCounts = [3, 5, 10, 15];

type QuizStatus = 'configuring' | 'loading' | 'in_progress' | 'finished';

interface QuizConfig {
    subject: string;
    count: number;
}

export default function KankorQuizPage() {
    const { toast } = useToast();
    const [status, setStatus] = useState<QuizStatus>('configuring');
    const [quiz, setQuiz] = useState<GenerateKankorOutput | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    const { control, handleSubmit, watch } = useForm<QuizConfig>({
        defaultValues: {
            subject: kankorSubjects[0],
            count: 5,
        }
    });

    const quizConfig = watch();

    const startQuiz = async (data: QuizConfig) => {
        setStatus('loading');
        try {
            const result = await generateKankorQuestions(data);
            setQuiz(result);
            setStatus('in_progress');
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Could not generate the quiz. The AI might be busy, please try again." });
            setStatus('configuring');
        }
    };

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
        if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStatus('finished');
        }
    };

    const resetQuiz = () => {
        setStatus('configuring');
        setQuiz(null);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };
    
    if (status === 'configuring') {
        return (
            <div className="max-w-2xl mx-auto space-y-8">
                 <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">AI Quiz Generator</h1>
                    <p className="text-muted-foreground">Create a custom Kankor practice quiz.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Quiz Setup</CardTitle>
                        <CardDescription>Select a subject and the number of questions for your quiz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(startQuiz)} className="space-y-6">
                            <div>
                                <Label>Subject</Label>
                                <Controller
                                    name="subject"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{kankorSubjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Number of Questions</Label>
                                <Controller
                                    name="count"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={String(field.value)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{questionCounts.map(c => <SelectItem key={c} value={String(c)}>{c} Questions</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full font-bold">
                                <Sparkles className="mr-2 h-4 w-4" /> Start Quiz
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h1 className="text-2xl font-bold font-headline">Generating Your Quiz...</h1>
                <p className="text-muted-foreground">Our AI is preparing {quizConfig.count} questions on {quizConfig.subject}.</p>
            </div>
        );
    }
    
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / (quiz?.questions.length || 1)) * 100;

    if (status === 'in_progress' && currentQuestion) {
        return (
            <div className="max-w-3xl mx-auto">
                 <Progress value={progress} className="mb-4" />
                 <Card>
                    <CardHeader>
                        <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
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
                                    {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
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
            return quiz?.questions[index].correctAnswerIndex === answer ? correct + 1 : correct;
        }, 0);
        const total = quiz?.questions.length || 0;
        const percentage = total > 0 ? (score / total) * 100 : 0;
        const passed = percentage >= 80;

        return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
                <Award className={cn("h-16 w-16 mb-4", passed ? "text-yellow-500" : "text-muted-foreground")} />
                <h1 className="text-3xl font-bold font-headline">{passed ? "Congratulations! You Passed!" : "Quiz Completed"}</h1>
                 <p className="text-xl text-muted-foreground mt-2 mb-4">You scored {score} out of {total} ({percentage.toFixed(0)}%)</p>

                <Card className="w-full mb-6">
                    <CardContent className="p-6">
                        {quiz?.questions.map((q, i) => (
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
                         <p className="font-mono font-bold">+{(total * 100).toLocaleString()} Points have been added to your wallet.</p>
                     </div>
                )}
                 
                 <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button onClick={resetQuiz} variant="outline" className="w-full">
                         <ArrowLeft className="mr-2 h-4 w-4" /> Take Another Quiz
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
                                    <AlertDialogTitle className="font-headline text-center text-primary text-2xl">Certificate of Achievement</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center">This certifies that</AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="text-center my-4">
                                    <p className="text-3xl font-bold font-headline">Valued Player</p>
                                    <p className="text-muted-foreground mt-2">has successfully passed the quiz on</p>
                                    <p className="font-semibold text-lg mt-1">{quizConfig.subject}</p>
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
