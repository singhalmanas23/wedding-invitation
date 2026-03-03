"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Royal Color Palette — shared across all pages
   ═══════════════════════════════════════════════════════════ */

export const P = {
  gold: "#d4af37",
  bronze: "#c9956b",
  maroon: "#8b1a1a",
  bg: "#1a0a0a",
  bgDeep: "#150808",
  muted: "#2e1212",
  cream: "#f5efe6",
} as const;

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/* ═══════════════════════════════════════════════════════════
   Royal Page Hero — ornamental page header with arch framing
   ═══════════════════════════════════════════════════════════ */

interface RoyalPageHeroProps {
  label?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children?: ReactNode;
}

export function RoyalPageHero({
  label,
  title,
  titleAccent,
  subtitle,
  children,
}: RoyalPageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${P.muted}30 0%, ${P.bg} 60%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, rgba(139,26,26,0.08), transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 50% 30%, rgba(212,175,55,0.03), transparent 60%)`,
        }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Mughal arch frame behind title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          viewBox="0 0 400 500"
          className="w-64 md:w-80 h-auto opacity-[0.04]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 500 V220 Q60 80 200 30 Q340 80 340 220 V500"
            stroke={P.gold}
            strokeWidth="1"
          />
          <path
            d="M85 480 V235 Q85 110 200 65 Q315 110 315 235 V480"
            stroke={P.gold}
            strokeWidth="0.5"
          />
          <circle cx="200" cy="45" r="5" stroke={P.gold} strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.3em] font-body mb-6"
            style={{ color: `${P.gold}99` }}
          >
            {label}
          </motion.p>
        )}

        <RoyalFlourish className="mb-8" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight"
          style={{ color: P.cream }}
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span
                style={{
                  background: `linear-gradient(180deg, ${P.gold}, ${P.bronze})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg font-body max-w-lg mx-auto leading-relaxed"
            style={{ color: `${P.cream}66` }}
          >
            {subtitle}
          </motion.p>
        )}

        {children}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RoyalFlourish className="mt-10" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Royal Flourish — gold ornamental divider
   ═══════════════════════════════════════════════════════════ */

export function RoyalFlourish({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-px w-10 md:w-20"
        style={{
          background: `linear-gradient(to right, transparent, ${P.gold}33)`,
        }}
      />
      <div className="flex items-center gap-1.5 mx-3">
        <div
          className="w-0.5 h-0.5 rounded-full"
          style={{ backgroundColor: `${P.gold}40` }}
        />
        <div
          className="w-1.5 h-1.5 rotate-45"
          style={{ border: `1px solid ${P.gold}4d` }}
        />
        <div
          className="w-0.5 h-0.5 rounded-full"
          style={{ backgroundColor: `${P.gold}40` }}
        />
      </div>
      <div
        className="h-px w-10 md:w-20"
        style={{
          background: `linear-gradient(to left, transparent, ${P.gold}33)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Royal Divider — section separator with mandala diamond
   ═══════════════════════════════════════════════════════════ */

export function RoyalDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-px w-12 md:w-24"
        style={{
          background: `linear-gradient(to right, transparent, ${P.gold}25)`,
        }}
      />
      <div className="relative mx-5 w-10 h-10 flex items-center justify-center">
        <div
          className="absolute inset-0 rotate-45 border"
          style={{ borderColor: `${P.gold}18` }}
        />
        <div
          className="absolute inset-2 rotate-45 border"
          style={{ borderColor: `${P.gold}12` }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: `${P.gold}40` }}
        />
      </div>
      <div
        className="h-px w-12 md:w-24"
        style={{
          background: `linear-gradient(to left, transparent, ${P.gold}25)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Royal Section Frame — ornamental card wrapper
   ═══════════════════════════════════════════════════════════ */

interface RoyalSectionFrameProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function RoyalSectionFrame({
  children,
  className = "",
  glow = false,
}: RoyalSectionFrameProps) {
  return (
    <div
      className={`relative rounded-sm overflow-hidden ${className}`}
      style={{
        border: `1px solid ${P.gold}12`,
        backgroundColor: `${P.muted}20`,
      }}
    >
      {glow && (
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${P.gold}06, transparent 70%)`,
          }}
        />
      )}
      {/* Corner ornaments */}
      <div
        className="absolute top-2 left-2 w-3 h-3"
        style={{
          borderTop: `1px solid ${P.gold}15`,
          borderLeft: `1px solid ${P.gold}15`,
        }}
      />
      <div
        className="absolute top-2 right-2 w-3 h-3"
        style={{
          borderTop: `1px solid ${P.gold}15`,
          borderRight: `1px solid ${P.gold}15`,
        }}
      />
      <div
        className="absolute bottom-2 left-2 w-3 h-3"
        style={{
          borderBottom: `1px solid ${P.gold}15`,
          borderLeft: `1px solid ${P.gold}15`,
        }}
      />
      <div
        className="absolute bottom-2 right-2 w-3 h-3"
        style={{
          borderBottom: `1px solid ${P.gold}15`,
          borderRight: `1px solid ${P.gold}15`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Royal Section Divider — full-width with maroon glow
   ═══════════════════════════════════════════════════════════ */

export function RoyalSectionBorder() {
  return (
    <div
      className="border-t"
      style={{ borderColor: `${P.gold}0a` }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   Royal Page Wrapper — consistent page background
   ═══════════════════════════════════════════════════════════ */

export function RoyalPageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: P.bg, color: P.cream }}>
      {children}
    </main>
  );
}
