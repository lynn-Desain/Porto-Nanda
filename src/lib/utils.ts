import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const accentMap = {
  primary: {
    bg: "bg-[#2563EB]",
    text: "text-[#2563EB]",
    border: "border-[#2563EB]",
  },
  secondary: {
    bg: "bg-[#7C3AED]",
    text: "text-[#7C3AED]",
    border: "border-[#7C3AED]",
  },
  accent: {
    bg: "bg-[#FACC15]",
    text: "text-[#FACC15]",
    border: "border-[#FACC15]",
  },
  "accent-2": {
    bg: "bg-[#22C55E]",
    text: "text-[#22C55E]",
    border: "border-[#22C55E]",
  },
  danger: {
    bg: "bg-[#EF4444]",
    text: "text-[#EF4444]",
    border: "border-[#EF4444]",
  },
} as const;

export type Accent = keyof typeof accentMap;
