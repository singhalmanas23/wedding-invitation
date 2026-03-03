"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChapterPalette } from "@/types";

interface EnvProps {
  palette: ChapterPalette;
}

/* ════════════════════════════════════════════════════════════════
   CH1 — TENT DRAPE ENV (Welcome Dinner · Dusk Till Dawn)
   Cascading tent drapes, candelabra silhouettes, wax seals, feathers
   ════════════════════════════════════════════════════════════════ */

function TentDrapeEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".td-drape"),
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 3, stagger: 0.4, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".td-candle"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 1.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".td-seal"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, delay: 2, ease: "back.out(2)" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Tent drape curves from top corners */}
        <path className="td-drape" d="M0 0 Q300 120 600 80 Q900 40 1200 0" stroke={`${palette.accent}18`} strokeWidth="1.5" strokeDasharray="600" />
        <path className="td-drape" d="M0 0 Q350 180 600 130 Q850 80 1200 0" stroke={`${palette.accent}12`} strokeWidth="1" strokeDasharray="600" />
        <path className="td-drape" d="M0 0 Q250 240 600 180 Q950 120 1200 0" stroke={`${palette.accent}0d`} strokeWidth="0.8" strokeDasharray="600" />
        {/* Swag drapes from center */}
        <path className="td-drape" d="M200 0 Q400 200 600 150 Q800 100 1000 0" stroke={`${palette.accent}10`} strokeWidth="0.6" strokeDasharray="600" />
        <path className="td-drape" d="M100 0 Q300 280 600 200" stroke={`${palette.accent}0a`} strokeWidth="0.5" strokeDasharray="600" />
        <path className="td-drape" d="M600 200 Q900 120 1100 0" stroke={`${palette.accent}0a`} strokeWidth="0.5" strokeDasharray="600" />

        {/* Candelabra silhouettes along bottom */}
        {[150, 400, 600, 800, 1050].map((x, i) => (
          <g key={i} className="td-candle">
            <line x1={x} y1={800} x2={x} y2={680} stroke={`${palette.accent}12`} strokeWidth="1.5" />
            <line x1={x - 20} y1={710} x2={x} y2={680} stroke={`${palette.accent}0d`} strokeWidth="1" />
            <line x1={x + 20} y1={710} x2={x} y2={680} stroke={`${palette.accent}0d`} strokeWidth="1" />
            <ellipse cx={x} cy={670} rx="4" ry="8" fill={`${palette.accent}15`} />
            <ellipse cx={x - 20} cy={700} rx="3" ry="6" fill={`${palette.accent}10`} />
            <ellipse cx={x + 20} cy={700} rx="3" ry="6" fill={`${palette.accent}10`} />
            <circle cx={x} cy={660} r="3" fill={`${palette.accent}18`} />
          </g>
        ))}

        {/* Wax seal circles */}
        {[{ x: 120, y: 300 }, { x: 1080, y: 250 }, { x: 600, y: 600 }].map((s, i) => (
          <g key={i} className="td-seal">
            <circle cx={s.x} cy={s.y} r="18" stroke={`${palette.accent}12`} strokeWidth="0.8" fill={`${palette.accent}06`} />
            <circle cx={s.x} cy={s.y} r="12" stroke={`${palette.accent}0a`} strokeWidth="0.5" />
            <circle cx={s.x} cy={s.y} r="3" fill={`${palette.accent}10`} />
          </g>
        ))}

        {/* Golden feather motifs */}
        {[{ x: 250, y: 200, r: -25 }, { x: 950, y: 350, r: 15 }, { x: 700, y: 150, r: -10 }].map((f, i) => (
          <g key={i} className="td-seal" transform={`rotate(${f.r}, ${f.x}, ${f.y})`}>
            <ellipse cx={f.x} cy={f.y} rx="3" ry="25" stroke={`${palette.accent}10`} strokeWidth="0.5" />
            <line x1={f.x} y1={f.y - 25} x2={f.x} y2={f.y + 25} stroke={`${palette.accent}0d`} strokeWidth="0.3" />
          </g>
        ))}
      </svg>

      {/* Warm amber glow */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 70%, ${palette.accent}08, transparent 70%)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CH2 — PINK ARCH ENV (Victorian Hi-Tea · Jaipur Haveli)
   Triple jharokha arch gateway, jali lattice, wisteria garlands
   ════════════════════════════════════════════════════════════════ */

function PinkArchEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".pa-arch"),
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 3, stagger: 0.3, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".pa-jali"),
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.06, delay: 2, ease: "power2.out" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".pa-wist"),
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 2.5, ease: "power2.out" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Central grand arch */}
        <path className="pa-arch" d="M350 800 V350 Q350 120 600 60 Q850 120 850 350 V800" stroke={`${palette.accent}15`} strokeWidth="1.5" strokeDasharray="800" />
        <path className="pa-arch" d="M380 780 V365 Q380 150 600 95 Q820 150 820 365 V780" stroke={`${palette.accent}0d`} strokeWidth="0.8" strokeDasharray="800" />
        {/* Scalloped inner edge */}
        <path className="pa-arch" d="M410 760 V380 Q410 200 500 140 Q550 115 600 110 Q650 115 700 140 Q790 200 790 380 V760" stroke={`${palette.accent}0a`} strokeWidth="0.5" strokeDasharray="800" />

        {/* Left side arch */}
        <path className="pa-arch" d="M50 800 V450 Q50 300 175 250 Q300 300 300 450 V800" stroke={`${palette.accent}0d`} strokeWidth="0.8" strokeDasharray="800" />
        {/* Right side arch */}
        <path className="pa-arch" d="M900 800 V450 Q900 300 1025 250 Q1150 300 1150 450 V800" stroke={`${palette.accent}0d`} strokeWidth="0.8" strokeDasharray="800" />

        {/* Decorative apex ornaments */}
        <circle className="pa-jali" cx="600" cy="80" r="8" stroke={`${palette.accent}12`} strokeWidth="0.5" />
        <path className="pa-jali" d="M590 80 Q600 65 610 80" stroke={`${palette.accent}0d`} strokeWidth="0.4" />

        {/* Jali lattice panels on sides */}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={`jl-${i}`} className="pa-jali">
            <ellipse cx={80 + (i % 3) * 80} cy={500 + Math.floor(i / 3) * 60} rx="12" ry="18" stroke={`${palette.accent}08`} strokeWidth="0.4" />
          </g>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={`jr-${i}`} className="pa-jali">
            <ellipse cx={960 + (i % 3) * 80} cy={500 + Math.floor(i / 3) * 60} rx="12" ry="18" stroke={`${palette.accent}08`} strokeWidth="0.4" />
          </g>
        ))}

        {/* Wisteria garlands hanging from arch */}
        {[420, 480, 540, 600, 660, 720, 780].map((x, i) => (
          <g key={i} className="pa-wist">
            {Array.from({ length: 4 + (i % 3) }, (_, j) => (
              <circle key={j} cx={x + (j % 2) * 3} cy={130 + j * 12 + i * 5} r={2.5 - j * 0.3} fill={`${palette.primary}${(20 - j * 3).toString(16).padStart(2, "0")}`} />
            ))}
          </g>
        ))}
      </svg>

      {/* Soft pink ambient glow */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 35% at 50% 30%, ${palette.primary}08, transparent 70%)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CH3 — GOTHIC CATHEDRAL ENV (Sangeet · Cathedral Gone Rogue)
   Pointed arches, ribbed vaults, rose window, ivy vines
   ════════════════════════════════════════════════════════════════ */

function GothicCathedralEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".gc-rib"),
      { strokeDashoffset: 900 },
      { strokeDashoffset: 0, duration: 2.5, stagger: 0.2, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".gc-rose"),
      { scale: 0, opacity: 0, transformOrigin: "center" },
      { scale: 1, opacity: 1, duration: 1.5, delay: 1.5, ease: "back.out(1.5)" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".gc-vine"),
      { strokeDashoffset: 500 },
      { strokeDashoffset: 0, duration: 4, stagger: 0.3, delay: 2, ease: "power1.inOut" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Central pointed gothic arch */}
        <path className="gc-rib" d="M300 800 V320 Q300 80 600 20 Q900 80 900 320 V800" stroke={`${palette.accent}15`} strokeWidth="1.5" strokeDasharray="900" />
        <path className="gc-rib" d="M340 780 V335 Q340 110 600 55 Q860 110 860 335 V780" stroke={`${palette.accent}0d`} strokeWidth="0.8" strokeDasharray="900" />

        {/* Ribbed vault lines converging at keystone */}
        <path className="gc-rib" d="M300 800 Q450 400 600 20" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="900" />
        <path className="gc-rib" d="M900 800 Q750 400 600 20" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="900" />
        <path className="gc-rib" d="M200 800 Q400 350 600 20" stroke={`${palette.accent}06`} strokeWidth="0.4" strokeDasharray="900" />
        <path className="gc-rib" d="M1000 800 Q800 350 600 20" stroke={`${palette.accent}06`} strokeWidth="0.4" strokeDasharray="900" />

        {/* Rose window */}
        <g className="gc-rose">
          <circle cx="600" cy="250" r="80" stroke={`${palette.accent}10`} strokeWidth="0.8" />
          <circle cx="600" cy="250" r="60" stroke={`${palette.accent}0a`} strokeWidth="0.5" />
          <circle cx="600" cy="250" r="35" stroke={`${palette.accent}08`} strokeWidth="0.4" />
          <circle cx="600" cy="250" r="15" fill={`${palette.accent}08`} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30) * (Math.PI / 180);
            return <line key={i} x1={600 + Math.cos(a) * 40} y1={250 + Math.sin(a) * 40} x2={600 + Math.cos(a) * 78} y2={250 + Math.sin(a) * 78} stroke={`${palette.accent}08`} strokeWidth="0.4" />;
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i * 60 + 30) * (Math.PI / 180);
            return <circle key={i} cx={600 + Math.cos(a) * 55} cy={250 + Math.sin(a) * 55} r="8" stroke={`${palette.accent}06`} strokeWidth="0.3" />;
          })}
        </g>

        {/* Vertical mullions / columns */}
        <line className="gc-rib" x1="300" y1="320" x2="300" y2="800" stroke={`${palette.accent}0a`} strokeWidth="1" strokeDasharray="900" />
        <line className="gc-rib" x1="900" y1="320" x2="900" y2="800" stroke={`${palette.accent}0a`} strokeWidth="1" strokeDasharray="900" />

        {/* Ivy vine creepers along left column */}
        <path className="gc-vine" d="M300 800 Q295 750 305 700 Q295 650 310 600 Q295 550 305 500 Q300 450 310 400" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="500" />
        {/* Ivy along right column */}
        <path className="gc-vine" d="M900 800 Q905 740 895 680 Q905 620 890 560 Q905 500 895 440" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="500" />
        {/* Small leaf shapes on vines */}
        {[420, 480, 540, 600, 660, 720].map((y, i) => (
          <ellipse key={i} className="gc-vine" cx={i % 2 === 0 ? 290 : 910} cy={y} rx="5" ry="3" transform={`rotate(${i % 2 === 0 ? -30 : 30}, ${i % 2 === 0 ? 290 : 910}, ${y})`} stroke={`${palette.accent}06`} strokeWidth="0.3" strokeDasharray="500" />
        ))}
      </svg>

      {/* Emerald ambient glow */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 50% 35%, ${palette.accent}06, transparent 70%)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CH4 — SUNLIT JOURNEY ENV (Personal Lunch · Sun-Drenched)
   Hot air balloon, compass rose, sunflower border, travel stamps
   ════════════════════════════════════════════════════════════════ */

function SunlitJourneyEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".sj-balloon", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 3, ease: "power2.out" });
    gsap.fromTo(
      ref.current!.querySelectorAll(".sj-compass"),
      { strokeDashoffset: 400 },
      { strokeDashoffset: 0, duration: 2.5, stagger: 0.2, delay: 1, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".sj-stamp"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, delay: 2.5, ease: "back.out(2)" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Hot air balloon */}
        <g className="sj-balloon">
          <ellipse cx="600" cy="200" rx="70" ry="90" stroke={`${palette.accent}12`} strokeWidth="1" />
          <path d="M530 200 Q600 320 670 200" stroke={`${palette.accent}0d`} strokeWidth="0.6" />
          {/* Balloon stripes */}
          <path d="M545 140 Q600 100 655 140" stroke={`${palette.accent}0a`} strokeWidth="0.4" />
          <path d="M535 170 Q600 130 665 170" stroke={`${palette.accent}08`} strokeWidth="0.4" />
          <path d="M535 230 Q600 270 665 230" stroke={`${palette.accent}08`} strokeWidth="0.4" />
          {/* Basket ropes */}
          <line x1="555" y1="280" x2="580" y2="330" stroke={`${palette.accent}0a`} strokeWidth="0.4" />
          <line x1="645" y1="280" x2="620" y2="330" stroke={`${palette.accent}0a`} strokeWidth="0.4" />
          {/* Basket */}
          <rect x="575" y="330" width="50" height="25" rx="3" stroke={`${palette.accent}0d`} strokeWidth="0.5" />
        </g>

        {/* Compass rose beneath */}
        <g>
          <circle className="sj-compass" cx="600" cy="550" r="80" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="400" />
          <circle className="sj-compass" cx="600" cy="550" r="65" stroke={`${palette.accent}06`} strokeWidth="0.3" strokeDasharray="400" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const a = (angle - 90) * (Math.PI / 180);
            const len = i % 2 === 0 ? 75 : 50;
            return <line key={i} className="sj-compass" x1={600 + Math.cos(a) * 20} y1={550 + Math.sin(a) * 20} x2={600 + Math.cos(a) * len} y2={550 + Math.sin(a) * len} stroke={`${palette.accent}0a`} strokeWidth={i % 2 === 0 ? "0.6" : "0.3"} strokeDasharray="400" />;
          })}
          <path className="sj-compass" d="M600 500 L610 550 L600 600 L590 550 Z" stroke={`${palette.accent}0a`} strokeWidth="0.5" strokeDasharray="400" />
        </g>

        {/* Travel stamp circles */}
        {[{ x: 150, y: 200 }, { x: 1050, y: 300 }, { x: 200, y: 600 }, { x: 1000, y: 650 }].map((s, i) => (
          <g key={i} className="sj-stamp">
            <circle cx={s.x} cy={s.y} r="30" stroke={`${palette.accent}08`} strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx={s.x} cy={s.y} r="25" stroke={`${palette.accent}06`} strokeWidth="0.3" />
          </g>
        ))}

        {/* Sunflower border at bottom */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 100 + i * 140;
          return (
            <g key={i} className="sj-stamp">
              <circle cx={x} cy={770} r="10" fill={`${palette.accent}06`} stroke={`${palette.accent}0a`} strokeWidth="0.4" />
              {Array.from({ length: 8 }, (_, j) => {
                const a = (j * 45) * (Math.PI / 180);
                return <ellipse key={j} cx={x + Math.cos(a) * 14} cy={770 + Math.sin(a) * 14} rx="4" ry="2" transform={`rotate(${j * 45}, ${x + Math.cos(a) * 14}, ${770 + Math.sin(a) * 14})`} fill={`${palette.accent}08`} />;
              })}
            </g>
          );
        })}
      </svg>

      {/* Warm sun glow from top right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px]" style={{ background: `conic-gradient(from 200deg, ${palette.accent}06 0deg, transparent 30deg, ${palette.accent}04 60deg, transparent 90deg)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CH5 — MANDAP COURT ENV (Wedding Ceremony · Mughal Grandeur)
   Mandap pillars, domed canopy, diyas, rangoli, Mughal arch backdrop
   ════════════════════════════════════════════════════════════════ */

function MandapCourtEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".mc-arch"),
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 3, stagger: 0.3, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".mc-pillar"),
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1.5, stagger: 0.2, delay: 1.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".mc-diya"),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, delay: 2.5, ease: "back.out(2)" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".mc-rangoli"),
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 3, stagger: 0.1, delay: 2, ease: "power2.inOut" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Grand Mughal arch backdrop */}
        <path className="mc-arch" d="M200 800 V280 Q200 50 600 15 Q1000 50 1000 280 V800" stroke={`${palette.secondary}12`} strokeWidth="1.5" strokeDasharray="1000" />
        <path className="mc-arch" d="M240 780 V300 Q240 80 600 50 Q960 80 960 300 V780" stroke={`${palette.secondary}0a`} strokeWidth="0.8" strokeDasharray="1000" />

        {/* Mandap pillars */}
        {[380, 500, 700, 820].map((x, i) => (
          <g key={i} className="mc-pillar">
            <rect x={x - 5} y={350} width="10" height="400" fill={`${palette.secondary}08`} stroke={`${palette.secondary}0d`} strokeWidth="0.5" />
            <rect x={x - 8} y={345} width="16" height="10" fill={`${palette.secondary}0a`} />
            <rect x={x - 8} y={745} width="16" height="10" fill={`${palette.secondary}0a`} />
          </g>
        ))}

        {/* Domed canopy */}
        <path className="mc-arch" d="M360 360 Q450 250 600 230 Q750 250 840 360" stroke={`${palette.secondary}10`} strokeWidth="1" strokeDasharray="1000" />
        <path className="mc-arch" d="M380 360 Q480 270 600 255 Q720 270 820 360" stroke={`${palette.secondary}08`} strokeWidth="0.6" strokeDasharray="1000" />
        {/* Scalloped canopy edge */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = 390 + i * 55;
          return <path key={i} className="mc-arch" d={`M${x} 360 Q${x + 15} 350 ${x + 27} 360 Q${x + 40} 350 ${x + 55} 360`} stroke={`${palette.secondary}0a`} strokeWidth="0.4" strokeDasharray="1000" />;
        })}

        {/* Lotus at apex */}
        <g className="mc-arch">
          <circle cx="600" cy="225" r="8" fill={`${palette.secondary}08`} stroke={`${palette.secondary}10`} strokeWidth="0.5" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx="600" cy="210" rx="5" ry="10" transform={`rotate(${i * 45}, 600, 225)`} stroke={`${palette.secondary}08`} strokeWidth="0.3" />
          ))}
        </g>

        {/* Diyas lining the base */}
        {Array.from({ length: 16 }, (_, i) => {
          const x = 200 + i * 55;
          return (
            <g key={i} className="mc-diya">
              <path d={`M${x - 4} 770 Q${x} 760 ${x + 4} 770`} stroke={`${palette.secondary}15`} strokeWidth="0.5" fill={`${palette.secondary}08`} />
              <ellipse cx={x} cy={756} rx="2" ry="4" fill={`${palette.secondary}18`} />
            </g>
          );
        })}

        {/* Rangoli pattern at center bottom */}
        <g>
          <circle className="mc-rangoli" cx="600" cy="700" r="50" stroke={`${palette.secondary}08`} strokeWidth="0.5" strokeDasharray="600" />
          <circle className="mc-rangoli" cx="600" cy="700" r="35" stroke={`${palette.secondary}06`} strokeWidth="0.4" strokeDasharray="600" />
          <circle className="mc-rangoli" cx="600" cy="700" r="20" stroke={`${palette.secondary}08`} strokeWidth="0.3" strokeDasharray="600" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45) * (Math.PI / 180);
            return <line key={i} className="mc-rangoli" x1={600 + Math.cos(a) * 22} y1={700 + Math.sin(a) * 22} x2={600 + Math.cos(a) * 48} y2={700 + Math.sin(a) * 48} stroke={`${palette.secondary}06`} strokeWidth="0.3" strokeDasharray="600" />;
          })}
        </g>
      </svg>

      {/* Deep maroon/gold glow */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 35% at 50% 55%, ${palette.secondary}08, transparent 70%)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CH6 — NEON CARNIVAL ENV (Afterparty · Thrill Theory)
   Roller coaster curves, Ferris wheel, neon sign, starbursts
   ════════════════════════════════════════════════════════════════ */

