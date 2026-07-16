"use client";

import AboutSection from "@/components/gallery/sections/AboutSection";
import BakerySection from "@/components/gallery/sections/BakerySection";
import ContactSection from "@/components/gallery/sections/ContactSection";
import FreetimeSection from "@/components/gallery/sections/FreetimeSection";
import GamesSection from "@/components/gallery/sections/GamesSection";
import MusicSection from "@/components/gallery/sections/MusicSection";
import PhotoSection from "@/components/gallery/sections/PhotoSection";
import type { SectionId } from "@/lib/navigation";

interface SectionContentProps {
  sectionId: SectionId;
}

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  about: AboutSection,
  music: MusicSection,
  bakery: BakerySection,
  games: GamesSection,
  photo: PhotoSection,
  contact: ContactSection,
  freetime: FreetimeSection,
};

export default function SectionContent({ sectionId }: SectionContentProps) {
  const Component = SECTION_COMPONENTS[sectionId];
  return <Component />;
}
