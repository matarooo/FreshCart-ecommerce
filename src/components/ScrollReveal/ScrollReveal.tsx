"use client";

import { useEffect, useRef, useState } from "react";
import type { ScrollRevealProps } from "./@type";

const startingPosition = {
  left: "motion-safe:data-[visible=false]:-translate-x-[50px]",
  right: "motion-safe:data-[visible=false]:translate-x-[50px]",
  up: "motion-safe:data-[visible=false]:translate-y-[50px]",
};

export function ScrollReveal({ children, direction }: ScrollRevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={element}
      data-visible={visible}
      className={`motion-safe:transition-[translate,opacity] motion-safe:delay-100 motion-safe:duration-[600ms] motion-safe:ease-out motion-safe:data-[visible=false]:opacity-0 motion-safe:focus-within:translate-x-0 motion-safe:focus-within:translate-y-0 motion-safe:focus-within:opacity-100 ${startingPosition[direction]}`}
    >
      {children}
    </div>
  );
}
