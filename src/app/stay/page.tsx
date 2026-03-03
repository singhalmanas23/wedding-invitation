import type { Metadata } from "next";
import Link from "next/link";
import { STAY_INFO } from "@/content/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  P,
  RoyalPageHero,
  RoyalPageWrapper,
  RoyalSectionFrame,
  RoyalSectionBorder,
  RoyalDivider,
} from "@/components/shared/RoyalPageLayout";

export const metadata: Metadata = {
  title: "Your Stay — T & S Wedding",
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Complimentary Wi-Fi": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "Spa & wellness centre": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <path d="M12 22c-4.97 0-9-2.24-9-5v-1c0-.34.04-.67.12-1C4.07 11.63 7.72 9 12 9s7.93 2.63 8.88 6c.08.33.12.66.12 1v1c0 2.76-4.03 5-9 5z" />
      <path d="M12 9V2" />
      <path d="M8 5l4-3 4 3" />
    </svg>
  ),
  "24-hour room service": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  "Swimming pool": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <path d="M2 12h20" />
      <path d="M2 16c1 1 2.5 2 4.5 2s3-1 4.5-2c1.5 1 3 2 4.5 2s3.5-1 4.5-2" />
      <path d="M2 20c1 1 2.5 2 4.5 2s3-1 4.5-2c1.5 1 3 2 4.5 2s3.5-1 4.5-2" />
    </svg>
  ),
  "Fitness centre": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <path d="M6.5 6.5L17.5 17.5" />
      <path d="M3 10l3.5-3.5M20.5 17L17 13.5" />
      <path d="M7 14l3.5-3.5M17.5 7L14 10.5" />
    </svg>
  ),
  "Concierge service": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
      <path d="M18 20V6a2 2 0 00-2-2H8a2 2 0 00-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12h.01" />
    </svg>
  ),
};

export default function StayPage() {
  return (
    <RoyalPageWrapper>
      <Navbar />

      <RoyalPageHero
        label="Accommodation"
        title="Your Stay"
        subtitle="Settle in and let every detail be taken care of."
      />

      {/* Hotel Info Card */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <RoyalSectionFrame glow className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${P.gold}12` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                    <path d="M18 20V6a2 2 0 00-2-2H8a2 2 0 00-2 2v14" />
                    <path d="M2 20h20" />
                    <path d="M14 12h.01" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl" style={{ color: P.cream }}>
                  {STAY_INFO.hotel}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div
                  className="rounded-sm p-5"
                  style={{
                    backgroundColor: `${P.muted}30`,
                    border: `1px solid ${P.gold}08`,
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] font-body mb-2" style={{ color: `${P.gold}66` }}>
                    Check-in
                  </p>
                  <p className="font-serif text-lg" style={{ color: `${P.cream}cc` }}>
                    {STAY_INFO.checkIn}
                  </p>
                </div>
                <div
                  className="rounded-sm p-5"
                  style={{
                    backgroundColor: `${P.muted}30`,
                    border: `1px solid ${P.gold}08`,
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] font-body mb-2" style={{ color: `${P.gold}66` }}>
                    Check-out
                  </p>
                  <p className="font-serif text-lg" style={{ color: `${P.cream}cc` }}>
                    {STAY_INFO.checkOut}
                  </p>
                </div>
              </div>
            </RoyalSectionFrame>
          </FadeInView>
        </div>
      </section>

      {/* Amenities Grid */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="Amenities" subtitle="Everything you need for a comfortable stay" />
          </FadeInView>
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {STAY_INFO.amenities.map((amenity, i) => (
              <FadeInView key={amenity} delay={0.08 * i}>
                <RoyalSectionFrame className="p-5 text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${P.gold}12` }}
                  >
                    {AMENITY_ICONS[amenity] ?? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-sm" style={{ color: `${P.cream}99` }}>
                    {amenity}
                  </p>
                </RoyalSectionFrame>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* House Rules */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <SectionHeading title="House Rules" subtitle="A few things to keep in mind" />
          </FadeInView>
          <FadeInView delay={0.15}>
            <RoyalSectionFrame className="mt-12 md:mt-16 p-8 md:p-12">
              <ol className="space-y-5">
                {STAY_INFO.houseRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-medium"
                      style={{ backgroundColor: `${P.gold}12`, color: `${P.gold}cc` }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-body text-sm md:text-base leading-relaxed pt-0.5" style={{ color: `${P.cream}80` }}>
                      {rule}
                    </p>
                  </li>
                ))}
              </ol>
            </RoyalSectionFrame>
          </FadeInView>
        </div>
      </section>

      {/* Guest Portal Note */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView>
            <RoyalSectionFrame glow className="p-8 md:p-12 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${P.gold}12` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: P.cream }}>
                Room Assignments
              </h3>
              <p className="font-body text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto" style={{ color: `${P.cream}60` }}>
                Your room assignment will be available in the Guest Portal. Log in to view your room details and manage your stay.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 font-body text-sm tracking-wide transition-all duration-300"
                style={{
                  color: P.gold,
                  border: `1px solid ${P.gold}25`,
                  backgroundColor: `${P.gold}08`,
                }}
              >
                Access Guest Portal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </RoyalSectionFrame>
          </FadeInView>
        </div>
      </section>

      <RoyalDivider className="pb-8" />
      <Footer />
    </RoyalPageWrapper>
  );
}
