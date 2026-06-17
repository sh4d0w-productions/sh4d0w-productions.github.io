import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, LeaderboardEntry } from './types';
import { WORLDS, getUpgradesForWorld, REDEEM_CODES, EVENTS, GEM_SHOP_ITEMS, PORTAL_COST, NUCLEAR_COST } from './gameData';

const DEFAULT_STATE: GameState = {
  cookies: 0,
  totalCookies: 0,
  cps: 0,
  clickPower: 1,
  gems: 0,
  coins: [0, 0, 0, 0],
  multiplier: 1,
  permanentMultiplier: 1,
  rebirthCount: 0,
  currentWorld: 0,
  unlockedWorlds: [0],
  upgrades: {},
  portalUnlocked: false,
  nuclearUnlocked: false,
  usedCodes: [],
  activeEvent: null,
  eventEndTime: 0,
  gemUpgrades: {},
  totalClicks: 0,
  lastSave: Date.now(),
  username: '',
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [showRebirth, setShowRebirth] = useState(false);
  const floatIdRef = useRef(0);
  const eventTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate CPS from upgrades
  const calculateCPS = useCallback((state: GameState): number => {
    let totalCps = 0;
    for (const world of WORLDS) {
      const upgrades = getUpgradesForWorld(world.id);
      for (const upg of upgrades) {
        const level = state.upgrades[upg.id] || 0;
        totalCps += upg.cps * level;
      }
    }
    const rebirthMult = 1 + state.rebirthCount * 0.5;
    const eventMult = state.activeEvent ? (EVENTS.find(e => e.id === state.activeEvent)?.multiplier || 1) : 1;
    return totalCps * state.multiplier * state.permanentMultiplier * rebirthMult * eventMult;
  }, []);

  const getEffectiveClickPower = useCallback((state: GameState): number => {
    const rebirthMult = 1 + state.rebirthCount * 0.5;
    const eventMult = state.activeEvent ? (EVENTS.find(e => e.id === state.activeEvent)?.multiplier || 1) : 1;
    return state.clickPower * state.multiplier * state.permanentMultiplier * rebirthMult * eventMult;
  }, []);

  // Save game
  const saveGame = useCallback((state: GameState) => {
    localStorage.setItem('cookieClickerUniverse_save', JSON.stringify({ ...state, lastSave: Date.now() }));
  }, []);

  // Load game
  const loadGame = useCallback((): GameState | null => {
    const data = localStorage.getItem('cookieClickerUniverse_save');
    if (data) {
      try {
        const parsed = JSON.parse(data) as GameState;
        // Calculate offline earnings
        const now = Date.now();
        const elapsed = (now - (parsed.lastSave || now)) / 1000;
        const cps = calculateCPS(parsed);
        const offlineEarnings = Math.floor(cps * elapsed * 0.5); // 50% offline rate
        parsed.cookies += offlineEarnings;
        parsed.totalCookies += offlineEarnings;
        parsed.lastSave = now;
        // Clear expired events
        if (parsed.eventEndTime && parsed.eventEndTime < now) {
          parsed.activeEvent = null;
          parsed.eventEndTime = 0;
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  }, [calculateCPS]);

  // Click cookie
  const clickCookie = useCallback((e?: React.MouseEvent) => {
    setGameState(prev => {
      const power = getEffectiveClickPower(prev);
      const gemChance = Math.random();
      let gemsEarned = 0;
      if (gemChance < 0.02) gemsEarned = 1; // 2% chance
      if (gemChance < 0.005) gemsEarned = 5; // 0.5% chance for 5

      const newState = {
        ...prev,
        cookies: prev.cookies + power,
        totalCookies: prev.totalCookies + power,
        gems: prev.gems + gemsEarned,
        totalClicks: prev.totalClicks + 1,
      };

      if (e) {
        const id = floatIdRef.current++;
        const text = gemsEarned > 0 ? `+${formatNumber(power)} 💎+${gemsEarned}` : `+${formatNumber(power)}`;
        setFloatingTexts(ft => [...ft, { id, text, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setFloatingTexts(ft => ft.filter(f => f.id !== id)), 1000);
      }

      return newState;
    });
  }, [getEffectiveClickPower]);

  // Buy upgrade
  const buyUpgrade = useCallback((upgradeId: string, worldId: number) => {
    setGameState(prev => {
      const upgrades = getUpgradesForWorld(worldId);
      const upg = upgrades.find(u => u.id === upgradeId);
      if (!upg) return prev;

      const currentLevel = prev.upgrades[upgradeId] || 0;
      if (currentLevel >= upg.maxLevel) return prev;

      const cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, currentLevel));
      if (prev.cookies < cost) return prev;

      const newUpgrades = { ...prev.upgrades, [upgradeId]: currentLevel + 1 };
      const newState = {
        ...prev,
        cookies: prev.cookies - cost,
        upgrades: newUpgrades,
      };
      newState.cps = calculateCPS(newState);
      return newState;
    });
  }, [calculateCPS]);

  // Buy portal
  const buyPortal = useCallback(() => {
    setGameState(prev => {
      if (prev.portalUnlocked) return prev;
      if (prev.cookies < PORTAL_COST) return prev;
      return { ...prev, cookies: prev.cookies - PORTAL_COST, portalUnlocked: true };
    });
  }, []);

  // Travel to world
  const travelToWorld = useCallback((worldId: number) => {
    setGameState(prev => {
      if (!prev.portalUnlocked && worldId !== 0) return prev;
      const world = WORLDS[worldId];
      if (!world) return prev;

      if (!prev.unlockedWorlds.includes(worldId)) {
        if (prev.cookies < world.unlockCost) return prev;
        return {
          ...prev,
          cookies: prev.cookies - world.unlockCost,
          currentWorld: worldId,
          unlockedWorlds: [...prev.unlockedWorlds, worldId],
        };
      }
      return { ...prev, currentWorld: worldId };
    });
  }, []);

  // Buy nuclear missile
  const buyNuclear = useCallback(() => {
    setGameState(prev => {
      if (!prev.unlockedWorlds.includes(3)) return prev;
      if (prev.cookies < NUCLEAR_COST) return prev;
      return { ...prev, nuclearUnlocked: true, cookies: prev.cookies - NUCLEAR_COST };
    });
  }, []);

  // Launch nuclear (rebirth)
  const launchNuclear = useCallback(() => {
    setGameState(prev => {
      if (!prev.nuclearUnlocked) return prev;
      const newRebirthCount = prev.rebirthCount + 1;

      // Save rebirth count
      localStorage.setItem('cookieClickerUniverse_rebirthCount', String(newRebirthCount));

      // Save to leaderboard
      if (prev.username) {
        const lb = JSON.parse(localStorage.getItem('cookieClickerUniverse_leaderboard') || '[]') as LeaderboardEntry[];
        const existingIdx = lb.findIndex(e => e.username === prev.username);
        if (existingIdx >= 0) {
          lb[existingIdx].rebirths = newRebirthCount;
          lb[existingIdx].timestamp = Date.now();
        } else {
          lb.push({ username: prev.username, rebirths: newRebirthCount, timestamp: Date.now() });
        }
        localStorage.setItem('cookieClickerUniverse_leaderboard', JSON.stringify(lb));
      }

      setShowRebirth(true);

      const newState: GameState = {
        ...DEFAULT_STATE,
        rebirthCount: newRebirthCount,
        gems: prev.gems,
        permanentMultiplier: prev.permanentMultiplier,
        gemUpgrades: prev.gemUpgrades,
        usedCodes: prev.usedCodes,
        username: prev.username,
        clickPower: prev.clickPower,
      };
      saveGame(newState);
      return newState;
    });
  }, [saveGame]);

  // Redeem code
  const redeemCode = useCallback((code: string): string => {
    const upperCode = code.toUpperCase().trim();
    const codeData = REDEEM_CODES.find(c => c.code === upperCode);
    if (!codeData) return 'Invalid code!';

    // Check synchronously first using a ref-like approach
    // We read current state to determine result, then update
    let result = '';
    let alreadyUsed = false;

    setGameState(prev => {
      if (prev.usedCodes.includes(upperCode)) {
        alreadyUsed = true;
        return prev;
      }

      const newState = { ...prev, usedCodes: [...prev.usedCodes, upperCode] };

      switch (codeData.type) {
        case 'multiplier':
          newState.multiplier = prev.multiplier * codeData.value;
          setTimeout(() => {
            setGameState(s => ({ ...s, multiplier: s.multiplier / codeData.value }));
          }, 5 * 60 * 1000);
          result = `✅ ${codeData.description}`;
          break;
        case 'gems':
          newState.gems = prev.gems + codeData.value;
          result = `✅ ${codeData.description}`;
          break;
        case 'coins': {
          const newCoins = [...prev.coins];
          newCoins[prev.currentWorld] += codeData.value;
          newState.coins = newCoins;
          newState.cookies = prev.cookies + codeData.value;
          result = `✅ ${codeData.description}`;
          break;
        }
      }
      return newState;
    });

    if (alreadyUsed) return 'Code already used!';
    return result || `✅ ${codeData.description}`;
  }, []);

  // Trigger random event
  const triggerEvent = useCallback(() => {
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    setGameState(prev => {
      const endTime = Date.now() + event.duration * 1000;
      const newState = { ...prev, activeEvent: event.id, eventEndTime: endTime };
      newState.cps = calculateCPS(newState);

      if (eventTimerRef.current) clearTimeout(eventTimerRef.current);
      eventTimerRef.current = setTimeout(() => {
        setGameState(s => {
          const ns = { ...s, activeEvent: null, eventEndTime: 0 };
          ns.cps = calculateCPS(ns);
          return ns;
        });
      }, event.duration * 1000);

      return newState;
    });
  }, [calculateCPS]);

  // Buy gem shop item
  const buyGemItem = useCallback((itemId: string) => {
    setGameState(prev => {
      const item = GEM_SHOP_ITEMS.find(i => i.id === itemId);
      if (!item) return prev;
      if (prev.gems < item.cost) return prev;

      const count = prev.gemUpgrades[itemId] || 0;
      const newState = {
        ...prev,
        gems: prev.gems - item.cost,
        gemUpgrades: { ...prev.gemUpgrades, [itemId]: count + 1 },
      };

      switch (item.type) {
        case 'multiplier':
          newState.permanentMultiplier = prev.permanentMultiplier * item.value;
          break;
        case 'coins':
          newState.cookies = prev.cookies + item.value;
          const nc = [...prev.coins];
          nc[prev.currentWorld] += item.value;
          newState.coins = nc;
          break;
        case 'click':
          newState.clickPower = prev.clickPower * item.value;
          break;
      }

      newState.cps = calculateCPS(newState);
      return newState;
    });
  }, [calculateCPS]);

  // Set username
  const setUsername = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, username: name }));
  }, []);

  // New game
  const newGame = useCallback((username: string) => {
    const rebirthCount = parseInt(localStorage.getItem('cookieClickerUniverse_rebirthCount') || '0');
    const newState: GameState = { ...DEFAULT_STATE, username, rebirthCount };
    setGameState(newState);
    saveGame(newState);
    setShowRebirth(false);
  }, [saveGame]);

  // CPS ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const cps = calculateCPS(prev);
        const earned = cps / 20; // 50ms ticks
        if (earned === 0) return { ...prev, cps };
        return {
          ...prev,
          cookies: prev.cookies + earned,
          totalCookies: prev.totalCookies + earned,
          cps,
        };
      });
    }, 50);
    return () => clearInterval(interval);
  }, [calculateCPS]);

  // Auto-save every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        saveGame(prev);
        return prev;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [saveGame]);

  // Random events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every 30s
        triggerEvent();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [triggerEvent]);

  return {
    gameState,
    floatingTexts,
    showRebirth,
    setShowRebirth,
    clickCookie,
    buyUpgrade,
    buyPortal,
    travelToWorld,
    buyNuclear,
    launchNuclear,
    redeemCode,
    triggerEvent,
    buyGemItem,
    setUsername,
    newGame,
    loadGame,
    saveGame,
    setGameState,
    calculateCPS,
    getEffectiveClickPower,
  };
}

export function formatNumber(n: number): string {
  if (n >= 1e15) return (n / 1e15).toFixed(2) + 'Q';
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return Math.floor(n).toLocaleString();
}
