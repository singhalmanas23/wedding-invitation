"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS } from "@/content/events";
import { WeddingEvent } from "@/types";
import Navbar from "@/components/layout/Navbar";
import FadeInView from "@/components/motion/FadeInView";

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  event: WeddingEvent;
}

/* ═══════════════════════════════════════════════════════════════════
   SVG SET — The Thrill Theory · उन्मुक्त रात्रि
   Neon magenta + cyan + deep plum. Surreal carnival chaos.
   (1) Distorted arch  (2) Ferris wheel  (3) Carousel canopy
   (4) Neon chandelier (5) Fragmented ornaments (6) Stage silhouette
   (7) Confetti/sparkle pack
   ═══════════════════════════════════════════════════════════════════ */

function DistortedArch({ accent, primary }: { accent: string; primary: string }) {
  return (
    <svg viewBox="0 0 560 620" className="distorted-arch w-[280px] md:w-[420px] lg:w-[500px] mx-auto" fill="none">
      {/* Warped outer arch — slightly asymmetric */}
      <path
        className="arch-s"
        d="M45 620 L42 290 Q38 195 108 125 Q168 68 235 38 Q268 22 285 18
           Q305 22 340 42 Q415 78 468 135 Q525 210 518 300 L515 620"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Inner warped arch */}
      <path
        className="arch-s"
        d="M72 615 L68 298 Q65 210 128 148 Q182 92 242 62 Q272 48 288 44
           Q308 50 342 68 Q405 100 452 158 Q500 222 496 305 L492 615"
        stroke={primary}
        strokeWidth="0.7"
        opacity="0.4"
      />
      {/* Glitch fragment lines */}
      <path className="glitch-line" d="M120 180 L145 175" stroke={accent} strokeWidth="0.8" opacity="0" />
      <path className="glitch-line" d="M420 190 L445 195" stroke={primary} strokeWidth="0.8" opacity="0" />
      <path className="glitch-line" d="M200 80 L230 78" stroke={accent} strokeWidth="0.6" opacity="0" />
      <path className="glitch-line" d="M340 75 L370 80" stroke={primary} strokeWidth="0.6" opacity="0" />
      {/* Fragmented keystone */}
      <path className="arch-s" d="M278 24 L285 6 L292 24" stroke={accent} strokeWidth="0.7" opacity="0.5" />
      <path className="glitch-line" d="M284 8 L290 12" stroke={primary} strokeWidth="0.5" opacity="0" />
      {/* Broken crest piece */}
      <circle className="arch-s" cx="285" cy="6" r="5" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <path className="arch-s" d="M280 6 L285 -2 L290 6" stroke={primary} strokeWidth="0.4" opacity="0.3" />
    </svg>
  );
}

function FerrisWheel({ accent, primary }: { accent: string; primary: string }) {
  const spokes = 12;
  return (
    <svg viewBox="0 0 300 320" className="ferris-wheel w-[180px] md:w-[240px]" fill="none">
      {/* Outer rim */}
      <circle className="fw-rim" cx="150" cy="140" r="120" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle className="fw-rim" cx="150" cy="140" r="115" stroke={primary} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8" />
      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i * 360 / spokes) * (Math.PI / 180);
        const x2 = 150 + Math.cos(a) * 118;
        const y2 = 140 + Math.sin(a) * 118;
        return (
          <line key={`sp${i}`} className="fw-spoke" x1="150" y1="140" x2={x2} y2={y2}
            stroke={i % 2 === 0 ? accent : primary} strokeWidth="0.4" opacity="0.2" />
        );
      })}
      {/* Gondola pods at spoke ends */}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i * 360 / spokes) * (Math.PI / 180);
        const cx = 150 + Math.cos(a) * 120;
        const cy = 140 + Math.sin(a) * 120;
        return (
          <rect key={`gd${i}`} className="fw-pod" x={cx - 4} y={cy - 3} width="8" height="6" rx="1"
            stroke={i % 3 === 0 ? accent : primary} strokeWidth="0.3" opacity="0.12" fill={`${i % 2 === 0 ? accent : primary}06`} />
        );
      })}
      {/* Hub */}
      <circle cx="150" cy="140" r="8" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <circle cx="150" cy="140" r="3" fill={`${accent}20`} />
      {/* Support legs */}
      <path d="M150 140 L100 310" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <path d="M150 140 L200 310" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <path d="M90 310 L210 310" stroke={accent} strokeWidth="0.4" opacity="0.1" />
    </svg>
  );
}

