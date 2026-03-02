"use client";

import Link from "next/link";
import { EVENTS } from "@/content/events";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ChapterCard } from "@/components/shared/ChapterCard";
import FadeInView from "@/components/motion/FadeInView";

export function ChaptersSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-stone-950 via-[#090910] to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(180,140,60,0.025)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <FadeInView>
          <SectionHeading
            title="The Chapters"
            subtitle="Six events. Six worlds. One celebration."
          />
        </FadeInView>

        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-16 md:mt-20">
          {EVENTS.map((event, i) => (
            <FadeInView key={event.slug} delay={i * 0.08}>
              <ChapterCard event={event} />
            </FadeInView>
          ))}
        </div>

        {/* View full itinerary link */}
        <FadeInView delay={0.5} className="text-center mt-16">
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-amber-300 transition-colors duration-300 font-body group"
          >
            View Full Itinerary
            <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
