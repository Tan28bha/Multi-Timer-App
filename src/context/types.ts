export type TimerStatus = 'running' | 'paused' | 'completed';

export interface Timer {
  id: string;
  name: string;
  duration: number;      // in seconds
  remaining: number;     // in seconds
  category: string;
  status: TimerStatus;
  halfwayAlert?: boolean;
  startTime?: number;
}
