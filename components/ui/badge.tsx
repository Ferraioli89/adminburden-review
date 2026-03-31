import clsx from "clsx";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "accent" | "success" | "warn";
  className?: string;
}

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        {
          "bg-white/80 text-marino": tone === "default",
          "bg-marino text-white": tone === "accent",
          "bg-musgo text-white": tone === "success",
          "bg-burdeos text-white": tone === "warn"
        },
        className
      )}
    >
      {children}
    </span>
  );
}
