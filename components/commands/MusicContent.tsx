"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import AudioVisualizer from "@/components/commands/music/AudioVisualizer";
import ProgressBar from "@/components/commands/music/ProgressBar";
import {
  formatAudioTime,
  useAudioPlayer,
} from "@/components/commands/music/useAudioPlayer";

const AUDIO_SRC = "/audio/demo.mp3";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.01-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

export default function MusicContent() {
  const { isPlaying, currentTime, duration, error, isReady, togglePlay, seek } =
    useAudioPlayer(AUDIO_SRC);

  const isDisabled = !!error || !isReady;

  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-5"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Now Playing
          </p>
          <h2 className="mt-1 text-base font-medium text-white sm:text-lg">
            Atabek — Untitled Demo (Rough Mix)
          </h2>
          <p className="mt-0.5 text-xs text-white/40">
            Жанр: Atmospheric Trap / Lo-Fi
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-6 text-center">
            <p className="text-sm text-white/50">{error}</p>
          </div>
        ) : (
          <>
            <AudioVisualizer isPlaying={isPlaying} />

            <div className="space-y-2">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
                disabled={isDisabled}
              />
              <div className="flex justify-between font-mono text-[11px] text-white/35">
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(duration)}</span>
              </div>
            </div>

            <button
              type="button"
              data-cursor-hover
              onClick={togglePlay}
              disabled={isDisabled}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/10 text-teal-300 transition-all hover:border-teal-400/35 hover:bg-teal-400/20 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] disabled:opacity-40"
              aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </>
        )}
      </motion.div>
    </CommandPanel>
  );
}
