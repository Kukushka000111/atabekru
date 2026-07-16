"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { VIBES } from "@/lib/vibes";

function StatueIcon() {
  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.8}
      className="h-8 w-6 text-[#D4AF37]/60"
    >
      <ellipse cx="16" cy="8" rx="6" ry="7" />
      <path d="M10 15 Q16 18 22 15 L20 28 Q16 32 12 28 Z" />
      <path d="M8 32 L24 32" strokeLinecap="round" />
      <path d="M6 36 L26 36" strokeLinecap="round" />
      <path d="M13 5 Q16 2 19 5" />
    </svg>
  );
}

export default function VibeStatus() {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const vibe = VIBES[index];

  const handleClick = () => {
    setIsOpen(true);
    setIndex((prev) => (prev + 1) % VIBES.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 max-w-[240px] border border-[#D4AF37]/20 bg-[#08080a]/90 px-5 py-4 shadow-[0_0_40px_rgba(212,175,55,0.08)] backdrop-blur-md"
            style={{
              borderRadius: "2px 12px 12px 12px",
            }}
          >
            <div className="mb-2 h-px w-full bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            <p className="font-serif text-xs italic leading-relaxed tracking-wide text-[#D4AF37]/75">
              {vibe.text}
            </p>
            <div className="mt-2 h-px w-8 bg-[#D4AF37]/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#08080a]/70 shadow-[0_0_30px_rgba(212,175,55,0.06)] backdrop-blur-md transition-all duration-400 hover:border-[#D4AF37]/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
        aria-label="Статус настроения"
      >
        <StatueIcon />
      </motion.button>
    </div>
  );
}
