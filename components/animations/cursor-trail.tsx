"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorTrailProps {
  enabled?: boolean;
}

export function CursorTrail({ enabled = true }: CursorTrailProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: id++ }];
        return newTrail.slice(-10); // Keep last 10 points
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-teal-400 opacity-50"
            style={{
              left: point.x - 4,
              top: point.y - 4,
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

