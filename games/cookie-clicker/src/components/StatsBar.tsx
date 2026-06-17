import { WORLDS } from '../gameData';
import { formatNumber } from '../useGameState';
import { GameState } from '../types';

interface Props {
  state: GameState;
  effectiveCPS: number;
  effectiveClickPower: number;
}

export default function StatsBar({ state, effectiveCPS, effectiveClickPower }: Props) {
  const world = WORLDS[state.currentWorld];

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Main cookie count */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">{world.cookieEmoji}</span>
            <div>
              <div className="text-2xl font-black text-white">{formatNumber(state.cookies)}</div>
              <div className="text-xs text-gray-400">
                {formatNumber(effectiveCPS)} / sec • Click: {formatNumber(effectiveClickPower)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-purple-500/20 px-3 py-1.5 rounded-lg border border-purple-500/30">
              <span>💎</span>
              <span className="text-purple-300 font-bold text-sm">{state.gems}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1.5 rounded-lg border border-yellow-500/30">
              <span>✖️</span>
              <span className="text-yellow-300 font-bold text-sm">
                {(state.multiplier * state.permanentMultiplier * (1 + state.rebirthCount * 0.5)).toFixed(1)}x
              </span>
            </div>
            {state.rebirthCount > 0 && (
              <div className="flex items-center gap-1 bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/30">
                <span>☢️</span>
                <span className="text-red-300 font-bold text-sm">{state.rebirthCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/30">
              <span>{world.emoji}</span>
              <span className="text-blue-300 font-bold text-sm">{world.name}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-700/40 px-3 py-1.5 rounded-lg border border-gray-600/30">
              <span>👤</span>
              <span className="text-gray-300 font-bold text-sm">{state.username}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
