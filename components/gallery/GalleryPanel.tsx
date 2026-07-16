"use client";

import { motion } from "framer-motion";

interface GalleryPanelProps {
  children: React.ReactNode;
  className?: string;
}

export default function GalleryPanel({
  children,
  className = "",
}: GalleryPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative border border-[#D4AF37]/15 bg-[#08080a]/70 px-6 py-8 shadow-[0_0_80px_rgba(212,175,55,0.04),inset_0_1px_0_rgba(212,175,55,0.08)] backdrop-blur-sm sm:px-10 sm:py-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent sm:inset-x-10" />
      {children}
    </motion.div>
  );
}
