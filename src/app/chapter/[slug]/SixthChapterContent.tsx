"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EVENTS } from "@/content/events";
import { WeddingEvent } from "@/types";
import Navbar from "@/components/layout/Navbar";
import FadeInView from "@/components/motion/FadeInView";

gsap.registerPlugin(ScrollTrigger);

interface ChapterProps {
  event: WeddingEvent;
}

/* ═══════════════════════════════════════════════════════════════════
   SVG SET — The Royal Court · राज दरबार
   Deep maroon + antique gold + sandstone ivory. Monumental symmetry.
   (1) Royal court arches  (2) Mandap canopy  (3) Agni flame
   (4) Diya row            (5) Jaali overlay   (6) Monogram crest
   (7) Ornamental divider
   ═══════════════════════════════════════════════════════════════════ */

function RoyalCourtArches({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 700 680" className="court-arches w-[340px] md:w-[520px] lg:w-[620px] mx-auto" fill="none">
      {/* ── Central grand arch ── */}
      <path
        className="arch-s"
        d="M180 680 L180 280 Q180 180 240 120 Q290 72 320 52 Q340 40 350 34
           Q360 40 380 52 Q410 72 460 120 Q520 180 520 280 L520 680"
        stroke={accent} strokeWidth="1.6" strokeLinecap="round"
      />
      <path
        className="arch-s"
        d="M200 675 L200 290 Q200 195 255 140 Q300 96 330 76 Q345 64 350 60
           Q355 64 370 76 Q400 96 445 140 Q500 195 500 290 L500 675"
        stroke={accent} strokeWidth="0.7" opacity="0.45"
      />
      {/* Keystone */}
      <path className="arch-s" d="M344 40 L350 18 L356 40" stroke={accent} strokeWidth="0.8" opacity="0.6" />
      <circle className="arch-s" cx="350" cy="18" r="6" stroke={accent} strokeWidth="0.6" opacity="0.5" />
      <circle className="arch-s" cx="350" cy="18" r="2.5" fill={`${accent}25`} />
      {/* Trefoil at apex */}
      <path className="arch-s" d="M330 60 Q338 46 345 50 Q350 38 355 50 Q362 46 370 60" stroke={accent} strokeWidth="0.4" opacity="0.3" />

      {/* ── Left side arch ── */}
      <path
        className="arch-s"
        d="M30 680 L30 350 Q30 280 70 230 Q100 195 130 175 Q155 160 165 155
           Q155 160 145 175 Q120 200 110 240 Q100 280 100 340 L100 680"
        stroke={accent} strokeWidth="1.1" strokeLinecap="round" opacity="0.7"
      />
      <path className="arch-s" d="M50 675 L50 360 Q50 295 85 250 Q110 215 140 195" stroke={accent} strokeWidth="0.5" opacity="0.3" />

      {/* ── Right side arch ── */}
      <path
        className="arch-s"
        d="M670 680 L670 350 Q670 280 630 230 Q600 195 570 175 Q545 160 535 155
           Q545 160 555 175 Q580 200 590 240 Q600 280 600 340 L600 680"
        stroke={accent} strokeWidth="1.1" strokeLinecap="round" opacity="0.7"
      />
      <path className="arch-s" d="M650 675 L650 360 Q650 295 615 250 Q590 215 560 195" stroke={accent} strokeWidth="0.5" opacity="0.3" />

      {/* ── Column capitals ── */}
      <path className="arch-s" d="M170 280 L190 270 L190 290Z" stroke={accent} strokeWidth="0.4" opacity="0.25" fill={`${accent}06`} />
      <path className="arch-s" d="M530 280 L510 270 L510 290Z" stroke={accent} strokeWidth="0.4" opacity="0.25" fill={`${accent}06`} />
      <rect className="arch-s" x="177" y="290" width="6" height="390" stroke={accent} strokeWidth="0.2" opacity="0.08" />
      <rect className="arch-s" x="517" y="290" width="6" height="390" stroke={accent} strokeWidth="0.2" opacity="0.08" />

      {/* ── Spandrel arcs ── */}
      <path className="arch-s" d="M240 150 Q270 128 300 115" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      <path className="arch-s" d="M460 150 Q430 128 400 115" stroke={accent} strokeWidth="0.3" opacity="0.2" />

      {/* ── Base plinth ── */}
      <path className="arch-s" d="M20 678 L680 678" stroke={accent} strokeWidth="0.4" opacity="0.15" />
    </svg>
  );
}

