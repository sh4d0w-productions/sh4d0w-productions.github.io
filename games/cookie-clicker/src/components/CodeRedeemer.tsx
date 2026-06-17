import { useState } from 'react';

interface Props {
  onRedeem: (code: string) => string;
}

export default function CodeRedeemer({ onRedeem }: Props) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRedeem = () => {
    if (!code.trim()) return;
    const result = onRedeem(code);
    setMessage(result);
    setIsSuccess(result.startsWith('✅'));
    if (result.startsWith('✅')) setCode('');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        🎁 Redeem Code
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
          placeholder="Enter code..."
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30"
        />
        <button
          onClick={handleRedeem}
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold text-sm rounded-lg transition-all"
        >
          Redeem
        </button>
      </div>
      {message && (
        <div className={`text-sm font-medium px-3 py-2 rounded-lg ${
          isSuccess ? 'bg-green-900/40 text-green-300 border border-green-500/30' : 'bg-red-900/40 text-red-300 border border-red-500/30'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
