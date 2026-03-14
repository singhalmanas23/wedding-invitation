"use client";

import { useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FadeInView from "@/components/motion/FadeInView";
import ThrillIntro from "./thrill-theory/ThrillIntro";
import ThrillHeroPinned from "./thrill-theory/ThrillHeroPinned";
import {
  QuoteSection,
  ThrillStorySection,
  DressCodePanel,
  MoodEditorialSection,
  ThrillVenueSection,
  ThrillFooter,
} from "./thrill-theory/ThrillSections";
import { NeonDivider, NoiseOverlay } from "./thrill-theory/PremiumSVGs";
import { T } from "./thrill-theory/theme";
import { WeddingEvent } from "@/types";

interface ChapterProps {
  event: WeddingEvent;
}

export default function SeventhChapterContent({ event }: ChapterProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { palette } = event;

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: T.bg, color: T.white }}
    >
      {!introComplete && !prefersReducedMotion && (
        <ThrillIntro event={event} onComplete={handleIntroComplete} />
      )}

      <NoiseOverlay opacity={0.025} />

      <Navbar />
      <ThrillHeroPinned event={event} />
      <QuoteSection event={event} />

      <FadeInView>
        <section
          className="border-y py-8"
          style={{
            borderColor: `${T.magenta}15`,
            backgroundColor: palette.background,
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: `${event.date} · ${event.day}` },
              { label: event.time },
              { label: `${event.location}, ${event.venue}` },
            ].map(({ label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm"
                style={{ color: T.muted }}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      <ThrillStorySection event={event} />

      <div
        className="flex justify-center"
        style={{ backgroundColor: palette.background }}
      >
        <NeonDivider accent={T.cyan} primary={T.magenta} />
      </div>

      <DressCodePanel event={event} />

      <div
        className="flex justify-center"
        style={{ backgroundColor: palette.background }}
      >
        <NeonDivider accent={T.cyan} primary={T.magenta} />
      </div>

      <MoodEditorialSection event={event} />

      <div
        className="flex justify-center"
        style={{ backgroundColor: palette.background }}
      >
        <NeonDivider accent={T.cyan} primary={T.magenta} />
      </div>

      <ThrillVenueSection event={event} />
      <ThrillFooter event={event} />
    </div>
  );
}
