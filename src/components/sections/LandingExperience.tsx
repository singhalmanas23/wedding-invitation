"use client";

import { useRef, useEffect, useState, useMemo, useCallback, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import { COUPLE, EVENTS } from "@/content/events";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

gsap.registerPlugin(ScrollTrigger);

const P = {
  gold: "#d4af37",
  bronze: "#c9956b",
  maroon: "#8b1a1a",
  bg: "#1a0a0a",
  bgDeep: "#150808",
  muted: "#2e1212",
  cream: "#f5efe6",
} as const;

function rand(a: number, b: number = 0): number {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const DAYS = [
  { day: 1, label: "Day One", date: "20th April", mood: "The Celebration", events: [EVENTS[0], EVENTS[1]] },
  { day: 2, label: "Day Two", date: "21st April", mood: "The Ceremony & Finale", events: [EVENTS[2], EVENTS[3], EVENTS[4]] },
];

/* ─────────────────────────────────────────────────────────────── */
/*  Decorative Elements                                            */
/* ─────────────────────────────────────────────────────────────── */

function Flourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.gold}33)` }} />
      <div className="flex items-center gap-1.5 mx-3">
        <div className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: `${P.gold}40` }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${P.gold}4d` }} />
        <div className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: `${P.gold}40` }} />
      </div>
      <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to left, transparent, ${P.gold}33)` }} />
    </div>
  );
}

function MandalaOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-24" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25)` }} />
      <div className="relative mx-5 w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 rotate-45 border" style={{ borderColor: `${P.gold}18` }} />
        <div className="absolute inset-2 rotate-45 border" style={{ borderColor: `${P.gold}12` }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${P.gold}40` }} />
      </div>
      <div className="h-px w-12 md:w-24" style={{ background: `linear-gradient(to left, transparent, ${P.gold}25)` }} />
    </div>
  );
}

function MughalArch({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 280" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 280 V120 Q20 20 100 8 Q180 20 180 120 V280" stroke={`${P.gold}18`} strokeWidth="0.8" />
        <path d="M35 280 V125 Q35 35 100 22 Q165 35 165 125 V280" stroke={`${P.gold}10`} strokeWidth="0.5" />
        <circle cx="100" cy="55" r="3" fill={`${P.gold}15`} />
        <line x1="70" y1="55" x2="90" y2="55" stroke={`${P.gold}12`} strokeWidth="0.5" />
        <line x1="110" y1="55" x2="130" y2="55" stroke={`${P.gold}12`} strokeWidth="0.5" />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center pt-8">{children}</div>}
    </div>
  );
}

function WeddingMandala({ className = "" }: { className?: string }) {
  const petals = useMemo(() => Array.from({ length: 8 }, (_, i) => i * 45), []);
  const dots = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { cx: 200 + Math.cos(a) * 150, cy: 200 + Math.sin(a) * 150 };
  }), []);
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="200" cy="200" r="190" stroke={`${P.gold}20`} strokeWidth="0.5" strokeDasharray="6 3" />
      <circle cx="200" cy="200" r="170" stroke={`${P.gold}12`} strokeWidth="0.3" />
      <circle cx="200" cy="200" r="130" stroke={`${P.gold}18`} strokeWidth="0.5" />
      {petals.map((angle) => (
        <ellipse key={`p-${angle}`} cx="200" cy="25" rx="18" ry="10" transform={`rotate(${angle}, 200, 200)`} stroke={`${P.gold}18`} strokeWidth="0.5" />
      ))}
      {dots.map((d, i) => (
        <circle key={`d-${i}`} cx={d.cx} cy={d.cy} r="2" fill={`${P.gold}15`} />
      ))}
      {[0, 90, 180, 270].map((angle) => (
        <g key={`dy-${angle}`} transform={`rotate(${angle}, 200, 200)`}>
          <ellipse cx="200" cy="15" rx="8" ry="5" stroke={`${P.gold}20`} strokeWidth="0.5" />
          <path d="M200 5 Q203 10 200 15 Q197 10 200 5Z" fill={`${P.gold}12`} />
        </g>
      ))}
      <circle cx="200" cy="200" r="40" stroke={`${P.gold}15`} strokeWidth="0.5" />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={`ip-${i}`} cx="200" cy="170" rx="10" ry="7" transform={`rotate(${i * 60}, 200, 200)`} stroke={`${P.gold}12`} strokeWidth="0.4" />
      ))}
      <circle cx="200" cy="200" r="8" fill={`${P.gold}0d`} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  V3.0 — Cultural SVG Components                                 */
/* ─────────────────────────────────────────────────────────────── */

function JharokhaArch({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 340" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer cusped arch — distinctly Rajasthani */}
        <path d="M20 340 V160 Q20 100 50 72 Q65 55 85 42 Q100 33 120 26 Q140 33 155 42 Q175 55 190 72 Q220 100 220 160 V340" stroke={`${P.gold}25`} strokeWidth="1" />
        {/* Inner cusped arch */}
        <path d="M38 340 V168 Q38 112 62 86 Q76 70 94 58 Q108 48 120 42 Q132 48 146 58 Q164 70 178 86 Q202 112 202 168 V340" stroke={`${P.gold}15`} strokeWidth="0.6" />
        {/* Cusps — scalloped detail at top */}
        <path d="M62 86 Q72 78 82 82" stroke={`${P.gold}18`} strokeWidth="0.5" />
        <path d="M82 82 Q96 68 110 72" stroke={`${P.gold}18`} strokeWidth="0.5" />
        <path d="M110 72 Q120 66 130 72" stroke={`${P.gold}18`} strokeWidth="0.5" />
        <path d="M130 72 Q144 68 158 82" stroke={`${P.gold}18`} strokeWidth="0.5" />
        <path d="M158 82 Q168 78 178 86" stroke={`${P.gold}18`} strokeWidth="0.5" />
        {/* Kalash finial at apex */}
        <path d="M115 26 Q120 16 125 26" stroke={`${P.gold}30`} strokeWidth="0.6" fill={`${P.gold}08`} />
        <circle cx="120" cy="14" r="3" stroke={`${P.gold}25`} strokeWidth="0.5" fill={`${P.gold}06`} />
        <line x1="120" y1="11" x2="120" y2="6" stroke={`${P.gold}20`} strokeWidth="0.5" />
        {/* Decorative brackets */}
        <path d="M20 160 Q10 160 12 150 Q14 140 20 140" stroke={`${P.gold}12`} strokeWidth="0.4" />
        <path d="M220 160 Q230 160 228 150 Q226 140 220 140" stroke={`${P.gold}12`} strokeWidth="0.4" />
        {/* Column base detail */}
        <rect x="14" y="310" width="12" height="3" rx="1" stroke={`${P.gold}15`} strokeWidth="0.3" />
        <rect x="214" y="310" width="12" height="3" rx="1" stroke={`${P.gold}15`} strokeWidth="0.3" />
        {/* Inner decorative dots */}
        <circle cx="120" cy="55" r="2" fill={`${P.gold}15`} />
        <line x1="90" y1="55" x2="108" y2="55" stroke={`${P.gold}0d`} strokeWidth="0.4" />
        <line x1="132" y1="55" x2="150" y2="55" stroke={`${P.gold}0d`} strokeWidth="0.4" />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center pt-12">{children}</div>}
    </div>
  );
}

function DiyaFlame({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dims = { sm: "w-6 h-10", md: "w-10 h-16", lg: "w-14 h-22" }[size];
  return (
    <div className={`relative ${dims} ${className}`}>
      <svg viewBox="0 0 60 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lamp base */}
        <ellipse cx="30" cy="88" rx="20" ry="6" fill={`${P.gold}20`} stroke={`${P.gold}30`} strokeWidth="0.8" />
        <path d="M14 85 Q10 78 14 72 L18 68 Q22 65 30 64 Q38 65 42 68 L46 72 Q50 78 46 85" fill={`${P.gold}12`} stroke={`${P.gold}25`} strokeWidth="0.6" />
        {/* Wick */}
        <line x1="30" y1="64" x2="30" y2="48" stroke={`${P.gold}40`} strokeWidth="1" />
        {/* Flame — animated */}
        <g className="animate-diya-flicker" style={{ transformOrigin: "30px 48px" }}>
          <path d="M30 48 Q22 34 24 22 Q26 10 30 4 Q34 10 36 22 Q38 34 30 48Z" fill="url(#flameGrad)" opacity="0.9" />
          <path d="M30 48 Q25 38 27 28 Q29 18 30 12 Q31 18 33 28 Q35 38 30 48Z" fill="url(#flameInner)" opacity="0.7" />
        </g>
        {/* Glow */}
        <circle cx="30" cy="32" r="18" fill="rgba(255,180,50,0.08)" className="animate-diya-glow" />
        <defs>
          <radialGradient id="flameGrad" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#ffdd66" />
            <stop offset="50%" stopColor="#ff9922" />
            <stop offset="100%" stopColor="#cc4400" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flameInner" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#ffffee" />
            <stop offset="100%" stopColor="#ffcc44" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function ElephantSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 100 L30 70 Q30 55 40 48 L42 35 Q44 20 55 15 Q65 10 75 15 L80 18 Q90 14 100 16 L110 20 Q115 22 118 28 L120 35 Q122 40 125 42 L130 44 Q140 46 145 55 L148 60 Q152 55 158 52 L162 50 Q168 48 172 52 L172 70 L172 100" stroke={`${P.gold}15`} strokeWidth="1" fill={`${P.gold}06`} />
      {/* Decorative howdah */}
      <rect x="70" y="8" width="40" height="20" rx="4" stroke={`${P.gold}12`} strokeWidth="0.5" fill={`${P.gold}04`} />
      <path d="M75 8 L90 0 L105 8" stroke={`${P.gold}15`} strokeWidth="0.5" />
      {/* Trunk curl */}
      <path d="M42 35 Q35 40 32 50 Q30 58 35 62" stroke={`${P.gold}15`} strokeWidth="1" fill="none" />
      {/* Eye */}
      <circle cx="52" cy="25" r="2" fill={`${P.gold}20`} />
      {/* Tusk */}
      <path d="M45 38 Q40 45 42 50" stroke={`${P.gold}20`} strokeWidth="0.6" />
      {/* Foot decorations */}
      <circle cx="30" cy="98" r="3" stroke={`${P.gold}10`} strokeWidth="0.4" />
      <circle cx="120" cy="98" r="3" stroke={`${P.gold}10`} strokeWidth="0.4" />
      <circle cx="148" cy="98" r="3" stroke={`${P.gold}10`} strokeWidth="0.4" />
      <circle cx="172" cy="98" r="3" stroke={`${P.gold}10`} strokeWidth="0.4" />
    </svg>
  );
}

function LotusBloomSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Center petal */}
      <path d="M60 70 Q50 50 48 35 Q46 20 60 8 Q74 20 72 35 Q70 50 60 70Z" stroke={`${P.gold}25`} strokeWidth="0.6" fill={`${P.gold}06`} />
      {/* Left petals */}
      <path d="M60 70 Q40 55 30 40 Q22 28 35 18 Q48 12 55 25 Q58 35 60 70Z" stroke={`${P.gold}20`} strokeWidth="0.5" fill={`${P.gold}04`} />
      <path d="M60 70 Q30 60 18 48 Q8 38 16 26 Q28 18 38 30 Q48 42 60 70Z" stroke={`${P.gold}15`} strokeWidth="0.4" fill={`${P.gold}03`} />
      {/* Right petals */}
      <path d="M60 70 Q80 55 90 40 Q98 28 85 18 Q72 12 65 25 Q62 35 60 70Z" stroke={`${P.gold}20`} strokeWidth="0.5" fill={`${P.gold}04`} />
      <path d="M60 70 Q90 60 102 48 Q112 38 104 26 Q92 18 82 30 Q72 42 60 70Z" stroke={`${P.gold}15`} strokeWidth="0.4" fill={`${P.gold}03`} />
      {/* Stamen center */}
      <circle cx="60" cy="38" r="3" fill={`${P.gold}15`} />
    </svg>
  );
}

function GoldFoilSpeckles() {
  const speckles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const x = Math.round(rand(i, 20) * 10000) / 100;
        const y = Math.round(rand(i, 21) * 10000) / 100;
        const size = 1 + rand(i, 22) * 2.5;
        const delay = rand(i, 23) * 8;
        const dur = 3 + rand(i, 24) * 5;
        return {
          id: i,
          left: `${Number(x.toFixed(2))}%`,
          top: `${Number(y.toFixed(2))}%`,
          size: Number(size.toFixed(2)),
          delay: Number(delay.toFixed(2)),
          dur: Number(dur.toFixed(2)),
        };
      }),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden" suppressHydrationWarning>
      {speckles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: P.gold,
            opacity: 0,
            animation: `goldFoilSparkle ${String(s.dur)}s ease-in-out ${String(s.delay)}s infinite`,
            willChange: "opacity",
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  V3.0 — Ritual Transitions (replaces SectionTransition)        */
/* ─────────────────────────────────────────────────────────────── */

function RitualTransition({ variant = "lotus" }: { variant?: "lotus" | "elephant" | "mandala" | "silk" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    gsap.fromTo(ref.current!.querySelectorAll(".rt-fade"), { opacity: 0 }, {
      opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
    });
    gsap.fromTo(ref.current!.querySelectorAll(".rt-line"), { scaleX: 0 }, {
      scaleX: 1, duration: 1, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
    });
    if (variant === "lotus") {
      gsap.fromTo(ref.current!.querySelector(".rt-lotus"), { scale: 0, rotate: -30, opacity: 0 }, {
        scale: 1, rotate: 0, opacity: 1, duration: 1.6, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" },
      });
    }
    if (variant === "mandala") {
      gsap.fromTo(ref.current!.querySelector(".rt-mandala"), { scale: 0, rotate: 0, opacity: 0 }, {
        scale: 1, rotate: 180, opacity: 1, duration: 2, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" },
      });
    }
    if (variant === "elephant" && !reduced) {
      gsap.fromTo(ref.current!.querySelector(".rt-elephant"), { x: "-120%" }, {
        x: "calc(100vw + 50%)", duration: 6, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }
    if (variant === "silk") {
      gsap.fromTo(ref.current!.querySelector(".rt-silk"), { xPercent: -120, opacity: 0 }, {
        xPercent: 120, opacity: 0.12, duration: 1.4, ease: "power2.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }
  }, { scope: ref });

  return (
    <div ref={ref} className="relative py-2 md:py-4 overflow-hidden" style={{ backgroundColor: P.bg }} aria-hidden="true">
      <div className="relative z-10 flex flex-col items-center">
        <div className="rt-line h-px w-12 md:w-20 origin-center mb-3" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25, transparent)` }} />

        {variant === "lotus" && (
          <div className="rt-lotus">
            <LotusBloomSVG className="w-10 md:w-14 h-auto" />
          </div>
        )}

        {variant === "elephant" && (
          <div className="relative w-full h-12 overflow-hidden">
            <div className="rt-elephant absolute top-0 left-0">
              <ElephantSilhouette className="w-20 md:w-24 h-auto" />
            </div>
          </div>
        )}

        {variant === "mandala" && (
          <div className="rt-mandala">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
              <WeddingMandala className="w-full h-full opacity-[0.12]" />
            </div>
          </div>
        )}

        {variant === "silk" && (
          <div className="relative w-full h-6 overflow-hidden">
            <div className="rt-silk absolute inset-y-0 w-1/2" style={{ background: `linear-gradient(90deg, transparent, ${P.gold}20, ${P.maroon}15, transparent)`, transform: "skewX(-8deg)" }} />
          </div>
        )}

        <div className="rt-line h-px w-12 md:w-20 origin-center mt-3" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25, transparent)` }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Jaimala (Garland Exchange) Animation                           */
/* ─────────────────────────────────────────────────────────────── */

function JaimalaAnimation({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const garlandFlowers = useMemo(() => {
    const brideFlowers = Array.from({ length: 5 }, (_, i) => {
      const t = i / 4;
      return { cx: 238 + t * 48, cy: 112 - Math.sin(t * Math.PI) * 12 };
    });
    const groomFlowers = Array.from({ length: 5 }, (_, i) => {
      const t = i / 4;
      return { cx: 162 - t * 48, cy: 112 - Math.sin(t * Math.PI) * 12 };
    });
    return { brideFlowers, groomFlowers };
  }, []);

  return (
    <div className={`relative mx-auto ${className}`} style={{ width: "clamp(160px, 32vw, 260px)" }}>
      <svg viewBox="0 0 400 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden="true">
        {/* Groom — left figure */}
        <circle cx="138" cy="78" r="20" stroke={P.gold} strokeWidth="1" opacity="0.55" />
        <path d="M118 72 Q124 50 142 46 Q158 50 156 72" stroke={P.gold} strokeWidth="0.7" opacity="0.35" />
        <path d="M150 54 L155 46 L153 60" stroke={P.gold} strokeWidth="0.5" opacity="0.28" />
        <line x1="138" y1="98" x2="138" y2="114" stroke={P.gold} strokeWidth="0.8" opacity="0.4" />
        <path d="M118 120 L138 112 L158 120 L155 222 L121 222Z" stroke={P.gold} strokeWidth="0.7" opacity="0.22" fill={`${P.gold}06`} />
        <motion.path d="M158 126 Q182 108 206 100 Q224 96 244 106" stroke={P.gold} strokeWidth="0.8" opacity="0.45" fill="none" strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.4, ease: "easeOut" }} />
        <path d="M118 126 Q105 154 110 186" stroke={P.gold} strokeWidth="0.6" opacity="0.28" strokeLinecap="round" />
        <line x1="121" y1="222" x2="114" y2="280" stroke={P.gold} strokeWidth="0.5" opacity="0.15" />
        <line x1="155" y1="222" x2="162" y2="280" stroke={P.gold} strokeWidth="0.5" opacity="0.15" />

        {/* Bride — right figure */}
        <circle cx="262" cy="78" r="20" stroke={P.gold} strokeWidth="1" opacity="0.55" />
        <path d="M242 72 Q248 53 266 50 Q282 53 282 72 Q290 78 294 96 Q290 114 286 126" stroke={P.gold} strokeWidth="0.7" opacity="0.3" fill="none" />
        <circle cx="262" cy="60" r="2.5" fill={P.maroon} opacity="0.55" />
        <line x1="262" y1="98" x2="262" y2="114" stroke={P.gold} strokeWidth="0.8" opacity="0.4" />
        <path d="M242 120 L262 112 L282 120 L298 222 L226 222Z" stroke={P.gold} strokeWidth="0.7" opacity="0.22" fill={`${P.gold}06`} />
        <motion.path d="M242 126 Q218 108 194 100 Q176 96 156 106" stroke={P.gold} strokeWidth="0.8" opacity="0.45" fill="none" strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.6, ease: "easeOut" }} />
        <path d="M282 126 Q295 154 290 186" stroke={P.gold} strokeWidth="0.6" opacity="0.28" strokeLinecap="round" />
        <line x1="226" y1="222" x2="216" y2="280" stroke={P.gold} strokeWidth="0.5" opacity="0.15" />
        <line x1="298" y1="222" x2="308" y2="280" stroke={P.gold} strokeWidth="0.5" opacity="0.15" />

        {/* Garland draped on bride (from groom) */}
        <motion.path d="M238 112 Q250 96 262 106 Q274 116 286 108" stroke={P.maroon} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.55 }} transition={{ duration: 1.4, delay: 2.4, ease: "easeOut" }} />

        {/* Garland draped on groom (from bride) */}
        <motion.path d="M162 112 Q150 96 138 106 Q126 116 114 108" stroke={P.bronze} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.55 }} transition={{ duration: 1.4, delay: 2.9, ease: "easeOut" }} />

        {/* Flower dots — bride garland */}
        {garlandFlowers.brideFlowers.map((f, i) => (
          <motion.circle key={`fb-${i}`} cx={f.cx} cy={f.cy} r="3" fill={P.maroon}
            initial={reduced ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 0.35, delay: 2.8 + i * 0.14, ease: "backOut" }} />
        ))}

        {/* Flower dots — groom garland */}
        {garlandFlowers.groomFlowers.map((f, i) => (
          <motion.circle key={`fg-${i}`} cx={f.cx} cy={f.cy} r="3" fill={P.bronze}
            initial={reduced ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 0.35, delay: 3.3 + i * 0.14, ease: "backOut" }} />
        ))}

        {/* Falling petals */}
        {!reduced && Array.from({ length: 3 }, (_, i) => (
          <motion.ellipse key={`jp-${i}`}
            cx={155 + rand(i, 80) * 90} cy={20 + rand(i, 81) * 30}
            rx="2.2" ry="3.5"
            fill={i % 3 === 0 ? P.maroon : i % 3 === 1 ? P.gold : P.bronze}
            initial={{ opacity: 0 }}
            animate={{ y: [0, 160 + rand(i, 82) * 80], opacity: [0, 0.35, 0] }}
            transition={{ duration: 6 + rand(i, 86) * 3, delay: 3 + rand(i, 87) * 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Atmospheric Particles                                          */
/* ─────────────────────────────────────────────────────────────── */

function Bokeh() {
  const reduced = useReducedMotion();
  const orbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const x = Math.round((5 + rand(i, 1) * 90) * 100) / 100;
        const y = Math.round((5 + rand(i, 2) * 90) * 100) / 100;
        const size = 80 + rand(i, 3) * 140;
        const delay = rand(i, 4) * 6;
        const dur = 14 + rand(i, 5) * 14;
        const color =
          i % 3 === 0
            ? `rgba(139,26,26,${(0.03 + rand(i, 6) * 0.05).toFixed(3)})`
            : `rgba(212,175,55,${(0.02 + rand(i, 6) * 0.04).toFixed(3)})`;
        return {
          id: i,
          left: `${Number(x.toFixed(2))}%`,
          top: `${Number(y.toFixed(2))}%`,
          size: Number(size.toFixed(2)),
          delay: Number(delay.toFixed(2)),
          dur: Number(dur.toFixed(2)),
          color,
        };
      }),
    []
  );
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden" suppressHydrationWarning>
      {orbs.map((o) => (
        <div
          key={o.id}
          className="absolute rounded-full"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            animation: `float ${String(o.dur)}s ease-in-out ${String(o.delay)}s infinite`,
            willChange: "transform",
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}

function DreamParticles({ count }: { count: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: Math.min(count, 18) }, (_, i) => {
        const isPetal = i % 5 === 0;
        const s = i + 100;
        const x = Math.round(rand(s, 1) * 10000) / 100;
        const y = Math.round((50 + rand(s, 2) * 50) * 100) / 100;
        const size = isPetal ? 4 + rand(s, 3) * 5 : 1.5 + rand(s, 3) * 3;
        const delay = rand(s, 4) * 10;
        const dur = isPetal ? 12 + rand(s, 5) * 10 : 6 + rand(s, 5) * 8;
        const opacity = isPetal ? 0.12 + rand(s, 7) * 0.18 : 0.2 + rand(s, 7) * 0.5;
        return {
          id: i,
          isPetal,
          left: `${Number(x.toFixed(2))}%`,
          bottom: `${Number((100 - y).toFixed(2))}%`,
          size: Number(size.toFixed(2)),
          delay: Number(delay.toFixed(2)),
          dur: Number(dur.toFixed(2)),
          opacity: Number(opacity.toFixed(3)),
        };
      }),
    [count]
  );
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden" suppressHydrationWarning>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            background: p.isPetal
              ? `rgba(160,40,40,${p.opacity})`
              : `radial-gradient(circle, rgba(212,175,55,${p.opacity}), transparent 70%)`,
            borderRadius: p.isPetal ? "50% 0 50% 50%" : "50%",
            animation: `fadeInUp ${String(p.dur)}s ease-out ${String(p.delay)}s infinite`,
            willChange: "transform, opacity",
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  V3.0 — Sacred Prelude (Ceremonial Invocation)                  */
/* ─────────────────────────────────────────────────────────────── */

function SacredPrelude({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;

    try {
      const audio = new Audio("/audio/test.mp3");
      audio.volume = 0.35;
      audio.play().catch(() => {});
      setTimeout(() => {
        const fade = setInterval(() => {
          if (audio.volume > 0.02) { audio.volume = Math.max(0, audio.volume - 0.02); }
          else { clearInterval(fade); audio.pause(); }
        }, 400);
      }, 14000);
    } catch { /* no audio — graceful */ }

    document.body.style.overflow = "";
    const tl = gsap.timeline({ onComplete });
    tl.to(".sp-seal", { scale: 1.5, opacity: 0, duration: 0.6, ease: "power2.in" });
    tl.to(".sp-seal-label", { opacity: 0, y: 10, duration: 0.3 }, "-=0.4");
    tl.to(".sp-inner", { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" }, "-=0.2");
    tl.to(ref.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, "-=0.2");
  }, [onComplete]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".sp-mandala", { opacity: 0, scale: 0.6, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 2.2, ease: "power2.out" }, 0);
    tl.fromTo(".sp-foil", { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.3);
    tl.fromTo(".sp-diya", { opacity: 0, scale: 0, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(2)" }, 0.5);
    tl.fromTo(".sp-arch", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.8);
    tl.fromTo(".sp-ganesh", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.2);
    tl.fromTo(".sp-vivah", { opacity: 0, letterSpacing: "0.7em" }, { opacity: 1, letterSpacing: "0.4em", duration: 1, ease: "power2.out" }, 1.5);
    tl.fromTo(".sp-line-l", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, 1.8);
    tl.fromTo(".sp-line-r", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, 1.8);
    tl.fromTo(".sp-diamond", { scale: 0, rotation: 0 }, { scale: 1, rotation: 45, duration: 0.5, ease: "back.out(2)" }, 2.0);
    tl.fromTo(".sp-char", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out" }, 2.2);
    tl.fromTo(".sp-sub", { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.35em", duration: 0.8, ease: "power2.out" }, 3.0);
    tl.fromTo(".sp-tagline", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 3.5);

    tl.call(() => setReady(true), undefined, 3.8);
    tl.fromTo(".sp-seal", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.8)" }, 3.8);
    tl.fromTo(".sp-seal-label", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 4.1);
  }, { scope: ref });

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(reveal, 5000);
    return () => clearTimeout(timer);
  }, [ready, reveal]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: P.bg, clipPath: "inset(0 0 0 0)" }}
      onClick={ready ? reveal : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (ready && (e.key === "Enter" || e.key === " ")) reveal(); }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.08), transparent 70%)` }} />

      {/* Gold foil speckles */}
      <div className="sp-foil opacity-0"><GoldFoilSpeckles /></div>

      {/* Static mandala */}
      <div className="sp-mandala absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
        <div className="w-[70vw] h-[70vw] max-w-lg max-h-lg">
          <WeddingMandala className="w-full h-full opacity-[0.5]" />
        </div>
      </div>

      <div className="sp-inner flex flex-col items-center relative z-10 w-full px-4">
        {/* Diya at center top */}
        <div className="sp-diya mb-2 md:mb-4">
          <DiyaFlame size="md" />
        </div>

        {/* Ganesh invocation */}
        <p className="sp-ganesh font-serif text-xs md:text-sm mb-1 md:mb-2" style={{ color: `${P.gold}60` }}>
          श्री गणेशाय नमः
        </p>

        {/* Shubh Vivah in Devanagari */}
        <p className="sp-vivah font-serif text-sm md:text-base mb-4 md:mb-6" style={{ color: `${P.gold}90` }}>
          शुभ विवाह
        </p>

        {/* Jharokha arch */}
        <div className="sp-arch w-24 h-32 md:w-36 md:h-52 mb-4 md:mb-6">
          <JharokhaArch />
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-5 md:mb-8">
          <div className="sp-line-l h-px w-16 md:w-24 origin-right" style={{ backgroundColor: `${P.gold}40` }} />
          <div className="sp-diamond w-2.5 h-2.5" style={{ backgroundColor: `${P.gold}70`, boxShadow: `0 0 12px ${P.gold}30` }} />
          <div className="sp-line-r h-px w-16 md:w-24 origin-left" style={{ backgroundColor: `${P.gold}40` }} />
        </div>

        {/* Couple initials — embossed gold feel */}
        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="sp-char font-serif text-6xl md:text-8xl lg:text-9xl" style={{ color: P.cream, textShadow: `0 2px 4px rgba(0,0,0,0.5), 0 0 40px ${P.gold}15` }}>{COUPLE.partner1.charAt(0)}</span>
          <span className="sp-char font-serif italic text-3xl md:text-5xl" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>&amp;</span>
          <span className="sp-char font-serif text-6xl md:text-8xl lg:text-9xl" style={{ color: P.cream, textShadow: `0 2px 4px rgba(0,0,0,0.5), 0 0 40px ${P.gold}15` }}>{COUPLE.partner2.charAt(0)}</span>
        </div>

        <p className="sp-sub mt-6 text-[10px] uppercase tracking-[0.35em] font-body" style={{ color: `${P.cream}80` }}>
          April 2026 · Udaipur, Rajasthan
        </p>
        <p className="sp-tagline mt-2 font-serif italic text-xs md:text-sm" style={{ color: `${P.gold}70` }}>
          A Sacred Celebration
        </p>

        {/* Wax seal — "Begin the Royal Journey" — inside flow */}
        <div className="mt-10 flex flex-col items-center gap-4 cursor-pointer">
          <div className="sp-seal relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center opacity-0" style={{ background: `radial-gradient(circle at 40% 35%, ${P.maroon}, #5a1010, #3d0808)`, boxShadow: `0 4px 20px rgba(139,26,26,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(139,26,26,0.3)` }}>
            <div className="absolute inset-1 rounded-full" style={{ border: `1px solid rgba(212,175,55,0.2)` }} />
            <span className="font-serif text-sm md:text-base font-bold tracking-wider" style={{ color: `${P.gold}cc`, textShadow: `0 1px 2px rgba(0,0,0,0.5)` }}>
              T&amp;S
            </span>
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full" style={{ backgroundColor: `${P.gold}30` }} />
          </div>
          <span className="sp-seal-label text-[9px] uppercase tracking-[0.35em] font-body opacity-0" style={{ color: `${P.cream}70` }}>
            Begin the Royal Journey
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Hero — Royal Heritage Cinematic                                */
/* ─────────────────────────────────────────────────────────────── */

