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
   SVG SET — The Courtyard Edit · Victorian Hi-Tea in Udaipur Haveli
   (1) Haveli arch/doorway  (2) Fresco border frame  (3) Jaali lattice
   (4) Stripe canopy        (5) Floral garlands       (6) Ornamental divider
   Light palette: warm cream bg, bronze accent, dusty rose, peach
   ═══════════════════════════════════════════════════════════════════ */

function HaveliArchOutline({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 420 520" className="arch-svg w-[280px] md:w-[360px] mx-auto" fill="none">
      <path
        className="arch-stroke"
        d="M40 520 L40 190 Q40 120 90 80 Q150 40 210 30 Q270 40 330 80 Q380 120 380 190 L380 520"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        className="arch-stroke"
        d="M60 510 L60 200 Q60 140 105 105 Q155 68 210 58 Q265 68 315 105 Q360 140 360 200 L360 510"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.4"
      />
      <path
        className="arch-stroke"
        d="M150 75 Q175 45 210 35 Q245 45 270 75"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.3"
      />
      <circle className="arch-stroke" cx="210" cy="26" r="4" stroke={accent} strokeWidth="0.6" />
      <path className="arch-stroke" d="M206 30 L210 12 L214 30" stroke={accent} strokeWidth="0.7" />
      {/* Ornamental pink-city scallop detail at top */}
      {[140, 175, 210, 245, 280].map((x) => (
        <circle key={x} className="arch-stroke" cx={x} cy={52 + Math.abs(x - 210) * 0.15} r="2.5" stroke={accent} strokeWidth="0.35" opacity="0.3" />
      ))}
      {/* Corner ornament brackets */}
      <path className="arch-stroke" d="M30 515 Q22 515 22 507 L22 490" stroke={accent} strokeWidth="0.4" opacity="0.35" />
      <path className="arch-stroke" d="M390 515 Q398 515 398 507 L398 490" stroke={accent} strokeWidth="0.4" opacity="0.35" />
    </svg>
  );
}

function FrescoBorderFrame({ accent, fg }: { accent: string; fg: string }) {
  return (
    <svg
      viewBox="0 0 800 60"
      className="fresco-border w-full h-10 md:h-14"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <pattern id="fresco-motif" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
          <path d="M50 8 Q42 18 30 20 Q42 22 50 32 Q58 22 70 20 Q58 18 50 8Z" stroke={accent} strokeWidth="0.5" opacity="0.3" fill={`${accent}08`} />
          <circle cx="50" cy="20" r="3" stroke={accent} strokeWidth="0.3" opacity="0.25" />
          <path d="M10 40 Q20 35 30 40 Q20 45 10 40Z" stroke={`${fg}20`} strokeWidth="0.3" fill="none" />
          <path d="M70 40 Q80 35 90 40 Q80 45 70 40Z" stroke={`${fg}20`} strokeWidth="0.3" fill="none" />
          <line x1="0" y1="55" x2="100" y2="55" stroke={`${fg}08`} strokeWidth="0.3" />
          <line x1="0" y1="5" x2="100" y2="5" stroke={`${fg}08`} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="60" fill="url(#fresco-motif)" />
    </svg>
  );
}

function JaaliLattice({ accent }: { accent: string }) {
  return (
    <svg
      className="jaali-overlay absolute inset-0 w-full h-full opacity-0"
      preserveAspectRatio="none"
      viewBox="0 0 400 400"
    >
      <defs>
        <pattern id="jaali-p" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M25 0 Q35 10 50 10 Q40 20 50 25 Q40 30 50 40 Q35 40 25 50 Q15 40 0 40 Q10 30 0 25 Q10 20 0 10 Q15 10 25 0Z"
            stroke={accent}
            strokeWidth="0.3"
            fill="none"
            opacity="0.12"
          />
          <circle cx="25" cy="25" r="2" stroke={accent} strokeWidth="0.2" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#jaali-p)" />
    </svg>
  );
}

