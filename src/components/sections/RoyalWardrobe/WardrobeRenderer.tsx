"use client";

import { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChapterWardrobe } from "./WardrobeConfig";

const P = {
  gold: "#d4af37",
  cream: "#f5efe6",
  shadow: "rgba(0,0,0,0.35)",
};

const COLOR_NAME_TO_HEX: Record<string, string> = {
  Mint: "#b4d3b2",
  Lavender: "#d4c8e6",
  "Powder Blue": "#b0c4de",
  Peach: "#f2c7c7",
  Rust: "#c95a3c",
  Teal: "#2a9d8f",
  Emerald: "#2d6a4f",
  Copper: "#b87333",
  "Deep Maroon": "#8b1a1a",
  "Antique Gold": "#d4af37",
  Ivory: "#f5efe6",
  Vermillion: "#c9422e",
};

function resolveColor(name: string, fallback: string): string {
  return COLOR_NAME_TO_HEX[name] ?? fallback ?? P.cream;
}

interface LookProps {
  wardrobe: ChapterWardrobe;
  audience: "men" | "women" | "all";
  color: string;
  fabric: string;
  activeAccessories: string[];
}

function useFabricStyle(fabric: string) {
  return useMemo(() => {
    const f = fabric.toLowerCase();
    if (f.includes("organza")) return { filter: "url(#fabric-organza)", opacity: 0.82, mixBlendMode: "overlay" as const };
    if (f.includes("velvet")) return { filter: "url(#fabric-velvet)", opacity: 0.98 };
    if (f.includes("silk") || f.includes("banarasi") || f.includes("kanjivaram")) return { filter: "url(#fabric-silk)", opacity: 0.92 };
    if (f.includes("linen") || f.includes("mulmul")) return { filter: "url(#fabric-linen)", opacity: 0.9 };
    if (f.includes("chiffon")) return { filter: "url(#fabric-organza)", opacity: 0.75 };
    if (f.includes("satin") || f.includes("crepe")) return { filter: "url(#fabric-silk)", opacity: 0.9 };
    return { filter: "none", opacity: 1 };
  }, [fabric]);
}

/* ───────────────────────────────────────────────────────────────────────────── */
/*  Shared SVG defs: fabric textures, embroidery glow, sheen                      */
/* ───────────────────────────────────────────────────────────────────────────── */

function CoutureDefs() {
  return (
    <defs>
      {/* Organza: translucent airy sheen — no displacement to preserve silhouette */}
      <filter id="fabric-organza" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" result="blur" />
        <feOffset in="blur" dx="0" dy="0.5" result="offset" />
        <feComposite in="SourceGraphic" in2="offset" operator="over" />
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0.12  0 1 0 0 0.12  0 0 1 0 0.18  0 0 0 0.82 0" />
      </filter>
      {/* Velvet: rich matte depth */}
      <filter id="fabric-velvet" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.4" specularExponent="25" lightingColor="#fff" result="spec">
          <fePointLight x="200" y="80" z="200" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
      </filter>
      {/* Silk: soft reflective gloss */}
      <linearGradient id="silk-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
        <stop offset="40%" stopColor="white" stopOpacity="0.05" />
        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
      <filter id="fabric-silk" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.3" result="b" />
        <feSpecularLighting in="b" surfaceScale="2" specularConstant="0.9" specularExponent="18" lightingColor="#fff" result="s">
          <fePointLight x="180" y="60" z="250" />
        </feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" />
        <feComposite in2="SourceGraphic" operator="over" />
      </filter>
      {/* Linen: textured natural grain */}
      <filter id="fabric-linen" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2" result="diff">
          <feDistantLight azimuth="45" elevation="55" />
        </feDiffuseLighting>
        <feComposite in="SourceGraphic" in2="diff" operator="in" />
      </filter>
      <filter id="embroidery-glow">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.9 0 0 0 0 0.75 0 0 0 0 0.2 0 0 0 1 0" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="soft-shadow">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>
  );
}

/* ───────────────────────────────────────────────────────────────────────────── */
/*  Styled mode: Editorial fashion figure (elongated, layered, couture-grade)     */
/* ───────────────────────────────────────────────────────────────────────────── */

