import { World, Upgrade, RedeemCode, EventData } from './types';

export const WORLDS: World[] = [
  {
    id: 0,
    name: 'Earth',
    emoji: '🌍',
    description: 'Your home planet. Click cookies to begin your journey!',
    color: '#4ade80',
    bgGradient: 'from-green-900 via-emerald-900 to-teal-900',
    unlockCost: 0,
    coinName: 'Earth Coins',
    coinEmoji: '🪙',
    cookieEmoji: '🍪',
  },
  {
    id: 1,
    name: 'Mars',
    emoji: '🔴',
    description: 'The red planet. Alien cookies taste different here...',
    color: '#ef4444',
    bgGradient: 'from-red-900 via-orange-900 to-red-950',
    unlockCost: 50000,
    coinName: 'Mars Crystals',
    coinEmoji: '🔶',
    cookieEmoji: '🔴',
  },
  {
    id: 2,
    name: 'Nebula X',
    emoji: '🌌',
    description: 'A cosmic bakery floating in space dust.',
    color: '#a855f7',
    bgGradient: 'from-purple-900 via-indigo-900 to-violet-950',
    unlockCost: 500000,
    coinName: 'Nebula Shards',
    coinEmoji: '💎',
    cookieEmoji: '⭐',
  },
  {
    id: 3,
    name: 'Dimension Ω',
    emoji: '🕳️',
    description: 'The final dimension. Nuclear power awaits...',
    color: '#f59e0b',
    bgGradient: 'from-yellow-900 via-amber-900 to-orange-950',
    unlockCost: 5000000,
    coinName: 'Omega Tokens',
    coinEmoji: '⚡',
    cookieEmoji: '💫',
  },
];

