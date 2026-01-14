"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PulsingBadgeProps {
  children: ReactNode;
  className?: string;
}

export function PulsingBadge({ children, className = "" }: PulsingBadgeProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.9, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

