import { cn } from "@/lib/utils";

interface InfoPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export default function InfoPill({
  icon,
  label,
  value,
  className,
}: InfoPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm",
        className
      )}
    >
      <span className="flex shrink-0 items-center text-amber-400/80">
        {icon}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs uppercase tracking-wider text-white/50">
          {label}
        </span>
        <span className="text-sm font-medium text-white/90">{value}</span>
      </div>
    </div>
  );
}
