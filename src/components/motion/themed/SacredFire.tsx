"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 4 — The Royal Court (Wedding Ceremony)
 * Sacred Mughal ceremony atmosphere:
 * - Sacred fire flame particles rising from center
 * - Floating diya flames (small gold triangles)
 * - Rose petals floating down softly — more visible
 * - Stronger mandap golden glow pulse
 * - Sanskrit/calligraphy wisps fading in and out
 */

const MANTRA_FRAGMENTS = ["ॐ", "स्वाहा", "सप्तपदी", "मंगलम्", "शुभ", "मंत्र"];

export default function SacredFire() {
  const reduced = useReducedMotion();

  const flames = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        xOffset: -30 + Math.random() * 60,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        size: 3 + Math.random() * 6,
        color: Math.random() > 0.4
          ? `rgba(220,${100 + Math.floor(Math.random() * 80)},20,${0.5 + Math.random() * 0.4})`
          : `rgba(212,175,55,${0.4 + Math.random() * 0.4})`,
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        sway: -25 + Math.random() * 50,
      })),
    []
  );

  const mantras = useMemo(
    () =>
      MANTRA_FRAGMENTS.map((text, i) => ({
        id: i,
        text,
        x: 15 + Math.random() * 70,
        y: 30 + Math.random() * 50,
        delay: i * 3.5 + Math.random() * 2,
        duration: 5 + Math.random() * 3,
      })),
    []
  );

  const diyas = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        delay: i * 1.5 + Math.random() * 2,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Central mandap golden glow pulse — stronger */}
      <motion.div
        className="absolute left-1/2 bottom-[30%] -translate-x-1/2"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(139,26,26,0.06) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sacred fire — flame particles rising from bottom center */}
      {flames.map((f) => (
        <motion.div
          key={`flame-${f.id}`}
          className="absolute rounded-full"
          style={{
            left: `calc(50% + ${f.xOffset}px)`,
            bottom: "25%",
            width: f.size,
            height: f.size * 1.4,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            backgroundColor: f.color,
            boxShadow: `0 0 ${f.size * 3}px ${f.color}`,
          }}
          animate={{
            y: [0, -(80 + Math.random() * 120)],
            x: [0, f.xOffset * 0.3],
            opacity: [0, 0.9, 0.6, 0],
            scale: [0.8, 1.2, 0.5, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating diya flames — gold triangle shapes */}
      {diyas.map((d) => (
        <motion.div
          key={`diya-${d.id}`}
          className="absolute"
          style={{
            left: `${d.x}%`,
            bottom: "15%",
            width: 0,
            height: 0,
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderBottom: "10px solid rgba(212,175,55,0.4)",
            filter: "drop-shadow(0 0 4px rgba(212,175,55,0.3))",
          }}
          animate={{
            y: [0, -(40 + Math.random() * 80)],
            x: [0, -10 + Math.random() * 20],
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.6, 1, 0.8, 0.3],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Rose petals falling — more visible */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "50% 0 50% 0",
            backgroundColor: `rgba(180,40,40,${0.35 + Math.random() * 0.3})`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          animate={{
            y: [0, 1200],
            x: [0, p.sway, -p.sway * 0.5],
            rotate: [p.rotation, p.rotation + 360],
            opacity: [0, 0.7, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sanskrit calligraphy wisps */}
      {mantras.map((m) => (
        <motion.span
          key={`mantra-${m.id}`}
          className="absolute font-serif text-2xl md:text-3xl select-none"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            color: "rgba(212,175,55,0.08)",
          }}
          animate={{
            opacity: [0, 0.12, 0.08, 0],
            y: [0, -30],
            scale: [0.9, 1.1, 1],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {m.text}
        </motion.span>
      ))}

      {/* Warm amber ambient wash from center */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 70%, rgba(139,26,26,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
