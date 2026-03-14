"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WeddingEvent } from "@/types";
import { COUPLE } from "@/content/events";
import { T, textGlow } from "./theme";
import { NeonDivider } from "./PremiumSVGs";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   1. QuoteSection — Breathing space after the hero
   ═══════════════════════════════════════════════════════════════════ */

export function QuoteSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote =
    "Step inside and forget everything you know about afterparties.";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".qs-word"),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36 px-6"
      style={{ backgroundColor: palette.background }}
    >
      {/* Radial magenta haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${T.magenta}0d, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <NeonDivider accent={T.cyan} primary={T.magenta} />

        <p
          className="mt-10 text-[9px] uppercase tracking-[0.5em] font-medium"
          style={{ color: T.cyan }}
        >
          THE AFTERMATH
        </p>

        {/* Giant watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="text-[20vw] font-black uppercase tracking-tighter leading-none"
            style={{
              color: "rgba(255,255,255,0.025)",
              filter: "blur(2px)",
            }}
          >
            CHAOS
          </span>
        </div>

        <p
          className="relative font-serif italic text-xl md:text-2xl mt-8 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          &ldquo;
          {quote.split(" ").map((w, i) => (
            <span key={i} className="qs-word inline-block mr-[0.3em]">
              {w}
            </span>
          ))}
          &rdquo;
        </p>

        <div className="mt-10">
          <NeonDivider accent={T.cyan} primary={T.magenta} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. ThrillStorySection — Premium narrative block
   ═══════════════════════════════════════════════════════════════════ */

export function ThrillStorySection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  const excerpt = useMemo(() => {
    const sentences = event.longDescription.split(/(?<=[.!?])\s+/);
    return sentences.slice(0, 2).join(" ").trim() || event.longDescription;
  }, [event.longDescription]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelector(".story-body"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-6"
      style={{ backgroundColor: palette.background }}
    >
      {/* Faint vertical edge glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${T.magenta}06, transparent 18%, transparent 82%, ${T.purple}06)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold"
          style={{ color: T.cyan }}
        >
          The Vibe ·{" "}
          <span className="text-[0.78em] font-normal">माहौल</span>
        </p>

        <NeonDivider accent={palette.accent} primary={palette.primary} />

        <blockquote
          className="story-body font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-10 mb-10 px-2"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          &ldquo;{excerpt}&rdquo;
        </blockquote>

        <NeonDivider accent={palette.accent} primary={palette.primary} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. DressCodePanel — Luxury styling card
   ═══════════════════════════════════════════════════════════════════ */

export function DressCodePanel({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelector(".dc-card"),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        el.querySelectorAll(".dc-item"),
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${T.magenta}06, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-12 font-bold text-center"
          style={{ color: T.cyan }}
        >
          Attire · वेश विधान
        </p>

        <div
          className="dc-card rounded-sm p-10 md:p-14 opacity-0"
          style={{
            background: `linear-gradient(165deg, ${palette.muted}4d, ${palette.background} 50%, ${palette.muted}33)`,
            border: "1px solid rgba(255,0,120,0.15)",
            boxShadow: `inset 0 0 60px ${T.magenta}08, inset 0 0 30px ${T.purple}06`,
          }}
        >
          <div className="text-center mb-10">
            <p
              className="text-2xl md:text-3xl tracking-[0.04em] mb-3 font-bold"
              style={{
                color: T.magenta,
                ...textGlow(T.magenta),
              }}
            >
              {dressCode.title}
            </p>

            {/* Gradient divider */}
            <div
              className="w-20 h-[2px] mx-auto mb-5"
              style={{
                background: `linear-gradient(90deg, ${T.magenta}66, ${T.cyan}80, ${T.purple}66)`,
              }}
            />

            <p
              className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto"
              style={{ color: T.muted }}
            >
              {dressCode.description}
            </p>
          </div>

          <div className="mb-10">
            <NeonDivider accent={palette.accent} primary={palette.primary} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Go For */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.25em] mb-6 font-bold"
                style={{ color: T.cyan }}
              >
                Go For
              </h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-item flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: T.magenta,
                        boxShadow: `0 0 6px ${T.magenta}60`,
                      }}
                    />
                    <span
                      className="text-[15px] leading-relaxed font-light"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skip */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.25em] mb-6 font-bold"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Skip
              </h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-item flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: T.dim }}
                    />
                    <span
                      className="text-[15px] leading-relaxed font-light"
                      style={{ color: "rgba(255,255,255,0.47)" }}
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
   4. MoodEditorialSection — Cinematic editorial spread
   ═══════════════════════════════════════════════════════════════════ */