function Hero({ loaded }: { loaded: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const archOuterRef = useRef<SVGPathElement>(null);
  const archInnerRef = useRef<SVGPathElement>(null);

  const weddingDate = new Date(COUPLE.weddingDate);
  const formattedDate = weddingDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  useGSAP(() => {
    if (!loaded) return;

    [archOuterRef, archInnerRef].forEach((r) => {
      if (r.current) {
        const len = r.current.getTotalLength();
        gsap.set(r.current, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(".hero-content", { autoAlpha: 1, duration: 0 });

    tl.fromTo(".hf-h", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0);
    tl.fromTo(".hf-v", { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: "power2.inOut" }, 0);
    tl.fromTo(".hf-c", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(2.5)" }, 0.7);

    if (archOuterRef.current) tl.to(archOuterRef.current, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.3);
    if (archInnerRef.current) tl.to(archInnerRef.current, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0.5);
    tl.fromTo(".hero-arch-dot", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, 1.8);

    tl.fromTo(".hero-sanskrit", { opacity: 0, y: -15, letterSpacing: "0.8em" }, { opacity: 1, y: 0, letterSpacing: "0.5em", duration: 1, ease: "power2.out" }, 1.0);

    tl.fromTo(".hero-orn", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" }, 1.2);

    tl.fromTo(".hero-char", { opacity: 0, y: 80, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.03, ease: "power3.out" }, 1.4);

    tl.fromTo(".hero-amp", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" }, 1.8);

    tl.fromTo(".hero-name-glow", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 2.0);

    tl.fromTo(".hero-shimmer", { xPercent: -120 }, { xPercent: 220, duration: 1.6, ease: "power2.inOut" }, 2.2);

    tl.fromTo(".hero-fade", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 2.4);

    tl.fromTo(".hero-scroll-ind", { opacity: 0 }, { opacity: 1, duration: 1 }, 3.0);

    gsap.to(".hero-content", {
      y: 60, opacity: 0, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "70% top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".hero-frame", {
      opacity: 0, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "60% top", end: "bottom top", scrub: 1 },
    });
  }, { scope: ref, dependencies: [loaded] });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="hero-bg-layer absolute inset-[-10%]">
        <Image src="https://images.unsplash.com/photo-1759222198113-d0e2b862a3b5?w=1920&q=80" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,10,10,0.5), transparent 35%, rgba(26,10,10,0.85))" }} />
      </div>

      {/* Atmospheric layers */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139,26,26,0.08), transparent 70%)" }} />
      <div className="absolute inset-0 z-1 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 30%, rgba(26,10,10,0.6) 100%)" }} />
      <Bokeh />
      <DreamParticles count={18} />

      {/* ── Royal Decorative Frame ── */}
      <div className="hero-frame absolute inset-4 md:inset-10 lg:inset-14 pointer-events-none z-10" aria-hidden="true">
        <div className="hf-h absolute top-0 left-8 right-8 h-px origin-center" style={{ backgroundColor: `${P.gold}18` }} />
        <div className="hf-h absolute bottom-0 left-8 right-8 h-px origin-center" style={{ backgroundColor: `${P.gold}18` }} />
        <div className="hf-v absolute left-0 top-8 bottom-8 w-px origin-center" style={{ backgroundColor: `${P.gold}18` }} />
        <div className="hf-v absolute right-0 top-8 bottom-8 w-px origin-center" style={{ backgroundColor: `${P.gold}18` }} />
        <div className="hf-c absolute -top-1 -left-1 w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}40` }} />
        <div className="hf-c absolute -top-1 -right-1 w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}40` }} />
        <div className="hf-c absolute -bottom-1 -left-1 w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}40` }} />
        <div className="hf-c absolute -bottom-1 -right-1 w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}40` }} />
        <div className="hf-c absolute top-1/2 -left-0.5 -translate-y-1/2 w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}25` }} />
        <div className="hf-c absolute top-1/2 -right-0.5 -translate-y-1/2 w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}25` }} />
        <div className="hf-c absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}25` }} />
        <div className="hf-c absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}25` }} />
      </div>

      {/* ── Content ── */}
      <div className="hero-content relative z-10 w-full text-center px-4 sm:px-6 max-w-5xl mx-auto invisible">
        {/* Devanagari cultural text */}
        <p className="hero-sanskrit text-xs md:text-sm mb-4 md:mb-6 mt-10 sm:mt-14 md:mt-20" style={{ color: `${P.gold}80` }}>
          शुभ विवाह
        </p>

        {/* Mughal arch framing names */}
        <div className="relative mx-auto w-full" style={{ maxWidth: "34rem" }}>
          <svg viewBox="0 0 400 420" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] w-[92%] md:w-[88%] h-auto pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path ref={archOuterRef} d="M20 420 V155 Q20 15 200 5 Q380 15 380 155 V420" stroke={`${P.gold}22`} strokeWidth="0.8" />
            <path ref={archInnerRef} d="M38 420 V162 Q38 32 200 20 Q362 32 362 162 V420" stroke={`${P.gold}10`} strokeWidth="0.5" />
            <circle className="hero-arch-dot" cx="200" cy="48" r="3.5" fill={`${P.gold}0d`} stroke={`${P.gold}18`} strokeWidth="0.5" />
            <line className="hero-arch-dot" x1="160" y1="48" x2="188" y2="48" stroke={`${P.gold}0d`} strokeWidth="0.4" />
            <line className="hero-arch-dot" x1="212" y1="48" x2="240" y2="48" stroke={`${P.gold}0d`} strokeWidth="0.4" />
          </svg>

          {/* Radial glow behind names */}
          <div className="hero-name-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 45%, rgba(212,175,55,0.07), transparent 60%)` }} />

          {/* Ornamental line */}
          <div className="hero-orn flex items-center justify-center gap-3 mb-5 md:mb-8 origin-center relative z-10">
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.gold}26 50%, ${P.gold}4d)` }} />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${P.gold}4d` }} />
              <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}59` }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${P.gold}4d` }} />
            </div>
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to left, transparent, ${P.gold}26 50%, ${P.gold}4d)` }} />
          </div>

          {/* Names with golden shimmer */}
          <div className="relative">
            <h1 className="relative font-serif tracking-tight leading-[1] pb-2" style={{ perspective: "1200px" }}>
              <span className="block text-[clamp(3rem,10vw,9rem)]">
                {COUPLE.partner1.split("").map((c, i) => (
                  <span key={`p1-${i}`} className="hero-char inline-block" style={{ color: P.cream, textShadow: `0 0 80px rgba(139,26,26,0.2), 0 0 40px rgba(212,175,55,0.08), 0 2px 40px rgba(0,0,0,0.4)`, transformStyle: "preserve-3d" }}>{c}</span>
                ))}
              </span>
              <span className="hero-amp block font-serif italic text-[clamp(2rem,5vw,4.5rem)] my-1.5 md:my-3" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>&amp;</span>
              <span className="block text-[clamp(3rem,10vw,9rem)]">
                {COUPLE.partner2.split("").map((c, i) => (
                  <span key={`p2-${i}`} className="hero-char inline-block" style={{ color: P.cream, textShadow: `0 0 80px rgba(139,26,26,0.2), 0 0 40px rgba(212,175,55,0.08), 0 2px 40px rgba(0,0,0,0.4)`, transformStyle: "preserve-3d" }}>{c}</span>
                ))}
              </span>
            </h1>
            <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none">
              <div className="hero-shimmer absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.12), rgba(212,175,55,0.04), transparent)" }} />
            </div>
          </div>
        </div>

        {/* Jaimala animation */}
        <div className="hero-fade mt-1 md:mt-2">
          <JaimalaAnimation />
        </div>

        {/* Poetic subtitle */}
        <div className="hero-fade mt-2 text-center">
          <p className="font-serif italic text-base md:text-lg leading-relaxed tracking-wide" style={{ color: `${P.cream}bf` }}>
            Beneath ancient arches of Udaipur,
          </p>
          <p className="font-serif italic text-base md:text-lg leading-relaxed tracking-wide" style={{ color: `${P.cream}99` }}>
            two hearts unite in sacred promise.
          </p>
        </div>

        {/* Divider */}
        <div className="hero-fade flex flex-col items-center gap-1 my-5">
          <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to right, transparent, ${P.gold}40, transparent)` }} />
          <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.maroon}40, transparent)` }} />
        </div>

        {/* Date + venue — brass plate style */}
        <div className="hero-fade space-y-2 animate-brass-pulse rounded px-8 py-4" style={{ border: `1px solid ${P.gold}18`, background: `linear-gradient(135deg, ${P.gold}06, transparent, ${P.gold}04)` }}>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}e6` }}>{formattedDate}</p>
          <p className="text-xs uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}99` }}>Fairmont Udaipur · {COUPLE.location}</p>
        </div>

        {/* CTAs — parchment & envelope styled */}
        <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/itinerary" className="group relative px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-body transition-all duration-700 overflow-hidden" style={{ color: `${P.gold}e6`, border: `1px solid ${P.gold}30`, background: `linear-gradient(to bottom, ${P.gold}08, transparent)`, boxShadow: `inset 0 1px 0 ${P.gold}12` }}>
            <span className="relative z-10 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 1h8v10H2z" stroke={`${P.gold}80`} strokeWidth="0.8" /><path d="M4 4h4M4 6h3" stroke={`${P.gold}60`} strokeWidth="0.5" /></svg>
              View Itinerary
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: `${P.gold}0a` }} />
          </Link>
          <Link href="/wardrobe" className="group relative px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-body font-medium transition-all duration-700 overflow-hidden" style={{ color: P.bg, background: `linear-gradient(135deg, ${P.gold}, #c9a030, ${P.gold})`, boxShadow: `0 8px 24px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.15)` }}>
            <span className="relative z-10 flex items-center gap-2">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 1h12v8H1z" stroke={P.bg} strokeWidth="0.8" /><path d="M1 1l6 4 6-4" stroke={P.bg} strokeWidth="0.6" /></svg>
              Check out the Wardrobe
            </span>
          </Link>
        </div>

        {/* Countdown */}
        <div className="hero-fade mt-8">
          <CountdownTimer targetDate={COUPLE.weddingDate} />
        </div>
      </div>

      {/* Scroll indicator — Diya flame */}
      <div className="hero-scroll-ind absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0">
        <span className="text-[9px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.cream}50` }}>Discover</span>
        <DiyaFlame size="sm" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Royal Prologue — Jaipur Heritage Narrative                     */
