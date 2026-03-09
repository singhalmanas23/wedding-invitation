"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChapterWardrobe, Look, W } from "./WardrobeConfig";

const P = {
  gold: "#d4af37",
  cream: "#f5efe6",
  shadow: "rgba(0,0,0,0.35)",
};

const COLOR_NAME_TO_HEX: Record<string, string> = {
  Mint: "#b4d3b2", Lavender: "#d4c8e6", "Powder Blue": "#b0c4de",
  Peach: "#f2c7c7", Rust: "#c95a3c", Teal: "#2a9d8f",
  Emerald: "#2d6a4f", Copper: "#b87333", "Deep Maroon": "#8b1a1a",
  "Antique Gold": "#d4af37", Ivory: "#f5efe6", Vermillion: "#c9422e",
  "Onyx Black": "#1c1c1c", "Midnight Navy": "#0c1445", "Dark Burgundy": "#5c0a1a",
  "Burnished Gold": "#c9a84c", "Deep Emerald": "#1a5e3a", "Antique Bronze": "#8b6914",
  "Blush Pink": "#e8b4b8", "Sage Green": "#a8c5a0", "Soft Peach": "#f5c6a0",
  "Champagne Ivory": "#f5efe6", "Midnight Black": "#0a0a0a",
};

function resolveColor(name: string, fallback: string): string {
  return COLOR_NAME_TO_HEX[name] ?? fallback ?? P.cream;
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  GARMENT SVG TEMPLATES                                              */
/*  Each garment is a set of SVG paths designed to overlay on a        */
/*  1024×1024 mannequin body. transform-origin is centered at torso.   */
/* ═══════════════════════════════════════════════════════════════════ */

interface GarmentTemplate {
  id: string;
  /** SVG path d-strings for each layer. Rendered bottom-to-top. */
  layers: {
    d: string;
    fill: "base" | "accent" | "accent2" | "gold";
    opacity?: number;
    strokeGold?: boolean;
  }[];
  /** Staggered animation entry style */
  animStyle: "dropDown" | "wrapAround" | "unfurl" | "slideUp";
}

const MALE_GARMENTS: Record<string, GarmentTemplate> = {
  sherwani: {
    id: "sherwani",
    layers: [
      // Full-length sherwani body
      { d: "M440 230 L400 460 L390 720 L420 920 L604 920 L634 720 L624 460 L584 230 Z", fill: "base", opacity: 0.92 },
      // Overlap panel (front placket)
      { d: "M510 230 L500 920 L524 920 L514 230 Z", fill: "accent", opacity: 0.5 },
      // Collar / neckline
      { d: "M460 220 Q512 200 564 220 L564 260 Q512 240 460 260 Z", fill: "accent", opacity: 0.85 },
      // Embroidery border at hem
      { d: "M420 880 Q512 920 604 880 L604 920 Q512 960 420 920 Z", fill: "gold", opacity: 0.4, strokeGold: true },
      // Button dots
      { d: "M512 300 m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M512 360 m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M512 420 m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M512 480 m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", fill: "gold", opacity: 0.7 },
    ],
    animStyle: "dropDown",
  },

  kurta: {
    id: "kurta",
    layers: [
      // Kurta body — loose A-line
      { d: "M435 240 L410 500 L405 740 L430 750 L512 760 L594 750 L619 740 L614 500 L589 240 Z", fill: "base", opacity: 0.88 },
      // Short front slit
      { d: "M512 590 L505 750 L519 750 Z", fill: "accent", opacity: 0.3 },
      // Collar band
      { d: "M470 230 Q512 215 554 230 L554 250 Q512 238 470 250 Z", fill: "base", opacity: 0.95 },
      // Side slits
      { d: "M410 640 L405 740 L430 750 Z", fill: "accent2", opacity: 0.15 },
      { d: "M614 640 L619 740 L594 750 Z", fill: "accent2", opacity: 0.15 },
    ],
    animStyle: "dropDown",
  },

  bandhgala: {
    id: "bandhgala",
    layers: [
      // Jacket body
      { d: "M438 235 L410 480 L415 640 L460 650 L512 655 L564 650 L609 640 L614 480 L586 235 Z", fill: "base", opacity: 0.93 },
      // Lapel lines
      { d: "M480 235 L460 400 M544 235 L564 400", fill: "gold", opacity: 0.35, strokeGold: true },
      // Stand collar
      { d: "M465 225 Q512 208 559 225 L559 248 Q512 235 465 248 Z", fill: "accent", opacity: 0.9 },
      // Pocket flap
      { d: "M445 440 L480 440 L480 450 L445 450 Z", fill: "accent2", opacity: 0.4 },
      // Buttons
      { d: "M512 290 m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M512 340 m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M512 390 m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0", fill: "gold", opacity: 0.8 },
      // Trousers
      { d: "M435 650 L430 920 L485 920 L512 660 L539 920 L594 920 L589 650 Z", fill: "accent", opacity: 0.8 },
    ],
    animStyle: "slideUp",
  },

  achkan: {
    id: "achkan",
    layers: [
      // Long achkan coat
      { d: "M435 230 L405 500 L395 800 L425 850 L512 860 L599 850 L629 800 L619 500 L589 230 Z", fill: "base", opacity: 0.9 },
      // Asymmetric overlap
      { d: "M512 230 L480 850 L512 860 L544 850 Z", fill: "accent", opacity: 0.25 },
      // Gold piping along edge
      { d: "M435 230 L405 500 L395 800 L425 850", fill: "gold", opacity: 0.35, strokeGold: true },
      // Collar
      { d: "M465 220 Q512 205 559 220 L559 248 Q512 232 465 248 Z", fill: "accent", opacity: 0.85 },
      // Embroidery crest at chest
      { d: "M490 280 Q512 265 534 280 Q534 310 512 320 Q490 310 490 280 Z", fill: "gold", opacity: 0.3, strokeGold: true },
    ],
    animStyle: "wrapAround",
  },
};

const FEMALE_GARMENTS: Record<string, GarmentTemplate> = {
  saree: {
    id: "saree",
    layers: [
      // Saree drape lower body
      { d: "M430 380 L360 920 Q512 960 664 920 L594 380 Z", fill: "base", opacity: 0.88 },
      // Pleats at waist
      { d: "M450 380 L440 550 M470 380 L460 555 M490 380 L480 560 M510 380 L500 560", fill: "accent", opacity: 0.2, strokeGold: false },
      // Pallu draping over shoulder
      { d: "M564 260 Q620 300 640 500 Q660 700 620 880 L590 860 Q610 680 600 480 Q580 290 540 260 Z", fill: "accent2", opacity: 0.7 },
      // Gold border on pallu
      { d: "M564 260 Q620 300 640 500 Q660 700 620 880", fill: "gold", opacity: 0.4, strokeGold: true },
      // Blouse
      { d: "M448 240 Q512 225 576 240 L576 310 Q560 340 512 345 Q464 340 448 310 Z", fill: "accent", opacity: 0.9 },
      // Border at hem
      { d: "M360 900 Q512 940 664 900 L664 920 Q512 960 360 920 Z", fill: "gold", opacity: 0.5, strokeGold: true },
    ],
    animStyle: "wrapAround",
  },

  lehenga: {
    id: "lehenga",
    layers: [
      // Flared skirt
      { d: "M460 380 L340 920 Q512 970 684 920 L564 380 Z", fill: "base", opacity: 0.9 },
      // Circular motion folds
      { d: "M380 600 Q440 580 500 600 Q560 620 620 600", fill: "base", opacity: 0.15 },
      { d: "M360 750 Q440 730 520 750 Q600 770 660 750", fill: "base", opacity: 0.1 },
      // Embroidery zone at hem
      { d: "M340 850 Q512 900 684 850 L684 920 Q512 970 340 920 Z", fill: "gold", opacity: 0.35, strokeGold: true },
      // Choli / blouse
      { d: "M455 240 Q512 220 569 240 L569 320 Q555 355 512 360 Q469 355 455 320 Z", fill: "accent", opacity: 0.92 },
      // Dupatta flowing
      { d: "M440 260 Q380 350 370 550 Q360 750 390 880 L410 870 Q380 730 385 540 Q395 340 460 265 Z", fill: "accent2", opacity: 0.55 },
      // Gold dupatta border
      { d: "M370 550 Q360 750 390 880", fill: "gold", opacity: 0.3, strokeGold: true },
    ],
    animStyle: "unfurl",
  },

  anarkali: {
    id: "anarkali",
    layers: [
      // Flowing anarkali body
      { d: "M460 300 L380 920 Q512 960 644 920 L564 300 Z", fill: "base", opacity: 0.88 },
      // Waist gather
      { d: "M460 370 Q512 360 564 370 L564 395 Q512 380 460 395 Z", fill: "accent", opacity: 0.4 },
      // Gold piping
      { d: "M460 300 L380 920 M564 300 L644 920", fill: "gold", opacity: 0.2, strokeGold: true },
      // Yoke / bodice
      { d: "M458 240 Q512 225 566 240 L566 310 Q550 335 512 340 Q474 335 458 310 Z", fill: "accent", opacity: 0.9 },
      // Dupatta
      { d: "M540 265 Q600 320 620 500 L600 490 Q585 310 535 265 Z", fill: "accent2", opacity: 0.5 },
      // Hem band
      { d: "M380 900 Q512 940 644 900 L644 920 Q512 960 380 920 Z", fill: "gold", opacity: 0.45, strokeGold: true },
    ],
    animStyle: "dropDown",
  },

  gown: {
    id: "gown",
    layers: [
      // Column gown body
      { d: "M450 260 L420 740 L410 920 Q512 940 614 920 L604 740 L574 260 Z", fill: "base", opacity: 0.9 },
      // Fitted waist
      { d: "M450 370 Q512 355 574 370 Q574 395 512 400 Q450 395 450 370 Z", fill: "accent", opacity: 0.3 },
      // Neckline detail
      { d: "M465 250 Q512 235 559 250 Q559 275 512 285 Q465 275 465 250 Z", fill: "accent", opacity: 0.6 },
      // Side drape
      { d: "M574 400 Q610 600 630 840 L614 920 L604 740 Q595 550 574 400 Z", fill: "accent2", opacity: 0.45 },
      // Gold detail
      { d: "M410 900 Q512 920 614 900 L614 920 Q512 940 410 920 Z", fill: "gold", opacity: 0.4, strokeGold: true },
    ],
    animStyle: "slideUp",
  },
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  GARMENT RENDER ENGINE                                              */
/*  Overlays animated SVG garment layers on the human mannequin        */
/* ═══════════════════════════════════════════════════════════════════ */

export interface GarmentEngineProps {
  wardrobe: ChapterWardrobe;
  audience: "men" | "women" | "all";
  color: string;
  fabric: string;
  activeAccessories: string[];
  userAvatar?: string | null;
  /** The currently selected Look from the chapter's men[] or women[] */
  selectedLook: Look | null;
}

/** Resolve garment template from look name */
function resolveGarmentTemplate(look: Look | null, gender: "men" | "women"): GarmentTemplate | null {
  if (!look) return null;
  const name = look.name.toLowerCase();

  if (gender === "men") {
    if (name.includes("sherwani")) return MALE_GARMENTS.sherwani;
    if (name.includes("kurta") || name.includes("linen")) return MALE_GARMENTS.kurta;
    if (name.includes("bandhgala") || name.includes("jacket") || name.includes("dinner")) return MALE_GARMENTS.bandhgala;
    if (name.includes("achkan")) return MALE_GARMENTS.achkan;
    // Default
    return MALE_GARMENTS.kurta;
  }

  // Female garments
  if (name.includes("saree") || name.includes("drape")) return FEMALE_GARMENTS.saree;
  if (name.includes("lehan") || name.includes("leheng")) return FEMALE_GARMENTS.lehenga;
  if (name.includes("anarkali")) return FEMALE_GARMENTS.anarkali;
  if (name.includes("gown")) return FEMALE_GARMENTS.gown;
  // Default
  return FEMALE_GARMENTS.saree;
}

function fillColor(token: "base" | "accent" | "accent2" | "gold", base: string, accent: string, accent2: string): string {
  if (token === "base") return base;
  if (token === "accent") return accent;
  if (token === "accent2") return accent2;
  return P.gold;
}

function GarmentDefs({ baseHex }: { baseHex: string }) {
  return (
    <defs>
      {/* Fabric sheen for garments */}
      <linearGradient id="garment-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
        <stop offset="40%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="0.15" />
      </linearGradient>

      {/* Embroidery shimmer */}
      <filter id="emb-glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.83 0 0 0 0 0.69 0 0 0 0 0.22 0 0 0 1 0" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Velvet texture */}
      <filter id="velvet-tex">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n" />
        <feDiffuseLighting in="n" lightingColor="#fff" surfaceScale="1.5" result="l">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feComposite in="SourceGraphic" in2="l" operator="arithmetic" k1="0" k2="0.85" k3="0.15" k4="0" />
      </filter>

      {/* Silk sheen */}
      <filter id="silk-tex">
        <feSpecularLighting surfaceScale="2" specularConstant="0.6" specularExponent="20" lightingColor="#fff" result="s">
          <fePointLight x="512" y="200" z="400" />
        </feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" result="sClip" />
        <feComposite in="SourceGraphic" in2="sClip" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0" />
      </filter>

      {/* Organza transparency */}
      <filter id="organza-tex">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
      </filter>

      {/* Face clip */}
      <clipPath id="face-clip">
        <ellipse cx="512" cy="120" rx="52" ry="68" />
      </clipPath>

      {/* Subtle radial glow behind garment layers */}
      <radialGradient id="stage-glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor={baseHex} stopOpacity="0.12" />
        <stop offset="100%" stopColor={baseHex} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function getFabricFilter(fabric: string): string {
  const f = fabric.toLowerCase();
  if (f.includes("velvet")) return "url(#velvet-tex)";
  if (f.includes("silk") || f.includes("satin") || f.includes("banarasi") || f.includes("brocade") || f.includes("kanjivaram")) return "url(#silk-tex)";
  if (f.includes("organza") || f.includes("chiffon")) return "url(#organza-tex)";
  return "none";
}

function getAnimProps(style: GarmentTemplate["animStyle"], layerIndex: number) {
  const delay = layerIndex * 0.12;
  switch (style) {
    case "dropDown":
      return { from: { opacity: 0, y: -80, scaleY: 0.5, transformOrigin: "center top" }, delay };
    case "wrapAround":
      return { from: { opacity: 0, x: 100, rotate: 15, transformOrigin: "left center" }, delay };
    case "unfurl":
      return { from: { opacity: 0, scaleX: 0.3, scaleY: 0.6, transformOrigin: "center bottom" }, delay };
    case "slideUp":
      return { from: { opacity: 0, y: 100, transformOrigin: "center bottom" }, delay };
    default:
      return { from: { opacity: 0 }, delay };
  }
}

export function GarmentEngine({ wardrobe, audience, color, fabric, activeAccessories, userAvatar, selectedLook }: GarmentEngineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const garmentGroupRef = useRef<SVGGElement>(null);
  const prevLookId = useRef<string | null>(null);

  const isMale = audience === "men" || audience === "all";
  const baseHex = resolveColor(color, wardrobe.palette.accents[0]);
  const accent = wardrobe.palette.accents[0] ?? P.gold;
  const accent2 = wardrobe.palette.accents[1] ?? P.cream;

  const garment = resolveGarmentTemplate(selectedLook, isMale ? "men" : "women");
  const mannequin = isMale ? W.coutureHim : W.coutureHer;
  const fabFilter = getFabricFilter(fabric);

  // Animate garment layers when look changes
  useEffect(() => {
    if (!garmentGroupRef.current || !garment) return;
    if (prevLookId.current === selectedLook?.id) return;
    prevLookId.current = selectedLook?.id ?? null;

    const layers = garmentGroupRef.current.querySelectorAll<SVGElement>(".garment-layer");

    // First, flash-out any existing layers
    gsap.to(layers, {
      opacity: 0, duration: 0.15, onComplete: () => {
        // Then animate new layers in
        layers.forEach((el, i) => {
          const anim = getAnimProps(garment.animStyle, i);
          gsap.fromTo(el,
            { ...anim.from },
            { opacity: parseFloat(el.dataset.targetOpacity ?? "1"), y: 0, x: 0, scaleX: 1, scaleY: 1, rotate: 0, duration: 0.9, delay: anim.delay, ease: "power3.out" }
          );
        });
      }
    });
  }, [selectedLook?.id, garment]);

  // Subtle idle breathing on entire SVG
  useGSAP(() => {
    if (!svgRef.current) return;
    const idle = gsap.to(svgRef.current, { y: "+=6", duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    return () => idle.kill();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 1024 1024" className="w-full h-auto overflow-visible drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
      <GarmentDefs baseHex={baseHex} />

      {/* Ambient glow behind model */}
      <rect width="1024" height="1024" fill="url(#stage-glow)" pointerEvents="none" />

      {/* Shadow on ground */}
      <ellipse cx="512" cy="970" rx="180" ry="30" fill="black" opacity="0.35" />

      {/* Human mannequin base */}
      <g className="mannequin-base">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <image href={mannequin} width="1024" height="1024" preserveAspectRatio="xMidYMid slice" />

        {/* User face overlay */}
        {userAvatar && (
          <g className="face-composite">
            <image href={userAvatar} x="460" y="52" width="104" height="136" clipPath="url(#face-clip)" preserveAspectRatio="xMidYMid slice" />
          </g>
        )}
      </g>

      {/* === ANIMATED GARMENT LAYERS === */}
      <g ref={garmentGroupRef} style={{ filter: fabFilter !== "none" ? fabFilter : undefined }}>
        {garment ? (
          garment.layers.map((layer, i) => {
            const f = fillColor(layer.fill, baseHex, accent, accent2);
            const op = layer.opacity ?? 1;
            return layer.strokeGold ? (
              <path
                key={`${garment.id}-${i}`}
                className="garment-layer"
                d={layer.d}
                fill="none"
                stroke={f}
                strokeWidth="3"
                opacity={0}
                data-target-opacity={String(op)}
                filter="url(#emb-glow)"
              />
            ) : (
              <path
                key={`${garment.id}-${i}`}
                className="garment-layer"
                d={layer.d}
                fill={f}
                opacity={0}
                data-target-opacity={String(op)}
              />
            );
          })
        ) : (
          /* No look selected — show subtle "select an outfit" placeholder */
          <g className="no-garment-hint">
            <rect x="412" y="260" width="200" height="40" rx="20" fill="white" opacity="0.05" />
            <text x="512" y="285" textAnchor="middle" fill={P.cream} opacity="0.25" fontSize="12" fontFamily="sans-serif">
              Select an outfit →
            </text>
          </g>
        )}
      </g>

      {/* Luxury sheen overlay */}
      <rect width="1024" height="1024" fill="url(#garment-sheen)" opacity="0.2" pointerEvents="none" />

      {/* Accessory overlays */}
      {isMale && activeAccessories.includes("Safa") && (
        <g className="acc-safa">
          <path d="M475 85 Q512 60 549 85 Q560 100 555 120 Q512 105 469 120 Q464 100 475 85 Z" fill={accent} opacity="0.85" />
          <path d="M512 70 V52" stroke={P.gold} strokeWidth="2" />
          <circle cx="512" cy="50" r="4" fill="white" opacity="0.8" filter="url(#emb-glow)" />
        </g>
      )}
      {activeAccessories.includes("Pocket Squares") && (
        <path d="M575 345 L590 340 L588 365 Z" fill={accent2} stroke={P.gold} strokeWidth="0.5" opacity="0.75" />
      )}
      {activeAccessories.includes("Chokers") && (
        <path d="M480 208 Q512 225 544 208" fill="none" stroke={P.gold} strokeWidth="3" opacity="0.7" filter="url(#emb-glow)" />
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  GARMENT PICKER — Card carousel for selecting outfits               */
/* ═══════════════════════════════════════════════════════════════════ */

export function GarmentPicker({
  looks,
  selectedLookId,
  onSelect,
  accentColor,
}: {
  looks: Look[];
  selectedLookId: string | null;
  onSelect: (look: Look) => void;
  accentColor: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <span className="text-[9px] uppercase tracking-[0.3em] font-body" style={{ color: `${P.cream}60` }}>
          Try Different Outfits
        </span>
      </div>

      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-2 px-2">
        {looks.map((look) => {
          const isActive = selectedLookId === look.id;
          return (
            <button
              key={look.id}
              onClick={() => onSelect(look)}
              className="snap-start shrink-0 group relative text-left transition-all duration-500"
              style={{ width: "140px" }}
            >
              <div
                className="relative rounded-xl p-3 pb-4 transition-all duration-500 overflow-hidden"
                style={{
                  backgroundColor: isActive ? `${accentColor}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? `${accentColor}50` : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 20px ${accentColor}15, inset 0 1px 0 rgba(255,255,255,0.04)` : "none",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Garment icon placeholder */}
                <div className="w-full aspect-[3/4] rounded-lg mb-3 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: isActive ? `${accentColor}12` : "rgba(255,255,255,0.02)" }}
                >
                  <svg className="w-8 h-8 transition-transform duration-500" style={{ color: isActive ? accentColor : `${P.cream}25`, transform: isActive ? "scale(1.1)" : "scale(1)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                  </svg>
                </div>

                {/* Tags */}
                <div className="flex gap-1 mb-2 flex-wrap">
                  {look.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive ? `${accentColor}20` : "rgba(255,255,255,0.04)",
                        color: isActive ? accentColor : `${P.cream}40`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h4
                  className="text-[11px] font-serif leading-tight transition-colors duration-300"
                  style={{ color: isActive ? P.cream : `${P.cream}70` }}
                >
                  {look.name}
                </h4>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  LEGACY EXPORTS (kept for backward compat with ShowcaseStage)       */
/* ═══════════════════════════════════════════════════════════════════ */

export function MaleLookRenderer(props: GarmentEngineProps) {
  return <GarmentEngine {...props} />;
}
export function FemaleLookRenderer(props: GarmentEngineProps) {
  return <GarmentEngine {...props} />;
}
export function MaleLookIllustration(props: GarmentEngineProps) {
  return <GarmentEngine {...props} />;
}
export function FemaleLookIllustration(props: GarmentEngineProps) {
  return <GarmentEngine {...props} />;
}
export function AccessoryLayerRenderer(_props: { accessory: string }) {
  return null;
}
