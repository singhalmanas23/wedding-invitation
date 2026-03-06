"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 6 — The Thrill Theory (Afterparty)
 * "Psychedelic abandoned amusement park" atmosphere:
 * - Neon color flickers and glitches
 * - Roller coaster "whoosh" trails (curved neon lines)
 * - Stronger strobe effect
 * - Neon sign letter outlines
 * - Electric sparks
 * - Chaotic, energetic, rebellious
 */

const NEON_COLORS = [
  "#ff006e", // hot pink
  "#8338ec", // purple
  "#00f5d4", // cyan
  "#ffbe0b", // yellow
  "#3a86ff", // electric blue
];

export default function NeonCarnival() {
  const reduced = useReducedMotion();

  const sparks = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 0.3 + Math.random() * 1.5,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      })),
    []
  );

  const glitchBars = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        y: Math.random() * 100,
        width: 20 + Math.random() * 60,
        height: 1 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 0.1 + Math.random() * 0.2,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      })),
    []
  );

  const neonLines = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        angle: Math.random() * 360,
        length: 100 + Math.random() * 200,
        delay: i * 1.5 + Math.random() * 2,
        duration: 3 + Math.random() * 4,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      })),
    []
  );

  const whooshTrails = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        startX: Math.random() * 60,
        startY: 20 + Math.random() * 60,
        curve: 100 + Math.random() * 200,
        delay: i * 3 + Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Psychedelic color wash — rotating gradients */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, #ff006e, #8338ec, #00f5d4, #ffbe0b, #3a86ff, #ff006e)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Strobe pulse — stronger */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0.03, 0, 0, 0.04, 0, 0, 0, 0.02, 0, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Roller coaster whoosh trails */}
      {whooshTrails.map((w) => (
        <motion.svg
          key={`whoosh-${w.id}`}
          className="absolute"
          style={{
            left: `${w.startX}%`,
            top: `${w.startY}%`,
            width: 300,
            height: 150,
          }}
          viewBox="0 0 300 150"
          fill="none"
        >
          <motion.path
            d={`M0 75 Q75 ${75 - w.curve * 0.5} 150 75 Q225 ${75 + w.curve * 0.5} 300 75`}
            stroke={w.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            filter={`drop-shadow(0 0 6px ${w.color}60)`}
            strokeDasharray="300"
            animate={{
              strokeDashoffset: [300, 0, -300],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: w.duration,
              delay: w.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      ))}

      {/* Neon line traces */}
      {neonLines.map((l) => (
        <motion.div
          key={`line-${l.id}`}
          className="absolute"
          style={{
            left: `${l.x1}%`,
            top: `${l.y1}%`,
            width: l.length,
            height: 1,
            background: `linear-gradient(to right, transparent, ${l.color}80, ${l.color}, ${l.color}80, transparent)`,
            transform: `rotate(${l.angle}deg)`,
            transformOrigin: "left center",
            boxShadow: `0 0 10px ${l.color}40, 0 0 20px ${l.color}20`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Electric sparks — rapid flicker points */}
      {sparks.map((s) => (
        <motion.div
          key={`spark-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 4}px ${s.color}, 0 0 ${s.size * 8}px ${s.color}60`,
          }}
          animate={{
            opacity: [0, 1, 0, 0.8, 0, 0, 1, 0],
            scale: [0, 1.5, 0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Glitch bars — horizontal scan lines */}
      {glitchBars.map((g) => (
        <motion.div
          key={`glitch-${g.id}`}
          className="absolute left-0"
          style={{
            top: `${g.y}%`,
            width: `${g.width}%`,
            height: g.height,
            backgroundColor: `${g.color}30`,
            boxShadow: `0 0 10px ${g.color}20`,
          }}
          animate={{
            opacity: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            x: [0, 10, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: g.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Neon sign letter outlines */}
      <motion.svg
        className="absolute top-[15%] right-[10%] w-32 h-12 md:w-48 md:h-16"
        viewBox="0 0 200 50"
        fill="none"
      >
        <motion.text
          x="100"
          y="35"
          textAnchor="middle"
          fontSize="28"
          fontFamily="serif"
          letterSpacing="6"
          stroke="#ff006e"
          strokeWidth="0.8"
          fill="none"
          filter="drop-shadow(0 0 8px #ff006e60)"
          animate={{
            opacity: [0, 0, 0.4, 0, 0.5, 0.4, 0, 0.5, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          PLAY
        </motion.text>
      </motion.svg>

      {/* Neon glow corners */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(131,56,236,0.1) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40"
        style={{
          background: "radial-gradient(circle at 100% 100%, rgba(255,0,110,0.1) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