/* ─────────────────────────────────────────────────────────────── */

function RoyalPrologue() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".rp-fade", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".rp-arch", { opacity: 0, scale: 0.85 }, {
      opacity: 1, scale: 1, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1696861679643-4f21bfba8fc3?w=1920&q=80" alt="" fill className="object-cover opacity-[0.05]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}, ${P.bg}e6, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.04), transparent 70%)` }} />

      {/* Sandstone texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: `repeating-linear-gradient(0deg, ${P.gold}08 0px, transparent 1px, transparent 3px)` }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <MandalaOrnament className="rp-fade mb-10" />
        <span className="rp-fade block text-[10px] uppercase tracking-[0.4em] font-body mb-10" style={{ color: `${P.gold}80` }}>
          The Sacred Setting
        </span>

        {/* Jharokha arch framing city name */}
        <div className="rp-arch w-36 h-52 md:w-44 md:h-60 mx-auto mb-10">
          <JharokhaArch>
            <p className="font-serif italic text-xl md:text-2xl" style={{ color: `${P.gold}50` }}>उदयपुर</p>
          </JharokhaArch>
        </div>

        <h2 className="rp-fade font-serif text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight" style={{ color: `${P.cream}e6` }}>
          In the Heart of the City of Lakes
        </h2>
        <p className="rp-fade font-serif italic text-sm md:text-base mb-8" style={{ color: `${P.gold}60` }}>
          झीलों की नगरी — The Venice of the East
        </p>

        <p className="rp-fade font-body text-sm md:text-base leading-[2] max-w-2xl mx-auto mb-8" style={{ color: `${P.cream}99` }}>
          Where marble palaces rise from shimmering lakes and the Aravalli hills stand as
          silent witnesses to centuries of devotion. Where Maharanas once held court beneath
          mirrored ceilings, their kingdoms fragrant with jasmine and rose. In this city where
          every jharokha frames a story of honour and romance, two families chose to write a new verse.
        </p>

        <p className="rp-fade font-body text-sm md:text-base leading-[2] max-w-2xl mx-auto mb-8" style={{ color: `${P.cream}80` }}>
          Udaipur — founded by Maharana Udai Singh II in 1559, nestled between five lakes
          and ancient hills. A city that understands ceremony, that knows how to hold sacred
          space for moments that transcend the ordinary. A city worthy of a Mewari celebration.
        </p>

        <p className="rp-fade font-serif italic text-base md:text-lg max-w-xl mx-auto" style={{ color: `${P.gold}80` }}>
          This celebration unfolds across three days and six chapters — each a distinct rasa,
          a different mood, a new verse in a love story written against the grandeur of Rajasthan.
        </p>

        <MandalaOrnament className="rp-fade mt-14" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Story Quote                                                    */
/* ─────────────────────────────────────────────────────────────── */

function StoryQuote() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".sq-word", { opacity: 0, y: 25 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".sq-fade", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  const words = COUPLE.tagline.split(" ");

  return (
    <section ref={ref} className="relative py-10 md:py-14 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1769183345247-fba7c42c991b?w=1920&q=80" alt="" fill className="object-cover opacity-[0.06]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}, ${P.bg}cc, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.05), transparent 70%)` }} />

      {/* Subtle mehendi pattern background */}
      <div className="sq-mehendi absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 400 400" className="w-[60vw] max-w-xl h-auto" fill="none">
          <circle cx="200" cy="200" r="180" stroke={P.gold} strokeWidth="0.5" />
          <circle cx="200" cy="200" r="150" stroke={P.gold} strokeWidth="0.3" strokeDasharray="8 4" />
          <circle cx="200" cy="200" r="120" stroke={P.gold} strokeWidth="0.4" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 120;
            const y1 = 200 + Math.sin(angle) * 120;
            const x2 = 200 + Math.cos(angle) * 180;
            const y2 = 200 + Math.sin(angle) * 180;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P.gold} strokeWidth="0.3" />;
          })}
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={`mp-${i}`} cx="200" cy="30" rx="15" ry="8" transform={`rotate(${i * 45}, 200, 200)`} stroke={P.gold} strokeWidth="0.4" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="sq-fade mb-14">
          <Flourish className="mb-6" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.gold}99` }}>Their Story · प्रेम कथा</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]" style={{ color: `${P.cream}e6` }}>
          &ldquo;{words.map((word, i) => (
            <span key={i} className="sq-word inline-block mr-[0.3em]">{word}</span>
          ))}&rdquo;
        </h2>

        <div className="sq-fade flex flex-col items-center gap-1.5 my-14">
          <div className="h-px w-20 md:w-28" style={{ background: `linear-gradient(to right, transparent, ${P.gold}33, transparent)` }} />
          <div className="h-px w-12 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.maroon}40, transparent)` }} />
        </div>

        <p className="sq-fade font-body text-sm md:text-base leading-loose max-w-2xl mx-auto mb-10" style={{ color: `${P.cream}99` }}>
          She grew up in Goregaon, he in Pune — both foodies, both dreamers. They first
          met in Mumbai before heading to London for their masters. Friendship turned to
          love, and by December 2023 both families knew. Now, against the backdrop of
          Udaipur&apos;s timeless beauty, their story finds its grandest verse: a three-day
          royal celebration woven from six unforgettable chapters.
        </p>

        {/* Parents' blessing section */}
        <div className="sq-fade flex flex-col items-center gap-6 py-8 px-6 mx-auto max-w-lg rounded" style={{ border: `1px solid ${P.gold}12`, background: `linear-gradient(135deg, ${P.gold}04, transparent, ${P.gold}03)` }}>
          <p className="text-[10px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.gold}60` }}>
            With the Blessings of Our Families
          </p>
          <p className="font-serif italic text-xs" style={{ color: `${P.gold}40` }}>
            सर्वे भवन्तु सुखिनः
          </p>
          <div className="flex items-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="font-serif text-sm md:text-base" style={{ color: `${P.cream}cc` }}>The Goel Family</p>
              <p className="text-[9px] uppercase tracking-[0.2em] font-body mt-1" style={{ color: `${P.cream}50` }}>Groom&apos;s Family</p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: `${P.gold}20` }} />
            <div className="text-center">
              <p className="font-serif text-sm md:text-base" style={{ color: `${P.cream}cc` }}>The Harlalka Family</p>
              <p className="text-[9px] uppercase tracking-[0.2em] font-body mt-1" style={{ color: `${P.cream}50` }}>Bride&apos;s Family</p>
            </div>
          </div>
        </div>

        <div className="sq-fade"><Flourish className="mt-14" /></div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Venue Showcase                                                 */
