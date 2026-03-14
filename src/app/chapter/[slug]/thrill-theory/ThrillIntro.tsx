"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WeddingEvent } from "@/types";
import { T } from "./theme";

interface ThrillIntroProps {
  event: WeddingEvent;
  onComplete: () => void;
}

export default function ThrillIntro({ event, onComplete }: ThrillIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const prefersReduced = useReducedMotion();

  const safeComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) {
      safeComplete();
      return;
    }
    const t = setTimeout(safeComplete, 6000);
    return () => clearTimeout(t);
  }, [prefersReduced, safeComplete]);

  useGSAP(
    () => {
      if (prefersReduced) return;
      const el = ref.current;
      if (!el) return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: safeComplete,
          });
        },
      });

      /* Phase 1 (0–1.2s): Slow radial pulse breathes in from center */
      tl.fromTo(
        ".intro-radial",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        0
      );

      /* Phase 2 (1–2s): Chapter number materializes */
      tl.fromTo(
        ".chapter-num",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        1.0
      );

      /* Phase 2.5: Thin horizontal rules expand outward */
      tl.fromTo(
        el.querySelectorAll(".intro-rule"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power3.inOut" },
        1.5
      );

      /* Phase 3 (2–3.2s): "THE THRILL THEORY" — letter by letter, all white/cream */
      tl.fromTo(
        el.querySelectorAll(".intro-letter"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.025,
          ease: "power3.out",
        },
        2.0
      );

      /* Phase 3.3: Subtitle + Hindi */
      tl.fromTo(
        ".intro-subtitle",
        { opacity: 0, letterSpacing: "1em" },
        { opacity: 1, letterSpacing: "0.35em", duration: 0.7, ease: "power3.out" },
        3.0
      );
      tl.fromTo(
        ".intro-hindi",
        { opacity: 0 },
        { opacity: 0.5, duration: 0.5, ease: "power2.out" },
        3.3
      );

      /* Phase 4 (3.8–4.5s): Hold, then fade out (handled by onComplete) */
      tl.addLabel("end", 4.5);
    },
    { scope: ref }
  );

  if (prefersReduced) return null;

  const titleText = "THE THRILL THEORY";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Radial ambient — deep plum glow, NOT magenta */}
      <div
        className="intro-radial absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${T.bgPlum}90 0%, #000 70%)`,
        }}
      />

      {/* Centered title card composition */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Chapter number — small, gold, refined */}
        <p
          className="chapter-num text-[10px] uppercase tracking-[0.6em] font-medium mb-8 opacity-0"
          style={{ color: `${T.gold}88` }}
        >
          Chapter V
        </p>

        {/* Horizontal rule — left */}
        <div className="flex items-center gap-6 mb-6">
          <div
            className="intro-rule h-px w-16 md:w-28 origin-right"
            style={{ backgroundColor: `${T.gold}30` }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ border: `1px solid ${T.gold}40` }}
          />
          <div
            className="intro-rule h-px w-16 md:w-28 origin-left"
            style={{ backgroundColor: `${T.gold}30` }}
          />
        </div>

        {/* Title — all uppercase, letter-spaced, white/cream, NOT magenta */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] md:tracking-[0.35em] leading-relaxed">
          {titleText.split("").map((char, i) => (
            <span
              key={i}
              className="intro-letter inline-block opacity-0"
              style={{
                color: `${T.gold}e6`,
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle — small, muted */}
        <p
          className="intro-subtitle mt-6 text-[10px] uppercase tracking-[1em] font-medium opacity-0"
          style={{ color: T.dim }}
        >
          Afterparty
        </p>

        {/* Hindi — very subtle */}
        <p
          className="intro-hindi mt-3 text-xs tracking-widest opacity-0"
          style={{ color: `${T.gold}50` }}
        >
          उन्मुक्त रात्रि
        </p>
      </div>
    </div>
  );
}
