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

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function rand(a: number, b: number = 0): number {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const DAYS = [
  { day: 1, label: "Day One", date: "19th April", mood: "The Arrival", events: [EVENTS[0]] },
  { day: 2, label: "Day Two", date: "20th April", mood: "The Celebration", events: [EVENTS[1], EVENTS[2]] },
  { day: 3, label: "Day Three", date: "21st April", mood: "The Ceremony & Finale", events: [EVENTS[3], EVENTS[4], EVENTS[5]] },
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

/* ─────────────────────────────────────────────────────────────── */
/*  Section Transitions — animated connectors between sections    */
/* ─────────────────────────────────────────────────────────────── */

function SectionTransition({ variant = "arch", label }: { variant?: "arch" | "mandala" | "lotus" | "scroll"; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".st-line"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" } }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".st-fade"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" } }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".st-scale"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)",
        scrollTrigger: { trigger: ref.current, start: "top 78%", toggleActions: "play none none none" } }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="relative py-8 md:py-12 overflow-hidden" style={{ backgroundColor: P.bg }} aria-hidden="true">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 40% 50% at 50% 50%, rgba(139,26,26,0.04), transparent 70%)` }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Top line */}
        <div className="st-line h-px w-16 md:w-28 origin-center mb-6" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25, transparent)` }} />

        {variant === "arch" && (
          <div className="st-fade relative w-20 h-28 md:w-24 md:h-32 mb-4">
            <svg viewBox="0 0 200 280" className="w-full h-full opacity-[0.08]" fill="none">
              <path d="M20 280 V120 Q20 20 100 8 Q180 20 180 120 V280" stroke={P.gold} strokeWidth="0.8" />
              <path d="M35 280 V125 Q35 35 100 22 Q165 35 165 125 V280" stroke={P.gold} strokeWidth="0.4" />
            </svg>
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2">
              <div className="st-scale w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${P.gold}30` }} />
            </div>
          </div>
        )}

        {variant === "mandala" && (
          <div className="st-fade relative mb-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <div className="st-scale absolute inset-0 rotate-45 border" style={{ borderColor: `${P.gold}12` }} />
              <div className="st-scale absolute inset-2.5 rotate-45 border" style={{ borderColor: `${P.gold}08` }} />
              <div className="st-scale absolute inset-5 rotate-0 border rounded-full" style={{ borderColor: `${P.gold}10` }} />
              <div className="st-scale w-2 h-2 rounded-full" style={{ backgroundColor: `${P.gold}30` }} />
            </div>
          </div>
        )}

        {variant === "lotus" && (
          <div className="st-fade mb-4">
            <svg viewBox="0 0 100 50" className="w-16 md:w-20 h-auto opacity-[0.12]" fill="none">
              <path d="M50 45 Q35 30 30 15 Q35 5 50 2 Q65 5 70 15 Q65 30 50 45Z" stroke={P.gold} strokeWidth="0.6" />
              <path d="M50 45 Q20 35 15 20 Q25 10 50 5" stroke={P.gold} strokeWidth="0.4" />
              <path d="M50 45 Q80 35 85 20 Q75 10 50 5" stroke={P.gold} strokeWidth="0.4" />
              <circle cx="50" cy="20" r="2" fill={`${P.gold}15`} />
            </svg>
          </div>
        )}

        {variant === "scroll" && (
          <div className="st-fade flex items-center gap-4 mb-4">
            <div className="st-scale flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full border" style={{ borderColor: `${P.gold}15` }} />
              <div className="w-px h-6" style={{ backgroundColor: `${P.gold}10` }} />
            </div>
            <div className="st-scale w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}20` }} />
            <div className="st-scale flex flex-col items-center gap-1">
              <div className="w-px h-6" style={{ backgroundColor: `${P.gold}10` }} />
              <div className="w-3 h-3 rounded-full border" style={{ borderColor: `${P.gold}15` }} />
            </div>
          </div>
        )}

        {label && (
          <p className="st-fade text-[9px] uppercase tracking-[0.4em] font-body mt-2 mb-4" style={{ color: `${P.gold}35` }}>
            {label}
          </p>
        )}

        {/* Decorative dots */}
        <div className="flex items-center gap-3 mb-6">
          <div className="st-scale w-0.5 h-0.5 rounded-full" style={{ backgroundColor: `${P.gold}25` }} />
          <div className="st-scale w-1 h-1 rotate-45" style={{ border: `1px solid ${P.gold}20` }} />
          <div className="st-scale w-0.5 h-0.5 rounded-full" style={{ backgroundColor: `${P.gold}25` }} />
        </div>

        {/* Bottom line */}
        <div className="st-line h-px w-16 md:w-28 origin-center" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25, transparent)` }} />
      </div>
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
        {!reduced && Array.from({ length: 7 }, (_, i) => (
          <motion.ellipse key={`jp-${i}`}
            cx={155 + rand(i, 80) * 90} cy={20 + rand(i, 81) * 30}
            rx="2.2" ry="3.5"
            fill={i % 3 === 0 ? P.maroon : i % 3 === 1 ? P.gold : P.bronze}
            initial={{ opacity: 0 }}
            animate={{ y: [0, 160 + rand(i, 82) * 80], x: [-8 + rand(i, 83) * 16, 8 - rand(i, 84) * 16], opacity: [0, 0.35, 0], rotate: [0, 200 + rand(i, 85) * 160] }}
            transition={{ duration: 5 + rand(i, 86) * 3, delay: 3 + rand(i, 87) * 2.5, repeat: Infinity, ease: "easeOut" }}
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
    () => Array.from({ length: 14 }, (_, i) => ({
      id: i, x: 5 + rand(i, 1) * 90, y: 5 + rand(i, 2) * 90,
      size: 60 + rand(i, 3) * 160, delay: rand(i, 4) * 6, dur: 12 + rand(i, 5) * 14,
      color: i % 3 === 0
        ? `rgba(139,26,26,${(0.03 + rand(i, 6) * 0.05).toFixed(3)})`
        : `rgba(212,175,55,${(0.02 + rand(i, 6) * 0.04).toFixed(3)})`,
    })), [],
  );
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {orbs.map((o) => (
        <motion.div key={o.id} className="absolute rounded-full"
          style={{ left: `${o.x}%`, top: `${o.y}%`, width: o.size, height: o.size, background: `radial-gradient(circle, ${o.color}, transparent 70%)` }}
          animate={{ y: [0, -25, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function DreamParticles({ count }: { count: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => {
      const isPetal = i % 5 === 0;
      const s = i + 100;
      return {
        id: i, isPetal, x: rand(s, 1) * 100, y: 50 + rand(s, 2) * 50,
        size: isPetal ? 4 + rand(s, 3) * 5 : 1 + rand(s, 3) * 3,
        delay: rand(s, 4) * 10, dur: isPetal ? 10 + rand(s, 5) * 12 : 4 + rand(s, 5) * 8,
        drift: -25 + rand(s, 6) * 50,
        opacity: isPetal ? 0.12 + rand(s, 7) * 0.18 : 0.2 + rand(s, 7) * 0.5,
        rotation: rand(s, 8) * 360, yTravel: isPetal ? 120 + rand(s, 9) * 200 : 200 + rand(s, 9) * 300,
      };
    }), [count],
  );
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
      {particles.map((p) =>
        p.isPetal ? (
          <motion.div key={p.id} className="absolute"
            style={{ left: `${p.x}%`, bottom: `${100 - p.y}%`, width: p.size, height: p.size * 1.4, borderRadius: "50% 0 50% 50%", background: `linear-gradient(135deg, rgba(160,40,40,${p.opacity}), rgba(100,18,18,${p.opacity * 0.4}))` }}
            animate={{ y: [0, -p.yTravel], x: [0, p.drift], rotate: [p.rotation, p.rotation + 200], opacity: [0, p.opacity, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ) : (
          <motion.div key={p.id} className="absolute rounded-full"
            style={{ left: `${p.x}%`, bottom: `${100 - p.y}%`, width: p.size, height: p.size, background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}), transparent 70%)`, boxShadow: `0 0 ${p.size * 3}px rgba(212,175,55,${p.opacity * 0.5})` }}
            animate={{ y: [0, -p.yTravel], x: [0, p.drift], opacity: [0, p.opacity, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ),
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Cinematic Loader                                               */
/* ─────────────────────────────────────────────────────────────── */

function CinematicLoader({ onComplete }: { onComplete: () => void }) {
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
    } catch { /* no audio file — graceful */ }

    document.body.style.overflow = "";
    const tl = gsap.timeline({ onComplete });
    tl.to(".ld-enter", { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
    tl.to(".ld-inner", { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, "-=0.1");
    tl.to(ref.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.25");
  }, [onComplete]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".ld-mandala", { opacity: 0, scale: 0.7, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 2, ease: "power2.out" }, 0);
    tl.fromTo(".ld-arch", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.1);
    tl.fromTo(".ld-diamond", { scale: 0, rotation: 0 }, { scale: 1, rotation: 45, duration: 0.5, ease: "back.out(2)" }, 0.3);
    tl.fromTo(".ld-line-l", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, 0.4);
    tl.fromTo(".ld-line-r", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, 0.4);
    tl.fromTo(".ld-char", { opacity: 0, y: 60, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.9);
    tl.fromTo(".ld-sub", { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.35em", duration: 0.8, ease: "power2.out" }, 1.7);
    tl.fromTo(".ld-tagline", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.2);

    tl.call(() => setReady(true), undefined, 2.6);
    tl.fromTo(".ld-enter", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2.6);
  }, { scope: ref });

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(reveal, 4500);
    return () => clearTimeout(timer);
  }, [ready, reveal]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: P.bg }}
      onClick={ready ? reveal : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (ready && (e.key === "Enter" || e.key === " ")) reveal(); }}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.06), transparent 70%)` }} />
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />

      {/* Rotating wedding mandala behind monogram */}
      <div className="ld-mandala absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
        <div className="w-[75vw] h-[75vw] max-w-lg max-h-lg" style={{ animation: "spin 80s linear infinite" }}>
          <WeddingMandala className="w-full h-full opacity-[0.6]" />
        </div>
      </div>

      <div className="ld-inner flex flex-col items-center relative z-10">
        <div className="ld-arch w-28 h-36 md:w-36 md:h-48 mb-6">
          <MughalArch />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="ld-line-l h-px w-16 md:w-24 origin-right" style={{ backgroundColor: `${P.gold}40` }} />
          <div className="ld-diamond w-2 h-2" style={{ backgroundColor: `${P.gold}66` }} />
          <div className="ld-line-r h-px w-16 md:w-24 origin-left" style={{ backgroundColor: `${P.gold}40` }} />
        </div>

        <div className="flex items-baseline gap-3 md:gap-5">
          <span className="ld-char font-serif text-6xl md:text-8xl lg:text-9xl" style={{ color: P.cream }}>{COUPLE.partner1.charAt(0)}</span>
          <span className="ld-char font-serif italic text-3xl md:text-5xl" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>&amp;</span>
          <span className="ld-char font-serif text-6xl md:text-8xl lg:text-9xl" style={{ color: P.cream }}>{COUPLE.partner2.charAt(0)}</span>
        </div>

        <p className="ld-sub mt-8 text-[10px] uppercase tracking-[0.35em] font-body" style={{ color: `${P.cream}80` }}>
          April 2026 · Jaipur, Rajasthan
        </p>
        <p className="ld-tagline mt-3 font-serif italic text-xs md:text-sm" style={{ color: `${P.gold}66` }}>
          A Royal Celebration
        </p>
      </div>

      {/* Begin prompt with play icon + pulsing ring */}
      <div className="ld-enter absolute bottom-14 md:bottom-20 left-1/2 -translate-x-1/2 opacity-0 z-10">
        <div className="flex flex-col items-center gap-3 cursor-pointer">
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center" style={{ border: `1px solid ${P.gold}30` }}>
            <div className="absolute inset-0 rounded-full animate-ping" style={{ border: `1px solid ${P.gold}20`, opacity: 0.3 }} />
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-0.5">
              <path d="M1 1L11 7L1 13V1Z" fill={`${P.gold}70`} />
            </svg>
          </div>
          <span className="text-[9px] uppercase tracking-[0.35em] font-body" style={{ color: `${P.cream}70` }}>
            Begin the Journey
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

    tl.fromTo(".hero-amp", { opacity: 0, scale: 0.3, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "back.out(1.4)" }, 1.8);

    tl.fromTo(".hero-name-glow", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 2.0);

    tl.fromTo(".hero-shimmer", { xPercent: -120 }, { xPercent: 220, duration: 1.6, ease: "power2.inOut" }, 2.2);

    tl.fromTo(".hero-fade", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 2.4);

    tl.fromTo(".hero-scroll-ind", { opacity: 0 }, { opacity: 1, duration: 1 }, 3.0);

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(".hero-bg-layer", { scale: 1 + p * 0.15 });
        gsap.set(".hero-content", { y: p * 150, opacity: Math.max(0, 1 - p * 1.6) });
        gsap.set(".hero-frame", { opacity: Math.max(0, 1 - p * 2.5) });
      },
    });
  }, { scope: ref, dependencies: [loaded] });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="hero-bg-layer absolute inset-[-10%]">
        <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,10,10,0.5), transparent 35%, rgba(26,10,10,0.85))" }} />
      </div>

      {/* Atmospheric layers */}
      <motion.div className="absolute inset-0 z-1 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139,26,26,0.1), transparent 70%)" }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 z-1 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 30%, rgba(26,10,10,0.6) 100%)" }} />
      <Bokeh />
      <DreamParticles count={55} />
      <div className="absolute inset-0 pointer-events-none z-2 opacity-25 mix-blend-overlay" style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />

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
      <div className="hero-content relative z-10 text-center px-6 max-w-5xl mx-auto invisible">
        {/* Devanagari cultural text */}
        <p className="hero-sanskrit text-xs md:text-sm tracking-[0.5em] mb-6" style={{ color: `${P.gold}80` }}>
          शुभ विवाह
        </p>

        {/* Mughal arch framing names */}
        <div className="relative mx-auto" style={{ maxWidth: "34rem" }}>
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
          <div className="hero-orn flex items-center justify-center gap-3 mb-8 origin-center relative z-10">
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.gold}26 50%, ${P.gold}4d)` }} />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${P.gold}4d` }} />
              <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}59` }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${P.gold}4d` }} />
            </div>
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to left, transparent, ${P.gold}26 50%, ${P.gold}4d)` }} />
          </div>

          {/* Names with golden shimmer */}
          <div className="relative overflow-hidden">
            <h1 className="relative font-serif tracking-tight leading-[0.82]" style={{ perspective: "1200px" }}>
              <span className="block text-[clamp(3rem,10vw,9rem)]">
                {COUPLE.partner1.split("").map((c, i) => (
                  <span key={`p1-${i}`} className="hero-char inline-block" style={{ color: P.cream, textShadow: `0 0 80px rgba(139,26,26,0.2), 0 0 40px rgba(212,175,55,0.08), 0 2px 40px rgba(0,0,0,0.4)`, transformStyle: "preserve-3d" }}>{c}</span>
                ))}
              </span>
              <span className="hero-amp block font-serif italic text-[clamp(2rem,5vw,4.5rem)] my-3 md:my-5" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 24px rgba(212,175,55,0.3))" }}>&amp;</span>
              <span className="block text-[clamp(3rem,10vw,9rem)]">
                {COUPLE.partner2.split("").map((c, i) => (
                  <span key={`p2-${i}`} className="hero-char inline-block" style={{ color: P.cream, textShadow: `0 0 80px rgba(139,26,26,0.2), 0 0 40px rgba(212,175,55,0.08), 0 2px 40px rgba(0,0,0,0.4)`, transformStyle: "preserve-3d" }}>{c}</span>
                ))}
              </span>
            </h1>
            <div className="hero-shimmer absolute inset-y-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.12), rgba(212,175,55,0.04), transparent)" }} />
          </div>
        </div>

        {/* Jaimala animation */}
        <div className="hero-fade mt-6">
          <JaimalaAnimation />
        </div>

        {/* Subtitle */}
        <p className="hero-fade font-serif italic text-lg md:text-xl mt-4 tracking-wide" style={{ color: `${P.cream}cc` }}>
          A Royal Celebration, Six Chapters
        </p>

        {/* Divider */}
        <div className="hero-fade flex flex-col items-center gap-1 my-5">
          <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to right, transparent, ${P.gold}40, transparent)` }} />
          <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${P.maroon}40, transparent)` }} />
        </div>

        {/* Date + venue */}
        <div className="hero-fade space-y-2">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}e6` }}>{formattedDate}</p>
          <p className="text-xs uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}99` }}>The Leela Palace · {COUPLE.location}</p>
        </div>

        {/* CTAs */}
        <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/itinerary" className="group relative px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-body transition-all duration-700 overflow-hidden" style={{ color: `${P.gold}e6`, border: `1px solid ${P.gold}40` }}>
            <span className="relative z-10">View Itinerary</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: `${P.gold}12` }} />
          </Link>
          <Link href="/rsvp" className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-body font-medium transition-all duration-700" style={{ color: P.bg, background: `linear-gradient(to right, ${P.gold}, #c9a030)`, boxShadow: "0 8px 24px rgba(212,175,55,0.2)" }}>
            RSVP Now
          </Link>
        </div>

        {/* Countdown */}
        <div className="hero-fade mt-8">
          <CountdownTimer targetDate={COUPLE.weddingDate} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-ind absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-0">
        <span className="text-[9px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.cream}40` }}>Discover</span>
        <motion.div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: `1px solid ${P.cream}26` }} animate={{ borderColor: [`${P.cream}26`, `${P.cream}4d`, `${P.cream}26`] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <motion.div className="w-1 h-1.5 rounded-full" style={{ backgroundColor: `${P.gold}99` }} animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
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
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80" alt="" fill className="object-cover opacity-[0.05]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}, ${P.bg}e6, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.04), transparent 70%)` }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <MandalaOrnament className="rp-fade mb-10" />
        <span className="rp-fade block text-[10px] uppercase tracking-[0.4em] font-body mb-10" style={{ color: `${P.gold}80` }}>
          The Setting
        </span>

        <div className="rp-arch w-40 h-56 md:w-48 md:h-64 mx-auto mb-10">
          <MughalArch>
            <p className="font-serif italic text-xl md:text-2xl" style={{ color: `${P.gold}40` }}>जयपुर</p>
          </MughalArch>
        </div>

        <h2 className="rp-fade font-serif text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight" style={{ color: `${P.cream}e6` }}>
          In the Heart of the Pink City
        </h2>

        <p className="rp-fade font-body text-sm md:text-base leading-[2] max-w-2xl mx-auto mb-8" style={{ color: `${P.cream}99` }}>
          Where sandstone palaces rise like poems carved in stone. Where Maharajas once held
          court beneath hand-painted ceilings and the desert wind carried the fragrance of
          jasmine and rose. Here, in this land where every arch frames a story, two souls
          chose to write their own.
        </p>

        <p className="rp-fade font-body text-sm md:text-base leading-[2] max-w-2xl mx-auto mb-8" style={{ color: `${P.cream}80` }}>
          Jaipur has always been a city of grand gestures — built by Maharaja Sawai Jai Singh II
          in 1727, its geometry is celestial, its colors divine. It is a city that understands
          ceremony, that knows how to hold space for moments that transcend the ordinary.
        </p>

        <p className="rp-fade font-serif italic text-base md:text-lg max-w-xl mx-auto" style={{ color: `${P.gold}80` }}>
          This wedding unfolds across three days and six chapters — each one a distinct world,
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
    gsap.fromTo(".sq-word", { opacity: 0, y: 25, filter: "blur(4px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
    });
    gsap.fromTo(".sq-fade", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  const words = COUPLE.tagline.split(" ");

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=1920&q=80" alt="" fill className="object-cover opacity-[0.06]" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}, ${P.bg}cc, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.05), transparent 70%)` }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="sq-fade mb-14">
          <Flourish className="mb-6" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.gold}99` }}>Their Story</span>
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

        <p className="sq-fade font-body text-sm md:text-base leading-loose max-w-2xl mx-auto" style={{ color: `${P.cream}99` }}>
          They grew up in Bombay, studied and travelled across London. He proposed in
          Cappadocia. Different cities, different journeys — but every chapter led to the
          same page. Now, against the backdrop of Jaipur&apos;s timeless beauty, their story
          finds its grandest verse: a three-day royal celebration woven from six
          unforgettable chapters.
        </p>

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
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="vs-img absolute inset-[-10%]">
        <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80" alt="The Leela Palace" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${P.bg}99, transparent 30%, transparent 60%, ${P.bg}cc 85%, ${P.bg})` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04), transparent 60%)` }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <Flourish className="vs-fade mb-8" />
        <span className="vs-fade block text-[10px] uppercase tracking-[0.4em] font-body mb-6" style={{ color: `${P.gold}99` }}>
          The Palace
        </span>
        <h2 className="vs-fade font-serif text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight" style={{ color: P.cream, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          The Leela Palace
        </h2>
        <p className="vs-fade font-serif italic text-lg md:text-xl mb-2" style={{ color: `${P.gold}cc` }}>
          Jaipur, Rajasthan
        </p>
        <p className="vs-fade font-body text-xs md:text-sm mt-6 max-w-xl mx-auto leading-loose" style={{ color: `${P.cream}99` }}>
          Built in tribute to Rajasthan&apos;s royal legacy, the palace grounds become the
          stage for six unforgettable chapters. From sunlit courtyards draped in jasmine to
          gilded durbar halls lit by a thousand diyas — each space transforms to tell its
          part of the story.
        </p>

        <div className="vs-fade flex items-center justify-center gap-8 mt-10">
          {["The Grand Lawn", "The Haveli Courtyard", "The Durbar Hall", "The Grand Ballroom"].map((space, i) => (
            <span key={i} className="hidden md:inline text-[8px] uppercase tracking-[0.2em] font-body" style={{ color: `${P.cream}33` }}>
              {space}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Day Divider (for gallery)                                      */
/* ─────────────────────────────────────────────────────────────── */

function DayDivider({ day, date, mood }: { day: number; date: string; mood: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "28vw", height: "82vh" }}>
      <div className="text-center">
        <div className="w-16 h-24 mx-auto mb-6">
          <MughalArch>
            <span className="font-serif text-lg" style={{ color: `${P.gold}33` }}>{String(day).padStart(2, "0")}</span>
          </MughalArch>
        </div>
        <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${P.cream}99` }}>
          Day {day}
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] font-body mb-2" style={{ color: `${P.gold}40` }}>
          {date}
        </p>
        <p className="font-serif italic text-xs" style={{ color: `${P.cream}2e` }}>
          {mood}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Chapter Story Card (immersive moodboard)                       */
