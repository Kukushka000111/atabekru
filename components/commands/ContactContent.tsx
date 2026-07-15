"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
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

export default function ContactContent() {
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
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <p className="text-xs uppercase tracking-widest text-white/30">
          Контакты
        </p>

        <ul className="space-y-2">
          {CONTACTS.map((contact, index) => (
            <motion.li
              key={contact.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.25 }}
            >
              {contact.action === "copy" ? (
                <button
                  type="button"
                  data-cursor-hover
                  onClick={handleTelegramClick}
                  className="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition-colors hover:border-teal-400/20 hover:bg-teal-400/[0.05]"
                >
                  <div>
                    <p className="text-xs text-white/40">{contact.label}</p>
                    <p className="mt-0.5 font-mono text-sm text-teal-300/90 group-hover:text-teal-200">
                      {contact.value}
                    </p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/30 transition-colors group-hover:border-teal-400/20 group-hover:text-teal-300/60">
                    copy
                  </span>
                </button>
              ) : (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/12 hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-xs text-white/40">{contact.label}</p>
                    <p className="mt-0.5 font-mono text-sm text-white/70 group-hover:text-white/90">
                      {contact.value}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-white/25 transition-colors group-hover:text-white/50">
                    ↗
                  </span>
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </CommandPanel>
  );
}