/* ─────────────────────────────────────────────────────────────── */

function VenueShowcase() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".vs-fade", { opacity: 0, y: 25 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".vs-img", { scale: 1.15 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="vs-img absolute inset-[-10%]">
        <Image src="https://images.unsplash.com/photo-1718797054890-e58742729f2d?w=1920&q=80" alt="Fairmont Udaipur" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}99, transparent 30%, transparent 60%, ${P.bg}cc 85%, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04), transparent 60%)` }} />

      {/* Candlelight vignette on corners */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 0%, rgba(255,180,50,0.04), transparent 70%)` }} />
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 0%, rgba(255,180,50,0.04), transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 100%, rgba(255,180,50,0.04), transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, rgba(255,180,50,0.04), transparent 70%)` }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <Flourish className="vs-fade mb-8" />
        <span className="vs-fade block text-[10px] uppercase tracking-[0.4em] font-body mb-6" style={{ color: `${P.gold}99` }}>
          The Palace · राजमहल
        </span>
        <h2 className="vs-fade font-serif text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight" style={{ color: P.cream, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          Fairmont Udaipur
        </h2>
        <p className="vs-fade font-serif italic text-lg md:text-xl mb-2" style={{ color: `${P.gold}cc` }}>
          Where Royalty Meets Celebration
        </p>
        <p className="vs-fade font-body text-xs md:text-sm mt-6 max-w-xl mx-auto leading-loose" style={{ color: `${P.cream}99` }}>
          Overlooking the serene waters of Lake Pichola, the palace grounds become the
          sacred stage for six unforgettable chapters. From sunlit courtyards draped in jasmine
          to gilded durbar halls lit by a thousand diyas — each space transforms to honour
          the story of two families becoming one.
        </p>

        {/* Palace spaces with diya dots */}
        <div className="vs-fade flex items-center justify-center gap-6 md:gap-8 mt-10">
          {["The Grand Lawn", "The Haveli Courtyard", "The Durbar Hall", "The Grand Ballroom"].map((space, i) => (
            <span key={i} className="hidden md:flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] font-body" style={{ color: `${P.cream}40` }}>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${P.gold}40` }} />
              {space}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Chapter story row — image + content, alternating left/right     */
