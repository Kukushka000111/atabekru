"use client";

import { useEffect, useRef } from "react";

const BAR_COUNT = 15;
const MIN_HEIGHT = 8;
const PAUSE_TRANSITION_MS = 500;

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bars = barsRef.current;

    const setBarHeights = (percent: number, animate: boolean) => {
      bars.forEach((bar) => {
        if (!bar) return;
        bar.style.transition = animate
          ? `height ${PAUSE_TRANSITION_MS}ms ease-out`
          : "none";
        bar.style.height = `${percent}%`;
      });
    };

    if (!isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setBarHeights(MIN_HEIGHT, true);
      return;
    }

    const animate = () => {
      bars.forEach((bar) => {
        if (!bar) return;
        bar.style.transition = "height 80ms ease-out";
        bar.style.height = `${MIN_HEIGHT + Math.random() * (100 - MIN_HEIGHT)}%`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex h-16 items-end justify-center gap-1">
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            barsRef.current[index] = el;
          }}
          className="w-1.5 rounded-full bg-teal-400/60"
          style={{ height: `${MIN_HEIGHT}%` }}
        />
      ))}
    </div>
  );
}
