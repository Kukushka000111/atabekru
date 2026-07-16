"use client";

import GalleryPanel from "@/components/gallery/GalleryPanel";

export default function PhotoSection() {
  return (
    <GalleryPanel className="text-center">
      <p className="font-serif text-[10px] tracking-[0.35em] text-[#D4AF37]/45">
        ЭКСПОНАТ VII
      </p>
      <h2 className="mt-3 font-serif text-lg tracking-[0.12em] text-[#D4AF37]/90">
        Снимок дня
      </h2>
      <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-white/40">
        Polaroid-кадр скоро займёт своё место в галерее. Экспозиция в
        подготовке.
      </p>
    </GalleryPanel>
  );
}
