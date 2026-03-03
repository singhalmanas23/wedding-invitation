"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS } from "@/content/events";
import { WeddingEvent } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import ChapterAtmosphere from "@/components/motion/themed/ChapterAtmosphere";
import DressCodeBadge from "@/components/shared/DressCodeBadge";
import {
  getChapterDecorations,
  EdgeOrnaments,
  EnvironmentFrame,
} from "@/components/motion/themed/ChapterDecorations";
import { getChapterEnvironment } from "@/components/motion/themed/ChapterEnvironments";

gsap.registerPlugin(ScrollTrigger);

interface ChapterContentProps {
  event: WeddingEvent;
}

/* ─────────────────────── Cinematic Chapter Intro ─────────────────────── */

function ChapterIntroReveal({
  event,
  onComplete,
}: {
  event: WeddingEvent;
  onComplete: () => void;
}) {
  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          onComplete,
        });
      },
    });

    tl.fromTo(
      el.querySelector(".intro-bar"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.inOut" }
    );

    tl.fromTo(
      el.querySelector(".intro-chapter"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      0.3
    );

    const titleChars = el.querySelectorAll(".intro-title-char");
    tl.fromTo(
      titleChars,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
      0.6
    );

    if (el.querySelector(".intro-script")) {
      tl.fromTo(
        el.querySelector(".intro-script"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, { scope: ref });

  useEffect(() => {
    const fallback = setTimeout(onComplete, 4000);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  const titleChars = event.title.split("");

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: palette.background }}
    >
      <div className="text-center">
        <p
          className="intro-chapter text-[11px] uppercase tracking-[0.5em] mb-4 font-light opacity-0"
          style={{ color: `${palette.accent}99` }}
        >
          Chapter {event.chapterNumber}
        </p>
        <h1
          className="font-serif text-4xl md:text-6xl"
          style={{ color: palette.foreground }}
        >
          {titleChars.map((char, i) => (
            <span key={i} className="intro-title-char inline-block opacity-0" style={{ whiteSpace: char === " " ? "pre" : undefined }}>
              {char}
            </span>
          ))}
        </h1>
        {decor.culturalHeader.script && (
          <p
            className="intro-script font-serif text-lg mt-3 opacity-0"
            style={{ color: `${palette.accent}60` }}
          >
            {decor.culturalHeader.script}
          </p>
        )}
      </div>
      <div
        className="intro-bar absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: palette.accent, transformOrigin: "left", transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ─────────────────────── Atmosphere Quote Section ─────────────────────── */

function AtmosphereQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".atmo-word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    if (el.querySelector(".atmo-script")) {
      gsap.fromTo(
        el.querySelector(".atmo-script"),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: ref });

  if (!decor.culturalHeader.text) return null;

  const quoteWords = decor.culturalHeader.text.split(" ");

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${palette.background} 0%, ${palette.muted}20 50%, ${palette.background} 100%)`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <decor.SectionDivider palette={palette} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}77` }}>
          &ldquo;{quoteWords.map((word, i) => (
            <span key={i} className="atmo-word inline-block mr-[0.3em]">{word}</span>
          ))}&rdquo;
        </p>
        {decor.culturalHeader.script && (
          <p
            className="atmo-script font-serif text-3xl md:text-5xl mt-6 tracking-[0.15em] opacity-0"
            style={{ color: `${palette.accent}18` }}
          >
            {decor.culturalHeader.script}
          </p>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────── GSAP Story Section ─────────────────────── */

function StorySection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const ref = useRef<HTMLDivElement>(null);

  const paragraphs = useMemo(() => {
    return event.longDescription
      .split(". ")
      .reduce<string[][]>((acc, sentence, i) => {
        const groupIndex = Math.floor(i / 2);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(sentence);
        return acc;
      }, [])
      .map((group) => group.join(". ") + (group[group.length - 1].endsWith(".") ? "" : "."));
  }, [event.longDescription]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const paragraphEls = el.querySelectorAll(".story-para");
    paragraphEls.forEach((para) => {
      gsap.fromTo(
        para,
        { opacity: 0, y: 40, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: para,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 relative">
      <decor.StoryAccent palette={palette} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="story-label">
          <p
            className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium"
            style={{ color: palette.accent }}
          >
            The Story
          </p>
        </div>

        {paragraphs.map((text, i) => (
          <p
            key={i}
            className="story-para font-serif text-xl md:text-2xl lg:text-[28px] leading-[1.7] md:leading-[1.8] mb-8"
            style={{ color: `${palette.foreground}dd` }}
          >
            {text}
          </p>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 40% at 50% 50%, ${palette.accent}06, transparent 70%)`,
        }}
      />
    </section>
  );
}

/* ─────────────────────── Immersive Dress Code Section ─────────────────────── */

function ImmersiveDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const decor = getChapterDecorations(event.slug);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".dc-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${palette.muted}30, ${palette.background} 40%, ${palette.muted}20)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${palette.accent}08, transparent 70%)`,
        }}
      />

      {/* Ornamental border frame using section dividers */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <decor.SectionDivider palette={palette} />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <decor.SectionDivider palette={palette} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-10">
          <DressCodeBadge title={dressCode.title} palette={palette} />
        </div>

        <p
          className="font-serif text-xl md:text-2xl mb-6 italic max-w-2xl leading-relaxed"
          style={{ color: `${palette.foreground}bb` }}
        >
          {dressCode.description}
        </p>

        <div className="my-10">
          <decor.SectionDivider palette={palette} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h4
              className="text-sm uppercase tracking-[0.2em] mb-8 font-medium flex items-center gap-2"
              style={{ color: "#4ade80" }}
            >
              <span className="w-5 h-5 rounded-full bg-green-400/10 flex items-center justify-center text-xs">
                ✓
              </span>
              Do
            </h4>
            <ul className="space-y-5">
              {dressCode.dos.map((item, i) => (
                <li key={item} className="dc-item flex items-start gap-3">
                  <span className="text-green-400 mt-0.5 text-base shrink-0">
                    ✓
                  </span>
                  <span
                    className="text-[15px] leading-relaxed"
                    style={{ color: `${palette.foreground}bb` }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-sm uppercase tracking-[0.2em] mb-8 font-medium flex items-center gap-2"
              style={{ color: "#f87171" }}
            >
              <span className="w-5 h-5 rounded-full bg-red-400/10 flex items-center justify-center text-xs">
                ✗
              </span>
              Don&apos;t
            </h4>
            <ul className="space-y-5">
              {dressCode.donts.map((item, i) => (
                <li key={item} className="dc-item flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 text-base shrink-0">
                    ✗
                  </span>
                  <span
                    className="text-[15px] leading-relaxed"
                    style={{ color: `${palette.foreground}bb` }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Staggered Masonry Gallery ─────────────────────── */

function ImmersiveGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;
  const ref = useRef<HTMLDivElement>(null);

  const frameStyles = useMemo(() => {
    const base: Record<string, string> = {
      "first-chapter": "rounded-xl",
      "courtyard-edit": "rounded-[24px]",
      "midnight-cathedral": "rounded-none",
      "world-of-our-own": "rounded-2xl",
      "royal-court": "rounded-lg",
      "thrill-theory": "rounded-none skew-x-1",
    };
    return base[event.slug] || "rounded-xl";
  }, [event.slug]);

  const heights = useMemo(() => {
    const patterns: Record<string, number[]> = {
      "first-chapter": [380, 260, 300, 340],
      "courtyard-edit": [320, 380, 260, 300],
      "midnight-cathedral": [400, 280, 340, 260],
      "world-of-our-own": [300, 360, 280, 340],
      "royal-court": [380, 300, 360, 280],
      "thrill-theory": [340, 400, 280, 320],
    };
    return patterns[event.slug] || [340, 280, 320, 300];
  }, [event.slug]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.85, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium"
          style={{ color: palette.accent }}
        >
          Mood
        </p>

        {/* Masonry layout — 2 cols mobile, 2 staggered cols desktop */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className={`gallery-item break-inside-avoid ${frameStyles} relative overflow-hidden group cursor-pointer`}
              style={{ height: heights[i] || 300 }}
            >
              <Image
                src={src}
                alt={`${event.title} mood ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: palette.primary }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${palette.accent}15, transparent 60%)`,
                }}
              />
              {/* Themed border accent */}
              <div
                className="absolute inset-0 pointer-events-none border opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderColor: `${palette.accent}30` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Venue Section with Parallax ─────────────────────── */

function VenueSection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".venue-image"),
      { y: 40 },
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 80%, ${palette.accent}05, transparent)`,
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium"
          style={{ color: palette.accent }}
        >
          Venue
        </p>
        <h3
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3"
          style={{ color: palette.foreground }}
        >
          {event.location}
        </h3>
        <p
          className="text-lg mb-12"
          style={{ color: `${palette.foreground}88` }}
        >
          {event.venue}
        </p>

        <div
          className="aspect-video rounded-xl flex items-center justify-center border overflow-hidden relative"
          style={{
            backgroundColor: `${palette.muted}40`,
            borderColor: `${palette.foreground}10`,
          }}
        >
          <div className="venue-image absolute inset-[-20%] w-[140%] h-[140%]">
            <Image
              src={event.heroImage}
              alt={`${event.venue} venue`}
              fill
              className="object-cover opacity-30"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {/* HeroDecoration at low opacity over venue */}
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <decor.HeroDecoration palette={palette} />
          </div>
          <div className="text-center relative z-10">
            <MapPin
              size={32}
              className="mx-auto mb-3 opacity-50"
              style={{ color: palette.accent }}
            />
            <p
              className="text-sm font-medium uppercase tracking-[0.15em] opacity-50"
              style={{ color: palette.foreground }}
            >
              Map — Coming Soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Main ChapterContent ─────────────────────── */

export default function ChapterContent({ event }: ChapterContentProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const envParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;

  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const { HeroDecoration, SectionDivider, StoryAccent, culturalHeader } = decor;

  const ChapterEnv = useMemo(() => getChapterEnvironment(event.slug), [event.slug]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // GSAP hero character reveal
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!introComplete) return;
    const el = heroContentRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      el.querySelector(".hero-chapter"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    const titleChars = el.querySelectorAll(".hero-title-char");
    tl.fromTo(
      titleChars,
      { opacity: 0, y: 40, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      el.querySelector(".hero-subtitle"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      el.querySelector(".hero-tagline"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    if (el.querySelector(".hero-script")) {
      tl.fromTo(
        el.querySelector(".hero-script"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );
    }
  }, { scope: heroContentRef, dependencies: [introComplete] });

  const titleChars = event.title.split("");

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: palette.background, color: palette.foreground }}
    >
      {/* Chapter intro reveal */}
      {!introComplete && !prefersReducedMotion && (
        <ChapterIntroReveal
          event={event}
          onComplete={handleIntroComplete}
        />
      )}

      <Navbar />

      {/* Edge ornaments */}
      <EdgeOrnaments slug={event.slug} palette={palette} />

      {/* Environment frame border */}
      <EnvironmentFrame slug={event.slug} palette={palette} />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${palette.gradientFrom}cc 0%, ${palette.gradientVia || palette.gradientFrom}bb 40%, ${palette.gradientTo}ee 100%)`,
            }}
          />
        </motion.div>

        {/* Full-screen immersive SVG environment */}
        {ChapterEnv && (
          <motion.div className="absolute inset-0" style={{ y: envParallax }}>
            <ChapterEnv palette={palette} />
          </motion.div>
        )}

        {/* Chapter-specific hero decoration SVG */}
        <HeroDecoration palette={palette} />

        {/* Themed atmospheric particles */}
        <ChapterAtmosphere slug={event.slug} />

        {/* Hero content with GSAP character reveal */}
        <motion.div
          ref={heroContentRef}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <p
            className="hero-chapter uppercase tracking-[0.4em] text-sm mb-8 font-light opacity-0"
            style={{ color: `${palette.accent}aa` }}
          >
            Chapter {event.chapterNumber}
          </p>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-[0.95]"
            style={{ color: palette.foreground, perspective: "600px" }}
          >
            {titleChars.map((char, i) => (
              <span
                key={i}
                className="hero-title-char inline-block opacity-0"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p
            className="hero-subtitle text-xl md:text-2xl italic mb-4 font-light opacity-0"
            style={{ color: `${palette.accent}dd` }}
          >
            {event.subtitle}
          </p>

          <p
            className="hero-tagline text-base md:text-lg max-w-lg mx-auto leading-relaxed opacity-0"
            style={{ color: `${palette.foreground}88` }}
          >
            {event.tagline}
          </p>

          {culturalHeader.script && (
            <p
              className="hero-script font-serif text-xl md:text-2xl mt-6 tracking-[0.15em] opacity-0"
              style={{ color: `${palette.accent}40` }}
            >
              {culturalHeader.script}
            </p>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-light"
            style={{ color: `${palette.foreground}44` }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-10"
            style={{ backgroundColor: `${palette.accent}40` }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${palette.background}, transparent)`,
          }}
        />
      </section>

      {/* Persistent ambient atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <ChapterAtmosphere slug={event.slug} />
      </div>

      {/* ───────────────────── Atmosphere Quote Section ───────────────────── */}
      <AtmosphereQuote event={event} />

      {/* ───────────────────── Event Info Bar ───────────────────── */}
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
              <CalendarDays size={16} style={{ color: palette.accent }} />
              <span>
                {event.date} · {event.day}
              </span>
            </div>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: `${palette.foreground}99` }}
            >
              <Clock size={16} style={{ color: palette.accent }} />
              <span>{event.time}</span>
            </div>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: `${palette.foreground}99` }}
            >
              <MapPin size={16} style={{ color: palette.accent }} />
              <span>
                {event.location}, {event.venue}
              </span>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* ───────────────────── Story Section ───────────────────── */}
      <StorySection event={event} />

      {/* Section divider */}
      <div className="flex justify-center">
        <SectionDivider palette={palette} />
      </div>

      {/* ───────────────────── Dress Code ───────────────────── */}
      <ImmersiveDressCode event={event} />

      {/* Section divider */}
      <div className="flex justify-center">
        <SectionDivider palette={palette} />
      </div>

      {/* ───────────────────── Gallery ───────────────────── */}
      <ImmersiveGallery event={event} />

      {/* Section divider */}
      <div className="flex justify-center">
        <SectionDivider palette={palette} />
      </div>

      {/* ───────────────────── Venue ───────────────────── */}
      <VenueSection event={event} />

      {/* ───────────────────── Chapter Navigation ───────────────────── */}
      <FadeInView>
        <section
          className="py-20 md:py-28 px-6 border-t"
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
                      className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      sizes="50vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${palette.background}ee)`,
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
                      className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      sizes="50vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${palette.background}ee)`,
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

      <Footer />
    </div>
  );
}
