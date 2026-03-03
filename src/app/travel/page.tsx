import type { Metadata } from "next";
import { TRAVEL_INFO, COUPLE } from "@/content/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import {
  P,
  RoyalPageHero,
  RoyalPageWrapper,
  RoyalSectionFrame,
  RoyalSectionBorder,
  RoyalDivider,
} from "@/components/shared/RoyalPageLayout";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Travel — T & S Wedding",
};

export default function TravelPage() {
  return (
    <RoyalPageWrapper>
      <Navbar />

      <RoyalPageHero
        label={COUPLE.location}
        title="Getting There"
        subtitle={`Everything you need to plan your journey to ${COUPLE.venue}.`}
      />

      {/* Airport Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <RoyalSectionFrame glow className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${P.gold}12` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl" style={{ color: P.cream }}>
                  Nearest Airport
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-serif text-lg md:text-xl" style={{ color: `${P.gold}e6` }}>
                    {TRAVEL_INFO.airport}
                  </p>
                  <p className="font-body text-sm mt-1" style={{ color: `${P.cream}60` }}>
                    {TRAVEL_INFO.distance}
                  </p>
                </div>
                <div className="h-px" style={{ backgroundColor: `${P.gold}0a` }} />
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: `${P.gold}60` }} />
                  <p className="font-body text-sm leading-relaxed" style={{ color: `${P.cream}80` }}>
                    {TRAVEL_INFO.pickupNote}
                  </p>
                </div>
              </div>
            </RoyalSectionFrame>
          </FadeInView>
        </div>
      </section>

      {/* How to Reach */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="How to Reach" subtitle="Directions to the venue from the airport" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6">
            <FadeInView delay={0.1}>
              <RoyalSectionFrame className="p-6 md:p-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${P.gold}12` }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-5.4A1 1 0 0014.4 4H9.6a1 1 0 00-.9.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: `${P.cream}cc` }}>By Car</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: `${P.cream}60` }}>
                  Take NH-48 from the airport towards the city centre. The Leela Palace is approximately a 30-minute drive via Tonk Road. Follow signs for Amer Road.
                </p>
              </RoyalSectionFrame>
            </FadeInView>
            <FadeInView delay={0.2}>
              <RoyalSectionFrame className="p-6 md:p-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${P.gold}12` }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                    <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2.81A2 2 0 0121 8v8a2 2 0 01-2 2h-2" />
                    <path d="M14 6a2 2 0 10-4 0v12a2 2 0 104 0V6z" />
                    <path d="M3 14h4M17 14h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: `${P.cream}cc` }}>Arranged Pickup</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: `${P.cream}60` }}>
                  Complimentary airport pickups are arranged for all guests. Share your flight details via the guest portal and a driver will meet you at arrivals.
                </p>
              </RoyalSectionFrame>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="Key Contacts" subtitle="Reach out to our team for any assistance" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAVEL_INFO.contacts.map((contact, i) => (
              <FadeInView key={contact.name} delay={0.1 * i}>
                <RoyalSectionFrame className="p-6 group">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${P.gold}12` }}
                  >
                    <span className="font-serif text-sm" style={{ color: P.gold }}>
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg mb-1" style={{ color: `${P.cream}cc` }}>
                    {contact.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-body mb-4" style={{ color: `${P.gold}66` }}>
                    {contact.role}
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 font-body text-sm transition-colors duration-300"
                    style={{ color: `${P.cream}80` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    {contact.phone}
                  </a>
                </RoyalSectionFrame>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="Documents" subtitle="Helpful resources for your trip" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-5">
            {[
              { title: "Travel Guide PDF", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" },
              { title: "Visa Information", icon: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" },
            ].map((doc, i) => (
              <FadeInView key={doc.title} delay={0.1 * (i + 1)}>
                <RoyalSectionFrame className="p-6">
                  <a href="#" className="flex items-center gap-5 group">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${P.gold}12` }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                        <path d={doc.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg" style={{ color: `${P.cream}cc` }}>{doc.title}</h3>
                      <p className="font-body text-xs mt-0.5" style={{ color: `${P.cream}33` }}>Coming soon</p>
                    </div>
                  </a>
                </RoyalSectionFrame>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <RoyalDivider className="pb-8" />
      <Footer />
    </RoyalPageWrapper>
  );
}
