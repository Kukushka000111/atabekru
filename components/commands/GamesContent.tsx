"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import CommandPanel from "@/components/commands/CommandPanel";
import { useSnakeGame } from "@/components/commands/snake/useSnakeGame";
import { CANVAS_SIZE } from "@/components/commands/snake/snakeLogic";

export default function GamesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    requestAnimationFrame(() => restartRef.current?.focus());
  }, []);

  const { canvasRef, resetGame, queueDirection, stopLoop, score } = useSnakeGame({
    onGameOver: handleGameOver,
  });

  const handleRestart = useCallback(() => {
    setIsGameOver(false);
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    containerRef.current?.focus();
    const input = document.querySelector<HTMLInputElement>(
      'input[placeholder*="команду"]',
    );
    input?.blur();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const map = {
          ArrowUp: "UP",
          ArrowDown: "DOWN",
          ArrowLeft: "LEFT",
          ArrowRight: "RIGHT",
        } as const;
        queueDirection(map[event.key as keyof typeof map]);
        return;
      }

      if (isGameOver && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopLoop();
    };
  }, [queueDirection, isGameOver, handleRestart, stopLoop]);

  return (
    <CommandPanel>
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative mx-auto w-fit outline-none"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-white/40">Змейка</p>
          <p className="font-mono text-sm text-teal-300/80">
            Score: {score}
          </p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="rounded-lg border border-teal-400/20 bg-black/40"
            aria-label="Игровое поле Змейка"
          />

          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70 backdrop-blur-sm"
              >
                <div className="space-y-4 px-4 text-center">
                  <p className="text-sm leading-relaxed text-white/80">
                    Вы врезались в стену дедлайна.
                    <br />
                    Иди дебажить код.
                  </p>
                  <button
                    ref={restartRef}
                    type="button"
                    data-cursor-hover
                    onClick={handleRestart}
                    className="rounded-xl border border-teal-400/25 bg-teal-400/10 px-4 py-2 text-sm text-teal-200 transition-colors hover:border-teal-400/40 hover:bg-teal-400/20"
                  >
                    Попробовать снова
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 text-center text-[11px] text-white/25">
          ↑ ↓ ← → — управление
        </p>
      </div>
    </CommandPanel>
  );
}