/* ─────────────────────────────────────────────────────────────── */

function ChapterStoryCard({ event }: { event: (typeof EVENTS)[0] }) {
  const isLight = event.slug === "courtyard-edit" || event.slug === "world-of-our-own";
  const accent = isLight ? "#d4a060" : event.palette.accent;
  const preview = event.longDescription.split(". ").slice(0, 2).join(". ") + ".";

  return (
    <Link href={`/chapter/${event.slug}`} className="chapter-card group relative flex-shrink-0 block" style={{ width: "75vw", height: "82vh" }}>
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
          <Image src={event.heroImage} alt={event.title} fill className="object-cover" sizes="75vw" />
        </div>

        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-700" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${event.palette.background}f5 0%, ${event.palette.background}cc 30%, ${event.palette.background}40 55%, transparent 75%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${event.palette.primary}50, transparent 60%)` }} />

        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <span className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none select-none" style={{ color: `${accent}10` }}>
            {String(event.chapterNumber).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 md:w-10" style={{ backgroundColor: `${accent}60` }} />
            <span className="text-[9px] uppercase tracking-[0.4em] font-body" style={{ color: accent }}>
              Chapter {String(event.chapterNumber).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-2" style={{ color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
            {event.title}
          </h3>
          <p className="font-serif italic text-base md:text-xl mb-4" style={{ color: accent, textShadow: `0 0 20px ${accent}20` }}>
            {event.subtitle}
          </p>

          <p className="font-body text-xs md:text-sm leading-relaxed max-w-lg mb-5 line-clamp-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            {preview}
          </p>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-body" style={{ color: "rgba(255,255,255,0.4)" }}>
              {event.date} · {event.time}
            </span>
            <span className="text-[9px] font-body" style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-body" style={{ color: "rgba(255,255,255,0.35)" }}>
              {event.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.15em] font-body px-3 py-1.5 rounded-full" style={{ color: `${accent}cc`, border: `1px solid ${accent}20`, backgroundColor: `${accent}08` }}>
              ✦ {event.dressCode.title}
            </span>
            <div className="overflow-hidden h-5 ml-auto">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-body translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ color: "rgba(255,255,255,0.6)" }}>
                Step Inside <span style={{ color: accent }}>→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Chapter Gallery (GSAP horizontal scroll with day dividers)     */
/* ─────────────────────────────────────────────────────────────── */

function ChapterGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 pb-4 text-center pointer-events-none" style={{ background: `linear-gradient(to bottom, ${P.bg}, transparent)` }}>
        <Flourish className="mb-3" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.gold}59` }}>
          The Chapters
        </span>
      </div>

      <div ref={trackRef} className="flex items-center gap-4 md:gap-6 px-[10vw] h-screen" style={{ width: "fit-content" }}>
        {DAYS.map((d) => (
          <Fragment key={`day-${d.day}`}>
            <DayDivider day={d.day} date={d.date} mood={d.mood} />
            {d.events.map((event) => (
              <ChapterStoryCard key={event.slug} event={event} />
            ))}
          </Fragment>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-32 md:w-48">
        <div className="flex justify-between mb-2">
          <span className="text-[8px] uppercase tracking-[0.2em] font-body" style={{ color: `${P.cream}33` }}>Day 1</span>
          <span className="text-[8px] uppercase tracking-[0.2em] font-body" style={{ color: `${P.cream}33` }}>Day 2</span>
          <span className="text-[8px] uppercase tracking-[0.2em] font-body" style={{ color: `${P.cream}33` }}>Day 3</span>
        </div>
        <div className="h-px" style={{ backgroundColor: `${P.cream}15` }}>
          <div ref={progressRef} className="h-full origin-left" style={{ backgroundColor: P.gold, transform: "scaleX(0)" }} />
        </div>
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
    <section ref={ref} className="relative py-20 md:py-28" style={{ backgroundColor: P.bg, borderTop: `1px solid ${P.cream}08` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,26,26,0.03), transparent 70%)` }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 tl-item">
          <MandalaOrnament className="mb-6" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-body block mb-6" style={{ color: `${P.gold}59` }}>
            The Royal Itinerary
          </span>
          <h2 className="font-serif text-3xl md:text-5xl" style={{ color: `${P.cream}cc` }}>
            Three Days of Celebration
          </h2>
          <p className="font-body text-xs md:text-sm mt-4 max-w-md mx-auto leading-relaxed" style={{ color: `${P.cream}40` }}>
            From the first toast at dusk to the last dance at dawn — a journey through
            six worlds, each crafted to honour heritage, love, and the joy of togetherness.
          </p>
        </div>

        <div className="relative">
          <div className="tl-line absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top" style={{ background: `linear-gradient(to bottom, transparent, ${P.gold}20, ${P.gold}20, transparent)` }} />

          {DAYS.map((d, di) => (
            <div key={di} className="tl-item relative mb-20 last:mb-0">
              <div className="flex items-center justify-center mb-10">
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
                    <Link key={event.slug} href={`/chapter/${event.slug}`} className="group block p-5 rounded-sm border transition-all duration-500" style={{ borderColor: `${accent}12`, backgroundColor: `${event.palette.background}15` }}>
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

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cta-el", { opacity: 0, y: 35 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,26,26,0.05), transparent 70%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 30% at 50% 60%, rgba(212,175,55,0.03), transparent 60%)` }} />

      <div className="relative z-10 text-center px-6">
        <div className="cta-el"><MandalaOrnament className="mb-12" /></div>
        <p className="cta-el text-[10px] uppercase tracking-[0.4em] font-body mb-4" style={{ color: `${P.gold}59` }}>
          The Invitation
        </p>

        <div className="cta-el w-20 h-28 mx-auto mb-8">
          <MughalArch />
        </div>

        <h2 className="cta-el font-serif italic text-4xl md:text-6xl lg:text-7xl mb-4 leading-[1.1]" style={{ color: `${P.cream}e6` }}>
          Be Part of Our
        </h2>
        <h2 className="cta-el font-serif italic text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(212,175,55,0.15))" }}>
          Royal Chapter
        </h2>

        <p className="cta-el font-body text-sm md:text-base max-w-lg mx-auto mb-6 leading-loose" style={{ color: `${P.cream}8c` }}>
          Three days in the Pink City. Six chapters of celebration — from intimate courtyards
          to gilded ceremonies, from sun-drenched afternoons to midnight revelry.
        </p>
        <p className="cta-el font-serif italic text-sm max-w-md mx-auto mb-14" style={{ color: `${P.gold}73` }}>
          Every moment means more with you there.
        </p>

        <div className="cta-el flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/rsvp" className="px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-body font-medium transition-all duration-700" style={{ color: P.bg, background: `linear-gradient(to right, ${P.gold}, #c9a030)`, boxShadow: "0 12px 32px rgba(212,175,55,0.2)" }}>
            RSVP Now
          </Link>
          <Link href="/itinerary" className="px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-body transition-all duration-700" style={{ color: `${P.cream}80`, border: `1px solid ${P.cream}14` }}>
            Full Itinerary
          </Link>
        </div>

        <div className="cta-el"><Flourish className="mt-16" /></div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Assembled Experience                                           */
/* ─────────────────────────────────────────────────────────────── */

export default function LandingExperience() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CinematicLoader onComplete={() => setLoaded(true)} />
      <Hero loaded={loaded} />
      <SectionTransition variant="arch" label="The Setting" />
      <RoyalPrologue />
      <SectionTransition variant="lotus" label="Their Story" />
      <StoryQuote />
      <SectionTransition variant="mandala" label="The Palace" />
      <VenueShowcase />
      <SectionTransition variant="scroll" label="The Chapters" />
      <ChapterGallery />
      <SectionTransition variant="mandala" label="The Journey" />
      <RoyalTimeline />
      <SectionTransition variant="lotus" label="अतिथि देवो भव" />
      <FinalCTA />
    </>
  );
}