export function MoodEditorialSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section
      className="relative pt-24 md:pt-36 pb-12 md:pb-16 overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, ${T.magenta}20, transparent 50%), radial-gradient(circle at 70% 30%, ${T.cyan}15, transparent 50%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div
              className="h-px w-8 opacity-30"
              style={{ backgroundColor: T.magenta }}
            />
            <p
              className="text-[10px] uppercase tracking-[0.5em] font-bold"
              style={{ color: T.cyan }}
            >
              The Aftermath Narrative · उन्मुक्त
            </p>
            <div
              className="h-px w-8 opacity-30"
              style={{ backgroundColor: T.purple }}
            />
          </div>

          <h3
            className="text-5xl md:text-7xl tracking-tight mb-10 font-black"
            style={{
              color: T.white,
              textShadow: `0 0 40px ${T.magenta}20`,
            }}
          >
            Neon{" "}
            <span className="opacity-40 italic font-serif">&amp;</span>{" "}
            Rebellion
          </h3>

          <p
            className="max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            A psychedelic sanctuary where the echoes of childhood meet the
            high-speed madness of letting go.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. ThrillVenueSection — Late-night invitation panel
   ═══════════════════════════════════════════════════════════════════ */

export function ThrillVenueSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section
      className="py-20 md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-8 font-bold"
          style={{ color: T.cyan }}
        >
          Venue · स्थान
        </p>

        <h3
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3"
          style={{ color: T.white }}
        >
          {event.location}
        </h3>

        <p className="text-lg" style={{ color: T.muted }}>
          {event.venue}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. ThrillFooter — Premium cinematic footer
   ═══════════════════════════════════════════════════════════════════ */

export function ThrillFooter({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: palette.background,
        borderTop: `1px solid ${T.magenta}1f`,
      }}
    >
      {/* Fade gradient top */}
      <div
        className="absolute -top-20 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${palette.background})`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
        <NeonDivider accent={T.cyan} primary={T.magenta} />

        <p
          className="text-sm mt-6 mb-4 tracking-[0.3em] font-bold uppercase"
          style={{ color: `${T.magenta}66`, ...textGlow(T.magenta) }}
        >
          The End
        </p>

        <p className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: T.white }}>
          Tarush{" "}
          <span style={{ color: `${T.gold}88` }}>&amp;</span> Sanjana
        </p>

        <p
          className="text-[10px] tracking-[0.3em] font-body mb-10"
          style={{ color: `${T.cyan}66` }}
        >
          {COUPLE.hashtag}
        </p>

        {/* Your Presence Matters card */}
        <div
          className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg"
          style={{
            border: `1px solid ${T.magenta}1a`,
            background: `linear-gradient(165deg, ${T.magenta}06, transparent 40%, ${T.purple}06)`,
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-4 font-bold"
            style={{ color: `${T.cyan}55` }}
          >
            Your Presence Matters
          </p>

          <p
            className="font-serif text-lg md:text-xl leading-relaxed italic"
            style={{ color: "rgba(255,255,255,0.73)" }}
          >
            The celebration is incomplete without you.
          </p>

          <p
            className="mt-5 text-sm tracking-[0.08em]"
            style={{ color: `${T.gold}66` }}
          >
            आपकी उपस्थिति हमारा सम्मान है
          </p>

          <div className="flex justify-center mt-6">
            <Link
              href="/rsvp"
              className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm hover:scale-105"
              style={{
                backgroundColor: `${T.magenta}1f`,
                color: T.magenta,
                border: `1px solid ${T.magenta}2e`,
              }}
            >
              RSVP Now
            </Link>
          </div>
        </div>

        {/* Navigation links */}
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
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p
          className="text-[11px] font-body tracking-wide mb-6"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          April 19–21, 2026 · Udaipur, Rajasthan
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-body tracking-wide"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <span>© 2026 All Rights Reserved</span>
          <span style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
          <a
            href="https://blessingsofttech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.22)" }}
            aria-label="Blessing Softtech"
          >
            <Image
              src="/images/blessing-softtech.svg"
              alt=""
              width={26}
              height={26}
              className="shrink-0"
            />
            <span>Blessing Softtech</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
