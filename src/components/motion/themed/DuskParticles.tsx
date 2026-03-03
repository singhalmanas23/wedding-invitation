"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Chapter 1 — The First Chapter (Welcome Dinner)
 * "From Dusk Till Dawn" atmosphere:
 * - Warm candlelight flickers (amber/gold glowing dots)
 * - Drifting embers rising slowly
 * - Golden feather shapes drifting down
 * - Soft pulsing warm light pools
 */
export default function DuskParticles() {
  const reduced = useReducedMotion();

  const embers = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 8,
        drift: -20 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  );

  const candles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 8 + Math.random() * 84,
        y: 70 + Math.random() * 25,
        size: 30 + Math.random() * 50,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  const feathers = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: i * 2 + Math.random() * 3,
        duration: 10 + Math.random() * 8,
        rotation: Math.random() * 60 - 30,
        rotEnd: Math.random() * 120 + 60,
        sway: -30 + Math.random() * 60,
      })),
    []
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Warm candlelight glow pools */}
      {candles.map((c) => (
        <motion.div
          key={`candle-${c.id}`}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            background: "radial-gradient(circle, rgba(232,201,122,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
            scale: [1, 1.2, 0.95, 1.15, 1],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rising embers */}
      {embers.map((e) => (
        <motion.div
          key={`ember-${e.id}`}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: `${100 - e.y}%`,
            width: e.size,
            height: e.size,
            background: `radial-gradient(circle, rgba(232,180,80,${e.opacity}) 0%, rgba(200,140,40,${e.opacity * 0.3}) 60%, transparent 100%)`,
            boxShadow: `0 0 ${e.size * 2}px rgba(232,180,80,${e.opacity * 0.4})`,
          }}
          animate={{
            y: [0, -(150 + Math.random() * 200)],
            x: [0, e.drift],
            opacity: [0, e.opacity, e.opacity * 0.8, 0],
            scale: [0.5, 1, 0.8, 0.2],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Golden feathers drifting down */}
      {feathers.map((f) => (
        <motion.div
          key={`feather-${f.id}`}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: -30,
          }}
        >
          <motion.svg
            width="12"
            height="32"
            viewBox="0 0 12 32"
            fill="none"
            className="opacity-[0.18]"
            animate={{
              y: [0, 1200],
              x: [0, f.sway, -f.sway * 0.5, f.sway * 0.3],
              rotate: [f.rotation, f.rotEnd],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ellipse cx="6" cy="16" rx="3" ry="15" stroke="rgba(232,201,122,0.6)" strokeWidth="0.5" />
            <line x1="6" y1="1" x2="6" y2="31" stroke="rgba(232,201,122,0.4)" strokeWidth="0.3" />
            <line x1="6" y1="8" x2="2" y2="12" stroke="rgba(232,201,122,0.3)" strokeWidth="0.2" />
            <line x1="6" y1="14" x2="10" y2="18" stroke="rgba(232,201,122,0.3)" strokeWidth="0.2" />
            <line x1="6" y1="20" x2="2" y2="24" stroke="rgba(232,201,122,0.3)" strokeWidth="0.2" />
          </motion.svg>
        </motion.div>
      ))}

      {/* Ambient warm wash */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(200,150,50,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
