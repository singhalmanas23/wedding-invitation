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
   SVG SET — Royal Proclamation Cultural Elements
   (1) Silk Curtain   (2) Jharokha Arch   (3) Diya Strip
   (4) Palace Facade  (5) Royal Crest     (6) Elephant Band
   All SVGs: clean stroke paths, maskable fills, parallax-ready
   ═══════════════════════════════════════════════════════════════════ */

function SilkCurtainHalf({ side, accent }: { side: "left" | "right"; accent: string }) {
  const isL = side === "left";
  return (
    <svg
      viewBox="0 0 500 1000"
      className={`silk-curtain-${side} absolute top-0 ${isL ? "left-0" : "right-0"} h-full w-1/2`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`silk-g-${side}`} x1={isL ? "0%" : "100%"} y1="0%" x2={isL ? "100%" : "0%"} y2="100%">
          <stop offset="0%" stopColor="#3a1a0a" stopOpacity="0.97" />
          <stop offset="50%" stopColor="#2a1508" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#1a0a04" stopOpacity="0.90" />
        </linearGradient>
      </defs>
      <path
        d={
          isL
            ? "M0 0 L500 0 Q480 250 490 500 Q496 750 500 1000 L0 1000Z"
            : "M0 0 L500 0 L500 1000 L0 1000 Q4 750 10 500 Q20 250 0 0Z"
        }
        fill={`url(#silk-g-${side})`}
      />
      {[180, 380, 580, 780].map((y, i) => (
        <path
          key={y}
          d={
            isL
              ? `M${80 + i * 15} ${y} Q${280 + i * 10} ${y + 40} 500 ${y + 15}`
              : `M0 ${y + 15} Q${220 - i * 10} ${y + 40} ${420 - i * 15} ${y}`
          }
          stroke={`${accent}25`}
          strokeWidth="0.8"
          fill="none"
        />
      ))}
      <circle cx={isL ? 488 : 12} cy="940" r="6" fill={`${accent}35`} />
    </svg>
  );
}

function JharokhaArchOutline({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 400 480" className="arch-svg w-[260px] md:w-[340px] mx-auto" fill="none">
      <path
        className="arch-stroke"
        d="M50 480 L50 200 Q50 150 80 115 Q120 75 200 55 Q280 75 320 115 Q350 150 350 200 L350 480"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        className="arch-stroke"
        d="M70 470 L70 210 Q70 165 100 135 Q140 100 200 82 Q260 100 300 135 Q330 165 330 210 L330 470"
        stroke={accent}
        strokeWidth="0.7"
        opacity="0.5"
      />
      <path
        className="arch-stroke"
        d="M140 95 Q160 65 200 55 Q240 65 260 95"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.35"
      />
      <path className="arch-stroke" d="M196 55 L200 28 L204 55" stroke={accent} strokeWidth="0.9" />
      <circle className="arch-stroke" cx="200" cy="22" r="6" stroke={accent} strokeWidth="0.7" />
      <path className="arch-stroke" d="M40 475 Q32 475 32 467 L32 450" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <path className="arch-stroke" d="M360 475 Q368 475 368 467 L368 450" stroke={accent} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function DiyaStrip({ accent }: { accent: string }) {
  const xs = [-400, -310, -220, -130, -40, 40, 130, 220, 310, 400];
  return (
    <svg viewBox="-450 -12 900 65" className="diya-strip absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl h-14">
      <defs>
        <filter id="fg">
          <feGaussianBlur stdDeviation="3" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <line x1="-440" y1="42" x2="440" y2="42" stroke={`${accent}18`} strokeWidth="0.5" />
      {xs.map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M-10 32 Q-8 42 0 44 Q8 42 10 32Z" fill={`${accent}30`} stroke={accent} strokeWidth="0.4" />
          <line x1="0" y1="32" x2="0" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.5" />
          <path
            className="diya-flame"
            d="M0 24 Q-4 14 -2 6 Q0 -1 0 -4 Q0 -1 2 6 Q4 14 0 24Z"
            fill={accent}
            opacity="0"
            style={{ transformOrigin: "0px 24px" }}
          />
          <circle
            className="diya-flame"
            cx="0"
            cy="10"
            r="7"
            fill={accent}
            opacity="0"
            filter="url(#fg)"
          />
        </g>
      ))}
    </svg>
  );
}

