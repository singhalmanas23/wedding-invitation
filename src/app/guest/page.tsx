"use client";

import { EVENTS } from "@/content/events";
import { GuestInfo } from "@/types";
import FadeInView from "@/components/motion/FadeInView";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

const mockGuest: GuestInfo = {
  name: "Priya Sharma",
  room: "Royal Suite 204, Fairmont Udaipur",
  pickupTime: "19th April, 1:00 PM",
  pickupLocation: "Maharana Pratap Airport, Udaipur — Arrivals",
  events: [
    "pre-party",
    "courtyard-edit",
    "midnight-cathedral",
    "world-of-our-own",
    "royal-court",
    "thrill-theory",
  ],
  notifications: [
    {
      message: "Welcome! Your room is ready for check-in.",
      time: "2 hours ago",
      read: false,
    },
    {
      message: "Airport pickup confirmed for 19th April.",
      time: "1 day ago",
      read: true,
    },
    {
      message:
        "Don't forget: Royal Evening for the Pre-Party in Pune!",
      time: "2 days ago",
      read: true,
    },
  ],
};

const guestEvents = mockGuest.events
  .map((slug) => EVENTS.find((e) => e.slug === slug))
  .filter(Boolean);

export default function GuestPage() {
  return (
    <div className="min-h-screen">
      {/* Welcome */}
      <section className="px-6 md:px-10 pt-28 md:pt-32 pb-12">
        <FadeInView>
          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/70 font-body mb-3">
            Guest Portal
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-100 tracking-tight mb-4">
            Welcome, {mockGuest.name.split(" ")[0]}
          </h1>
          <p className="text-stone-400 font-body text-sm md:text-base max-w-lg leading-relaxed">
            We&apos;re thrilled to have you. Below you&apos;ll find your
            personalized itinerary, travel details, and everything you need for
            the celebration.
          </p>
        </FadeInView>
      </section>

      {/* My Itinerary */}
      <section id="itinerary" className="px-6 md:px-10 py-10 scroll-mt-24">
        <FadeInView>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-400/40" />
            <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
              My Itinerary
            </h2>
          </div>
        </FadeInView>

        <div className="space-y-3">
          {guestEvents.map((event, i) => {
            if (!event) return null;
            return (
              <FadeInView key={event.slug} delay={i * 0.06}>
                <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 p-5 md:p-6">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: event.palette.secondary }} />

                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pl-4">
                    <div className="shrink-0 md:w-28">
                      <p className="text-amber-400/80 font-body text-[11px] uppercase tracking-[0.15em]">
                        Chapter {event.chapterNumber}
                      </p>
                      <p className="text-stone-300 font-body text-sm mt-0.5">
                        {event.dateShort}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg md:text-xl text-stone-100 group-hover:text-amber-200 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-stone-500 font-body text-sm mt-1">
                        {event.time} · {event.location}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <Badge className="bg-white/[0.06] text-stone-400 border border-white/[0.08] hover:bg-white/[0.06] font-body text-[10px] uppercase tracking-[0.1em] px-3 py-1">
                        {event.dressCode.title}
                      </Badge>
                    </div>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </section>

      {/* Pickup Details */}
      <section id="pickup" className="px-6 md:px-10 py-10 scroll-mt-24">
        <FadeInView>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-400/40" />
            <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
              Pickup Details
            </h2>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 max-w-xl">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-amber-400/[0.08] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251 191 36)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-body mb-1.5">
                  Pickup Time
                </p>
                <p className="text-stone-100 font-serif text-lg">
                  {mockGuest.pickupTime}
                </p>
              </div>
            </div>

            <div className="h-px bg-white/[0.04] my-5" />

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-amber-400/[0.08] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251 191 36)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-body mb-1.5">
                  Pickup Location
                </p>
                <p className="text-stone-100 font-serif text-lg">
                  {mockGuest.pickupLocation}
                </p>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* Room Assignment */}
      <section id="room" className="px-6 md:px-10 py-10 scroll-mt-24">
        <FadeInView>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-400/40" />
            <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
              Room Assignment
            </h2>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 max-w-xl">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-amber-400/[0.08] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(251 191 36)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
                  <path d="M9 21V13h6v8" />
                  <path d="M1 21h22" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-body mb-1.5">
                  Your Room
                </p>
                <p className="text-stone-100 font-serif text-lg">
                  {mockGuest.room}
                </p>
                <p className="text-stone-500 font-body text-sm mt-2">
                  Check-in from 2:00 PM on 19th April. Your room key will be
                  available at the front desk upon arrival.
                </p>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* Notifications */}
      <section id="notifications" className="px-6 md:px-10 py-10 scroll-mt-24">
        <FadeInView>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-400/40" />
            <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
              Notifications
            </h2>
          </div>
        </FadeInView>

        <div className="space-y-2 max-w-xl">
          {mockGuest.notifications.map((notif, i) => (
            <FadeInView key={i} delay={i * 0.08}>
              <div
                className={`rounded-xl border p-5 transition-all duration-300 ${
                  notif.read
                    ? "border-white/[0.04] bg-white/[0.01]"
                    : "border-amber-400/[0.12] bg-amber-400/[0.03]"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="shrink-0 mt-1.5">
                    {notif.read ? (
                      <div className="w-2 h-2 rounded-full bg-stone-700" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-body text-sm leading-relaxed ${
                        notif.read ? "text-stone-400" : "text-stone-200"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-stone-600 font-body text-xs mt-1.5">
                      {notif.time}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
