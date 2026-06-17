import { GEM_SHOP_ITEMS } from '../gameData';

interface Props {
  gems: number;
  gemUpgrades: Record<string, number>;
  onBuy: (id: string) => void;
}

export default function GemShop({ gems, gemUpgrades, onBuy }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        💎 Gem Shop <span className="text-sm text-purple-300 font-normal">({gems} gems)</span>
      </h3>
      <p className="text-xs text-gray-400">Gem upgrades are <span className="text-yellow-400 font-bold">permanent</span> across all worlds & rebirths!</p>
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {GEM_SHOP_ITEMS.map((item) => {
          const count = gemUpgrades[item.id] || 0;
          const canAfford = gems >= item.cost;

          return (
            <button
              key={item.id}
              onClick={() => onBuy(item.id)}
              disabled={!canAfford}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                canAfford
                  ? 'bg-purple-900/40 border-purple-500/40 hover:border-purple-400 hover:bg-purple-800/40 cursor-pointer'
                  : 'bg-gray-900/40 border-gray-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                  {count > 0 && <div className="text-xs text-green-400 mt-0.5">Bought {count}x</div>}
                </div>
                <div className={`text-sm font-bold ${canAfford ? 'text-purple-300' : 'text-gray-500'}`}>
                  💎 {item.cost}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
