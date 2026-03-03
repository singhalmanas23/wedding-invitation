"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { EVENTS } from "@/content/events";
import { WeddingEvent } from "@/types";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import DressCodeBadge from "@/components/shared/DressCodeBadge";
import {
  P,
  RoyalPageHero,
  RoyalPageWrapper,
  RoyalFlourish,
} from "@/components/shared/RoyalPageLayout";

/* ────────────────────────────────────────────────────────
   ICS Calendar File Generation
   ──────────────────────────────────────────────────────── */

function parseEventTime(time: string): { start: string; end: string } {
  const onwardsMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*onwards/i);
  if (onwardsMatch) {
    let hours = parseInt(onwardsMatch[1]);
    const minutes = onwardsMatch[2];
    const period = onwardsMatch[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const endHours = Math.min(hours + 4, 23);
    return {
      start: `${hours.toString().padStart(2, "0")}${minutes}00`,
      end: `${endHours.toString().padStart(2, "0")}0000`,
    };
  }

  const rangeMatch = time.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–\-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
  );
  if (rangeMatch) {
    let startH = parseInt(rangeMatch[1]);
    const startM = rangeMatch[2];
    const startP = rangeMatch[3].toUpperCase();
    let endH = parseInt(rangeMatch[4]);
    const endM = rangeMatch[5];
    const endP = rangeMatch[6].toUpperCase();
    if (startP === "PM" && startH !== 12) startH += 12;
    if (startP === "AM" && startH === 12) startH = 0;
    if (endP === "PM" && endH !== 12) endH += 12;
    if (endP === "AM" && endH === 12) endH = 0;
    return {
      start: `${startH.toString().padStart(2, "0")}${startM}00`,
      end: `${endH.toString().padStart(2, "0")}${endM}00`,
    };
  }

  return { start: "180000", end: "220000" };
}

const DATE_MAP: Record<string, string> = {
  "Apr 19": "20260419",
  "Apr 20": "20260420",
  "Apr 21": "20260421",
};

