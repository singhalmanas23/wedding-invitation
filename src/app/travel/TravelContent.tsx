"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TRAVEL_INFO, COUPLE } from "@/content/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  P,
  RoyalPageWrapper,
  RoyalSectionFrame,
  RoyalFlourish,
} from "@/components/shared/RoyalPageLayout";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   SVG COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function PalaceSilhouette() {
  return (
    <svg
      viewBox="0 0 800 220"
      className="palace-sil absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] h-auto pointer-events-none"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
    >
      <path
        d="M0 220 L0 180 L30 180 L30 140 L50 140 L50 120 L60 100 Q70 80 80 100 L90 120 L90 140 L120 140 L120 110 L130 90 Q140 70 150 90 L160 110 L160 140 L180 140 L180 160 L200 160 L200 120 L210 100 Q220 75 230 60 Q240 45 260 35 Q280 25 300 20 L310 18 Q320 16 340 14 Q360 12 380 11 Q400 10 420 11 Q440 12 460 14 Q480 16 490 18 L500 20 Q520 25 540 35 Q560 45 570 60 Q580 75 590 100 L600 120 L600 160 L620 160 L620 140 L640 140 L650 110 Q660 90 670 110 L680 140 L710 140 L710 120 L720 100 Q730 80 740 100 L750 120 L750 140 L770 140 L770 180 L800 180 L800 220Z"
        fill={`${P.gold}06`}
        stroke={`${P.gold}10`}
        strokeWidth="0.5"
      />
      {/* Domes */}
      <ellipse cx="400" cy="18" rx="25" ry="8" fill={`${P.gold}04`} stroke={`${P.gold}08`} strokeWidth="0.3" />
      <path d="M395 10 L400 0 L405 10" stroke={`${P.gold}10`} strokeWidth="0.4" />
      <ellipse cx="140" cy="92" rx="12" ry="5" fill={`${P.gold}03`} stroke={`${P.gold}08`} strokeWidth="0.3" />
      <ellipse cx="660" cy="92" rx="12" ry="5" fill={`${P.gold}03`} stroke={`${P.gold}08`} strokeWidth="0.3" />
      {/* Windows */}
      {[280, 340, 400, 460, 520].map((x) => (
        <path key={x} d={`M${x - 6} 55 Q${x} 42 ${x + 6} 55 L${x + 6} 70 L${x - 6} 70Z`} stroke={`${P.gold}08`} strokeWidth="0.3" fill={`${P.gold}02`} />
      ))}
    </svg>
  );
}

function FlightPathSVG() {
  return (
    <svg viewBox="0 0 600 120" className="flight-path-svg w-full h-auto" fill="none">
      {/* Curved flight path */}
      <path
        className="fp-line"
        d="M30 90 Q120 85 180 60 Q240 35 300 25 Q360 15 420 30 Q480 45 540 80 L570 90"
        stroke={P.gold}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Dashed trail */}
      <path
        className="fp-trail"
        d="M30 90 Q120 85 180 60 Q240 35 300 25 Q360 15 420 30 Q480 45 540 80 L570 90"
        stroke={`${P.gold}`}
        strokeWidth="0.4"
        strokeDasharray="3 6"
        opacity="0.2"
      />
      {/* Airport marker */}
      <circle cx="30" cy="90" r="5" stroke={P.gold} strokeWidth="0.8" fill={`${P.gold}15`} />
      <circle cx="30" cy="90" r="2" fill={`${P.gold}50`} />
      <text x="30" y="110" textAnchor="middle" fill={`${P.cream}60`} fontSize="8" fontFamily="serif">JAI</text>
      {/* Airplane icon at midpoint */}
      <g className="fp-plane" transform="translate(300,22) rotate(-8)">
        <path d="M-6 0 L-2 -1.5 L4 -4 L6 -1 L2 0 L6 1 L4 4 L-2 1.5Z" fill={P.gold} opacity="0.7" />
      </g>
      {/* Venue marker */}
      <circle cx="570" cy="90" r="5" stroke={P.gold} strokeWidth="0.8" fill={`${P.gold}15`} />
      <circle cx="570" cy="90" r="2" fill={`${P.gold}50`} />
      <text x="570" y="110" textAnchor="middle" fill={`${P.cream}60`} fontSize="8" fontFamily="serif">Venue</text>
    </svg>
  );
}