function MandapCanopy({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 400 300" className="mandap-canopy w-[220px] md:w-[320px] mx-auto opacity-0" fill="none">
      {/* Dome */}
      <path
        className="mandap-s"
        d="M60 280 L60 130 Q60 70 120 40 Q160 22 200 15 Q240 22 280 40 Q340 70 340 130 L340 280"
        stroke={accent} strokeWidth="1" opacity="0.55"
      />
      {/* Inner scalloped canopy edge */}
      <path
        className="mandap-s"
        d="M80 260 Q95 248 110 260 Q125 248 140 260 Q155 248 170 260 Q185 248 200 260
           Q215 248 230 260 Q245 248 260 260 Q275 248 290 260 Q305 248 320 260"
        stroke={accent} strokeWidth="0.5" opacity="0.3"
      />
      {/* Kalash finial */}
      <path className="mandap-s" d="M194 20 L200 2 L206 20" stroke={accent} strokeWidth="0.7" opacity="0.5" />
      <circle className="mandap-s" cx="200" cy="2" r="4" stroke={accent} strokeWidth="0.5" opacity="0.45" />
      {/* Pillars */}
      <path className="mandap-s" d="M60 130 L60 280" stroke={accent} strokeWidth="0.6" opacity="0.35" />
      <path className="mandap-s" d="M340 130 L340 280" stroke={accent} strokeWidth="0.6" opacity="0.35" />
      {/* Hanging floral strands */}
      {[90, 130, 170, 200, 230, 270, 310].map((x) => (
        <g key={`fl${x}`}>
          <path className="mandap-strand" d={`M${x} 260 Q${x - 3} 272 ${x} 284`} stroke={accent} strokeWidth="0.3" opacity="0.2" />
          <circle className="mandap-strand" cx={x} cy={286} r="1.5" fill={`${accent}12`} stroke={accent} strokeWidth="0.2" />
          <circle className="mandap-strand" cx={x} cy={278} r="1" fill={`${accent}10`} />
        </g>
      ))}
      {/* Cross beam detail */}
      <path className="mandap-s" d="M80 140 L320 140" stroke={accent} strokeWidth="0.25" opacity="0.15" strokeDasharray="4 6" />
    </svg>
  );
}

function AgniFlame({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 40 60" className="agni-flame w-6 md:w-8 mx-auto" fill="none">
      {/* Base bowl */}
      <path d="M8 52 Q12 58 20 58 Q28 58 32 52 Q30 56 20 56 Q10 56 8 52Z" fill={`${accent}20`} stroke={accent} strokeWidth="0.4" opacity="0.4" />
      {/* Outer flame */}
      <path
        className="flame-outer"
        d="M20 48 Q14 38 16 28 Q18 18 20 10 Q22 18 24 28 Q26 38 20 48Z"
        fill={`${accent}15`}
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.5"
        style={{ transformOrigin: "20px 48px" }}
      />
      {/* Inner flame */}
      <path
        className="flame-inner"
        d="M20 46 Q17 38 18 30 Q19 22 20 16 Q21 22 22 30 Q23 38 20 46Z"
        fill={`${accent}25`}
        stroke={accent}
        strokeWidth="0.3"
        opacity="0.6"
        style={{ transformOrigin: "20px 46px" }}
      />
      {/* Core */}
      <ellipse className="flame-core" cx="20" cy="40" rx="3" ry="5" fill={accent} opacity="0.2" />
    </svg>
  );
}

function DiyaRow({ accent }: { accent: string }) {
  const xs = [-320, -240, -160, -80, 0, 80, 160, 240, 320];
  return (
    <svg viewBox="-360 -8 720 55" className="diya-row w-full max-w-3xl h-10 mx-auto" fill="none">
      <defs>
        <filter id="dgr">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {xs.map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M-7 28 Q-5 36 0 38 Q5 36 7 28Z" fill={`${accent}25`} stroke={accent} strokeWidth="0.3" />
          <path className="diya-f" d="M0 20 Q-3 12 -1 5 Q0 0 0 -2 Q0 0 1 5 Q3 12 0 20Z" fill={accent} opacity="0" style={{ transformOrigin: "0px 20px" }} />
          <circle className="diya-f" cx="0" cy="8" r="5" fill={accent} opacity="0" filter="url(#dgr)" />
        </g>
      ))}
    </svg>
  );
}

