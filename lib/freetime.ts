export type DayStatus = "busy" | "free" | "gaming";

export interface DaySchedule {
  id: string;
  roman: string;
  shortName: string;
  name: string;
  status: DayStatus;
  message: string;
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  {
    id: "mon",
    roman: "I",
    shortName: "Пн",
    name: "Понедельник",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "tue",
    roman: "II",
    shortName: "Вт",
    name: "Вторник",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "wed",
    roman: "III",
    shortName: "Ср",
    name: "Среда",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "thu",
    roman: "IV",
    shortName: "Чт",
    name: "Четверг",
    status: "busy",
    message: "В глубоком тильте и коде",
  },
  {
    id: "fri",
    roman: "V",
    shortName: "Пт",
    name: "Пятница",
    status: "free",
    message:
      "Свободен после 18:00. Открыт к обсуждению музыки, багетов и IT-проектов",
  },
  {
    id: "sat",
    roman: "VI",
    shortName: "Сб",
    name: "Суббота",
    status: "gaming",
    message:
      "Занят глобальным доминированием в Hearts of Iron IV и Crusader Kings 3",
  },
  {
    id: "sun",
    roman: "VII",
    shortName: "Вс",
    name: "Воскресенье",
    status: "gaming",
    message:
      "Занят глобальным доминированием в Hearts of Iron IV и Crusader Kings 3",
  },
];

export const STATUS_STYLES: Record<
  DayStatus,
  { accent: string; border: string; glow: string }
> = {
  busy: {
    accent: "text-red-400/70",
    border: "border-red-900/30",
    glow: "hover:shadow-[0_0_20px_rgba(127,29,29,0.15)]",
  },
  free: {
    accent: "text-[#D4AF37]/70",
    border: "border-[#D4AF37]/20",
    glow: "hover:shadow-[0_0_24px_rgba(212,175,55,0.1)]",
  },
  gaming: {
    accent: "text-purple-400/60",
    border: "border-purple-900/25",
    glow: "hover:shadow-[0_0_20px_rgba(88,28,135,0.12)]",
  },
};
