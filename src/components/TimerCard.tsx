'use client';

import { Timer } from '@/context/types';
import { useTimerContext } from '@/context/TimerContext';
import ProgressBar from './ProgressBar';
import { useEffect } from 'react';

interface Props {
  timer: Timer;
}

export default function TimerCard({ timer }: Props) {
  const { dispatch } = useTimerContext();

  // Handle ticking every second
  useEffect(() => {
    if (timer.status === 'running') {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK', payload: timer.id });

        if (timer.remaining === 1) {
          dispatch({ type: 'COMPLETE_TIMER', payload: timer.id });
          clearInterval(interval);
          alert(`⏰ Timer "${timer.name}" completed!`);
        }

        if (timer.halfwayAlert && timer.remaining === Math.floor(timer.duration / 2)) {
          alert(`⏳ Halfway reached for "${timer.name}"`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer.status, timer.remaining]);

  const handleStart = () => dispatch({ type: 'START_TIMER', payload: timer.id });
  const handlePause = () => dispatch({ type: 'PAUSE_TIMER', payload: timer.id });
  const handleReset = () => dispatch({ type: 'RESET_TIMER', payload: timer.id });

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{timer.name}</h3>
          <p className="text-sm text-gray-600">
            Time Left: {timer.remaining}s | Status: {timer.status}
          </p>
          <ProgressBar duration={timer.duration} remaining={timer.remaining} />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
