"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Premium SVGs — The Thrill Theory · उन्मुक्त रात्रि
   Abstract luxury light art. Stroke-based, fine weights, minimal.
   ═══════════════════════════════════════════════════════════════════ */

interface SVGProps {
  accent: string;
  primary?: string;
  className?: string;
}

/* ── 1. PremiumGateway ──────────────────────────────────────────── */

export function PremiumGateway({ accent, primary, className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 560 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gw-grad-outer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="50%" stopColor={primary} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="gw-grad-inner" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primary} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
        </linearGradient>
        <filter id="gw-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer arch — slight asymmetry */}
      <path
        d="M38 500 L36 260 Q32 170 100 108 Q160 56 232 30 Q268 16 282 12
           Q300 16 345 34 Q420 62 472 118 Q530 185 524 270 L520 500"
        stroke="url(#gw-grad-outer)"
        strokeWidth="1.0"
        strokeLinecap="round"
      />

      {/* Inner arch */}
      <path
        d="M68 496 L65 268 Q62 188 122 132 Q175 82 238 56 Q270 42 284 38
           Q302 44 340 60 Q406 88 454 142 Q505 204 500 278 L496 496"
        stroke="url(#gw-grad-inner)"
        strokeWidth="0.5"
        opacity="0.45"
      />

      {/* Keystone */}
      <path
        d="M276 18 L282 2 L290 18"
        stroke={accent}
        strokeWidth="0.7"
        opacity="0.6"
        filter="url(#gw-glow)"
      />
      <circle cx="282" cy="2" r="4" stroke={accent} strokeWidth="0.5" opacity="0.5" />
      <circle cx="282" cy="2" r="1.5" fill={`${accent}30`} />

      {/* Accent filigree — left */}
      <path d="M36 260 Q24 258 22 248 L22 232" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <path d="M28 252 Q34 244 40 252" stroke={primary} strokeWidth="0.3" opacity="0.18" />

      {/* Accent filigree — right */}
      <path d="M524 270 Q536 268 538 258 L538 240" stroke={accent} strokeWidth="0.4" opacity="0.25" />
      <path d="M530 260 Q536 252 542 260" stroke={primary} strokeWidth="0.3" opacity="0.18" />

      {/* Thin base plinth */}
      <path d="M22 496 L538 496" stroke={accent} strokeWidth="0.3" opacity="0.12" />
      <path d="M28 500 L532 500" stroke={primary} strokeWidth="0.2" opacity="0.08" />

      {/* Small accent nodes */}
      <circle cx="100" cy="108" r="1.8" fill={`${accent}14`} stroke={accent} strokeWidth="0.3" opacity="0.2" />
      <circle cx="472" cy="118" r="1.8" fill={`${primary}14`} stroke={primary} strokeWidth="0.3" opacity="0.2" />
      <circle cx="282" cy="496" r="2" fill={`${accent}10`} stroke={accent} strokeWidth="0.25" opacity="0.15" />
    </svg>
  );
}

/* ── 2. LuxuryFerrisWheel ───────────────────────────────────────── */

export function LuxuryFerrisWheel({ accent, primary, className }: SVGProps) {
  const spokes = 12;
  const cx = 150, cy = 150, r = 120;

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fw-hub-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} stroke={accent} strokeWidth="0.8" opacity="0.3" />
      <circle cx={cx} cy={cy} r={r - 4} stroke={primary} strokeWidth="0.4" opacity="0.12" strokeDasharray="3 10" />

      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const angle = (i * 360 / spokes) * (Math.PI / 180);
        const x2 = cx + Math.cos(angle) * (r - 2);
        const y2 = cy + Math.sin(angle) * (r - 2);
        return (
          <line
            key={`sp-${i}`}
            x1={cx} y1={cy} x2={x2} y2={y2}
            stroke={i % 2 === 0 ? accent : primary}
            strokeWidth="0.4"
            opacity="0.18"
          />
        );
      })}

      {/* Node circles at spoke ends */}
      {Array.from({ length: spokes }, (_, i) => {
        const angle = (i * 360 / spokes) * (Math.PI / 180);
        const nx = cx + Math.cos(angle) * r;
        const ny = cy + Math.sin(angle) * r;
        return (
          <circle
            key={`nd-${i}`}
            cx={nx} cy={ny} r="3"
            stroke={i % 3 === 0 ? accent : primary}
            strokeWidth="0.4"
            opacity="0.22"
            fill={`${i % 2 === 0 ? accent : primary}0a`}
          />
        );
      })}

      {/* Central hub */}
      <circle cx={cx} cy={cy} r="10" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <circle cx={cx} cy={cy} r="4" fill={`${accent}18`} />
      <circle cx={cx} cy={cy} r="18" fill={`${accent}08`} filter="url(#fw-hub-glow)" />
    </svg>
  );
}

