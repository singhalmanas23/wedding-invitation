"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChapterPalette } from "@/types";

interface DecorationProps {
  palette: ChapterPalette;
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 1 — THE FIRST CHAPTER (Welcome Dinner · Dusk Till Dawn)
   Twilight sunset arc, candelabra silhouettes, rising stars
   ════════════════════════════════════════════════════════════════════ */

function DuskSunsetHero({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 800 400"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-[0.08]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="400" cy="400" r="120"
          stroke={palette.accent}
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
        />
        <motion.circle
          cx="400" cy="400" r="160"
          stroke={palette.accent}
          strokeWidth="0.4"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1.5 }}
        />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 15 - 82.5) * (Math.PI / 180);
          const x1 = 400 + Math.cos(angle) * 130;
          const y1 = 400 + Math.sin(angle) * 130;
          const x2 = 400 + Math.cos(angle) * 250;
          const y2 = 400 + Math.sin(angle) * 250;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={palette.accent}
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 2 + i * 0.1 }}
            />
          );
        })}
        <motion.line
          x1="50" y1="400" x2="750" y2="400"
          stroke={palette.accent}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
      {/* Stars appearing */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${15 + i * 10}%`,
            top: `${10 + (i % 4) * 8}%`,
            backgroundColor: palette.accent,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0.3, 0.6], scale: 1 }}
          transition={{ duration: 2, delay: 3 + i * 0.3, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </div>
  );
}

function DuskDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to right, transparent, ${palette.accent}30)` }} />
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ opacity: 0.4 }}>
        <path d="M20 2 L20 8 M18 8 Q20 12 22 8 M16 14 Q20 20 24 14" stroke={palette.accent} strokeWidth="0.8" />
        <circle cx="20" cy="22" r="1.5" fill={palette.accent} fillOpacity={0.5} />
      </svg>
      <div className="h-px w-16 md:w-28" style={{ background: `linear-gradient(to left, transparent, ${palette.accent}30)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 2 — THE COURTYARD EDIT (Victorian Hi-Tea · Haveli)
   Jharokha window arch, jasmine garlands, haveli lattice
   ════════════════════════════════════════════════════════════════════ */

function JharokhaHero({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        className="absolute w-[80%] max-w-lg h-auto opacity-[0.06]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M60 500 V220 Q60 80 200 30 Q340 80 340 220 V500"
          stroke={palette.accent}
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.8 }}
        />
        <motion.path
          d="M85 480 V235 Q85 110 200 65 Q315 110 315 235 V480"
          stroke={palette.accent}
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.2 }}
        />
        {/* Scalloped inner arch */}
        <motion.path
          d="M110 460 V250 Q110 160 155 120 Q175 100 200 95 Q225 100 245 120 Q290 160 290 250 V460"
          stroke={palette.accent}
          strokeWidth="0.4"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 1.6 }}
        />
        {/* Lattice jali pattern */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.ellipse
            key={i}
            cx={140 + i * 30}
            cy="440"
            rx="8"
            ry="12"
            stroke={palette.accent}
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.5 + i * 0.15 }}
          />
        ))}
        {/* Decorative apex */}
        <motion.circle cx="200" cy="35" r="8" stroke={palette.accent} strokeWidth="0.5"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, type: "spring" }} />
        <motion.path d="M192 35 Q200 20 208 35" stroke={palette.accent} strokeWidth="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5, duration: 1 }} />
      </svg>
      {/* Floating jasmine petals */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 6,
            height: 4,
            borderRadius: "50% 0 50% 0",
            backgroundColor: `${palette.accent}25`,
            left: `${20 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 10, -5, 0],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6 + i, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function JasmineDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <div className="h-px w-12 md:w-20" style={{ background: `linear-gradient(to right, transparent, ${palette.accent}25)` }} />
      <svg width="80" height="16" viewBox="0 0 80 16" fill="none" style={{ opacity: 0.35 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <circle cx={8 + i * 16} cy="8" r="4" stroke={palette.accent} strokeWidth="0.5" />
            <circle cx={8 + i * 16} cy="8" r="1.5" fill={palette.accent} fillOpacity={0.4} />
            {i < 4 && <line x1={12 + i * 16} y1="8" x2={20 + i * 16} y2="8" stroke={palette.accent} strokeWidth="0.3" strokeDasharray="2 2" />}
          </g>
        ))}
      </svg>
      <div className="h-px w-12 md:w-20" style={{ background: `linear-gradient(to left, transparent, ${palette.accent}25)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 3 — THE MIDNIGHT CATHEDRAL (Sangeet · Cathedral Gone Rogue)
   Gothic arch, rose window, musical elements
   ════════════════════════════════════════════════════════════════════ */

function CathedralHero({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 400 600"
        className="absolute w-[70%] max-w-md h-auto opacity-[0.06]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pointed gothic arch */}
        <motion.path
          d="M70 600 V280 Q70 120 200 20 Q330 120 330 280 V600"
          stroke={palette.accent}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }}
        />
        {/* Rose window */}
        <motion.circle
          cx="200" cy="200" r="70"
          stroke={palette.accent}
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        {/* Rose window inner geometry */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          return (
            <motion.line
              key={i}
              x1={200 + Math.cos(angle) * 30}
              y1={200 + Math.sin(angle) * 30}
              x2={200 + Math.cos(angle) * 68}
              y2={200 + Math.sin(angle) * 68}
              stroke={palette.accent}
              strokeWidth="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2 + i * 0.1 }}
            />
          );
        })}
        <motion.circle cx="200" cy="200" r="35" stroke={palette.accent} strokeWidth="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }} />
        <motion.circle cx="200" cy="200" r="12" fill={palette.accent} fillOpacity={0.08}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.8, type: "spring" }} />
        {/* Vertical mullions */}
        <motion.line x1="200" y1="270" x2="200" y2="500" stroke={palette.accent} strokeWidth="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }} />
      </svg>
      {/* Floating music notes */}
      {["♪", "♫", "♩", "♬"].map((note, i) => (
        <motion.span
          key={i}
          className="absolute text-xl md:text-2xl select-none"
          style={{
            color: palette.accent,
            left: `${15 + i * 22}%`,
            bottom: "20%",
            opacity: 0,
          }}
          animate={{
            y: [0, -120 - i * 40],
            opacity: [0, 0.15, 0.1, 0],
            rotate: [-10, 10, -5],
          }}
          transition={{ duration: 8 + i * 2, delay: 3 + i * 1.5, repeat: Infinity, ease: "easeOut" }}
        >
          {note}
        </motion.span>
      ))}
    </div>
  );
}

function MusicDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-14 md:w-24" style={{ background: `linear-gradient(to right, transparent, ${palette.accent}30)` }} />
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" style={{ opacity: 0.4 }}>
        <line x1="0" y1="10" x2="60" y2="10" stroke={palette.accent} strokeWidth="0.3" />
        <circle cx="15" cy="10" r="3" fill={palette.accent} fillOpacity={0.3} />
        <line x1="18" y1="10" x2="18" y2="3" stroke={palette.accent} strokeWidth="0.5" />
        <circle cx="40" cy="10" r="3" fill={palette.accent} fillOpacity={0.3} />
        <line x1="43" y1="10" x2="43" y2="3" stroke={palette.accent} strokeWidth="0.5" />
        <line x1="43" y1="3" x2="18" y2="3" stroke={palette.accent} strokeWidth="0.5" />
      </svg>
      <div className="h-px w-14 md:w-24" style={{ background: `linear-gradient(to left, transparent, ${palette.accent}30)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 4 — A WORLD OF OUR OWN (Personal Lunch · Sun-Drenched)
   Compass rose, olive branches, sunbeam rays, travel motifs
   ════════════════════════════════════════════════════════════════════ */

function CompassHero({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="absolute w-[60%] max-w-sm h-auto opacity-[0.06]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <motion.circle cx="200" cy="200" r="170" stroke={palette.accent} strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.8 }} />
        <motion.circle cx="200" cy="200" r="155" stroke={palette.accent} strokeWidth="0.3" strokeDasharray="2 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1.2 }} />
        {/* Cardinal points */}
        {[0, 90, 180, 270].map((angle, i) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const labels = ["N", "E", "S", "W"];
          return (
            <motion.g key={angle}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 + i * 0.3 }}>
              <line
                x1={200 + Math.cos(rad) * 120}
                y1={200 + Math.sin(rad) * 120}
                x2={200 + Math.cos(rad) * 165}
                y2={200 + Math.sin(rad) * 165}
                stroke={palette.accent}
                strokeWidth="0.6"
              />
              <text
                x={200 + Math.cos(rad) * 185}
                y={200 + Math.sin(rad) * 185 + 4}
                fill={palette.accent}
                fontSize="10"
                textAnchor="middle"
                fontFamily="serif"
                opacity={0.6}
              >
                {labels[i]}
              </text>
            </motion.g>
          );
        })}
        {/* Ordinal lines */}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle - 90) * (Math.PI / 180);
          return (
            <motion.line key={angle}
              x1={200 + Math.cos(rad) * 80}
              y1={200 + Math.sin(rad) * 80}
              x2={200 + Math.cos(rad) * 150}
              y2={200 + Math.sin(rad) * 150}
              stroke={palette.accent} strokeWidth="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
          );
        })}
        {/* Center diamond */}
        <motion.path d="M200 170 L215 200 L200 230 L185 200 Z" stroke={palette.accent} strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5 }} />
        <motion.circle cx="200" cy="200" r="5" fill={palette.accent} fillOpacity={0.15}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3, type: "spring" }} />
      </svg>
      {/* Sun rays from top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px]"
        style={{
          background: `conic-gradient(from 200deg, ${palette.accent}08 0deg, transparent 25deg, ${palette.accent}05 50deg, transparent 75deg, ${palette.accent}06 100deg, transparent 130deg)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
  );
}

function OliveBranchDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none" style={{ opacity: 0.3 }}>
        <line x1="10" y1="10" x2="110" y2="10" stroke={palette.accent} strokeWidth="0.4" />
        {Array.from({ length: 5 }, (_, i) => {
          const x = 20 + i * 20;
          const side = i % 2 === 0 ? -1 : 1;
          return (
            <ellipse key={i} cx={x} cy={10 + side * 5} rx="6" ry="3"
              transform={`rotate(${side * 30}, ${x}, ${10 + side * 5})`}
              stroke={palette.accent} strokeWidth="0.4" />
          );
        })}
        <circle cx="60" cy="10" r="2" fill={palette.accent} fillOpacity={0.4} />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 5 — THE ROYAL COURT (Wedding Ceremony · Mughal Grandeur)
   Mandap arch, sacred lotus, kalash, Sanskrit mantras
   ════════════════════════════════════════════════════════════════════ */

function MandapHero({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 500 600"
        className="absolute w-[85%] max-w-xl h-auto opacity-[0.07]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grand Mughal arch */}
        <motion.path
          d="M60 600 V260 Q60 80 250 20 Q440 80 440 260 V600"
          stroke={palette.secondary}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />
        <motion.path
          d="M90 580 V275 Q90 110 250 55 Q410 110 410 275 V580"
          stroke={palette.secondary}
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1 }}
        />
        {/* Lotus at apex */}
        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, type: "spring" }} style={{ transformOrigin: "250px 30px" }}>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = i * 45;
            return (
              <ellipse key={i} cx="250" cy="10" rx="10" ry="5"
                transform={`rotate(${angle}, 250, 30)`}
                stroke={palette.secondary} strokeWidth="0.5" />
            );
          })}
          <circle cx="250" cy="30" r="5" fill={palette.secondary} fillOpacity={0.15} />
        </motion.g>
        {/* Kalash on top */}
        <motion.path
          d="M242 -5 Q250 -15 258 -5 M245 -5 L255 -5 M248 -5 L248 -10 Q250 -12 252 -10 L252 -5"
          stroke={palette.secondary}
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3 }}
          transform="translate(0, 15)"
        />
        {/* Decorative inner scallops */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.ellipse
            key={i}
            cx={180 + i * 35}
            cy="520"
            rx="12"
            ry="20"
            stroke={palette.secondary}
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2 + i * 0.2 }}
          />
        ))}
        {/* Sacred fire at base */}
        <motion.path
          d="M230 580 Q240 560 250 540 Q260 560 270 580"
          stroke={palette.primary}
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        />
      </svg>
      {/* Floating Sanskrit mantras */}
      {["ॐ", "स्वाहा", "मंगलम्", "सप्तपदी"].map((text, i) => (
        <motion.span
          key={i}
          className="absolute font-serif text-xl md:text-2xl select-none"
          style={{
            color: palette.secondary,
            left: `${10 + i * 25}%`,
            top: `${20 + (i % 2) * 55}%`,
          }}
          animate={{
            opacity: [0, 0.08, 0.05, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 6 + i * 2, delay: 3 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
}

function SacredFireDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-14 md:w-24" style={{ background: `linear-gradient(to right, transparent, ${palette.secondary}30)` }} />
      <svg width="50" height="30" viewBox="0 0 50 30" fill="none" style={{ opacity: 0.35 }}>
        <path d="M25 28 Q20 18 25 5 Q30 18 25 28Z" stroke={palette.primary} strokeWidth="0.8" fill={`${palette.primary}15`} />
        <path d="M25 28 Q22 20 25 12 Q28 20 25 28Z" stroke={palette.secondary} strokeWidth="0.5" fill={`${palette.secondary}10`} />
        <circle cx="25" cy="28" r="1.5" fill={palette.secondary} fillOpacity={0.5} />
        {/* Small sparks */}
        <circle cx="18" cy="15" r="1" fill={palette.secondary} fillOpacity={0.3} />
        <circle cx="32" cy="12" r="0.8" fill={palette.secondary} fillOpacity={0.2} />
      </svg>
      <div className="h-px w-14 md:w-24" style={{ background: `linear-gradient(to left, transparent, ${palette.secondary}30)` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER 6 — THE THRILL THEORY (Afterparty · Neon Carnival)
   Ferris wheel, neon signs, carnival chaos
   ════════════════════════════════════════════════════════════════════ */

function FerrisWheelHero({ palette }: DecorationProps) {
  const gondolas = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const angle = (i * 36 - 90) * (Math.PI / 180);
    return {
      cx: 200 + Math.cos(angle) * 130,
      cy: 200 + Math.sin(angle) * 130,
    };
  }), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <motion.svg
        viewBox="0 0 400 420"
        className="absolute w-[65%] max-w-sm h-auto opacity-[0.07]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx="200" cy="200" r="135" stroke={palette.primary} strokeWidth="1" />
        <circle cx="200" cy="200" r="130" stroke={palette.accent} strokeWidth="0.3" />
        {/* Spokes */}
        {gondolas.map((g, i) => (
          <line key={i} x1="200" y1="200" x2={g.cx} y2={g.cy} stroke={palette.primary} strokeWidth="0.4" />
        ))}
        {/* Gondola pods */}
        {gondolas.map((g, i) => (
          <circle key={`pod-${i}`} cx={g.cx} cy={g.cy} r="6" stroke={palette.primary} strokeWidth="0.5"
            fill={`${palette.primary}10`} />
        ))}
        <circle cx="200" cy="200" r="10" stroke={palette.accent} strokeWidth="0.6" fill={`${palette.accent}15`} />
      </motion.svg>
      {/* Static support legs */}
      <svg
        viewBox="0 0 400 420"
        className="absolute w-[65%] max-w-sm h-auto opacity-[0.05]"
        fill="none"
      >
        <line x1="200" y1="340" x2="120" y2="420" stroke={palette.primary} strokeWidth="1" />
        <line x1="200" y1="340" x2="280" y2="420" stroke={palette.primary} strokeWidth="1" />
        <line x1="120" y1="420" x2="280" y2="420" stroke={palette.primary} strokeWidth="0.5" />
      </svg>
      {/* Neon flicker accents */}
      {["#ff006e", "#8338ec", "#00f5d4", "#ffbe0b"].map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3,
            height: 3,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
            left: `${20 + i * 20}%`,
            top: `${25 + (i % 3) * 20}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0, 0.5, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{ duration: 1.5 + i * 0.5, delay: i * 0.8, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function NeonDivider({ palette }: DecorationProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <motion.div
        className="h-px w-20 md:w-32"
        style={{ background: `linear-gradient(to right, transparent, ${palette.primary}, ${palette.accent}, transparent)` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: palette.primary, boxShadow: `0 0 8px ${palette.primary}` }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-px w-20 md:w-32"
        style={{ background: `linear-gradient(to left, transparent, ${palette.accent}, ${palette.primary}, transparent)` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER-SPECIFIC STORY ACCENTS
   Themed background elements for the story section
   ════════════════════════════════════════════════════════════════════ */

function DuskStoryAccent({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${palette.accent}06, transparent)` }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CourtyardStoryAccent({ palette }: DecorationProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating flower petals in story */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 5,
            height: 3,
            borderRadius: "50% 0 50% 0",
            backgroundColor: `${palette.primary}20`,
            right: `${5 + i * 8}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{ y: [0, 100], x: [-10, 15], rotate: [0, 180], opacity: [0.4, 0] }}
          transition={{ duration: 8 + i * 2, delay: i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CeremonyStoryAccent({ palette }: DecorationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${palette.secondary}05 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CHAPTER-SPECIFIC CULTURAL HEADER TEXT
   Thematic text shown above the story section
   ════════════════════════════════════════════════════════════════════ */

const CULTURAL_HEADERS: Record<string, { text: string; script?: string }> = {
  "first-chapter": {
    text: "Where sunset meets the start of forever",
    script: "शुभारम्भ",
  },
  "courtyard-edit": {
    text: "Elegance whispered through arched doorways",
    script: "अतिथि देवो भव",
  },
  "midnight-cathedral": {
    text: "When the cathedral lets the wild take over",
  },
  "world-of-our-own": {
    text: "Every city, every memory, one afternoon",
  },
  "royal-court": {
    text: "Where heritage meets the eternal vow",
    script: "शुभ विवाह",
  },
  "thrill-theory": {
    text: "Step inside. Get lost. Don't look back.",
  },
};

/* ════════════════════════════════════════════════════════════════════
   EDGE ORNAMENTS — Themed side decorations
   Appear on left/right edges of the page
   ════════════════════════════════════════════════════════════════════ */

function EdgeOrnaments({ slug, palette }: { slug: string; palette: ChapterPalette }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  if (slug === "royal-court") {
    return (
      <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[1]">
        <svg className="absolute left-0 top-0 h-full w-8 md:w-14 opacity-[0.04]" viewBox="0 0 50 1000" fill="none" preserveAspectRatio="none">
          <path d="M25 0 Q40 50 25 100 Q10 150 25 200 Q40 250 25 300 Q10 350 25 400 Q40 450 25 500 Q10 550 25 600 Q40 650 25 700 Q10 750 25 800 Q40 850 25 900 Q10 950 25 1000"
            stroke={palette.secondary} strokeWidth="1" />
        </svg>
        <svg className="absolute right-0 top-0 h-full w-8 md:w-14 opacity-[0.04]" viewBox="0 0 50 1000" fill="none" preserveAspectRatio="none">
          <path d="M25 0 Q10 50 25 100 Q40 150 25 200 Q10 250 25 300 Q40 350 25 400 Q10 450 25 500 Q40 550 25 600 Q10 650 25 700 Q40 750 25 800 Q10 850 25 900 Q40 950 25 1000"
            stroke={palette.secondary} strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (slug === "courtyard-edit") {
    return (
      <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[1]">
        {/* Delicate vertical floral vines */}
        <svg className="absolute left-2 top-0 h-full w-6 md:w-10 opacity-[0.04]" viewBox="0 0 30 800" fill="none" preserveAspectRatio="none">
          <path d="M15 0 L15 800" stroke={palette.accent} strokeWidth="0.5" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 8 : 22} cy={50 + i * 100} rx="6" ry="3"
              transform={`rotate(${i % 2 === 0 ? -30 : 30}, ${i % 2 === 0 ? 8 : 22}, ${50 + i * 100})`}
              stroke={palette.accent} strokeWidth="0.4" />
          ))}
        </svg>
      </div>
    );
  }

  if (slug === "midnight-cathedral") {
    return (
      <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[1]">
        {/* Stained glass vertical strips */}
        <motion.div
          className="absolute left-0 top-0 w-1 h-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${palette.accent}10, ${palette.secondary}08, transparent)` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 top-0 w-1 h-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${palette.secondary}10, ${palette.accent}08, transparent)` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>
    );
  }

  return null;
}

/* ════════════════════════════════════════════════════════════════════
   MAIN EXPORT — getChapterDecorations
   ════════════════════════════════════════════════════════════════════ */

export interface ChapterDecorPack {
  HeroDecoration: React.FC<DecorationProps>;
  SectionDivider: React.FC<DecorationProps>;
  StoryAccent: React.FC<DecorationProps>;
  culturalHeader: { text: string; script?: string };
}

const DECOR_MAP: Record<string, ChapterDecorPack> = {
  "first-chapter": {
    HeroDecoration: DuskSunsetHero,
    SectionDivider: DuskDivider,
    StoryAccent: DuskStoryAccent,
    culturalHeader: CULTURAL_HEADERS["first-chapter"],
  },
  "courtyard-edit": {
    HeroDecoration: JharokhaHero,
    SectionDivider: JasmineDivider,
    StoryAccent: CourtyardStoryAccent,
    culturalHeader: CULTURAL_HEADERS["courtyard-edit"],
  },
  "midnight-cathedral": {
    HeroDecoration: CathedralHero,
    SectionDivider: MusicDivider,
    StoryAccent: DuskStoryAccent,
    culturalHeader: CULTURAL_HEADERS["midnight-cathedral"],
  },
  "world-of-our-own": {
    HeroDecoration: CompassHero,
    SectionDivider: OliveBranchDivider,
    StoryAccent: DuskStoryAccent,
    culturalHeader: CULTURAL_HEADERS["world-of-our-own"],
  },
  "royal-court": {
    HeroDecoration: MandapHero,
    SectionDivider: SacredFireDivider,
    StoryAccent: CeremonyStoryAccent,
    culturalHeader: CULTURAL_HEADERS["royal-court"],
  },
  "thrill-theory": {
    HeroDecoration: FerrisWheelHero,
    SectionDivider: NeonDivider,
    StoryAccent: DuskStoryAccent,
    culturalHeader: CULTURAL_HEADERS["thrill-theory"],
  },
};

const FALLBACK: ChapterDecorPack = {
  HeroDecoration: DuskSunsetHero,
  SectionDivider: DuskDivider,
  StoryAccent: DuskStoryAccent,
  culturalHeader: { text: "" },
};

export function getChapterDecorations(slug: string): ChapterDecorPack {
  return DECOR_MAP[slug] || FALLBACK;
}

export { EdgeOrnaments };
