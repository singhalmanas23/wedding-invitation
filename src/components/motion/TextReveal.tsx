"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const reducedMotionWordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0 },
  },
};

export default function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const variants = prefersReducedMotion
    ? reducedMotionWordVariants
    : wordVariants;

  return (
    <Tag className={cn("flex flex-wrap", className)} aria-label={text}>
      <motion.span
        className="flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        custom={delay}
        aria-hidden
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={variants}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
