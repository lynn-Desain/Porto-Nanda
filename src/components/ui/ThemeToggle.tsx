import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      className="relative w-11 h-11 rounded-[8px] border-[3px] brut-border brut-surface brut-shadow-sm brut-hover flex items-center justify-center overflow-hidden cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === "light" ? (
            <Moon size={18} strokeWidth={2.5} />
          ) : (
            <Sun size={18} strokeWidth={2.5} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
