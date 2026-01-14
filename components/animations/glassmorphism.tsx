"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Glassmorphism({ 
  children, 
  className = "",
  intensity = 0.1
}: GlassmorphismProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/10 border border-white/20 ${className}`}
      style={{
        boxShadow: `0 8px 32px 0 rgba(31, 38, 135, ${intensity})`,
      }}
      whileHover={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

