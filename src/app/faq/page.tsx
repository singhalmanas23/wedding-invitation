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

export const metadata: Metadata = {
  title: "FAQ — T & S Wedding",
};

export default function FAQPage() {
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
              {COUPLE.hashtag}
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-100 tracking-tight">
              Frequently Asked
              <br />
              <span className="text-amber-300/80">Questions</span>
            </h1>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="mt-6 text-stone-500 text-base md:text-lg font-body max-w-lg mx-auto leading-relaxed">
              Everything you need to know
            </p>
          </FadeInView>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/6 bg-white/2 px-6 data-[state=open]:border-amber-400/15 data-[state=open]:bg-amber-400/2 transition-all duration-300"
                >
                  <AccordionTrigger className="py-5 text-left font-serif text-base md:text-lg text-stone-200 hover:text-amber-300 hover:no-underline transition-colors duration-300 [&>svg]:text-amber-400/40">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-stone-500 font-body text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInView>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 border-t border-white/4">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView>
            <div className="text-center rounded-2xl border border-white/6 bg-white/2 p-8 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/3 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/2 rounded-full blur-[80px]" />
              <div className="relative">
                <SectionHeading
                  title="Still Have Questions?"
                  subtitle="Our team is here to help with anything you need."
                />
                <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {TRAVEL_INFO.contacts.slice(0, 2).map((contact) => (
                    <a
                      key={contact.name}
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="group flex items-center gap-3 rounded-xl border border-white/4 bg-white/2 p-4 hover:border-amber-400/15 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-full bg-amber-400/10 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-stone-300 font-body text-sm group-hover:text-amber-300 transition-colors duration-300">
                          {contact.name}
                        </p>
                        <p className="text-stone-600 font-body text-xs">
                          {contact.role}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="mt-8 text-stone-700 font-body text-xs">
                  Or reach out to the hotel concierge during your stay.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <Footer />
    </main>
  );
}
