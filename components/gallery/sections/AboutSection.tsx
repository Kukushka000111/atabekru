"use client";

import { motion } from "framer-motion";
import GalleryPanel from "@/components/gallery/GalleryPanel";

const FACTS = [
  { label: "XX лет", detail: "возраст" },
  { label: "IT", detail: "студент" },
  { label: "Код", detail: "веб-разработка" },
  { label: "Звук", detail: "битмейкинг" },
  { label: "Кострома", detail: "родина" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutSection() {
  return (
    <GalleryPanel className="text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]/30" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.75}
              className="h-5 w-5 text-[#D4AF37]/50"
            >
              <path d="M12 2L14 8H20L15 12L17 18L12 15L7 18L9 12L4 8H10L12 2Z" />
            </svg>
            <span className="h-px w-8 bg-[#D4AF37]/30" />
          </div>

          <p className="font-serif text-[10px] tracking-[0.35em] text-[#D4AF37]/50">
            ЭКСПОНАТ I
          </p>
          <h2 className="font-serif text-xl tracking-[0.15em] text-[#D4AF37] sm:text-2xl">
            АТАБЕК. ЭКСПОНАТ I
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <p className="font-serif text-lg text-white/85 sm:text-xl">
            Атабек, 20 лет.
          </p>
          <p className="text-sm text-[#D4AF37]/60 sm:text-base">
            Студент IT, веб-разработчик, битмейкер из Костромы.
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-sm text-sm leading-relaxed text-white/45"
        >
          Я Бекич. Создал сайт про себя. О себе: скромный
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col items-center border border-[#D4AF37]/10 px-4 py-2"
            >
              <span className="font-serif text-xs tracking-wider text-[#D4AF37]/80">
                {fact.label}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-widest text-white/25">
                {fact.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </GalleryPanel>
  );
}
