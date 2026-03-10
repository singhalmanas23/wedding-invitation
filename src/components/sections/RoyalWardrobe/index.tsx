"use client";

import { useRef, useEffect, useState, useMemo, useCallback, Fragment } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { useWardrobePlanner, type Audience } from "./useWardrobePlanner";
import {
  wardrobeConfig,
  WARDROBE_CHAPTER_IDS,
  CHAPTER_THEMES,
  type ChapterTheme,
  type ChapterWardrobe,
} from "./WardrobeConfig";
import { EVENTS, COUPLE } from "@/content/events";

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

type WPState = ReturnType<typeof useWardrobePlanner>;

/* ═══════════════════════════════════════════════════════════════════ */
/*  Reusable motion helpers                                            */
/* ═══════════════════════════════════════════════════════════════════ */

function staggerIn(targets: gsap.TweenTarget, delay = 0, y = 30, stag = 0.12) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration: 0.9, stagger: stag, delay, ease: "power3.out" },
  );
}

function lineGrow(targets: gsap.TweenTarget, delay = 0) {
  return gsap.fromTo(targets, { scaleX: 0 }, { scaleX: 1, duration: 1.0, delay, ease: "power2.inOut" });
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SVG Decorative Components                                          */
/* ═══════════════════════════════════════════════════════════════════ */

function PalaceArchSVG({ className = "", opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 300 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ opacity }}>
      <path d="M30 400 V160 Q30 20 150 8 Q270 20 270 160 V400" stroke={P.gold} strokeWidth="0.8" />
      <path d="M50 400 V170 Q50 40 150 26 Q250 40 250 170 V400" stroke={P.gold} strokeWidth="0.4" />
      <path d="M70 400 V180 Q70 60 150 44 Q230 60 230 180 V400" stroke={P.gold} strokeWidth="0.2" />
      <circle cx="150" cy="55" r="3" fill={P.gold} opacity="0.25" />
      <line x1="100" y1="55" x2="135" y2="55" stroke={P.gold} strokeWidth="0.3" opacity="0.15" />
      <line x1="165" y1="55" x2="200" y2="55" stroke={P.gold} strokeWidth="0.3" opacity="0.15" />
      <path d="M70 140 Q85 125 100 130 Q115 120 130 128 Q140 118 150 122 Q160 118 170 128 Q185 120 200 130 Q215 125 230 140" stroke={P.gold} strokeWidth="0.4" opacity="0.12" fill="none" />
      {[120, 180, 240, 300, 360].map((y) => (
        <Fragment key={y}>
          <circle cx="50" cy={y} r="1" fill={P.gold} opacity="0.08" />
          <circle cx="250" cy={y} r="1" fill={P.gold} opacity="0.08" />
        </Fragment>
      ))}
    </svg>
  );
}

function GoldDustParticles({ count = 40 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; s: number; vx: number; vy: number; a: number; va: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random(),
        va: Math.random() * 0.01 + 0.005
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.va;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = (Math.sin(p.a) + 1) / 2 * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-60" />;
}

function FloralVineSVG({ className = "", side = "left" }: { className?: string; side?: "left" | "right" }) {
  const flip = side === "right" ? "scale(-1, 1)" : "";
  return (
    <svg viewBox="0 0 80 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ transform: flip }}>
      <path d="M40 0 Q20 60 35 120 Q50 180 30 240 Q10 300 40 360 Q55 390 40 400" stroke={P.gold} strokeWidth="0.6" opacity="0.15" />
      {[60, 140, 220, 300].map((cy) => (
        <Fragment key={cy}>
          <ellipse cx="35" cy={cy} rx="12" ry="7" stroke={P.gold} strokeWidth="0.4" opacity="0.12" />
          <ellipse cx="45" cy={cy + 20} rx="10" ry="6" stroke={P.gold} strokeWidth="0.3" opacity="0.08" />
          <circle cx="38" cy={cy + 8} r="1.5" fill={P.gold} opacity="0.1" />
        </Fragment>
      ))}
    </svg>
  );
}

function JaaliPatternSVG({ className = "", opacity = 0.04 }: { className?: string; opacity?: number }) {
  const pts = [20, 60, 100, 140, 180];
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ opacity }}>
      {pts.flatMap((cy, ri) =>
        pts.map((cx, ci) => (
          <g key={`${ri}-${ci}`}>
            <circle cx={cx} cy={cy} r="7" stroke={P.gold} strokeWidth="0.25" />
            <circle cx={cx} cy={cy} r="2.5" stroke={P.gold} strokeWidth="0.2" />
            {ci < 4 && <line x1={cx + 7} y1={cy} x2={cx + 33} y2={cy} stroke={P.gold} strokeWidth="0.15" />}
            {ri < 4 && <line x1={cx} y1={cy + 7} x2={cx} y2={cy + 33} stroke={P.gold} strokeWidth="0.15" />}
          </g>
        )),
      )}
    </svg>
  );
}

