"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import AfterMediaViewer from "./AfterMediaViewer";

export interface StrategyProject {
  id: string;
  title: string;
  summary?: string;
  description: string;
  architecture?: string;
  tags: string[];
  image?: string;
  video?: string;
  gif?: string;
  imagesBefore?: string[];
  imagesAfter?: string[];
  colSpan?: string;
  category?: string;
  segment?: string;
}

interface VisualStrategyShowcaseProps {
  projects: StrategyProject[];
  onResetFilter?: () => void;
}

export default function VisualStrategyShowcase({
  projects,
  onResetFilter,
}: VisualStrategyShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const tabsContainerRefMobile = useRef<HTMLDivElement>(null);
  const tabsContainerRefDesktop = useRef<HTMLDivElement>(null);
  const tabItemRefsMobile = useRef<(HTMLButtonElement | null)[]>([]);
  const tabItemRefsDesktop = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset to first slide whenever the project list changes (e.g. on filter change)
  useEffect(() => {
    setCurrentIndex(0);
  }, [projects]);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-scroll the active tab pill into view whenever currentIndex changes (on mobile and desktop)
  useEffect(() => {
    const activeBtnMobile = tabItemRefsMobile.current[currentIndex];
    if (activeBtnMobile && tabsContainerRefMobile.current) {
      activeBtnMobile.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    const activeBtnDesktop = tabItemRefsDesktop.current[currentIndex];
    if (activeBtnDesktop && tabsContainerRefDesktop.current) {
      activeBtnDesktop.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <p className="text-[var(--muted)] text-base">
          Nenhum projeto de estratégia visual encontrado para esta categoria.
        </p>
        {onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-4 text-xs tracking-wider border border-[var(--border)] px-4 py-2 rounded-full text-white hover:border-white/40 transition-colors"
          >
            Ver todos os projetos
          </button>
        )}
      </motion.div>
    );
  }

  const currentProject = projects[currentIndex] || projects[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <div className="w-full flex flex-col gap-5 mt-4">
      {/* TOP CONTROLLER BAR */}
      <div className="w-full p-3 sm:p-4 rounded-2xl bg-black/50 border border-[var(--border)] backdrop-blur-md flex flex-col gap-3">
        {/* MOBILE VIEW: Row 1 has Counter + Arrow Buttons */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          {/* Counter Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
            <span className="text-[var(--accent)] font-semibold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--muted)]">/</span>
            <span className="text-[var(--muted)]">
              {String(total).padStart(2, "0")}
            </span>
            <span className="text-[var(--muted)] ml-1 font-sans text-[11px] truncate max-w-[140px]">
              {currentProject.title}
            </span>
          </div>

          {/* Mobile Arrows (Large tap targets) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              disabled={total <= 1}
              aria-label="Projeto anterior"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 touch-manipulation"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              disabled={total <= 1}
              aria-label="Próximo projeto"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 touch-manipulation"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* MOBILE VIEW: Row 2 is the Horizontal Scrollable Tabs Strip */}
        <div
          ref={tabsContainerRefMobile}
          className="flex sm:hidden items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth overscroll-x-contain touch-pan-x py-1"
        >
          {projects.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                ref={(el) => {
                  tabItemRefsMobile.current[idx] = el;
                }}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full transition-all duration-200 border whitespace-nowrap active:scale-95 touch-manipulation ${
                  isActive
                    ? "bg-[var(--accent)] text-black font-semibold border-[var(--accent)] shadow-[0_0_12px_rgba(232,196,104,0.3)]"
                    : "bg-white/5 text-[var(--muted)] hover:text-white border-white/10"
                }`}
              >
                <span className="opacity-70 mr-1">{idx + 1}.</span>
                {proj.title}
              </button>
            );
          })}
        </div>

        {/* DESKTOP VIEW: Clean 1-Row layout (Counter | Tabs | Arrows) */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          {/* Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white whitespace-nowrap shrink-0">
            <span className="text-[var(--accent)] font-semibold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--muted)]">/</span>
            <span className="text-[var(--muted)]">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Quick jump pills */}
          <div
            ref={tabsContainerRefDesktop}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth overscroll-x-contain py-1"
          >
            {projects.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={proj.id}
                  ref={(el) => {
                    tabItemRefsDesktop.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  title={proj.title}
                  className={`shrink-0 px-3 py-1.5 text-xs rounded-full transition-all duration-200 whitespace-nowrap border ${
                    isActive
                      ? "bg-[var(--accent)] text-black font-semibold border-[var(--accent)] shadow-[0_0_12px_rgba(232,196,104,0.3)]"
                      : "bg-white/5 text-[var(--muted)] hover:text-white border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="opacity-70 mr-1">{idx + 1}.</span>
                  {proj.title.length > 28
                    ? `${proj.title.slice(0, 28)}...`
                    : proj.title}
                </button>
              );
            })}
          </div>

          {/* Desktop Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              disabled={total <= 1}
              aria-label="Projeto anterior"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
            >
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              disabled={total <= 1}
              aria-label="Próximo projeto"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
            >
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE SLIDE CONTENT (WITH TOUCH SWIPE SUPPORT) */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipePower = offset.x * velocity.x;
              // Swipe left -> next slide
              if (offset.x < -45 || swipePower < -1000) {
                nextSlide();
              }
              // Swipe right -> prev slide
              else if (offset.x > 45 || swipePower > 1000) {
                prevSlide();
              }
            }}
            className="flex flex-col gap-6 sm:gap-8 rounded-3xl p-4 sm:p-8 md:p-10 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm touch-pan-y"
          >
            {/* Header do Estudo de Caso */}
            <div className="flex flex-col gap-3 max-w-4xl">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
                {currentProject.title}
              </h2>

              <p className="text-[var(--muted)] text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                {currentProject.description}
              </p>

              {/* Tags */}
              {currentProject.tags && currentProject.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] sm:text-xs tracking-wider border border-[var(--border)] px-2.5 sm:px-3 py-1 rounded-full text-[var(--muted)] bg-black/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* MÍDIA ANTES E DEPOIS (LADO A LADO) */}
            {(currentProject.imagesBefore ||
              currentProject.imagesAfter ||
              currentProject.video) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-1 items-start">
                {/* ANTES CAROUSEL */}
                {currentProject.imagesBefore && currentProject.imagesBefore.length > 0 && (
                  <div className="w-full flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 min-h-[28px] sm:min-h-[32px]">
                      <div className="w-2 h-2 rounded-full bg-[var(--muted)]"></div>
                      <h4 className="text-xs sm:text-sm tracking-widest text-[var(--muted)] font-semibold uppercase">
                        ANTES (Padrão Antigo)
                      </h4>
                    </div>
                    <ImageCarousel
                      images={currentProject.imagesBefore}
                      altPrefix="Antes"
                    />
                  </div>
                )}

                {/* DEPOIS VIEWER (FOTOS / VÍDEO) */}
                {(currentProject.imagesAfter || currentProject.video) && (
                  <div className="w-full flex flex-col gap-2.5">
                    <AfterMediaViewer
                      images={currentProject.imagesAfter}
                      video={currentProject.video}
                      altPrefix="Depois"
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER HELPER */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs text-[var(--muted)] px-2">
        <span className="sm:hidden">
          Arraste para o lado para trocar de projeto
        </span>
        <span className="hidden sm:inline">
          Dica: Você também pode usar as teclas <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">←</kbd> e <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">→</kbd> para navegar.
        </span>
        <span className="ml-auto">
          {currentIndex + 1} de {total}
        </span>
      </div>
    </div>
  );
}
