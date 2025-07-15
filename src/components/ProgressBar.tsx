interface ProgressBarProps {
  duration: number;
  remaining: number;
}

export default function ProgressBar({ duration, remaining }: ProgressBarProps) {
  const percent = (remaining / duration) * 100;

  return (
    <div className="h-2 w-full bg-gray-200 rounded overflow-hidden mt-2">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
