"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import { STATUS_STYLES, WEEK_SCHEDULE } from "@/lib/freetime";

export default function FreetimeContent() {
  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Расписание
          </p>
          <h2 className="mt-1 text-base font-medium text-white sm:text-lg">
            Свободное время
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {WEEK_SCHEDULE.map((day, index) => {
            const styles = STATUS_STYLES[day.status];

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
                className={`group flex flex-col rounded-xl border bg-white/[0.03] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${styles.border} ${styles.glow}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${styles.dot}`}
                  />
                  <span className="text-xs font-medium text-white/70">
                    {day.shortName}
                  </span>
                </div>
                <p className="mb-1 text-[10px] text-white/30">{day.name}</p>
                <p className="text-[11px] leading-snug text-white/45">
                  {day.message}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </CommandPanel>
  );
}