function CarouselCanopy({ accent, primary }: { accent: string; primary: string }) {
  const stripeColors = ["#ff006e", "#00f5d4", "#8338ec", "#ffbe0b", "#fb5607", "#3a86ff", "#ff006e", "#00f5d4"];
  return (
    <svg viewBox="0 0 260 80" className="carousel-canopy w-[160px] md:w-[220px]" fill="none">
      <path d="M20 70 Q60 15 130 8 Q200 15 240 70" stroke={accent} strokeWidth="0.8" opacity="0.3" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x1 = 30 + i * 28;
        const x2 = 44 + i * 28;
        const y1t = 15 + Math.abs(i - 3.5) * 4;
        return (
          <path key={`cs${i}`} className="carousel-stripe"
            d={`M${x1} 70 Q${(x1 + x2) / 2} ${y1t} ${x2} 70`}
            fill={`${stripeColors[i]}10`}
            stroke={stripeColors[i]} strokeWidth="0.35" opacity="0.25" />
        );
      })}
      <path d="M20 68 Q32 74 44 68 Q56 74 68 68 Q80 74 92 68 Q104 74 116 68 Q128 74 140 68 Q152 74 164 68 Q176 74 188 68 Q200 74 212 68 Q224 74 240 68"
        stroke="#ffbe0b" strokeWidth="0.4" opacity="0.2" />
      <circle cx="130" cy="8" r="3.5" stroke="#ffbe0b" strokeWidth="0.5" opacity="0.3" fill="#ffbe0b08" />
    </svg>
  );
}

function NeonChandelier({ accent, primary }: { accent: string; primary: string }) {
  return (
    <svg viewBox="0 0 80 100" className="neon-chandelier w-[40px] md:w-[50px]" fill="none">
      <path d="M40 0 L40 20" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="40" cy="24" rx="18" ry="4" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      {[-15, -5, 5, 15].map((dx, i) => {
        const colors = [accent, "#ffbe0b", primary, "#3a86ff"];
        return (
          <g key={i}>
            <path d={`M40 24 Q${40 + dx} ${36 + Math.abs(dx)} ${40 + dx} ${42 + Math.abs(dx) * 0.5}`} stroke={colors[i]} strokeWidth="0.4" opacity="0.3" />
            <path d={`M${40 + dx - 2} ${44 + Math.abs(dx) * 0.5} L${40 + dx} ${52 + Math.abs(dx) * 0.5} L${40 + dx + 2} ${44 + Math.abs(dx) * 0.5}`} stroke={colors[i]} strokeWidth="0.3" opacity="0.25" fill={`${colors[i]}15`} />
          </g>
        );
      })}
      <path d="M40 24 L40 55" stroke={primary} strokeWidth="0.4" opacity="0.2" />
      <path d="M36 55 L40 68 L44 55" stroke={accent} strokeWidth="0.4" opacity="0.3" fill={`${primary}12`} />
      <circle className="neon-glow" cx="40" cy="45" r="25" fill={`${accent}00`} />
    </svg>
  );
}

function FragmentedJaali({ accent }: { accent: string }) {
  return (
    <svg className="frag-jaali absolute inset-0 w-full h-full opacity-0" preserveAspectRatio="none" viewBox="0 0 400 400">
      <defs>
        <pattern id="fjaali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 0 Q52 12 50 25" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.04" />
          <path d="M0 40 Q15 35 25 42" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.04" />
          <path d="M60 60 Q70 55 80 62" stroke={accent} strokeWidth="0.15" fill="none" opacity="0.03" />
          <circle cx="40" cy="40" r="2" stroke={accent} strokeWidth="0.15" fill="none" opacity="0.03" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#fjaali)" />
    </svg>
  );
}

