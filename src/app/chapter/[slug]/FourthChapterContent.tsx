"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS, COUPLE } from "@/content/events";
import { WeddingEvent } from "@/types";
import Navbar from "@/components/layout/Navbar";
import FadeInView from "@/components/motion/FadeInView";

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  event: WeddingEvent;
}

/* ═══════════════════════════════════════════════════════════════════
   SVG SET — The Midnight Cathedral · रात्रि महोत्सव
   Deep indigo/emerald + gold. Architectural drama.
   (1) Cathedral arches  (2) Chandelier clusters  (3) Baroque overlay
   (4) Stage canopy      (5) Corner filigree       (6) Velvet drapes
   ═══════════════════════════════════════════════════════════════════ */

function CathedralArches({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 600 700" className="cathedral-arches w-[320px] md:w-[480px] lg:w-[560px] mx-auto" fill="none">
      {/* Outer arch — grand pointed gothic-mughal hybrid */}
      <path
        className="arch-s"
        d="M40 700 L40 320 Q40 200 120 130 Q180 78 250 42 Q280 28 300 22
           Q320 28 350 42 Q420 78 480 130 Q560 200 560 320 L560 700"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Second arch — slightly inset */}
      <path
        className="arch-s"
        d="M70 695 L70 330 Q70 218 145 152 Q200 102 260 68 Q285 52 300 46
           Q315 52 340 68 Q400 102 455 152 Q530 218 530 330 L530 695"
        stroke={accent}
        strokeWidth="0.9"
        opacity="0.55"
      />
      {/* Third arch — innermost */}
      <path
        className="arch-s"
        d="M105 690 L105 340 Q105 240 170 180 Q220 130 270 100 Q290 88 300 82
           Q310 88 330 100 Q380 130 430 180 Q495 240 495 340 L495 690"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.35"
      />
      {/* Keystone ornament at apex */}
      <path
        className="arch-s"
        d="M290 28 L300 10 L310 28"
        stroke={accent}
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle className="arch-s" cx="300" cy="10" r="6" stroke={accent} strokeWidth="0.7" opacity="0.5" />
      <circle className="arch-s" cx="300" cy="10" r="2.5" fill={`${accent}25`} />
      {/* Capitals — decorative column tops */}
      <path className="arch-s" d="M30 320 L50 310 L50 330Z" stroke={accent} strokeWidth="0.5" opacity="0.3" fill={`${accent}08`} />
      <path className="arch-s" d="M570 320 L550 310 L550 330Z" stroke={accent} strokeWidth="0.5" opacity="0.3" fill={`${accent}08`} />
      {/* Column fluting */}
      <path className="arch-s" d="M40 330 L40 700" stroke={accent} strokeWidth="0.3" opacity="0.15" strokeDasharray="4 8" />
      <path className="arch-s" d="M560 330 L560 700" stroke={accent} strokeWidth="0.3" opacity="0.15" strokeDasharray="4 8" />
      <path className="arch-s" d="M45 330 L45 700" stroke={accent} strokeWidth="0.2" opacity="0.1" strokeDasharray="3 10" />
      <path className="arch-s" d="M555 330 L555 700" stroke={accent} strokeWidth="0.2" opacity="0.1" strokeDasharray="3 10" />
      {/* Spandrel decorative arcs */}
      <path className="arch-s" d="M120 160 Q150 140 180 130" stroke={accent} strokeWidth="0.35" opacity="0.25" />
      <path className="arch-s" d="M480 160 Q450 140 420 130" stroke={accent} strokeWidth="0.35" opacity="0.25" />
      <path className="arch-s" d="M140 200 Q180 170 220 155" stroke={accent} strokeWidth="0.25" opacity="0.18" />
      <path className="arch-s" d="M460 200 Q420 170 380 155" stroke={accent} strokeWidth="0.25" opacity="0.18" />
      {/* Trefoil at top */}
      <path className="arch-s" d="M270 65 Q280 50 290 55 Q300 42 310 55 Q320 50 330 65" stroke={accent} strokeWidth="0.4" opacity="0.3" />
    </svg>
  );
}

