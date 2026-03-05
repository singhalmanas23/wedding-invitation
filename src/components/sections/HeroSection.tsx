"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { COUPLE } from "@/content/events";
import FloatingParticles from "@/components/motion/FloatingParticles";
import { CountdownTimer } from "@/components/shared/CountdownTimer";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.5,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const weddingDate = new Date(COUPLE.weddingDate);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-20%]"
        style={{
          y: prefersReducedMotion ? 0 : bgY,
          scale: prefersReducedMotion ? 1 : bgScale,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1759222198113-d0e2b862a3b5?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060e]/80 via-stone-950/70 to-[#08080c]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(180,140,60,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(140,100,40,0.05)_0%,transparent_60%)]" />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles count={35} />

      {/* Grain texture overlay */}
      <div className="grain" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          y: prefersReducedMotion ? 0 : contentY,
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        variants={prefersReducedMotion ? undefined : stagger}
        initial="hidden"
        animate="show"
      >
        {/* Top ornamental separator */}
        <motion.div
          variants={fadeUp}
          className="text-amber-400/30 text-sm tracking-[0.6em] mb-10 select-none"
        >
          ─── ◆ ───
        </motion.div>

        {/* Couple names */}
        <motion.h1
          variants={fadeUp}
          className="font-serif tracking-tight leading-[0.85]"
        >
          <span className="block text-stone-50 text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]">
            {COUPLE.partner1}
          </span>
          <span className="block text-amber-400/70 text-2xl sm:text-3xl md:text-4xl my-3 md:my-4 font-serif italic select-none">
            &amp;
          </span>
          <span className="block text-stone-50 text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]">
            {COUPLE.partner2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-serif italic text-base md:text-lg text-stone-400/80 mt-7 tracking-wide"
        >
          A Wedding Celebration
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-4 my-9"
        >
          <div className="h-px w-14 md:w-24 bg-gradient-to-r from-transparent to-amber-400/25" />
          <span className="text-amber-400/40 text-[10px] select-none">◆</span>
          <div className="h-px w-14 md:w-24 bg-gradient-to-l from-transparent to-amber-400/25" />
        </motion.div>

        {/* Date & location */}
        <motion.div variants={fadeUp} className="space-y-1.5">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-stone-200/90 font-body">
            {formattedDate}
          </p>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-stone-500 font-body">
            {COUPLE.location}
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11"
        >
          <Link
            href="/itinerary"
            className="inline-flex items-center justify-center px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] font-body border border-amber-400/25 text-amber-200/90 hover:bg-amber-400/10 hover:border-amber-400/40 hover:text-amber-100 transition-all duration-500 min-w-[190px] backdrop-blur-sm"
          >
            View Itinerary
          </Link>
          <Link
            href="/rsvp"
            className="inline-flex items-center justify-center px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] font-body bg-amber-400/8 border border-amber-400/15 text-amber-300/90 hover:bg-amber-400/16 hover:border-amber-400/30 hover:text-amber-200 transition-all duration-500 min-w-[190px] backdrop-blur-sm"
          >
            RSVP
          </Link>
        </motion.div>

        {/* Countdown timer */}
        <motion.div variants={fadeUp} className="mt-16">
          <CountdownTimer targetDate={COUPLE.weddingDate} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-stone-600 font-body">
          Scroll to explore
        </span>
        <motion.span
          className="text-stone-600/70 text-[10px]"
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ▼
        </motion.span>
      </motion.div>
    </section>
  );
}
