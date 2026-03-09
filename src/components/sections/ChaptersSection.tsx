"use client";

import Link from "next/link";
import { EVENTS_FOR_CHAPTER_NAV } from "@/content/events";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ChapterCard } from "@/components/shared/ChapterCard";
import FadeInView from "@/components/motion/FadeInView";
import { P } from "@/components/shared/RoyalPageLayout";

export function ChaptersSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${P.bg}, ${P.bgDeep}, ${P.bg})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(139,26,26,0.04), transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeInView>
          <SectionHeading
            title="The Chapters"
            subtitle="Six chapters. From Pune to Udaipur. One celebration."
          />
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-16 md:mt-20">
          {EVENTS_FOR_CHAPTER_NAV.map((event, i) => (
            <FadeInView key={event.slug} delay={i * 0.08}>
              <ChapterCard event={event} />
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.5} className="text-center mt-16">
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 font-body group"
            style={{ color: `${P.cream}60` }}
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
