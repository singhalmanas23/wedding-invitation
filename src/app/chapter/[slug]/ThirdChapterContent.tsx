"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS, COUPLE } from "@/content/events";
import { WeddingEvent } from "@/types";
import Navbar from "@/components/layout/Navbar";
import FadeInView from "@/components/motion/FadeInView";

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  event: WeddingEvent;
}

/* ═══════════════════════════════════════════════════════════════════
   SVG SET — Mehndi Darbar · मेहंदी दरबार
   Emerald + gold palette. All paths clean for stroke animation.
   (1) Mehndi mandala  (2) Henna hand  (3) Paisley divider
   (4) Jharokha arch   (5) Jaali lattice  (6) Silk drape mask
   (7) Diya strip       (8) Wax seal badge
   ═══════════════════════════════════════════════════════════════════ */

function MehndiMandala({ accent }: { accent: string }) {
  const petals = 12;
  return (
    <svg viewBox="-150 -150 300 300" className="mandala-svg w-[260px] md:w-[340px] mx-auto" fill="none">
      {/* Outer ring — repeating lotus petals */}
      {Array.from({ length: petals }, (_, i) => {
        const a = (i * 360) / petals;
        return (
          <path
            key={`op-${i}`}
            className="mandala-stroke"
            d={`M0 -120 Q-12 -100 0 -85 Q12 -100 0 -120Z`}
            stroke={accent}
            strokeWidth="0.7"
            transform={`rotate(${a})`}
            opacity="0.7"
          />
        );
      })}
      {/* Outer ring circle */}
      <circle className="mandala-stroke" cx="0" cy="0" r="125" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <circle className="mandala-stroke" cx="0" cy="0" r="115" stroke={accent} strokeWidth="0.3" opacity="0.25" strokeDasharray="3 5" />

      {/* Middle ring — paisley fan */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 360) / 8 + 22.5;
        return (
          <path
            key={`mp-${i}`}
            className="mandala-stroke"
            d="M0 -80 Q-15 -65 -8 -50 Q0 -42 8 -50 Q15 -65 0 -80Z"
            stroke={accent}
            strokeWidth="0.6"
            transform={`rotate(${a})`}
            opacity="0.6"
          />
        );
      })}
      <circle className="mandala-stroke" cx="0" cy="0" r="82" stroke={accent} strokeWidth="0.4" opacity="0.35" />

      {/* Inner ring — dots + small petals */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 360) / 16;
        const r = 55;
        const x = Math.cos((a * Math.PI) / 180) * r;
        const y = Math.sin((a * Math.PI) / 180) * r;
        return <circle key={`id-${i}`} className="mandala-stroke" cx={x} cy={y} r="2" stroke={accent} strokeWidth="0.4" opacity="0.5" />;
      })}
      <circle className="mandala-stroke" cx="0" cy="0" r="50" stroke={accent} strokeWidth="0.5" opacity="0.4" />

      {/* Core flower */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 360) / 6;
        return (
          <path
            key={`cf-${i}`}
            className="mandala-stroke"
            d="M0 -30 Q-8 -20 0 -12 Q8 -20 0 -30Z"
            stroke={accent}
            strokeWidth="0.6"
            transform={`rotate(${a})`}
            opacity="0.7"
          />
        );
      })}
      <circle className="mandala-stroke" cx="0" cy="0" r="8" stroke={accent} strokeWidth="0.6" opacity="0.6" />
      <circle className="mandala-stroke" cx="0" cy="0" r="3" fill={`${accent}30`} stroke={accent} strokeWidth="0.4" />

      {/* Ink bloom mask — fills on animation */}
      <circle className="mandala-bloom" cx="0" cy="0" r="125" fill={`${accent}00`} />
    </svg>
  );
}

