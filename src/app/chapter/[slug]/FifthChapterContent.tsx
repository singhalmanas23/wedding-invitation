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
   SVG SET — A World of Our Own · हमारी दुनिया
   Warm sandstone, ivory linen, muted gold, soft Mediterranean blue.
   (1) Open haveli arch  (2) Jaali lattice shadow  (3) Journey map
   (4) Ornamental divider (5) Linen canopy stripes  (6) Monogram seal
   ═══════════════════════════════════════════════════════════════════ */

function HaveliArchFrame({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 560 600" className="haveli-arch w-[300px] md:w-[440px] lg:w-[520px] mx-auto" fill="none">
      {/* Main open arch */}
      <path
        className="arch-s"
        d="M30 600 L30 220 Q30 140 90 90 Q150 48 220 28 Q260 18 280 14
           Q300 18 340 28 Q410 48 470 90 Q530 140 530 220 L530 600"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Inner arch line */}
      <path
        className="arch-s"
        d="M55 595 L55 228 Q55 155 110 108 Q165 68 228 48 Q260 38 280 34
           Q300 38 332 48 Q395 68 450 108 Q505 155 505 228 L505 595"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Keystone drop */}
      <path className="arch-s" d="M274 20 L280 4 L286 20" stroke={accent} strokeWidth="0.7" opacity="0.5" />
      <circle className="arch-s" cx="280" cy="4" r="4" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      {/* Ornamental corners — top-left */}
      <path className="arch-s" d="M30 220 Q20 220 18 210 L18 195" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path className="arch-s" d="M22 215 Q28 208 35 215" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      {/* Ornamental corners — top-right */}
      <path className="arch-s" d="M530 220 Q540 220 542 210 L542 195" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path className="arch-s" d="M525 215 Q532 208 538 215" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      {/* Base plinth lines */}
      <path className="arch-s" d="M18 595 L542 595" stroke={accent} strokeWidth="0.3" opacity="0.15" />
      <path className="arch-s" d="M22 600 L538 600" stroke={accent} strokeWidth="0.2" opacity="0.1" />
      {/* Subtle capital flourishes */}
      <path className="arch-s" d="M90 110 Q95 95 105 92" stroke={accent} strokeWidth="0.25" opacity="0.18" />
      <path className="arch-s" d="M470 110 Q465 95 455 92" stroke={accent} strokeWidth="0.25" opacity="0.18" />
      {/* Spandrel decorative fill */}
      <circle className="arch-s" cx="100" cy="155" r="3" stroke={accent} strokeWidth="0.2" opacity="0.12" />
      <circle className="arch-s" cx="460" cy="155" r="3" stroke={accent} strokeWidth="0.2" opacity="0.12" />
    </svg>
  );
}

function JaaliShadow({ accent }: { accent: string }) {
  return (
    <svg className="jaali-shadow absolute inset-0 w-full h-full opacity-0" preserveAspectRatio="none" viewBox="0 0 400 400">
      <defs>
        <pattern id="jaali5" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0 Q42 12 60 12 Q48 24 60 30 Q48 36 60 48 Q42 48 30 60 Q18 48 0 48 Q12 36 0 30 Q12 24 0 12 Q18 12 30 0Z" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.06" />
          <circle cx="30" cy="30" r="4" stroke={accent} strokeWidth="0.15" fill="none" opacity="0.04" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#jaali5)" />
    </svg>
  );
}

