"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WobbleProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Wobble({ children, className = "", intensity = 0.05 }: WobbleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: [1, 1.02, 1],
        rotate: [0, -1, 1, -1, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.div>
  );
}