function HennaHand({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 300 520" className="henna-hand w-[160px] md:w-[200px] mx-auto" fill="none">
      {/* ── Hand silhouette — graceful open palm ── */}
      <path
        className="hand-outline"
        d="M108 518 L98 440 Q94 410 96 380 L98 350 Q94 328 88 312
           Q74 298 62 278 Q54 260 56 244 Q60 232 68 235 Q76 240 80 252 L92 282
           Q88 256 84 228 Q78 196 76 170 Q74 148 78 134 Q84 126 92 130 Q96 138 98 158 L102 206
           Q100 174 98 140 Q96 110 98 88 Q102 70 110 68 Q118 68 120 82 L124 126
           Q124 96 126 68 Q130 44 138 38 Q146 34 150 40 Q156 50 156 72 L152 126
           Q158 96 166 76 Q172 62 180 60 Q188 62 190 76 L182 126 Q180 148 174 168
           Q192 138 200 118 Q208 100 216 102 Q222 108 218 126 L200 178
           Q188 208 178 228 Q192 240 204 264 Q214 290 212 320 L208 358
           Q206 390 204 420 L200 448 L198 518Z"
        stroke={accent}
        strokeWidth="1.1"
        opacity="0.7"
      />

      {/* ── Filled fingertips (classic bridal mehndi) ── */}
      <path className="hand-finger" d="M76 170 Q74 148 78 134 Q84 126 92 130 Q96 138 98 158 Q92 168 84 172Z" fill={`${accent}18`} stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M98 88 Q102 70 110 68 Q118 68 120 82 L124 126 Q116 124 108 128 Q102 118 98 100Z" fill={`${accent}18`} stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M126 68 Q130 44 138 38 Q146 34 150 40 Q156 50 156 72 L152 126 Q148 118 140 116 Q134 108 130 88Z" fill={`${accent}18`} stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M166 76 Q172 62 180 60 Q188 62 190 76 L182 126 Q176 120 170 118 Q166 108 166 88Z" fill={`${accent}18`} stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M200 118 Q208 100 216 102 Q222 108 218 126 L210 156 Q202 144 198 130Z" fill={`${accent}15`} stroke={accent} strokeWidth="0.5" opacity="0.45" />

      {/* ── Index finger — vine + bands ── */}
      <path className="hand-finger" d="M82 210 Q88 208 96 210" stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M80 198 Q88 195 96 198" stroke={accent} strokeWidth="0.45" opacity="0.45" />
      <path className="hand-finger" d="M80 186 Q88 183 95 186" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <path className="hand-finger" d="M88 206 L88 170" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      {[176, 182, 188, 194, 200].map((y) => (
        <g key={`il${y}`}>
          <path className="hand-finger" d={`M84 ${y} Q82 ${y - 3} 84 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
          <path className="hand-finger" d={`M92 ${y} Q94 ${y - 3} 92 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
        </g>
      ))}
      <circle className="hand-finger" cx="88" cy="162" r="3.5" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <circle className="hand-finger" cx="88" cy="162" r="1.5" fill={`${accent}15`} />
      <circle className="hand-finger" cx="88" cy="150" r="2" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      {[148, 154, 160, 166].map((y) => (
        <circle key={`id${y}`} className="hand-palm-dot" cx="88" cy={y} r="0.8" fill={accent} opacity="0.2" />
      ))}

      {/* ── Middle finger — dense pattern ── */}
      <path className="hand-finger" d="M108 168 Q116 165 124 168" stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M106 156 Q115 153 122 156" stroke={accent} strokeWidth="0.45" opacity="0.45" />
      <path className="hand-finger" d="M108 144 Q115 141 122 144" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <path className="hand-finger" d="M115 164 L115 130" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      {[134, 140, 146, 152, 158].map((y) => (
        <g key={`ml${y}`}>
          <path className="hand-finger" d={`M111 ${y} Q109 ${y - 3} 111 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
          <path className="hand-finger" d={`M119 ${y} Q121 ${y - 3} 119 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
        </g>
      ))}
      <path className="hand-finger" d="M110 130 Q115 124 120 130 Q115 136 110 130Z" stroke={accent} strokeWidth="0.35" opacity="0.35" />
      <circle className="hand-finger" cx="115" cy="120" r="2.5" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      <circle className="hand-finger" cx="115" cy="110" r="1.5" fill={`${accent}15`} />
      {[108, 114, 120, 126].map((y) => (
        <circle key={`md${y}`} className="hand-palm-dot" cx="115" cy={y} r="0.7" fill={accent} opacity="0.2" />
      ))}

      {/* ── Ring finger — bands + paisley ── */}
      <path className="hand-finger" d="M140 168 Q148 165 156 168" stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <path className="hand-finger" d="M140 156 Q148 153 156 156" stroke={accent} strokeWidth="0.45" opacity="0.45" />
      <path className="hand-finger" d="M142 144 Q148 141 154 144" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <path className="hand-finger" d="M148 164 L148 130" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      {[134, 140, 146, 152, 158].map((y) => (
        <g key={`rl${y}`}>
          <path className="hand-finger" d={`M144 ${y} Q142 ${y - 3} 144 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
          <path className="hand-finger" d={`M152 ${y} Q154 ${y - 3} 152 ${y - 6}`} stroke={accent} strokeWidth="0.25" opacity="0.25" />
        </g>
      ))}
      <path className="hand-finger" d="M144 128 Q148 118 152 128 Q148 132 144 128Z" stroke={accent} strokeWidth="0.35" opacity="0.35" fill={`${accent}08`} />
      <circle className="hand-finger" cx="148" cy="116" r="2" stroke={accent} strokeWidth="0.3" opacity="0.3" />
      {[112, 118, 124].map((y) => (
        <circle key={`rd${y}`} className="hand-palm-dot" cx="148" cy={y} r="0.7" fill={accent} opacity="0.2" />
      ))}

      {/* ── Little finger — simple bands ── */}
      <path className="hand-finger" d="M174 178 Q180 175 186 178" stroke={accent} strokeWidth="0.45" opacity="0.45" />
      <path className="hand-finger" d="M174 168 Q180 165 186 168" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <path className="hand-finger" d="M176 158 Q180 155 184 158" stroke={accent} strokeWidth="0.35" opacity="0.35" />
      <circle className="hand-finger" cx="180" cy="148" r="2.5" stroke={accent} strokeWidth="0.3" opacity="0.35" />
      <circle className="hand-finger" cx="180" cy="140" r="1.5" fill={`${accent}12`} />

      {/* ── Thumb — bands ── */}
      <path className="hand-finger" d="M66 270 Q74 266 82 270" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <path className="hand-finger" d="M64 260 Q72 256 80 260" stroke={accent} strokeWidth="0.35" opacity="0.35" />
      <circle className="hand-finger" cx="72" cy="250" r="2.5" stroke={accent} strokeWidth="0.3" opacity="0.3" />

      {/* ═══ PALM — Large central mandala/flower ═══ */}
      {/* Outer petal ring */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36) * (Math.PI / 180);
        const cx = 148 + Math.cos(a) * 52;
        const cy = 300 + Math.sin(a) * 52;
        const a2 = a + Math.PI / 2;
        return (
          <path key={`op${i}`} className="hand-palm"
            d={`M${cx + Math.cos(a2) * 6} ${cy + Math.sin(a2) * 6} Q${cx + Math.cos(a) * 14} ${cy + Math.sin(a) * 14} ${cx - Math.cos(a2) * 6} ${cy - Math.sin(a2) * 6} Q${cx - Math.cos(a) * 4} ${cy - Math.sin(a) * 4} ${cx + Math.cos(a2) * 6} ${cy + Math.sin(a2) * 6}Z`}
            stroke={accent} strokeWidth="0.5" opacity="0.45" fill={`${accent}06`} />
        );
      })}
      {/* Outer circle */}
      <circle className="hand-palm" cx="148" cy="300" r="56" stroke={accent} strokeWidth="0.5" opacity="0.35" />
      <circle className="hand-palm" cx="148" cy="300" r="60" stroke={accent} strokeWidth="0.3" opacity="0.2" strokeDasharray="2 4" />

      {/* Middle petal ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = ((i * 45) + 22.5) * (Math.PI / 180);
        const cx = 148 + Math.cos(a) * 36;
        const cy = 300 + Math.sin(a) * 36;
        return (
          <path key={`mp${i}`} className="hand-palm"
            d={`M${cx} ${cy - 8} Q${cx - 5} ${cy} ${cx} ${cy + 8} Q${cx + 5} ${cy} ${cx} ${cy - 8}Z`}
            stroke={accent} strokeWidth="0.4" opacity="0.4" fill={`${accent}05`}
            transform={`rotate(${i * 45 + 22.5} ${cx} ${cy})`} />
        );
      })}
      <circle className="hand-palm" cx="148" cy="300" r="40" stroke={accent} strokeWidth="0.4" opacity="0.3" />

      {/* Inner petal ring */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60) * (Math.PI / 180);
        const cx = 148 + Math.cos(a) * 22;
        const cy = 300 + Math.sin(a) * 22;
        return (
          <path key={`ip${i}`} className="hand-palm"
            d={`M${cx} ${cy - 5} Q${cx - 4} ${cy} ${cx} ${cy + 5} Q${cx + 4} ${cy} ${cx} ${cy - 5}Z`}
            stroke={accent} strokeWidth="0.4" opacity="0.45"
            transform={`rotate(${i * 60} ${cx} ${cy})`} />
        );
      })}
      <circle className="hand-palm" cx="148" cy="300" r="26" stroke={accent} strokeWidth="0.35" opacity="0.3" />

      {/* Core circle + dot */}
      <circle className="hand-palm" cx="148" cy="300" r="14" stroke={accent} strokeWidth="0.5" opacity="0.5" fill={`${accent}08`} />
      <circle className="hand-palm" cx="148" cy="300" r="8" stroke={accent} strokeWidth="0.4" opacity="0.4" />
      <circle className="hand-palm" cx="148" cy="300" r="4" fill={`${accent}20`} />

      {/* Dots between petals */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = ((i * 36) + 18) * (Math.PI / 180);
        return (
          <circle key={`bd${i}`} className="hand-palm-dot" cx={148 + Math.cos(a) * 48} cy={300 + Math.sin(a) * 48} r="1.5" fill={accent} opacity="0.25" />
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45) * (Math.PI / 180);
        return (
          <circle key={`bd2${i}`} className="hand-palm-dot" cx={148 + Math.cos(a) * 33} cy={300 + Math.sin(a) * 33} r="1.2" fill={accent} opacity="0.2" />
        );
      })}

      {/* ═══ Upper paisley pair (above mandala) ═══ */}
      <path className="hand-palm"
        d="M120 240 Q108 230 110 214 Q112 200 120 194 Q128 190 134 196 Q138 204 136 218 Q134 230 126 238Z"
        stroke={accent} strokeWidth="0.55" opacity="0.5" />
      <path className="hand-palm"
        d="M124 232 Q116 224 118 214 Q120 206 126 202 Q130 200 133 204 Q135 210 133 220 Q130 228 126 232Z"
        stroke={accent} strokeWidth="0.3" opacity="0.3" />
      <circle className="hand-palm" cx="126" cy="216" r="3" stroke={accent} strokeWidth="0.3" opacity="0.35" />
      <circle className="hand-palm" cx="126" cy="216" r="1.2" fill={`${accent}18`} />
      <path className="hand-palm" d="M136 196 Q140 188 144 192" stroke={accent} strokeWidth="0.3" opacity="0.3" />

      <path className="hand-palm"
        d="M176 240 Q188 230 186 214 Q184 200 176 194 Q168 190 162 196 Q158 204 160 218 Q162 230 170 238Z"
        stroke={accent} strokeWidth="0.55" opacity="0.5" />
      <path className="hand-palm"
        d="M172 232 Q180 224 178 214 Q176 206 170 202 Q166 200 163 204 Q161 210 163 220 Q166 228 170 232Z"
        stroke={accent} strokeWidth="0.3" opacity="0.3" />
      <circle className="hand-palm" cx="170" cy="216" r="3" stroke={accent} strokeWidth="0.3" opacity="0.35" />
      <circle className="hand-palm" cx="170" cy="216" r="1.2" fill={`${accent}18`} />
      <path className="hand-palm" d="M160 196 Q156 188 152 192" stroke={accent} strokeWidth="0.3" opacity="0.3" />

      {/* ═══ Side paisley motifs (flanking mandala) ═══ */}
      <path className="hand-palm"
        d="M100 310 Q88 300 90 286 Q94 276 104 280 Q108 286 106 298Z"
        stroke={accent} strokeWidth="0.45" opacity="0.4" />
      <circle className="hand-palm-dot" cx="100" cy="292" r="1.5" fill={accent} opacity="0.2" />

      <path className="hand-palm"
        d="M196 310 Q208 300 206 286 Q202 276 192 280 Q188 286 190 298Z"
        stroke={accent} strokeWidth="0.45" opacity="0.4" />
      <circle className="hand-palm-dot" cx="196" cy="292" r="1.5" fill={accent} opacity="0.2" />

      {/* ═══ Vine trails — palm to wrist ═══ */}
      <path className="hand-palm" d="M148 356 C140 368 156 380 148 392" stroke={accent} strokeWidth="0.4" opacity="0.35" />
      <path className="hand-palm" d="M148 392 C140 404 156 416 148 428" stroke={accent} strokeWidth="0.35" opacity="0.3" />
      {[362, 374, 386, 398, 410, 422].map((y, i) => (
        <g key={`vl${y}`}>
          <path className="hand-palm-dot" d={`M${148 + (i % 2 === 0 ? -1 : 1) * 8} ${y} Q${148 + (i % 2 === 0 ? -1 : 1) * 14} ${y - 4} ${148 + (i % 2 === 0 ? -1 : 1) * 10} ${y - 8}`} stroke={accent} strokeWidth="0.25" opacity="0.25" fill="none" />
          <circle className="hand-palm-dot" cx={148 + (i % 2 === 0 ? -1 : 1) * 14} cy={y - 4} r="0.8" fill={accent} opacity="0.18" />
        </g>
      ))}

      {/* Side vine — left */}
      <path className="hand-palm" d="M110 356 C104 368 114 378 108 390" stroke={accent} strokeWidth="0.35" opacity="0.3" />
      {[360, 370, 380].map((y, i) => (
        <path key={`svl${y}`} className="hand-palm-dot" d={`M${108 - 4} ${y} Q${108 - 8} ${y - 3} ${108 - 5} ${y - 6}`} stroke={accent} strokeWidth="0.2" opacity="0.2" />
      ))}
      {/* Side vine — right */}
      <path className="hand-palm" d="M186 356 C192 368 182 378 188 390" stroke={accent} strokeWidth="0.35" opacity="0.3" />
      {[360, 370, 380].map((y, i) => (
        <path key={`svr${y}`} className="hand-palm-dot" d={`M${188 + 4} ${y} Q${188 + 8} ${y - 3} ${188 + 5} ${y - 6}`} stroke={accent} strokeWidth="0.2" opacity="0.2" />
      ))}

      {/* ═══ Ornate wrist cuff — 5 decorative bands ═══ */}
      <path className="hand-wrist" d="M98 430 Q148 420 198 430" stroke={accent} strokeWidth="0.7" opacity="0.55" />
      <path className="hand-wrist" d="M98 438 Q148 428 198 438" stroke={accent} strokeWidth="0.6" opacity="0.5" />
      <path className="hand-wrist" d="M98 446 Q148 436 198 446" stroke={accent} strokeWidth="0.5" opacity="0.45" />
      <path className="hand-wrist" d="M98 454 Q148 444 198 454" stroke={accent} strokeWidth="0.45" opacity="0.4" />
      <path className="hand-wrist" d="M98 462 Q148 452 198 462" stroke={accent} strokeWidth="0.4" opacity="0.35" />

      {/* Wrist — scallop chain */}
      {[108, 120, 132, 144, 156, 168, 180].map((x) => (
        <path key={`wc${x}`} className="hand-wrist" d={`M${x} 438 Q${x - 4} 432 ${x} 426 Q${x + 4} 432 ${x} 438Z`} stroke={accent} strokeWidth="0.3" opacity="0.3" />
      ))}
      {/* Wrist — hanging drops */}
      {[114, 132, 148, 164, 182].map((x) => (
        <g key={`wd${x}`}>
          <path className="hand-wrist" d={`M${x} 462 L${x} 472`} stroke={accent} strokeWidth="0.3" opacity="0.3" />
          <path className="hand-wrist" d={`M${x - 3} 472 Q${x} 480 ${x + 3} 472`} stroke={accent} strokeWidth="0.3" opacity="0.25" fill={`${accent}08`} />
          <circle className="hand-palm-dot" cx={x} cy={475} r="0.8" fill={accent} opacity="0.2" />
        </g>
      ))}
      {/* Wrist — diamond fill pattern */}
      {[108, 118, 128, 138, 148, 158, 168, 178, 188].map((x) => (
        <path key={`wdm${x}`} className="hand-wrist" d={`M${x} 446 L${x + 4} 450 L${x} 454 L${x - 4} 450Z`} stroke={accent} strokeWidth="0.2" opacity="0.2" fill={`${accent}05`} />
      ))}

      {/* ═══ Dense dot clusters (classic mehndi filler) ═══ */}
      {[
        [104, 250], [108, 258], [100, 264], [96, 254],
        [192, 250], [196, 258], [200, 264], [188, 254],
        [116, 350], [124, 354], [120, 362], [128, 346],
        [172, 350], [180, 354], [176, 362], [168, 346],
        [140, 244], [156, 244], [148, 248],
        [118, 280], [178, 280],
        [100, 330], [196, 330],
        [132, 370], [164, 370],
        [148, 240],
      ].map(([cx, cy], i) => (
        <circle key={`d${i}`} className="hand-palm-dot" cx={cx} cy={cy} r="1" fill={accent} opacity="0.2" />
      ))}

      {/* ═══ Floral bloom accents — animate last ═══ */}
      {[
        [148, 240], [116, 270], [180, 270], [104, 320], [192, 320],
        [120, 340], [176, 340], [148, 360], [130, 390], [166, 390],
        [148, 410], [112, 308], [184, 308],
      ].map(([cx, cy], i) => (
        <g key={`b${i}`} className="hand-bloom" opacity="0">
          <circle cx={cx} cy={cy} r="5" stroke={accent} strokeWidth="0.3" fill={`${accent}06`} />
          {Array.from({ length: 5 }, (_, j) => {
            const ba = (j * 72) * (Math.PI / 180);
            return (
              <circle key={j} cx={cx + Math.cos(ba) * 6.5} cy={cy + Math.sin(ba) * 6.5} r="1.2" fill={accent} opacity="0.25" />
            );
          })}
        </g>
      ))}

      {/* ═══ Connecting arcs between fingers (web area) ═══ */}
      <path className="hand-palm" d="M98 220 Q106 230 114 224" stroke={accent} strokeWidth="0.3" opacity="0.25" strokeDasharray="2 3" />
      <path className="hand-palm" d="M124 196 Q132 206 140 198" stroke={accent} strokeWidth="0.3" opacity="0.25" strokeDasharray="2 3" />
      <path className="hand-palm" d="M156 198 Q164 208 172 200" stroke={accent} strokeWidth="0.3" opacity="0.25" strokeDasharray="2 3" />

      {/* ═══ Extra detail — small teardrop chain on sides ═══ */}
      {[270, 290, 310, 330].map((y) => (
        <g key={`lt${y}`}>
          <path className="hand-palm-dot" d={`M94 ${y} Q90 ${y - 4} 94 ${y - 8} Q98 ${y - 4} 94 ${y}Z`} stroke={accent} strokeWidth="0.2" opacity="0.2" />
          <path className="hand-palm-dot" d={`M202 ${y} Q206 ${y - 4} 202 ${y - 8} Q198 ${y - 4} 202 ${y}Z`} stroke={accent} strokeWidth="0.2" opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

function PaisleyDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 240 24" className="w-36 md:w-44 h-auto mx-auto" fill="none">
      <line x1="0" y1="12" x2="80" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <line x1="160" y1="12" x2="240" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path d="M110 12 Q105 4 112 2 Q118 0 122 6 Q126 12 122 18 Q118 24 112 22 Q105 20 110 12Z" stroke={accent} strokeWidth="0.5" opacity="0.4" fill={`${accent}08`} />
      <circle cx="115" cy="12" r="1.5" fill={accent} opacity="0.25" />
      <path d="M90 10 Q95 12 90 14" stroke={accent} strokeWidth="0.3" opacity="0.25" fill="none" />
      <path d="M150 10 Q145 12 150 14" stroke={accent} strokeWidth="0.3" opacity="0.25" fill="none" />
    </svg>
  );
}

function DarbarArch({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 440 520" className="darbar-arch w-[280px] md:w-[380px] mx-auto" fill="none">
      <path className="arch-s" d="M35 520 L35 185 Q35 110 100 70 Q160 35 220 25 Q280 35 340 70 Q405 110 405 185 L405 520" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
      <path className="arch-s" d="M55 510 L55 195 Q55 130 115 95 Q170 62 220 52 Q270 62 325 95 Q385 130 385 195 L385 510" stroke={accent} strokeWidth="0.6" opacity="0.4" />
      <path className="arch-s" d="M155 75 Q185 42 220 32 Q255 42 285 75" stroke={accent} strokeWidth="0.45" opacity="0.3" />
      <circle className="arch-s" cx="220" cy="20" r="5" stroke={accent} strokeWidth="0.6" />
      <path className="arch-s" d="M216 25 L220 8 L224 25" stroke={accent} strokeWidth="0.7" />
      <path className="arch-s" d="M25 515 Q18 515 18 508 L18 492" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path className="arch-s" d="M415 515 Q422 515 422 508 L422 492" stroke={accent} strokeWidth="0.4" opacity="0.3" />
    </svg>
  );
}

function SilkDrapeMask({ accent, side }: { accent: string; side: "left" | "right" }) {
  const isL = side === "left";
  return (
    <div
      className={`silk-drape-${side} absolute top-0 ${isL ? "left-0" : "right-0"} h-full w-1/2`}
      style={{
        background: `linear-gradient(${isL ? "to right" : "to left"},${accent}14,${accent}06)`,
      }}
    />
  );
}

function DiyaRow({ accent }: { accent: string }) {
  const xs = [-360, -270, -180, -90, 0, 90, 180, 270, 360];
  return (
    <svg viewBox="-400 -8 800 55" className="diya-row w-full max-w-4xl h-10 mx-auto" fill="none">
      <defs>
        <filter id="dg3">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {xs.map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M-8 28 Q-6 36 0 38 Q6 36 8 28Z" fill={`${accent}30`} stroke={accent} strokeWidth="0.3" />
          <path className="diya-f" d="M0 20 Q-3 12 -1 5 Q0 0 0 -2 Q0 0 1 5 Q3 12 0 20Z" fill={accent} opacity="0" style={{ transformOrigin: "0px 20px" }} />
          <circle className="diya-f" cx="0" cy="8" r="5" fill={accent} opacity="0" filter="url(#dg3)" />
        </g>
      ))}
    </svg>
  );
}

function JaaliShadow({ accent }: { accent: string }) {
  return (
    <svg className="jaali-shadow absolute inset-0 w-full h-full opacity-0" preserveAspectRatio="none" viewBox="0 0 400 400">
      <defs>
        <pattern id="jaali3" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 0 Q35 10 50 10 Q40 20 50 25 Q40 30 50 40 Q35 40 25 50 Q15 40 0 40 Q10 30 0 25 Q10 20 0 10 Q15 10 25 0Z" stroke={accent} strokeWidth="0.25" fill="none" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#jaali3)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MEHNDI DARBAR INTRO
   introTl: drape part → arch draw → mandala draw/ink-bloom →
   title stamp with shimmer → diya ignition
   ═══════════════════════════════════════════════════════════════════ */

function MehndiDarbarIntro({
  event,
  onComplete,
}: {
  event: WeddingEvent;
  onComplete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { palette } = event;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const archPaths = el.querySelectorAll<SVGGeometryElement>(".arch-s");
      archPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const mandalaStrokes = el.querySelectorAll<SVGGeometryElement>(".mandala-stroke");
      mandalaStrokes.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.5, delay: 0.2, onComplete });
        },
      });

      introTl.to(el.querySelector(".silk-drape-left"), { x: "-100%", duration: 1.2, ease: "power3.inOut" }, 0);
      introTl.to(el.querySelector(".silk-drape-right"), { x: "100%", duration: 1.2, ease: "power3.inOut" }, 0);

      introTl.to(archPaths, { strokeDashoffset: 0, duration: 1.5, stagger: 0.06, ease: "power2.inOut" }, 0.3);

      introTl.to(mandalaStrokes, { strokeDashoffset: 0, duration: 2, stagger: 0.02, ease: "power1.inOut" }, 0.6);

      introTl.to(el.querySelector(".mandala-bloom"), { fill: `${palette.accent}0a`, duration: 1.2, ease: "power2.out" }, 2.0);

      introTl.fromTo(
        el.querySelectorAll(".it-c"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power3.out" },
        1.8
      );

      introTl.fromTo(
        el.querySelectorAll(".is-c"),
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.015, ease: "power3.out" },
        2.4
      );

      const flames = el.querySelectorAll(".diya-f");
      introTl.to(flames, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.08, ease: "back.out(2)" }, 2.8);

      introTl.add(() => {
        gsap.to(flames, {
          scaleY: "random(0.8, 1.15)",
          opacity: "random(0.6, 1)",
          duration: 0.35,
          stagger: { each: 0.05, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });
      }, 3.6);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const hi = "मेहंदी दरबार";
  const en = "Mehndi Darbar";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: palette.background }}
    >
      <SilkDrapeMask accent={palette.accent} side="left" />
      <SilkDrapeMask accent={palette.accent} side="right" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <DarbarArch accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-4">
            <MehndiMandala accent={palette.accent} />
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-light whitespace-nowrap mb-5" style={{ color: `${palette.foreground}aa` }}>
            {en.split("").map((c, i) => (
              <span key={i} className="is-c inline-block opacity-0" style={c === " " ? { whiteSpace: "pre" } : undefined}>{c}</span>
            ))}
          </p>
          <p className="font-serif font-hindi text-2xl md:text-4xl whitespace-nowrap" style={{ color: palette.accent }}>
            {hi.split(" ").map((word, i) => (
              <span key={i} className="it-c inline-block opacity-0 mr-[0.3em]">{word}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <DiyaRow accent={palette.accent} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN HERO — Afternoon peach → Golden Hour
   4 beats: Invitation, Art, Darbar Luxe, Celebration
   Parallax: sandstone, jaali shadow, marigold petals, grain
   ═══════════════════════════════════════════════════════════════════ */

function DarbarHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const dustMotes = useMemo(
    () => Array.from({ length: 20 }, () => ({
      w: 2 + Math.random() * 5,
      x: Math.random() * 100,
      y: 10 + Math.random() * 60,
    })),
    []
  );

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const handStrokes = pin.querySelectorAll<SVGGeometryElement>(".hand-outline,.hand-wrist,.hand-palm,.hand-finger");
      handStrokes.forEach((p) => {
        if ((p as SVGGeometryElement).getTotalLength) {
          const l = (p as SVGGeometryElement).getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=15%",
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      scrollTl.fromTo(
        ".darbar-bg",
        { background: `linear-gradient(180deg,#1a1008 0%,#2a1a0a 30%,${palette.background} 100%)` },
        { background: `linear-gradient(180deg,#1a0f05 0%,${palette.gradientVia} 40%,${palette.background} 100%)`, duration: 1 },
        0
      );

      scrollTl.to(".lyr-sand3", { y: -30, duration: 1 }, 0);
      scrollTl.fromTo(".jaali-shadow", { opacity: 0, x: -20 }, { opacity: 0.06, x: 20, duration: 1 }, 0);
      scrollTl.to(".lyr-petals", { y: -80, duration: 1 }, 0);

      /* Beat 1 — Invitation: title + diya */
      scrollTl.fromTo(".b1-content", { opacity: 0.8 }, { opacity: 1, duration: 0.08 }, 0);

      /* Beat 2 — Art: henna hand draws */
      scrollTl.fromTo(".b2-content", { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.18);
      scrollTl.to(handStrokes, { strokeDashoffset: 0, duration: 0.2, stagger: 0.01, ease: "power1.inOut" }, 0.2);
      scrollTl.fromTo(
        pin.querySelectorAll(".hand-palm-dot"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.5, stagger: 0.01, duration: 0.05 },
        0.35
      );
      scrollTl.fromTo(
        pin.querySelectorAll(".hand-bloom"),
        { scale: 0, opacity: 0, fill: `${palette.accent}00` },
        { scale: 1, opacity: 0.6, fill: `${palette.accent}20`, stagger: 0.008, duration: 0.06, ease: "back.out(2)" },
        0.4
      );

      /* Beat 3 — Darbar Luxe: decor cards */
      scrollTl.fromTo(
        pin.querySelectorAll(".darbar-card"),
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.03, duration: 0.1 },
        0.52
      );

      /* Beat 4 — Celebration: radial glow + petal shower */
      scrollTl.to(".celebration-glow", { opacity: 0.2, scale: 1.2, duration: 0.2, ease: "power2.out" }, 0.75);
      scrollTl.fromTo(
        pin.querySelectorAll(".petal-fall"),
        { y: 0, opacity: 0, rotation: 0 },
        { y: -250, opacity: 0.25, rotation: "random(-30,30)", stagger: 0.015, duration: 0.25, ease: "none" },
        0.75
      );
    },
    { scope: wrapRef }
  );

  const darbarItems = [
    { label: "Seating", value: "Low Gaddi & Silk Bolsters" },
    { label: "Decor", value: "Brass Urli & Floating Flowers" },
    { label: "Accents", value: "Mirror Work & Marigold Cascades" },
  ];

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="darbar-bg absolute inset-0"
          style={{ background: `linear-gradient(180deg,#1a1008 0%,#2a1a0a 30%,${palette.background} 100%)` }}
        />

        <div className="lyr-sand3 absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 2px,${palette.accent}05 2px,${palette.accent}05 4px)` }} />

        <JaaliShadow accent={palette.accent} />

        <div className="lyr-petals absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              className="petal-fall absolute rounded-full"
              style={{
                width: 3 + (i % 3) * 2,
                height: 3 + (i % 3) * 2,
                left: `${8 + ((i * 6.7) % 84)}%`,
                bottom: `${-3 - (i % 5) * 2}%`,
                backgroundColor: i % 3 === 0 ? `${palette.accent}30` : "#e88030" + "25",
              }}
            />
          ))}
        </div>

        <div className="lyr-dust absolute inset-0 pointer-events-none opacity-30">
          {dustMotes.map((d, i) => (
            <div key={i} className="absolute rounded-full" style={{ width: d.w, height: d.w, left: `${d.x}%`, top: `${d.y}%`, background: `radial-gradient(circle,${palette.accent}25,transparent)` }} />
          ))}
        </div>

        <div className="celebration-glow absolute inset-0 pointer-events-none opacity-0" style={{ background: `radial-gradient(circle at 50% 50%,${palette.accent}15,transparent 60%)` }} />

        {/* ── BEAT 1: Invitation ── */}
        <div className="b1-content absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-[0.05em] mb-2" style={{ color: palette.accent, textShadow: `0 0 30px ${palette.accent}30` }}>
            मेहंदी दरबार
          </h1>
          <h2 className="font-serif text-lg md:text-2xl uppercase tracking-[0.25em] font-light mb-6" style={{ color: `${palette.foreground}cc` }}>
            Mehndi Darbar
          </h2>
          <p className="text-sm italic mb-8" style={{ color: `${palette.foreground}88` }}>
            Where henna artistry becomes the storytelling language
          </p>
          <div className="flex items-center gap-6">
            {[
              { icon: CalendarDays, label: event.date },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: event.location },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon size={14} style={{ color: palette.accent }} className="mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: `${palette.foreground}66` }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BEAT 2: Art — Henna hand draws itself ── */}
        <div className="b2-content absolute top-1/2 right-6 md:right-16 lg:right-24 -translate-y-1/2 z-[8] opacity-0">
          <div className="relative">
            <div
              className="absolute inset-0 -m-6 rounded-full opacity-20 blur-2xl"
              style={{ background: `radial-gradient(circle,${palette.accent}20,transparent 70%)` }}
            />
            <HennaHand accent={palette.accent} />
          </div>
        </div>

        {/* ── BEAT 3: Darbar Luxe cards (hidden on mobile to prevent overlap) ── */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-wrap items-center justify-center gap-4">
          {darbarItems.map((d) => (
            <div
              key={d.label}
              className="darbar-card group relative px-5 py-4 rounded-sm text-center opacity-0 cursor-default"
              style={{ backgroundColor: `${palette.muted}60`, border: `1px solid ${palette.accent}18` }}
            >
              <svg viewBox="0 0 20 20" className="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-500" fill="none">
                <path d="M10 2 Q7 6 5 10 Q7 14 10 18 Q13 14 15 10 Q13 6 10 2Z" stroke={palette.accent} strokeWidth="0.4" />
              </svg>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: palette.accent }}>{d.label}</p>
              <p className="font-serif text-sm" style={{ color: `${palette.foreground}cc` }}>{d.value}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 z-[6] pointer-events-none" style={{ background: `linear-gradient(to top,${palette.background},transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function DarbarQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote = "Grand arches, dramatic height, clean symmetry — but inside that structure, the wild takes over.";

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".aq-w"), { opacity: 0, y: 14 }, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-10 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,${palette.background},${palette.muted}15,${palette.background})` }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <PaisleyDivider accent={palette.accent} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}77` }}>
          &ldquo;{quote.split(" ").map((w, i) => (<span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>))}&rdquo;
        </p>
        <p className="font-serif text-2xl md:text-4xl mt-6" style={{ color: `${palette.accent}14` }}>हस्तकला</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STORY SECTION
   ═══════════════════════════════════════════════════════════════════ */

function StorySection({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const excerpt = useMemo(() => {
    const sentences = event.longDescription.split(/(?<=[.!])\s+/);
    return sentences.slice(0, 2).join(" ").trim() || event.longDescription.slice(0, 280);
  }, [event.longDescription]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".story-quote"), { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-6 relative" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>The Vibe · <span className="text-[0.78em] font-normal">माहौल</span></p>
        <PaisleyDivider accent={palette.accent} />
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 mb-6 px-2" style={{ color: `${palette.foreground}dd` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
        <PaisleyDivider accent={palette.accent} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — Mehndi Darbar · Gilded After Dark
   ═══════════════════════════════════════════════════════════════════ */

function DarbarDressCode({ event }: { event: WeddingEvent }) {
  const { palette, dressCode } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".dc-c"), { opacity: 0, y: 35 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
    gsap.fromTo(el.querySelectorAll(".dc-i"), { opacity: 0, x: -10 }, {
      opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-12 md:py-16 px-6 overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%,${palette.accent}06,transparent 70%)` }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12 font-medium text-center" style={{ color: palette.accent }}>Attire · वेश विधान</p>
        <div className="dc-c relative rounded-sm p-10 md:p-14 opacity-0" style={{ background: `linear-gradient(165deg,${palette.muted}40,${palette.background} 50%,${palette.muted}30)`, border: `1px solid ${palette.accent}18`, boxShadow: `inset 0 0 50px ${palette.accent}06` }}>
          {["top-0 left-0", "top-0 right-0 scale-x-[-1]", "bottom-0 left-0 scale-y-[-1]", "bottom-0 right-0 scale-[-1]"].map((pos, i) => (
            <svg key={i} viewBox="0 0 50 50" className={`absolute ${pos} w-9 h-9 md:w-12 md:h-12`} fill="none">
              <path d="M0 0 L0 22 Q2 10 10 5 Q16 2 22 0Z" fill={`${palette.accent}0a`} />
              <path d="M0 0 L0 30 Q3 12 12 5 L30 0" stroke={palette.accent} strokeWidth="0.4" opacity="0.3" />
            </svg>
          ))}
          <div className="text-center mb-10">
            <p className="font-serif text-2xl md:text-3xl tracking-[0.04em] mb-3" style={{ color: palette.accent }}>{dressCode.title}</p>
            <div className="w-16 h-px mx-auto mb-5" style={{ background: `linear-gradient(90deg,transparent,${palette.accent}40,transparent)` }} />
            <p className="font-serif text-base md:text-lg italic leading-relaxed max-w-lg mx-auto" style={{ color: `${palette.foreground}99` }}>{dressCode.description}</p>
          </div>
          <div className="mb-10"><PaisleyDivider accent={palette.accent} /></div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: palette.accent }}>Embrace</h4>
              <ul className="space-y-4">
                {dressCode.dos.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.accent }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}cc` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] mb-6 font-medium" style={{ color: `${palette.foreground}55` }}>Kindly Avoid</h4>
              <ul className="space-y-4">
                {dressCode.donts.map((item) => (
                  <li key={item} className="dc-i flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${palette.foreground}30` }} />
                    <span className="text-[15px] leading-relaxed font-light" style={{ color: `${palette.foreground}77` }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY + VENUE (compact)
   ═══════════════════════════════════════════════════════════════════ */

function DarbarGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;
  const ref = useRef<HTMLDivElement>(null);
  const heights = [400, 280, 340, 260];

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".gi"), { opacity: 0, scale: 0.88, y: 40 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium" style={{ color: palette.accent }}>Mood · <span className="text-[0.78em] font-normal">माहौल</span></p>
        <div className="columns-2 md:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4 w-full">
          {galleryImages.map((src, i) => (
            <div key={i} className="gi break-inside-avoid rounded-none relative overflow-hidden group cursor-pointer w-full min-w-0" style={{ height: heights[i] || 300 }}>
              <Image src={src} alt={`mood ${i + 1}`} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw,33vw" />
              <div className="absolute inset-0 opacity-25 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: palette.primary }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarbarVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;

  return (
    <section className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>Venue · स्थान</p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: palette.foreground }}>{event.location}</h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}88` }}>{event.venue}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — ThirdChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function ThirdChapterContent({ event }: ChapterProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { palette } = event;

  const eventIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : null;
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : null;

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.background, color: palette.foreground }}>
      {!introComplete && !prefersReducedMotion && (
        <MehndiDarbarIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <DarbarHero event={event} />
      <DarbarQuote event={event} />

      <FadeInView>
        <section className="border-y py-8" style={{ borderColor: `${palette.foreground}10`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: CalendarDays, label: `${event.date} · ${event.day}` },
              { icon: Clock, label: event.time },
              { icon: MapPin, label: `${event.location}, ${event.venue}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm" style={{ color: `${palette.foreground}99` }}>
                <Icon size={16} style={{ color: palette.accent }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInView>

      <StorySection event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><PaisleyDivider accent={palette.accent} /></div>
      <DarbarDressCode event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><PaisleyDivider accent={palette.accent} /></div>
      <DarbarGallery event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><PaisleyDivider accent={palette.accent} /></div>
      <DarbarVenue event={event} />

      {/* Chapter navigation */}
      <FadeInView>
        <section className="py-8 md:py-10 px-6 border-t" style={{ borderColor: `${palette.foreground}10`, backgroundColor: palette.background }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Link href="/itinerary" className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3" style={{ color: `${palette.foreground}88` }}>
                <ArrowLeft size={14} /> Back to Itinerary
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {prevEvent && (
                <Link href={`/chapter/${prevEvent.slug}`} className="group rounded-xl overflow-hidden border transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}20` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={prevEvent.heroImage} alt={prevEvent.title} fill className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}55` }}>← Previous Chapter</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{prevEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{prevEvent.subtitle}</p>
                  </div>
                </Link>
              )}
              {!prevEvent && <div />}
              {nextEvent && (
                <Link href={`/chapter/${nextEvent.slug}`} className="group rounded-xl overflow-hidden border text-right transition-all duration-500 relative" style={{ borderColor: `${palette.foreground}08`, backgroundColor: `${palette.muted}20` }}>
                  <div className="relative h-28 overflow-hidden">
                    <Image src={nextEvent.heroImage} alt={nextEvent.title} fill className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom,transparent,${palette.background}ee)` }} />
                  </div>
                  <div className="p-6 md:p-8 relative">
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: `${palette.foreground}55` }}>Next Chapter →</p>
                    <p className="font-serif text-lg md:text-xl" style={{ color: `${palette.foreground}bb` }}>{nextEvent.title}</p>
                    <p className="text-sm mt-1 italic" style={{ color: `${palette.foreground}55` }}>{nextEvent.subtitle}</p>
                  </div>
                </Link>
              )}
              {!nextEvent && <div />}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Footer */}
      <footer className="relative" style={{ backgroundColor: palette.background, borderTop: `1px solid ${palette.accent}12` }}>
        <div className="absolute -top-20 left-0 right-0 h-20 pointer-events-none" style={{ background: `linear-gradient(to bottom,transparent,${palette.background})` }} />
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <PaisleyDivider accent={palette.accent} />
          <p className="font-serif text-xs mb-4 mt-6" style={{ color: `${palette.accent}40` }}>शुभ विवाह</p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${palette.foreground}cc` }}>
            Tarush <span style={{ color: `${palette.accent}77` }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] tracking-[0.3em] font-body mb-10" style={{ color: `${palette.accent}44` }}>{COUPLE.hashtag}</p>

          <div className="relative my-12 py-10 px-8 rounded-sm mx-auto max-w-lg" style={{ border: `1px solid ${palette.accent}18`, background: `linear-gradient(165deg,${palette.accent}06,transparent 40%,${palette.primary}04)` }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: `${palette.accent}55` }}>Your Presence Matters</p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic" style={{ color: `${palette.foreground}bb` }}>
              The celebration is incomplete without you.
            </p>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: `${palette.foreground}bb` }}>
              We eagerly await your presence.
            </p>
            <p className="mt-5 text-sm tracking-[0.08em]" style={{ color: `${palette.accent}55` }}>
              आपकी उपस्थिति हमारा सम्मान है
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/rsvp" className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm hover:scale-105" style={{ backgroundColor: `${palette.accent}15`, color: palette.accent, border: `1px solid ${palette.accent}25` }}>
                RSVP Now
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mb-10">
            {[{ href: "/itinerary", label: "Itinerary" }, { href: "/rsvp", label: "RSVP" }, { href: "/travel", label: "Travel" }].map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80" style={{ color: `${palette.foreground}55` }}>{link.label}</Link>
            ))}
          </div>
          <p className="text-[11px] font-body tracking-wide mb-6" style={{ color: `${palette.foreground}35` }}>April 19–21, 2026 · Udaipur, Rajasthan</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-body tracking-wide" style={{ color: `${palette.foreground}25` }}>
            <span>© 2026 All Rights Reserved</span>
            <span style={{ color: `${palette.foreground}15` }}>|</span>
            <a href="https://blessingsofttech.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80" style={{ color: `${palette.foreground}35` }} aria-label="Blessing Softtech">
              <Image src="/images/blessing-softtech.svg" alt="" width={26} height={26} className="shrink-0" />
              <span>Blessing Softtech</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
