
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Gem } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: 'Free',
    price: '$0',
    pricePeriod: '',
    description: 'Get started with our basic signals and community access.',
    features: [
      '3 basic signals daily',
      'General market analysis',
      'Basic risk management',
      'Community forum access',
      'Educational content',
    ],
    isCurrent: true,
  },
  {
    name: 'Silver',
    price: '$29',
    pricePeriod: '/month',
    description: 'More signals and detailed analysis for the active trader.',
    features: [
      '10 detailed signals daily',
      'Technical analysis charts',
      'Risk management guidance',
      'Email support',
      'Monthly performance reports',
    ],
    isRecommended: true,
  },
  {
    name: 'Gold',
    price: '$59',
    pricePeriod: '/month',
    description: 'For serious traders who need more depth and content.',
    features: [
      '20 premium signals daily',
      'Video analysis content',
      'Live trading alerts',
      'Priority support',
      'Exclusive webinars',
    ],
  },
  {
    name: 'Platinum',
    price: '$99',
    pricePeriod: '/month',
    description: 'Personalized coaching and portfolio optimization.',
    features: [
      'Unlimited VIP signals',
      '1-on-1 coaching sessions',
      'Portfolio optimization',
      'Custom risk parameters',
      'Direct trader communication',
    ],
  },
  {
    name: 'Diamond',
    price: '$199',
    pricePeriod: '/month',
    description: 'The ultimate all-inclusive portfolio management experience.',
    features: [
      'Complete portfolio management',
      'Personalized trading strategies',
      '24/7 priority support',
      'Quarterly strategy reviews',
      'VIP event invitations',
    ],
  },
];

export default function SubscriptionsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Trading Subscriptions</h1>
                    <p className="text-muted-foreground">Unlock premium signals and features to elevate your trading.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/trading">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trading Hub
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-stretch">
                {tiers.map((tier) => (
                    <Card key={tier.name} className={cn(
                        "flex flex-col",
                        tier.isRecommended && "border-primary shadow-primary/20 shadow-lg -translate-y-2",
                        (tier.name === 'Platinum' || tier.name === 'Diamond') && "bg-muted/50"
                    )}>
                        <CardHeader className="relative">
                            {tier.isRecommended && (
                                <Badge className="absolute -top-3 right-4">Recommended</Badge>
                            )}
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                                {(tier.name === 'Platinum' || tier.name === 'Diamond') && <Gem className="w-5 h-5 text-primary" />}
                                {tier.name}
                            </CardTitle>
                            <p className="text-4xl font-bold font-mono">{tier.price}<span className="text-sm font-normal text-muted-foreground">{tier.pricePeriod}</span></p>
                            <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-4">
                            <ul className="space-y-3">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter>
                            <Button className="w-full font-bold" disabled={tier.isCurrent} variant={tier.isRecommended ? "default" : "outline"}>
                                {tier.isCurrent ? "Your Current Plan" : "Upgrade Plan"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Flexible Payment Options</CardTitle>
                    <CardDescription>We accept a variety of payment methods, including our own Kabuli Coins for exclusive discounts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="outline" className="font-bold border-primary text-primary hover:bg-primary/10 hover:text-primary">Pay with Kabuli Coins (KBC)</Button>
                        <Button variant="outline">Credit/Debit Card</Button>
                        <Button variant="outline">PayPal</Button>
                        <Button variant="outline">Crypto (BTC, ETH)</Button>
                    </div>
                     <p className="text-xs text-muted-foreground mt-4">All subscriptions are billed monthly and can be canceled at any time. Prices are in USD.</p>
                </CardContent>
            </Card>

        </div>
    );
}