function JaaliProjection({ accent }: { accent: string }) {
  return (
    <svg className="jaali-projection absolute inset-0 w-full h-full opacity-0" preserveAspectRatio="none" viewBox="0 0 400 400">
      <defs>
        <pattern id="jaali6" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
          <circle cx="35" cy="35" r="16" stroke={accent} strokeWidth="0.25" fill="none" opacity="0.06" />
          <circle cx="35" cy="35" r="10" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.04" />
          <path d="M35 19 Q31 27 35 31 Q39 27 35 19Z" stroke={accent} strokeWidth="0.2" opacity="0.05" />
          <path d="M35 51 Q31 43 35 39 Q39 43 35 51Z" stroke={accent} strokeWidth="0.2" opacity="0.05" />
          <path d="M19 35 Q27 31 31 35 Q27 39 19 35Z" stroke={accent} strokeWidth="0.2" opacity="0.05" />
          <path d="M51 35 Q43 31 39 35 Q43 39 51 35Z" stroke={accent} strokeWidth="0.2" opacity="0.05" />
          <path d="M0 0 Q8 4 6 12" stroke={accent} strokeWidth="0.12" opacity="0.03" />
          <path d="M70 0 Q62 4 64 12" stroke={accent} strokeWidth="0.12" opacity="0.03" />
          <path d="M0 70 Q8 66 6 58" stroke={accent} strokeWidth="0.12" opacity="0.03" />
          <path d="M70 70 Q62 66 64 58" stroke={accent} strokeWidth="0.12" opacity="0.03" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#jaali6)" />
    </svg>
  );
}

function MonogramCrest({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 80 80" className="crest-svg w-14 h-14 md:w-16 md:h-16 mx-auto" fill="none">
      <circle className="crest-s" cx="40" cy="40" r="34" stroke={accent} strokeWidth="0.7" opacity="0.35" />
      <circle className="crest-s" cx="40" cy="40" r="28" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <circle className="crest-s" cx="40" cy="40" r="22" stroke={accent} strokeWidth="0.3" opacity="0.18" strokeDasharray="2 3" />
      {/* Shield shape */}
      <path className="crest-s" d="M40 14 L54 22 L54 44 Q54 56 40 66 Q26 56 26 44 L26 22Z" stroke={accent} strokeWidth="0.5" opacity="0.25" fill={`${accent}06`} />
      <text x="40" y="44" textAnchor="middle" fill={accent} fontSize="13" fontFamily="serif" letterSpacing="1" opacity="0.35">T&amp;S</text>
      {[0, 90, 180, 270].map((a) => {
        const r = 34;
        const cx = 40 + Math.cos((a * Math.PI) / 180) * r;
        const cy = 40 + Math.sin((a * Math.PI) / 180) * r;
        return <circle key={a} cx={cx} cy={cy} r="1.5" fill={accent} opacity="0.15" />;
      })}
    </svg>
  );
}

function CourtDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 24" className="w-40 md:w-52 h-auto mx-auto" fill="none">
      <line x1="0" y1="12" x2="115" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <line x1="205" y1="12" x2="320" y2="12" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      {/* Central lotus */}
      <path d="M160 4 Q154 8 152 12 Q154 16 160 20 Q166 16 168 12 Q166 8 160 4Z" stroke={accent} strokeWidth="0.5" opacity="0.35" fill={`${accent}08`} />
      <path d="M152 12 Q146 8 142 12 Q146 16 152 12Z" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      <path d="M168 12 Q174 8 178 12 Q174 16 168 12Z" stroke={accent} strokeWidth="0.3" opacity="0.2" />
      <circle cx="160" cy="12" r="1.8" fill={accent} opacity="0.2" />
      {/* Flanking dots */}
      <circle cx="135" cy="12" r="1" fill={accent} opacity="0.12" />
      <circle cx="185" cy="12" r="1" fill={accent} opacity="0.12" />
      <circle cx="125" cy="12" r="0.6" fill={accent} opacity="0.08" />
      <circle cx="195" cy="12" r="0.6" fill={accent} opacity="0.08" />
    </svg>
  );
}

