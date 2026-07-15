"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { VIBES } from "@/lib/vibes";

export default function VibeStatus() {
  const [index, setIndex] = useState(0);
  const vibe = VIBES[index];

  const cycleVibe = () => {
    setIndex((prev) => (prev + 1) % VIBES.length);
  };

  return (
    <motion.button
      type="button"
      data-cursor-hover
      onClick={cycleVibe}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="fixed bottom-5 right-5 z-50 max-w-[min(280px,calc(100vw-2rem))] rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors hover:border-white/14 hover:bg-white/[0.06] sm:bottom-6 sm:right-6"
      aria-label="Сменить статус настроения"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="shrink-0 font-mono text-sm text-white/70">
            {vibe.emoji}
          </span>
          <span className="truncate text-xs text-white/50 sm:text-[13px]">
            {vibe.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
