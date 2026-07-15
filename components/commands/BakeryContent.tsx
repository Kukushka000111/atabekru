"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";

function CroissantIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c-4 0-7 2.5-7 6.5C5 14 8.5 18 12 21c3.5-3 7-7 7-11.5C19 5.5 16 3 12 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 9c1.5-1 3.5-1 4 0M12 7c1.5-1 3.5-1 4 0M10 11c1.5-1 3-1 4 0"
      />
    </svg>
  );
}

export default function BakeryContent() {
  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-xl border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.06] via-transparent to-orange-400/[0.04] p-5 sm:p-6"
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/[0.08] blur-2xl" />

        <div className="relative space-y-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-400/50">
              Premium Bakery Startup
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Хруст Багета
              <span className="text-amber-400/70">™</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-white/50">
            Реклама от Темы.
          </p>

          <a
            href="#"
            data-cursor-hover
            onClick={(event) => event.preventDefault()}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.08] px-4 py-2.5 text-sm font-medium text-amber-200/90 transition-all duration-300 hover:border-amber-400/35 hover:bg-amber-400/[0.14] hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]"
          >
            <span className="text-amber-400/80 transition-colors group-hover:text-amber-300">
              <CroissantIcon />
            </span>
            Заказать булки Темы
          </a>
        </div>
      </motion.div>
    </CommandPanel>
  );
}