function JourneyMap({ accent, fg }: { accent: string; fg: string }) {
  const cities = [
    { name: "Mumbai", x: 30, y: 65 },
    { name: "Pune", x: 100, y: 55 },
    { name: "London", x: 200, y: 30 },
    { name: "Cappadocia", x: 275, y: 40 },
    { name: "Udaipur", x: 350, y: 48 },
  ];

  return (
    <svg viewBox="0 0 460 110" className="journey-map w-full max-w-xl h-auto mx-auto" fill="none">
      {/* Connecting journey line */}
      <path
        className="journey-line"
        d="M30 65 C55 60 75 55 100 55 C140 55 160 32 200 30 C230 32 260 36 275 40 C290 44 320 46 350 48"
        stroke={accent}
        strokeWidth="1"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* City dots and labels */}
      {cities.map((c) => (
        <g key={c.name} className="city-dot">
          <circle cx={c.x} cy={c.y} r="4" stroke={accent} strokeWidth="0.6" fill={`${accent}15`} opacity="0" />
          <circle cx={c.x} cy={c.y} r="1.8" fill={accent} opacity="0" />
          <text
            x={c.x}
            y={c.y + 16}
            textAnchor="middle"
            fill={`${fg}88`}
            fontSize="7"
            fontFamily="serif"
            letterSpacing="0.5"
            opacity="0"
          >
            {c.name}
          </text>
        </g>
      ))}
      {/* Final convergence marker — Udaipur gets a larger ring */}
      <circle className="jaipur-ring" cx="350" cy="48" r="8" stroke={accent} strokeWidth="0.6" opacity="0" fill="none" />
      <circle className="jaipur-ring" cx="350" cy="48" r="12" stroke={accent} strokeWidth="0.3" opacity="0" fill="none" strokeDasharray="2 3" />
    </svg>
  );
}

function LotusDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 300 24" className="w-36 md:w-48 h-auto mx-auto" fill="none">
      <line x1="0" y1="12" x2="105" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <line x1="195" y1="12" x2="300" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      {/* Simplified lotus */}
      <path d="M150 4 Q144 8 142 12 Q144 16 150 20 Q156 16 158 12 Q156 8 150 4Z" stroke={accent} strokeWidth="0.45" opacity="0.35" fill={`${accent}08`} />
      <path d="M142 12 Q136 8 132 12 Q136 16 142 12Z" stroke={accent} strokeWidth="0.3" opacity="0.25" />
      <path d="M158 12 Q164 8 168 12 Q164 16 158 12Z" stroke={accent} strokeWidth="0.3" opacity="0.25" />
      <circle cx="150" cy="12" r="1.5" fill={accent} opacity="0.2" />
      <circle cx="125" cy="12" r="0.8" fill={accent} opacity="0.12" />
      <circle cx="175" cy="12" r="0.8" fill={accent} opacity="0.12" />
    </svg>
  );
}

function LinenCanopyStripes({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 400 50" className="canopy-stripes w-full max-w-md h-8 md:h-10 mx-auto" fill="none">
      {[0, 50, 100, 150, 200, 250, 300, 350].map((x, i) => (
        <rect
          key={i}
          className="canopy-stripe"
          x={x}
          y="0"
          width="40"
          height="50"
          fill={i % 2 === 0 ? `${accent}0a` : `${accent}04`}
          rx="1"
        />
      ))}
      {/* Scalloped bottom edge */}
      <path
        className="canopy-edge"
        d="M0 45 Q12 50 25 45 Q38 50 50 45 Q62 50 75 45 Q88 50 100 45
           Q112 50 125 45 Q138 50 150 45 Q162 50 175 45 Q188 50 200 45
           Q212 50 225 45 Q238 50 250 45 Q262 50 275 45 Q288 50 300 45
           Q312 50 325 45 Q338 50 350 45 Q362 50 375 45 Q388 50 400 45"
        stroke={accent}
        strokeWidth="0.4"
        opacity="0.2"
      />
    </svg>
  );
}

