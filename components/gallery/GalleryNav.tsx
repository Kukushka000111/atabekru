"use client";

import { motion } from "framer-motion";
import { GALLERY_SECTIONS } from "@/lib/navigation";
import type { SectionId } from "@/lib/navigation";

interface GalleryNavProps {
  onSelect: (id: SectionId) => void;
}

export default function GalleryNav({ onSelect }: GalleryNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      aria-label="Навигация по галерее"
    >
      {GALLERY_SECTIONS.map((section, index) => (
        <motion.button
          key={section.id}
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
          onClick={() => onSelect(section.id)}
          className="group relative border border-[#D4AF37]/20 px-4 py-2 font-serif text-[11px] tracking-[0.15em] text-[#D4AF37]/70 transition-all duration-500 hover:scale-105 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] sm:px-5 sm:py-2.5 sm:text-xs"
        >
          <span className="relative z-10">[ {section.label} ]</span>
          <span className="pointer-events-none absolute inset-0 bg-[#D4AF37]/0 transition-colors duration-500 group-hover:bg-[#D4AF37]/[0.06]" />
        </motion.button>
      ))}
    </motion.nav>
  );
}
