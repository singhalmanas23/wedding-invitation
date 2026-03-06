"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingEvent } from "@/types";
import { P } from "@/components/shared/RoyalPageLayout";

interface ChapterCardProps {
  event: WeddingEvent;
}

export function ChapterCard({ event }: ChapterCardProps) {
  return (
    <Link
      href={`/chapter/${event.slug}`}
      className="group relative block overflow-hidden rounded-sm transition-all duration-700"
      style={{
        border: `1px solid ${P.gold}0a`,
        backgroundColor: `${P.muted}20`,
      }}
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
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-body"
            style={{ color: `${event.palette.foreground}60` }}
          >
            {String(event.chapterNumber).padStart(2, "0")}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to top, ${event.palette.background}, transparent)`,
          }}
        />
      </div>

      {/* Gold accent line */}
      <motion.div
        className="h-[1px] w-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${P.gold}60, transparent)`,
        }}
      />

      {/* Content */}
      <div className="p-6 md:p-7">
        <p
          className="text-[10px] uppercase tracking-[0.2em] font-body mb-4"
          style={{ color: `${P.cream}40` }}
        >
          {event.date} · {event.time}
        </p>

        <h3
          className="font-serif text-xl md:text-2xl mb-1.5 leading-tight transition-colors duration-300"
          style={{ color: `${P.cream}cc` }}
        >
          {event.title}
        </h3>

        <p
          className="font-serif text-sm italic mb-4"
          style={{ color: `${event.palette.accent}99` }}
        >
          {event.subtitle}
        </p>

        <p
          className="text-[13px] font-body line-clamp-2 leading-relaxed"
          style={{ color: `${P.cream}50` }}
        >
          {event.tagline}
        </p>

        <div
          className="mt-5 pt-4 flex items-center justify-between"
          style={{ borderTop: `1px solid ${P.gold}08` }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.15em] font-body"
            style={{ color: `${P.cream}30` }}
          >
            {event.location}
          </span>
          <span
            className="text-sm group-hover:translate-x-1 transition-all duration-300"
            style={{ color: `${P.gold}50` }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
