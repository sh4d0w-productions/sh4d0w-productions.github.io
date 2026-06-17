import { WORLDS, PORTAL_COST } from '../gameData';
import { formatNumber } from '../useGameState';

interface Props {
  currentWorld: number;
  unlockedWorlds: number[];
  portalUnlocked: boolean;
  cookies: number;
  onTravel: (worldId: number) => void;
  onBuyPortal: () => void;
}

export default function WorldSelector({ currentWorld, unlockedWorlds, portalUnlocked, cookies, onTravel, onBuyPortal }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        🌌 Worlds
      </h3>

      {!portalUnlocked ? (
        <button
          onClick={onBuyPortal}
          disabled={cookies < PORTAL_COST}
          className={`w-full p-4 rounded-xl border-2 border-dashed transition-all ${
            cookies >= PORTAL_COST
              ? 'border-purple-500 bg-purple-900/30 hover:bg-purple-800/40 cursor-pointer'
              : 'border-gray-700 bg-gray-900/30 opacity-60 cursor-not-allowed'
          }`}
        >
          <div className="text-3xl mb-1">🌀</div>
          <div className="text-sm font-bold text-purple-300">Buy Portal</div>
          <div className="text-xs text-gray-400">Travel to other worlds!</div>
          <div className={`text-xs font-bold mt-1 ${cookies >= PORTAL_COST ? 'text-yellow-400' : 'text-red-400'}`}>
            🍪 {formatNumber(PORTAL_COST)}
          </div>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {WORLDS.map((world) => {
            const isUnlocked = unlockedWorlds.includes(world.id);
            const isCurrent = currentWorld === world.id;
            const canAfford = cookies >= world.unlockCost;

            return (
              <button
                key={world.id}
                onClick={() => onTravel(world.id)}
                disabled={!isUnlocked && !canAfford && world.id !== 0}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  isCurrent
                    ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/20'
                    : isUnlocked
                    ? 'border-gray-600 bg-gray-800/60 hover:border-gray-500 cursor-pointer'
                    : canAfford
                    ? 'border-purple-500/50 bg-purple-900/20 hover:bg-purple-800/30 cursor-pointer'
                    : 'border-gray-800 bg-gray-900/30 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-2xl">{world.emoji}</div>
                <div className="text-xs font-bold text-white mt-1">{world.name}</div>
                {!isUnlocked && (
                  <div className={`text-[10px] font-medium mt-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    🍪 {formatNumber(world.unlockCost)}
                  </div>
                )}
                {isCurrent && (
                  <div className="text-[10px] text-yellow-400 font-bold">HERE</div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
