import { useState, useCallback } from 'react';
import { useGameState, formatNumber } from './useGameState';
import { WORLDS } from './gameData';
import StartScreen from './components/StartScreen';
import RebirthScreen from './components/RebirthScreen';
import CookieButton from './components/CookieButton';
import UpgradePanel from './components/UpgradePanel';
import WorldSelector from './components/WorldSelector';
import GemShop from './components/GemShop';
import CodeRedeemer from './components/CodeRedeemer';
import Leaderboard from './components/Leaderboard';
import NuclearButton from './components/NuclearButton';
import EventBanner from './components/EventBanner';
import FloatingText from './components/FloatingText';
import StatsBar from './components/StatsBar';

type Tab = 'upgrades' | 'worlds' | 'gems' | 'codes' | 'leaderboard' | 'nuclear';

export default function App() {
  const {
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
    buyGemItem,
    newGame,
    loadGame,
    saveGame,
    setGameState,
    calculateCPS,
    getEffectiveClickPower,
  } = useGameState();

  const [gameStarted, setGameStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('upgrades');
  const [showConfirmNuke, setShowConfirmNuke] = useState(false);

  const hasSave = !!localStorage.getItem('cookieClickerUniverse_save');

  const handleNewGame = useCallback((username: string) => {
    newGame(username);
    setGameStarted(true);
  }, [newGame]);

  const handleLoad = useCallback(() => {
    const loaded = loadGame();
    if (loaded) {
      setGameState(loaded);
      setGameStarted(true);
    }
  }, [loadGame, setGameState]);

  const handleSave = useCallback(() => {
    saveGame(gameState);
  }, [saveGame, gameState]);

  const effectiveCPS = calculateCPS(gameState);
  const effectiveClickPower = getEffectiveClickPower(gameState);
  const world = WORLDS[gameState.currentWorld];

  // Show start screen
  if (!gameStarted) {
    return <StartScreen hasSave={hasSave} onNewGame={handleNewGame} onLoad={handleLoad} />;
  }

  // Show rebirth screen
  if (showRebirth) {
    return (
      <RebirthScreen
        rebirthCount={gameState.rebirthCount}
        onNewGame={() => {
          setShowRebirth(false);
        }}
      />
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'upgrades', label: 'Upgrades', icon: '🏗️' },
    { id: 'worlds', label: 'Worlds', icon: '🌌' },
    { id: 'gems', label: 'Gems', icon: '💎' },
    { id: 'codes', label: 'Codes', icon: '🎁' },
    { id: 'leaderboard', label: 'Board', icon: '🏆' },
    { id: 'nuclear', label: 'Nuclear', icon: '☢️' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${world.bgGradient} transition-all duration-1000`}>
      <EventBanner activeEvent={gameState.activeEvent} eventEndTime={gameState.eventEndTime} />
      <FloatingText texts={floatingTexts} />

      {/* Confirm nuke modal */}
      {showConfirmNuke && (
        <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-500 rounded-2xl p-6 max-w-md w-full text-center space-y-4">
            <div className="text-6xl animate-pulse">☢️🚀</div>
            <h2 className="text-2xl font-black text-red-400">ARE YOU SURE?</h2>
            <p className="text-gray-300">This will <span className="text-red-400 font-bold">DESTROY ALL PLANETS</span> and reset your progress!</p>
            <p className="text-yellow-300 text-sm font-bold">You keep: Gems, Permanent Multipliers, Click Power</p>
            <p className="text-green-300 text-sm font-bold">You gain: +50% permanent rebirth multiplier!</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmNuke(false)}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmNuke(false);
                  launchNuclear();
                }}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl transition animate-pulse"
              >
                🚀 LAUNCH!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className={`${gameState.activeEvent ? 'pt-10' : ''}`}>
        <StatsBar state={gameState} effectiveCPS={effectiveCPS} effectiveClickPower={effectiveClickPower} />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Cookie Area */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-[400px] relative">
            {/* World info */}
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-black text-white flex items-center justify-center gap-2">
                {world.emoji} {world.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{world.description}</p>
            </div>

            {/* Cookie */}
            <CookieButton currentWorld={gameState.currentWorld} onClick={clickCookie} />

            {/* Quick stats below cookie */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-900/60 backdrop-blur rounded-xl px-4 py-3 border border-gray-700/50">
                <div className="text-xl font-black text-white">{formatNumber(effectiveCPS)}</div>
                <div className="text-xs text-gray-400">per second</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur rounded-xl px-4 py-3 border border-gray-700/50">
                <div className="text-xl font-black text-white">{formatNumber(gameState.totalCookies)}</div>
                <div className="text-xs text-gray-400">total baked</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur rounded-xl px-4 py-3 border border-gray-700/50">
                <div className="text-xl font-black text-white">{formatNumber(gameState.totalClicks)}</div>
                <div className="text-xs text-gray-400">total clicks</div>
              </div>
            </div>

            {/* Giftcard banner */}
            <div className="mt-6 w-full max-w-lg">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                <p className="text-yellow-300 font-bold text-xs">
                  🏆 Top rebirther at end of every month wins 10€/$ Giftcard FREE! 🎉
                </p>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white text-sm rounded-xl border border-gray-700 transition-all"
            >
              💾 Save Game
            </button>
          </div>

          {/* Right - Panel */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 bg-gray-900/80 backdrop-blur-xl rounded-xl p-1 border border-gray-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[60px] px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <span className="block text-lg">{tab.icon}</span>
                  <span className="block mt-0.5">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Panel content */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 p-4">
              {activeTab === 'upgrades' && (
                <UpgradePanel
                  worldId={gameState.currentWorld}
                  cookies={gameState.cookies}
                  upgradeLevels={gameState.upgrades}
                  totalCookies={gameState.totalCookies}
                  onBuy={buyUpgrade}
                />
              )}
              {activeTab === 'worlds' && (
                <WorldSelector
                  currentWorld={gameState.currentWorld}
                  unlockedWorlds={gameState.unlockedWorlds}
                  portalUnlocked={gameState.portalUnlocked}
                  cookies={gameState.cookies}
                  onTravel={travelToWorld}
                  onBuyPortal={buyPortal}
                />
              )}
              {activeTab === 'gems' && (
                <GemShop
                  gems={gameState.gems}
                  gemUpgrades={gameState.gemUpgrades}
                  onBuy={buyGemItem}
                />
              )}
              {activeTab === 'codes' && (
                <CodeRedeemer onRedeem={redeemCode} />
              )}
              {activeTab === 'leaderboard' && (
                <Leaderboard
                  currentUsername={gameState.username}
                  currentRebirths={gameState.rebirthCount}
                />
              )}
              {activeTab === 'nuclear' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    ☢️ Nuclear Arsenal
                  </h3>
                  {!gameState.unlockedWorlds.includes(3) ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">🔒</div>
                      <p className="text-gray-400 text-sm">Unlock Dimension Ω (World 4) to access Nuclear Missiles!</p>
                      <p className="text-gray-500 text-xs mt-2">Buy a Portal first, then travel to all worlds.</p>
                    </div>
                  ) : (
                    <>
                      <NuclearButton
                        cookies={gameState.cookies}
                        nuclearUnlocked={gameState.nuclearUnlocked}
                        unlockedWorlds={gameState.unlockedWorlds}
                        onBuyNuclear={buyNuclear}
                        onLaunch={() => setShowConfirmNuke(true)}
                      />
                      <div className="bg-gray-800/60 rounded-xl p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white">What happens on Rebirth?</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>🔄 All cookies, upgrades & worlds reset</li>
                          <li>💎 Gems are <span className="text-green-400 font-bold">kept</span></li>
                          <li>✖️ Permanent multipliers are <span className="text-green-400 font-bold">kept</span></li>
                          <li>👆 Click power is <span className="text-green-400 font-bold">kept</span></li>
                          <li>⚡ +50% rebirth multiplier (stacks!)</li>
                          <li>📩 Message shown: DM @.gh0st-net. on Discord</li>
                        </ul>
                      </div>
                      {gameState.rebirthCount > 0 && (
                        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 text-center">
                          <p className="text-red-300 font-bold text-sm">
                            Current Rebirth Multiplier: {(1 + gameState.rebirthCount * 0.5).toFixed(1)}x
                          </p>
                          <p className="text-gray-400 text-xs">From {gameState.rebirthCount} rebirth(s)</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Discord credit */}
            <div className="text-center text-gray-600 text-xs py-2">
              Made by <span className="text-purple-400">@.gh0st-net.</span> on Discord
            </div>
          </div>
        </div>
      </div>

      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-float-particle"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: world.color,
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 15 + 10 + 's',
            }}
          />
        ))}
      </div>
    </div>
  );
}
