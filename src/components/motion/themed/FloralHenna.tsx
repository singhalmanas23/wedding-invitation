"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 1 — The Courtyard Edit (Lunch)
 * "Victorian Hi-Tea / Jaipur Haveli" atmosphere:
 * - Falling flower petals (pastel blush, lavender, sage)
 * - Wisteria-like cascading petal chains
 * - Henna/mehndi line-art patterns tracing at screen edges
 * - Soft jasmine-scented light drifts
 */

const PETAL_COLORS = [
  "rgba(212,165,165,0.6)",  // blush
  "rgba(200,180,210,0.5)",  // lavender
  "rgba(180,200,170,0.4)",  // sage
  "rgba(245,230,211,0.5)",  // cream
  "rgba(201,149,107,0.4)",  // warm gold
];

const HENNA_PATH_1 = "M0,50 Q25,0 50,50 Q75,100 100,50";
const HENNA_PATH_2 = "M10,0 Q30,30 10,60 Q-10,90 10,100";
const HENNA_PATH_3 = "M0,20 C20,20 20,40 0,40 C-20,40 -20,60 0,60";

export default function FloralHenna() {
  const reduced = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 6 + Math.random() * 8,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotEnd: Math.random() * 360 + 180,
        sway: -30 + Math.random() * 60,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      })),
    []
  );

  const wisteriaChains = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        delay: i * 3 + Math.random() * 2,
        duration: 12 + Math.random() * 6,
        count: 4 + Math.floor(Math.random() * 4),
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Falling petals */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            borderRadius: "50% 0 50% 0",
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, window?.innerHeight ? window.innerHeight + 100 : 1200],
            x: [0, p.sway, -p.sway * 0.5, p.sway * 0.3],
            rotate: [p.rotation, p.rotEnd],
            opacity: [0, 0.8, 0.8, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wisteria cascading petal chains */}
      {wisteriaChains.map((chain) => (
        <motion.div
          key={`wist-${chain.id}`}
          className="absolute"
          style={{ left: `${chain.x}%`, top: -10 }}
          animate={{
            y: [0, 1400],
            x: [0, 15, -10, 5],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: chain.duration,
            delay: chain.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {Array.from({ length: chain.count }, (_, j) => (
            <div
              key={j}
              className="rounded-full mb-1"
              style={{
                width: 5 - j * 0.4,
                height: 5 - j * 0.4,
                backgroundColor: `rgba(212,165,165,${0.5 - j * 0.08})`,
                marginLeft: (j % 2) * 3,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Henna line-art tracing — left edge */}
      <svg
        className="absolute left-0 top-0 h-full w-20 md:w-32 opacity-[0.08]"
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        fill="none"
        stroke="#c9956b"
        strokeWidth="1"
      >
        <motion.path
          d={HENNA_PATH_1}
          strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          transform="translate(20, 50) scale(0.8, 3)"
        />
        <motion.path
          d={HENNA_PATH_2}
          strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }}
          transition={{ duration: 10, delay: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          transform="translate(40, 150) scale(0.6, 2)"
        />
        <motion.circle
          cx="30" cy="300" r="15"
          strokeDasharray="100"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 6, delay: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </svg>

      {/* Henna line-art tracing — right edge */}
      <svg
        className="absolute right-0 top-0 h-full w-20 md:w-32 opacity-[0.08]"
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        fill="none"
        stroke="#d4a5a5"
        strokeWidth="1"
      >
        <motion.path
          d={HENNA_PATH_3}
          strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }}
          transition={{ duration: 9, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          transform="translate(50, 80) scale(0.8, 2.5)"
        />
        <motion.path
          d={HENNA_PATH_1}
          strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }}
          transition={{ duration: 7, delay: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          transform="translate(30, 220) scale(0.7, 2)"
        />
      </svg>

      {/* Paisley/mandala fragments drifting */}
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={`mandala-${i}`}
          className="absolute opacity-[0.04]"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          stroke="#c9956b"
          strokeWidth="0.5"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="40" cy="40" r="35" />
          <circle cx="40" cy="40" r="25" />
          <circle cx="40" cy="40" r="15" />
          <path d="M40 5 Q55 20 40 40 Q25 20 40 5" />
          <path d="M75 40 Q60 55 40 40 Q60 25 75 40" />
          <path d="M40 75 Q25 60 40 40 Q55 60 40 75" />
          <path d="M5 40 Q20 25 40 40 Q20 55 5 40" />
        </motion.svg>
      ))}
    </div>
  );
}