function ChandelierCluster({ accent, id }: { accent: string; id: string }) {
  return (
    <svg viewBox="0 0 120 160" className={`chandelier chandelier-${id} w-[60px] md:w-[80px]`} fill="none">
      {/* Chain */}
      <path className="ch-chain" d="M60 0 L60 30" stroke={accent} strokeWidth="0.6" opacity="0.4" />
      {/* Crown ring */}
      <ellipse className="ch-frame" cx="60" cy="35" rx="28" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      {/* Arms — 5 tiers radiating outward */}
      {[-2, -1, 0, 1, 2].map((i) => {
        const x = 60 + i * 18;
        const bend = 50 + Math.abs(i) * 12;
        return (
          <g key={i}>
            <path className="ch-frame" d={`M60 35 Q${x} ${bend} ${x} ${55 + Math.abs(i) * 6}`} stroke={accent} strokeWidth="0.4" opacity="0.35" />
            {/* Crystal drop */}
            <path className="ch-crystal" d={`M${x - 2} ${58 + Math.abs(i) * 6} L${x} ${68 + Math.abs(i) * 6} L${x + 2} ${58 + Math.abs(i) * 6}`} stroke={accent} strokeWidth="0.3" opacity="0.3" fill={`${accent}10`} />
            <circle className="ch-crystal" cx={x} cy={70 + Math.abs(i) * 6} r="1.5" fill={`${accent}15`} stroke={accent} strokeWidth="0.2" />
          </g>
        );
      })}
      {/* Center drop — large crystal */}
      <path className="ch-frame" d="M60 35 L60 75" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path className="ch-crystal" d="M55 75 L60 95 L65 75Z" stroke={accent} strokeWidth="0.4" opacity="0.35" fill={`${accent}08`} />
      <circle className="ch-crystal" cx="60" cy="98" r="2.5" fill={`${accent}18`} stroke={accent} strokeWidth="0.3" />
      {/* Glow halo — animated */}
      <circle className="ch-glow" cx="60" cy="65" r="40" fill={`${accent}00`} />
      {/* Swag chains between arms */}
      <path className="ch-frame" d="M42 53 Q50 58 60 55 Q70 58 78 53" stroke={accent} strokeWidth="0.2" opacity="0.2" />
      <path className="ch-frame" d="M24 65 Q40 72 60 67 Q80 72 96 65" stroke={accent} strokeWidth="0.2" opacity="0.15" />
    </svg>
  );
}

function BaroqueOverlay({ accent }: { accent: string }) {
  return (
    <svg className="baroque-overlay absolute inset-0 w-full h-full opacity-0" preserveAspectRatio="none" viewBox="0 0 400 400">
      <defs>
        <pattern id="baroque4" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Central medallion */}
          <circle cx="40" cy="40" r="18" stroke={accent} strokeWidth="0.3" fill="none" opacity="0.08" />
          <circle cx="40" cy="40" r="12" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.06" />
          {/* Petal quartet */}
          <path d="M40 22 Q36 30 40 34 Q44 30 40 22Z" stroke={accent} strokeWidth="0.2" opacity="0.07" />
          <path d="M40 58 Q36 50 40 46 Q44 50 40 58Z" stroke={accent} strokeWidth="0.2" opacity="0.07" />
          <path d="M22 40 Q30 36 34 40 Q30 44 22 40Z" stroke={accent} strokeWidth="0.2" opacity="0.07" />
          <path d="M58 40 Q50 36 46 40 Q50 44 58 40Z" stroke={accent} strokeWidth="0.2" opacity="0.07" />
          {/* Corner flourishes */}
          <path d="M0 0 Q10 5 8 15" stroke={accent} strokeWidth="0.15" opacity="0.05" />
          <path d="M80 0 Q70 5 72 15" stroke={accent} strokeWidth="0.15" opacity="0.05" />
          <path d="M0 80 Q10 75 8 65" stroke={accent} strokeWidth="0.15" opacity="0.05" />
          <path d="M80 80 Q70 75 72 65" stroke={accent} strokeWidth="0.15" opacity="0.05" />
          {/* Scroll connectors */}
          <path d="M10 40 Q20 35 22 40 Q20 45 10 40" stroke={accent} strokeWidth="0.15" opacity="0.05" />
          <path d="M70 40 Q60 35 58 40 Q60 45 70 40" stroke={accent} strokeWidth="0.15" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#baroque4)" />
    </svg>
  );
}

