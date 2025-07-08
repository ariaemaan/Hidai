

import type { ElementType } from 'react';
// In a real app, you would import this from 'firebase/firestore'
// For now, we'll define a placeholder
export type Timestamp = {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
};

// Users Collection
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  preferredLanguage: 'dari' | 'pashto' | 'english';
  avatar: string;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
}

export interface UserBalance {
  kabuliCoins: number;
  stakedCoins: number;
  stakingRewards: number;
  totalEarned: number;
}

export interface UserGameStats {
  level: number;
  xp: number;
  dailyStreak: number;
  totalTaps: number;
  totalSteps: number;
  questsCompleted: number;
}

export interface UserReferrals {
  code: string;
  referredBy: string; // userId
  referredUsers: string[]; // array of userIds
  totalReferralRewards: number;
}

export interface FirestoreUser {
  id: string; // Document ID
  profile: UserProfile;
  balance: UserBalance;
  gameStats: UserGameStats;
  achievements: string[];
  referrals: UserReferrals;
}

// Transactions Collection
export interface Transaction {
  id: string; // Document ID
  userId: string;
  type: 'tap_earn' | 'move_earn' | 'quest_reward' | 'daily_bonus' | 'referral_bonus' | 'staking_reward' | 'booster_purchase' | 'staking_deposit' | 'launch_bonus';
  amount: number;
  timestamp: Timestamp;
  metadata: Record<string, any>;
}

// Quests Collection
export interface Quest {
  id:string; // Document ID
  title: LocalizedText;
  description: LocalizedText;
  reward: number;
  type: 'cultural' | 'religious' | 'trivia' | 'social' | 'educational';
  difficulty: 'easy' | 'medium' | 'hard';
  isActive: boolean;
  createdAt: Timestamp;
}

export interface LocalizedText {
    dari: string;
    pashto: string;
    english: string;
}

// UI-specific types that may not map 1:1 with Firestore
// These are useful for component props and mock data
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

// Trading-specific types
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

// Live Trading Account Showcase Types
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
  dailyVaR: number; // Value at Risk
  currentExposure: number; // Percentage
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

// Copy Trading Types
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