export function MaleLookRenderer({ wardrobe, color, fabric, activeAccessories }: LookProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const fabricStyle = useFabricStyle(fabric);
  const baseHex = resolveColor(color, wardrobe.palette.accents[0]);
  const accentHex = wardrobe.palette.accents[0] ?? P.gold;
  const accent2 = wardrobe.palette.accents[1] ?? P.cream;

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".body-silhouette", { opacity: 0 }, { opacity: 0.35, duration: 1.2 });
    tl.fromTo(".garment-inner", { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, "-=0.9");
    tl.fromTo(".garment-outer", { opacity: 0, y: 24, scaleY: 0.96 }, { opacity: 1, y: 0, scaleY: 1, duration: 1.6, ease: "elastic.out(1, 0.75)" }, "-=1.1");
    tl.fromTo(".accessory-item", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" }, "-=0.6");
    const idle = gsap.to(el, { y: "+=12", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    return () => idle.kill();
  }, [wardrobe.id, color, fabric]);

  return (
    <svg ref={containerRef} viewBox="0 0 380 720" className="w-full h-auto overflow-visible" style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.4))" }}>
      <CoutureDefs />
      <ellipse cx="190" cy="695" rx="70" ry="18" fill="black" opacity="0.22" />
      <g className="body-silhouette" style={{ opacity: 0.35 }}>
        <path d="M190 72 q-22 0 -32 28 L148 165 q-6 38 42 40 q48 2 42 -40 L232 100 q-10 -28 -42 -28 z" fill={P.cream} />
        <path d="M172 205 L158 480 L178 700 L202 700 L222 480 L208 205 Z" fill={P.cream} />
      </g>
      <g className="garment-inner" style={fabricStyle}>
        <path d="M176 198 L158 340 L172 620 L208 620 L222 340 L204 198 Z" fill={baseHex} />
        <path d="M190 198 L190 620" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
        <path d="M178 205 q8 4 12 0 q4 -2 10 0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      </g>
      <g className="garment-outer" style={fabricStyle} transform="translate(0,0)">
        <path d="M172 188 L148 375 L190 398 L232 375 L208 188 Z" fill={accentHex} />
        <path d="M172 188 L148 375 M232 375 L208 188" stroke={P.gold} strokeWidth="1.8" opacity="0.5" filter="url(#embroidery-glow)" />
        <path d="M190 188 V398" stroke={P.gold} strokeWidth="0.8" opacity="0.35" />
        {[218, 258, 298, 338].map((cy, i) => (
          <circle key={i} cx="190" cy={cy} r="1.8" fill={P.gold} opacity="0.7" />
        ))}
      </g>
      {activeAccessories.includes("Pocket Squares") && (
        <g className="accessory-item">
          <path d="M208 238 L224 232 L220 254 Z" fill={accent2} stroke={P.gold} strokeWidth="0.5" />
        </g>
      )}
      {activeAccessories.includes("Safa") && (
        <g className="accessory-item">
          <path d="M172 100 q22 -18 36 2 L204 118 q-14 4 -32 -18 z" fill={accent2} stroke={P.gold} strokeWidth="0.5" />
          <path d="M192 96 V62" stroke={P.gold} strokeWidth="1.5" />
          <circle cx="192" cy="62" r="2.5" fill="#fff" filter="url(#embroidery-glow)" />
        </g>
      )}
      <rect x="0" y="0" width="380" height="720" fill="url(#silk-sheen)" opacity="0.25" pointerEvents="none" />
    </svg>
  );
}

