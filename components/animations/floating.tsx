"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingProps {
  children: ReactNode;
  className?: string;
}

export function Floating({ children, className = "" }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

