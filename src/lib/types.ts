
import type { ElementType } from 'react';

// Firestore-related types
// A placeholder for the actual Firebase Timestamp type
export type Timestamp = {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
};

// --- Firestore Collections ---

// /users/{uid}
export interface User {
  uid: string;
  full_name: string;
  phone: string;
  language: 'en' | 'fa' | 'ps';
  country: string;
  wallet_balance: number;
  staked_balance: number;
  reward_per_second: number;
  last_active_timestamp: Timestamp;
  total_earned: number;
  referral_code: string;
  referred_by: string | null;
  daily_login_streak: number;
  quests_completed: string[]; // Array of quest IDs
  migration_ready: boolean;
  level: number;
  joined_at: Timestamp;
}

// /settings/app_settings (Singleton Document)
export interface AppSettings {
  total_supply: number;
  circulating_supply: number;
  coin_price_usd: number;
  apr: number;
  market_cap_usd: number;
  launch_date: Timestamp;
}

// /transactions/{transactionId}
export interface Transaction {
  uid: string;
  type: 'earn' | 'stake' | 'withdraw' | 'spend' | 'bonus';
  amount: number;
  source: 'tap_game' | 'referral' | 'quest' | 'login' | 'admin' | 'staking';
  timestamp: Timestamp;
}

// /quests/{questId}
export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  category: 'culture' | 'namaz' | 'quiz' | 'physical' | 'tap';
  is_active: boolean;
}

// /referrals/{referralId}
export interface Referral {
  referrer_uid: string;
  referred_uid: string;
  reward_given: boolean;
  timestamp: Timestamp;
}


// --- UI-specific types (for component props and mock data) ---

export interface DisplayUser {
    id: string;
    name: string;
    email: string;
    balance: string;
    status: "Active" | "Suspended" | "Banned";
    joined: string;
}

export interface DisplayTransaction {
    type: string;
    amount: number;
    description: string;
    icon: ElementType;
    time: string;
    direction: 'in' | 'out';
}

export interface DisplayQuest {
  title: string;
  description: string;
  reward: number;
  icon: ElementType;
  status: 'incomplete' | 'completed';
}

export type DisplayQuestData = {
  recommended: DisplayQuest[];
  cultural: DisplayQuest[];
  religious: DisplayQuest[];
  social: DisplayQuest[];
  educational: DisplayQuest[];
};

export interface LeaderboardPlayer {
    rank: number;
    name: string;
    score: number;
    trend: 'up' | 'down' | 'same';
    change: number;
    isCurrentUser?: boolean;
    isFounder?: boolean;
}

export type SignalType = 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
export type SignalStatus = 'active' | 'closed_win' | 'closed_loss';
export type AssetClass = 'forex' | 'crypto' | 'commodity' | 'index';

export interface TradingSignal {
  id: string;
  asset: string;
  assetClass: AssetClass;
  type: SignalType;
  entry: number;
  tp: number[];
  sl: number;
  riskReward: string;
  confidence: number;
  timeframe: string;
  status: SignalStatus;
}

export interface MarketAsset {
    name: string;
    ticker: string;
    price: string;
    change: string;
    isUp: boolean;
}

export interface LiveAccountStats {
  startingBalance: number;
  currentBalance: number;
  totalProfit: number;
  totalReturnPercentage: number;
  winRatePercentage: number;
  riskScore: 'Low' | 'Moderate' | 'High';
  activeTrades: number;
  maxDrawdown: number;
  sharpeRatio: number;
  dailyVaR: number; 
  currentExposure: number; 
  correlationRisk: 'Low' | 'Moderate' | 'High';
}

export interface LiveTrade {
  id: string;
  asset: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice?: number;
  currentPrice?: number;
  pnl?: number;
  status: 'OPEN' | 'CLOSED_WIN' | 'CLOSED_LOSS';
  timestamp: string;
}

export type RiskAlertLevel = 'High' | 'Medium' | 'Low';

export interface RiskAlert {
  level: RiskAlertLevel;
  message: string;
  asset?: string;
}

export interface MasterTrader {
  id: string;
  name: string;
  avatarUrl: string;
  performance_12m: number;
  winRate: number;
  riskScore: 'Low' | 'Moderate' | 'High';
  followers: number;
  specialty: string;
  strategy: string;
  isIslamicCompliant: boolean;
}

export interface MarketIntelligenceSummary {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentimentScore: number;
  volatilityIndex: number;
  volatilityDescription: 'Low' | 'Normal' | 'High';
  usdStrength: number;
  cryptoFearGreed: number;
  cryptoFearGreedDescription: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  highImpactEvents: number;
  newsSentiment: 'Positive' | 'Negative' | 'Neutral';
  technicalBias: 'Bullish' | 'Bearish' | 'Neutral';
  riskAppetite: 'High' | 'Moderate' | 'Low';
}

export type EconomicEventImpact = 'High' | 'Medium' | 'Low';

export interface EconomicEvent {
  impact: EconomicEventImpact;
  event: string;
  time: string;
}

export interface MarketCorrelation {
  pair: string;
  correlation: number;
  description: 'Strong Negative' | 'Weak Negative' | 'Neutral' | 'Weak Positive' | 'Strong Positive';
}

export type TrendBias = 'Bullish' | 'Bearish' | 'Neutral' | 'Consolidating';

export interface TrendAnalysis {
  asset: string;
  trends: {
    timeframe: string;
    bias: TrendBias;
  }[];
}

export interface SubscriptionTier {
  name: string;
  price: string;
  pricePeriod: string;
  description: string;
  features: string[];
  isCurrent?: boolean;
  isRecommended?: boolean;
}
