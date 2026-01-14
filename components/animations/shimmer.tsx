"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ShimmerProps {
  children: ReactNode;
  className?: string;
}

export function Shimmer({ children, className = "" }: ShimmerProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          backgroundSize: "200% 100%",
        }}
        variants={{
          initial: { x: "-100%" },
          hover: {
            x: "200%",
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          },
        }}
      />
      {children}
    </motion.div>
  );
}

