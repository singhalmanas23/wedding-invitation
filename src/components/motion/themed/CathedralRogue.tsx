"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 3 — The Midnight Cathedral (Sangeet)
 * "Cathedral Gone Rogue" atmosphere:
 * - Confetti particles bursting from sides
 * - Sweeping spotlight beams
 * - Glitter cascade / musical notes floating upward
 * - Stained-glass color fragments
 */

const CONFETTI_COLORS = [
  "#d4af37", // gold
  "#c9a84c", // warm gold
  "#1a3a2a", // deep green
  "#4ade80", // bright green
  "#f0ead6", // cream
  "#ff6b6b", // coral accent
];

export default function CathedralRogue() {
  const reduced = useReducedMotion();

  const confetti = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
        size: 3 + Math.random() * 6,
        rotation: Math.random() * 720,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        isRect: Math.random() > 0.5,
      })),
    []
  );

  const notes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        size: 14 + Math.random() * 10,
      })),
    []
  );

  const spotlights = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: 20 + i * 30,
        delay: i * 2,
        duration: 6 + i * 2,
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Sweeping spotlight beams */}
      {spotlights.map((s) => (
        <motion.div
          key={`spot-${s.id}`}
          className="absolute top-0"
          style={{
            left: `${s.x}%`,
            width: "2px",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
            transformOrigin: "top center",
          }}
          animate={{
            rotate: [-15, 15, -10, 20, -15],
            opacity: [0.3, 0.6, 0.2, 0.5, 0.3],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wider spotlight cones */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "80px solid transparent",
          borderRight: "80px solid transparent",
          borderTop: "500px solid rgba(212,175,55,0.03)",
        }}
        animate={{ rotate: [-8, 8, -5, 10, -8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Confetti particles */}
      {confetti.map((c) => (
        <motion.div
          key={`confetti-${c.id}`}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: -10,
            width: c.isRect ? c.size : c.size * 0.8,
            height: c.isRect ? c.size * 0.4 : c.size * 0.8,
            borderRadius: c.isRect ? "1px" : "50%",
            backgroundColor: c.color,
          }}
          animate={{
            y: [0, 1200],
            x: [-20 + Math.random() * 40, 20 - Math.random() * 40],
            rotate: [0, c.rotation],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      {/* Floating musical notes */}
      {notes.map((n) => (
        <motion.div
          key={`note-${n.id}`}
          className="absolute"
          style={{
            left: `${n.x}%`,
            bottom: "5%",
            fontSize: n.size,
            color: "rgba(212,175,55,0.25)",
          }}
          animate={{
            y: [0, -600],
            x: [0, -20 + Math.random() * 40],
            opacity: [0, 0.4, 0.3, 0],
            rotate: [-10, 10, -5],
          }}
          transition={{
            duration: n.duration,
            delay: n.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♪
        </motion.div>
      ))}

      {/* Glitter cascade */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`glitter-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            backgroundColor: "#d4af37",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stained glass color wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 0deg at 50% 0%, rgba(212,175,55,0.03) 0deg, rgba(26,58,42,0.04) 120deg, rgba(201,168,76,0.03) 240deg, rgba(212,175,55,0.03) 360deg)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
