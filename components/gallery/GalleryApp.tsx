"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import GalleryNav from "@/components/gallery/GalleryNav";
import SectionContent from "@/components/gallery/SectionContent";
import { getSectionById, type SectionId } from "@/lib/navigation";

export default function GalleryApp() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const goHome = useCallback(() => {
    setActiveSection(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeSection) {
        event.preventDefault();
        goHome();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, goHome]);

  const sectionMeta = activeSection ? getSectionById(activeSection) : null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 sm:py-16">
      <AnimatePresence mode="wait">
        {activeSection && sectionMeta ? (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full ${sectionMeta.maxWidth}`}
          >
            <button
              type="button"
              onClick={goHome}
              className="mb-6 font-serif text-xs tracking-[0.2em] text-[#D4AF37]/50 transition-colors duration-300 hover:text-[#D4AF37]"
            >
              ← НАЗАД В ГАЛЕРЕЮ
            </button>
            <SectionContent sectionId={activeSection} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full max-w-3xl flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <h1 className="font-serif text-2xl leading-tight tracking-[0.12em] text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.12)] sm:text-3xl md:text-4xl">
                ATABEK.
                <br />
                <span className="text-[#D4AF37]/80">
                  THE ART OF SOUND AND CODE.
                </span>
              </h1>
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <p className="text-sm tracking-wide text-white/35">
                Цифровая галерея сакрального искусства
              </p>
            </motion.div>

            <GalleryNav onSelect={setActiveSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
