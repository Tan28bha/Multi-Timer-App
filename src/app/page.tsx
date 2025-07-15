'use client';

import { useEffect, useState } from 'react';
import AddTimerForm from '@/components/AddTimerForm';
import CategorySection from '@/components/CategorySection';
import { useTimerContext } from '@/context/TimerContext';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { Timer } from '@/context/types';

export default function Page() {
  const { state, dispatch } = useTimerContext();
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const interval = setInterval(() => {
      state.timers.forEach((timer) => {
        if (timer.status === 'running') {
          dispatch({ type: 'TICK', payload: timer.id });

          if (
            timer.halfwayAlert &&
            timer.remaining === Math.floor(timer.duration / 2)
          ) {
            alert(`⏳ Halfway through "${timer.name}"!`);
          }

          if (timer.remaining <= 1) {
            dispatch({ type: 'COMPLETE_TIMER', payload: timer.id });
            alert(`⏰ Timer "${timer.name}" completed!`);
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timers, dispatch]);

  const categories = ['All', ...new Set(state.timers.map((t) => t.category))];
  const filteredTimers = state.timers.filter((t) =>
    filter === 'All' ? true : t.category === filter
  );

  const groupedTimers: Record<string, Timer[]> = filteredTimers.reduce(
    (groups, timer) => {
      if (!groups[timer.category]) groups[timer.category] = [];
      groups[timer.category].push(timer);
      return groups;
    },
    {} as Record<string, Timer[]>
  );

  return (
    <div className="flex justify-center px-4 bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-gray-100 py-10">
      <div className="w-full max-w-4xl">
        {/* Centered Heading */}
        <h1 className="text-5xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8 drop-shadow-md">
          ⏱️ Multi-Timer App
        </h1>

        {/* Navbar */}
        <nav className="flex justify-center space-x-6 mb-8">
          <Link href="/" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400">
            🏠 Home
          </Link>
          <Link href="/history" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400">
            📜 History
          </Link>
          <Link href="/analytics" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400">
            📊 Analytics
          </Link>
        </nav>

        {/* Theme Toggle */}
        <div className="flex justify-center mb-6">
          <ThemeToggle />
        </div>

        {/* Category Filter */}
        <div className="max-w-md mx-auto mb-10">
          <label className="block mb-2 text-sm font-semibold">Filter by Category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Timer Form */}
        <div className="mb-8">
          <AddTimerForm />
        </div>

        {/* Grouped Timers */}
        <div className="space-y-8">
          {Object.entries(groupedTimers).map(([category, timers]) => (
            <CategorySection key={category} category={category} timers={timers as Timer[]} />
          ))}
        </div>
      </div>
    </div>
  );
}
