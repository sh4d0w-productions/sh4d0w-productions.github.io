import { useState, useEffect } from 'react';
import { EVENTS } from '../gameData';

interface Props {
  activeEvent: string | null;
  eventEndTime: number;
}

export default function EventBanner({ activeEvent, eventEndTime }: Props) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!activeEvent) return;
    const interval = setInterval(() => {
      const left = Math.max(0, Math.floor((eventEndTime - Date.now()) / 1000));
      setTimeLeft(left);
    }, 100);
    return () => clearInterval(interval);
  }, [activeEvent, eventEndTime]);

  if (!activeEvent) return null;

  const event = EVENTS.find(e => e.id === activeEvent);
  if (!event) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center animate-pulse shadow-lg"
      style={{ backgroundColor: event.color + '30', borderBottom: `2px solid ${event.color}` }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
        <span className="text-2xl">{event.emoji}</span>
        <div>
          <span className="font-bold text-white text-sm">{event.name}</span>
          <span className="text-gray-300 text-sm ml-2">{event.description}</span>
        </div>
        <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-black/40" style={{ color: event.color }}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
}
