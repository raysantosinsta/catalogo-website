"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll();

  // Mapeia o scroll (0 a 1) para movimentos (Parallax)
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[var(--background)]">
      {/* Orb 1: Cor de destaque principal (Accent) */}
      <motion.div
        style={{ y: y1, x: x1 }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] max-w-[600px] aspect-square rounded-full bg-[var(--accent)] opacity-20 blur-[100px] md:blur-[150px]"
      />
      
      {/* Orb 2: Roxo/Índigo para contraste */}
      <motion.div
        style={{ y: y2, x: x2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] max-w-[500px] aspect-square rounded-full bg-purple-600 opacity-20 blur-[100px] md:blur-[150px]"
      />

      {/* Orb 3: Azul sutil no meio */}
      <motion.div
        style={{ y: y3, scale: scale3 }}
        className="absolute top-[30%] left-[20%] w-[40vw] max-w-[400px] aspect-square rounded-full bg-blue-500 opacity-15 blur-[100px] md:blur-[150px]"
      />
    </div>
  );
}