export function FemaleLookRenderer({ wardrobe, color, fabric, activeAccessories }: LookProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const fabricStyle = useFabricStyle(fabric);
  const baseHex = resolveColor(color, wardrobe.palette.accents[0]);
  const accentHex = wardrobe.palette.accents[0] ?? P.gold;
  const accent2 = wardrobe.palette.accents[1] ?? P.cream;

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".body-silhouette", { opacity: 0 }, { opacity: 0.3, duration: 1.4 });
    tl.fromTo(".skirt-layer", { opacity: 0, scaleY: 0.82, y: 80 }, { opacity: 1, scaleY: 1, y: 0, duration: 1.8, ease: "power2.out" }, "-=1.2");
    tl.fromTo(".bodice-layer", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 1.2 }, "-=1");
    tl.fromTo(".drape-layer", { opacity: 0, x: 40, rotate: 8 }, { opacity: 0.88, x: 0, rotate: 0, duration: 2, ease: "power2.inOut" }, "-=0.9");
    tl.fromTo(".accessory-item", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.3)" }, "-=0.8");
    const idle = gsap.to(el, { y: "-=14", duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    return () => idle.kill();
  }, [wardrobe.id, color, fabric]);

  return (
    <svg ref={containerRef} viewBox="0 0 380 720" className="w-full h-auto overflow-visible" style={{ filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.45))" }}>
      <CoutureDefs />
      <ellipse cx="190" cy="705" rx="88" ry="22" fill="black" opacity="0.18" />
      <g className="body-silhouette" style={{ opacity: 0.3 }}>
        <path d="M190 78 q-18 0 -26 24 L158 168 q-4 28 32 30 q36 2 32 -30 L218 102 q-8 -24 -60 -24 z" fill={P.cream} />
        <path d="M182 198 L172 300 q-6 180 18 510 q24 -330 18 -510 L198 198 Z" fill={P.cream} />
      </g>
      <g className="skirt-layer" style={fabricStyle}>
        <path d="M188 278 L118 698 q82 42 144 0 L192 278 Z" fill={baseHex} />
        <path d="M135 420 q55 28 110 0" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
        <path d="M122 560 q68 32 136 0" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
        <path d="M118 698 q74 42 144 0" fill="none" stroke={P.gold} strokeWidth="6" opacity="0.35" filter="url(#embroidery-glow)" />
      </g>
      <g className="bodice-layer" style={fabricStyle}>
        <path d="M176 178 q-18 0 -18 28 L172 278 L208 278 L208 206 q0 -28 -32 -28 z" fill={baseHex} />
        <path d="M176 178 q16 20 32 0" fill="none" stroke={P.gold} strokeWidth="2.5" opacity="0.6" />
      </g>
      <g className="drape-layer" style={{ ...fabricStyle, opacity: 0.88 }}>
        <path d="M162 182 q-52 130 -32 458 q-50 -180 -30 -458 z" fill={accent2} />
        <path d="M118 640 q72 36 144 0" fill="none" stroke={accent2} strokeWidth="48" opacity="0.22" />
      </g>
      {activeAccessories.includes("Chokers") && (
        <path className="accessory-item" d="M182 178 q8 18 16 0" fill="none" stroke={P.gold} strokeWidth="3.5" filter="url(#embroidery-glow)" />
      )}
      {activeAccessories.includes("Potli Bags") && (
        <g className="accessory-item">
          <path d="M258 448 q18 -8 12 22 L262 492 L278 492 L268 448 Z" fill={accentHex} stroke={P.gold} strokeWidth="0.5" />
          <path d="M268 448 V418" stroke={P.gold} strokeWidth="0.8" />
        </g>
      )}
      <rect x="0" y="0" width="380" height="720" fill="url(#silk-sheen)" opacity="0.22" pointerEvents="none" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────────────────── */
/*  Illustration mode: Refined luxury lookbook sketch (not geometric placeholder) */
/* ───────────────────────────────────────────────────────────────────────────── */

export function MaleLookIllustration({ wardrobe, color, fabric, activeAccessories }: LookProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const baseHex = resolveColor(color, wardrobe.palette.accents[0]);
  const accentHex = wardrobe.palette.accents[0] ?? P.gold;

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    const lines = el.querySelectorAll<SVGPathElement>(".sketch-line");
    lines.forEach((path, i) => {
      if (typeof path.getTotalLength === "function") {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        gsap.fromTo(path, { strokeDashoffset: len, opacity: 0.6 }, { strokeDashoffset: 0, opacity: 1, duration: 1.8, delay: i * 0.15, ease: "power2.inOut" });
      } else {
        gsap.fromTo(path, { opacity: 0.6 }, { opacity: 1, duration: 1.8, delay: i * 0.15 });
      }
    });
  }, [wardrobe.id]);

  return (
    <svg ref={containerRef} viewBox="0 0 380 720" className="w-full h-auto overflow-visible" style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" }}>
      <defs>
        <linearGradient id="sketch-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={baseHex} stopOpacity="0.25" />
          <stop offset="100%" stopColor={baseHex} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path className="sketch-line" d="M190 70 q-20 0 -30 26 L152 168 q-4 36 38 38 q42 2 38 -38 L220 96 q-10 -26 -48 -26 z" fill="none" stroke={P.cream} strokeWidth="1.2" strokeOpacity="0.5" />
      <path className="sketch-line" d="M170 206 L156 480 L178 698 L202 698 L224 480 L210 206 Z" fill="url(#sketch-wash)" stroke={P.cream} strokeWidth="0.8" strokeOpacity="0.4" />
      <path className="sketch-line" d="M174 196 L156 348 L170 618 L210 618 L224 348 L206 196 Z" fill={baseHex} fillOpacity="0.4" stroke={baseHex} strokeWidth="0.6" strokeOpacity="0.6" />
      <path className="sketch-line" d="M170 186 L146 372 L190 396 L234 372 L210 186 Z" fill="none" fillOpacity="0" stroke={accentHex} strokeWidth="1" strokeOpacity="0.7" />
      <path d="M190 186 V396" stroke={P.gold} strokeWidth="0.6" opacity="0.5" />
      {activeAccessories.includes("Safa") && (
        <path className="sketch-line" d="M170 98 q20 -16 40 4 L198 118" fill="none" stroke={P.gold} strokeWidth="0.8" />
      )}
    </svg>
  );
}

