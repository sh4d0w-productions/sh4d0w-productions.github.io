import { NUCLEAR_COST } from '../gameData';
import { formatNumber } from '../useGameState';

interface Props {
  cookies: number;
  nuclearUnlocked: boolean;
  unlockedWorlds: number[];
  onBuyNuclear: () => void;
  onLaunch: () => void;
}

export default function NuclearButton({ cookies, nuclearUnlocked, unlockedWorlds, onBuyNuclear, onLaunch }: Props) {
  if (!unlockedWorlds.includes(3)) return null;

  if (!nuclearUnlocked) {
    const canAfford = cookies >= NUCLEAR_COST;
    return (
      <button
        onClick={onBuyNuclear}
        disabled={!canAfford}
        className={`w-full p-4 rounded-xl border-2 border-dashed transition-all ${
          canAfford
            ? 'border-red-500 bg-red-900/30 hover:bg-red-800/40 cursor-pointer animate-pulse'
            : 'border-gray-700 bg-gray-900/30 opacity-60 cursor-not-allowed'
        }`}
      >
        <div className="text-3xl mb-1">☢️</div>
        <div className="text-sm font-bold text-red-300">Buy Nuclear Missile</div>
        <div className="text-xs text-gray-400">Destroy all planets & rebirth!</div>
        <div className={`text-xs font-bold mt-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
          🍪 {formatNumber(NUCLEAR_COST)}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onLaunch}
      className="w-full p-4 rounded-xl border-2 border-red-500 bg-gradient-to-r from-red-900/60 to-orange-900/60 hover:from-red-800/60 hover:to-orange-800/60 transition-all cursor-pointer group"
    >
      <div className="text-4xl mb-1 group-hover:animate-bounce">🚀☢️</div>
      <div className="text-lg font-black text-red-300 group-hover:text-red-200">LAUNCH NUCLEAR MISSILE</div>
      <div className="text-xs text-gray-400 mt-1">Destroys all planets → REBIRTH</div>
      <div className="text-xs text-yellow-400 font-bold mt-1">+50% permanent multiplier!</div>
    </button>
  );
}
