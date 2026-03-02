import Link from "next/link";
import { COUPLE } from "@/content/events";

const FOOTER_LINKS = [
  { href: "/itinerary", label: "Itinerary" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/travel", label: "Travel" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/4 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
        <p className="font-serif text-2xl md:text-3xl text-stone-300 mb-2">
          {COUPLE.partner1}{" "}
          <span className="text-amber-400/50">&</span>{" "}
          {COUPLE.partner2}
        </p>

        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-body mb-10">
          {COUPLE.hashtag}
        </p>

        <div className="flex items-center justify-center gap-8 mb-10">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-stone-500 hover:text-amber-300 transition-colors duration-300 font-body"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="h-px w-16 bg-amber-400/15 mx-auto mb-10" />

        <p className="text-[11px] text-stone-700 font-body tracking-wide">
          April 19–21, 2026 · {COUPLE.location}
        </p>
      </div>
    </footer>
  );
}
