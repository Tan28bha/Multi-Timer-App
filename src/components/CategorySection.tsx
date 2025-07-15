'use client';

import { useState } from 'react';
import TimerCard from './TimerCard';
import { Timer } from '@/context/types';
import { useTimerContext } from '@/context/TimerContext';

interface Props {
  category: string;
  timers: Timer[];
}

export default function CategorySection({ category, timers }: Props) {
  const [open, setOpen] = useState(true);
  const { dispatch } = useTimerContext();

  const handleBulkAction = (action: 'START' | 'PAUSE' | 'RESET') => {
    timers.forEach((timer) => {
      dispatch({ type: `${action}_TIMER`, payload: timer.id });
    });
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-xl font-bold bg-gray-300 px-4 py-2 rounded"
      >
        {category} ({timers.length}) {open ? '▲' : '▼'}
      </button>

      {open && (
        <div className="mt-2">
          {/* 🔘 Bulk Action Buttons */}
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => handleBulkAction('START')}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              ▶ Start All
            </button>
            <button
              onClick={() => handleBulkAction('PAUSE')}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              ⏸ Pause All
            </button>
            <button
              onClick={() => handleBulkAction('RESET')}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🔁 Reset All
            </button>
          </div>

          {/* 🧱 Timer Cards */}
          {timers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
}