function StageSilhouette({ accent, primary }: { accent: string; primary: string }) {
  return (
    <svg viewBox="0 0 400 200" className="stage-svg w-[240px] md:w-[340px] mx-auto opacity-0" fill="none">
      <path d="M40 200 L40 140 L360 140 L360 200" stroke={accent} strokeWidth="0.8" opacity="0.4" />
      <path d="M30 200 L370 200" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <path d="M120 140 L120 60 Q120 30 160 18 Q190 10 200 8 Q210 10 240 18 Q280 30 280 60 L280 140" stroke={primary} strokeWidth="0.9" opacity="0.4" />
      <path d="M140 140 L140 70 Q140 45 175 32 Q195 24 200 22 Q205 24 225 32 Q260 45 260 70 L260 140" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <path d="M100 55 L300 55" stroke="#ffbe0b" strokeWidth="0.4" opacity="0.25" />
      {[120, 160, 200, 240, 280].map((x, i) => {
        const lightColors = ["#ff006e", "#00f5d4", "#ffbe0b", "#8338ec", "#3a86ff"];
        return (
          <g key={`lr${x}`}>
            <path d={`M${x} 55 L${x} 65`} stroke={lightColors[i]} strokeWidth="0.3" opacity="0.2" />
            <circle cx={x} cy={67} r="2.5" fill={`${lightColors[i]}18`} stroke={lightColors[i]} strokeWidth="0.25" opacity="0.2" />
          </g>
        );
      })}
      <circle cx="200" cy="8" r="3.5" stroke="#ffbe0b" strokeWidth="0.5" opacity="0.3" fill="#ffbe0b08" />
    </svg>
  );
}

