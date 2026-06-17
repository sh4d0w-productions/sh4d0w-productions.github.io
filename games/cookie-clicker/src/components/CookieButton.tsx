import { useState } from 'react';
import { WORLDS } from '../gameData';

interface Props {
  currentWorld: number;
  onClick: (e: React.MouseEvent) => void;
}

export default function CookieButton({ currentWorld, onClick }: Props) {
  const [scale, setScale] = useState(1);
  const world = WORLDS[currentWorld];

  const handleClick = (e: React.MouseEvent) => {
    setScale(0.9);
    setTimeout(() => setScale(1), 100);
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className="relative select-none focus:outline-none group"
      style={{ transform: `scale(${scale})`, transition: 'transform 0.1s ease-out' }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-3xl animate-pulse scale-125" />
      <div className="relative text-[120px] sm:text-[160px] leading-none cursor-pointer hover:drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-200 group-active:scale-90">
        {world.cookieEmoji}
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
        Click me!
      </div>
    </button>
  );
}
