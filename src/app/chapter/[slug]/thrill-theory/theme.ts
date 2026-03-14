/* ═══════════════════════════════════════════════════════════════════
   Theme — The Thrill Theory · उन्मुक्त रात्रि
   Deep plum + neon magenta + cyan + gold. Premium afterparty palette.
   ═══════════════════════════════════════════════════════════════════ */

export const T = {
  bg: "#05030a",
  bgMid: "#090611",
  bgDeep: "#12081d",
  bgPlum: "#1a0d2a",
  magenta: "#ff0a78",
  purple: "#8b5cf6",
  cyan: "#44f0ff",
  gold: "#f2c572",
  white: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.52)",
  dim: "rgba(255,255,255,0.25)",
} as const;

/* ── Glow utilities ─────────────────────────────────────────────── */

export function softGlow(color: string) {
  return { boxShadow: `0 0 20px ${color}18, 0 0 6px ${color}0c` } as const;
}

export function mediumGlow(color: string) {
  return { boxShadow: `0 0 40px ${color}28, 0 0 12px ${color}14` } as const;
}

export function strongGlow(color: string) {
  return {
    boxShadow: `0 0 80px ${color}30, 0 0 32px ${color}20`,
  } as const;
}

export function textGlow(color: string) {
  return {
    textShadow: `0 0 24px ${color}40, 0 0 8px ${color}20`,
  } as const;
}

export function edgeGlow(color: string) {
  return {
    border: `1px solid ${color}18`,
    boxShadow: `inset 0 0 20px ${color}08, 0 0 16px ${color}0c`,
  } as const;
}

export function bloomRing(color: string) {
  return {
    boxShadow: `0 0 120px 40px ${color}14, 0 0 60px 20px ${color}0a`,
  } as const;
}

/* ── Motion presets (GSAP easing strings) ───────────────────────── */

export const motion = {
  introFade: { duration: 1.2, ease: "power3.inOut" },
  bloomReveal: { duration: 2.0, ease: "power2.out" },
  beamSweep: { duration: 3.0, ease: "sine.inOut" },
  titleDrift: { duration: 0.8, ease: "power3.out" },
  floatSlow: { duration: 6.0, ease: "sine.inOut" },
  spinAmbient: { duration: 30, ease: "none" },
  parallaxDepth: { ease: "none" },
} as const;

/* ── Layout tokens ──────────────────────────────────────────────── */

export const layout = {
  maxWidth: "max-w-7xl",
  contentGutter: "px-6 md:px-8",
  sectionSpacing: "py-24 md:py-36",
  cardRadius: "rounded-2xl",
  cardBorder: "1px solid rgba(255,255,255,0.06)",
} as const;
