'"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { generateMarketingCopy, type GenerateMarketingCopyInput, type GenerateMarketingCopyOutput } from "@/ai/flows/generateMarketingCopyFlow";
import { generateAdImage } from "@/ai/flows/generateAdImageFlow";
import { useToast } from "@/hooks/use-toast";

const campaignGoals = ["Drive new user sign-ups", "Promote a new feature", "Announce a community event", "Increase engagement"];
const targetAudiences = ["Afghan diaspora in US/EU", "Crypto enthusiasts", "Cultural organizations", "Religious communities", "Youth in Afghanistan"];
const tones = ["Inspirational", "Educational", "Urgent & Action-Oriented", "Community-Focused", "Celebratory"];
const platforms = ["Facebook", "Instagram", "TikTok", "X (Twitter)", "Email Newsletter"];

export default function AdminMarketingPage() {
    const { toast } = useToast();
    const [isTextLoading, setIsTextLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<GenerateMarketingCopyOutput | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const { control, handleSubmit } = useForm<GenerateMarketingCopyInput>({
        defaultValues: {
            goal: campaignGoals[0],
            audience: targetAudiences[0],
            tone: tones[0],
            platform: platforms[0],
        }
    });

    const handleGenerateText = async (data: GenerateMarketingCopyInput) => {
        setIsTextLoading(true);
        setGeneratedContent(null);
        try {
            const content = await generateMarketingCopy(data);
            setGeneratedContent(content);
        } catch (error) {
            console.error("AI Text Generation Error:", error);
            toast({
                variant: "destructive",
                title: "AI Text Error",
                description: "Failed to generate marketing content. Please try again.",
            });
        } finally {
            setIsTextLoading(false);
        }
    };

    const handleGenerateImage = async (data: GenerateMarketingCopyInput) => {
        setIsImageLoading(true);
        setGeneratedImage(null);
        try {
            const campaignDetails = `Goal: ${data.goal}, Audience: ${data.audience}, Tone: ${data.tone}`;
            const result = await generateAdImage({ campaignDetails });
            setGeneratedImage(result.imageUrl);
        } catch (error) {
            console.error("AI Image Generation Error:", error);
            toast({
                variant: "destructive",
                title: "AI Image Error",
                description: "Failed to generate ad image. Please try again.",
            });
        } finally {
            setIsImageLoading(false);
        }
    };
    
    const onSubmit = async (data: GenerateMarketingCopyInput) => {
        handleGenerateText(data);
        handleGenerateImage(data);
    };

    const isLoading = isTextLoading || isImageLoading;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">AI Marketing Assistant</h1>
                <p className="text-muted-foreground">Generate culturally-aware marketing content and ad creatives.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Generator</CardTitle>
                        <CardDescription>Define your campaign parameters and let the AI do the work.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <Label>Campaign Goal</Label>
                                <Controller
                                    name="goal"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
                        <CardTitle>Generated Creative</CardTitle>
                        <CardDescription>Review, edit, and use the generated content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isLoading && !generatedContent && !generatedImage && (
                            <div className="flex flex-col justify-center items-center h-full text-center text-muted-foreground p-4 border-2 border-dashed rounded-lg min-h-[400px]">
                                <Sparkles className="h-10 w-10 mb-4" />
                                <p>Your generated marketing content will appear here.</p>
                            </div>
                        )}

                        {(isImageLoading || generatedImage) && (
                            <div>
                                <Label>Generated Ad Image</Label>
                                {isImageLoading ? (
                                    <Skeleton className="w-full aspect-video rounded-lg mt-2 flex items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                    </Skeleton>
                                ) : generatedImage && (
                                     <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border">
                                        <Image src={generatedImage} alt="Generated Ad Creative" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        )}
                        
                         {(isTextLoading || generatedContent) && (
                            <div className="space-y-4">
                                {isTextLoading ? (
                                    <>
                                        <div>
                                            <Label>Headline</Label>
                                            <Skeleton className="h-10 w-full mt-2" />
                                        </div>
                                         <div>
                                            <Label>Body</Label>
                                            <Skeleton className="h-24 w-full mt-2" />
                                        </div>
                                         <div>
                                            <Label>Hashtags</Label>
                                            <Skeleton className="h-10 w-full mt-2" />
                                        </div>
                                    </>
                                ) : generatedContent && (
                                    <>
                                        <div>
                                            <Label>Headline</Label>
                                            <Input value={generatedContent.headline} readOnly />
                                        </div>
                                        <div>
                                            <Label>Body</Label>
                                            <Textarea value={generatedContent.body} readOnly rows={6} />
                                        </div>
                                        <div>
                                            <Label>Hashtags</Label>
                                            <Input value={generatedContent.hashtags} readOnly />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
