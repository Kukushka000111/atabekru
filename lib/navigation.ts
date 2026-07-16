export type SectionId =
  | "about"
  | "music"
  | "bakery"
  | "games"
  | "photo"
  | "contact"
  | "freetime";

export interface GallerySection {
  id: SectionId;
  label: string;
  maxWidth: string;
}

export const GALLERY_SECTIONS: GallerySection[] = [
  { id: "about", label: "О СЕБЕ", maxWidth: "max-w-lg" },
  { id: "music", label: "МУЗЫКА", maxWidth: "max-w-md" },
  { id: "bakery", label: "ГИЛЬДИЯ ХЛЕБА", maxWidth: "max-w-lg" },
  { id: "games", label: "ИГРЫ", maxWidth: "max-w-md" },
  { id: "photo", label: "ФОТО", maxWidth: "max-w-md" },
  { id: "contact", label: "СВЯЗЬ", maxWidth: "max-w-md" },
  { id: "freetime", label: "ДОСУГ", maxWidth: "max-w-4xl" },
];

export function getSectionById(id: SectionId): GallerySection | undefined {
  return GALLERY_SECTIONS.find((section) => section.id === id);
}