function WaxSealSVG({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="25" fill={`${P.maroon}cc`} stroke={`${P.gold}40`} strokeWidth="1" />
      <circle cx="30" cy="30" r="20" stroke={`${P.gold}30`} strokeWidth="0.5" />
      <circle cx="30" cy="30" r="15" stroke={`${P.gold}20`} strokeWidth="0.3" strokeDasharray="2 3" />
      <text x="30" y="34" textAnchor="middle" fill={`${P.gold}80`} fontSize="11" fontFamily="serif" fontWeight="bold">T&amp;S</text>
      {/* Wax drip edges */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = 25 + Math.random() * 3;
        const x = 30 + Math.cos((a * Math.PI) / 180) * r;
        const y = 30 + Math.sin((a * Math.PI) / 180) * r;
        return <circle key={a} cx={x} cy={y} r={1.5 + Math.random()} fill={`${P.maroon}aa`} />;
      })}
    </svg>
  );
}

function OrnamentalDivider() {
  return (
    <div className="orn-div flex items-center justify-center py-8" aria-hidden="true">
      <div className="orn-line-l h-px w-16 md:w-28 origin-right" style={{ background: `linear-gradient(to right,transparent,${P.gold}25)` }} />
      <svg viewBox="0 0 60 20" className="orn-motif w-10 mx-4 opacity-0" fill="none">
        <path d="M5 10 Q15 2 30 10 Q45 18 55 10" stroke={`${P.gold}30`} strokeWidth="0.5" />
        <path d="M5 10 Q15 18 30 10 Q45 2 55 10" stroke={`${P.gold}20`} strokeWidth="0.5" />
        <circle cx="30" cy="10" r="2" fill={`${P.gold}25`} />
      </svg>
      <div className="orn-line-r h-px w-16 md:w-28 origin-left" style={{ background: `linear-gradient(to left,transparent,${P.gold}25)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROYAL ARRIVAL HERO
   ═══════════════════════════════════════════════════════════ */

function RoyalArrivalHero() {
  const ref = useRef<HTMLElement>(null);

  const dustMotes = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      s: 1 + Math.random() * 2,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.15,
    })),
    []
  );

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(".hero-label", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(".hero-title", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: "power3.out" });
    gsap.fromTo(".hero-sub", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
    gsap.fromTo(".hero-desc", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: "power3.out" });
    gsap.fromTo(".palace-sil", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power2.out" });

    gsap.fromTo(
      ".shimmer-sweep",
      { x: "-100%" },
      { x: "200%", duration: 3, delay: 1, ease: "power2.inOut", repeat: -1, repeatDelay: 8 }
    );

    el.querySelectorAll(".dust-mote").forEach((m) => {
      gsap.to(m, {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative pt-32 pb-28 md:pt-44 md:pb-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,${P.muted}40 0%,${P.bg} 70%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 30%,rgba(139,26,26,0.1),transparent 70%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 40% 30% at 50% 40%,${P.gold}05,transparent 60%)` }} />

      {/* Dust motes */}
      {dustMotes.map((m, i) => (
        <div
          key={i}
          className="dust-mote absolute rounded-full pointer-events-none"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.s, height: m.s, backgroundColor: `${P.gold}`, opacity: m.opacity }}
        />
      ))}

      <PalaceSilhouette />

      {/* Shimmer sweep on border */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none" style={{ backgroundColor: `${P.gold}08` }}>
        <div className="shimmer-sweep absolute top-0 h-full w-24" style={{ background: `linear-gradient(90deg,transparent,${P.gold}30,transparent)` }} />
      </div>

      {/* Arch frame */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] pointer-events-none">
        <svg viewBox="0 0 400 500" className="w-64 md:w-80 h-auto opacity-[0.04]" fill="none">
          <path d="M60 500 V220 Q60 80 200 30 Q340 80 340 220 V500" stroke={P.gold} strokeWidth="1" />
          <path d="M85 480 V235 Q85 110 200 65 Q315 110 315 235 V480" stroke={P.gold} strokeWidth="0.5" />
          <circle cx="200" cy="45" r="5" stroke={P.gold} strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="hero-label text-[11px] uppercase tracking-[0.3em] font-body mb-6 opacity-0" style={{ color: `${P.gold}99` }}>
          {COUPLE.location}
        </p>
        <RoyalFlourish className="mb-8" />
        <h1 className="hero-title font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-0" style={{ color: P.cream }}>
          Royal Arrival
        </h1>
        <p className="hero-sub mt-4 font-serif text-lg md:text-xl tracking-[0.08em] opacity-0" style={{ color: `${P.gold}aa` }}>
          Getting There
        </p>
        <p className="hero-desc mt-6 text-base md:text-lg font-body max-w-lg mx-auto leading-relaxed opacity-0" style={{ color: `${P.cream}55` }}>
          Your curated arrival protocol to {COUPLE.venue}.
        </p>
        <RoyalFlourish className="mt-10" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRAVEL CONCIERGE CARD
   ═══════════════════════════════════════════════════════════ */

function TravelConcierge() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref} className="opacity-0">
          <RoyalSectionFrame glow className="p-8 md:p-12 relative overflow-hidden frame-shimmer glow-pulse">
            {/* Border shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none z-20" style={{ backgroundColor: `${P.gold}06` }}>
              <div className="border-shimmer absolute top-0 h-full w-20" style={{ background: `linear-gradient(90deg,transparent,${P.gold}40,transparent)` }} />
            </div>
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 60% at 85% 20%,${P.gold}05,transparent 60%)` }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.gold} strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <p className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: `${P.gold}88` }}>
                  Travel Concierge
                </p>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl mb-3 mt-4" style={{ color: P.cream }}>
                We&rsquo;ll handle everything.
              </h2>
              <p className="font-body text-sm leading-relaxed mb-8 max-w-md" style={{ color: `${P.cream}70` }}>
                Complimentary airport pickups are arranged for all guests.
                Share your flight details and a chauffeur will greet you at arrivals.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/rsvp"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: `${P.gold}18`, color: P.gold, border: `1px solid ${P.gold}30` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                  </svg>
                  Share Flight Details
                </a>
                <a
                  href={`tel:${TRAVEL_INFO.contacts[1]?.phone.replace(/\s/g, "") ?? ""}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.15em] font-medium rounded-sm transition-all duration-300 hover:scale-105"
                  style={{ color: `${P.cream}77`, border: `1px solid ${P.gold}15` }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call Travel Desk
                </a>
              </div>
            </div>
          </RoyalSectionFrame>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ARRIVAL GATE — Animated Flight Path
   ═══════════════════════════════════════════════════════════ */

function ArrivalGate() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const fpLine = el.querySelector<SVGGeometryElement>(".fp-line");
    if (fpLine && fpLine.getTotalLength) {
      const len = fpLine.getTotalLength();
      gsap.set(fpLine, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(fpLine, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }

    gsap.fromTo(".fp-plane", { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: 1.5, ease: "back.out(2)",
      scrollTrigger: { trigger: el, start: "top 75%" },
    });

    gsap.fromTo(el.querySelectorAll(".gate-chip"), { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });

    gsap.fromTo(el.querySelectorAll(".gate-detail"), { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 65%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="scroll-heading text-[10px] uppercase tracking-[0.35em] font-bold mb-4 opacity-0" style={{ color: `${P.gold}66` }}>
            The Arrival Gate · आगमन द्वार
          </p>
          <h2 className="scroll-heading font-serif text-3xl md:text-4xl opacity-0" style={{ color: P.cream }}>
            Your Journey to Udaipur
          </h2>
        </div>

        <RoyalSectionFrame glow className="p-6 md:p-10 relative frame-shimmer glow-pulse">
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none z-20" style={{ backgroundColor: `${P.gold}06` }}>
            <div className="border-shimmer absolute top-0 h-full w-20" style={{ background: `linear-gradient(90deg,transparent,${P.gold}40,transparent)` }} />
          </div>
          <FlightPathSVG />

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "Airport", value: "UDR — Udaipur" },
              { label: "Distance", value: "~24 km" },
              { label: "ETA", value: "30–40 min" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="gate-chip px-4 py-2 rounded-sm text-center opacity-0"
                style={{ border: `1px solid ${P.gold}15`, backgroundColor: `${P.muted}40` }}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: `${P.gold}66` }}>{chip.label}</p>
                <p className="font-serif text-sm" style={{ color: `${P.cream}cc` }}>{chip.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="gate-detail flex items-start gap-3 opacity-0">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: `${P.gold}60` }} />
              <p className="font-body text-sm leading-relaxed" style={{ color: `${P.cream}70` }}>
                {TRAVEL_INFO.airport} — {TRAVEL_INFO.distance}
              </p>
            </div>
            <div className="gate-detail flex items-start gap-3 opacity-0">
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: `${P.gold}60` }} />
              <p className="font-body text-sm leading-relaxed" style={{ color: `${P.cream}70` }}>
                {TRAVEL_INFO.pickupNote}
              </p>
            </div>
          </div>
        </RoyalSectionFrame>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ARRIVAL TIMELINE — 4 Steps with Glowing Progress Line
   ═══════════════════════════════════════════════════════════ */

