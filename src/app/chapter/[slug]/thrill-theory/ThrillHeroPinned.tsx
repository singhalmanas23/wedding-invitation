"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WeddingEvent } from "@/types";
import { T, textGlow, softGlow } from "./theme";
import {
  PremiumGateway,
  NoiseOverlay,
  GlowLayer,
} from "./PremiumSVGs";

interface ThrillHeroPinnedProps {
  event: WeddingEvent;
}

export default function ThrillHeroPinned({ event }: ThrillHeroPinnedProps) {
  const { palette } = event;
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) return;
      const el = heroRef.current;
      if (!el) return;

      const tl = gsap.timeline({ delay: 0.2 });

      /* Gateway strokes draw in */
      const gatewayPaths = el.querySelectorAll<SVGGeometryElement>(
        ".premium-gateway .gateway-stroke"
      );
      gatewayPaths.forEach((p) => {
        if (p.getTotalLength) {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        }
      });
      tl.to(gatewayPaths, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: "power2.inOut",
      }, 0);

      /* Background glow breathes in */
      tl.fromTo(
        ".hero-ambient-glow",
        { opacity: 0 },
        { opacity: 0.15, duration: 1.2, ease: "power2.out" },
        0.3
      );

      /* Title fades up */
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.5
      );

      /* Meta info staggered */
      tl.fromTo(
        el.querySelectorAll(".hero-meta-item"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        0.9
      );

      /* Tagline */
      tl.fromTo(
        ".hero-tagline",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        1.3
      );

      /* Slow ambient glow pulse (loops) */
      gsap.to(".hero-ambient-glow", {
        opacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    },
    { scope: heroRef }
  );

  const metaItems = [
    { icon: CalendarDays, label: event.date },
    { icon: Clock, label: event.time },
    { icon: MapPin, label: event.location },
  ];

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${T.bg} 0%, ${T.bgMid} 40%, ${T.bgDeep} 70%, ${palette.background} 100%)`,
      }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <NoiseOverlay />
      </div>

      {/* Ambient radial glow */}
      <div
        className="hero-ambient-glow absolute inset-0 z-[2] pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(ellipse 55% 50% at 40% 45%, ${T.magenta}14, transparent 60%), radial-gradient(ellipse 45% 55% at 65% 55%, ${T.purple}10, transparent 55%)`,
        }}
      />

      {/* Gateway architecture — anchored to bottom */}
      <div className="premium-gateway absolute inset-x-0 bottom-0 flex items-end justify-center z-[5] pointer-events-none">
        <PremiumGateway accent={palette.accent} primary={palette.primary} />
      </div>

      {/* Main content — centered vertically */}
      <div className="relative z-[10] flex flex-col items-center text-center px-6 py-20">
        {/* Title */}
        <h1
          className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0"
          style={{ color: T.magenta, ...textGlow(T.magenta) }}
        >
          The Thrill Theory
        </h1>

        {/* Event meta */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
          {metaItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="hero-meta-item flex items-center gap-2 opacity-0"
            >
              <Icon size={14} style={{ color: T.cyan }} className="shrink-0" />
              <p
                className="text-[10px] md:text-xs uppercase tracking-[0.15em]"
                style={{ color: T.dim }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="hero-tagline text-xs uppercase tracking-[0.3em] font-bold opacity-0"
          style={{ color: `${T.gold}88`, ...textGlow(T.gold) }}
        >
          Step Inside. Get Lost.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[15] pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${palette.background}, transparent)`,
        }}
      />
    </section>
  );
}