function PalaceFacadePattern({ accent }: { accent: string }) {
  return (
    <svg
      className="palace-facade absolute inset-0 w-full h-full opacity-0"
      preserveAspectRatio="none"
      viewBox="0 0 400 400"
    >
      <defs>
        <pattern id="jali" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M10 100 L10 40 Q10 15 40 10 Q70 15 70 40 L70 100"
            stroke={accent}
            strokeWidth="0.35"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M20 95 L20 45 Q20 25 40 20 Q60 25 60 45 L60 95"
            stroke={accent}
            strokeWidth="0.25"
            fill="none"
            opacity="0.1"
          />
          <line x1="40" y1="20" x2="40" y2="95" stroke={accent} strokeWidth="0.15" opacity="0.07" />
          <line x1="20" y1="60" x2="60" y2="60" stroke={accent} strokeWidth="0.15" opacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#jali)" />
    </svg>
  );
}

function RoyalCrestSVG({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="royal-crest w-24 md:w-32 mx-auto" fill="none">
      <path
        className="crest-path"
        d="M100 12 L168 42 L168 128 Q168 178 138 208 Q118 228 100 234 Q82 228 62 208 Q32 178 32 128 L32 42Z"
        stroke={accent}
        strokeWidth="1.1"
      />
      <path
        className="crest-path"
        d="M100 28 L152 52 L152 122 Q152 166 128 192 Q114 208 100 214 Q86 208 72 192 Q48 166 48 122 L48 52Z"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.35"
      />
      <path className="crest-path" d="M100 12 Q88 2 78 7 Q72 12 76 22" stroke={accent} strokeWidth="0.4" opacity="0.4" fill="none" />
      <path className="crest-path" d="M100 12 Q112 2 122 7 Q128 12 124 22" stroke={accent} strokeWidth="0.4" opacity="0.4" fill="none" />
      <path className="crest-path" d="M32 85 Q18 82 12 72" stroke={accent} strokeWidth="0.35" opacity="0.3" fill="none" />
      <path className="crest-path" d="M168 85 Q182 82 188 72" stroke={accent} strokeWidth="0.35" opacity="0.3" fill="none" />
      <text
        x="100"
        y="132"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="28"
        letterSpacing="3"
        fill={accent}
        opacity="0.65"
        className="crest-text"
      >
        T &amp; S
      </text>
    </svg>
  );
}