function StageCanopy({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 500 320" className="stage-canopy w-[280px] md:w-[400px] mx-auto opacity-0" fill="none">
      {/* Canopy dome */}
      <path
        className="canopy-s"
        d="M50 320 L50 140 Q50 80 120 50 Q180 25 250 15 Q320 25 380 50 Q450 80 450 140 L450 320"
        stroke={accent}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Inner scalloped edge */}
      <path
        className="canopy-s"
        d="M80 300 Q100 280 120 300 Q140 280 160 300 Q180 280 200 300 Q220 280 250 300
           Q280 280 300 300 Q320 280 340 300 Q360 280 380 300 Q400 280 420 300"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.3"
      />
      {/* Finial at top */}
      <path className="canopy-s" d="M244 20 L250 2 L256 20" stroke={accent} strokeWidth="0.7" opacity="0.5" />
      <circle className="canopy-s" cx="250" cy="2" r="3" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      {/* Hanging tassels */}
      {[80, 120, 160, 200, 250, 300, 340, 380, 420].map((x) => (
        <g key={`t${x}`}>
          <path className="canopy-s" d={`M${x} 300 L${x} 314`} stroke={accent} strokeWidth="0.3" opacity="0.25" />
          <circle className="canopy-s" cx={x} cy={316} r="1.5" fill={`${accent}15`} stroke={accent} strokeWidth="0.2" />
        </g>
      ))}
      {/* Curtain drape lines */}
      <path className="canopy-s" d="M50 140 Q80 160 80 300" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      <path className="canopy-s" d="M450 140 Q420 160 420 300" stroke={accent} strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}

function CornerFiligree({ accent, position }: { accent: string; position: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`absolute ${position} w-12 h-12 md:w-16 md:h-16`} fill="none">
      <path d="M0 0 L0 35 Q4 15 15 8 Q25 4 35 0Z" fill={`${accent}08`} />
      <path d="M0 0 L0 40 Q5 18 18 8 L40 0" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <path d="M0 0 Q8 12 5 25 Q10 15 22 10 Q15 8 0 0Z" stroke={accent} strokeWidth="0.25" opacity="0.15" />
      <path d="M8 2 Q12 8 10 16" stroke={accent} strokeWidth="0.2" opacity="0.12" />
      <circle cx="5" cy="5" r="1.5" fill={`${accent}12`} />
    </svg>
  );
}

function VelvetDrapeMask({ accent, side }: { accent: string; side: "left" | "right" }) {
  const isL = side === "left";
  return (
    <div
      className={`velvet-drape-${side} absolute top-0 ${isL ? "left-0" : "right-0"} h-full w-1/2`}
      style={{
        background: `linear-gradient(${isL ? "to right" : "to left"},${accent}18,${accent}04,transparent)`,
      }}
    />
  );
}

function GoldDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 300 20" className="w-40 md:w-52 h-auto mx-auto" fill="none">
      <line x1="0" y1="10" x2="110" y2="10" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <line x1="190" y1="10" x2="300" y2="10" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path d="M140 10 L150 2 L160 10 L150 18Z" stroke={accent} strokeWidth="0.5" opacity="0.4" fill={`${accent}08`} />
      <circle cx="150" cy="10" r="2" fill={accent} opacity="0.2" />
      <path d="M120 8 Q128 10 120 12" stroke={accent} strokeWidth="0.25" opacity="0.2" />
      <path d="M180 8 Q172 10 180 12" stroke={accent} strokeWidth="0.25" opacity="0.2" />
      <circle cx="130" cy="10" r="1" fill={accent} opacity="0.15" />
      <circle cx="170" cy="10" r="1" fill={accent} opacity="0.15" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MIDNIGHT CATHEDRAL INTRO
   introTl: velvet drapes part → arches draw upward → chandeliers
   descend + ignite → title blur-to-sharp with gold shimmer
   ═══════════════════════════════════════════════════════════════════ */