export const getUpgradesForWorld = (worldId: number): Upgrade[] => {
  const base: Upgrade[][] = [
    // World 0 - Earth
    [
      { id: 'cursor', name: 'Auto Cursor', description: '+1 CPS', baseCost: 15, costMultiplier: 1.15, cps: 1, level: 0, maxLevel: 200, icon: '👆', unlockAt: 0, worldId: 0 },
      { id: 'grandma', name: 'Grandma', description: '+5 CPS', baseCost: 100, costMultiplier: 1.15, cps: 5, level: 0, maxLevel: 150, icon: '👵', unlockAt: 50, worldId: 0 },
      { id: 'farm', name: 'Cookie Farm', description: '+20 CPS', baseCost: 500, costMultiplier: 1.15, cps: 20, level: 0, maxLevel: 100, icon: '🌾', unlockAt: 200, worldId: 0 },
      { id: 'mine', name: 'Cookie Mine', description: '+50 CPS', baseCost: 2000, costMultiplier: 1.15, cps: 50, level: 0, maxLevel: 80, icon: '⛏️', unlockAt: 1000, worldId: 0 },
      { id: 'factory', name: 'Cookie Factory', description: '+150 CPS', baseCost: 10000, costMultiplier: 1.15, cps: 150, level: 0, maxLevel: 60, icon: '🏭', unlockAt: 5000, worldId: 0 },
      { id: 'bank', name: 'Cookie Bank', description: '+400 CPS', baseCost: 50000, costMultiplier: 1.15, cps: 400, level: 0, maxLevel: 50, icon: '🏦', unlockAt: 20000, worldId: 0 },
      { id: 'temple', name: 'Cookie Temple', description: '+1,000 CPS', baseCost: 200000, costMultiplier: 1.15, cps: 1000, level: 0, maxLevel: 40, icon: '⛩️', unlockAt: 100000, worldId: 0 },
      { id: 'wizardtower', name: 'Wizard Tower', description: '+3,000 CPS', baseCost: 1000000, costMultiplier: 1.15, cps: 3000, level: 0, maxLevel: 30, icon: '🧙', unlockAt: 500000, worldId: 0 },
    ],
    // World 1 - Mars
    [
      { id: 'mars_drill', name: 'Mars Drill', description: '+100 CPS', baseCost: 500, costMultiplier: 1.18, cps: 100, level: 0, maxLevel: 100, icon: '🔧', unlockAt: 0, worldId: 1 },
      { id: 'mars_rover', name: 'Cookie Rover', description: '+500 CPS', baseCost: 5000, costMultiplier: 1.18, cps: 500, level: 0, maxLevel: 80, icon: '🤖', unlockAt: 2000, worldId: 1 },
      { id: 'mars_base', name: 'Mars Base', description: '+2,000 CPS', baseCost: 25000, costMultiplier: 1.18, cps: 2000, level: 0, maxLevel: 60, icon: '🏗️', unlockAt: 10000, worldId: 1 },
      { id: 'mars_colony', name: 'Mars Colony', description: '+8,000 CPS', baseCost: 100000, costMultiplier: 1.18, cps: 8000, level: 0, maxLevel: 40, icon: '🏙️', unlockAt: 50000, worldId: 1 },
      { id: 'mars_terraform', name: 'Terraformer', description: '+25,000 CPS', baseCost: 500000, costMultiplier: 1.18, cps: 25000, level: 0, maxLevel: 30, icon: '🌱', unlockAt: 200000, worldId: 1 },
      { id: 'mars_alien', name: 'Alien Baker', description: '+80,000 CPS', baseCost: 2000000, costMultiplier: 1.18, cps: 80000, level: 0, maxLevel: 20, icon: '👽', unlockAt: 1000000, worldId: 1 },
    ],
    // World 2 - Nebula X
    [
      { id: 'nebula_collector', name: 'Star Collector', description: '+5,000 CPS', baseCost: 10000, costMultiplier: 1.2, cps: 5000, level: 0, maxLevel: 80, icon: '✨', unlockAt: 0, worldId: 2 },
      { id: 'nebula_forge', name: 'Cosmic Forge', description: '+25,000 CPS', baseCost: 50000, costMultiplier: 1.2, cps: 25000, level: 0, maxLevel: 60, icon: '🔥', unlockAt: 20000, worldId: 2 },
      { id: 'nebula_station', name: 'Space Station', description: '+100,000 CPS', baseCost: 250000, costMultiplier: 1.2, cps: 100000, level: 0, maxLevel: 40, icon: '🛸', unlockAt: 100000, worldId: 2 },
      { id: 'nebula_blackhole', name: 'Black Hole Oven', description: '+500,000 CPS', baseCost: 1000000, costMultiplier: 1.2, cps: 500000, level: 0, maxLevel: 25, icon: '🕳️', unlockAt: 500000, worldId: 2 },
      { id: 'nebula_god', name: 'Cookie God', description: '+2,000,000 CPS', baseCost: 5000000, costMultiplier: 1.2, cps: 2000000, level: 0, maxLevel: 15, icon: '👑', unlockAt: 2000000, worldId: 2 },
    ],
    // World 3 - Dimension Ω
    [
      { id: 'omega_reactor', name: 'Omega Reactor', description: '+50,000 CPS', baseCost: 100000, costMultiplier: 1.22, cps: 50000, level: 0, maxLevel: 60, icon: '⚛️', unlockAt: 0, worldId: 3 },
      { id: 'omega_engine', name: 'Reality Engine', description: '+250,000 CPS', baseCost: 500000, costMultiplier: 1.22, cps: 250000, level: 0, maxLevel: 40, icon: '🌀', unlockAt: 200000, worldId: 3 },
      { id: 'omega_matrix', name: 'Cookie Matrix', description: '+1,000,000 CPS', baseCost: 2500000, costMultiplier: 1.22, cps: 1000000, level: 0, maxLevel: 25, icon: '💻', unlockAt: 1000000, worldId: 3 },
      { id: 'omega_timemachine', name: 'Time Machine', description: '+5,000,000 CPS', baseCost: 10000000, costMultiplier: 1.22, cps: 5000000, level: 0, maxLevel: 15, icon: '⏰', unlockAt: 5000000, worldId: 3 },
      { id: 'omega_infinity', name: 'Infinity Cookie', description: '+25,000,000 CPS', baseCost: 50000000, costMultiplier: 1.22, cps: 25000000, level: 0, maxLevel: 10, icon: '♾️', unlockAt: 25000000, worldId: 3 },
      { id: 'omega_antimatter', name: 'Antimatter Baker', description: '+100,000,000 CPS', baseCost: 200000000, costMultiplier: 1.22, cps: 100000000, level: 0, maxLevel: 5, icon: '💥', unlockAt: 100000000, worldId: 3 },
    ],
  ];
  return base[worldId] || [];
};

