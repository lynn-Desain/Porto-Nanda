import { useReducedMotion } from "framer-motion";

/** Wrapper kept separate so components import one convention across the app. */
export function useReducedMotionSafe() {
  return useReducedMotion();
}