function NeonDivider({ accent, primary }: { accent: string; primary: string }) {
  return (
    <svg viewBox="0 0 320 20" className="w-40 md:w-52 h-auto mx-auto" fill="none">
      <defs>
        <linearGradient id="neon-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primary} stopOpacity="0" />
          <stop offset="30%" stopColor={primary} stopOpacity="0.5" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="70%" stopColor="#ffbe0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8338ec" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="10" x2="320" y2="10" stroke="url(#neon-line-grad)" strokeWidth="1" />
      <path d="M150 10 L160 2 L170 10 L160 18Z" stroke={primary} strokeWidth="0.6" opacity="0.5" fill={`${primary}12`} />
      <circle cx="160" cy="10" r="2" fill={accent} opacity="0.4" />
      <circle cx="132" cy="10" r="1" fill="#ffbe0b" opacity="0.3" />
      <circle cx="188" cy="10" r="1" fill="#8338ec" opacity="0.3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   THRILL THEORY INTRO
   introTl: arch draws → glitch distortion → title chromatic reveal
   → curtains slide asymmetrically
   ═══════════════════════════════════════════════════════════════════ */

function ThrillIntro({
  event,
  onComplete,
}: {
  event: WeddingEvent;
  onComplete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { palette } = event;

  const introSparks = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 1 + Math.random() * 4,
      color: ["#ff006e", "#00f5d4", "#8338ec", "#ffbe0b", "#fb5607", "#3a86ff"][i % 6],
    })),
    []
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.3, delay: 0.15, onComplete });
        },
      });

      introTl.fromTo(".intro-pulse-ring", { scale: 0, opacity: 0.8 }, { scale: 4, opacity: 0, duration: 1.2, stagger: 0.25, ease: "power2.out" }, 0);

      introTl.fromTo(
        el.querySelectorAll(".intro-spark"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.7, duration: 0.15, stagger: { each: 0.02, from: "random" }, ease: "back.out(3)" },
        0.3
      );
      introTl.to(
        el.querySelectorAll(".intro-spark"),
        { opacity: 0, scale: 0.3, duration: 0.4, stagger: { each: 0.01, from: "random" } },
        1.5
      );

      introTl.fromTo(".fw-intro", { rotation: 0, opacity: 0 }, { rotation: 45, opacity: 0.25, duration: 2, ease: "power1.inOut" }, 0.2);

      introTl.fromTo(".intro-flash", { opacity: 0 }, { opacity: 0.6, duration: 0.05, yoyo: true, repeat: 3, ease: "steps(1)" }, 0.8);

      introTl.fromTo(".intro-bg",
        { background: "radial-gradient(circle,#0a0614 0%,#06040a 100%)" },
        { background: "radial-gradient(circle,#1a0a2e 0%,#0a0614 100%)", duration: 0.8, ease: "power2.inOut" },
        0.4
      );

      introTl.fromTo(
        el.querySelectorAll(".it-c"),
        { opacity: 0, y: 30, scale: 1.3 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, stagger: 0.018, ease: "back.out(2)" },
        1.0
      );

      introTl.fromTo(
        el.querySelectorAll(".is-c"),
        { opacity: 0, x: "random(-8, 8)" },
        { opacity: 1, x: 0, duration: 0.12, stagger: 0.015, ease: "power3.out" },
        1.6
      );

      introTl.fromTo(
        el.querySelector(".sub-tag"),
        { opacity: 0, letterSpacing: "0.8em" },
        { opacity: 1, letterSpacing: "0.2em", duration: 0.6, ease: "power3.out" },
        2.0
      );

      introTl.fromTo(
        el.querySelectorAll(".neon-bar"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" },
        2.2
      );

      introTl.fromTo(".intro-bg",
        { background: "radial-gradient(circle,#1a0a2e 0%,#0a0614 100%)" },
        { background: "radial-gradient(circle,#2a1240 0%,#0d0818 100%)", duration: 0.5 },
        2.4
      );
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#06040a" }}
    >
      <div className="intro-bg absolute inset-0" />

      {/* Pulse rings — expanding neon circles */}
      {["#ff006e", "#00f5d4", "#8338ec"].map((color, i) => (
        <div
          key={i}
          className="intro-pulse-ring absolute rounded-full"
          style={{
            width: 80, height: 80,
            top: "50%", left: "50%",
            marginTop: -40, marginLeft: -40,
            border: `2px solid ${color}`,
            opacity: 0,
          }}
        />
      ))}

      {/* Spark burst */}
      {introSparks.map((s, i) => (
        <div
          key={i}
          className="intro-spark absolute rounded-full"
          style={{
            width: s.s, height: s.s,
            left: `${s.x}%`, top: `${s.y}%`,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.s * 3}px ${s.color}60`,
          }}
        />
      ))}

      {/* Flash */}
      <div className="intro-flash absolute inset-0 bg-white opacity-0 pointer-events-none" />

      {/* Background ferris wheel — rotates slowly */}
      <div className="fw-intro absolute opacity-0" style={{ top: "15%", right: "-5%" }}>
        <FerrisWheel accent="#00f5d4" primary="#ff006e" />
      </div>

      {/* Title content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="text-3xl md:text-5xl lg:text-6xl mb-3 tracking-[0.04em] font-bold whitespace-nowrap" style={{ color: "#ff006e", textShadow: "0 0 40px #ff006e50, 0 0 80px #ff006e20" }}>
          {"The Thrill Theory".split("").map((c, i) => (
            <span key={i} className="it-c inline-block opacity-0" style={c === " " ? { whiteSpace: "pre" } : undefined}>{c}</span>
          ))}
        </p>
        <p className="font-hindi text-sm md:text-base uppercase font-medium whitespace-nowrap" style={{ color: "#00f5d4" }}>
          {"उन्मुक्त रात्रि".split(" ").map((word, i) => (
            <span key={i} className="is-c inline-block opacity-0 mr-[0.3em]">{word}</span>
          ))}
        </p>
        <p className="sub-tag mt-5 text-xs uppercase tracking-[0.8em] font-bold opacity-0" style={{ color: "#ffbe0b" }}>
          Speed &amp; Sparkle
        </p>

        {/* Neon bars */}
        <div className="flex items-center gap-3 mt-6">
          <div className="neon-bar h-[2px] w-12 md:w-20 origin-left" style={{ backgroundColor: "#ff006e", boxShadow: "0 0 8px #ff006e60" }} />
          <div className="neon-bar h-[2px] w-8 md:w-14 origin-left" style={{ backgroundColor: "#00f5d4", boxShadow: "0 0 8px #00f5d460" }} />
          <div className="neon-bar h-[2px] w-12 md:w-20 origin-left" style={{ backgroundColor: "#8338ec", boxShadow: "0 0 8px #8338ec60" }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO — 4 High-Impact Beats
   Beat 1: Title + glitched arch lock
   Beat 2: Environment distorts (light streaks, gradient pulses, curtains)
   Beat 3: Energy spike (confetti, ferris rotation, neon chandeliers)
   Beat 4: Final drop (stage silhouette + radial glow + bass pulse)
   ═══════════════════════════════════════════════════════════════════ */

function ThrillHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const confetti = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 80,
      s: 1.5 + Math.random() * 3.5,
      rot: Math.random() * 360,
      color: ["#ff006e", "#00f5d4", "#8338ec", "#ffbe0b", "#fb5607", "#3a86ff", "#ff006e", "#00f5d4"][i % 8],
    })),
    [palette]
  );

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const heroArchPaths = pin.querySelectorAll<SVGGeometryElement>(".hero-arch .arch-s");
      heroArchPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=15%",
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      /* ── Beat 1: Title + arch ── */
      scrollTl.to(heroArchPaths, { strokeDashoffset: 0, duration: 0.15, stagger: 0.015, ease: "power2.inOut" }, 0);
      scrollTl.fromTo(".b1-content", { opacity: 0.8 }, { opacity: 1, duration: 0.06 }, 0);
      scrollTl.to(pin.querySelectorAll(".hero-arch .glitch-line"), {
        opacity: 0.5, duration: 0.02, stagger: { each: 0.01, repeat: 2, yoyo: true }, ease: "steps(2)",
      }, 0.12);

      /* ── Beat 2: Environment distorts ── */
      scrollTl.fromTo(
        ".thrill-bg",
        { background: `linear-gradient(180deg,#06040a 0%,#0a0614 30%,#0d0818 60%,${palette.background} 100%)` },
        { background: `linear-gradient(180deg,#0d0818 0%,#1f0a35 30%,#35104a 60%,#0a0614 100%)`, duration: 0.2 },
        0.18
      );
      scrollTl.fromTo(
        pin.querySelectorAll(".light-streak"),
        { opacity: 0, x: -120 },
        { opacity: 0.15, x: 120, duration: 0.2, stagger: 0.02 },
        0.2
      );
      scrollTl.fromTo(".gradient-pulse", { opacity: 0 }, { opacity: 0.12, duration: 0.15 }, 0.22);
      scrollTl.fromTo(".frag-jaali", { opacity: 0 }, { opacity: 0.04, duration: 0.12 }, 0.25);

      /* ── Beat 3: Energy spike ── */
      scrollTl.fromTo(
        ".thrill-bg",
        { background: `linear-gradient(180deg,#0d0818 0%,#1f0a35 30%,#35104a 60%,#0a0614 100%)` },
        { background: `linear-gradient(180deg,#180a28 0%,#381558 30%,#4a1860 60%,#0d0818 100%)`, duration: 0.15 },
        0.42
      );
      scrollTl.fromTo(
        pin.querySelectorAll(".confetti-bit"),
        { opacity: 0, scale: 0 },
        { opacity: 0.5, scale: 1, stagger: 0.005, duration: 0.08, ease: "back.out(3)" },
        0.45
      );
      scrollTl.fromTo(".ferris-wrap", { opacity: 0, rotation: 0 }, { opacity: 0.3, rotation: 30, duration: 0.3 }, 0.42);
      scrollTl.fromTo(".carousel-wrap", { opacity: 0, y: -20 }, { opacity: 0.25, y: 0, duration: 0.12 }, 0.48);

      scrollTl.to(pin.querySelectorAll(".neon-glow"), { fill: `${palette.accent}10`, duration: 0.1, stagger: 0.02 }, 0.5);
      scrollTl.fromTo(
        pin.querySelectorAll(".neon-chandelier-wrap"),
        { opacity: 0 },
        { opacity: 0.5, duration: 0.08, stagger: 0.03 },
        0.48
      );

      scrollTl.fromTo(".beam-sweep", { opacity: 0, rotation: -15 }, { opacity: 0.08, rotation: 15, duration: 0.25 }, 0.45);

      /* ── Beat 4: Final drop ── */
      scrollTl.fromTo(".stage-svg", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.72);
      scrollTl.fromTo(
        ".drop-glow",
        { opacity: 0, scale: 0.4 },
        { opacity: 0.3, scale: 1.3, duration: 0.2, ease: "power2.out" },
        0.75
      );
      scrollTl.fromTo(".b4-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0.8);

      gsap.to(".drop-glow", {
        scale: "random(1.2, 1.4)",
        opacity: "random(0.2, 0.35)",
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="thrill-bg absolute inset-0"
          style={{ background: `linear-gradient(180deg,#06040a 0%,#0a0614 30%,#0d0818 60%,${palette.background} 100%)` }}
        />

        <FragmentedJaali accent={palette.accent} />

        {/* Gradient pulse layer — vibrant multi-color */}
        <div
          className="gradient-pulse absolute inset-0 pointer-events-none opacity-0"
          style={{ background: `radial-gradient(ellipse 50% 60% at 40% 45%,#ff006e18,transparent 50%),radial-gradient(ellipse 40% 50% at 65% 55%,#8338ec15,transparent 50%),radial-gradient(ellipse 35% 40% at 50% 30%,#00f5d410,transparent 50%)` }}
        />

        {/* Light streaks */}
        {[18, 38, 58, 75].map((top, i) => (
          <div
            key={`ls${top}`}
            className="light-streak absolute h-px opacity-0 pointer-events-none"
            style={{
              top: `${top}%`,
              left: 0, right: 0,
              background: `linear-gradient(${100 + i * 15}deg,transparent 5%,${["#ff006e", "#00f5d4", "#8338ec", "#ffbe0b"][i]}20 35%,${["#8338ec", "#ff006e", "#00f5d4", "#fb5607"][i]}12 55%,transparent 90%)`,
              transform: `rotate(${-5 + i * 3}deg)`,
            }}
          />
        ))}

        {/* Beam sweep */}
        <div
          className="beam-sweep absolute pointer-events-none opacity-0"
          style={{
            width: "120%", height: "120%",
            top: "-10%", left: "-10%",
            background: `conic-gradient(from 0deg at 50% 50%,transparent 0deg,${palette.accent}06 30deg,transparent 60deg,${palette.primary}05 120deg,transparent 150deg,${palette.secondary}04 240deg,transparent 270deg)`,
          }}
        />

        {/* Ferris wheel — background right */}
        <div className="ferris-wrap absolute top-[5%] right-[-5%] md:right-[2%] pointer-events-none opacity-0" style={{ transformOrigin: "center center" }}>
          <FerrisWheel accent={palette.accent} primary={palette.primary} />
        </div>

        {/* Carousel — background left */}
        <div className="carousel-wrap absolute top-[12%] left-[5%] md:left-[8%] pointer-events-none opacity-0">
          <CarouselCanopy accent={palette.accent} primary={palette.primary} />
        </div>

        {/* Neon chandeliers */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-12 md:gap-20 pointer-events-none">
          {["nc1", "nc2", "nc3"].map((id) => (
            <div key={id} className="neon-chandelier-wrap opacity-0">
              <NeonChandelier accent={palette.accent} primary={palette.primary} />
            </div>
          ))}
        </div>

        {/* Confetti burst */}
        {confetti.map((c, i) => (
          <div
            key={`cf${i}`}
            className="confetti-bit absolute opacity-0"
            style={{
              width: c.s, height: c.s * (i % 3 === 0 ? 1 : 2.5),
              left: `${c.x}%`, top: `${c.y}%`,
              backgroundColor: `${c.color}80`,
              boxShadow: `0 0 ${c.s * 2}px ${c.color}40`,
              borderRadius: i % 4 === 0 ? "50%" : "1px",
              transform: `rotate(${c.rot}deg)`,
            }}
          />
        ))}

        {/* Drop glow (Beat 4) */}
        <div
          className="drop-glow absolute pointer-events-none opacity-0"
          style={{
            width: "50%", height: "40%",
            bottom: "15%", left: "25%",
            background: `radial-gradient(circle,#ff006e25,#8338ec15,#00f5d40a,transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Background arch */}
        <div className="hero-arch absolute inset-0 flex items-end justify-center pointer-events-none pb-0">
          <DistortedArch accent={palette.accent} primary={palette.primary} />
        </div>

        {/* ── BEAT 1: Title ── */}
        <div className="b1-content absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <p className="text-4xl md:text-6xl lg:text-7xl tracking-[0.04em] mb-2 font-bold" style={{ color: "#ff006e", textShadow: "0 0 30px #ff006e50, 0 0 60px #ff006e20, 0 0 100px #ff006e10" }}>
            The Thrill Theory
          </p>
          <h1 className="text-base md:text-xl uppercase tracking-[0.35em] font-medium mb-2" style={{ color: "#00f5d4", textShadow: "0 0 20px #00f5d430" }}>
            उन्मुक्त रात्रि
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#ffbe0b" }}>
            Speed &amp; Sparkle &mdash; Press Play on the Chaos
          </p>
          <div className="flex items-center gap-6">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon size={14} style={{ color: "#00f5d4" }} className="mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: `${palette.foreground}70` }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BEAT 4: Stage + final drop (hidden on mobile to prevent overlap) ── */}
        <div className="b4-content absolute bottom-20 left-1/2 -translate-x-1/2 z-10 opacity-0 text-center hidden md:block">
          <StageSilhouette accent={palette.accent} primary={palette.primary} />
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: "#ffbe0b88" }}>
            Step Inside. Get Lost.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 z-[6] pointer-events-none" style={{ background: `linear-gradient(to top,${palette.background},transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function ThrillQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote = "Step inside and forget everything you know about afterparties.";

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".aq-w"), { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,${palette.background},#1a0a2e15,${palette.background})` }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <NeonDivider accent="#00f5d4" primary="#ff006e" />
        <p className="italic text-xl md:text-2xl mt-8 leading-relaxed font-medium" style={{ color: `${palette.foreground}88` }}>
          &ldquo;{quote.split(" ").map((w, i) => (<span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>))}&rdquo;
        </p>
        <p className="text-3xl md:text-5xl mt-6 tracking-[0.15em] font-black uppercase" style={{ color: "#ff006e18", textShadow: "0 0 60px #ff006e08" }}>CHAOS</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STORY + DRESS CODE + GALLERY + VENUE
   ═══════════════════════════════════════════════════════════════════ */

function StorySection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const excerpt = useMemo(() => {
    const sentences = event.longDescription.split(/(?<=[.!])\s+/);
    return sentences.slice(0, 2).join(" ").trim() || event.longDescription.slice(0, 280);
  }, [event.longDescription]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".story-quote"), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-6 relative" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: "#00f5d4" }}>The Vibe · माहौल</p>
        <NeonDivider accent={palette.accent} primary={palette.primary} />
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 mb-6 px-2" style={{ color: `${palette.foreground}dd` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
        <NeonDivider accent={palette.accent} primary={palette.primary} />
      </div>
    </section>
  );
}

function ThrillDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".dc-c"), { opacity: 0, y: 35 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
    gsap.fromTo(el.querySelectorAll(".dc-i"), { opacity: 0, x: -10 }, {
      opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%,${palette.primary}06,transparent 70%)` }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12 font-bold text-center" style={{ color: "#00f5d4" }}>Attire · वेश विधान</p>
        <div className="dc-c relative rounded-sm p-10 md:p-14 opacity-0" style={{ background: `linear-gradient(165deg,${palette.muted}50,${palette.background} 50%,${palette.muted}40)`, border: `1px solid #ff006e25`, boxShadow: `inset 0 0 60px #ff006e08, inset 0 0 30px #8338ec06` }}>
          <div className="text-center mb-10">
            <p className="text-2xl md:text-3xl tracking-[0.04em] mb-3 font-bold" style={{ color: "#ff006e", textShadow: "0 0 20px #ff006e20" }}>{dressCode.title}</p>
            <div className="w-20 h-[2px] mx-auto mb-5" style={{ background: `linear-gradient(90deg,#ff006e40,#00f5d450,#8338ec40)` }} />
            <p className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto" style={{ color: `${palette.foreground}99` }}>{dressCode.description}</p>
          </div>
          <div className="mb-10"><NeonDivider accent={palette.accent} primary={palette.primary} /></div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-bold" style={{ color: "#00f5d4" }}>Go For</h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#ff006e", boxShadow: "0 0 6px #ff006e60" }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}cc` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-bold" style={{ color: `${palette.foreground}60` }}>Skip</h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${palette.foreground}30` }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}77` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThrillMoodSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      {/* Continuity texture & neon-pulse */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, #ff006e20, transparent 50%), radial-gradient(circle at 70% 30%, #00f5d415, transparent 50%), url("https://www.transparenttextures.com/patterns/asfalt-dark.png")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Magazine-style Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#ff006e] opacity-30" />
            <p
              className="text-[10px] uppercase tracking-[0.5em] font-bold"
              style={{ color: "#00f5d4" }}
            >
              The Aftermath Narrative · उन्मुक्त
            </p>
            <div className="h-px w-8 bg-[#8338ec] opacity-30" />
          </div>

          <h3
            className="text-5xl md:text-7xl mb-10 tracking-tight font-black"
            style={{ color: "#f0f0f5", textShadow: "0 0 40px #ff006e20" }}
          >
            Neon <span className="opacity-40 italic font-serif">&amp;</span> Rebellion
          </h3>

          <p className="max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed opacity-70">
            A psychedelic sanctuary where the echoes of childhood meet the high-speed madness of letting go.
          </p>
        </div>

        {/* Featured Gallery Piece */}
        <div className="relative max-w-5xl mx-auto">
          {/* Chromatic border effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#ff006e] via-[#00f5d4] to-[#8338ec] opacity-20 blur-sm pointer-events-none z-0" />
          <div className="absolute -inset-1 border border-white/10 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-[#ff006e]/10 blur-3xl opacity-20 -z-10" />

          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0f]">
            {/* Subtle psychedelic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff006e]/5 to-[#00f5d4]/5 z-10 pointer-events-none" />

            <Image
              src={event.heroImage}
              alt={`${event.title} Mood`}
              fill
              className="object-cover transition-transform duration-[6s] hover:scale-110"
              priority
            />

            {/* Mood Vignette - Neon Dark */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, #0a0a0fdd 0%, transparent 15%, transparent 85%, #0a0a0fee 100%)`,
              }}
            />
          </div>

          {/* Decorative Label */}
          <div className="absolute -bottom-6 right-12 z-20">
            <p
              className="font-serif italic text-sm opacity-40 text-[#00f5d4]"
            >
              Archive Ref. 06 — The Psychedelic Aftermath
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThrillVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: "#00f5d4" }}>Venue · स्थान</p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: palette.foreground }}>{event.location}</h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}88` }}>{event.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — SeventhChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function SeventhChapterContent({ event }: ChapterProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { palette } = event;

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.background, color: palette.foreground }}>
      {!introComplete && !prefersReducedMotion && (
        <ThrillIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <ThrillHero event={event} />
      <ThrillQuote event={event} />

      <FadeInView>
        <section className="border-y py-8" style={{ borderColor: `#ff006e15`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: CalendarDays, label: `${event.date} · ${event.day}` },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: `${event.location}, ${event.venue}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm" style={{ color: `${palette.foreground}aa` }}>
                <Icon size={16} style={{ color: "#00f5d4" }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      <StorySection event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><NeonDivider accent={palette.accent} primary={palette.primary} /></div>
      <ThrillDressCode event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><NeonDivider accent={palette.accent} primary={palette.primary} /></div>
      <ThrillMoodSection event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><NeonDivider accent={palette.accent} primary={palette.primary} /></div>
      <ThrillVenue event={event} />

      {/* Chapter navigation */}
      <FadeInView>
        <section className="py-8 md:py-10 px-6 border-t" style={{ borderColor: `#ff006e15`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Link href="/itinerary" className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3" style={{ color: `${palette.foreground}88` }}>
                <ArrowLeft size={14} /> Back to Itinerary
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {prevEvent && (
                <Link href={`/chapter/${prevEvent.slug}`} className="group rounded-xl overflow-hidden border transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}20` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={prevEvent.heroImage} alt={prevEvent.title} fill className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}55` }}>← Previous Chapter</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{prevEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{prevEvent.subtitle}</p>
                  </div>
                </Link>
              )}
              {!prevEvent && <div />}
              {nextEvent && (
                <Link href={`/chapter/${nextEvent.slug}`} className="group rounded-xl overflow-hidden border text-right transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}20` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={nextEvent.heroImage} alt={nextEvent.title} fill className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}55` }}>Next Chapter →</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{nextEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{nextEvent.subtitle}</p>
                  </div>
                </Link>
              )}
              {!nextEvent && <div />}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Footer */}
      <footer className="relative" style={{ backgroundColor: palette.background, borderTop: `1px solid #ff006e20` }}>
        <div className="absolute -top-20 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to bottom,transparent,${palette.background})` }} />
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <NeonDivider accent="#00f5d4" primary="#ff006e" />
          <p className="text-sm mb-4 mt-6 tracking-[0.3em] font-bold uppercase" style={{ color: "#ff006e66", textShadow: "0 0 20px #ff006e15" }}>The End</p>
          <p className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: `${palette.foreground}dd` }}>
            Tarush <span style={{ color: "#ffbe0b88" }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] font-body mb-10" style={{ color: "#00f5d466" }}>#TarushAndSanjana</p>

          <div className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg" style={{ border: "1px solid #ff006e18", background: "linear-gradient(165deg,#ff006e06,transparent 40%,#8338ec06)" }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-bold" style={{ color: "#00f5d455" }}>Your Presence Matters</p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic" style={{ color: `${palette.foreground}bb` }}>
              The celebration is incomplete without you.
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: `${palette.foreground}bb` }}>
              We eagerly await your presence.
            </p>
            <p className="mt-5 text-sm tracking-[0.08em]" style={{ color: "#ffbe0b66" }}>
              आपकी उपस्थिति हमारा सम्मान है
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/rsvp" className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm hover:scale-105" style={{ backgroundColor: "#ff006e20", color: "#ff006e", border: "1px solid #ff006e30" }}>
                RSVP Now
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-10">
            {[{ href: "/itinerary", label: "Itinerary" }, { href: "/rsvp", label: "RSVP" }, { href: "/travel", label: "Travel" }].map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80" style={{ color: `${palette.foreground}66` }}>{link.label}</Link>
            ))}
          </div>
          <p className="text-[11px] font-body tracking-wide" style={{ color: `${palette.foreground}40` }}>April 19–21, 2026 · Udaipur, Rajasthan</p>
        </div>
      </footer>
    </div>
  );
}
