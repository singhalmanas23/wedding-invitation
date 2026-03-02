"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingEvent } from "@/types";

interface ChapterCardProps {
  event: WeddingEvent;
}

export function ChapterCard({ event }: ChapterCardProps) {
  return (
    <Link
      href={`/chapter/${event.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-white/[0.04] bg-stone-900/40 backdrop-blur-sm transition-all duration-700 hover:border-amber-400/20 hover:bg-stone-900/60"
    >
      {/* Hero image with overlay */}
      <div className="relative h-52 md:h-56 overflow-hidden">
        <Image
          src={event.heroImage}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `linear-gradient(to bottom, ${event.palette.primary}90 0%, ${event.palette.background}ee 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />

        {/* Chapter number */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] font-body"
            style={{ color: `${event.palette.foreground}60` }}
          >
            {String(event.chapterNumber).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom gradient for text readability */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to top, ${event.palette.background}, transparent)`,
          }}
        />
      </div>

      {/* Accent line */}
      <motion.div
        className="h-[2px] w-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, ${event.palette.secondary}, ${event.palette.accent})`,
        }}
      />

      {/* Content */}
      <div className="p-6 md:p-7">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-body mb-4">
          {event.date} · {event.time}
        </p>

        <h3 className="font-serif text-xl md:text-2xl text-stone-100 mb-1.5 group-hover:text-amber-100 transition-colors duration-300 leading-tight">
          {event.title}
        </h3>

        <p className="font-serif text-sm italic text-stone-400/80 mb-4">
          {event.subtitle}
        </p>

        <p className="text-[13px] text-stone-500 font-body line-clamp-2 leading-relaxed">
          {event.tagline}
        </p>

        <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.15em] text-stone-600 font-body">
            {event.location}
          </span>
          <span className="text-amber-400/40 text-sm group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
