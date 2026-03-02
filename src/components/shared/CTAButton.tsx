"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40",
  secondary:
    "bg-transparent border border-amber-500/40 text-amber-200 hover:bg-amber-500/10",
  outline:
    "bg-transparent border border-white/20 text-white/80 hover:border-white/40 hover:text-white",
};

export default function CTAButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: CTAButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    variantStyles[variant],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link href={href} className={styles}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={styles}
      type="button"
    >
      {children}
    </motion.button>
  );
}
