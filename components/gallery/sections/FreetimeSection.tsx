"use client";

import { motion } from "framer-motion";
import GalleryPanel from "@/components/gallery/GalleryPanel";
import { STATUS_STYLES, WEEK_SCHEDULE } from "@/lib/freetime";

export default function FreetimeSection() {
  return (
    <GalleryPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <p className="font-serif text-[10px] tracking-[0.35em] text-[#D4AF37]/45">
            АСТРОНОМИЧЕСКАЯ ТАБЛИЦА
          </p>
          <h2 className="mt-2 font-serif text-lg tracking-[0.12em] text-[#D4AF37]/90">
            Расписание досуга
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {WEEK_SCHEDULE.map((day, index) => {
            const styles = STATUS_STYLES[day.status];

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className={`group flex flex-col items-center border bg-[#D4AF37]/[0.02] px-3 py-5 transition-all duration-500 hover:-translate-y-1 ${styles.border} ${styles.glow}`}
                style={{
                  borderRadius: "50% 50% 12% 12% / 30% 30% 70% 70%",
                }}
              >
                <span className="font-serif text-lg text-[#D4AF37]/60">
                  {day.roman}
                </span>
                <span
                  className={`mt-1 font-serif text-[10px] tracking-widest ${styles.accent}`}
                >
                  {day.shortName}
                </span>
                <p className="mt-3 text-center text-[10px] leading-snug text-white/35">
                  {day.message}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </GalleryPanel>
  );
}
