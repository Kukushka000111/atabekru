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
} from "@/components/commands/snake/snakeLogic";

function drawGame(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if ((x + y) % 2 === 0) {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  ctx.strokeStyle = "rgba(45, 212, 191, 0.15)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }

  ctx.shadowColor = "rgba(248, 113, 113, 0.9)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#f87171";
  const foodPadding = 2;
  ctx.fillRect(
    state.food.x * CELL_SIZE + foodPadding,
    state.food.y * CELL_SIZE + foodPadding,
    CELL_SIZE - foodPadding * 2,
    CELL_SIZE - foodPadding * 2,
  );
  ctx.shadowBlur = 0;

  state.snake.forEach((segment, index) => {
    const padding = index === 0 ? 1 : 2;
    ctx.shadowColor = "rgba(45, 212, 191, 0.8)";
    ctx.shadowBlur = index === 0 ? 14 : 8;
    ctx.fillStyle = index === 0 ? "#5eead4" : "#2dd4bf";
    ctx.fillRect(
      segment.x * CELL_SIZE + padding,
      segment.y * CELL_SIZE + padding,
      CELL_SIZE - padding * 2,
      CELL_SIZE - padding * 2,
    );
  });
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
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
    isGameOver: () => stateRef.current.isGameOver,
  };
}