const TIMELINE_STEPS = [
  { icon: "M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z", label: "Touchdown", hindi: "उतरना" },
  { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", label: "Meet at Gate", hindi: "स्वागत" },
  { icon: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-5.4A1 1 0 0014.4 4H9.6a1 1 0 00-.9.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2", label: "Royal Drive", hindi: "शाही सवारी", extra: "M7 17a2 2 0 100-4 2 2 0 000 4zM17 17a2 2 0 100-4 2 2 0 000 4z" },
  { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", label: "Palace Welcome", hindi: "महल में प्रवेश", extra: "M9 22V12h6v10" },
];

function ArrivalTimeline() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const line = el.querySelector<SVGGeometryElement>(".tl-progress");
    if (line && line.getTotalLength) {
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }

    gsap.fromTo(el.querySelectorAll(".tl-step"), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="scroll-heading text-[10px] uppercase tracking-[0.35em] font-bold mb-4 opacity-0" style={{ color: `${P.gold}55` }}>
            Your Arrival Protocol
          </p>
          <h2 className="scroll-heading font-serif text-2xl md:text-3xl opacity-0" style={{ color: `${P.cream}dd` }}>
            From Touchdown to Palace
          </h2>
        </div>

        <div className="relative">
          {/* Progress line SVG */}
          <svg className="absolute top-8 left-0 w-full h-1 hidden md:block" viewBox="0 0 800 4" preserveAspectRatio="none">
            <line x1="80" y1="2" x2="720" y2="2" stroke={`${P.gold}12`} strokeWidth="1" />
            <line className="tl-progress" x1="80" y1="2" x2="720" y2="2" stroke={P.gold} strokeWidth="1.5" opacity="0.4" />
          </svg>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.label} className="tl-step text-center opacity-0">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 relative glow-pulse"
                  style={{ backgroundColor: `${P.muted}60`, border: `1px solid ${P.gold}20` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.icon} />
                    {step.extra && <path d={step.extra} />}
                  </svg>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: P.maroon, color: `${P.gold}cc`, border: `1px solid ${P.gold}25` }}>
                    {i + 1}
                  </div>
                </div>
                <p className="font-serif text-sm mb-1" style={{ color: `${P.cream}cc` }}>{step.label}</p>
                <p className="text-[10px] tracking-wide" style={{ color: `${P.gold}44` }}>{step.hindi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRANSPORT TABS — Interactive How to Reach
   ═══════════════════════════════════════════════════════════ */

const TRANSPORT_MODES = [
  {
    id: "car",
    label: "By Car",
    icon: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-5.4A1 1 0 0014.4 4H9.6a1 1 0 00-.9.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2",
    extra: "M7 17a2 2 0 100-4 2 2 0 000 4zM17 17a2 2 0 100-4 2 2 0 000 4z",
    title: "Self-Drive / Private Car",
    directions: "Take NH-48 from Maharana Pratap Airport towards the city centre. The Leela Palace is approximately a 30-minute drive along Lake Pichola. Follow signs for the lakefront — the hotel entrance will be on your left.",
    eta: "30–40 min",
    mapQuery: "The+Leela+Palace+Udaipur",
  },
  {
    id: "pickup",
    label: "Arranged Pickup",
    icon: "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z",
    extra: "M12 13a3 3 0 100-6 3 3 0 000 6z",
    title: "Complimentary Chauffeur",
    directions: "Share your flight details via the guest portal or RSVP page. A dedicated driver with a name placard will meet you at the arrivals hall. Luxury sedans are arranged for all guests.",
    eta: "Door-to-door",
    mapQuery: "Maharana+Pratap+Airport+Udaipur+to+The+Leela+Palace+Udaipur",
  },
  {
    id: "taxi",
    label: "Taxi / Cab",
    icon: "M5 17H3a1 1 0 01-1-1v-3.28a1 1 0 01.684-.948l1.923-.641L7.2 5.6A1 1 0 018.1 5h7.8a1 1 0 01.9.6l2.593 5.512 1.923.641A1 1 0 0122 12.72V16a1 1 0 01-1 1h-2",
    extra: "M7 17a2 2 0 100-4 2 2 0 000 4zM17 17a2 2 0 100-4 2 2 0 000 4z",
    title: "Pre-Paid Taxi / Ride-Hail",
    directions: "Pre-paid taxi counters are available at arrivals. Ask for The Leela Palace, Udaipur. Uber and Ola are also available — select 'Premium' or 'Sedan' for comfort.",
    eta: "35–50 min",
    mapQuery: "Udaipur+Airport+to+Leela+Palace+Udaipur",
  },
];

function TransportTabs() {
  const [active, setActive] = useState("car");
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const current = TRANSPORT_MODES.find((m) => m.id === active)!;

  const switchTab = useCallback((id: string) => {
    if (id === active) return;
    const el = contentRef.current;
    if (el) {
      gsap.to(el, {
        opacity: 0, y: -8, duration: 0.15, ease: "power2.in",
        onComplete: () => {
          setActive(id);
          gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
        },
      });
    } else {
      setActive(id);
    }
  }, [active]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".tt-tab"), { opacity: 0, y: 15, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="scroll-heading text-[10px] uppercase tracking-[0.35em] font-bold mb-4 opacity-0" style={{ color: `${P.gold}66` }}>
            How to Reach · मार्गदर्शन
          </p>
          <h2 className="scroll-heading font-serif text-3xl md:text-4xl opacity-0" style={{ color: P.cream }}>
            Choose Your Path
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-3 mb-10">
          {TRANSPORT_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => switchTab(mode.id)}
              className="tt-tab flex items-center gap-2 px-4 md:px-6 py-3 rounded-sm text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 opacity-0"
              style={{
                backgroundColor: active === mode.id ? `${P.gold}18` : `${P.muted}30`,
                color: active === mode.id ? P.gold : `${P.cream}55`,
                border: `1px solid ${active === mode.id ? `${P.gold}30` : `${P.gold}0a`}`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={mode.icon} />
                {mode.extra && <path d={mode.extra} />}
              </svg>
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <RoyalSectionFrame glow className="p-8 md:p-12 relative frame-shimmer glow-pulse">
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none z-20" style={{ backgroundColor: `${P.gold}06` }}>
              <div className="border-shimmer absolute top-0 h-full w-20" style={{ background: `linear-gradient(90deg,transparent,${P.gold}40,transparent)` }} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${P.gold}12` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={current.icon} />
                  {current.extra && <path d={current.extra} />}
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl" style={{ color: P.cream }}>{current.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={`${P.gold}88`} strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <p className="text-[11px] uppercase tracking-[0.15em]" style={{ color: `${P.gold}88` }}>
                    ETA: {current.eta}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-body text-sm leading-relaxed mb-8" style={{ color: `${P.cream}70` }}>
              {current.directions}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${current.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium rounded-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: `${P.gold}15`, color: P.gold, border: `1px solid ${P.gold}25` }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Open in Maps
              </a>
            </div>
          </RoyalSectionFrame>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COURT OF ASSISTANCE — Contact Medallion Cards
   ═══════════════════════════════════════════════════════════ */

function CourtOfAssistance() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".coa-card"), { opacity: 0, y: 30, scale: 0.94 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none none" },
    });

    el.querySelectorAll(".coa-card").forEach((card) => {
      const medalShimmer = card.querySelector(".medal-shimmer");
      if (medalShimmer) {
        gsap.fromTo(medalShimmer,
          { rotation: 0, opacity: 0 },
          { rotation: 360, opacity: 0.3, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" } }
        );
      }
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="scroll-heading text-[10px] uppercase tracking-[0.35em] font-bold mb-4 opacity-0" style={{ color: `${P.gold}66` }}>
            The Court of Assistance · सहायता दरबार
          </p>
          <h2 className="scroll-heading font-serif text-3xl md:text-4xl opacity-0" style={{ color: P.cream }}>
            Your Dedicated Team
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRAVEL_INFO.contacts.map((contact) => (
            <div
              key={contact.name}
              className="coa-card opacity-0"
            >
              <RoyalSectionFrame className="p-6 md:p-8 text-center group">
                {/* Medallion */}
                <div className="relative mx-auto mb-5 w-16 h-16">
                  <div
                    className="medal-shimmer absolute -inset-1 rounded-full opacity-0"
                    style={{ border: `1px solid ${P.gold}30`, boxShadow: `0 0 15px ${P.gold}15` }}
                  />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${P.gold}25`, boxShadow: `0 0 20px ${P.gold}08, inset 0 0 15px ${P.gold}05` }}
                  />
                  <div
                    className="absolute inset-1 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${P.muted}80`, border: `1px solid ${P.gold}15` }}
                  >
                    <span className="font-serif text-xl font-bold" style={{ color: `${P.gold}cc` }}>
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  {/* Availability dot */}
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: P.bg, border: `1.5px solid ${P.gold}30` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                  </div>
                </div>

                <h3 className="font-serif text-lg mb-1" style={{ color: `${P.cream}dd` }}>
                  {contact.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-body mb-5" style={{ color: `${P.gold}66` }}>
                  {contact.role}
                </p>

                <div className="flex justify-center gap-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium rounded-sm transition-all duration-300 hover:scale-105"
                    style={{ color: `${P.cream}88`, border: `1px solid ${P.gold}18`, backgroundColor: `${P.gold}08` }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${contact.phone.replace(/[\s+]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium rounded-sm transition-all duration-300 hover:scale-105"
                    style={{ color: `${P.cream}88`, border: `1px solid ${P.gold}18`, backgroundColor: `${P.gold}08` }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </RoyalSectionFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROYAL DISPATCHES — Sealed Envelope Document Cards
   ═══════════════════════════════════════════════════════════ */

const DISPATCHES = [
  { title: "Travel Guide", subtitle: "Routes, tips & recommendations for your journey to Udaipur", status: "Arriving Soon" },
  { title: "Visa & Documents", subtitle: "Required documentation for international guests", status: "Arriving Soon" },
  { title: "Local Guide", subtitle: "Curated dining, shopping & sightseeing around Udaipur", status: "Arriving Soon" },
];

function RoyalDispatches() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".rd-card"), { opacity: 0, y: 35, rotateX: 10 }, {
      opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none none" },
    });

    el.querySelectorAll(".rd-card .wax-seal").forEach((seal) => {
      gsap.fromTo(seal,
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: seal, start: "top 85%", toggleActions: "play none none none" } }
      );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="scroll-heading text-[10px] uppercase tracking-[0.35em] font-bold mb-4 opacity-0" style={{ color: `${P.gold}66` }}>
            Royal Dispatches · शाही सन्देश
          </p>
          <h2 className="scroll-heading font-serif text-3xl md:text-4xl opacity-0" style={{ color: P.cream }}>
            Sealed for You
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DISPATCHES.map((doc) => (
            <div key={doc.title} className="rd-card opacity-0">
              <RoyalSectionFrame className="p-6 md:p-8 relative overflow-hidden group">
                {/* Envelope flap shape */}
                <div
                  className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg,${P.muted}60,transparent)`,
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    opacity: 0.4,
                  }}
                />

                <div className="relative">
                  {/* Wax seal */}
                  <div className="wax-seal flex justify-center mb-5 -mt-1">
                    <WaxSealSVG size={42} />
                  </div>

                  <h3 className="font-serif text-lg text-center mb-2" style={{ color: `${P.cream}dd` }}>
                    {doc.title}
                  </h3>
                  <p className="font-body text-xs text-center leading-relaxed mb-5" style={{ color: `${P.cream}55` }}>
                    {doc.subtitle}
                  </p>

                  <div className="flex justify-center">
                    <div
                      className="px-4 py-1.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-medium"
                      style={{ backgroundColor: `${P.gold}0a`, color: `${P.gold}55`, border: `1px solid ${P.gold}12` }}
                    >
                      {doc.status}
                    </div>
                  </div>
                </div>
              </RoyalSectionFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN — TravelContent with master scroll orchestration
   ═══════════════════════════════════════════════════════════ */

export default function TravelContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = pageRef.current;
    if (!el) return;

    /* ── Palace silhouette parallax ── */
    gsap.to(".palace-sil", {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: ".palace-sil", start: "top bottom", end: "bottom top", scrub: true },
    });

    /* ── Hero content parallax (moves up slower) ── */
    gsap.to(".hero-title", {
      y: -30,
      ease: "none",
      scrollTrigger: { trigger: ".hero-title", start: "top 40%", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-sub", {
      y: -20,
      ease: "none",
      scrollTrigger: { trigger: ".hero-sub", start: "top 40%", end: "bottom top", scrub: true },
    });

    /* ── Ornamental divider scroll reveals ── */
    el.querySelectorAll(".orn-div").forEach((div) => {
      gsap.fromTo(div.querySelector(".orn-line-l"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: div, start: "top 85%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(div.querySelector(".orn-line-r"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: div, start: "top 85%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(div.querySelector(".orn-motif"),
        { opacity: 0, scale: 0.5, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, delay: 0.2, ease: "back.out(2)", scrollTrigger: { trigger: div, start: "top 85%", toggleActions: "play none none none" } }
      );
    });

    /* ── Section frame border shimmer on enter ── */
    el.querySelectorAll(".frame-shimmer").forEach((frame) => {
      const shimmerBar = frame.querySelector(".border-shimmer");
      if (shimmerBar) {
        gsap.fromTo(shimmerBar,
          { x: "-100%" },
          { x: "200%", duration: 1.5, ease: "power2.inOut", scrollTrigger: { trigger: frame, start: "top 80%", toggleActions: "play none none none" } }
        );
      }
    });

    /* ── Gold glow pulse on interactive elements ── */
    el.querySelectorAll(".glow-pulse").forEach((gp) => {
      gsap.fromTo(gp,
        { boxShadow: `0 0 0px ${P.gold}00` },
        {
          boxShadow: `0 0 25px ${P.gold}12`,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          scrollTrigger: { trigger: gp, start: "top 85%", toggleActions: "play pause resume pause" },
        }
      );
    });

    /* ── Staggered section heading letter reveals ── */
    el.querySelectorAll(".scroll-heading").forEach((heading) => {
      gsap.fromTo(heading,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 82%", toggleActions: "play none none none" } }
      );
    });

  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <RoyalPageWrapper>
        <Navbar />
        <RoyalArrivalHero />
        <TravelConcierge />
        <OrnamentalDivider />
        <ArrivalGate />
        <OrnamentalDivider />
        <ArrivalTimeline />
        <OrnamentalDivider />
        <TransportTabs />
        <OrnamentalDivider />
        <CourtOfAssistance />
        <OrnamentalDivider />
        <RoyalDispatches />
        <OrnamentalDivider />
        <Footer />
      </RoyalPageWrapper>
    </div>
  );
}