function VelvetDrape({ accent, side }: { accent: string; side: "left" | "right" }) {
  const isL = side === "left";
  return (
    <div
      className={`velvet-drape-${side} absolute top-0 ${isL ? "left-0" : "right-0"} h-full w-1/2`}
      style={{ background: `linear-gradient(${isL ? "to right" : "to left"},${accent}15,${accent}05,transparent)` }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROYAL COURT INTRO
   introTl: drapes part → arches draw upward (monumental) →
   mandap fades in → title engraved → diya ignition
   ═══════════════════════════════════════════════════════════════════ */

function RoyalCourtIntro({
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

      const mandapPaths = el.querySelectorAll<SVGGeometryElement>(".mandap-s");
      mandapPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const introTl = gsap.timeline({
        onComplete: () => {
          gsap.to(el, { opacity: 0, duration: 0.6, delay: 0.3, onComplete });
        },
      });

      introTl.to(el.querySelector(".velvet-drape-left"), { x: "-100%", duration: 1.4, ease: "power3.inOut" }, 0);
      introTl.to(el.querySelector(".velvet-drape-right"), { x: "100%", duration: 1.4, ease: "power3.inOut" }, 0);

      introTl.to(archPaths, { strokeDashoffset: 0, duration: 2.4, stagger: 0.04, ease: "power2.inOut" }, 0.3);

      introTl.to(mandapPaths, { strokeDashoffset: 0, duration: 1.5, stagger: 0.05, ease: "power2.inOut" }, 1.8);
      introTl.fromTo(".mandap-canopy", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8);

      introTl.fromTo(
        el.querySelectorAll(".it-c"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.025, ease: "power3.out" },
        2.4
      );

      introTl.fromTo(
        el.querySelectorAll(".is-c"),
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.015, ease: "power3.out" },
        3.0
      );

      introTl.fromTo(
        el.querySelector(".sub-tag"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        3.4
      );

      const flames = el.querySelectorAll(".diya-f");
      introTl.to(flames, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.08, ease: "back.out(2)" }, 3.2);
      introTl.add(() => {
        gsap.to(flames, {
          scaleY: "random(0.8, 1.15)",
          opacity: "random(0.6, 1)",
          duration: 0.35,
          stagger: { each: 0.05, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        });
      }, 4.0);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const hi = "राज दरबार";
  const en = "The Royal Court";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0d0505" }}
    >
      <VelvetDrape accent={palette.accent} side="left" />
      <VelvetDrape accent={palette.accent} side="right" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <RoyalCourtArches accent={palette.accent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-4 opacity-0">
            <MandapCanopy accent={palette.accent} />
          </div>
          <p className="font-serif font-hindi text-3xl md:text-5xl mb-2 whitespace-nowrap" style={{ color: palette.accent }}>
            {hi.split(" ").map((word, i) => (
              <span key={i} className="it-c inline-block opacity-0 mr-[0.3em]">{word}</span>
            ))}
          </p>
          <p className="font-serif text-sm md:text-lg uppercase tracking-[0.35em] font-light whitespace-nowrap" style={{ color: `${palette.foreground}cc` }}>
            {en.split("").map((c, i) => (
              <span key={i} className="is-c inline-block opacity-0" style={c === " " ? { whiteSpace: "pre" } : undefined}>{c}</span>
            ))}
          </p>
          <p className="sub-tag mt-3 text-xs italic tracking-[0.15em] opacity-0" style={{ color: `${palette.accent}88` }}>
            Architecture in stone. Couture in detail.
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
   SCROLL-DRIVEN HERO — 4 Sacred Beats
   Beat 1: Architecture Rises (arches lock, sandstone texture)
   Beat 2: Mandap Emerges (canopy + halo + diya ignition)
   Beat 3: Sacred Atmosphere (petals, agni flicker, shimmer waves)
   Beat 4: Couture Detail (staggered couture content blocks)
   ═══════════════════════════════════════════════════════════════════ */

function CourtHero({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const petals = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      x: 8 + ((i * 5.8) % 84),
      s: 2 + (i % 3) * 1.5,
      delay: i * 0.15,
    })),
    []
  );

  const coutureItems = [
    { label: "Textiles", value: "Banarasi weaves, Kanjeevaram silks, zardozi embroidery" },
    { label: "Craft", value: "Laser-cut geometries merged with hand-carved motifs" },
    { label: "Details", value: "Reimagined phool malas, projection-mapped mandap surfaces" },
  ];

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const heroArchPaths = pin.querySelectorAll<SVGGeometryElement>(".hero-arches .arch-s");
      heroArchPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const mandapPaths = pin.querySelectorAll<SVGGeometryElement>(".hero-mandap .mandap-s");
      mandapPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      const crestPaths = pin.querySelectorAll<SVGGeometryElement>(".crest-s");
      crestPaths.forEach((p) => {
        if (p.getTotalLength) {
          const l = p.getTotalLength();
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

      /* ── Beat 1: Architecture Rises ── */
      scrollTl.to(heroArchPaths, { strokeDashoffset: 0, duration: 0.2, stagger: 0.015, ease: "power2.inOut" }, 0);
      scrollTl.fromTo(".sandstone-lyr", { opacity: 0 }, { opacity: 0.08, duration: 0.15 }, 0.05);
      scrollTl.fromTo(".b1-content", { opacity: 0.8 }, { opacity: 1, duration: 0.08 }, 0);

      /* ── Beat 2: Mandap Emerges ── */
      scrollTl.to(mandapPaths, { strokeDashoffset: 0, duration: 0.15, stagger: 0.01, ease: "power2.inOut" }, 0.22);
      scrollTl.fromTo(".hero-mandap", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.22);
      scrollTl.fromTo(".mandap-halo", { opacity: 0, scale: 0.5 }, { opacity: 0.2, scale: 1.1, duration: 0.15, ease: "power2.out" }, 0.28);

      const heroFlames = pin.querySelectorAll(".hero-diyas .diya-f");
      scrollTl.to(heroFlames, { scale: 1, opacity: 1, duration: 0.04, stagger: 0.008, ease: "back.out(2)" }, 0.3);

      scrollTl.fromTo(
        pin.querySelectorAll(".mandap-strand"),
        { opacity: 0 },
        { opacity: 1, duration: 0.08, stagger: 0.01 },
        0.32
      );

      /* ── Beat 3: Sacred Atmosphere ── */
      scrollTl.fromTo(".jaali-projection", { opacity: 0 }, { opacity: 0.06, duration: 0.15 }, 0.4);
      scrollTl.fromTo(
        pin.querySelectorAll(".sacred-petal"),
        { y: 0, opacity: 0 },
        { y: -200, opacity: 0.2, stagger: 0.01, duration: 0.25, ease: "none" },
        0.42
      );
      scrollTl.fromTo(".agni-wrap", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0.45);
      scrollTl.fromTo(".shimmer-wave", { opacity: 0 }, { opacity: 0.08, duration: 0.1 }, 0.5);

      scrollTl.to(
        ".court-bg",
        { background: `linear-gradient(180deg,#0d0505 0%,#1a0808 25%,${palette.gradientVia} 50%,${palette.background} 100%)`, duration: 0.3 },
        0.4
      );

      /* ── Beat 4: Couture Detail ── */
      scrollTl.to(crestPaths, { strokeDashoffset: 0, duration: 0.1, stagger: 0.01 }, 0.62);
      scrollTl.fromTo(".crest-svg", { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.62);
      scrollTl.fromTo(
        pin.querySelectorAll(".couture-card"),
        { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.03, duration: 0.08, ease: "power3.out" },
        0.7
      );

      scrollTl.to(".lyr-sand6", { y: -35, duration: 1 }, 0);

      gsap.to(pin.querySelectorAll(".flame-outer"), {
        scaleY: "random(0.85, 1.12)",
        scaleX: "random(0.92, 1.05)",
        duration: 0.4,
        stagger: { each: 0.1, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
      gsap.to(pin.querySelectorAll(".flame-inner"), {
        scaleY: "random(0.8, 1.18)",
        duration: 0.3,
        stagger: { each: 0.08, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} style={{ height: "105vh" }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div
          className="court-bg absolute inset-0"
          style={{ background: `linear-gradient(180deg,#0d0505 0%,#140808 25%,${palette.primary}40 50%,${palette.background} 100%)` }}
        />

        {/* Sandstone texture */}
        <div className="lyr-sand6 absolute inset-0 opacity-0 sandstone-lyr" style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 2px,${palette.accent}04 2px,${palette.accent}04 4px)` }} />

        <JaaliProjection accent={palette.accent} />

        {/* Shimmer wave */}
        <div
          className="shimmer-wave absolute inset-0 pointer-events-none opacity-0"
          style={{ background: `linear-gradient(135deg,transparent 30%,${palette.accent}06 45%,transparent 55%,${palette.accent}04 70%,transparent 80%)` }}
        />

        {/* Mandap halo */}
        <div
          className="mandap-halo absolute pointer-events-none opacity-0"
          style={{
            width: "50%", height: "50%",
            top: "15%", left: "25%",
            background: `radial-gradient(circle,${palette.accent}15,${palette.accent}06 40%,transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Sacred petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {petals.map((p, i) => (
            <div
              key={i}
              className="sacred-petal absolute rounded-full opacity-0"
              style={{
                width: p.s, height: p.s,
                left: `${p.x}%`,
                bottom: `-${2 + (i % 4)}%`,
                backgroundColor: i % 3 === 0 ? `${palette.accent}25` : i % 3 === 1 ? "#8b1a1a20" : "#c9956b18",
              }}
            />
          ))}
        </div>

        {/* Background arches */}
        <div className="hero-arches absolute inset-0 flex items-end justify-center pointer-events-none pb-0">
          <RoyalCourtArches accent={palette.accent} />
        </div>

        {/* Mandap at center */}
        <div className="hero-mandap absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0">
          <MandapCanopy accent={palette.accent} />
        </div>

        {/* Agni at mandap center */}
        <div className="agni-wrap absolute top-[42%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0">
          <AgniFlame accent={palette.accent} />
        </div>

        {/* Diya row at bottom */}
        <div className="hero-diyas absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none">
          <DiyaRow accent={palette.accent} />
        </div>

        {/* ── BEAT 1: Title ── */}
        <div className="b1-content absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-10 px-6">
          <p className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.04em] mb-2" style={{ color: palette.accent, textShadow: `0 0 40px ${palette.accent}25, 0 2px 15px #0005` }}>
            राज दरबार
          </p>
          <h1 className="font-serif text-lg md:text-2xl uppercase tracking-[0.3em] font-light mb-2" style={{ color: `${palette.foreground}cc` }}>
            The Royal Court
          </h1>
          <p className="text-xs italic tracking-[0.12em] mb-6" style={{ color: `${palette.accent}88` }}>
            Architecture in stone &middot; Couture in detail
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

        {/* ── BEAT 4: Couture cards + crest (hidden on mobile to prevent overlap) ── */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 text-center hidden md:block">
          <div className="mb-4 opacity-0">
            <MonogramCrest accent={palette.accent} />
          </div>
          <div className="flex flex-wrap items-start justify-center gap-3 md:gap-4">
            {coutureItems.map((d) => (
              <div
                key={d.label}
                className="couture-card px-5 py-4 rounded-sm text-center opacity-0 max-w-[200px]"
                style={{ backgroundColor: `${palette.muted}50`, border: `1px solid ${palette.accent}15` }}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] mb-1 font-medium" style={{ color: palette.accent }}>{d.label}</p>
                <p className="font-serif text-xs md:text-sm leading-relaxed" style={{ color: `${palette.foreground}cc` }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 z-[6] pointer-events-none" style={{ background: `linear-gradient(to top,${palette.background},transparent)` }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ATMOSPHERE QUOTE
   ═══════════════════════════════════════════════════════════════════ */

function CourtQuote({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);
  const quote = "This is not a wedding set. This is a living, breathing court.";

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
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,${palette.background},${palette.muted}12,${palette.background})` }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <CourtDivider accent={palette.accent} />
        <p className="font-serif italic text-xl md:text-2xl mt-8 leading-relaxed" style={{ color: `${palette.foreground}77` }}>
          &ldquo;{quote.split(" ").map((w, i) => (<span key={i} className="aq-w inline-block mr-[0.3em]">{w}</span>))}&rdquo;
        </p>
        <p className="font-serif text-3xl md:text-5xl mt-6" style={{ color: `${palette.accent}12` }}>दरबार</p>
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
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>The Vibe · माहौल</p>
        <CourtDivider accent={palette.accent} />
        <blockquote className="story-quote font-serif italic text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 mb-6 px-2" style={{ color: `${palette.foreground}dd` }}>
          &ldquo;{excerpt}&rdquo;
        </blockquote>
        <CourtDivider accent={palette.accent} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DRESS CODE — Royal Couture
   ═══════════════════════════════════════════════════════════════════ */

function CourtDressCode({ event }: { event: WeddingEvent }) {
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
          <div className="mb-10"><CourtDivider accent={palette.accent} /></div>
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
   GALLERY + VENUE
   ═══════════════════════════════════════════════════════════════════ */

function CourtGallery({ event }: { event: WeddingEvent }) {
  const { palette, galleryImages } = event;
  const ref = useRef<HTMLDivElement>(null);
  const heights = [420, 290, 350, 270];

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".gi"), { opacity: 0, scale: 0.88, y: 40 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-6 relative" style={{ backgroundColor: palette.background }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-10 font-medium" style={{ color: palette.accent }}>Mood · माहौल</p>
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="gi break-inside-avoid rounded-none relative overflow-hidden group cursor-pointer" style={{ height: heights[i] || 300 }}>
              <Image src={src} alt={`mood ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw,33vw" />
              <div className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: palette.primary }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourtVenue({ event }: { event: WeddingEvent }) {
  const { palette } = event;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector(".v-img"), { y: 30 }, {
      y: -30, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-8 md:py-12 px-6 relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 font-medium" style={{ color: palette.accent }}>Venue · स्थान</p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3" style={{ color: palette.foreground }}>{event.location}</h3>
        <p className="text-lg mb-12" style={{ color: `${palette.foreground}88` }}>{event.venue}</p>
        <div className="aspect-video rounded-lg flex items-center justify-center border overflow-hidden relative" style={{ backgroundColor: `${palette.muted}40`, borderColor: `${palette.foreground}10` }}>
          <div className="v-img absolute inset-[-20%] w-[140%] h-[140%]">
            <Image src={event.heroImage} alt={`${event.venue} venue`} fill className="object-cover opacity-30" sizes="(max-width:768px) 100vw,800px" />
          </div>
          <div className="text-center relative z-10">
            <MapPin size={32} className="mx-auto mb-3 opacity-50" style={{ color: palette.accent }} />
            <p className="text-sm font-medium uppercase tracking-[0.15em] opacity-50" style={{ color: palette.foreground }}>Map — Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — SixthChapterContent
   ═══════════════════════════════════════════════════════════════════ */

export default function SixthChapterContent({ event }: ChapterProps) {
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
        <RoyalCourtIntro event={event} onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <CourtHero event={event} />
      <CourtQuote event={event} />

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
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><CourtDivider accent={palette.accent} /></div>
      <CourtDressCode event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><CourtDivider accent={palette.accent} /></div>
      <CourtGallery event={event} />
      <div className="flex justify-center" style={{ backgroundColor: palette.background }}><CourtDivider accent={palette.accent} /></div>
      <CourtVenue event={event} />

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
                    <Image src={prevEvent.heroImage} alt={prevEvent.title} fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
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
                    <Image src={nextEvent.heroImage} alt={nextEvent.title} fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" sizes="50vw" />
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
          <CourtDivider accent={palette.accent} />
          <p className="font-serif text-sm mb-4 mt-6" style={{ color: `${palette.accent}55` }}>शुभ विवाह</p>
          <p className="font-serif text-2xl md:text-3xl mb-2" style={{ color: `${palette.foreground}cc` }}>
            Tarush <span style={{ color: `${palette.accent}77` }}>&amp;</span> Sanjana
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] font-body mb-10" style={{ color: `${palette.accent}55` }}>#TarushAndSanjana</p>

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
              <Link key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] font-body transition-colors duration-300 hover:opacity-80" style={{ color: `${palette.foreground}66` }}>{link.label}</Link>
            ))}
          </div>
          <p className="text-[11px] font-body tracking-wide" style={{ color: `${palette.foreground}40` }}>April 19–21, 2026 · Udaipur, Rajasthan</p>
        </div>
      </footer>
    </div>
  );
}
