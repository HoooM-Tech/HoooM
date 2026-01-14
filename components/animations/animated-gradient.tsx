"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
}

export function AnimatedGradient({ 
  children, 
  className = "",
  colors = ["#fb923c", "#14b8a6", "#fb923c"]
}: AnimatedGradientProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10 opacity-20 blur-3xl"
        style={{
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {children}
    </div>
  );
}

