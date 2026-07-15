"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";

const FACTS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v3.59L7.3 9.24a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l2.25-2.25a.75.75 0 00-1.06-1.06l-.94.94V6.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "20 лет",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "Веб-разработчик",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
      </svg>
    ),
    label: "Битмейкер",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "Кострома",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutContent() {
  return (
    <CommandPanel>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Атабек, 20 лет.
          </h2>
          <p className="mt-1.5 text-sm text-teal-300/80 sm:text-base">
            Студент IT, веб-разработчик, битмейкер из Костромы.
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm leading-relaxed text-white/55 sm:text-[15px]"
        >
          Я Бекич. Создал сайт про себя. О себе: скромный
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
          {FACTS.map((fact) => (
            <span
              key={fact.label}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/50"
            >
              <span className="text-teal-400/70">{fact.icon}</span>
              {fact.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </CommandPanel>
  );
}
