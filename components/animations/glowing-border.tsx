"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingBorder({ 
  children, 
  className = "", 
  glowColor = "rgba(251, 146, 60, 0.5)" 
}: GlowingBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
          backgroundSize: "200% 200%",
        }}
        variants={{
          initial: { opacity: 0 },
          hover: {
            opacity: 1,
            backgroundPosition: ["0% 0%", "100% 100%"],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          },
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

