"use client";

import { motion } from "framer-motion";

const RING_COUNT = 4;

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: RING_COUNT }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-[#D4AF37]/25"
          initial={{ width: 56, height: 56, opacity: 0.15 }}
          animate={
            isPlaying
              ? {
                  width: [56, 56 + (index + 1) * 28, 56],
                  height: [56, 56 + (index + 1) * 28, 56],
                  opacity: [0.35, 0, 0.35],
                }
              : { width: 56 + index * 12, height: 56 + index * 12, opacity: 0.08 }
          }
          transition={
            isPlaying
              ? {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: index * 0.5,
                }
              : { duration: 0.6 }
          }
        />
      ))}
    </div>
  );
}
