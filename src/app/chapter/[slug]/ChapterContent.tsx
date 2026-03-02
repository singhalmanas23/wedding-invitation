"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
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
} from "@/components/motion/themed/ChapterDecorations";

interface ChapterContentProps {
  event: WeddingEvent;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ─────────────────────── Immersive Chapter Page Intro ─────────────────────── */

function ChapterIntroReveal({
  event,
  onComplete,
}: {
  event: WeddingEvent;
  onComplete: () => void;
}) {
  const { palette } = event;
  const decor = getChapterDecorations(event.slug);

  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: palette.background }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-[11px] uppercase tracking-[0.5em] mb-4 font-light"
          style={{ color: `${palette.accent}99` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Chapter {event.chapterNumber}
        </motion.p>
        <motion.h1
          className="font-serif text-4xl md:text-6xl"
          style={{ color: palette.foreground }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {event.title}
        </motion.h1>
        {decor.culturalHeader.script && (
          <motion.p
            className="font-serif text-lg mt-3"
            style={{ color: `${palette.accent}60` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {decor.culturalHeader.script}
          </motion.p>
        )}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: palette.accent }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─────────────────────── Immersive Dress Code Section ─────────────────────── */

function ImmersiveDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const decor = getChapterDecorations(event.slug);

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${palette.muted}30` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${palette.accent}08, transparent 70%)`,
        }}
      />

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
              {dressCode.dos.map((item) => (
                <FadeInView key={item} direction="left">
                  <li className="flex items-start gap-3">
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
                </FadeInView>
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
              {dressCode.donts.map((item) => (
                <FadeInView key={item} direction="right">
                  <li className="flex items-start gap-3">
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
                </FadeInView>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Immersive Gallery with Themed Frame ─────────────────────── */

function ImmersiveGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;

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

  const spans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
  ];

  return (
    <section className="py-24 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeInView>
          <p
            className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium"
            style={{ color: palette.accent }}
          >
            Mood
          </p>
        </FadeInView>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryImages.map((src, i) => (
            <FadeInView key={i} delay={i * 0.1}>
              <motion.div
                className={`${spans[i] || "col-span-1 row-span-1"} ${frameStyles} relative overflow-hidden group cursor-pointer h-full`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={src}
                  alt={`${event.title} mood ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: palette.primary }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Chapter-specific overlay tint */}
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${palette.accent}15, transparent 60%)`,
                  }}
                />
              </motion.div>
            </FadeInView>
          ))}
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

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;

  const { palette } = event;
  const decor = getChapterDecorations(event.slug);
  const { HeroDecoration, SectionDivider, StoryAccent, culturalHeader } = decor;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: palette.background, color: palette.foreground }}
    >
      {/* Chapter intro reveal */}
      {!introComplete && !prefersReducedMotion && (
        <ChapterIntroReveal
          event={event}
          onComplete={() => setIntroComplete(true)}
        />
      )}

      <Navbar />

      {/* Edge ornaments - fixed position, chapter-specific */}
      <EdgeOrnaments slug={event.slug} palette={palette} />

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

        {/* Chapter-specific hero decoration SVG */}
        <HeroDecoration palette={palette} />

        {/* Themed atmospheric particles */}
        <ChapterAtmosphere slug={event.slug} />

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={staggerItem}
              className="uppercase tracking-[0.4em] text-sm mb-8 font-light"
              style={{ color: `${palette.accent}aa` }}
            >
              Chapter {event.chapterNumber}
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-[0.95]"
              style={{ color: palette.foreground }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl md:text-2xl italic mb-4 font-light"
              style={{ color: `${palette.accent}dd` }}
            >
              {event.subtitle}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="text-base md:text-lg max-w-lg mx-auto leading-relaxed"
              style={{ color: `${palette.foreground}88` }}
            >
              {event.tagline}
            </motion.p>

            {/* Cultural script text under tagline */}
            {culturalHeader.script && (
              <motion.p
                variants={staggerItem}
                className="font-serif text-xl md:text-2xl mt-6 tracking-[0.15em]"
                style={{ color: `${palette.accent}40` }}
              >
                {culturalHeader.script}
              </motion.p>
            )}
          </motion.div>
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

      {/* ───────────────────── Cultural Introduction Banner ───────────────────── */}
      {culturalHeader.text && (
        <FadeInView>
          <section className="py-16 md:py-20 px-6 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${palette.background} 0%, ${palette.muted}20 50%, ${palette.background} 100%)`,
              }}
            />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <SectionDivider palette={palette} />
              <p
                className="font-serif italic text-lg md:text-xl mt-6"
                style={{ color: `${palette.foreground}66` }}
              >
                &ldquo;{culturalHeader.text}&rdquo;
              </p>
            </div>
          </section>
        </FadeInView>
      )}

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
      <section className="py-24 md:py-36 px-6 relative">
        <StoryAccent palette={palette} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeInView>
            <p
              className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium"
              style={{ color: palette.accent }}
            >
              The Story
            </p>
          </FadeInView>

          {event.longDescription
            .split(". ")
            .reduce<string[][]>((acc, sentence, i) => {
              const groupIndex = Math.floor(i / 2);
              if (!acc[groupIndex]) acc[groupIndex] = [];
              acc[groupIndex].push(sentence);
              return acc;
            }, [])
            .map((group, i) => (
              <FadeInView
                key={i}
                delay={i * 0.15}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <p
                  className="font-serif text-xl md:text-2xl lg:text-[28px] leading-[1.7] md:leading-[1.8] mb-8"
                  style={{ color: `${palette.foreground}dd` }}
                >
                  {group.join(". ")}
                  {group[group.length - 1].endsWith(".") ? "" : "."}
                </p>
              </FadeInView>
            ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 40% at 50% 50%, ${palette.accent}06, transparent 70%)`,
          }}
        />
      </section>

      {/* Section divider */}
      <div className="flex justify-center">
        <SectionDivider palette={palette} />
      </div>

      {/* ───────────────────── Dress Code ───────────────────── */}
      <FadeInView>
        <ImmersiveDressCode event={event} />
      </FadeInView>

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
      <FadeInView>
        <section className="py-24 md:py-36 px-6 relative overflow-hidden">
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
              <Image
                src={event.heroImage}
                alt={`${event.venue} venue`}
                fill
                className="object-cover opacity-30"
                sizes="(max-width: 768px) 100vw, 800px"
              />
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
      </FadeInView>

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
