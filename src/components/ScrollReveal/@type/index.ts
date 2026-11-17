import type { ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  direction: "left" | "right" | "up";
}
