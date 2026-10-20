"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight?: boolean;
}

function Word({ children, progress, range, isHighlight }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const activeColor = isHighlight ? "var(--accent)" : "#FFFFFF";
  const color = useTransform(progress, range, ["rgba(255, 255, 255, 0.25)", activeColor]);

  return (
    <span className="relative inline-block mr-[0.28em] last:mr-0 select-none">
      {/* Ghost text for layout stability */}
      <span className="opacity-25 text-white/25 select-none">{children}</span>
      {/* Active illuminated word */}
      <motion.span
        style={{ opacity, color }}
        className={`absolute inset-0 select-text font-normal transition-shadow ${
          isHighlight ? "font-medium" : ""
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface ScrollWordRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export default function ScrollWordReveal({
  text,
  className = "",
  highlightWords = ["Full-Stack", "Estrategista", "alta", "performance", "vendas"],
}: ScrollWordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.2 / words.length);
        const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "");
        const isHighlight = highlightWords.includes(cleanWord);

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            isHighlight={isHighlight}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}
