"use client";

import FadeInView from "@/components/motion/FadeInView";

const INFO_ITEMS = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    label: "Dates",
    value: "Apr 19 – 21, 2026",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: "Location",
    value: "Jaipur, Rajasthan",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    label: "Events",
    value: "6 Chapters",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Support",
    value: "Get In Touch",
  },
];

export function QuickInfoStrip() {
  return (
    <section className="relative border-y border-white/4 bg-stone-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-18">
        <FadeInView>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {INFO_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="text-amber-400/50">{item.icon}</div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600 font-body mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-stone-300 font-body tracking-wide">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
