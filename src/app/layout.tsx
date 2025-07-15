import './globals.css';
import { TimerProvider } from '@/context/TimerContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Timer App',
  description: 'Create and manage multiple timers grouped by category.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <TimerProvider>
          <main className="max-w-4xl mx-auto p-4">{children}</main>
        </TimerProvider>
      </body>
    </html>
  );
}