function downloadICS(event: WeddingEvent) {
  const dateStr = DATE_MAP[event.dateShort] || "20260419";
  const { start, end } = parseEventTime(event.time);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//T&S Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Asia/Kolkata:${dateStr}T${start}`,
    `DTEND;TZID=Asia/Kolkata:${dateStr}T${end}`,
    `SUMMARY:${event.title} — T & S Wedding`,
    `LOCATION:${event.location}\\, ${event.venue}`,
    `DESCRIPTION:${event.description.replace(/,/g, "\\,").replace(/\n/g, "\\n")}`,
    "STATUS:CONFIRMED",
    `UID:${event.slug}@tanviandsahil.com`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${event.slug}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/* ────────────────────────────────────────────────────────
   Group events by date
   ──────────────────────────────────────────────────────── */

interface DateGroup {
  dateShort: string;
  fullDate: string;
  day: string;
  events: WeddingEvent[];
}

const dateGroups: DateGroup[] = EVENTS.reduce<DateGroup[]>((acc, event) => {
  const existing = acc.find((g) => g.dateShort === event.dateShort);
  if (existing) {
    existing.events.push(event);
  } else {
    acc.push({
      dateShort: event.dateShort,
      fullDate: event.date,
      day: event.day,
      events: [event],
    });
  }
  return acc;
}, []);

/* ────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────── */

export default function ItineraryContent() {
  const [activeSlug, setActiveSlug] = useState<string>(EVENTS[0].slug);
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSlug(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px" }
    );

    Object.values(eventRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToEvent(slug: string) {
    eventRefs.current[slug]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <RoyalPageWrapper>
      <Navbar />

      <RoyalPageHero
        label="Three Days of Celebration"
        title="The Itinerary"
        subtitle="Your guide to three days of celebration"
      />

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 pb-40 lg:flex lg:gap-16">
        {/* Sticky sidebar — desktop only */}
        <aside className="hidden lg:block lg:w-60 shrink-0">
          <nav className="sticky top-32">
            <p
              className="text-[11px] uppercase tracking-[0.25em] mb-5 font-medium"
              style={{ color: `${P.gold}66` }}
            >
              Chapters
            </p>
            <div className="space-y-1">
              {EVENTS.map((event) => (
                <button
                  key={event.slug}
                  onClick={() => scrollToEvent(event.slug)}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-sm text-sm transition-all duration-300",
                    activeSlug === event.slug
                      ? "font-medium"
                      : ""
                  )}
                  style={{
                    backgroundColor:
                      activeSlug === event.slug
                        ? `${P.muted}40`
                        : "transparent",
                    border: `1px solid ${
                      activeSlug === event.slug
                        ? `${P.gold}12`
                        : "transparent"
                    }`,
                    color:
                      activeSlug === event.slug
                        ? P.cream
                        : `${P.cream}60`,
                  }}
                >
                  <span
                    className="block text-[10px] uppercase tracking-widest mb-0.5"
                    style={{ color: `${P.cream}40` }}
                  >
                    {event.dateShort} ·{" "}
                    {event.time.split(/[–\-]/)[0].replace("onwards", "").trim()}
                  </span>
                  <span className="block">{event.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Timeline content */}
        <main className="flex-1 min-w-0">
          {dateGroups.map((group, gi) => (
            <section key={group.dateShort} className={gi > 0 ? "mt-28" : ""}>
              {/* Date heading */}
              <FadeInView>
                <div className="mb-14 pl-10">
                  <p
                    className="text-[11px] uppercase tracking-[0.3em] mb-2 font-medium"
                    style={{ color: `${P.gold}66` }}
                  >
                    {group.day}
                  </p>
                  <h2
                    className="font-serif text-3xl md:text-4xl lg:text-5xl"
                    style={{ color: `${P.cream}cc` }}
                  >
                    {group.fullDate}
                  </h2>
                  <RoyalFlourish className="mt-4 justify-start" />
                </div>
              </FadeInView>

              {/* Timeline */}
              <div className="relative pl-10">
                {/* Vertical line */}
                <div
                  className="absolute left-[7px] top-2 bottom-0 w-[2px] rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${P.gold}40, ${P.gold}20, transparent)`,
                  }}
                />

                {group.events.map((event, ei) => (
                  <div
                    key={event.slug}
                    id={event.slug}
                    ref={(el) => {
                      eventRefs.current[event.slug] = el;
                    }}
                    className={cn("relative", ei > 0 ? "mt-14" : "")}
                  >
                    <FadeInView delay={ei * 0.12}>
                      {/* Timeline dot — diamond shape */}
                      <div
                        className="absolute -left-10 top-8 z-10 flex items-center justify-center"
                        style={{ width: 16, height: 16 }}
                      >
                        <div
                          className="w-3 h-3 rotate-45 transition-all duration-500"
                          style={{
                            border: `1.5px solid ${event.palette.accent}`,
                            backgroundColor:
                              activeSlug === event.slug
                                ? `${event.palette.accent}40`
                                : P.bg,
                            boxShadow:
                              activeSlug === event.slug
                                ? `0 0 12px ${event.palette.accent}60`
                                : "none",
                          }}
                        />
                      </div>

                      {/* Event card */}
                      <div
                        className="rounded-sm p-7 md:p-9 transition-all duration-700 relative overflow-hidden"
                        style={{
                          backgroundColor: `${event.palette.primary}12`,
                          border: `1px solid ${P.gold}0a`,
                          boxShadow:
                            activeSlug === event.slug
                              ? `0 0 80px ${event.palette.primary}10`
                              : "none",
                        }}
                      >
                        {/* Corner ornaments */}
                        <div
                          className="absolute top-2 left-2 w-3 h-3"
                          style={{
                            borderTop: `1px solid ${P.gold}10`,
                            borderLeft: `1px solid ${P.gold}10`,
                          }}
                        />
                        <div
                          className="absolute top-2 right-2 w-3 h-3"
                          style={{
                            borderTop: `1px solid ${P.gold}10`,
                            borderRight: `1px solid ${P.gold}10`,
                          }}
                        />

                        {/* Time pill */}
                        <div
                          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-sm mb-5"
                          style={{
                            color: event.palette.accent,
                            backgroundColor: `${event.palette.accent}12`,
                          }}
                        >
                          <Clock size={13} />
                          <span>{event.time}</span>
                        </div>

                        <h3
                          className="font-serif text-2xl md:text-3xl mb-1.5 leading-tight"
                          style={{ color: P.cream }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-sm italic mb-5"
                          style={{ color: `${event.palette.accent}cc` }}
                        >
                          {event.subtitle}
                        </p>

                        <p
                          className="leading-[1.8] mb-6 max-w-2xl text-[15px]"
                          style={{ color: `${P.cream}80` }}
                        >
                          {event.description}
                        </p>

                        <div
                          className="flex items-center gap-2 text-sm mb-5"
                          style={{ color: `${P.cream}60` }}
                        >
                          <MapPin size={14} className="shrink-0" />
                          <span>
                            {event.location}, {event.venue}
                          </span>
                        </div>

                        <div className="mb-7">
                          <DressCodeBadge
                            title={event.dressCode.title}
                            palette={event.palette}
                          />
                        </div>

                        {/* Actions */}
                        <div
                          className="flex flex-wrap items-center gap-6 pt-5"
                          style={{ borderTop: `1px solid ${P.gold}0a` }}
                        >
                          <Link
                            href={`/chapter/${event.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group"
                            style={{ color: event.palette.accent }}
                          >
                            Explore Chapter
                            <ArrowRight
                              size={14}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </Link>

                          <button
                            onClick={() => downloadICS(event)}
                            className="inline-flex items-center gap-2 text-sm transition-colors duration-300"
                            style={{ color: `${P.cream}60` }}
                          >
                            <Calendar size={14} />
                            Add to Calendar
                          </button>
                        </div>
                      </div>
                    </FadeInView>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </RoyalPageWrapper>
  );
}