function ElephantBand({ accent }: { accent: string }) {
  const ep =
    "M0 78 L6 68 Q12 52 22 48 L32 46 Q38 28 48 22 Q58 18 62 24 L68 34 Q74 36 84 36 L92 34 Q98 28 104 34 L108 42 Q118 38 124 44 Q128 54 122 64 L116 70 Q110 76 106 80Z";
  return (
    <svg
      viewBox="0 0 1800 90"
      className="elephant-band absolute bottom-0 w-[220%] h-14 md:h-[72px]"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="82" x2="1800" y2="82" stroke={`${accent}12`} strokeWidth="0.4" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} transform={`translate(${i * 175 + 20},0)`} opacity="0.13">
          <path d={ep} fill={accent} />
          <rect x="48" y="14" width="26" height="12" rx="2" fill={accent} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROYAL PROCLAMATION INTRO
   introTl: curtain part → arch stroke-dashoffset draw → title
   blur-to-sharp + letter stagger → diya ignition with flicker loop
   ═══════════════════════════════════════════════════════════════════ */

function RoyalProclamationIntro({
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

      const strokes = el.querySelectorAll<SVGGeometryElement>(".arch-stroke");
      strokes.forEach((p) => {
        if (p.getTotalLength) {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        }
      });

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.5, delay: 0.25, onComplete });
        },
      });

      introTl.to(
        el.querySelector(".silk-curtain-left"),
        { x: "-100%", duration: 1.4, ease: "power3.inOut" },
        0
      );
      introTl.to(
        el.querySelector(".silk-curtain-right"),
        { x: "100%", duration: 1.4, ease: "power3.inOut" },
        0
      );

      introTl.to(
        strokes,
        { strokeDashoffset: 0, duration: 1.6, stagger: 0.08, ease: "power2.inOut" },
        0.25
      );

      introTl.fromTo(
        el.querySelectorAll(".ih-char"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.035, ease: "power3.out" },
        1.1
      );

      introTl.fromTo(
        el.querySelectorAll(".ie-char"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.018, ease: "power3.out" },
        1.9
      );

      const flames = el.querySelectorAll(".diya-flame");
      introTl.to(
        flames,
        { scale: 1, opacity: 1, duration: 0.25, stagger: 0.09, ease: "back.out(2)" },
        2.6
      );

      introTl.add(() => {
        gsap.to(flames, {
          scaleY: "random(0.82, 1.15)",
          opacity: "random(0.65, 1)",
          duration: 0.35,
          stagger: { each: 0.06, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });
      }, 3.6);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const isPreParty = event.slug === "pre-party";
  const hi = isPreParty ? "नूर महल" : "राज तिलक संध्या";
  const en = isPreParty ? "Noor Mahal Soirée" : "The Royal Proclamation";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "#0a0408" }}
    >
      <SilkCurtainHalf side="left" accent={palette.accent} />
      <SilkCurtainHalf side="right" accent={palette.accent} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <JharokhaArchOutline accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="font-hindi font-serif text-2xl md:text-4xl mb-3 whitespace-nowrap"
            style={{ color: palette.accent }}
          >
            {hi.split(" ").map((word, i) => (
              <span key={i} className="ih-char inline-block opacity-0 mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
          <p
            className="text-xs md:text-sm uppercase tracking-[0.45em] font-light whitespace-nowrap"
            style={{ color: `${palette.foreground}88` }}
          >
            {en.split("").map((c, i) => (
              <span
                key={i}
                className="ie-char inline-block opacity-0"
                style={c === " " ? { whiteSpace: "pre" } : undefined}
              >
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>

      <DiyaStrip accent={palette.accent} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO
   scrollTl tied to ScrollTrigger: dusk→night color shift,
   parallax layers, palace facade projection, staged content reveal,
   royal crest mask-wipe, elephant traverse, petal drift
   ═══════════════════════════════════════════════════════════════════ */

function ProclamationHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const bokehDots = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        w: 3 + Math.random() * 7,
        x: Math.random() * 100,
        y: 8 + Math.random() * 42,
      })),
    []
  );

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

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

      scrollTl.fromTo(
        ".hero-bg-grad",
        { background: "linear-gradient(180deg,#2d1810 0%,#4a2010 40%,#1a0a2e 100%)" },
        { background: "linear-gradient(180deg,#0d0615 0%,#1a0a2e 40%,#0d0615 100%)", duration: 1 },
        0
      );

      scrollTl.to(".lyr-sand", { y: -35, duration: 1 }, 0);
      scrollTl.to(".lyr-pal", { y: -70, duration: 1 }, 0);
      scrollTl.to(".lyr-bokeh", { y: -100, opacity: 0.7, duration: 1 }, 0);
      scrollTl.to(".lyr-candle", { y: -45, opacity: 0.5, duration: 1 }, 0);

      scrollTl.to(".palace-facade", { opacity: 0.1, y: -15, duration: 0.5 }, 0.15);

      scrollTl.to(".h-hindi", { textShadow: `0 0 60px ${palette.accent}55`, duration: 0.4 }, 0);
      scrollTl.to(".h-eng", { letterSpacing: "0.35em", duration: 0.5 }, 0);

      scrollTl.fromTo(
        pin.querySelectorAll(".h-line"),
        { opacity: 0.6, y: 8 },
        { opacity: 1, y: 0, stagger: 0.035, duration: 0.08 },
        0
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".h-dec"),
        { opacity: 0.7, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.05, duration: 0.1 },
        0.05
      );

      scrollTl.fromTo(
        ".royal-crest",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.18, ease: "power2.out" },
        0.4
      );

      scrollTl.fromTo(
        ".elephant-band",
        { x: "50%" },
        { x: "-55%", ease: "none", duration: 1 },
        0
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".petal-dot"),
        { y: 0, opacity: 0 },
        { y: -200, opacity: 0.18, stagger: 0.02, duration: 0.6, ease: "none" },
        0.1
      );
    },
    { scope: wrapRef }
  );

  const isPreParty = event.slug === "pre-party";
  const narrative = isPreParty
    ? [
      "As families gather in Pune,",
      "the Noor Mahal Soirée unfolds in",
      "cascading florals, antique gold,",
      "and projection-mapped grandeur.",
      "This is the pre-party reception —",
      "the opening act before Udaipur.",
    ]
    : [
      "As the sun sets over Lake Pichola,",
      "the evening unfolds in warm ambers,",
      "deep wines, and candlelit golds.",
      "This is not just a welcome dinner —",
      "it is the opening scene, the first verse,",
      "the moment the story begins.",
    ];

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        {/* Dusk-to-night gradient layer */}
        <div
          className="hero-bg-grad absolute inset-0"
          style={{ background: "linear-gradient(180deg,#2d1810 0%,#4a2010 40%,#1a0a2e 100%)" }}
        />

        {/* L1 — sandstone grain texture */}
        <div
          className="lyr-sand absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 2px,${palette.accent}06 2px,${palette.accent}06 4px)`,
          }}
        />

        {/* L2 — palace silhouette skyline */}
        <div className="lyr-pal absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none">
          <svg
            viewBox="0 0 1200 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
          >
            <path
              d="M0 400 L0 260 L60 260 L60 210 L90 210 L90 185 Q110 155 130 185 L130 210 L210 210 L210 155 Q230 105 250 155 L250 210 L320 210 L320 185 L340 165 L360 185 L360 210 L420 210 L420 260 L520 260 L520 155 L540 155 L540 125 Q560 85 580 125 L580 155 L620 155 Q640 85 660 65 Q680 85 700 155 L740 155 L740 125 Q760 85 780 125 L780 155 L820 155 L820 260 L920 260 L920 210 L940 185 L960 210 L1000 210 L1000 155 Q1020 105 1040 155 L1040 210 L1120 210 L1120 185 Q1140 155 1160 185 L1160 210 L1200 210 L1200 400Z"
              fill={`${palette.accent}07`}
            />
          </svg>
        </div>

        {/* L3 — chandelier bokeh */}
        <div className="lyr-bokeh absolute inset-0 opacity-25 pointer-events-none">
          {bokehDots.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: d.w,
                height: d.w,
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: `radial-gradient(circle,${palette.accent}40,transparent)`,
              }}
            />
          ))}
        </div>

        {/* L4 — candle glow */}
        <div className="lyr-candle absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 100%,${palette.accent}14,transparent)`,
            }}
          />
        </div>

        {/* Petal/particle drift layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={i}
              className="petal-dot absolute rounded-full"
              style={{
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 3) * 2,
                left: `${5 + ((i * 5.3) % 90)}%`,
                bottom: `${-2 - (i % 4) * 3}%`,
                backgroundColor: `${palette.accent}${20 + (i % 3) * 10}`,
              }}
            />
          ))}
        </div>

        {/* Palace facade projection overlay */}
        <PalaceFacadePattern accent={palette.accent} />

        {/* ── Staged content reveal ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <h1
            className="h-hindi font-hindi font-serif text-3xl md:text-5xl lg:text-6xl mb-3"
            style={{
              color: palette.accent,
              textShadow: `0 0 40px ${palette.accent}35`,
            }}
          >
            {isPreParty ? "नूर महल सोइरी" : "राज तिलक संध्या"}
          </h1>

          <h2
            className="h-eng font-serif text-lg md:text-2xl uppercase tracking-[0.3em] mb-6 font-light"
            style={{ color: `${palette.foreground}cc` }}
          >
            {isPreParty ? "Pre-Party Reception" : "The Royal Proclamation"}
          </h2>

          <div className="max-w-xl text-center space-y-1.5 mb-8">
            {narrative.map((line, i) => (
              <p
                key={i}
                className="h-line font-serif text-[15px] md:text-lg italic leading-relaxed"
                style={{ color: `${palette.foreground}88` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }, i) => (
              <div key={label} className="h-dec text-center">
                <Icon size={16} style={{ color: palette.accent }} className="mx-auto mb-1.5" />
                <p
                  className="text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: `${palette.foreground}55` }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Royal crest/monogram — emboss mask-wipe reveal */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
          <RoyalCrestSVG accent={palette.accent} />
        </div>

        {/* Elephant procession silhouette band */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] overflow-hidden h-14 md:h-[72px]">
          <ElephantBand accent={palette.accent} />
        </div>

        {/* Bottom gradient fade to content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-[6] pointer-events-none"
          style={{
            background: `linear-gradient(to top,${palette.background},transparent)`,
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE — word-by-word GSAP reveal
   ═══════════════════════════════════════════════════════════════════ */

function AtmosphereQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote =
    "Different cities, different journeys — one decision. From separate lives to a shared narrative, from dusk till dawn.";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".aq-w"),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,${palette.background},${palette.muted}18,${palette.background})`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: `${palette.accent}40` }} />
        <p
          className="font-serif italic text-xl md:text-2xl leading-relaxed"
          style={{ color: `${palette.foreground}77` }}
        >
          &ldquo;
          {quote.split(" ").map((w, i) => (
            <span key={i} className="aq-w inline-block mr-[0.3em]">
              {w}
            </span>
          ))}
          &rdquo;
        </p>
        <p
          className="font-serif text-3xl md:text-5xl mt-6 tracking-[0.15em]"
          style={{ color: `${palette.accent}14` }}
        >
          प्रारम्भ
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STORY SECTION — single vibe quote
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
    <section ref={ref} className="py-8 md:py-12 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 40% at 50% 50%,${palette.accent}05,transparent 70%)`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>
          The Vibe · माहौल
        </p>
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed px-2" style={{ color: `${palette.foreground}dd` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — Royal Proclamation · वेश विधान
   Rajputana-themed: gold ornamental borders, sandstone card,
   diya bullet points, arch-framed title, cultural tone
   ═══════════════════════════════════════════════════════════════════ */

function RoyalDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelector(".dc-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        el.querySelectorAll(".dc-i"),
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden">
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 40%,${palette.accent}08,transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section label */}
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-12 font-medium text-center"
          style={{ color: palette.accent }}
        >
          Attire · वेश विधान
        </p>

        {/* Ornamental card */}
        <div
          className="dc-card relative rounded-sm p-10 md:p-14 opacity-0"
          style={{
            background: `linear-gradient(165deg,${palette.muted}35,${palette.background} 50%,${palette.muted}25)`,
            border: `1px solid ${palette.accent}18`,
            boxShadow: `inset 0 0 60px ${palette.accent}06, 0 0 40px ${palette.background}80`,
          }}
        >
          {/* Ornamental corner SVGs */}
          {[
            "top-0 left-0",
            "top-0 right-0 scale-x-[-1]",
            "bottom-0 left-0 scale-y-[-1]",
            "bottom-0 right-0 scale-[-1]",
          ].map((pos, i) => (
            <svg
              key={i}
              viewBox="0 0 60 60"
              className={`absolute ${pos} w-10 h-10 md:w-14 md:h-14`}
              fill="none"
            >
              <path
                d="M0 0 L0 25 Q0 8 8 4 Q12 2 25 0Z"
                fill={`${palette.accent}12`}
              />
              <path
                d="M0 0 L0 35 Q2 12 12 5 Q18 2 35 0"
                stroke={palette.accent}
                strokeWidth="0.5"
                opacity="0.35"
              />
              <path
                d="M0 0 L0 18 Q3 8 8 4 L18 0"
                stroke={palette.accent}
                strokeWidth="0.3"
                opacity="0.2"
              />
            </svg>
          ))}

          {/* Title area */}
          <div className="text-center mb-10">
            <p
              className="font-serif text-2xl md:text-3xl tracking-[0.05em] mb-3"
              style={{ color: palette.accent }}
            >
              {dressCode.title}
            </p>
            <div
              className="w-20 h-px mx-auto mb-5"
              style={{ background: `linear-gradient(90deg,transparent,${palette.accent}50,transparent)` }}
            />
            <p
              className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto"
              style={{ color: `${palette.foreground}99` }}
            >
              {dressCode.description}
            </p>
          </div>

          {/* Divider with diya */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}25)` }} />
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
              <path d="M8 18 Q6 20 12 22 Q18 20 16 18Z" fill={`${palette.accent}40`} />
              <path d="M12 18 Q9 10 10 5 Q12 0 12 0 Q12 0 14 5 Q15 10 12 18Z" fill={palette.accent} opacity="0.6" />
              <circle cx="12" cy="6" r="3" fill={palette.accent} opacity="0.2" />
            </svg>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${palette.accent}25,transparent)` }} />
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Embrace column */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.25em] mb-6 font-medium flex items-center gap-2.5"
                style={{ color: palette.accent }}
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                  <path d="M3 16 Q1 17 8 20 Q15 17 13 16Z" fill={palette.accent} opacity="0.5" transform="scale(0.8) translate(0,-6)" />
                  <path d="M8 14 Q5 8 6 4 Q8 0 8 0 Q8 0 10 4 Q11 8 8 14Z" fill={palette.accent} opacity="0.7" transform="scale(0.8) translate(0,-2)" />
                </svg>
                Embrace
              </h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: palette.accent }}
                    />
                    <span
                      className="text-[15px] leading-relaxed font-light"
                      style={{ color: `${palette.foreground}cc` }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid column */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.25em] mb-6 font-medium flex items-center gap-2.5"
                style={{ color: `${palette.foreground}55` }}
              >
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none">
                  <line x1="2" y1="2" x2="12" y2="12" stroke={`${palette.foreground}40`} strokeWidth="1" />
                  <line x1="12" y1="2" x2="2" y2="12" stroke={`${palette.foreground}40`} strokeWidth="1" />
                </svg>
                Kindly Avoid
              </h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: `${palette.foreground}30` }}
                    />
                    <span
                      className="text-[15px] leading-relaxed font-light"
                      style={{ color: `${palette.foreground}77` }}
                    >
                      {item}
                    </span>
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
   GALLERY — masonry with staggered reveal
   ═══════════════════════════════════════════════════════════════════ */

function ImmersiveGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;
  const ref = useRef<HTMLDivElement>(null);
  const heights = event.slug === "pre-party"
    ? [380, 300, 340, 280, 320, 360, 300, 340]
    : [380, 260, 300, 340];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".gi"),
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium"
          style={{ color: palette.accent }}
        >
          Mood · माहौल
        </p>
        <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4 w-full">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="gi break-inside-avoid rounded-xl relative overflow-hidden group cursor-pointer w-full min-w-0"
              style={{ height: heights[i] || 300 }}
            >
              <Image
                src={src}
                alt={`${event.title} mood ${i + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 50vw,33vw"
              />
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: palette.primary }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VENUE — parallax hero image
   ═══════════════════════════════════════════════════════════════════ */

function VenueSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 80%,${palette.accent}05,transparent)`,
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium"
          style={{ color: palette.accent }}
        >
          Venue · स्थान
        </p>
        <h3
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3"
          style={{ color: palette.foreground }}
        >
          {event.location}
        </h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}88` }}>
          {event.venue}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — FirstChapterContent
   Orchestrates: Intro → Hero → Quote → Info → Story → Dress →
   Gallery → Venue → Navigation
   ═══════════════════════════════════════════════════════════════════ */

export default function FirstChapterContent({ event }: ChapterProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent =
    eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;
  const { palette } = event;

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: palette.background, color: palette.foreground }}
    >
      {!introComplete && !prefersReducedMotion && (
        <RoyalProclamationIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />

      <ProclamationHero event={event} />
      {!event.heroImage && <AtmosphereQuote event={event} />}

      <FadeInView>
        <section
          className="border-y py-8"
          style={{ borderColor: `${palette.foreground}10` }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: `${palette.foreground}99` }}
            >
              <CalendarDays size={16} className="shrink-0" style={{ color: palette.accent }} />
              <span>
                {event.date} · {event.day}
              </span>
            </div>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: `${palette.foreground}99` }}
            >
              <Clock size={16} className="shrink-0" style={{ color: palette.accent }} />
              <span>{event.time}</span>
            </div>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: `${palette.foreground}99` }}
            >
              <MapPin size={16} className="shrink-0" style={{ color: palette.accent }} />
              <span>
                {event.location}, {event.venue}
              </span>
            </div>
          </div>
        </section>
      </FadeInView>

      <StorySection event={event} />

      <div className="flex justify-center">
        <div
          className="w-16 h-px"
          style={{ backgroundColor: `${palette.accent}30` }}
        />
      </div>

      <RoyalDressCode event={event} />

      {event.heroImage ? (
        <section className="py-24 md:py-36 relative overflow-hidden">
          {/* Continuity texture & glow */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${palette.accent}15, transparent), url("https://www.transparenttextures.com/patterns/parchment.png")`
            }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Magazine-style Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-current opacity-20" />
                <p className="text-[10px] uppercase tracking-[0.5em] font-medium" style={{ color: palette.accent }}>
                  {event.slug === 'pre-party' ? 'Visual Curation · विजन' : 'Aesthetic Narrative · विजन'}
                </p>
                <div className="h-px w-8 bg-current opacity-20" />
              </div>

              <h3 className="font-serif text-5xl md:text-7xl mb-10 tracking-tight" style={{ color: palette.foreground }}>
                {event.slug === 'pre-party' ? (
                  <>Artifacts <span className="opacity-40 italic">&amp;</span> Alcoves</>
                ) : (
                  <>Motifs <span className="opacity-40 italic">&amp;</span> Modernity</>
                )}
              </h3>

              <p className="max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed opacity-60">
                {event.slug === 'pre-party'
                  ? "A meticulous collection of heritage swatches, antique golds, and architectural vistas that define the soul of Noor Mahal."
                  : "A contemporary lens on Rajasthan's royal hospitality—where traditional frescoes meet refined, modern silhouettes."}
              </p>
            </div>

            {/* Featured Gallery Piece */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-1 border border-white/5 pointer-events-none z-20" />
              <div className="absolute inset-0 bg-black/40 blur-3xl opacity-20 -z-10" />

              <div
                className="relative aspect-[16/10] overflow-hidden bg-[#1a1512]"
                style={{
                  clipPath: event.slug === 'pre-party' ? 'inset(0 0 5% 0)' : 'none',
                }}
              >
                <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-[1.5s] hover:opacity-0" />
                <Image
                  src={event.heroImage}
                  alt={`${event.title} Mood`}
                  fill
                  className="object-cover transition-transform duration-[4s] hover:scale-105"
                  priority
                />

                {/* Mood Vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, ${palette.background}dd 0%, transparent 15%, transparent 85%, ${palette.background}ee 100%)`
                  }}
                />
              </div>

              {/* Decorative Label */}
              <div className="absolute -bottom-6 left-12 z-20">
                <p className="font-serif italic text-sm opacity-40" style={{ color: palette.accent }}>
                  Fig. {event.chapterNumber.toString().padStart(2, '0')} — Aesthetic Narrative
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="flex justify-center">
            <div
              className="w-16 h-px"
              style={{ backgroundColor: `${palette.accent}30` }}
            />
          </div>
          <ImmersiveGallery event={event} />
        </>
      )}

      <div className="flex justify-center">
        <div
          className="w-16 h-px"
          style={{ backgroundColor: `${palette.accent}30` }}
        />
      </div>

      <VenueSection event={event} />

      <FadeInView>
        <section
          className="py-8 md:py-10 px-6 border-t"
          style={{ borderColor: `${palette.foreground}10` }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3"
                style={{ color: `${palette.foreground}88` }}
              >
                <ArrowLeft size={14} />
                Back to Itinerary
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {prevEvent ? (
                <Link
                  href={`/chapter/${prevEvent.slug}`}
                  className="group rounded-xl overflow-hidden border transition-all duration-500 relative"
                  style={{
                    borderColor: `${palette.foreground}08`,
                    backgroundColor: `${palette.muted}20`,
                  }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={prevEvent.heroImage}
                      alt={prevEvent.title}
                      fill
                      className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      sizes="50vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom,transparent,${palette.background}ee)`,
                      }}
                    />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium"
                      style={{ color: `${palette.foreground}55` }}
                    >
                      ← Previous Chapter
                    </p>
                    <p
                      className="font-serif text-lg md:text-xl transition-colors duration-300"
                      style={{ color: `${palette.foreground}bb` }}
                    >
                      {prevEvent.title}
                    </p>
                    <p
                      className="text-sm mt-1 italic"
                      style={{ color: `${palette.foreground}55` }}
                    >
                      {prevEvent.subtitle}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextEvent ? (
                <Link
                  href={`/chapter/${nextEvent.slug}`}
                  className="group rounded-xl overflow-hidden border text-right transition-all duration-500 relative"
                  style={{
                    borderColor: `${palette.foreground}08`,
                    backgroundColor: `${palette.muted}20`,
                  }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={nextEvent.heroImage}
                      alt={nextEvent.title}
                      fill
                      className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      sizes="50vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom,transparent,${palette.background}ee)`,
                      }}
                    />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium"
                      style={{ color: `${palette.foreground}55` }}
                    >
                      Next Chapter →
                    </p>
                    <p
                      className="font-serif text-lg md:text-xl transition-colors duration-300"
                      style={{ color: `${palette.foreground}bb` }}
                    >
                      {nextEvent.title}
                    </p>
                    <p
                      className="text-sm mt-1 italic"
                      style={{ color: `${palette.foreground}55` }}
                    >
                      {nextEvent.subtitle}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Chapter-themed footer — overrides global maroon to match palette */}
      <footer
        className="relative"
        style={{ backgroundColor: palette.background, borderTop: `1px solid ${palette.accent}10` }}
      >
        {/* Gradient bridge from content to footer */}
        <div
          className="absolute -top-20 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${palette.background})`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 text-center">
          <div className="flex justify-center mb-8">
            <svg viewBox="0 0 200 120" className="w-24 md:w-32 h-auto" fill="none" style={{ opacity: 0.1 }}>
              <path d="M20 120 V55 Q20 10 100 4 Q180 10 180 55 V120" stroke={palette.accent} strokeWidth="0.8" />
              <path d="M35 120 V60 Q35 20 100 14 Q165 20 165 60 V120" stroke={palette.accent} strokeWidth="0.4" />
              <circle cx="100" cy="28" r="2.5" fill={`${palette.accent}18`} />
            </svg>
          </div>
          <p className="font-serif text-sm mb-4 tracking-[0.3em]" style={{ color: `${palette.accent}30` }}>
            शुभ विवाह
          </p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${palette.foreground}cc` }}>
            Tarush <span style={{ color: `${palette.accent}66` }}>&amp;</span> Sanjana
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-body mb-10"
            style={{ color: `${palette.accent}35` }}
          >
            #TarushAndSanjana
          </p>

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
            {[
              { href: "/itinerary", label: "Itinerary" },
              { href: "/rsvp", label: "RSVP" },
              { href: "/travel", label: "Travel" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80"
                style={{ color: `${palette.foreground}44` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right,transparent,${palette.accent}25)` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${palette.accent}30` }} />
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to left,transparent,${palette.accent}25)` }} />
          </div>
          <p className="text-[11px] font-body tracking-wide" style={{ color: `${palette.foreground}30` }}>
            April 19–21, 2026 · Udaipur, Rajasthan
          </p>
        </div>
      </footer>
    </div>
  );
}
