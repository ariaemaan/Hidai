"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Landmark, Users, Share2, GraduationCap, Newspaper, Mic, Utensils, Calendar, Handshake, Heart } from "lucide-react";

// Re-using MosqueIcon from another component for consistency.
const MosqueIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20"/><path d="M4 12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2Z"/><path d="M17 12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2Z"/><path d="M8 22V8.5l4-2.5 4 2.5V22"/><path d="M12 2v1.5"/><path d="m10.5 4.5 1.5-1 1.5 1"/>
    </svg>
)

const questData = {
    cultural: [
        { title: "Daily Phrase", description: "Learn a new Dari/Pashto phrase.", reward: 50, icon: BookOpen, status: "incomplete" },
        { title: "Kabul Trivia", description: "Answer a question about a Kabul landmark.", reward: 100, icon: Landmark, status: "incomplete" },
        { title: "Recipe Share", description: "Share a traditional Afghan recipe.", reward: 200, icon: Utensils, status: "completed" },
        { title: "Poetry Corner", description: "Recite a short poem from Rumi.", reward: 150, icon: Mic, status: "incomplete" },
    ],
    religious: [
        { title: "Daily Prayers", description: "Check-in for all 5 daily prayers.", reward: 125, icon: MosqueIcon, status: "incomplete" },
        { title: "Islamic Calendar", description: "Learn about the significance of the current Islamic month.", reward: 300, icon: Calendar, status: "incomplete" },
        { title: "Verse of the Day", description: "Read and reflect on a verse from the Quran.", reward: 100, icon: BookOpen, status: "completed" },
        { title: "Charity Drive", description: "Donate to a featured charity campaign.", reward: 500, icon: Heart, status: "incomplete" },
    ],
    social: [
        { title: "Invite Friends", description: "Invite 3 friends to join MullaCoin.", reward: 1000, icon: Users, status: "incomplete" },
        { title: "Share Achievement", description: "Share your daily high score on social media.", reward: 50, icon: Share2, status: "completed" },
        { title: "Community Help", description: "Help an elderly neighbor with their groceries.", reward: 500, icon: Handshake, status: "incomplete" },
    ],
    educational: [
        { title: "Language Module", description: "Complete a 5-minute Dari lesson.", reward: 250, icon: GraduationCap, status: "incomplete" },
        { title: "Cultural Watch", description: "Watch a short documentary about Afghan history.", reward: 350, icon: Newspaper, status: "incomplete" },
    ]
};

const QuestItem = ({ quest }: { quest: any }) => (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
        <div className="bg-muted p-3 rounded-full">
            <quest.icon className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold">{quest.title}</h4>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
        </div>
        <div className="text-right">
            <p className="font-mono font-bold text-lg text-primary">+{quest.reward} MullaCoin</p>
            <Button size="sm" disabled={quest.status === 'completed'}>
                {quest.status === 'completed' ? 'Claimed' : 'Claim'}
            </Button>
        </div>
    </div>
);


export function QuestList() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Available Quests</CardTitle>
                <CardDescription>New quests are available daily. Complete them to earn MullaCoins!</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="cultural" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                        <TabsTrigger value="cultural">Cultural</TabsTrigger>
                        <TabsTrigger value="religious">Religious</TabsTrigger>
                        <TabsTrigger value="social">Social</TabsTrigger>
                        <TabsTrigger value="educational">Educational</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="cultural" className="mt-4 border rounded-lg p-0">
                        {questData.cultural.map((quest, index) => (
                           <QuestItem key={`cultural-${index}`} quest={quest} />
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="religious" className="mt-4 border rounded-lg p-0">
                        {questData.religious.map((quest, index) => (
                           <QuestItem key={`religious-${index}`} quest={quest} />
                        ))}
                    </TabsContent>

                    <TabsContent value="social" className="mt-4 border rounded-lg p-0">
                       {questData.social.map((quest, index) => (
                           <QuestItem key={`social-${index}`} quest={quest} />
                        ))}
                    </TabsContent>

                    <TabsContent value="educational" className="mt-4 border rounded-lg p-0">
                        {questData.educational.map((quest, index) => (
                           <QuestItem key={`educational-${index}`} quest={quest} />
                        ))}
                    </TabsContent>

                </Tabs>
            </CardContent>
        </Card>
    );
}
