import type { Metadata } from "next";
import { FAQ_DATA, COUPLE, TRAVEL_INFO } from "@/content/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  P,
  RoyalPageHero,
  RoyalPageWrapper,
  RoyalSectionFrame,
  RoyalSectionBorder,
  RoyalDivider,
} from "@/components/shared/RoyalPageLayout";

export const metadata: Metadata = {
  title: "FAQ — T & S Wedding",
};

export default function FAQPage() {
  return (
    <RoyalPageWrapper>
      <Navbar />

      <RoyalPageHero
        label={COUPLE.hashtag}
        title="Frequently Asked"
        titleAccent="Questions"
        subtitle="Everything you need to know"
      />

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-sm px-6 transition-all duration-300 data-[state=open]:border-amber-400/15"
                  style={{
                    border: `1px solid ${P.gold}0a`,
                    backgroundColor: `${P.muted}20`,
                  }}
                >
                  <AccordionTrigger
                    className="py-5 text-left font-serif text-base md:text-lg hover:no-underline transition-colors duration-300 [&>svg]:opacity-40"
                    style={{ color: `${P.cream}cc` }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="pb-5 font-body text-sm md:text-base leading-relaxed"
                    style={{ color: `${P.cream}73` }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInView>
        </div>
      </section>

      {/* Still Have Questions */}
      <RoyalSectionBorder />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView>
            <RoyalSectionFrame glow className="p-8 md:p-14 text-center">
              <SectionHeading
                title="Still Have Questions?"
                subtitle="Our team is here to help with anything you need."
              />
              <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                {TRAVEL_INFO.contacts.slice(0, 2).map((contact) => (
                  <a
                    key={contact.name}
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="group flex items-center gap-3 rounded-sm p-4 transition-all duration-300"
                    style={{
                      border: `1px solid ${P.gold}0a`,
                      backgroundColor: `${P.muted}20`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${P.gold}12` }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: P.gold }}>
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-body text-sm" style={{ color: `${P.cream}cc` }}>
                        {contact.name}
                      </p>
                      <p className="font-body text-xs" style={{ color: `${P.cream}40` }}>
                        {contact.role}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <p className="mt-8 font-body text-xs" style={{ color: `${P.cream}30` }}>
                Or reach out to the hotel concierge during your stay.
              </p>
            </RoyalSectionFrame>
          </FadeInView>
        </div>
      </section>

      <RoyalDivider className="pb-8" />
      <Footer />
    </RoyalPageWrapper>
  );
}
