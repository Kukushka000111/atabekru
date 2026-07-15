"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CommandContent from "@/components/CommandContent";
import { type Command, filterCommands } from "@/lib/commands";

export default function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [query, setQuery] = useState("");
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = useMemo(() => filterCommands(query), [query]);

  const resetPalette = useCallback(() => {
    setQuery("");
    setActiveCommand(null);
    setSelectedIndex(0);
    inputRef.current?.focus();
  }, []);

  const selectCommand = useCallback((command: Command) => {
    setActiveCommand(command.name);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (event.key === "Escape" && activeCommand) {
        event.preventDefault();
        resetPalette();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeCommand, resetPalette]);

  useEffect(() => {
    const activeItem = listRef.current?.children[selectedIndex] as
      | HTMLElement
      | undefined;
    activeItem?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, filteredCommands]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (activeCommand) {
      if (event.key === "Escape") {
        event.preventDefault();
        resetPalette();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredCommands.length) % filteredCommands.length,
          );
        }
        break;
      case "Enter":
        event.preventDefault();
        if (filteredCommands[selectedIndex]) {
          selectCommand(filteredCommands[selectedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        resetPalette();
        break;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <motion.div
        layout
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <div className="border-b border-white/[0.06] px-4 py-3 sm:px-5">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Начните вводить команду... (или нажмите /)"
            data-cursor-hover
            className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/30 outline-none sm:text-base"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeCommand ? (
            <CommandContent key="content" commandName={activeCommand} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul
                ref={listRef}
                className="max-h-[min(360px,50vh)] overflow-y-auto py-2"
              >
                {filteredCommands.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-white/40 sm:px-5">
                    Команды не найдены
                  </li>
                ) : (
                  filteredCommands.map((command, index) => {
                    const isSelected = index === selectedIndex;

                    return (
                      <li key={command.id}>
                        <button
                          type="button"
                          data-cursor-hover
                          onClick={() => selectCommand(command)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors sm:px-5 ${
                            isSelected
                              ? "bg-teal-400/[0.08] text-white"
                              : "text-white/70 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-sm text-teal-300/90">
                              {command.name}
                            </span>
                            <p className="truncate text-xs text-white/40 sm:text-sm">
                              {command.description}
                            </p>
                          </div>
                          {isSelected && (
                            <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/40">
                              ↵ Enter
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
