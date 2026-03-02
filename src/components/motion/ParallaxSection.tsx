"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 100 * speed;
  const directionMultiplier = direction === "up" ? -1 : 1;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * directionMultiplier, -distance * directionMultiplier]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={prefersReducedMotion ? {} : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
