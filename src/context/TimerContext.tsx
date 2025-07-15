'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { Timer } from './types';

type State = {
  timers: Timer[];
  history: Timer[];
};

type Action =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'RESET_TIMER'; payload: string }
  | { type: 'TICK'; payload: string }
  | { type: 'COMPLETE_TIMER'; payload: string }
  | { type: 'LOAD_STATE'; payload: State };

const initialState: State = {
  timers: [],
  history: [],
};

const TimerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload ? { ...t, status: 'running', startTime: Date.now() } : t
        ),
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload ? { ...t, status: 'paused' } : t
        ),
      };
    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload ? { ...t, remaining: t.duration, status: 'paused' } : t
        ),
      };
    case 'TICK':
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload && t.status === 'running'
            ? { ...t, remaining: t.remaining - 1 }
            : t
        ),
      };
    case 'COMPLETE_TIMER':
      const completed = state.timers.find((t) => t.id === action.payload);
      return {
        timers: state.timers.map((t) =>
          t.id === action.payload ? { ...t, status: 'completed' } : t
        ),
        history: completed ? [...state.history, completed] : state.history,
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('timers');
    if (stored) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(state));
  }, [state]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  return useContext(TimerContext);
}