/* ── 3. CoutureCarousel ─────────────────────────────────────────── */

export function CoutureCarousel({ accent, primary, className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 260 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top canopy arc */}
      <path
        d="M18 70 Q60 12 130 6 Q200 12 242 70"
        stroke={accent}
        strokeWidth="0.7"
        opacity="0.35"
      />
      <path
        d="M28 68 Q65 18 130 12 Q195 18 232 68"
        stroke={primary}
        strokeWidth="0.4"
        opacity="0.18"
      />

      {/* Hanging vertical lines */}
      {[40, 65, 90, 115, 140, 165, 190, 220].map((x, i) => {
        const arcY = 14 + Math.pow(Math.abs(x - 130) / 110, 1.6) * 52;
        return (
          <g key={`hl-${i}`}>
            <line
              x1={x} y1={arcY} x2={x} y2={70}
              stroke={i % 2 === 0 ? accent : primary}
              strokeWidth="0.3"
              opacity="0.15"
            />
            <circle
              cx={x} cy={70} r="1.5"
              fill={`${i % 2 === 0 ? accent : primary}18`}
              stroke={i % 2 === 0 ? accent : primary}
              strokeWidth="0.25"
              opacity="0.2"
            />
          </g>
        );
      })}

      {/* Crown dot */}
      <circle cx="130" cy="6" r="2.5" stroke={accent} strokeWidth="0.4" opacity="0.35" fill={`${accent}10`} />
    </svg>
  );
}

/* ── 4. NeonChandelierCluster ───────────────────────────────────── */

export function NeonChandelierCluster({ accent, primary, className }: SVGProps) {
  const pendants = [
    { x: 24, len: 45, color: "accent" },
    { x: 48, len: 62, color: "primary" },
    { x: 68, len: 50, color: "accent" },
    { x: 88, len: 70, color: "primary" },
    { x: 106, len: 40, color: "accent" },
  ];

  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="nc-glow">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Top rail */}
      <line x1="16" y1="4" x2="112" y2="4" stroke={accent} strokeWidth="0.4" opacity="0.2" />

      {pendants.map((p, i) => {
        const c = p.color === "accent" ? accent : primary;
        const endY = 4 + p.len;
        return (
          <g key={`pd-${i}`}>
            <line x1={p.x} y1="4" x2={p.x} y2={endY} stroke={c} strokeWidth="0.35" opacity="0.2" />
            <circle cx={p.x} cy={endY} r="3" stroke={c} strokeWidth="0.4" opacity="0.28" fill={`${c}0c`} />
            <circle cx={p.x} cy={endY} r="6" fill={`${c}08`} filter="url(#nc-glow)" />
          </g>
        );
      })}
    </svg>
  );
}

/* ── 5. MirrorJaaliFragments ────────────────────────────────────── */

export function MirrorJaaliFragments({ accent, primary, className }: SVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="mj-frag" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Diamond */}
          <path d="M50 10 L58 25 L50 40 L42 25 Z" stroke={accent} strokeWidth="0.2" fill="none" opacity="0.04" />
          {/* Triangle */}
          <path d="M15 60 L25 45 L35 60 Z" stroke={primary} strokeWidth="0.2" fill="none" opacity="0.035" />
          {/* Thin diagonals */}
          <line x1="70" y1="55" x2="90" y2="70" stroke={accent} strokeWidth="0.15" opacity="0.03" />
          <line x1="5" y1="80" x2="20" y2="95" stroke={primary} strokeWidth="0.15" opacity="0.03" />
          {/* Small diamond */}
          <path d="M80 15 L84 22 L80 29 L76 22 Z" stroke={accent} strokeWidth="0.15" fill="none" opacity="0.04" />
          {/* Scattered accents */}
          <line x1="55" y1="75" x2="65" y2="80" stroke={primary} strokeWidth="0.15" opacity="0.035" />
          <path d="M30 18 L36 12 L42 18" stroke={accent} strokeWidth="0.15" fill="none" opacity="0.05" />
          {/* Shard */}
          <path d="M88 85 L95 78 L92 92 Z" stroke={primary} strokeWidth="0.15" fill="none" opacity="0.03" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#mj-frag)" />
    </svg>
  );
}

/* ── 6. StageReveal ─────────────────────────────────────────────── */