/* ─────────────────────────────────────────────────────────────── */

function ChapterStoryRow({
  event,
  contentOn,
}: {
  event: (typeof EVENTS)[0];
  contentOn: "left" | "right";
}) {
  const { palette } = event;
  const isContentRight = contentOn === "right";

  return (
    <Link
      href={`/chapter/${event.slug}`}
      className="chapter-story-row group block overflow-hidden rounded-lg transition-all duration-500 hover:opacity-95"
      style={{
        border: `1px solid ${P.gold}0a`,
        backgroundColor: `${P.muted}15`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[280px] md:min-h-[320px]">
        {/* Image half — order-2 on md when content is left (so image appears right) */}
        <div
          className={`relative h-56 md:h-full md:min-h-[320px] overflow-hidden ${!isContentRight ? "md:order-2" : ""}`}
        >
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${palette.primary}25 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.45) 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
          <div className="absolute top-4 right-4 z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] font-body" style={{ color: "rgba(255,255,255,0.7)" }}>
              {String(event.chapterNumber).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content half — order-1 on md when content is left */}
        <div
          className={`flex flex-col justify-center p-6 md:p-8 lg:p-10 text-left ${!isContentRight ? "md:order-1" : ""}`}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-body mb-3" style={{ color: `${P.cream}50` }}>
            {event.date} · {event.time}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2 leading-tight" style={{ color: `${P.cream}dd` }}>
            {event.title}
          </h3>
          <p className="font-serif text-sm md:text-base italic mb-4" style={{ color: `${palette.accent}cc` }}>
            {event.subtitle}
          </p>
          <p className="text-[13px] md:text-sm font-body line-clamp-2 md:line-clamp-3 leading-relaxed mb-5" style={{ color: `${P.cream}60` }}>
            {event.tagline}
          </p>
          <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${P.gold}12` }}>
            <span className="text-[10px] uppercase tracking-[0.15em] font-body" style={{ color: `${P.cream}40` }}>
              {event.location}
            </span>
            <span className="text-sm group-hover:translate-x-1 transition-transform duration-300" style={{ color: P.gold }}>
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  The Chapters — alternating story rows with day groupings       */
/* ─────────────────────────────────────────────────────────────── */

function ChapterJourneySection() {
  const ref = useRef<HTMLElement>(null);
  let rowIndex = 0;

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".chapter-day-label"), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
    });
    gsap.fromTo(el.querySelectorAll(".chapter-story-row"), { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute top-0 left-0 right-0 z-10 pt-8 pb-6 text-center pointer-events-none" style={{ background: `linear-gradient(to bottom, ${P.bg}, transparent)` }}>
        <Flourish className="mb-3" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.gold}99` }}>
          The Chapters
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 space-y-10 md:space-y-14">
        {DAYS.map((d) => (
          <Fragment key={`day-${d.day}`}>
            <div className="chapter-day-label flex flex-col items-center text-center">
              <p className="font-serif text-2xl md:text-3xl mb-1" style={{ color: P.cream }}>
                {d.day === 0 ? "Pre Party" : `Day ${d.day}`}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] font-body mb-2" style={{ color: `${P.gold}66` }}>
                {d.date}
              </p>
              <p className="font-serif italic text-sm md:text-base" style={{ color: `${P.cream}55` }}>
                {d.mood}
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {d.events.map((event) => {
                const contentOn = rowIndex++ % 2 === 0 ? "right" : "left";
                return (
                  <ChapterStoryRow key={event.slug} event={event} contentOn={contentOn} />
                );
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Royal Timeline                                                 */
/* ─────────────────────────────────────────────────────────────── */

function RoyalTimeline() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".tl-item", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".tl-line", { scaleY: 0 }, {
      scaleY: 1, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16" style={{ backgroundColor: P.bg, borderTop: `1px solid ${P.cream}08` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.03), transparent 70%)` }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 tl-item">
          <MandalaOrnament className="mb-6" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-body block mb-6" style={{ color: `${P.gold}59` }}>
            The Royal Itinerary
          </span>
          <h2 className="font-serif text-3xl md:text-5xl" style={{ color: `${P.cream}cc` }}>
            Udaipur
          </h2>
          <p className="font-body text-xs md:text-sm mt-4 max-w-md mx-auto leading-relaxed" style={{ color: `${P.cream}40` }}>
            The main events unfold in Udaipur — chapters crafted to honour heritage, love, and the joy of togetherness.
          </p>
        </div>

        <div className="relative">
          {/* Glowing diya line */}
          <div className="tl-line absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top" style={{ background: `linear-gradient(to bottom, transparent, ${P.gold}30, ${P.gold}35, ${P.gold}30, transparent)`, boxShadow: `0 0 8px ${P.gold}15, 0 0 20px ${P.gold}08` }} />

          {DAYS.map((d, di) => (
            <div key={di} className="tl-item relative mb-14 last:mb-0">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${P.gold}12)` }} />
                <div className="mx-6 text-center">
                  <div className="w-3 h-3 rotate-45 mx-auto mb-3" style={{ border: `1px solid ${P.gold}35`, backgroundColor: `${P.gold}0a` }} />
                  <p className="font-serif text-xl md:text-2xl" style={{ color: `${P.cream}cc` }}>{d.label}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] font-body mt-1" style={{ color: `${P.gold}4d` }}>{d.date}, 2026</p>
                  <p className="font-serif italic text-xs mt-1" style={{ color: `${P.cream}33` }}>{d.mood}</p>
                </div>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${P.gold}12)` }} />
              </div>

              <div className={`grid gap-4 max-w-4xl mx-auto ${d.events.length === 1 ? "grid-cols-1 max-w-sm" : d.events.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
                {d.events.map((event) => {
                  const isLight = event.slug === "courtyard-edit" || event.slug === "world-of-our-own";
                  const accent = isLight ? "#d4a060" : event.palette.accent;
                  return (
                    <Link key={event.slug} href={`/chapter/${event.slug}`} className="group block p-5 rounded-sm border transition-all duration-500" style={{ borderColor: `${accent}20`, backgroundColor: `${event.palette.background}15`, background: `linear-gradient(135deg, ${event.palette.background}15, ${accent}05)`, boxShadow: `0 2px 12px ${accent}08, inset 0 1px 0 ${accent}10` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-body" style={{ color: accent }}>Ch. {String(event.chapterNumber).padStart(2, "0")}</span>
                        <div className="h-px flex-1" style={{ backgroundColor: `${accent}12` }} />
                        <span className="text-[8px] font-body" style={{ color: `${P.cream}33` }}>{event.time}</span>
                      </div>
                      <h4 className="font-serif text-base md:text-lg mb-1 group-hover:translate-x-1 transition-transform duration-500" style={{ color: `${P.cream}cc` }}>{event.title}</h4>
                      <p className="font-serif italic text-xs mb-2" style={{ color: `${accent}80` }}>{event.subtitle}</p>
                      <p className="text-[9px] font-body leading-relaxed mb-2 line-clamp-2" style={{ color: `${P.cream}33` }}>{event.description.slice(0, 120)}…</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] uppercase tracking-[0.15em] font-body" style={{ color: `${P.cream}25` }}>{event.location}</span>
                        <span className="text-[8px] font-body opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: accent }}>→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Final CTA                                                      */
/* ─────────────────────────────────────────────────────────────── */

function FinalBlessing() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".bl-el", { opacity: 0, y: 35 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-10 md:py-14 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,26,26,0.06), transparent 70%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 30% at 50% 60%, rgba(212,175,55,0.04), transparent 60%)` }} />

      {/* Diya lights on sides */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 opacity-60">
        <DiyaFlame size="sm" />
        <div className="w-px h-20" style={{ background: `linear-gradient(to bottom, ${P.gold}20, transparent)` }} />
        <DiyaFlame size="sm" />
      </div>
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 opacity-60">
        <DiyaFlame size="sm" />
        <div className="w-px h-20" style={{ background: `linear-gradient(to bottom, ${P.gold}20, transparent)` }} />
        <DiyaFlame size="sm" />
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="bl-el"><MandalaOrnament className="mb-12" /></div>
        <p className="bl-el text-[10px] uppercase tracking-[0.4em] font-body mb-4" style={{ color: `${P.gold}70` }}>
          The Sacred Invitation · निमंत्रण
        </p>

        <div className="bl-el w-24 h-36 mx-auto mb-8">
          <JharokhaArch />
        </div>

        <h2 className="bl-el font-serif italic text-4xl md:text-6xl lg:text-7xl mb-4 leading-[1.1]" style={{ color: `${P.cream}e6` }}>
          Be Part of Our
        </h2>
        <h2 className="bl-el font-serif italic text-4xl md:text-6xl lg:text-7xl mb-8 pb-1 leading-[1.2]" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Sacred Beginning
        </h2>

        <p className="bl-el font-body text-sm md:text-base max-w-lg mx-auto mb-4 leading-loose" style={{ color: `${P.cream}99` }}>
          Kindly grace us with your presence and bless our union.
          Three days in the City of Lakes — six chapters of celebration,
          from intimate courtyards to gilded ceremonies, from sacred
          rituals at dawn to midnight revelry.
        </p>
        <p className="bl-el font-serif italic text-sm max-w-md mx-auto mb-4" style={{ color: `${P.gold}80` }}>
          Every moment means more with you there.
        </p>
        <p className="bl-el font-serif text-xs mb-14" style={{ color: `${P.gold}50` }}>
          अतिथि देवो भव
        </p>

        {/* RSVP as envelope */}
        <div className="bl-el flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/rsvp" className="group relative px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-body font-medium transition-all duration-700 overflow-hidden" style={{ color: P.bg, background: `linear-gradient(135deg, ${P.gold}, #c9a030, ${P.gold})`, boxShadow: `0 12px 32px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.15)` }}>
            <span className="relative z-10 flex items-center gap-2">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 1h12v8H1z" stroke={P.bg} strokeWidth="0.8" /><path d="M1 1l6 4 6-4" stroke={P.bg} strokeWidth="0.6" /></svg>
              RSVP — Accept with Joy
            </span>
          </Link>
          <Link href="/itinerary" className="px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-body transition-all duration-700" style={{ color: `${P.cream}80`, border: `1px solid ${P.cream}18`, background: `linear-gradient(to bottom, ${P.gold}06, transparent)` }}>
            Full Itinerary
          </Link>
        </div>

        <div className="bl-el"><Flourish className="mt-16" /></div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Assembled Experience                                           */
/* ─────────────────────────────────────────────────────────────── */

export default function LandingExperience() {
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("prelude-seen") === "1";
    }
    return false;
  });

  const handlePreludeComplete = useCallback(() => {
    sessionStorage.setItem("prelude-seen", "1");
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <SacredPrelude onComplete={handlePreludeComplete} />}
      <Hero loaded={loaded} />
      <RitualTransition variant="lotus" />
      <RoyalPrologue />
      <RitualTransition variant="elephant" />
      <StoryQuote />
      <RitualTransition variant="mandala" />
      <VenueShowcase />
      <RitualTransition variant="silk" />
      <ChapterJourneySection />
      <RitualTransition variant="mandala" />
      <RoyalTimeline />
      <RitualTransition variant="lotus" />
      <FinalBlessing />
    </>
  );
}
