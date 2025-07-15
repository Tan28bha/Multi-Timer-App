'use client';

import { useTimerContext } from '@/context/TimerContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

export default function AnalyticsPage() {
  const { state } = useTimerContext();

  const categoryCounts: Record<string, number> = {};
  state.history.forEach((timer) => {
    categoryCounts[timer.category] = (categoryCounts[timer.category] || 0) + 1;
  });

  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Timer Usage Analytics</h1>

      {/* ✅ Navbar below heading */}
      <div className="flex space-x-4 mb-6 text-blue-600">
        <Link href="/" className="hover:underline">🏠 Home</Link>
        <Link href="/history" className="hover:underline">📜 History</Link>
        <Link href="/analytics" className="hover:underline">📊 Analytics</Link>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-600">No completed timers to analyze yet.</p>
      ) : (
        <div className="w-full h-[400px] bg-white shadow rounded p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
