"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import { generateMarketingCopy, type GenerateMarketingCopyInput, type GenerateMarketingCopyOutput } from "@/ai/flows/generateMarketingCopyFlow";
import { useToast } from "@/hooks/use-toast";

const campaignGoals = ["Drive new user sign-ups", "Promote a new feature", "Announce a community event", "Increase engagement"];
const targetAudiences = ["Afghan diaspora in US/EU", "Crypto enthusiasts", "Cultural organizations", "Religious communities", "Youth in Afghanistan"];
const tones = ["Inspirational", "Educational", "Urgent & Action-Oriented", "Community-Focused", "Celebratory"];
const platforms = ["Facebook", "Instagram", "TikTok", "X (Twitter)", "Email Newsletter"];

export default function AdminMarketingPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<GenerateMarketingCopyOutput | null>(null);

    const { control, handleSubmit, formState: { errors } } = useForm<GenerateMarketingCopyInput>({
        defaultValues: {
            goal: campaignGoals[0],
            audience: targetAudiences[0],
            tone: tones[0],
            platform: platforms[0],
        }
    });

    const onSubmit = async (data: GenerateMarketingCopyInput) => {
        setIsLoading(true);
        setGeneratedContent(null);
        try {
            const result = await generateMarketingCopy(data);
            setGeneratedContent(result);
        } catch (error) {
            console.error("Error generating marketing copy:", error);
            toast({
                variant: "destructive",
                title: "AI Error",
                description: "Failed to generate marketing content. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">AI Marketing Assistant</h1>
                <p className="text-muted-foreground">Generate culturally-aware marketing content for your campaigns.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Generator</CardTitle>
                        <CardDescription>Define your campaign parameters and let the AI do the writing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <Label>Campaign Goal</Label>
                                <Controller
                                    name="goal"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{campaignGoals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Target Audience</Label>
                                 <Controller
                                    name="audience"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{targetAudiences.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                           <div>
                                <Label>Tone</Label>
                                <Controller
                                    name="tone"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{tones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label>Platform</Label>
                                 <Controller
                                    name="platform"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>{platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {isLoading ? "Generating..." : "Generate Content"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Generated Content</CardTitle>
                        <CardDescription>Review, edit, and copy the generated content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading && (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                        {generatedContent && (
                            <div className="space-y-4">
                                <div>
                                    <Label>Headline</Label>
                                    <Input value={generatedContent.headline} readOnly />
                                </div>
                                <div>
                                    <Label>Body</Label>
                                    <Textarea value={generatedContent.body} readOnly rows={10} />
                                </div>
                                <div>
                                    <Label>Hashtags</Label>
                                    <Input value={generatedContent.hashtags} readOnly />
                                </div>
                            </div>
                        )}
                         {!isLoading && !generatedContent && (
                            <div className="flex flex-col justify-center items-center h-64 text-center text-muted-foreground p-4 border-2 border-dashed rounded-lg">
                                <Sparkles className="h-10 w-10 mb-4" />
                                <p>Your generated marketing content will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
