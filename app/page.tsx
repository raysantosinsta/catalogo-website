"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ImageCarousel from "../components/ImageCarousel";
import AfterMediaViewer from "../components/AfterMediaViewer";
import ScrollBackground from "../components/ScrollBackground";
import ScrollWordReveal from "../components/ScrollWordReveal";
import VisualStrategyShowcase from "../components/VisualStrategyShowcase";

// Define the project type
export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  architecture: string;
  tags: string[];
  image?: string;
  video?: string;
  gif?: string;
  imagesBefore?: string[];
  imagesAfter?: string[];
  colSpan: string;
  demoUrl?: string;
  repoUrl?: string;
  category?: string;
  segment?: string;
};

export type CatalogData = {
  criacaoDeSites: Project[];
  estrategiaVisual: Project[];
  saas: Project[];
};

export type SubCategoryFilter = {
  id: string;
  label: string;
  segment?: string;
};

export type TabType = "site" | "social-media" | "saas";

export const CATEGORY_FILTERS: Record<TabType, SubCategoryFilter[]> = {
  site: [
    { id: "all", label: "Todos" },
    { id: "clinica-estetica", label: "Clínicas de Estética" },
    { id: "odontologia", label: "Odontologia" },
    { id: "nutricao", label: "Nutrição & Saúde" },
  ],
  "social-media": [
    { id: "all", label: "Todos" },
    { id: "odontologia", label: "Odontologia" },
    { id: "ecommerce", label: "Campanhas de E-commerce" },
    { id: "carrossel", label: "Carrosséis Educativos" },
  ],
  saas: [
    { id: "all", label: "Todos" },
    { id: "ia", label: "Inteligência Artificial" },
    { id: "automacao", label: "Gestão & Automação" },
  ],
};

import rawData from "../data.json";
const catalogData = rawData as CatalogData;

function resolveQueryParams(params: URLSearchParams) {
  const cat = (params.get("categoria") || params.get("category") || params.get("nicho") || "").toLowerCase().trim();
  const rawTab = (params.get("aba") || params.get("tab") || "").toLowerCase().trim();

  let resolvedTab: TabType = "site";
  let resolvedCat = "all";

  // Tab mapping
  if (rawTab === "social-media" || rawTab === "estrategia-visual" || rawTab === "visual") {
    resolvedTab = "social-media";
  } else if (rawTab === "saas" || rawTab === "sistemas") {
    resolvedTab = "saas";
  } else if (rawTab === "site" || rawTab === "sites") {
    resolvedTab = "site";
  }

  // Category inference
  if (cat) {
    if (["odontologia", "clinica-estetica", "estetica", "nutricao", "saude"].includes(cat)) {
      resolvedTab = "site";
      resolvedCat = cat === "estetica" ? "clinica-estetica" : (cat === "saude" ? "nutricao" : cat);
    } else if (["ecommerce", "carrossel"].includes(cat)) {
      resolvedTab = "social-media";
      resolvedCat = cat;
    } else if (["ia", "automacao"].includes(cat)) {
      resolvedTab = "saas";
      resolvedCat = cat;
    } else {
      resolvedCat = cat;
    }
  }

  return { resolvedTab, resolvedCat };
}

