"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { COUPLE } from "@/content/events";
import FadeInView from "@/components/motion/FadeInView";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 lg:py-52 overflow-hidden"
    >
      {/* Parallax background with image */}
      <motion.div
        className="absolute inset-[-20%]"
        style={{ y: prefersReducedMotion ? 0 : bgY }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: prefersReducedMotion ? 1 : imgScale }}
        >
          <Image
            src="https://images.unsplash.com/photo-1769183345247-fba7c42c991b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-stone-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(180,140,60,0.05)_0%,transparent_70%)]" />
      </motion.div>

      {/* Grain overlay */}
      <div className="grain" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Section label */}
        <FadeInView>
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-px w-14 bg-amber-400/15" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400/30 font-body select-none">
              Our Story
            </span>
            <div className="h-px w-14 bg-amber-400/15" />
          </div>
        </FadeInView>

        {/* Pull quote */}
        <FadeInView delay={0.12}>
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-stone-200/90 leading-snug tracking-tight">
            &ldquo;{COUPLE.tagline}&rdquo;
          </blockquote>
        </FadeInView>

        {/* Ornamental divider */}
        <FadeInView delay={0.24}>
          <div className="flex items-center justify-center gap-3 my-10 md:my-12">
            <div className="h-px w-8 bg-amber-400/15" />
            <span className="text-amber-400/25 text-[9px] select-none">◆</span>
            <div className="h-px w-8 bg-amber-400/15" />
          </div>
        </FadeInView>

        {/* Editorial paragraph */}
        <FadeInView delay={0.36}>
          <p className="font-body text-sm md:text-[15px] text-stone-400/90 leading-[1.8] max-w-2xl mx-auto">
            She grew up in Goregaon, he in Pune — both foodies, both
            dreamers. They first crossed paths in Mumbai before heading to
            London for their masters. What started as friendship turned into
            something neither expected. Now, against the backdrop of
            Udaipur&apos;s timeless beauty, their story finds its grandest verse: a
            three-day celebration woven from six unforgettable chapters, each
            one a world of its own.
          </p>
        </FadeInView>
        <FadeInView delay={0.48}>
          <div className="mt-14 text-amber-400/15 text-sm tracking-[0.6em] select-none">
            ─── ◆ ───
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
