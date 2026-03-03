"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COUPLE } from "@/content/events";
import { P } from "@/components/shared/RoyalPageLayout";

const NAV_LINKS = [
  { href: "/itinerary", label: "Itinerary" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/travel", label: "Travel" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                backgroundColor: `${P.bg}e6`,
                backdropFilter: "blur(12px)",
                borderBottom: `1px solid ${P.gold}08`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }
            : { backgroundColor: "transparent" }
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="font-serif text-lg md:text-xl tracking-tight transition-colors duration-300 hover:opacity-80"
            style={{ color: P.cream }}
          >
            {COUPLE.partner1}{" "}
            <span style={{ color: `${P.gold}b3` }}>&amp;</span>{" "}
            {COUPLE.partner2}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 px-4 py-2"
                  style={{ color: `${P.cream}73` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = `${P.gold}cc`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = `${P.cream}73`)
                  }
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span
                    className="w-0.5 h-0.5 rounded-full"
                    style={{ backgroundColor: `${P.gold}30` }}
                  />
                )}
              </span>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center transition-colors"
            style={{ color: `${P.cream}99` }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{
              backgroundColor: `${P.bg}fa`,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Decorative arch in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 400 500"
                className="w-64 h-auto opacity-[0.03]"
                fill="none"
              >
                <path
                  d="M60 500 V220 Q60 80 200 30 Q340 80 340 220 V500"
                  stroke={P.gold}
                  strokeWidth="1"
                />
              </svg>
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: i * 0.08 + 0.1,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl transition-colors duration-300"
                  style={{ color: `${P.cream}cc` }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Decorative bottom text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(to right, transparent, ${P.gold}20)`,
                  }}
                />
                <div
                  className="w-1 h-1 rotate-45"
                  style={{ backgroundColor: `${P.gold}30` }}
                />
                <div
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(to left, transparent, ${P.gold}20)`,
                  }}
                />
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.3em] font-body"
                style={{ color: `${P.gold}30` }}
              >
                {COUPLE.hashtag}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