function GoldDust({ count = 12 }: { count?: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(() => {
    const s = (a: number, b: number) => {
      const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(s(i, 1) * 100).toFixed(1)}%`,
      top: `${(s(i, 2) * 100).toFixed(1)}%`,
      size: 1 + s(i, 3) * 2.5,
      delay: s(i, 4) * 8,
      dur: 4 + s(i, 5) * 6,
    }));
  }, [count]);
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" suppressHydrationWarning>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            backgroundColor: P.gold, opacity: 0,
            animation: `goldFoilSparkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Decorative utilities                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function Flourish({ className = "", accent = P.gold }: { className?: string; accent?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to right, transparent, ${accent}25)` }} />
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${accent}50`, boxShadow: `0 0 4px ${accent}15` }} />
        <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${accent}60`, boxShadow: `0 0 6px ${accent}20` }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${accent}50`, boxShadow: `0 0 4px ${accent}15` }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
      </div>
      <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to left, transparent, ${accent}25)` }} />
    </div>
  );
}

function LightSweep({ color = P.gold }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced || !ref.current) return;
    const beam = ref.current.querySelector(".sweep-beam");
    if (!beam) return;
    gsap.fromTo(beam, { x: "-100%" }, { x: "250%", duration: 8, ease: "sine.inOut", repeat: -1, repeatDelay: 4 });
  }, { scope: ref });
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      <div
        className="sweep-beam absolute top-0 left-0 w-1/3 h-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}04, rgba(255,255,255,0.03), ${color}04, transparent)` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  HERO                                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function WardrobeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".wh-label", { opacity: 0, letterSpacing: "1.2em" }, { opacity: 1, letterSpacing: "0.6em", duration: 1.4 }, 0);
    tl.fromTo(".wh-line-l", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.3);
    tl.fromTo(".wh-line-r", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.3);
    tl.fromTo(".wh-diamond", { scale: 0, rotate: 0 }, { scale: 1, rotate: 45, duration: 0.6, ease: "back.out(2)" }, 0.7);
    tl.fromTo(".wh-title-1", { clipPath: "inset(0 0 100% 0)", y: 40 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.2, ease: "expo.out" }, 0.6);
    tl.fromTo(".wh-title-2", { clipPath: "inset(0 0 100% 0)", y: 40 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.2, ease: "expo.out" }, 0.85);
    tl.fromTo(".wh-desc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.0 }, 1.3);
    tl.fromTo(".wh-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 1.5);
    tl.fromTo(".wh-scroll", { opacity: 0 }, { opacity: 0.6, duration: 1.0 }, 2.0);
    tl.fromTo(".wh-arch", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" }, 0);
    tl.fromTo(".wh-vine", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" }, 0.3);
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden py-8 md:py-0" style={{ backgroundColor: P.bg }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139,26,26,0.08), transparent 70%)" }} />
      <GoldDust count={14} />
      <PalaceArchSVG className="wh-arch absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[50vw] max-w-md h-auto pointer-events-none" opacity={0.05} />
      <FloralVineSVG className="wh-vine absolute left-0 top-0 h-full w-16 md:w-20 pointer-events-none opacity-[0.04]" side="left" />
      <FloralVineSVG className="wh-vine absolute right-0 top-0 h-full w-16 md:w-20 pointer-events-none opacity-[0.04]" side="right" />

      <div className="relative z-10 w-full text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4 md:mb-8">
          <div className="wh-line-l h-px w-12 md:w-20 origin-right" style={{ backgroundColor: `${P.gold}35` }} />
          <div className="wh-diamond w-2 h-2" style={{ backgroundColor: `${P.gold}70` }} />
          <div className="wh-line-r h-px w-12 md:w-20 origin-left" style={{ backgroundColor: `${P.gold}35` }} />
        </div>
        <span className="wh-label block text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.6em] font-body mb-4 md:mb-8" style={{ color: `${P.gold}90` }}>
          Attire &amp; Adornment
        </span>
        <h1 className="font-serif leading-[1.05] mb-4 md:mb-8">
          <span className="wh-title-1 block text-4xl sm:text-5xl md:text-7xl lg:text-8xl" style={{ color: P.cream, textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>
            The Royal
          </span>
          <span className="wh-title-2 block text-4xl sm:text-5xl md:text-7xl lg:text-8xl italic" style={{ background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Wardrobe
          </span>
        </h1>
        <p className="wh-desc font-body text-sm md:text-base max-w-xl mx-auto leading-[1.75] md:leading-[1.9] px-1" style={{ color: `${P.cream}80` }}>
          A curated sartorial guide for each chapter of our wedding celebration.
          Discover the colours, fabrics, and silhouettes that honour Udaipur&apos;s heritage
          and the spirit of every event.
        </p>
        <div className="wh-divider h-px w-20 md:w-32 mx-auto mt-6 md:mt-10 origin-center" style={{ background: `linear-gradient(to right, transparent, ${P.gold}40, transparent)` }} />
        <div className="wh-scroll mt-6 md:mt-10 flex flex-col items-center justify-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.4em] font-body" style={{ color: `${P.cream}40` }}>Explore</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce" style={{ animationDuration: "2.5s" }}>
            <path d="M8 4V18M8 18L3 13M8 18L13 13" stroke={`${P.gold}50`} strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CHAPTER RAIL                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function ChapterRail({ selectedChapter, onSelect }: { selectedChapter: string; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-chapter="${selectedChapter}"]`);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedChapter]);

  useEffect(() => {
    if (!chaptersOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setChaptersOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [chaptersOpen]);

  const selectedWardrobe = wardrobeConfig[selectedChapter];

  return (
    <>
      {/* Mobile trigger */}
      <div className="md:hidden py-4 px-4" style={{ borderTop: `1px solid ${P.cream}08`, borderBottom: `1px solid ${P.cream}08` }}>
        <button
          type="button"
          onClick={() => setChaptersOpen(true)}
          className="w-full flex items-center justify-between font-serif text-base py-3.5 px-5 text-left rounded-lg"
          style={{ color: P.cream, border: `1px solid ${P.cream}0c`, backgroundColor: "rgba(255,255,255,0.02)" }}
          aria-expanded={chaptersOpen}
          aria-haspopup="dialog"
        >
          <span style={{ color: `${P.cream}60` }}>Chapter</span>
          <span className="truncate max-w-[55%] text-right">{selectedWardrobe?.title ?? selectedChapter}</span>
          <svg className="shrink-0 w-4 h-4" style={{ color: `${P.cream}40` }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile modal */}
      {chaptersOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col" style={{ backgroundColor: P.bgDeep }} role="dialog" aria-modal="true" aria-label="Select chapter">
          <header className="flex items-center justify-between shrink-0 px-5 py-4" style={{ borderBottom: `1px solid ${P.cream}08` }}>
            <span className="font-serif text-xs uppercase tracking-[0.3em]" style={{ color: P.gold }}>{COUPLE.partner1} &amp; {COUPLE.partner2}</span>
            <h2 className="absolute left-1/2 -translate-x-1/2 font-serif text-lg" style={{ color: P.cream }}>Chapters</h2>
            <button type="button" onClick={() => setChaptersOpen(false)} className="p-2 -m-2" style={{ color: `${P.cream}80` }} aria-label="Close">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
            {WARDROBE_CHAPTER_IDS.map((id) => {
              const chapter = wardrobeConfig[id];
              const event = EVENTS.find((e) => e.slug === id);
              if (!chapter) return null;
              const isSelected = selectedChapter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { onSelect(id); setChaptersOpen(false); }}
                  className="w-full text-left rounded-lg py-4 px-5 transition-colors duration-300"
                  style={{ border: `1px solid ${isSelected ? `${P.gold}40` : `${P.cream}0a`}`, backgroundColor: isSelected ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)" }}
                >
                  {event && <div className="text-[10px] uppercase tracking-[0.25em] font-body mb-1" style={{ color: P.bronze }}>{event.dateShort} · Ch. {event.chapterNumber}</div>}
                  <div className="font-serif text-lg" style={{ color: P.cream }}>{chapter.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop rail */}
      <div className="hidden md:block py-3" style={{ borderTop: `1px solid ${P.cream}06`, borderBottom: `1px solid ${P.cream}06` }}>
        <div ref={scrollRef} className="flex items-center justify-center gap-8 lg:gap-12 px-6 overflow-x-auto scrollbar-hide">
          {WARDROBE_CHAPTER_IDS.map((id) => {
            const chapter = wardrobeConfig[id];
            if (!chapter) return null;
            const isSelected = selectedChapter === id;
            const theme = CHAPTER_THEMES[id];
            return (
              <button
                key={id}
                data-chapter={id}
                onClick={() => onSelect(id)}
                className="group relative flex flex-col items-center gap-2.5 py-4 px-3 shrink-0 transition-all duration-700"
                style={{ opacity: isSelected ? 1 : 0.4 }}
                aria-pressed={isSelected}
              >
                <span className="font-serif text-base lg:text-lg transition-all duration-700 group-hover:opacity-75" style={{ color: P.cream }}>
                  {chapter.title}
                </span>
                <div className="relative h-[2px] rounded-full transition-all duration-700" style={{ backgroundColor: theme?.accent ?? P.gold, width: isSelected ? "100%" : "0%", minWidth: isSelected ? "3rem" : 0 }}>
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 12px ${theme?.accentGlow ?? "rgba(212,175,55,0.2)"}`, backgroundColor: theme?.accent ?? P.gold }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  VIEW MODE TOGGLE                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function ViewModeToggle({ selected, onChange }: { selected: WPState["selectors"]["viewMode"]; onChange: (v: WPState["selectors"]["viewMode"]) => void }) {
  const opts: { key: WPState["selectors"]["viewMode"]; label: string; desc: string }[] = [
    { key: "illustration", label: "The Lookbook", desc: "Style Guide" },
    { key: "realistic", label: "The Campaign", desc: "Cinematic Showcase" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-12">
      {opts.map(({ key, label, desc }) => {
        const isSelected = selected === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="group relative flex flex-col items-center transition-all duration-700"
          >
            <span className={`text-[11px] uppercase tracking-[0.5em] mb-3 transition-colors duration-500 ${isSelected ? "text-amber-500/80" : "text-white/20 group-hover:text-white/40"}`}>
              {desc}
            </span>
            <div className="relative flex flex-col items-center">
              <h3 className={`font-serif text-4xl md:text-6xl lg:text-7xl transition-all duration-700 ${isSelected ? "text-white scale-105" : "text-white/20 group-hover:text-white/40"}`}>
                {label}
              </h3>
              <div className={`mt-6 h-[2px] w-2/3 bg-amber-500 transition-all duration-1000 origin-center ${isSelected ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-30"}`}
                style={{ boxShadow: isSelected ? "0 0 30px #d4af37" : "none" }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SHOWCASE STAGE (Left — couture stage with layered depth)           */
/* ═══════════════════════════════════════════════════════════════════ */

function IllustrationCard({ wardrobe, theme, audience }: { wardrobe: ChapterWardrobe; theme: ChapterTheme; audience: Audience }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    // Entrance animations
    gsap.fromTo(el.querySelector(".illustration-bg"),
      { scale: 1.15, filter: "blur(10px)", opacity: 0 },
      { scale: 1, filter: "blur(0px)", opacity: 1, duration: 2.2, ease: "power2.out" }
    );

    gsap.fromTo(el.querySelectorAll(".card-text-el"),
      { y: 30, opacity: 0, letterSpacing: "1em" },
      { y: 0, opacity: 1, letterSpacing: "0.4em", duration: 1.5, stagger: 0.2, delay: 0.6, ease: "power4.out" }
    );

    gsap.fromTo(el.querySelector(".ornate-frame"),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 2, delay: 0.4, ease: "expo.out" }
    );
  }, { scope: cardRef, dependencies: [wardrobe.id, audience] });

  // Mouse Parallax Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!layerRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    gsap.to(layerRef.current, {
      x: x * 30,
      y: y * 30,
      rotationY: x * 8,
      rotationX: -y * 8,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  // Strategic positions for illustrations based on persona
  const getObjectPosition = () => {
    if (audience === "men") return "35% center";
    if (audience === "women") return "65% center";
    return "center";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center p-8 perspective-1000"
    >
      <GoldDustParticles count={60} />

      {/* Background Illustration with parallax */}
      <div ref={layerRef} className="absolute inset-0 z-0 transition-all duration-1000 ease-out">
        <div className="illustration-bg absolute inset-0 transition-all duration-1000">
          <Image
            src={wardrobe.illustrationImage}
            alt={wardrobe.title}
            fill
            className="object-cover transition-all duration-1000"
            style={{
              objectPosition: getObjectPosition(),
              scale: audience === "all" ? 1.0 : 1.2 // Zoom in slightly when focusing on one person
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>
      </div>

      {/* Ornate Frame */}
      <div className="ornate-frame absolute inset-6 z-20 pointer-events-none">
        <div className="absolute inset-0 border-[0.5px] border-white/20" />
        <div className="absolute inset-2 border-[0.5px] border-white/10" />
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber-500/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-500/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-500/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-500/40" />
      </div>

      {/* Floating Meta Details */}
      <div className="absolute top-12 left-12 z-30 card-text-el">
        <span className="block text-[8px] uppercase tracking-[0.6em] text-amber-500/60 mb-1">Archive No.</span>
        <span className="font-serif text-xl text-white/40">2026-RW-{WARDROBE_CHAPTER_IDS.indexOf(wardrobe.id) + 1}</span>
      </div>

      {/* Persona Label */}
      <div className="absolute top-12 right-12 z-30 card-text-el text-right">
        <span className="block text-[8px] uppercase tracking-[0.6em] text-amber-500/60 mb-1">Portfolio</span>
        <span className="font-serif text-lg text-white/60 italic">
          {audience === "all" ? "The Couple" : audience === "men" ? "His Selection" : "Her Selection"}
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-30 text-center space-y-6 max-w-lg mt-12">
        <div className="card-text-el inline-block">
          <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500" style={{ textShadow: `0 0 12px #d4af3760` }}>
            Style Lookbook
          </span>
        </div>

        <h3 className="card-text-el font-serif text-5xl md:text-7xl text-white leading-[0.9] tracking-tighter">
          {wardrobe.title.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h3>

        <div className="card-text-el flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-white/20" />
          <p className="text-amber-200/90 font-serif italic text-xl">
            {wardrobe.dressCode.title}
          </p>
          <div className="h-px w-8 bg-white/20" />
        </div>

        <p className="card-text-el text-white/50 text-[11px] uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto">
          {wardrobe.moodLine}
        </p>
      </div>

      <LightSweep color={theme.accent} />
    </div>
  );
}

function ShowcaseStage({ selectors, theme }: { selectors: WPState["selectors"]; theme: ChapterTheme }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { currentWardrobe: wardrobe, selectedAudience: audience, viewMode } = selectors;

  useGSAP(() => {
    if (!stageRef.current || reduced) return;
    const el = stageRef.current;

    if (viewMode === "illustration") return;

    gsap.fromTo(el.querySelectorAll(".stage-img, .stage-svg"), { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: "power2.out" });
    gsap.fromTo(el.querySelector(".stage-mood"), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 1.0, delay: 0.5, ease: "power3.out" });
    gsap.fromTo(el.querySelector(".stage-arch"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" });
    gsap.fromTo(el.querySelector(".stage-jaali"), { opacity: 0 }, { opacity: 1, duration: 2.0, delay: 0.3, ease: "power2.out" });
  }, { scope: stageRef, dependencies: [wardrobe.id, audience, viewMode] });

  const campaignImage = wardrobe.campaignImage;
  const activeImage = campaignImage;

  const isExternalImage = typeof activeImage === "string" && (activeImage.startsWith("https://") || activeImage.startsWith("//"));
  // Mobile: object-contain so full image is visible (no cropping); md+: object-cover for cinematic fill
  const imageClassName =
    "object-center transition-transform duration-[1.5s] group-hover:scale-105 animate-in fade-in zoom-in-95 duration-1000 object-contain md:object-cover";

  const renderCampaignImage = () => (
    <div className="stage-img relative flex-1 overflow-hidden group cursor-crosshair min-h-[50vh] md:min-h-[60vh] w-full flex items-center justify-center bg-[#0a0505]">
      {isExternalImage ? (
        // Native img for external URLs so Campaign image always displays (avoids Next Image optimization issues)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={activeImage}
          src={activeImage}
          alt={`${wardrobe.title} — Campaign`}
          className={`absolute inset-0 w-full h-full ${imageClassName}`}
        />
      ) : (
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${wardrobe.title} — Campaign`}
          fill
          className={imageClassName}
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15 pointer-events-none" />
    </div>
  );

  return (
    <div
      ref={stageRef}
      className={`relative min-h-[60vh] md:min-h-[75vh] overflow-hidden transition-all duration-700 ${viewMode === "illustration"
        ? "rounded-xl border border-white/5 bg-bgDeep shadow-2xl"
        : "rounded-none bg-transparent"
        }`}
      style={{
        boxShadow: viewMode === "illustration" ? `0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${P.cream}06` : "none"
      }}
      key={`${wardrobe.id}-${audience}-${viewMode}`}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

      {/* Luxury Watermark (Simplified for Campaign) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[25vw] font-serif italic whitespace-nowrap tracking-tighter">
          {viewMode === "illustration" ? "Royal Couture" : "Udaipur 2026"}
        </span>
      </div>

      {viewMode === "illustration" ? (
        <IllustrationCard wardrobe={wardrobe} theme={theme} audience={audience} />
      ) : (
        /* Campaign View — Cinematic & Immersive */
        <div className="relative h-full flex items-center justify-center bg-[#0a0505]">
          <GoldDustParticles count={50} />
          <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none" style={{ background: theme.bgOverlay }} />

          <div className="relative z-10 w-full h-full flex items-stretch min-h-[60vh] md:min-h-[80vh]">
            {renderCampaignImage()}
          </div>

          {/* Cinematic Bloom/Glow */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />

          {/* Campaign Metadata Overlay */}
          <div className="stage-mood absolute top-10 left-10 z-30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500 shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/90 font-medium">Campaign Editorial</h4>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-[0.3em] text-amber-500/60 mb-1">Film Grade</span>
              <span className="font-serif text-2xl text-white/40 tracking-widest">{theme.moodLabel.toUpperCase()}</span>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 z-30 text-right">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 block mb-2">Perspective</span>
            <div className="flex items-center gap-3 justify-end text-amber-500/80">
              <span className="text-[11px] uppercase tracking-[0.3em] font-body">Discover Campaign</span>
              <svg width="24" height="1" viewBox="0 0 24 1" fill="none" className="opacity-40">
                <line y1="0.5" x2="24" y2="0.5" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  GUIDANCE PANEL (Right — bespoke editorial styling guide)           */
/* ═══════════════════════════════════════════════════════════════════ */

function ChapterLookbookGuide({ wardrobe, theme }: { wardrobe: ChapterWardrobe; theme: ChapterTheme }) {
  const acc = theme.accent;

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="gp-el relative">
        <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/40 via-transparent to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 block mb-4" style={{ textShadow: `0 0 10px ${theme.accentGlow}` }}>
          The Style Manuscript
        </span>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-white mb-6">
          {wardrobe.dressCode.title}
        </h2>
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
          <p className="font-serif text-lg italic text-amber-200/60 leading-relaxed">
            &ldquo;{wardrobe.moodLine}&rdquo;
          </p>
          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-4" />
          <p className="text-[13px] text-white/70 leading-relaxed font-body">
            {wardrobe.dressCode.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Silhouettes */}
        <div className="gp-el group p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 block mb-4 group-hover:text-amber-500 transition-colors">Key Silhouettes</span>
          <div className="space-y-2">
            {wardrobe.silhouettes.map(s => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                <span className="text-[12px] font-serif text-white/80">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fabrics */}
        <div className="gp-el group p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 block mb-4 group-hover:text-amber-500 transition-colors">Essential Fabrics</span>
          <div className="space-y-2">
            {wardrobe.fabrics.map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                <span className="text-[12px] font-serif text-white/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Palette Guidance */}
      <div className="gp-el p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-red-200/40">Palettes to Avoid</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {wardrobe.palette.avoid.map(item => (
            <span key={item} className="px-3 py-1.5 rounded-lg border border-red-500/10 bg-red-500/5 text-red-200/50 text-[10px] uppercase tracking-widest font-body">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[10px] italic text-red-200/30 font-serif">
          * Steering clear of these tones ensures a cohesive and high-fashion aesthetic for the photographs.
        </p>
      </div>

      {/* Accessories / Adornments */}
      <div className="gp-el p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
        <span className="text-[8px] uppercase tracking-[0.4em] text-amber-500/60 block mb-6">Recommended Adornments</span>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-[7px] uppercase tracking-[0.2em] text-white/30 block mb-3">For Him</span>
            <div className="space-y-1.5">
              {wardrobe.accessories.men.map(a => <p key={a} className="text-[11px] text-white/60 font-serif">{a}</p>)}
            </div>
          </div>
          <div>
            <span className="text-[7px] uppercase tracking-[0.2em] text-white/30 block mb-3">For Her</span>
            <div className="space-y-1.5">
              {wardrobe.accessories.women.map(a => <p key={a} className="text-[11px] text-white/60 font-serif">{a}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidancePanel({ selectors, actions, theme }: { selectors: WPState["selectors"]; actions: WPState["actions"]; theme: ChapterTheme }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { currentWardrobe: wardrobe, viewMode } = selectors;

  useGSAP(() => {
    if (!panelRef.current) return;
    const el = panelRef.current;
    staggerIn(el.querySelectorAll(".gp-el"), 0, 28, 0.1);
  }, { scope: panelRef, dependencies: [wardrobe.id, viewMode] });

  return (
    <div ref={panelRef} className="space-y-8" key={`${wardrobe.id}-${viewMode}`}>
      <ChapterLookbookGuide wardrobe={wardrobe} theme={theme} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  WARDROBE SHOWCASE (Stage + Panel orchestrator)                     */
/* ═══════════════════════════════════════════════════════════════════ */

function WardrobeShowcase({ selectors, actions }: { selectors: WPState["selectors"]; actions: WPState["actions"] }) {
  const { selectedChapter, viewMode } = selectors;
  const theme = CHAPTER_THEMES[selectedChapter] ?? CHAPTER_THEMES["pre-party"];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10 text-center">
        <ViewModeToggle selected={viewMode} onChange={actions.setViewMode} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="xl:col-span-7 xl:sticky xl:top-24">
          <ShowcaseStage selectors={selectors} theme={theme} />
        </div>
        <div className="xl:col-span-5">
          <GuidancePanel selectors={selectors} actions={actions} theme={theme} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  ETIQUETTE NOTE (Per-chapter)                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function ChapterEtiquetteNote({ chapter, theme }: { chapter: ChapterWardrobe; theme: ChapterTheme }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".en-el"), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" },
    });
  }, { scope: ref, dependencies: [chapter.id] });

  return (
    <section ref={ref} className="max-w-3xl mx-auto px-6 py-16 md:py-24" key={chapter.id}>
      <div className="en-el relative p-8 md:p-12 rounded-lg" style={{ border: `1px solid ${P.cream}08`, backgroundColor: "rgba(255,255,255,0.012)", boxShadow: `0 2px 30px rgba(0,0,0,0.15), inset 0 1px 0 ${P.cream}05` }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 flex items-center justify-center"
          style={{ border: `1px solid ${theme.accent}30`, backgroundColor: P.bgDeep, boxShadow: `0 0 12px ${theme.accentGlow}` }}
        >
          <span className="text-sm -rotate-45" style={{ color: theme.accent }}>✦</span>
        </div>

        <div className="text-center">
          <span className="en-el text-[9px] uppercase tracking-[0.4em] font-body mb-6 block" style={{ color: theme.accent }}>Etiquette Note</span>
          <p className="en-el font-serif italic text-base md:text-lg leading-[1.9]" style={{ color: `${P.cream}bb` }}>
            &ldquo;{chapter.etiquetteNote}&rdquo;
          </p>
          <div className="en-el mt-8 pt-6" style={{ borderTop: `1px solid ${P.cream}06` }}>
            <p className="text-[9px] uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}50` }}>
              {COUPLE.partner1} &amp; {COUPLE.partner2} — Styling Committee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  ASSEMBLED PAGE                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

export default function RoyalWardrobePage() {
  const { selectors, actions } = useWardrobePlanner();
  const reduced = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = CHAPTER_THEMES[selectors.selectedChapter] ?? CHAPTER_THEMES["pre-party"];

  const handleChapterChange = useCallback((newChapter: string) => {
    if (newChapter === selectors.selectedChapter || isTransitioning) return;
    if (reduced) {
      actions.setSelectedChapter(newChapter);
      return;
    }
    setIsTransitioning(true);
    const el = contentRef.current;
    if (!el) {
      actions.setSelectedChapter(newChapter);
      setIsTransitioning(false);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      y: 24,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => {
        actions.setSelectedChapter(newChapter);
        gsap.set(el, { opacity: 1, y: 0 });
        setIsTransitioning(false);
      },
    });
  }, [selectors.selectedChapter, isTransitioning, reduced, actions]);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: P.bg }}>
      <WardrobeHero />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center relative z-10">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500/60 mb-6 block">The Digital Atelier</span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-12" />
          <p className="max-w-2xl text-amber-200/50 font-serif italic text-lg md:text-2xl leading-relaxed">
            A curated manuscript of heritage silhouettes and digital couture for the royal celebration.
          </p>
        </div>
      </div>

      <ChapterRail
        selectedChapter={selectors.selectedChapter}
        onSelect={handleChapterChange}
      />

      <div ref={contentRef} className="pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto mb-10 mt-12">
          <ViewModeToggle selected={selectors.viewMode} onChange={actions.setViewMode} />
        </div>

        {selectors.viewMode === "illustration" ? (
          /* LOOKBOOK EXPERIENCE: Editorial & Grid */
          <div className="space-y-24">
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="xl:col-span-8">
                <ShowcaseStage selectors={selectors} theme={theme} />
              </div>
              <div className="xl:col-span-4">
                <GuidancePanel selectors={selectors} actions={actions} theme={theme} />
              </div>
            </section>

          </div>
        ) : (
          /* CAMPAIGN EXPERIENCE: Cinematic & Interactive */
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16 items-start mt-8">
            <div className="xl:col-span-7 xl:sticky xl:top-24">
              <ShowcaseStage selectors={selectors} theme={theme} />
            </div>
            <div className="xl:col-span-1 hidden xl:flex flex-col items-center justify-center h-[75vh] opacity-20">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/40 my-8" />
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
            </div>
            <div className="xl:col-span-4">
              <GuidancePanel selectors={selectors} actions={actions} theme={theme} />

              <div className="mt-12 p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                <span className="text-[9px] uppercase tracking-[0.4em] text-amber-500/60 block mb-6">Stylist's Note</span>
                <p className="font-serif italic text-lg text-white/50 leading-relaxed">
                  "{selectors.currentWardrobe.etiquetteNote}"
                </p>
              </div>
            </div>
          </section>
        )}

        <Flourish className="mt-40 mb-20" accent={theme.accent} />
        {selectors.viewMode === "illustration" && <ChapterEtiquetteNote chapter={selectors.currentWardrobe} theme={theme} />}
      </div>

      <FloralVineSVG className="fixed bottom-0 right-0 h-[50vh] w-12 pointer-events-none opacity-[0.03] hidden lg:block" side="right" />
    </div>
  );
}
