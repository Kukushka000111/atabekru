"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import GalleryPanel from "@/components/gallery/GalleryPanel";
import { useSnakeGame } from "@/components/gallery/snake/useSnakeGame";
import { CANVAS_SIZE } from "@/components/gallery/snake/snakeLogic";

export default function GamesSection() {
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
    <GalleryPanel>
      <div ref={containerRef} tabIndex={-1} className="mx-auto w-fit outline-none">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-serif text-[10px] tracking-[0.25em] text-[#D4AF37]/45">
            НИТЬ АРИАДНЫ
          </p>
          <p className="font-serif text-sm text-[#D4AF37]/70">
            {score} самоцветов
          </p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(212,175,55,0.06)]"
            aria-label="Мозаичное поле — игра Змейка"
          />

          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center bg-[#050507]/85 backdrop-blur-sm"
              >
                <div className="space-y-5 px-6 text-center">
                  <p className="font-serif text-sm leading-relaxed tracking-wide text-[#D4AF37]/90">
                    Нить оборвалась.
                    <br />
                    Попробуйте снова.
                  </p>
                  <button
                    ref={restartRef}
                    type="button"
                    onClick={handleRestart}
                    className="border border-[#D4AF37]/30 px-6 py-2 font-serif text-xs tracking-[0.2em] text-[#D4AF37]/80 transition-all duration-400 hover:border-[#D4AF37]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)]"
                  >
                    ВОЗРОДИТЬ НИТЬ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-center font-serif text-[10px] tracking-widest text-white/25">
          ↑ ↓ ← → — управление
        </p>
      </div>
    </GalleryPanel>
  );
}