function MonogramSeal({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 60 60" className="monogram-seal w-12 h-12 md:w-14 md:h-14 mx-auto" fill="none">
      <circle cx="30" cy="30" r="26" stroke={accent} strokeWidth="0.6" opacity="0.3" />
      <circle cx="30" cy="30" r="22" stroke={accent} strokeWidth="0.4" opacity="0.2" />
      <circle cx="30" cy="30" r="18" stroke={accent} strokeWidth="0.3" opacity="0.15" strokeDasharray="2 3" />
      <text x="30" y="34" textAnchor="middle" fill={accent} fontSize="12" fontFamily="serif" letterSpacing="1" opacity="0.35">T&amp;S</text>
      {/* Tiny petal ornaments at cardinal points */}
      {[0, 90, 180, 270].map((a) => {
        const r = 26;
        const cx = 30 + Math.cos((a * Math.PI) / 180) * r;
        const cy = 30 + Math.sin((a * Math.PI) / 180) * r;
        return <circle key={a} cx={cx} cy={cy} r="1" fill={accent} opacity="0.15" />;
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTRO — Warm sunlight gradient wipe through haveli arch
   introTl: arch reveal → jaali drift begins → title shimmer →
   copy fade → journey line draws
   ═══════════════════════════════════════════════════════════════════ */

function WorldIntro({
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

      const journeyLine = el.querySelector<SVGGeometryElement>(".journey-line");
      if (journeyLine && journeyLine.getTotalLength) {
        const jl = journeyLine.getTotalLength();
        gsap.set(journeyLine, { strokeDasharray: jl, strokeDashoffset: jl });
      }

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.5, delay: 0.3, onComplete });
        },
      });

      introTl.fromTo(
        el.querySelector(".sunlight-wash"),
        { opacity: 0 },
        { opacity: 0.3, duration: 1.5, ease: "power2.inOut" },
        0
      );

      introTl.to(archPaths, { strokeDashoffset: 0, duration: 2, stagger: 0.04, ease: "power2.inOut" }, 0.3);

      introTl.fromTo(
        el.querySelectorAll(".it-c"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.022, ease: "power3.out" },
        1.6
      );

      introTl.fromTo(
        el.querySelectorAll(".is-c"),
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.012, ease: "power3.out" },
        2.2
      );

      introTl.to(journeyLine, { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" }, 2.6);

      introTl.to(
        el.querySelectorAll(".city-dot circle, .city-dot text"),
        { opacity: 1, duration: 0.3, stagger: 0.12, ease: "power2.out" },
        3.0
      );

      introTl.to(
        el.querySelectorAll(".jaipur-ring"),
        { opacity: 0.4, duration: 0.6, ease: "power2.out" },
        4.0
      );
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const hi = "हमारी दुनिया";
  const en = "A World of Our Own";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#d8cbb4" }}
    >
      <div
        className="sunlight-wash absolute inset-0 opacity-0"
        style={{ background: `radial-gradient(ellipse 80% 70% at 55% 35%,${palette.accent}30,transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <HaveliArchFrame accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] font-light whitespace-nowrap mb-5" style={{ color: `${palette.foreground}dd` }}>
            {en.split("").map((c, i) => (
              <span key={i} className="is-c inline-block opacity-0" style={c === " " ? { whiteSpace: "pre" } : undefined}>{c}</span>
            ))}
          </p>
          <p className="font-serif font-hindi text-2xl md:text-4xl whitespace-nowrap" style={{ color: palette.accent }}>
            {hi.split(" ").map((word, i) => (
              <span key={i} className="it-c inline-block opacity-0 mr-[0.3em]">{word}</span>
            ))}
          </p>
          <div className="mt-8 w-full max-w-xs md:max-w-sm">
            <JourneyMap accent={palette.accent} fg={palette.foreground} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO — Calm, floating progression
   Sunlight warmth shift, jaali shadow drift, fabric sway,
   staggered decor reveal. Restrained motion, breathable.
   ═══════════════════════════════════════════════════════════════════ */

function WorldHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const dustMotes = useMemo(
    () => Array.from({ length: 16 }, () => ({
      w: 2 + Math.random() * 4,
      x: Math.random() * 100,
      y: 10 + Math.random() * 70,
      dur: 4 + Math.random() * 4,
    })),
    []
  );

  const decorItems = [
    { label: "Setting", value: "Linen-draped tables under soft canopies" },
    { label: "Florals", value: "Olive branches, dried florals, neutral ceramics" },
    { label: "Detail", value: "Handwritten notes mapping their journey" },
  ];

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const heroArchPaths = pin.querySelectorAll<SVGGeometryElement>(".hero-arch-frame .arch-s");
      heroArchPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const journeyLine = pin.querySelector<SVGGeometryElement>(".hero-journey .journey-line");
      if (journeyLine && journeyLine.getTotalLength) {
        const jl = journeyLine.getTotalLength();
        gsap.set(journeyLine, { strokeDasharray: jl, strokeDashoffset: jl });
      }

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

      scrollTl.to(heroArchPaths, { strokeDashoffset: 0, duration: 0.18, stagger: 0.02, ease: "power2.inOut" }, 0);

      scrollTl.fromTo(
        ".sunlight-hero",
        { opacity: 0 },
        { opacity: 0.25, duration: 0.2, ease: "power2.inOut" },
        0.02
      );

      scrollTl.fromTo(".b1-content", { opacity: 0.8 }, { opacity: 1, duration: 0.08 }, 0);

      scrollTl.fromTo(
        ".world-bg",
        { background: `linear-gradient(180deg,#c8b89c 0%,#d4c4a8 30%,#cabc9e 70%,#c0b094 100%)` },
        { background: `linear-gradient(180deg,#bca888 0%,#c8b498 30%,#c0a888 70%,#b8a480 100%)`, duration: 0.4 },
        0.15
      );

      scrollTl.fromTo(".jaali-shadow", { opacity: 0, x: -30 }, { opacity: 0.05, x: 30, duration: 0.8 }, 0.1);

      scrollTl.fromTo(".lyr-palace", { y: 0 }, { y: -20, duration: 1 }, 0);
      scrollTl.fromTo(".lyr-mid", { y: 0 }, { y: -35, duration: 1 }, 0);

      scrollTl.fromTo(
        pin.querySelectorAll(".narrative-line"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.06, ease: "power3.out" },
        0.25
      );

      scrollTl.to(journeyLine, { strokeDashoffset: 0, duration: 0.2, ease: "power1.inOut" }, 0.35);
      scrollTl.to(
        pin.querySelectorAll(".hero-journey .city-dot circle, .hero-journey .city-dot text"),
        { opacity: 1, duration: 0.06, stagger: 0.02 },
        0.4
      );
      scrollTl.to(
        pin.querySelectorAll(".hero-journey .jaipur-ring"),
        { opacity: 0.4, duration: 0.1 },
        0.52
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".decor-card"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.08, ease: "power3.out" },
        0.6
      );

      scrollTl.fromTo(".canopy-stripes", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.1 }, 0.55);

      gsap.to(pin.querySelectorAll(".canopy-stripe"), {
        y: "random(-1, 1)",
        duration: 2.5,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="world-bg absolute inset-0"
          style={{ background: `linear-gradient(180deg,#c8b89c 0%,#d4c4a8 30%,#cabc9e 70%,#c0b094 100%)` }}
        />

        {/* Sunlight wash — warm diagonal radial */}
        <div
          className="sunlight-hero absolute inset-0 opacity-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 60% 30%,${palette.accent}25,transparent 70%)` }}
        />

        {/* Palace wall parallax (background layer) */}
        <div className="lyr-palace absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,${palette.accent}06 3px,${palette.accent}06 4px)` }} />

        <JaaliShadow accent={palette.accent} />

        {/* Mid-layer parallax */}
        <div className="lyr-mid absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 6px,${palette.accent}04 6px,${palette.accent}04 7px)` }} />

        {/* Soft dust motes */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {dustMotes.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: d.w,
                height: d.w,
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: `radial-gradient(circle,${palette.accent}20,transparent)`,
                animation: `goldFoilSparkle ${d.dur}s ease-in-out ${d.dur * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Background arch frame */}
        <div className="hero-arch-frame absolute inset-0 flex items-end justify-center pointer-events-none pb-0 opacity-50">
          <HaveliArchFrame accent={palette.accent} />
        </div>

        {/* ── CONTENT: Title + narrative + journey ── */}
        <div className="b1-content absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <div className="mb-2">
            <LinenCanopyStripes accent={palette.accent} />
          </div>

          <h1 className="font-serif text-base md:text-xl uppercase tracking-[0.3em] font-light mb-5" style={{ color: `${palette.foreground}ee` }}>
            A World of Our Own
          </h1>
          <p className="font-serif font-hindi text-3xl md:text-5xl lg:text-6xl tracking-[0.04em] mb-3" style={{ color: "#4a3520", textShadow: `0 0 30px ${palette.accent}30` }}>
            हमारी दुनिया
          </p>
          <p className="text-xs italic tracking-[0.12em] mb-6" style={{ color: `${palette.foreground}aa` }}>
            Where every city they've lived in meets in one afternoon
          </p>

          <div className="max-w-md text-center mb-6 space-y-1">
            {[
              "Mumbai was the first meeting.",
              "Pune was where he grew up.",
              "London was where friendship became love.",
              "And it all led here.",
            ].map((line, i) => (
              <p key={i} className="narrative-line font-serif text-sm md:text-base italic opacity-0" style={{ color: `${palette.foreground}cc` }}>{line}</p>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-6">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon size={13} style={{ color: palette.accent }} className="mx-auto mb-1" />
                <p className="text-[9px] uppercase tracking-[0.15em]" style={{ color: `${palette.foreground}99` }}>{label}</p>
              </div>
            ))}
          </div>

          <div className="hero-journey w-full max-w-xs md:max-w-md mb-6">
            <JourneyMap accent={palette.accent} fg={palette.foreground} />
          </div>
        </div>

        {/* ── Decor cards — bottom (hidden on mobile to prevent overlap) ── */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {decorItems.map((d) => (
            <div
              key={d.label}
              className="decor-card px-5 py-4 rounded-sm text-center opacity-0"
              style={{ backgroundColor: `${palette.foreground}12`, border: `1px solid ${palette.accent}25`, backdropFilter: "blur(4px)" }}
            >
              <p className="text-[9px] uppercase tracking-[0.2em] mb-1 font-medium" style={{ color: "#5a4530" }}>{d.label}</p>
              <p className="font-serif text-xs md:text-sm" style={{ color: `${palette.foreground}ee` }}>{d.value}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 z-[6] pointer-events-none" style={{ background: `linear-gradient(to top,#c0b094,transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function WorldQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote = "This is not décor. This is an autobiography.";

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".aq-w"), { opacity: 0, y: 12 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden" style={{ backgroundColor: "#c8b89c" }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,#c8b89c,#c0b09020,#c8b89c)` }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <LotusDivider accent={palette.accent} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}bb` }}>
          &ldquo;{quote.split(" ").map((w, i) => (<span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>))}&rdquo;
        </p>
        <div className="mt-8">
          <MonogramSeal accent={palette.accent} />
        </div>
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
    <section ref={ref} className="py-8 md:py-12 px-6 relative" style={{ backgroundColor: "#cabb9e" }}>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: "#5a4530" }}>The Vibe · <span className="text-[0.78em] font-normal">माहौल</span></p>
        <LotusDivider accent={palette.accent} />
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 mb-6 px-2" style={{ color: `${palette.foreground}ee` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
        <LotusDivider accent={palette.accent} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   JOURNEY SECTION — Full-width city path with personal details
   ═══════════════════════════════════════════════════════════════════ */

function JourneySection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  const cities = [
    { name: "Mumbai", sub: "The First Meeting", detail: "Where they first crossed paths" },
    { name: "Pune", sub: "His Roots", detail: "Where he grew up" },
    { name: "London", sub: "Friends to More", detail: "Where friendship became love" },
    { name: "Cappadocia", sub: "Adventure Together", detail: "Where they explored and dreamed" },
    { name: "Udaipur", sub: "The Celebration", detail: "Where it all converges" },
  ];

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const journeyLine = el.querySelector<SVGGeometryElement>(".section-journey .journey-line");
    if (journeyLine && journeyLine.getTotalLength) {
      const jl = journeyLine.getTotalLength();
      gsap.set(journeyLine, { strokeDasharray: jl, strokeDashoffset: jl });
    }

    gsap.to(journeyLine, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });

    gsap.fromTo(
      el.querySelectorAll(".section-journey .city-dot circle, .section-journey .city-dot text"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(
      el.querySelectorAll(".section-journey .jaipur-ring"),
      { opacity: 0 },
      {
        opacity: 0.4,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(
      el.querySelectorAll(".city-card"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: "#c5b598" }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 40% at 50% 50%,${palette.accent}10,transparent 70%)` }} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium text-center" style={{ color: "#5a4530" }}>
          The Journey · यात्रा
        </p>

        <div className="section-journey mb-10">
          <JourneyMap accent={palette.accent} fg={palette.foreground} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cities.map((c) => (
            <div
              key={c.name}
              className="city-card text-center px-4 py-5 rounded-sm opacity-0"
              style={{ backgroundColor: `${palette.foreground}0c`, border: `1px solid ${palette.accent}20` }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-medium" style={{ color: "#5a4530" }}>{c.name}</p>
              <p className="font-serif text-sm mb-1" style={{ color: `${palette.foreground}ee` }}>{c.sub}</p>
              <p className="text-[10px] italic" style={{ color: `${palette.foreground}99` }}>{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — The Linen Collective
   ═══════════════════════════════════════════════════════════════════ */

function WorldDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".dc-c"), { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
    gsap.fromTo(el.querySelectorAll(".dc-i"), { opacity: 0, x: -8 }, {
      opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden" style={{ backgroundColor: "#cabb9e" }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%,${palette.accent}08,transparent 70%)` }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12 font-medium text-center" style={{ color: "#5a4530" }}>Attire · वेश विधान</p>
        <div className="dc-c relative rounded-sm p-10 md:p-14 opacity-0" style={{ background: `linear-gradient(165deg,${palette.foreground}0a,#c8b89c 50%,${palette.foreground}08)`, border: `1px solid ${palette.accent}25`, boxShadow: `inset 0 0 40px ${palette.accent}08` }}>
          {/* Corner ornaments */}
          {["top-0 left-0", "top-0 right-0 scale-x-[-1]", "bottom-0 left-0 scale-y-[-1]", "bottom-0 right-0 scale-[-1]"].map((pos, i) => (
            <svg key={i} viewBox="0 0 50 50" className={`absolute ${pos} w-8 h-8 md:w-10 md:h-10`} fill="none">
              <path d="M0 0 L0 20 Q2 8 8 4 Q14 2 20 0Z" fill={`${palette.accent}06`} />
              <path d="M0 0 L0 25 Q3 10 10 4 L25 0" stroke={palette.accent} strokeWidth="0.3" opacity="0.2" />
            </svg>
          ))}
          <div className="text-center mb-10">
            <p className="font-serif text-2xl md:text-3xl tracking-[0.04em] mb-3" style={{ color: "#4a3520" }}>{dressCode.title}</p>
            <div className="w-16 h-px mx-auto mb-5" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}50,transparent)` }} />
            <p className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto" style={{ color: `${palette.foreground}cc` }}>{dressCode.description}</p>
          </div>
          <div className="mb-10"><LotusDivider accent={palette.accent} /></div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: "#5a4530" }}>Embrace</h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}ee` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: `${palette.foreground}88` }}>Kindly Avoid</h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${palette.foreground}50` }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}aa` }}>{item}</span>
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

function WorldMoodSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="pt-24 md:pt-36 pb-12 md:pb-16 relative overflow-hidden"
      style={{ backgroundColor: "#c8b89c" }}
    >
      {/* Continuity texture & sun-glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 60% 40%, #fff7e6 0%, transparent 60%), url("https://www.transparenttextures.com/patterns/parchment.png")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Magazine-style Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#5a4530] opacity-20" />
            <p
              className="text-[10px] uppercase tracking-[0.5em] font-medium"
              style={{ color: "#5a4530" }}
            >
              The Collective Narrative · संचय
            </p>
            <div className="h-px w-8 bg-[#5a4530] opacity-20" />
          </div>

          <h3
            className="font-serif text-5xl md:text-7xl mb-10 tracking-tight text-[#4a3520]"
          >
            Sun-Drenched <span className="opacity-40 italic">&amp;</span> Simple
          </h3>

          <p className="max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed text-[#5a4530] opacity-70">
            A minimalist sanctuary where every texture tells a story of the cities that brought us together.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorldVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: "#cabb9e" }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: "#5a4530" }}>Venue · स्थान</p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: `${palette.foreground}ee` }}>{event.location}</h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}aa` }}>{event.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — FifthChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function FifthChapterContent({ event }: ChapterProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { palette } = event;

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8b89c", color: palette.foreground }}>
      {!introComplete && !prefersReducedMotion && (
        <WorldIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <WorldHero event={event} />
      <WorldQuote event={event} />

      <FadeInView>
        <section className="border-y py-8" style={{ borderColor: `${palette.foreground}15`, backgroundColor: "#c8b89c" }}>
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
      <div className="flex justify-center py-2" style={{ backgroundColor: "#c8b89c" }}><LotusDivider accent={palette.accent} /></div>
      <JourneySection event={event} />
      <div className="flex justify-center py-2" style={{ backgroundColor: "#c8b89c" }}><LotusDivider accent={palette.accent} /></div>
      <WorldDressCode event={event} />
      <div className="flex justify-center py-2" style={{ backgroundColor: "#c8b89c" }}><LotusDivider accent={palette.accent} /></div>
      <WorldMoodSection event={event} />
      <div className="flex justify-center py-2" style={{ backgroundColor: "#c8b89c" }}><LotusDivider accent={palette.accent} /></div>
      <WorldVenue event={event} />

      {/* Chapter navigation */}
      <FadeInView>
        <section className="py-8 md:py-10 px-6 border-t" style={{ borderColor: `${palette.foreground}12`, backgroundColor: "#c8b89c" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Link href="/itinerary" className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3" style={{ color: `${palette.foreground}88` }}>
                <ArrowLeft size={14} /> Back to Itinerary
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {prevEvent && (
                <Link href={`/chapter/${prevEvent.slug}`} className="group rounded-xl overflow-hidden border transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}10`, backgroundColor: `${palette.foreground}08` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={prevEvent.heroImage} alt={prevEvent.title} fill className="object-cover object-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,#c8b89cee)` }} />
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
                <Link href={`/chapter/${nextEvent.slug}`} className="group rounded-xl overflow-hidden border text-right transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}10`, backgroundColor: `${palette.foreground}08` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={nextEvent.heroImage} alt={nextEvent.title} fill className="object-cover object-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,#c8b89cee)` }} />
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
      <footer className="relative" style={{ backgroundColor: "#b8a888", borderTop: `1px solid ${palette.accent}20` }}>
        <div className="absolute -top-20 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to bottom,#c8b89c,#b8a888)` }} />
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <LotusDivider accent={palette.accent} />
          <p className="font-serif text-xs mb-4 mt-6" style={{ color: "#5a4530" }}>शुभ विवाह</p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${palette.foreground}ee` }}>
            Tarush <span style={{ color: "#6b5540" }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] tracking-[0.3em] font-body mb-10" style={{ color: "#5a4530" }}>{COUPLE.hashtag}</p>

          <div className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg" style={{ border: "1px solid #8a754818", background: "linear-gradient(165deg,#8a754808,transparent 40%,#6b554005)" }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: "#6b5540" }}>Your Presence Matters</p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic" style={{ color: `${palette.foreground}dd` }}>
              The celebration is incomplete without you.
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: `${palette.foreground}dd` }}>
              We eagerly await your presence.
            </p>
            <p className="mt-5 text-sm tracking-[0.08em]" style={{ color: "#6b5540" }}>
              आपकी उपस्थिति हमारा सम्मान है
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/rsvp" className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm hover:scale-105" style={{ backgroundColor: "#8a754818", color: "#5a4530", border: "1px solid #8a754830" }}>
                RSVP Now
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-10">
            {[{ href: "/itinerary", label: "Itinerary" }, { href: "/rsvp", label: "RSVP" }, { href: "/travel", label: "Travel" }].map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80" style={{ color: `${palette.foreground}aa` }}>{link.label}</Link>
            ))}
          </div>
          <p className="text-[11px] font-body tracking-wide mb-6" style={{ color: `${palette.foreground}88` }}>April 19–21, 2026 · Udaipur, Rajasthan</p>
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