function StripeCanopy({ accent, primary }: { accent: string; primary: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className="canopy-svg absolute top-0 left-0 right-0 w-full h-16 md:h-24"
      preserveAspectRatio="none"
      fill="none"
    >
      {Array.from({ length: 15 }, (_, i) => {
        const x = i * 80;
        const color = i % 2 === 0 ? `${accent}12` : `${primary}10`;
        return (
          <rect key={i} x={x} y="0" width="80" height="120" fill={color} />
        );
      })}
      <path
        d="M0 110 Q60 90 120 110 Q180 130 240 110 Q300 90 360 110 Q420 130 480 110 Q540 90 600 110 Q660 130 720 110 Q780 90 840 110 Q900 130 960 110 Q1020 90 1080 110 Q1140 130 1200 110"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.2"
        fill="none"
      />
      <line x1="0" y1="118" x2="1200" y2="118" stroke={accent} strokeWidth="0.4" opacity="0.15" />
    </svg>
  );
}

function FloralGarlandStrand({ x, accent, primary }: { x: number; accent: string; primary: string }) {
  return (
    <g className="garland-strand" transform={`translate(${x}, 0)`}>
      <path
        className="garland-stem"
        d="M0 0 Q-4 30 2 60 Q-2 90 0 120 Q3 150 -1 180"
        stroke={`${accent}30`}
        strokeWidth="0.5"
        fill="none"
      />
      {[20, 50, 80, 110, 140, 170].map((cy, i) => (
        <g key={i} className="garland-bloom">
          <circle
            cx={i % 2 === 0 ? -3 : 3}
            cy={cy}
            r={3 + (i % 3)}
            fill={i % 3 === 0 ? `${primary}25` : `${accent}18`}
            stroke={i % 3 === 0 ? `${primary}40` : `${accent}28`}
            strokeWidth="0.3"
          />
          {i % 2 === 0 && (
            <circle cx={i % 2 === 0 ? -3 : 3} cy={cy} r="1.5" fill={`${accent}20`} />
          )}
        </g>
      ))}
    </g>
  );
}

function HangingGarlands({ accent, primary }: { accent: string; primary: string }) {
  const positions = [80, 220, 360, 500, 640, 780, 920, 1060];
  return (
    <svg
      viewBox="0 0 1200 200"
      className="garlands-svg absolute top-12 md:top-20 left-0 right-0 w-full h-32 md:h-44"
      preserveAspectRatio="none"
      fill="none"
    >
      {positions.map((x) => (
        <FloralGarlandStrand key={x} x={x} accent={accent} primary={primary} />
      ))}
    </svg>
  );
}

function OrnamentalDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 30" className="w-32 md:w-40 h-auto mx-auto" fill="none">
      <line x1="0" y1="15" x2="70" y2="15" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <line x1="130" y1="15" x2="200" y2="15" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path
        d="M85 15 Q90 5 100 3 Q110 5 115 15 Q110 25 100 27 Q90 25 85 15Z"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.35"
        fill={`${accent}08`}
      />
      <circle cx="100" cy="15" r="2" fill={accent} opacity="0.2" />
      <path d="M78 12 Q82 15 78 18" stroke={accent} strokeWidth="0.3" opacity="0.2" fill="none" />
      <path d="M122 12 Q118 15 122 18" stroke={accent} strokeWidth="0.3" opacity="0.2" fill="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COURTYARD INTRO
   introTl: haveli arch draw → fresco mask-wipe → title float-up
   → stripe canopy slide → floral garland drop + sway loop
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardIntro({
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
          gsap.to(el, { opacity: 0, duration: 0.5, delay: 0.2, onComplete });
        },
      });

      introTl.to(strokes, {
        strokeDashoffset: 0,
        duration: 1.6,
        stagger: 0.06,
        ease: "power2.inOut",
      }, 0);

      introTl.fromTo(
        el.querySelector(".fresco-border"),
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut" },
        0.4
      );

      introTl.fromTo(
        el.querySelectorAll(".it-char"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power3.out" },
        1.0
      );

      introTl.fromTo(
        el.querySelectorAll(".is-char"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.015, ease: "power3.out" },
        1.6
      );

      introTl.fromTo(
        el.querySelector(".id-script"),
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        1.9
      );

      introTl.fromTo(
        el.querySelector(".canopy-svg"),
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power3.out" },
        2.2
      );

      introTl.fromTo(
        el.querySelectorAll(".garland-strand"),
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        2.6
      );

      introTl.add(() => {
        gsap.to(el.querySelectorAll(".garland-bloom"), {
          x: "random(-2, 2)",
          rotation: "random(-3, 3)",
          duration: 2,
          stagger: { each: 0.04, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });
      }, 3.4);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const title = "The Courtyard Edit";
  const sub = "A Victorian Hi-Tea at a Royal Palace";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#c8b8a4" }}
    >
      <StripeCanopy accent={palette.accent} primary={palette.primary} />
      <HangingGarlands accent={palette.accent} primary={palette.primary} />

      <div className="absolute bottom-0 left-0 right-0">
        <FrescoBorderFrame accent={palette.accent} fg={palette.foreground} />
      </div>

      <div className="relative z-10 text-center">
        <HaveliArchOutline accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="font-serif text-3xl md:text-5xl mb-2 tracking-[0.04em] whitespace-nowrap"
            style={{ color: palette.foreground }}
          >
            {title.split("").map((c, i) => (
              <span
                key={i}
                className="it-char inline-block opacity-0"
                style={c === " " ? { whiteSpace: "pre" } : undefined}
              >
                {c}
              </span>
            ))}
          </p>
          <p
            className="text-[11px] md:text-xs uppercase tracking-[0.35em] font-light whitespace-nowrap"
            style={{ color: `${palette.foreground}aa` }}
          >
            {sub.split("").map((c, i) => (
              <span
                key={i}
                className="is-char inline-block opacity-0"
                style={c === " " ? { whiteSpace: "pre" } : undefined}
              >
                {c}
              </span>
            ))}
          </p>
          <p
            className="id-script font-serif text-xl md:text-2xl mt-3 tracking-[0.2em] opacity-0"
            style={{ color: palette.accent }}
          >
            आंगन
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO — Morning Gold → Crisp Midday
   Pinned scene: title + canopy + garlands + hi-tea details
   Jaali lattice parallax, dust motes, sun flares
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const sunDots = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        w: 3 + Math.random() * 6,
        x: Math.random() * 100,
        y: 5 + Math.random() * 50,
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
        ".hero-bg-light",
        { background: `linear-gradient(180deg,#d5c4ac 0%,#c8b8a0 40%,#bfb096 100%)` },
        { background: `linear-gradient(180deg,${palette.muted} 0%,#d8cfc2 40%,${palette.background} 100%)`, duration: 1 },
        0
      );

      scrollTl.to(".lyr-jaali", { y: -30, opacity: 0.08, duration: 1 }, 0);
      scrollTl.to(".lyr-dust", { y: -50, duration: 1 }, 0);

      scrollTl.fromTo(
        pin.querySelectorAll(".h-line"),
        { opacity: 0.7, y: 8 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.07 },
        0
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".h-dec"),
        { opacity: 0.7, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.04, duration: 0.1 },
        0.05
      );

      scrollTl.fromTo(
        ".canopy-hero",
        { y: "-60%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.25, ease: "power2.out" },
        0.12
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".garland-hero"),
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.15 },
        0.22
      );

      scrollTl.fromTo(
        pin.querySelectorAll(".detail-card"),
        { opacity: 0, y: 24, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.04, duration: 0.12 },
        0.4
      );
    },
    { scope: wrapRef }
  );

  const narrative = [
    "Step through arched doorways into a courtyard dressed in pastels and heritage.",
    "Hand-painted frescoes frame every corner,",
    "fine bone china and silver service set the table.",
    "Rajasthan's royal hospitality reimagined —",
    "where meticulous craft meets modern editorial restraint.",
  ];

  const hiTeaDetails = [
    { label: "Setting", value: "Fresco-lined Courtyard" },
    { label: "Service", value: "Victorian Silver & Bone China" },
    { label: "Ambiance", value: "Pastels, Jasmine & Sunlight" },
  ];

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="hero-bg-light absolute inset-0"
          style={{ background: `linear-gradient(180deg,#d5c4ac 0%,#c8b8a0 40%,#bfb096 100%)` }}
        />

        <JaaliLattice accent={palette.accent} />

        {/* Dust motes / sun flares */}
        <div className="lyr-dust absolute inset-0 pointer-events-none opacity-40">
          {sunDots.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: d.w,
                height: d.w,
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: `radial-gradient(circle,${palette.accent}30,transparent)`,
              }}
            />
          ))}
        </div>

        {/* Canopy from top */}
        <div className="canopy-hero absolute top-0 left-0 right-0 opacity-0">
          <StripeCanopy accent={palette.accent} primary={palette.primary} />
        </div>

        {/* Garland accents at top corners */}
        <svg viewBox="0 0 400 160" className="garland-hero absolute top-12 left-4 w-28 md:w-40 h-auto opacity-0" fill="none">
          <FloralGarlandStrand x={30} accent={palette.accent} primary={palette.primary} />
          <FloralGarlandStrand x={70} accent={palette.accent} primary={palette.primary} />
        </svg>
        <svg viewBox="0 0 400 160" className="garland-hero absolute top-12 right-4 w-28 md:w-40 h-auto opacity-0" fill="none">
          <FloralGarlandStrand x={310} accent={palette.accent} primary={palette.primary} />
          <FloralGarlandStrand x={350} accent={palette.accent} primary={palette.primary} />
        </svg>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.03em] mb-3"
            style={{ color: palette.foreground }}
          >
            The Courtyard Edit
          </h1>
          <p
            className="font-serif text-lg md:text-xl tracking-[0.15em] mb-2"
            style={{ color: palette.accent }}
          >
            आंगन
          </p>
          <h2
            className="text-sm md:text-base uppercase tracking-[0.3em] font-light mb-10"
            style={{ color: `${palette.foreground}aa` }}
          >
            A Victorian Hi-Tea at a Royal Palace
          </h2>

          <div className="max-w-xl text-center space-y-1.5 mb-10">
            {narrative.map((line, i) => (
              <p
                key={i}
                className="h-line font-serif text-[15px] md:text-lg italic leading-relaxed"
                style={{ color: `${palette.foreground}bb` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-6 md:gap-8 mb-10">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="h-dec text-center opacity-0">
                <Icon size={16} style={{ color: palette.accent }} className="mx-auto mb-1.5" />
                <p className="text-[11px] uppercase tracking-[0.15em]" style={{ color: `${palette.foreground}88` }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Hi-tea detail cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {hiTeaDetails.map((d) => (
              <div
                key={d.label}
                className="detail-card group relative px-5 py-4 rounded-sm text-center opacity-0 cursor-default"
                style={{
                  backgroundColor: `${palette.background}cc`,
                  border: `1px solid ${palette.accent}30`,
                  boxShadow: `0 2px 12px ${palette.foreground}08`,
                }}
              >
                {/* Ink-wash bloom on hover */}
                <div
                  className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%,${palette.primary}20,transparent 70%)`,
                  }}
                />
                <p className="text-[10px] uppercase tracking-[0.2em] mb-1 relative z-10" style={{ color: palette.accent }}>
                  {d.label}
                </p>
                <p className="font-serif text-sm relative z-10" style={{ color: palette.foreground }}>
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fresco border */}
        <div className="absolute bottom-0 left-0 right-0 z-[5]">
          <FrescoBorderFrame accent={palette.accent} fg={palette.foreground} />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-[6] pointer-events-none"
          style={{ background: `linear-gradient(to top,${palette.background},transparent)` }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote =
    "Rajasthan reimagined inside a refined, modern setting — where meticulous Mughal craft meets editorial restraint.";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".aq-w"),
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0,
          duration: 0.45, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg,${palette.background},${palette.muted}20,${palette.background})` }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <OrnamentalDivider accent={palette.accent} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}66` }}>
          &ldquo;
          {quote.split(" ").map((w, i) => (
            <span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>
          ))}
          &rdquo;
        </p>
        <p className="font-serif text-3xl md:text-5xl mt-6 tracking-[0.15em]" style={{ color: `${palette.accent}18` }}>
          विरासत
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
    <section ref={ref} className="py-8 md:py-12 px-6 relative" style={{ backgroundColor: palette.background }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 40% at 50% 50%,${palette.accent}04,transparent 70%)` }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>
          The Vibe · माहौल
        </p>
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed px-2" style={{ color: `${palette.foreground}cc` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — Pastel Organza · Courtyard Edition
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(el.querySelector(".dc-card"), { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
      });
      gsap.fromTo(el.querySelectorAll(".dc-i"), { opacity: 0, x: -10 }, {
        opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%,${palette.primary}08,transparent 70%)` }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12 font-medium text-center" style={{ color: palette.accent }}>
          Attire · परिधान
        </p>
        <div
          className="dc-card relative rounded-sm p-10 md:p-14 opacity-0"
          style={{
            background: `linear-gradient(165deg,${palette.secondary}40,${palette.background} 50%,${palette.muted}30)`,
            border: `1px solid ${palette.accent}15`,
            boxShadow: `inset 0 0 50px ${palette.primary}06`,
          }}
        >
          {[
            "top-0 left-0",
            "top-0 right-0 scale-x-[-1]",
            "bottom-0 left-0 scale-y-[-1]",
            "bottom-0 right-0 scale-[-1]",
          ].map((pos, i) => (
            <svg key={i} viewBox="0 0 50 50" className={`absolute ${pos} w-8 h-8 md:w-11 md:h-11`} fill="none">
              <path d="M0 0 Q0 20 8 30 Q4 15 20 8 Q30 4 50 0Z" fill={`${palette.accent}08`} />
              <path d="M0 0 Q2 22 10 32 Q6 14 22 7 Q32 3 50 0" stroke={palette.accent} strokeWidth="0.4" opacity="0.25" />
            </svg>
          ))}

          <div className="text-center mb-10">
            <p className="font-serif text-2xl md:text-3xl tracking-[0.04em] mb-3" style={{ color: palette.foreground }}>
              {dressCode.title}
            </p>
            <div className="w-16 h-px mx-auto mb-5" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}40,transparent)` }} />
            <p className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto" style={{ color: `${palette.foreground}88` }}>
              {dressCode.description}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}20)` }} />
            <OrnamentalDivider accent={palette.accent} />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${palette.accent}20,transparent)` }} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: palette.accent }}>
                Embrace
              </h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}bb` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: `${palette.foreground}55` }}>
                Kindly Avoid
              </h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${palette.foreground}25` }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}66` }}>{item}</span>
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
   GALLERY — soft masonry
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;
  const ref = useRef<HTMLDivElement>(null);
  const heights = [320, 380, 260, 300];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(el.querySelectorAll(".gi"), { opacity: 0, scale: 0.9, y: 35 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium" style={{ color: palette.accent }}>
          Mood · माहौल
        </p>
        <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4 w-full">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="gi break-inside-avoid rounded-2xl relative overflow-hidden group cursor-pointer w-full min-w-0"
              style={{ height: heights[i] || 300 }}
            >
              <Image src={src} alt={`${event.title} mood ${i + 1}`} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw,33vw" />
              <div className="absolute inset-0 opacity-15 group-hover:opacity-0 transition-opacity duration-500" style={{ backgroundColor: palette.muted }} />
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: `linear-gradient(135deg,${palette.primary}20,transparent 60%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VENUE
   ═══════════════════════════════════════════════════════════════════ */

function CourtyardVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>
          Venue · स्थान
        </p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: palette.foreground }}>
          {event.location}
        </h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}77` }}>{event.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — SecondChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function SecondChapterContent({ event }: ChapterProps) {
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
        <CourtyardIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />

      <CourtyardHero event={event} />

      <CourtyardQuote event={event} />

      <FadeInView>
        <section className="border-y py-8" style={{ borderColor: `${palette.foreground}0a`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: CalendarDays, label: `${event.date} · ${event.day}` },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: `${event.location}, ${event.venue}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm" style={{ color: `${palette.foreground}88` }}>
                <Icon size={16} style={{ color: palette.accent }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      <StorySection event={event} />

      <div className="flex justify-center" style={{ backgroundColor: palette.background }}>
        <OrnamentalDivider accent={palette.accent} />
      </div>

      <CourtyardDressCode event={event} />

      <div className="flex justify-center" style={{ backgroundColor: palette.background }}>
        <OrnamentalDivider accent={palette.accent} />
      </div>

      <CourtyardGallery event={event} />

      <div className="flex justify-center" style={{ backgroundColor: palette.background }}>
        <OrnamentalDivider accent={palette.accent} />
      </div>

      <CourtyardVenue event={event} />

      {/* Chapter navigation */}
      <FadeInView>
        <section
          className="py-8 md:py-10 px-6 border-t"
          style={{ borderColor: `${palette.foreground}08`, backgroundColor: palette.background }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3"
                style={{ color: `${palette.foreground}77` }}
              >
                <ArrowLeft size={14} />
                Back to Itinerary
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {prevEvent ? (
                <Link
                  href={`/chapter/${prevEvent.slug}`}
                  className="group rounded-2xl overflow-hidden border transition-all duration-500 relative"
                  style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}30` }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image src={prevEvent.heroImage} alt={prevEvent.title} fill className="object-cover object-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}44` }}>← Previous Chapter</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{prevEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{prevEvent.subtitle}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextEvent ? (
                <Link
                  href={`/chapter/${nextEvent.slug}`}
                  className="group rounded-2xl overflow-hidden border text-right transition-all duration-500 relative"
                  style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}30` }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image src={nextEvent.heroImage} alt={nextEvent.title} fill className="object-cover object-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}44` }}>Next Chapter →</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{nextEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{nextEvent.subtitle}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Chapter-themed footer — warm gray instead of pure white */}
      <footer
        className="relative"
        style={{ backgroundColor: "#d8d0c4", borderTop: `1px solid ${palette.accent}20` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <div className="flex justify-center mb-6">
            <OrnamentalDivider accent={palette.accent} />
          </div>
          <p className="font-serif text-sm mb-4 tracking-[0.3em]" style={{ color: `${palette.accent}` }}>
            शुभ विवाह
          </p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: palette.foreground }}>
            Tarush <span style={{ color: palette.accent }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] font-body mb-10" style={{ color: `${palette.accent}cc` }}>
            #TarushAndSanjana
          </p>

          <div className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg" style={{ border: `1px solid ${palette.accent}30`, background: `linear-gradient(165deg,${palette.accent}08,transparent 40%,${palette.primary}05)` }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: `${palette.accent}` }}>Your Presence Matters</p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic" style={{ color: `${palette.foreground}dd` }}>
              The celebration is incomplete without you.
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: `${palette.foreground}dd` }}>
              We eagerly await your presence.
            </p>
            <p className="mt-5 text-sm tracking-[0.08em]" style={{ color: `${palette.accent}cc` }}>
              आपकी उपस्थिति हमारा सम्मान है
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/rsvp" className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm hover:scale-105" style={{ backgroundColor: `${palette.accent}18`, color: palette.accent, border: `1px solid ${palette.accent}35` }}>
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
                className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-70"
                style={{ color: `${palette.foreground}99` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to right,transparent,${palette.accent}50)` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ border: `1px solid ${palette.accent}50` }} />
            <div className="h-px w-10 md:w-20" style={{ background: `linear-gradient(to left,transparent,${palette.accent}50)` }} />
          </div>
          <p className="text-[11px] font-body tracking-wide" style={{ color: `${palette.foreground}77` }}>
            April 19–21, 2026 · Udaipur, Rajasthan
          </p>
        </div>
      </footer>
    </div>
  );
}
