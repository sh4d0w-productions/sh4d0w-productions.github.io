export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  cps: number; // cookies per second added
  level: number;
  maxLevel: number;
  icon: string;
  unlockAt: number;
  worldId: number;
}

export interface World {
  id: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
  bgGradient: string;
  unlockCost: number;
  coinName: string;
  coinEmoji: string;
  cookieEmoji: string;
}

export interface RedeemCode {
  code: string;
  type: 'multiplier' | 'gems' | 'coins';
  value: number;
  description: string;
  used: boolean;
}

export interface LeaderboardEntry {
  username: string;
  rebirths: number;
  timestamp: number;
}

export interface EventData {
  id: string;
  name: string;
  description: string;
  emoji: string;
  multiplier: number;
  duration: number; // seconds
  color: string;
}

export interface GameState {
  cookies: number;
  totalCookies: number;
  cps: number;
  clickPower: number;
  gems: number;
  coins: number[];   // coins per world
  multiplier: number;
  permanentMultiplier: number;
  rebirthCount: number;
  currentWorld: number;
  unlockedWorlds: number[];
  upgrades: Record<string, number>;
  portalUnlocked: boolean;
  nuclearUnlocked: boolean;
  usedCodes: string[];
  activeEvent: string | null;
  eventEndTime: number;
  gemUpgrades: Record<string, number>;
  totalClicks: number;
  lastSave: number;
  username: string;
}