export const REDEEM_CODES: RedeemCode[] = [
  { code: 'GHOST2024', type: 'multiplier', value: 2, description: '2x Multiplier for 5 minutes!', used: false },
  { code: 'FREEGEMS', type: 'gems', value: 50, description: '50 Free Gems!', used: false },
  { code: 'FREECOINS', type: 'coins', value: 10000, description: '10,000 Free Coins!', used: false },
  { code: 'SUPERCLICK', type: 'multiplier', value: 5, description: '5x Multiplier for 5 minutes!', used: false },
  { code: 'GEMRAIN', type: 'gems', value: 200, description: '200 Gems!', used: false },
  { code: 'COOKIEMONSTER', type: 'multiplier', value: 10, description: '10x Multiplier for 5 minutes!', used: false },
  { code: 'RICHBOY', type: 'coins', value: 100000, description: '100,000 Free Coins!', used: false },
  { code: 'MEGAGEMS', type: 'gems', value: 500, description: '500 Gems!', used: false },
  { code: 'GHOSTNET', type: 'multiplier', value: 3, description: '3x Multiplier for 5 minutes!', used: false },
  { code: 'UNIVERSE', type: 'gems', value: 1000, description: '1,000 Gems!', used: false },
];

export const EVENTS: EventData[] = [
  { id: 'golden_hour', name: 'Golden Hour', description: 'All production x3!', emoji: '🌟', multiplier: 3, duration: 30, color: '#fbbf24' },
  { id: 'cookie_rain', name: 'Cookie Rain', description: 'Cookies falling from the sky! x5 production!', emoji: '🌧️', multiplier: 5, duration: 20, color: '#60a5fa' },
  { id: 'frenzy', name: 'Cookie Frenzy', description: 'FRENZY! x7 everything!', emoji: '🔥', multiplier: 7, duration: 15, color: '#ef4444' },
  { id: 'lucky', name: 'Lucky Day', description: 'Lucky! x2 production!', emoji: '🍀', multiplier: 2, duration: 45, color: '#22c55e' },
  { id: 'diamond_rush', name: 'Diamond Rush', description: 'Gems drop rate increased! x4 production!', emoji: '💎', multiplier: 4, duration: 25, color: '#a78bfa' },
  { id: 'cosmic_wave', name: 'Cosmic Wave', description: 'A cosmic wave boosts everything x10!', emoji: '🌊', multiplier: 10, duration: 10, color: '#06b6d4' },
];

export const GEM_SHOP_ITEMS = [
  { id: 'gem_multi_2x', name: '2x Permanent Multiplier', description: 'Doubles all production permanently!', cost: 100, type: 'multiplier' as const, value: 2 },
  { id: 'gem_multi_3x', name: '3x Permanent Multiplier', description: 'Triples all production permanently!', cost: 250, type: 'multiplier' as const, value: 3 },
  { id: 'gem_multi_5x', name: '5x Permanent Multiplier', description: '5x all production permanently!', cost: 500, type: 'multiplier' as const, value: 5 },
  { id: 'gem_coins_10k', name: '10,000 Coins', description: 'Get 10k coins instantly!', cost: 20, type: 'coins' as const, value: 10000 },
  { id: 'gem_coins_100k', name: '100,000 Coins', description: 'Get 100k coins instantly!', cost: 150, type: 'coins' as const, value: 100000 },
  { id: 'gem_coins_1m', name: '1,000,000 Coins', description: 'Get 1M coins instantly!', cost: 400, type: 'coins' as const, value: 1000000 },
  { id: 'gem_click_2x', name: '2x Click Power', description: 'Double your click power!', cost: 75, type: 'click' as const, value: 2 },
  { id: 'gem_click_5x', name: '5x Click Power', description: '5x your click power!', cost: 200, type: 'click' as const, value: 5 },
  { id: 'gem_click_10x', name: '10x Click Power', description: '10x your click power!', cost: 450, type: 'click' as const, value: 10 },
];

export const PORTAL_COST = 25000;
export const NUCLEAR_COST = 50000000;
