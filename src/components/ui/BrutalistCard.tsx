import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Shadow = "sm" | "md" | "lg";

interface BrutalistCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  shadow?: Shadow;
  hover?: boolean;
  rounded?: "sm" | "md" | "lg";
  as?: "div" | "article";
}

const shadowClass: Record<Shadow, string> = {
  sm: "brut-shadow-sm",
  md: "brut-shadow-md",
  lg: "brut-shadow-lg",
};

const roundedClass = {
  sm: "rounded-[8px]",
  md: "rounded-[16px]",
  lg: "rounded-[24px]",
};

export function BrutalistCard({
  children,
  shadow = "md",
  hover = true,
  rounded = "md",
  className,
  as = "div",
  ...rest
}: BrutalistCardProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "brut-surface brut-border border-[3px]",
        roundedClass[rounded],
        shadowClass[shadow],
        hover && "brut-hover",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
