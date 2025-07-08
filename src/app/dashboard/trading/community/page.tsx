
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, MessageSquare, Mic, Video, Award } from "lucide-react";

const forumTopics = [
    { title: "Trading Strategies", description: "Discuss and share winning strategies.", icon: Award },
    { title: "Market Analysis", description: "Post your charts and analysis.", icon: BookOpen },
    { title: "Signal Feedback", description: "Provide feedback on AI signals.", icon: MessageSquare },
    { title: "Islamic Trading", description: "Discuss Sharia-compliant approaches.", icon: BookOpen },
];

const educationalResources = [
    { title: "Video Tutorials", description: "Learn from our expert video guides.", icon: Video },
    { title: "Strategy Guides", description: "In-depth articles on trading techniques.", icon: BookOpen },
    { title: "Webinar Recordings", description: "Catch up on past live sessions.", icon: Mic },
];

export default function CommunityHubPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Community Trading Hub</h1>
                    <p className="text-muted-foreground">Learn, share, and grow with the Kabuli Quest trading community.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trading Hub
                    </Link>
                </Button>
            </div>

            {/* Trading Forums Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Trading Forums</CardTitle>
                    <CardDescription>Join the conversation and share your knowledge with fellow traders.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    {forumTopics.map((topic) => (
                        <div key={topic.title} className="flex items-start gap-4 p-4 border rounded-lg bg-muted/50">
                            <div className="p-3 rounded-full bg-background">
                                <topic.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                                <Button variant="link" className="p-0 h-auto mt-2 font-bold" disabled>
                                    Enter Forum
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Educational Resources Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Educational Resources</CardTitle>
                    <CardDescription>Sharpen your skills with our library of trading education content.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                     {educationalResources.map((resource) => (
                        <Card key={resource.title}>
                            <CardHeader className="items-center text-center">
                                 <div className="p-4 rounded-full bg-accent/10">
                                    <resource.icon className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <p className="text-sm text-center text-muted-foreground">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" disabled>View Resources</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

             {/* Live Events Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Upcoming Live Events</CardTitle>
                    <CardDescription>Join our live webinars and Q&A sessions with expert traders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-lg flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold">Weekly Market Outlook</p>
                            <p className="text-sm text-muted-foreground">With Senior Analyst, Omar Ahmadi | Tomorrow at 1:00 PM GMT</p>
                        </div>
                        <Button disabled>Register Now</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
