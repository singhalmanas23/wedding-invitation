"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="h-[72px]" aria-hidden="true" />;
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12">
      {units.map((unit, i) => (
        <div key={unit.label} className="relative flex flex-col items-center">
          {i > 0 && (
            <span className="absolute -left-3.5 sm:-left-4.5 md:-left-6.5 top-2 text-amber-400/20 font-serif text-xl md:text-2xl select-none">
              :
            </span>
          )}
          <span className="text-2xl sm:text-3xl md:text-5xl font-serif text-stone-100 tabular-nums leading-none">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 mt-2 font-body">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
