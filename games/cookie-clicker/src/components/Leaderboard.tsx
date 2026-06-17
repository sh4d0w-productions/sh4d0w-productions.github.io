import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';

interface Props {
  currentUsername: string;
  currentRebirths: number;
}

export default function Leaderboard({ currentUsername, currentRebirths }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [newName, setNewName] = useState('');
  const [newRebirths, setNewRebirths] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, [currentRebirths]);

  const loadLeaderboard = () => {
    const data = JSON.parse(localStorage.getItem('cookieClickerUniverse_leaderboard') || '[]') as LeaderboardEntry[];
    // Update current user if exists
    if (currentUsername) {
      const idx = data.findIndex(e => e.username === currentUsername);
      if (idx >= 0) {
        data[idx].rebirths = currentRebirths;
      } else if (currentRebirths > 0) {
        data.push({ username: currentUsername, rebirths: currentRebirths, timestamp: Date.now() });
      }
    }
    data.sort((a, b) => b.rebirths - a.rebirths);
    setEntries(data);
    localStorage.setItem('cookieClickerUniverse_leaderboard', JSON.stringify(data));
  };

  const addManualEntry = () => {
    if (!newName.trim() || !newRebirths.trim()) return;
    const rebirths = parseInt(newRebirths);
    if (isNaN(rebirths) || rebirths < 0) return;

    const data = JSON.parse(localStorage.getItem('cookieClickerUniverse_leaderboard') || '[]') as LeaderboardEntry[];
    const idx = data.findIndex(e => e.username === newName.trim());
    if (idx >= 0) {
      data[idx].rebirths = rebirths;
      data[idx].timestamp = Date.now();
    } else {
      data.push({ username: newName.trim(), rebirths, timestamp: Date.now() });
    }
    localStorage.setItem('cookieClickerUniverse_leaderboard', JSON.stringify(data));
    setNewName('');
    setNewRebirths('');
    loadLeaderboard();
  };

  const getPlaceStyle = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border-yellow-500/60 text-yellow-300';
    if (index === 1) return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/60 text-gray-300';
    if (index === 2) return 'bg-gradient-to-r from-orange-600/20 to-amber-700/20 border-orange-600/60 text-orange-300';
    return 'bg-gray-800/40 border-gray-700/40 text-gray-400';
  };

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        🏆 Leaderboard
      </h3>

      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-3">
        <p className="text-yellow-300 font-bold text-xs text-center">
          🎉 Top rebirther at end of every month wins 10€/$ Giftcard FREE!
        </p>
      </div>

      {/* Add entry form */}
      <div className="bg-gray-800/60 rounded-xl p-3 space-y-2">
        <p className="text-xs text-gray-400 font-medium">Add to leaderboard:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Username"
            className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
            maxLength={20}
          />
          <input
            type="number"
            value={newRebirths}
            onChange={(e) => setNewRebirths(e.target.value)}
            placeholder="Rebirths"
            className="w-20 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
            min={0}
          />
          <button
            onClick={addManualEntry}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Leaderboard entries */}
      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="text-center text-gray-500 py-6 text-sm">No entries yet. Be the first to rebirth!</div>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={entry.username + idx}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${getPlaceStyle(idx)} ${
                entry.username === currentUsername ? 'ring-2 ring-purple-500/50' : ''
              }`}
            >
              <span className="text-xl min-w-[36px] text-center font-bold">{getMedal(idx)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">
                  {entry.username}
                  {entry.username === currentUsername && <span className="text-purple-400 ml-1 text-xs">(you)</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">☢️ {entry.rebirths}</div>
                <div className="text-[10px] opacity-60">rebirths</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