function NeonCarnivalEnv({ palette }: EnvProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".nc-coaster"),
      { strokeDashoffset: 1200 },
      { strokeDashoffset: 0, duration: 3, stagger: 0.3, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ref.current!.querySelectorAll(".nc-neon"),
      { opacity: 0 },
      { opacity: 1, duration: 0.1, stagger: 0.05, delay: 2, ease: "none", repeat: 3, yoyo: true }
    );
    gsap.to(ref.current!.querySelectorAll(".nc-neon"), { opacity: 1, delay: 2.8 });
    gsap.fromTo(
      ref.current!.querySelectorAll(".nc-burst"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, delay: 2.5, ease: "back.out(3)" }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
        {/* Roller coaster track */}
        <path className="nc-coaster" d="M0 600 Q100 200 250 400 Q400 700 500 300 Q600 100 700 350 Q800 600 900 250 Q1000 100 1100 350 Q1200 500 1200 600" stroke={`${palette.primary}20`} strokeWidth="2" strokeDasharray="1200" />
        <path className="nc-coaster" d="M0 610 Q100 210 250 410 Q400 710 500 310 Q600 110 700 360 Q800 610 900 260 Q1000 110 1100 360 Q1200 510 1200 610" stroke={`${palette.accent}15`} strokeWidth="1" strokeDasharray="1200" />

        {/* Ferris wheel */}
        <g>
          <circle className="nc-coaster" cx="200" cy="350" r="100" stroke={`${palette.primary}15`} strokeWidth="1" strokeDasharray="1200" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45) * (Math.PI / 180);
            return (
              <g key={i}>
                <line className="nc-coaster" x1="200" y1="350" x2={200 + Math.cos(a) * 95} y2={350 + Math.sin(a) * 95} stroke={`${palette.primary}0a`} strokeWidth="0.4" strokeDasharray="1200" />
                <circle className="nc-burst" cx={200 + Math.cos(a) * 95} cy={350 + Math.sin(a) * 95} r="6" stroke={`${palette.accent}15`} strokeWidth="0.4" fill={`${palette.primary}08`} />
              </g>
            );
          })}
          <line x1="200" y1="450" x2="130" y2="600" stroke={`${palette.primary}0d`} strokeWidth="0.8" />
          <line x1="200" y1="450" x2="270" y2="600" stroke={`${palette.primary}0d`} strokeWidth="0.8" />
        </g>

        {/* Neon "ENTER" sign */}
        <g className="nc-neon">
          <rect x="850" y="180" width="200" height="60" rx="5" stroke={`${palette.primary}25`} strokeWidth="1" />
          <rect x="855" y="185" width="190" height="50" rx="3" stroke={`${palette.accent}15`} strokeWidth="0.5" />
          <text x="950" y="218" fill={`${palette.primary}20`} fontSize="24" fontFamily="serif" textAnchor="middle" letterSpacing="8">ENTER</text>
        </g>

        {/* Starbursts */}
        {[{ x: 500, y: 150 }, { x: 1100, y: 500 }, { x: 100, y: 650 }, { x: 750, y: 100 }].map((s, i) => (
          <g key={i} className="nc-burst">
            {Array.from({ length: 6 }, (_, j) => {
              const a = (j * 60) * (Math.PI / 180);
              return <line key={j} x1={s.x} y1={s.y} x2={s.x + Math.cos(a) * 15} y2={s.y + Math.sin(a) * 15} stroke={[palette.primary, palette.accent, palette.secondary][j % 3]} strokeWidth="0.5" />;
            })}
          </g>
        ))}
      </svg>

      {/* Neon glow washes */}
      <motion.div className="absolute top-0 left-0 w-60 h-60" style={{ background: `radial-gradient(circle, ${palette.secondary}08, transparent 70%)` }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-60 h-60" style={{ background: `radial-gradient(circle, ${palette.primary}08, transparent 70%)` }} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   EXPORT — getChapterEnvironment
   ════════════════════════════════════════════════════════════════ */

const ENV_MAP: Record<string, React.FC<EnvProps>> = {
  "first-chapter": TentDrapeEnv,
  "courtyard-edit": PinkArchEnv,
  "midnight-cathedral": GothicCathedralEnv,
  "world-of-our-own": SunlitJourneyEnv,
  "royal-court": MandapCourtEnv,
  "thrill-theory": NeonCarnivalEnv,
};

export function getChapterEnvironment(slug: string): React.FC<EnvProps> | null {
  return ENV_MAP[slug] || null;
}

export type { EnvProps };
