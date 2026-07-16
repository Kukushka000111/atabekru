"use client";

import { motion } from "framer-motion";
import GalleryPanel from "@/components/gallery/GalleryPanel";
import AudioVisualizer from "@/components/gallery/music/AudioVisualizer";
import ProgressBar from "@/components/gallery/music/ProgressBar";
import {
  formatAudioTime,
  useAudioPlayer,
} from "@/components/gallery/music/useAudioPlayer";

const AUDIO_SRC = "/audio/demo.mp3";

function OrnatePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.01-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function OrnatePauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

export default function MusicSection() {
  const { isPlaying, currentTime, duration, error, isReady, togglePlay, seek } =
    useAudioPlayer(AUDIO_SRC);

  const isDisabled = !!error || !isReady;

  return (
    <GalleryPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-6 text-center"
      >
        <div>
          <p className="font-serif text-[10px] tracking-[0.35em] text-[#D4AF37]/45">
            ЗОЛОТАЯ ПЛАСТИНА
          </p>
          <h2 className="mt-2 font-serif text-base tracking-wide text-[#D4AF37]/90 sm:text-lg">
            Atabek — Untitled Demo
          </h2>
          <p className="mt-1 text-xs text-white/35">
            Atmospheric Trap / Lo-Fi
          </p>
        </div>

        {error ? (
          <p className="text-sm text-white/45">{error}</p>
        ) : (
          <>
            <div className="relative flex h-36 w-36 items-center justify-center">
              <AudioVisualizer isPlaying={isPlaying} />

              <button
                type="button"
                onClick={togglePlay}
                disabled={isDisabled}
                aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2),inset_0_0_20px_rgba(212,175,55,0.05)] transition-all duration-400 hover:border-[#D4AF37]/80 hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] disabled:opacity-40"
              >
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-[#D4AF37]/20"
                  viewBox="0 0 56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.5}
                >
                  <circle cx="28" cy="28" r="26" />
                  <path d="M28 6 L30 14 L28 22 M28 34 L30 42 L28 50 M6 28 L14 30 L22 28 M34 28 L42 30 L50 28" />
                </svg>
                {isPlaying ? <OrnatePauseIcon /> : <OrnatePlayIcon />}
              </button>
            </div>

            <div className="w-full space-y-2">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
                disabled={isDisabled}
              />
              <div className="flex justify-between font-serif text-[10px] tracking-wider text-[#D4AF37]/35">
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(duration)}</span>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </GalleryPanel>
  );
}
