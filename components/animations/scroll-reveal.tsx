"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      animate={isVisible ? variants.animate : variants.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


