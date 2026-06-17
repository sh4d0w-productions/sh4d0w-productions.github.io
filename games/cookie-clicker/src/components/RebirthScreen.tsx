interface Props {
  rebirthCount: number;
  onNewGame: () => void;
}

export default function RebirthScreen({ rebirthCount, onNewGame }: Props) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="text-8xl animate-pulse">💥☢️💥</div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
          NUCLEAR REBIRTH!
        </h1>
        <p className="text-2xl text-white font-bold">All planets destroyed!</p>
        <p className="text-lg text-gray-300">
          You have been reborn. Rebirth #{rebirthCount}
        </p>
        <p className="text-gray-400">
          Each rebirth gives you a permanent <span className="text-yellow-400 font-bold">+50% multiplier</span>!
        </p>

        <div className="bg-gray-900/80 rounded-2xl border border-purple-500/30 p-6 space-y-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-4">
            <p className="text-purple-300 font-bold">📩 Send a DM to <span className="text-white">@.gh0st-net.</span> on Discord</p>
            <p className="text-gray-400 text-sm mt-1">Share your rebirth achievement!</p>
          </div>

          <button
            onClick={onNewGame}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            🚀 Start a New Game
          </button>
        </div>
      </div>
    </div>
  );
}