export function StageReveal({ accent, primary, className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sr-beam" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Platform base */}
      <path d="M50 195 L50 155 L350 155 L350 195" stroke={accent} strokeWidth="0.8" opacity="0.35" />
      <path d="M40 195 L360 195" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <path d="M55 195 L345 195" stroke={primary} strokeWidth="0.25" opacity="0.12" />

      {/* Proscenium arch */}
      <path
        d="M100 155 L100 65 Q100 30 155 16 Q190 8 200 6 Q210 8 245 16 Q300 30 300 65 L300 155"
        stroke={primary}
        strokeWidth="0.8"
        opacity="0.35"
      />
      <path
        d="M120 155 L120 72 Q120 42 168 28 Q192 20 200 18 Q208 20 232 28 Q280 42 280 72 L280 155"
        stroke={accent}
        strokeWidth="0.45"
        opacity="0.22"
      />

      {/* Suspended beam lines */}
      {[140, 170, 200, 230, 260].map((x, i) => (
        <g key={`bl-${i}`}>
          <line x1={x} y1="20" x2={x} y2="45" stroke={accent} strokeWidth="0.3" opacity="0.15" />
          <circle cx={x} cy={46} r="2" fill={`${i % 2 === 0 ? accent : primary}14`} stroke={i % 2 === 0 ? accent : primary} strokeWidth="0.25" opacity="0.2" />
        </g>
      ))}

      {/* Top crossbar */}
      <path d="M95 50 L305 50" stroke={accent} strokeWidth="0.35" opacity="0.18" />

      {/* Center spot glow */}
      <ellipse cx="200" cy="155" rx="40" ry="8" fill="url(#sr-beam)" opacity="0.5" />
    </svg>
  );
}

/* ── 7. NeonDivider ─────────────────────────────────────────────── */

export function NeonDivider({ accent, primary, className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 320 20"
      className={`w-40 md:w-52 h-auto mx-auto ${className ?? ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nd-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="30%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="50%" stopColor={primary} stopOpacity="0.7" />
          <stop offset="70%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main line */}
      <line x1="10" y1="10" x2="310" y2="10" stroke="url(#nd-grad)" strokeWidth="0.6" />

      {/* Center diamond */}
      <path d="M155 10 L160 4 L165 10 L160 16 Z" stroke={accent} strokeWidth="0.5" opacity="0.6" fill={`${accent}14`} />

      {/* Flanking dots */}
      <circle cx="136" cy="10" r="1.5" fill={`${primary}30`} stroke={primary} strokeWidth="0.3" opacity="0.4" />
      <circle cx="184" cy="10" r="1.5" fill={`${primary}30`} stroke={primary} strokeWidth="0.3" opacity="0.4" />
    </svg>
  );
}

/* ── 8. NoiseOverlay ────────────────────────────────────────────── */

export function NoiseOverlay({ opacity = 0.035 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    let frame: number;
    let last = 0;

    function draw(time: number) {
      if (time - last < 100) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = time;

      const imageData = ctx!.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx!.putImageData(imageData, 0, 0);
      frame = requestAnimationFrame(draw);
    }

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 w-full h-full z-9999"
      style={{ opacity, mixBlendMode: "overlay" }}
    />
  );
}

/* ── 9. GlowLayer ───────────────────────────────────────────────── */

const glowPositions: Record<string, string> = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3",
};

const glowSizes: Record<string, string> = {
  sm: "w-48 h-48",
  md: "w-80 h-80",
  lg: "w-[32rem] h-[32rem]",
};

export function GlowLayer({
  color,
  size = "md",
  position = "center",
  intensity = 0.5,
  className,
}: {
  color: string;
  size?: "sm" | "md" | "lg";
  position?: "center" | "top-left" | "top-right" | "bottom-center";
  intensity?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute ${glowPositions[position]} ${glowSizes[size]} rounded-full pointer-events-none ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle, ${color}${Math.round(intensity * 40).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
      }}
    />
  );
}

/* ── 10. LightSweep ─────────────────────────────────────────────── */

export function LightSweep({
  color = "rgba(255,255,255,0.08)",
  angle = -25,
  duration = 12,
  className,
}: {
  color?: string;
  angle?: number;
  duration?: number;
  className?: string;
}) {
  const id = useRef(`ls-${Math.random().toString(36).slice(2, 8)}`);

  return (
    <>
      <style>{`
        @keyframes ${id.current} {
          0%   { transform: translateX(-120%) rotate(${angle}deg); opacity: 0; }
          15%  { opacity: 0.08; }
          50%  { opacity: 0.12; }
          85%  { opacity: 0.06; }
          100% { transform: translateX(220%) rotate(${angle}deg); opacity: 0; }
        }
      `}</style>
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30%",
            height: "200%",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: `${id.current} ${duration}s ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}
