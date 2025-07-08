"use client";

import { useState, useRef, useEffect } from "react";
import { kabiBot } from "@/ai/flows/kabiBotFlow";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
    role: 'user' | 'bot';
    text: string;
};

export function KabiBotChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "As-salamu alaykum! I'm KabiBot. How can I help you on your quest today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await kabiBot({ message: input });
            const botMessage: Message = { role: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling KabiBot flow:", error);
            const errorMessage: Message = { role: 'bot', text: "I'm having a little trouble connecting right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollArea) {
            scrollArea.scrollTo({
                top: scrollArea.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline">KabiBot Assistant</CardTitle>
                        <CardDescription>Your guide to Kabuli Quest.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'bot' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "p-3 rounded-lg max-w-sm",
                                    message.role === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'
                                )}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {message.role === 'user' && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                 <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-lg bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask KabiBot..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