function HomeContent() {
  const searchParams = useSearchParams();
  const catalogRef = useRef<HTMLElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("site");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Read URL parameters on initial load / when searchParams change
  useEffect(() => {
    const { resolvedTab, resolvedCat } = resolveQueryParams(searchParams);
    setActiveTab(resolvedTab);
    setSelectedCategory(resolvedCat);

    // If an explicit category or tab was provided in the URL, smoothly scroll to catalog
    if (resolvedCat !== "all" || searchParams.has("aba") || searchParams.has("tab") || searchParams.has("categoria")) {
      setTimeout(() => {
        catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, [searchParams]);

  // Synchronize browser URL without page reload
  const updateUrl = (tab: TabType, cat: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (tab !== "site") {
      params.set("aba", tab);
    }
    if (cat && cat !== "all") {
      params.set("categoria", cat);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    setSelectedCategory("all");
    updateUrl(newTab, "all");
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    updateUrl(activeTab, newCategory);
  };

  const tabProjects: Record<TabType, Project[]> = {
    site: catalogData.criacaoDeSites || [],
    "social-media": catalogData.estrategiaVisual || [],
    saas: catalogData.saas || [],
  };

  const currentTabProjects = tabProjects[activeTab] || [];

  const displayedProjects = currentTabProjects.filter((project) => {
    if (selectedCategory === "all" || selectedCategory === "todos") return true;
    return project.category === selectedCategory || project.segment === selectedCategory;
  });

  const heroText = "Desenvolvedor Full-Stack e Estrategista de Conteúdo Visual & Social Media. Uno tecnologia e estratégias de conversão de alta performance para transformar tráfego em vendas no e-commerce e no comércio físico.";

  return (
    <main className="min-h-screen text-[var(--foreground)] relative overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
      <ScrollBackground />
      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32 pb-14 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Lado Esquerdo: Texto & Apresentação */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[var(--accent)] tracking-wide mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Software Engineer & Visual Strategist
          </motion.div>

          {/* Heading - Tech Minimalista (Inter Bold, tracking-tight) */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]"
            >
              HIGHLANDER SANTOS
            </motion.h1>
          </div>

          {/* Scroll-Driven Text Reveal (Word by Word) */}
          <ScrollWordReveal
            text={heroText}
            className="text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl"
          />
        </div>

        {/* Lado Direito: Imagem de Perfil */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] group bg-[var(--card)]"
          >
            {/* Efeito Glow Dourado sutil de fundo */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--accent)]/20 via-transparent to-white/10 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

            {/* Imagem configurada para /profile.jpg */}
            <Image
              src="/profile.jpg"
              alt="Highlander Santos"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-top grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              priority
            />

            {/* Gradiente sutil na base para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="pt-4 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 p-1 bg-black/40 border border-[var(--border)] rounded-full backdrop-blur-md">
          {[
            { id: "site", label: "Criação de Sites" },
            { id: "social-media", label: "Estratégia Visual" },
            { id: "saas", label: "Sistemas SaaS" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as TabType)}
              className={`relative px-6 py-2.5 text-sm font-medium transition-colors rounded-full ${
                activeTab === tab.id ? "text-black" : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SUB-CATEGORIES / SEGMENT FILTERS (FOR ALL SECTIONS) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`subcategories-${activeTab}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {CATEGORY_FILTERS[activeTab]?.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200 border ${
                    isSelected
                      ? "border-[var(--accent)] text-black font-semibold shadow-[0_0_15px_rgba(232,196,104,0.3)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-white/20 bg-black/40 backdrop-blur-sm"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSubCategory"
                      className="absolute inset-0 bg-[var(--accent)] rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CATALOG CONTENT */}
      <section ref={catalogRef} id="catalogo" className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeTab === "social-media" ? (
            <VisualStrategyShowcase
              projects={displayedProjects}
              onResetFilter={() => handleCategoryChange("all")}
            />
          ) : (
            displayedProjects.length === 0 ? (
              <motion.div
                key="grid-empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-[var(--muted)] text-base">Nenhum modelo encontrado para esta categoria.</p>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="mt-4 text-xs tracking-wider border border-[var(--border)] px-4 py-2 rounded-full text-white hover:border-white/40 transition-colors"
                >
                  Ver todos os modelos
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`grid-view-${activeTab}-${selectedCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px]"
              >
                {displayedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-xl bg-[var(--card)] border border-[var(--border)] ${project.colSpan}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { if (project.demoUrl && project.demoUrl !== "#") window.location.href = project.demoUrl; }}
                  >
                    {/* Visualizer based on Category */}
                    <>
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                        {(project.gif || project.video) ? (
                          <img
                            src={project.gif ?? project.video}
                            alt={project.title}
                            className="object-cover object-center w-full h-full"
                          />
                        ) : project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 120px) 50vw, 33vw"
                            className="object-cover object-center"
                            priority={index === 0}
                          />
                        ) : null}
                      </div>

                      {activeTab === "saas" && (
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-white text-xs font-medium tracking-wider">
                          <MonitorSmartphone size={14} className="text-[var(--accent)]" />
                          SaaS
                        </div>
                      )}
                    </>

                    {/* Overlay (Hover Effect) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-8 pointer-events-none">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                      >
                        <h2 className="text-2xl md:text-3xl font-medium mb-2">{project.title}</h2>
                        <p className="text-[var(--muted)] text-sm md:text-base mb-6 line-clamp-2">{project.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs tracking-wider border border-[var(--border)] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