function MidnightCathedralIntro({
  event,
  onComplete,
}: {
  event: WeddingEvent;
  onComplete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { palette } = event;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const archPaths = el.querySelectorAll<SVGGeometryElement>(".arch-s");
      archPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.6, delay: 0.3, onComplete });
        },
      });

      introTl.to(el.querySelector(".velvet-drape-left"), { x: "-100%", duration: 1.4, ease: "power3.inOut" }, 0);
      introTl.to(el.querySelector(".velvet-drape-right"), { x: "100%", duration: 1.4, ease: "power3.inOut" }, 0);

      introTl.to(archPaths, { strokeDashoffset: 0, duration: 2.2, stagger: 0.05, ease: "power2.inOut" }, 0.4);

      introTl.fromTo(
        el.querySelectorAll(".chandelier"),
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        1.6
      );

      introTl.to(
        el.querySelectorAll(".ch-glow"),
        { fill: `${palette.accent}12`, duration: 1, stagger: 0.12, ease: "power2.out" },
        2.2
      );

      introTl.fromTo(
        el.querySelectorAll(".it-c"),
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.025, ease: "power3.out" },
        2.0
      );

      introTl.fromTo(
        el.querySelectorAll(".is-c"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.015, ease: "power3.out" },
        2.8
      );

      introTl.fromTo(
        el.querySelector(".sub-tag"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        3.2
      );
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const hi = "रात्रि महोत्सव";
  const en = "The Midnight Cathedral";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050d08" }}
    >
      <VelvetDrapeMask accent={palette.accent} side="left" />
      <VelvetDrapeMask accent={palette.accent} side="right" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <CathedralArches accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-center gap-6 mb-6 opacity-80">
            <ChandelierCluster accent={palette.accent} id="l" />
            <ChandelierCluster accent={palette.accent} id="r" />
          </div>
          <p className="font-serif text-sm md:text-lg uppercase tracking-[0.35em] font-light whitespace-nowrap mb-5" style={{ color: `${palette.foreground}bb` }}>
            {en.split("").map((c, i) => (
              <span key={i} className="is-c inline-block opacity-0" style={c === " " ? { whiteSpace: "pre" } : undefined}>{c}</span>
            ))}
          </p>
          <p className="font-serif font-hindi text-2xl md:text-4xl whitespace-nowrap" style={{ color: palette.accent }}>
            {hi.split(" ").map((word, i) => (
              <span key={i} className="it-c inline-block opacity-0 mr-[0.3em]">{word}</span>
            ))}
          </p>
          <p className="sub-tag mt-4 text-xs md:text-sm italic tracking-[0.2em] opacity-0" style={{ color: `${palette.accent}88` }}>
            Cathedral Gone Rogue
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO — 4 Cinematic Beats
   Beat 1: Architecture Rises (arches complete, chandeliers ignite)
   Beat 2: Wild Takes Over (baroque overlays, gold dust, velvet drapes)
   Beat 3: Energy Builds (confetti sparks, glow pulse, light streaks)
   Beat 4: Darbar Reveal (stage canopy + golden halo)
   Color: deep indigo → amethyst → midnight wine
   ═══════════════════════════════════════════════════════════════════ */

function CathedralHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const goldDust = useMemo(
    () => Array.from({ length: 30 }, () => ({
      w: 1.5 + Math.random() * 4,
      x: Math.random() * 100,
      y: 5 + Math.random() * 80,
      delay: Math.random() * 3,
    })),
    []
  );

  const confettiSparks = useMemo(
    () => Array.from({ length: 18 }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      s: 1 + Math.random() * 3,
      rot: Math.random() * 360,
    })),
    []
  );

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const archPaths = pin.querySelectorAll<SVGGeometryElement>(".hero-arch .arch-s");
      archPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const canopyPaths = pin.querySelectorAll<SVGGeometryElement>(".canopy-s");
      canopyPaths.forEach((p) => {
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
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      /* ── Beat 1: Architecture Rises ── */
      scrollTl.to(archPaths, { strokeDashoffset: 0, duration: 0.2, stagger: 0.02, ease: "power2.inOut" }, 0);

      scrollTl.fromTo(
        pin.querySelectorAll(".hero-chandelier"),
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08, stagger: 0.02, ease: "power2.out" },
        0.1
      );
      scrollTl.to(
        pin.querySelectorAll(".hero-chandelier .ch-glow"),
        { fill: `${palette.accent}15`, duration: 0.1, stagger: 0.015 },
        0.15
      );

      scrollTl.fromTo(".b1-content", { opacity: 0.8 }, { opacity: 1, duration: 0.06 }, 0);

      /* ── Beat 2: Wild Takes Over — baroque projections + gold dust ── */
      scrollTl.fromTo(
        ".cathedral-bg",
        { background: `linear-gradient(180deg,#050d08 0%,#0a0f1a 30%,#0d0818 60%,${palette.background} 100%)` },
        { background: `linear-gradient(180deg,#0d0818 0%,#1a0f2e 30%,#2a1028 60%,${palette.background} 100%)`, duration: 0.3 },
        0.22
      );
      scrollTl.fromTo(".baroque-overlay", { opacity: 0 }, { opacity: 0.08, duration: 0.15 }, 0.25);
      scrollTl.fromTo(".lyr-dust4", { opacity: 0 }, { opacity: 0.5, duration: 0.15 }, 0.28);
      scrollTl.to(".lyr-drape-l", { x: -15, duration: 0.3 }, 0.22);
      scrollTl.to(".lyr-drape-r", { x: 15, duration: 0.3 }, 0.22);

      /* ── Beat 3: Energy Builds — confetti sparks, glow pulse, light streaks ── */
      scrollTl.fromTo(
        ".cathedral-bg",
        { background: `linear-gradient(180deg,#0d0818 0%,#1a0f2e 30%,#2a1028 60%,${palette.background} 100%)` },
        { background: `linear-gradient(180deg,#1a0820 0%,#2e1540 30%,#3a1838 60%,${palette.background} 100%)`, duration: 0.2 },
        0.52
      );
      scrollTl.fromTo(
        pin.querySelectorAll(".confetti-spark"),
        { opacity: 0, scale: 0 },
        { opacity: 0.4, scale: 1, stagger: 0.008, duration: 0.1, ease: "back.out(2)" },
        0.55
      );
      scrollTl.fromTo(".bass-glow", { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1.1, duration: 0.15, ease: "power2.out" }, 0.58);
      scrollTl.fromTo(
        pin.querySelectorAll(".light-streak"),
        { opacity: 0, x: -80 },
        { opacity: 0.12, x: 80, duration: 0.2, stagger: 0.03 },
        0.55
      );

      /* ── Beat 4: Darbar Reveal — stage canopy + golden halo ── */
      scrollTl.to(canopyPaths, { strokeDashoffset: 0, duration: 0.15, stagger: 0.01, ease: "power2.inOut" }, 0.72);
      scrollTl.fromTo(".stage-canopy", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.72);
      scrollTl.fromTo(".stage-halo", { opacity: 0, scale: 0.6 }, { opacity: 0.25, scale: 1.2, duration: 0.2, ease: "power2.out" }, 0.78);
      scrollTl.fromTo(".b4-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.82);

      scrollTl.to(".lyr-sand4", { y: -40, duration: 1 }, 0);
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} className="h-[85vh] sm:h-[105vh]">
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        {/* Background — transitions through indigo → amethyst → midnight wine */}
        <div
          className="cathedral-bg absolute inset-0"
          style={{ background: `linear-gradient(180deg,#050d08 0%,#0a0f1a 30%,#0d0818 60%,${palette.background} 100%)` }}
        />

        {/* Sandstone texture parallax */}
        <div className="lyr-sand4 absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 2px,${palette.accent}04 2px,${palette.accent}04 4px)` }} />

        {/* Baroque projection overlay */}
        <BaroqueOverlay accent={palette.accent} />

        {/* Parallax velvet drape edges */}
        <div className="lyr-drape-l absolute top-0 left-0 w-16 md:w-24 h-full pointer-events-none" style={{ background: `linear-gradient(to right,${palette.primary}40,transparent)` }} />
        <div className="lyr-drape-r absolute top-0 right-0 w-16 md:w-24 h-full pointer-events-none" style={{ background: `linear-gradient(to left,${palette.primary}40,transparent)` }} />

        {/* Gold dust particles */}
        <div className="lyr-dust4 absolute inset-0 pointer-events-none opacity-0">
          {goldDust.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: d.w,
                height: d.w,
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: `radial-gradient(circle,${palette.accent}40,transparent)`,
                animation: `goldFoilSparkle ${2 + d.delay}s ease-in-out ${d.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Confetti sparks (Beat 3) */}
        {confettiSparks.map((s, i) => (
          <div
            key={`cs${i}`}
            className="confetti-spark absolute rounded-sm opacity-0"
            style={{
              width: s.s,
              height: s.s * 2.5,
              left: `${s.x}%`,
              top: `${s.y}%`,
              backgroundColor: i % 3 === 0 ? `${palette.accent}50` : i % 3 === 1 ? "#8338ec40" : "#c9a84c35",
              transform: `rotate(${s.rot}deg)`,
            }}
          />
        ))}

        {/* Light streaks (Beat 3) */}
        {[20, 40, 65].map((top) => (
          <div
            key={`ls${top}`}
            className="light-streak absolute h-px opacity-0 pointer-events-none"
            style={{
              top: `${top}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg,transparent 10%,${palette.accent}15 40%,${palette.accent}08 60%,transparent 90%)`,
            }}
          />
        ))}

        {/* Bass-reactive glow (Beat 3) */}
        <div
          className="bass-glow absolute pointer-events-none opacity-0"
          style={{
            width: "60%",
            height: "40%",
            bottom: "10%",
            left: "20%",
            background: `radial-gradient(ellipse,${palette.accent}10,transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Stage halo (Beat 4) */}
        <div
          className="stage-halo absolute pointer-events-none opacity-0"
          style={{
            width: "50%",
            height: "50%",
            bottom: "15%",
            left: "25%",
            background: `radial-gradient(circle,${palette.accent}18,${palette.accent}08 40%,transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Hero arch system */}
        <div className="hero-arch absolute inset-0 flex items-end justify-center pointer-events-none pb-0">
          <CathedralArches accent={palette.accent} />
        </div>

        {/* Chandeliers — positioned across vault */}
        <div className="absolute top-6 md:top-10 left-0 right-0 flex justify-center items-start gap-10 md:gap-20 pointer-events-none">
          {["h1", "h2", "h3"].map((id) => (
            <div key={id} className="hero-chandelier opacity-0">
              <ChandelierCluster accent={palette.accent} id={id} />
            </div>
          ))}
        </div>

        {/* Corner filigree */}
        <CornerFiligree accent={palette.accent} position="top-0 left-0" />
        <CornerFiligree accent={palette.accent} position="top-0 right-0 scale-x-[-1]" />
        <CornerFiligree accent={palette.accent} position="bottom-0 left-0 scale-y-[-1]" />
        <CornerFiligree accent={palette.accent} position="bottom-0 right-0 scale-[-1]" />

        {/* ── BEAT 1: Title + event info (centered on mobile to avoid empty gap) ── */}
        <div className="b1-content absolute inset-0 flex flex-col items-center justify-center sm:justify-start sm:pt-[12vh] z-10 px-4 sm:px-6 text-center">
          <h1 className="font-serif text-lg md:text-2xl uppercase tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] font-light mb-5 max-w-[90vw] mx-auto break-words" style={{ color: `${palette.foreground}cc` }}>
            The Midnight Cathedral
          </h1>
          <p className="font-serif font-hindi text-2xl md:text-4xl lg:text-5xl tracking-[0.04em] mb-3" style={{ color: palette.accent, textShadow: `0 0 40px ${palette.accent}30, 0 2px 20px ${palette.background}` }}>
            रात्रि महोत्सव
          </p>
          <p className="text-xs sm:text-sm italic tracking-[0.1em] sm:tracking-[0.15em] mb-6 sm:mb-8 max-w-[85vw] mx-auto" style={{ color: `${palette.accent}88` }}>
            Cathedral Gone Rogue &mdash; Gilded After Dark
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center min-w-0">
                <Icon size={14} style={{ color: palette.accent }} className="mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-[0.15em] truncate max-w-[28vw] sm:max-w-none mx-auto" style={{ color: `${palette.foreground}66` }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BEAT 4: Stage canopy reveal (hidden on mobile to prevent overlap) ── */}
        <div className="b4-content absolute bottom-20 left-1/2 -translate-x-1/2 z-10 opacity-0 text-center hidden md:block">
          <StageCanopy accent={palette.accent} />
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: `${palette.accent}66` }}>
            The Stage Awaits
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 z-[6] pointer-events-none" style={{ background: `linear-gradient(to top,${palette.background},transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function CathedralQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote = event.longDescription.split(".")[0] + ".";

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".aq-w"), { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,${palette.background},${palette.muted}12,${palette.background})` }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <GoldDivider accent={palette.accent} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}77` }}>
          &ldquo;{quote.split(" ").map((w, i) => (<span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>))}&rdquo;
        </p>
        <p className="font-serif text-2xl md:text-4xl mt-6" style={{ color: `${palette.accent}12` }}>महोत्सव</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STORY SECTION
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
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>The Vibe · <span className="text-[0.78em] font-normal">माहौल</span></p>
        <GoldDivider accent={palette.accent} />
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 mb-6 px-2" style={{ color: `${palette.foreground}dd` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
        <GoldDivider accent={palette.accent} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — Gilded After Dark
   ═══════════════════════════════════════════════════════════════════ */

function CathedralDressCode({ event }: { event: WeddingEvent }) {
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
      opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%,${palette.accent}06,transparent 70%)` }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12 font-medium text-center" style={{ color: palette.accent }}>Attire · वेश विधान</p>
        <div className="dc-c relative rounded-sm p-10 md:p-14 opacity-0" style={{ background: `linear-gradient(165deg,${palette.muted}40,${palette.background} 50%,${palette.muted}30)`, border: `1px solid ${palette.accent}18`, boxShadow: `inset 0 0 50px ${palette.accent}06` }}>
          {["top-0 left-0", "top-0 right-0 scale-x-[-1]", "bottom-0 left-0 scale-y-[-1]", "bottom-0 right-0 scale-[-1]"].map((pos, i) => (
            <CornerFiligree key={i} accent={palette.accent} position={pos} />
          ))}
          <div className="text-center mb-10">
            <p className="font-serif text-2xl md:text-3xl tracking-[0.04em] mb-3" style={{ color: palette.accent }}>{dressCode.title}</p>
            <div className="w-16 h-px mx-auto mb-5" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}40,transparent)` }} />
            <p className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto" style={{ color: `${palette.foreground}99` }}>{dressCode.description}</p>
          </div>
          <div className="mb-10"><GoldDivider accent={palette.accent} /></div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: palette.accent }}>Embrace</h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}cc` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: `${palette.foreground}55` }}>Kindly Avoid</h4>
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

/* ═══════════════════════════════════════════════════════════════════
   GALLERY + VENUE
   ═══════════════════════════════════════════════════════════════════ */

function CathedralMoodSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      {/* Continuity texture & glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${palette.accent}15, transparent), url("https://www.transparenttextures.com/patterns/parchment.png")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Magazine-style Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-current opacity-20" />
            <p
              className="text-[10px] uppercase tracking-[0.5em] font-medium"
              style={{ color: palette.accent }}
            >
              Aesthetic Narrative · विजन
            </p>
            <div className="h-px w-8 bg-current opacity-20" />
          </div>

          <h3
            className="font-serif text-5xl md:text-7xl mb-10 tracking-tight"
            style={{ color: palette.foreground }}
          >
            Sanctuary <span className="opacity-40 italic">&amp;</span> Symphony
          </h3>

          <p className="max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed opacity-60">
            A grand architectural narrative where sacred geometry meets the untamed elegance of the wild.
          </p>
        </div>

        {/* Featured Gallery Piece */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 border border-white/5 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-black/40 blur-3xl opacity-20 -z-10" />
        </div>
      </div>
    </section>
  );
}

function CathedralVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>Venue · स्थान</p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: palette.foreground }}>{event.location}</h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}88` }}>{event.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — FourthChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function FourthChapterContent({ event }: ChapterProps) {
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
        <MidnightCathedralIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <CathedralHero event={event} />
      <CathedralQuote event={event} />

      <FadeInView>
        <section className="border-y py-8" style={{ borderColor: `${palette.foreground}10`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: CalendarDays, label: `${event.date} · ${event.day}` },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: `${event.location}, ${event.venue}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm" style={{ color: `${palette.foreground}99` }}>
                <Icon size={16} style={{ color: palette.accent }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      <StorySection event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><GoldDivider accent={palette.accent} /></div>
      <CathedralDressCode event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><GoldDivider accent={palette.accent} /></div>
      <CathedralMoodSection event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><GoldDivider accent={palette.accent} /></div>
      <CathedralVenue event={event} />

      {/* Chapter navigation */}
      <FadeInView>
        <section className="py-8 md:py-10 px-6 border-t" style={{ borderColor: `${palette.foreground}10`, backgroundColor: palette.background }}>
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
      <footer className="relative" style={{ backgroundColor: palette.background, borderTop: `1px solid ${palette.accent}12` }}>
        <div className="absolute -top-20 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to bottom,transparent,${palette.background})` }} />
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <GoldDivider accent={palette.accent} />
          <p className="font-serif text-xs mb-4 mt-6" style={{ color: `${palette.accent}55` }}>शुभ विवाह</p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${palette.foreground}cc` }}>
            Tarush <span style={{ color: `${palette.accent}77` }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] tracking-[0.3em] font-body mb-10" style={{ color: `${palette.accent}55` }}>{COUPLE.hashtag}</p>

          <div className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg" style={{ border: `1px solid ${palette.accent}18`, background: `linear-gradient(165deg,${palette.accent}06,transparent 40%,${palette.primary}04)` }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: `${palette.accent}55` }}>Your Presence Matters</p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic" style={{ color: `${palette.foreground}bb` }}>
              The celebration is incomplete without you.
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: `${palette.foreground}bb` }}>
              We eagerly await your presence.
            </p>
            <p className="mt-5 text-sm tracking-[0.08em]" style={{ color: `${palette.accent}55` }}>
              आपकी उपस्थिति हमारा सम्मान है
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/rsvp" className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm hover:scale-105" style={{ backgroundColor: `${palette.accent}15`, color: palette.accent, border: `1px solid ${palette.accent}25` }}>
                RSVP Now
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-10">
            {[{ href: "/itinerary", label: "Itinerary" }, { href: "/rsvp", label: "RSVP" }, { href: "/travel", label: "Travel" }].map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80" style={{ color: `${palette.foreground}66` }}>{link.label}</Link>
            ))}
          </div>
          <p className="text-[11px] font-body tracking-wide mb-6" style={{ color: `${palette.foreground}40` }}>April 19–21, 2026 · Udaipur, Rajasthan</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-body tracking-wide" style={{ color: `${palette.foreground}25` }}>
            <span>© 2026 All Rights Reserved</span>
            <span style={{ color: `${palette.foreground}15` }}>|</span>
            <a href="https://blessingsofttech.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80" style={{ color: `${palette.foreground}35` }} aria-label="Blessing Softtech">
              <Image src="/images/blessing-softtech.svg" alt="" width={26} height={26} className="shrink-0" />
              <span>Blessing Softtech</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
