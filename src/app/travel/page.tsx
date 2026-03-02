import type { Metadata } from "next";
import { TRAVEL_INFO, COUPLE } from "@/content/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Travel — T & S Wedding",
};

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-amber-950/10 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/3 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeInView>
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/60 font-body mb-6">
              {COUPLE.location}
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-100 tracking-tight">
              Getting There
            </h1>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="mt-6 text-stone-500 text-base md:text-lg font-body max-w-lg mx-auto leading-relaxed">
              Everything you need to plan your journey to {COUPLE.venue}.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Airport Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <div className="relative rounded-2xl border border-white/6 bg-white/2 p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/3 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-stone-100">
                    Nearest Airport
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-amber-300/90 font-serif text-lg md:text-xl">
                      {TRAVEL_INFO.airport}
                    </p>
                    <p className="text-stone-500 font-body text-sm mt-1">
                      {TRAVEL_INFO.distance}
                    </p>
                  </div>
                  <div className="h-px bg-white/4" />
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50 mt-2 shrink-0" />
                    <p className="text-stone-400 font-body text-sm leading-relaxed">
                      {TRAVEL_INFO.pickupNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 md:py-24 border-t border-white/4">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="How to Reach" subtitle="Directions to the venue from the airport" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6">
            <FadeInView delay={0.1}>
              <div className="rounded-xl border border-white/6 bg-white/2 p-6 md:p-8">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-5.4A1 1 0 0014.4 4H9.6a1 1 0 00-.9.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-stone-200 mb-2">By Car</h3>
                <p className="text-stone-500 font-body text-sm leading-relaxed">
                  Take NH-48 from the airport towards the city centre. The Leela Palace is approximately a 30-minute drive via Tonk Road. Follow signs for Amer Road.
                </p>
              </div>
            </FadeInView>
            <FadeInView delay={0.2}>
              <div className="rounded-xl border border-white/6 bg-white/2 p-6 md:p-8">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                    <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2.81A2 2 0 0121 8v8a2 2 0 01-2 2h-2" />
                    <path d="M14 6a2 2 0 10-4 0v12a2 2 0 104 0V6z" />
                    <path d="M3 14h4M17 14h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-stone-200 mb-2">Arranged Pickup</h3>
                <p className="text-stone-500 font-body text-sm leading-relaxed">
                  Complimentary airport pickups are arranged for all guests. Share your flight details via the guest portal and a driver will meet you at arrivals.
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-24 border-t border-white/4">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="Key Contacts" subtitle="Reach out to our team for any assistance" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAVEL_INFO.contacts.map((contact, i) => (
              <FadeInView key={contact.name} delay={0.1 * i}>
                <div className="group rounded-xl border border-white/6 bg-white/2 p-6 hover:border-amber-400/20 hover:bg-amber-400/2 transition-all duration-500">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400/15 transition-colors duration-500">
                    <span className="font-serif text-amber-400 text-sm">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-200 mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-amber-400/50 font-body mb-4">
                    {contact.role}
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-300 transition-colors duration-300 font-body text-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    {contact.phone}
                  </a>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Documents */}
      <section className="py-16 md:py-24 border-t border-white/4">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="Documents" subtitle="Helpful resources for your trip" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-5">
            <FadeInView delay={0.1}>
              <a
                href="#"
                className="group flex items-center gap-5 rounded-xl border border-white/6 bg-white/2 p-6 hover:border-amber-400/20 hover:bg-amber-400/2 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/15 transition-colors duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-200 group-hover:text-amber-300 transition-colors duration-300">
                    Travel Guide PDF
                  </h3>
                  <p className="text-stone-600 font-body text-xs mt-0.5">
                    Coming soon
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto text-stone-700 group-hover:text-amber-400/50 transition-colors duration-300 shrink-0">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </FadeInView>
            <FadeInView delay={0.2}>
              <a
                href="#"
                className="group flex items-center gap-5 rounded-xl border border-white/6 bg-white/2 p-6 hover:border-amber-400/20 hover:bg-amber-400/2 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/15 transition-colors duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-200 group-hover:text-amber-300 transition-colors duration-300">
                    Visa Information
                  </h3>
                  <p className="text-stone-600 font-body text-xs mt-0.5">
                    Coming soon
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto text-stone-700 group-hover:text-amber-400/50 transition-colors duration-300 shrink-0">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </FadeInView>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
