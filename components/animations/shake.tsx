"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ShakeProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Shake({ children, className = "", intensity = 0.5 }: ShakeProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        x: [0, -2, 2, -2, 2, 0],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}

