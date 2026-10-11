import type { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";
import { cn } from "../../lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function MagneticButton({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
    useMagnetic(0.25);

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "font-display font-bold text-body px-6 py-3 rounded-[8px] border-[3px] brut-border brut-shadow-sm inline-flex items-center gap-2 cursor-pointer",
        variant === "primary"
          ? "bg-[#2563EB] text-white"
          : "bg-transparent brut-surface",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
