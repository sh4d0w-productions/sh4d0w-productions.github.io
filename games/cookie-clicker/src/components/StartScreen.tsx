import { useState } from 'react';

interface Props {
  hasSave: boolean;
  onNewGame: (username: string) => void;
  onLoad: () => void;
}

export default function StartScreen({ hasSave, onNewGame, onLoad }: Props) {
  const [username, setUsername] = useState('');
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">🍪</div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
            Cookie Clicker
          </h1>
          <h2 className="text-2xl font-bold text-purple-300">Universe</h2>
          <p className="text-gray-400 mt-2 text-sm">Travel worlds, collect gems, become the ultimate cookie master!</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 space-y-4">
          {!showNew ? (
            <>
              <button
                onClick={() => setShowNew(true)}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                🚀 Start a New Game
              </button>
              {hasSave && (
                <button
                  onClick={onLoad}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  📂 Load Game
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-300 text-center font-medium">Enter your username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                maxLength={20}
                autoFocus
              />
              <button
                onClick={() => {
                  if (username.trim()) onNewGame(username.trim());
                }}
                disabled={!username.trim()}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                🎮 Start Playing!
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="w-full py-2 text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-300 font-bold text-sm">🏆 Top rebirther at the end of every month wins a 10€/$ Giftcard for FREE!</p>
          </div>
        </div>

        <p className="text-gray-600 text-center mt-4 text-xs">by @.gh0st-net.</p>
      </div>
    </div>
  );
}
