"use client";

import { motion } from "framer-motion";
import GalleryPanel from "@/components/gallery/GalleryPanel";

export default function BakerySection() {
  return (
    <GalleryPanel className="overflow-hidden">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 75% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(0, 0, 0, 0.6) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative space-y-6"
        >
          <div className="text-center">
            <p className="font-serif text-[10px] tracking-[0.4em] text-[#D4AF37]/40">
              ГИЛЬДИЯ ХЛЕБА
            </p>
            <h2 className="mt-2 font-serif text-2xl italic tracking-wide text-[#D4AF37] sm:text-3xl">
              Хруст Багета™
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-[#D4AF37]/25" />
          </div>

          <p className="text-center font-serif text-sm italic leading-relaxed text-white/40">
            Реклама от Темы.
          </p>

          <div className="flex justify-center pt-2">
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="group relative inline-flex items-center gap-3 border-2 border-[#D4AF37]/30 bg-[#D4AF37]/[0.04] px-8 py-3 font-serif text-sm tracking-[0.15em] text-[#D4AF37]/90 transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-[#D4AF37]/70"
              >
                <path d="M12 2C8 2 5 5 5 9c0 4 3 7 7 11 4-4 7-7 7-11 0-4-3-7-7-7zm0 4a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
              Заказать углеводы
            </a>
          </div>
        </motion.div>
      </div>
    </GalleryPanel>
  );
}
