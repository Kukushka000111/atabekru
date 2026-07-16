"use client";

import { motion } from "framer-motion";
import GalleryPanel from "@/components/gallery/GalleryPanel";
import { useToast } from "@/components/ToastProvider";
import { GITHUB_URL, TELEGRAM_USERNAME } from "@/lib/constants";

const CONTACTS = [
  {
    id: "telegram",
    label: "Telegram",
    value: `@${TELEGRAM_USERNAME}`,
    action: "copy" as const,
  },
  {
    id: "github",
    label: "GitHub",
    value: TELEGRAM_USERNAME,
    action: "link" as const,
    href: GITHUB_URL,
  },
];

export default function ContactSection() {
  const { showToast } = useToast();

  const handleTelegramClick = async () => {
    try {
      await navigator.clipboard.writeText(`@${TELEGRAM_USERNAME}`);
      showToast("Юзернейм скопирован. Напиши бэйба");
    } catch {
      showToast("Не удалось скопировать. Попробуй ещё раз");
    }
  };

  return (
    <GalleryPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        <div className="text-center">
          <p className="font-serif text-[10px] tracking-[0.35em] text-[#D4AF37]/45">
            СВЯЗЬ С МАСТЕРОМ
          </p>
          <h2 className="mt-2 font-serif text-lg tracking-[0.12em] text-[#D4AF37]/90">
            Контакты
          </h2>
        </div>

        <ul className="space-y-3">
          {CONTACTS.map((contact, index) => (
            <motion.li
              key={contact.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              {contact.action === "copy" ? (
                <button
                  type="button"
                  onClick={handleTelegramClick}
                  className="group flex w-full items-center justify-between border border-[#D4AF37]/12 bg-[#D4AF37]/[0.02] px-5 py-4 text-left transition-all duration-400 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.05] hover:shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                >
                  <div>
                    <p className="font-serif text-[10px] tracking-[0.2em] text-[#D4AF37]/40">
                      {contact.label}
                    </p>
                    <p className="mt-1 text-sm text-[#D4AF37]/80 group-hover:text-[#D4AF37]">
                      {contact.value}
                    </p>
                  </div>
                  <span className="font-serif text-[10px] tracking-widest text-[#D4AF37]/30 group-hover:text-[#D4AF37]/60">
                    СКОПИРОВАТЬ
                  </span>
                </button>
              ) : (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between border border-[#D4AF37]/12 bg-[#D4AF37]/[0.02] px-5 py-4 transition-all duration-400 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.05]"
                >
                  <div>
                    <p className="font-serif text-[10px] tracking-[0.2em] text-[#D4AF37]/40">
                      {contact.label}
                    </p>
                    <p className="mt-1 text-sm text-white/60 group-hover:text-white/80">
                      {contact.value}
                    </p>
                  </div>
                  <span className="text-[#D4AF37]/30 group-hover:text-[#D4AF37]/60">
                    ↗
                  </span>
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </GalleryPanel>
  );
}
