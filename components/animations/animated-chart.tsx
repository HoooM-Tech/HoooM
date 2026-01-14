"use client";

import { motion } from "framer-motion";

export function AnimatedChart() {
  const bars = [
    { height: 180, delay: 0 },
    { height: 130, delay: 0.1 },
    { height: 100, delay: 0.2 },
    { height: 70, delay: 0.3 },
  ];

  return (
    <div className="relative">
      {/* Background bars */}
      <div className="flex items-end gap-4 h-47">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gray-200 rounded-t-3xl"
            initial={{ height: 0 }}
            whileInView={{ height: bar.height }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: bar.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </div>
      
      {/* Line chart overlay */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 256"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.polyline
          points="0,180 100,120 200,140 300,80 350,220"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.polyline
          points="350,220 400,210"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="6,6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="350"
          cy="220"
          r="6"
          fill="white"
          stroke="#ef4444"
          strokeWidth="3"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
        />
      </motion.svg>
    </div>
  );
}

