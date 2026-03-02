"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 4 — A World of Our Own (Lunch)
 * "Sun-drenched courtyard" atmosphere:
 * - Warm dust motes floating in sunlight
 * - Drifting olive/eucalyptus leaves
 * - Soft golden light rays from top-right
 * - Gentle warmth particles
 */

export default function SunlitJourney() {
  const reduced = useReducedMotion();

  const dustMotes = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 12,
        driftX: -15 + Math.random() * 30,
        driftY: -15 + Math.random() * 30,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    []
  );

  const leaves = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: i * 3 + Math.random() * 2,
        duration: 10 + Math.random() * 8,
        rotation: Math.random() * 360,
        sway: -40 + Math.random() * 80,
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Golden sunlight rays from top-right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[600px] h-[600px]"
        style={{
          background: "conic-gradient(from 200deg, rgba(196,168,130,0.08) 0deg, transparent 30deg, rgba(196,168,130,0.05) 60deg, transparent 90deg, rgba(196,168,130,0.06) 120deg, transparent 150deg)",
        }}
        animate={{ rotate: [0, 5, -3, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary warm glow */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse 40% 60% at 85% 15%, rgba(196,168,130,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dust motes floating in sunlight */}
      {dustMotes.map((d) => (
        <motion.div
          key={`dust-${d.id}`}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            backgroundColor: `rgba(196,168,130,${d.opacity})`,
            boxShadow: `0 0 ${d.size * 3}px rgba(196,168,130,${d.opacity * 0.3})`,
          }}
          animate={{
            x: [0, d.driftX, -d.driftX * 0.5, d.driftX * 0.7, 0],
            y: [0, d.driftY, -d.driftY * 0.3, d.driftY * 0.5, 0],
            opacity: [d.opacity * 0.5, d.opacity, d.opacity * 0.7, d.opacity, d.opacity * 0.5],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Drifting leaves */}
      {leaves.map((l) => (
        <motion.div
          key={`leaf-${l.id}`}
          className="absolute"
          style={{
            left: `${l.x}%`,
            top: -30,
          }}
        >
          <motion.svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="opacity-[0.15]"
            animate={{
              y: [0, 1200],
              x: [0, l.sway, -l.sway * 0.5, l.sway * 0.3],
              rotate: [l.rotation, l.rotation + 360],
            }}
            transition={{
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M8 0 C12 4 14 10 14 16 C14 20 12 24 8 24 C4 24 2 20 2 16 C2 10 4 4 8 0Z"
              fill="#8b7355"
            />
            <path d="M8 2 L8 22" stroke="#6b5a42" strokeWidth="0.5" />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
