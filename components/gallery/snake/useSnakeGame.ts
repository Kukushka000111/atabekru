"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CANVAS_SIZE,
  CELL_SIZE,
  GRID_SIZE,
  TICK_MS,
  type Direction,
  type GameState,
  createInitialState,
  stepGame,
} from "@/components/gallery/snake/snakeLogic";

function drawMosaicTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number,
) {
  const px = x * CELL_SIZE;
  const py = y * CELL_SIZE;

  const baseColors = [
    "rgba(20, 18, 28, 0.95)",
    "rgba(28, 24, 36, 0.95)",
    "rgba(16, 20, 32, 0.95)",
    "rgba(24, 22, 30, 0.95)",
  ];
  ctx.fillStyle = baseColors[variant % baseColors.length];
  ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(px + 0.5, py + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);

  if (variant % 3 === 0) {
    ctx.fillStyle = "rgba(212, 175, 55, 0.06)";
    ctx.beginPath();
    ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGame(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      drawMosaicTile(ctx, x, y, (x + y) % 4);
    }
  }

  ctx.shadowColor = "rgba(220, 38, 38, 0.9)";
  ctx.shadowBlur = 16;
  const foodCx = state.food.x * CELL_SIZE + CELL_SIZE / 2;
  const foodCy = state.food.y * CELL_SIZE + CELL_SIZE / 2;
  const foodR = CELL_SIZE * 0.32;

  const rubyGradient = ctx.createRadialGradient(
    foodCx - 1,
    foodCy - 1,
    0,
    foodCx,
    foodCy,
    foodR,
  );
  rubyGradient.addColorStop(0, "#fca5a5");
  rubyGradient.addColorStop(0.5, "#dc2626");
  rubyGradient.addColorStop(1, "#7f1d1d");
  ctx.fillStyle = rubyGradient;
  ctx.beginPath();
  ctx.arc(foodCx, foodCy, foodR, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  state.snake.forEach((segment, index) => {
    const cx = segment.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = segment.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = index === 0 ? CELL_SIZE * 0.38 : CELL_SIZE * 0.3;

    ctx.shadowColor = "rgba(212, 175, 55, 0.7)";
    ctx.shadowBlur = index === 0 ? 12 : 6;
    const goldGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    goldGradient.addColorStop(0, "#f5e6a3");
    goldGradient.addColorStop(0.6, "#D4AF37");
    goldGradient.addColorStop(1, "#8B7355");
    ctx.fillStyle = goldGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;

  if (state.snake.length > 1) {
    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    const first = state.snake[0];
    ctx.moveTo(
      first.x * CELL_SIZE + CELL_SIZE / 2,
      first.y * CELL_SIZE + CELL_SIZE / 2,
    );
    for (let i = 1; i < state.snake.length; i++) {
      const seg = state.snake[i];
      ctx.lineTo(
        seg.x * CELL_SIZE + CELL_SIZE / 2,
        seg.y * CELL_SIZE + CELL_SIZE / 2,
      );
    }
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, CANVAS_SIZE - 2, CANVAS_SIZE - 2);
}

interface UseSnakeGameOptions {
  onGameOver?: () => void;
}

export function useSnakeGame({ onGameOver }: UseSnakeGameOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawGame(ctx, stateRef.current);
  }, []);

  const stopLoop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();
    intervalRef.current = setInterval(() => {
      const prev = stateRef.current;
      const next = stepGame(prev);
      stateRef.current = next;
      setScore(next.score);
      render();

      if (next.isGameOver && !prev.isGameOver) {
        stopLoop();
        onGameOver?.();
      }
    }, TICK_MS);
  }, [onGameOver, render, stopLoop]);

  const resetGame = useCallback(() => {
    stateRef.current = createInitialState();
    setScore(0);
    render();
    startLoop();
  }, [render, startLoop]);

  const queueDirection = useCallback((direction: Direction) => {
    if (stateRef.current.isGameOver) return;

    const active = stateRef.current.nextDirection;
    const opposite =
      (direction === "UP" && active === "DOWN") ||
      (direction === "DOWN" && active === "UP") ||
      (direction === "LEFT" && active === "RIGHT") ||
      (direction === "RIGHT" && active === "LEFT");

    if (!opposite && direction !== active) {
      stateRef.current = { ...stateRef.current, nextDirection: direction };
    }
  }, []);

  useEffect(() => {
    render();
    startLoop();

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (!stateRef.current.isGameOver) {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibility);
      stateRef.current = createInitialState();
    };
  }, [render, startLoop, stopLoop]);

  return {
    canvasRef,
    resetGame,
    queueDirection,
    stopLoop,
    score,
  };
}
