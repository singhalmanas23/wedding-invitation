import Link from "next/link";
import { COUPLE } from "@/content/events";
import { P } from "@/components/shared/RoyalPageLayout";

const FOOTER_LINKS = [
  { href: "/itinerary", label: "Itinerary" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/travel", label: "Travel" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: P.bgDeep, borderTop: `1px solid ${P.gold}08` }}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        {/* Mughal arch motif */}
        <div className="flex justify-center mb-8">
          <svg
            viewBox="0 0 200 120"
            className="w-24 md:w-32 h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ opacity: 0.08 }}
          >
            <path
              d="M20 120 V55 Q20 10 100 4 Q180 10 180 55 V120"
              stroke={P.gold}
              strokeWidth="0.8"
            />
            <path
              d="M35 120 V60 Q35 20 100 14 Q165 20 165 60 V120"
              stroke={P.gold}
              strokeWidth="0.4"
            />
            <circle cx="100" cy="28" r="2.5" fill={`${P.gold}12`} />
          </svg>
        </div>

        {/* Devanagari accent */}
        <p
          className="font-serif text-sm mb-4 tracking-[0.3em]"
          style={{ color: `${P.gold}25` }}
        >
          शुभ विवाह
        </p>

        {/* Couple names */}
        <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${P.cream}cc` }}>
          {COUPLE.partner1}{" "}
          <span style={{ color: `${P.gold}66` }}>&amp;</span>{" "}
          {COUPLE.partner2}
        </p>

        <p
          className="text-[10px] uppercase tracking-[0.3em] font-body mb-10"
          style={{ color: `${P.gold}30` }}
        >
          {COUPLE.hashtag}
        </p>

        {/* Nav links */}
        <div className="flex items-center justify-center gap-8 mb-10">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300"
              style={{ color: `${P.cream}40` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Gold flourish divider */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div
            className="h-px w-10 md:w-20"
            style={{
              background: `linear-gradient(to right, transparent, ${P.gold}20)`,
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ border: `1px solid ${P.gold}25` }}
          />
          <div
            className="h-px w-10 md:w-20"
            style={{
              background: `linear-gradient(to left, transparent, ${P.gold}20)`,
            }}
          />
        </div>

        <p
          className="text-[11px] font-body tracking-wide"
          style={{ color: `${P.cream}25` }}
        >
          April 19–21, 2026 · {COUPLE.location}
        </p>
      </div>
    </footer>
  );
}
