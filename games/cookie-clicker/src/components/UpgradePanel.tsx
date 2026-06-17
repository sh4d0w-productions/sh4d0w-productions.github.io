import { getUpgradesForWorld } from '../gameData';
import { formatNumber } from '../useGameState';

interface Props {
  worldId: number;
  cookies: number;
  upgradeLevels: Record<string, number>;
  totalCookies: number;
  onBuy: (id: string, worldId: number) => void;
}

export default function UpgradePanel({ worldId, cookies, upgradeLevels, totalCookies, onBuy }: Props) {
  const upgrades = getUpgradesForWorld(worldId);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        🏗️ Upgrades
      </h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {upgrades.map((upg) => {
          const level = upgradeLevels[upg.id] || 0;
          const cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, level));
          const canAfford = cookies >= cost;
          const isMaxed = level >= upg.maxLevel;
          const isUnlocked = totalCookies >= upg.unlockAt;

          if (!isUnlocked) return null;

          return (
            <button
              key={upg.id}
              onClick={() => !isMaxed && onBuy(upg.id, worldId)}
              disabled={!canAfford || isMaxed}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                isMaxed
                  ? 'bg-green-900/30 border-green-500/30 cursor-default'
                  : canAfford
                  ? 'bg-gray-800/80 border-gray-700 hover:border-yellow-500/50 hover:bg-gray-700/80 cursor-pointer'
                  : 'bg-gray-900/50 border-gray-800 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{upg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{upg.name}</span>
                    <span className="text-xs text-gray-400">Lv.{level}/{upg.maxLevel}</span>
                  </div>
                  <div className="text-xs text-gray-400">{upg.description}</div>
                  <div className="flex items-center justify-between mt-1">
                    {isMaxed ? (
                      <span className="text-xs text-green-400 font-bold">MAXED ✓</span>
                    ) : (
                      <span className={`text-xs font-medium ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                        🍪 {formatNumber(cost)}
                      </span>
                    )}
                    <span className="text-xs text-blue-300">+{formatNumber(upg.cps)} CPS</span>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
                  style={{ width: `${(level / upg.maxLevel) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
