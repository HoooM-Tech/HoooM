"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface DrawingCheckmarkProps {
  delay?: number;
  size?: number;
  color?: string;
}

export function DrawingCheckmark({ 
  delay = 0, 
  size = 16, 
  color = "white" 
}: DrawingCheckmarkProps) {
  const checkmarkPath = "M5 13l4 4L19 7";
  const pathLength = 18;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay,
      }}
      className="relative"
    >
      <Check size={size} color={color} strokeWidth={3} />
      <motion.svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d={checkmarkPath}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + 0.2,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

