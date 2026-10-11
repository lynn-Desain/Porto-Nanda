import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";
import { cn } from "../../lib/utils";

interface SignatureMarkProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

/**
 * The site's signature element: a rough, hand-drawn marker underline
 * that "draws itself" the first time it scrolls into view. It reappears
 * under key words across Hero, SectionHeading, the featured project title,
 * and the footer signature line.
 */
export function SignatureMark({
  children,
  color = "#FACC15",
  className,
}: SignatureMarkProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });
  const reduceMotion = useReducedMotionSafe();

  return (
    <span ref={ref} className={cn("marker-underline", className)}>
      {children}
      <svg viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M4 14.5C40 6, 80 20, 118 12C150 5.5, 180 18, 216 9"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 0.65, ease: "easeInOut", delay: 0.1 }
          }
        />
      </svg>
    </span>
  );
}
