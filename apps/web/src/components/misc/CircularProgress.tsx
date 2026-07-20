import { cn } from "@/lib/utils"

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  className?: string
}

function CircularProgress({
  percentage,
  size = 64,
  strokeWidth = 6,
  className,
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-secondary transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-bold text-primary-foreground sm:text-xs">
        {Math.round(clamped)}%
      </span>
    </div>
  )
}

export default CircularProgress