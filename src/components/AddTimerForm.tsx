// src/components/AddTimerForm.tsx
'use client';

import { useState } from 'react';
import { useTimerContext } from '@/context/TimerContext';
import { v4 as uuid } from 'uuid';
import type { TimerStatus } from '@/context/types';

export default function AddTimerForm() {
  const { dispatch } = useTimerContext();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleAdd = () => {
    if (!name || !duration || !category) return alert('All fields are required.');

    const newTimer = {
      id: uuid(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'paused' as TimerStatus,
      halfwayAlert,
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });

    // Reset form
    setName('');
    setDuration('');
    setCategory('');
    setHalfwayAlert(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add New Timer
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Timer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Duration (sec)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="flex items-center space-x-3 text-gray-700">
          <input
            type="checkbox"
            checked={halfwayAlert}
            onChange={(e) => setHalfwayAlert(e.target.checked)}
            className="w-5 h-5 text-blue-600"
          />
          <span>Enable Halfway Alert</span>
        </label>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm"
          onClick={handleAdd}
        >
          ➕ Add Timer
        </button>
      </div>
    </div>
  );
}
