'use client';

import { useTimerContext } from '@/context/TimerContext';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function HistoryPage() {
  const { state } = useTimerContext();

  const exportHistoryAsJSON = () => {
    const blob = new Blob([JSON.stringify(state.history, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timer-history.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Completed Timers</h1>
      <div className="flex space-x-4 mb-4 text-blue-600">
        <Link href="/" className="hover:underline">🏠 Home</Link>
        <Link href="/analytics" className="hover:underline">📊 Analytics</Link>
      </div>

      <ThemeToggle />

      <button
        onClick={exportHistoryAsJSON}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        ⬇️ Export History as JSON
      </button>

      {state.history.length === 0 ? (
        <p>No timers completed yet.</p>
      ) : (
        <ul className="space-y-2">
          {state.history.map((timer) => (
            <li key={timer.id} className="p-3 rounded bg-white shadow">
              <strong>{timer.name}</strong> - {new Date(timer.startTime!).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