export function FemaleLookIllustration({ wardrobe, color, fabric, activeAccessories }: LookProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const baseHex = resolveColor(color, wardrobe.palette.accents[0]);
  const accent2 = wardrobe.palette.accents[1] ?? P.cream;

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    const lines = el.querySelectorAll<SVGPathElement>(".sketch-line");
    lines.forEach((path, i) => {
      if (typeof path.getTotalLength === "function") {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        gsap.fromTo(path, { strokeDashoffset: len, opacity: 0.5 }, { strokeDashoffset: 0, opacity: 1, duration: 1.6, delay: i * 0.12, ease: "power2.inOut" });
      } else {
        gsap.fromTo(path, { opacity: 0.5 }, { opacity: 1, duration: 1.6, delay: i * 0.12 });
      }
    });
  }, [wardrobe.id]);

  return (
    <svg ref={containerRef} viewBox="0 0 380 720" className="w-full h-auto overflow-visible" style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))" }}>
      <defs>
        <linearGradient id="sketch-wash-f" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={baseHex} stopOpacity="0.22" />
          <stop offset="100%" stopColor={baseHex} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <path className="sketch-line" d="M190 76 q-16 0 -24 22 L160 166 q-2 24 30 26 q32 2 30 -26 L214 98 q-8 -22 -54 -22 z" fill="none" stroke={P.cream} strokeWidth="1" strokeOpacity="0.45" />
      <path className="sketch-line" d="M180 196 L170 298 q-4 200 20 422 q24 -222 20 -422 L200 196 Z" fill="url(#sketch-wash-f)" stroke={P.cream} strokeWidth="0.7" strokeOpacity="0.35" />
      <path className="sketch-line" d="M186 276 L114 696 q76 40 136 0 L194 276 Z" fill={baseHex} fillOpacity="0.35" stroke={baseHex} strokeWidth="0.5" strokeOpacity="0.5" />
      <path className="sketch-line" d="M174 176 q-16 0 -16 26 L162 276 L208 276 L208 202 q0 -26 -34 -26 z" fill={baseHex} fillOpacity="0.3" stroke={baseHex} strokeWidth="0.5" />
      <path className="sketch-line" d="M160 180 q-48 120 -28 456" fill="none" stroke={accent2} strokeWidth="2" strokeOpacity="0.4" />
      {activeAccessories.includes("Chokers") && (
        <path className="sketch-line" d="M180 176 q10 16 20 0" fill="none" stroke={P.gold} strokeWidth="1" opacity="0.7" />
      )}
    </svg>
  );
}

export function AccessoryLayerRenderer(_props: { accessory: string }) {
  return null;
}
