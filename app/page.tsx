"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Briefcase, Mail, X, ExternalLink, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import ImageCarousel from "../components/ImageCarousel";

// Define the project type
type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  architecture: string;
  tags: string[];
  image?: string;
  video?: string;
  imagesBefore?: string[];
  imagesAfter?: string[];
  colSpan: string;
  demoUrl?: string;
  repoUrl?: string;
  category: "social-media" | "site" | "saas";
};

import data from "../data.json";

// Projects data
const projects: Project[] = data.projects as Project[];

type TabType = "social-media" | "site" | "saas";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("social-media");

  const filteredProjects = projects.filter(project => project.category === activeTab);

  const heroText = "Desenvolvedor Full-Stack e Estrategista de Conteúdo Visual & Social Media. Uno tecnologia e estratégias de conversão de alta performance para transformar tráfego em vendas no e-commerce e no comércio físico.";
  const heroWords = heroText.split(" ");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32 pb-12 px-6 flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl md:text-5xl font-light tracking-widest leading-none pt-2"
          >
            HIGHLANDER SANTOS
          </motion.h1>
        </div>
        
        <motion.p 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.015, delayChildren: 0.4 }
            }
          }}
          className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8 flex flex-wrap justify-center gap-x-[0.25em] gap-y-1"
        >
          {heroWords.map((word, i) => (
            <span key={i} className="overflow-hidden inline-flex pt-1 pb-1 -mt-1 -mb-1">
              <motion.span 
                variants={{
                  hidden: { y: '100%', opacity: 0 },
                  visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </section>

      {/* TABS NAVIGATION */}
      <div className="pt-4 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 p-1 bg-black/40 border border-[var(--border)] rounded-full backdrop-blur-md">
          {[
            { id: "social-media", label: "Estratégia Visual" },
            { id: "site", label: "Criação de Sites" },
            { id: "saas", label: "Sistemas SaaS" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setSelectedProject(null);
              }}
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
      </div>

      {/* CATALOG CONTENT */}
      <section className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeTab === "social-media" ? (
            <motion.div
              key="social-media-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-24 mt-8"
            >
              {filteredProjects.map((project) => (
                <div key={project.id} className="flex flex-col gap-10 border-b border-[var(--border)] pb-24 last:border-0 last:pb-0">
                  {/* Header do Estudo de Caso */}
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-light mb-4">{project.title}</h2>
                    <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs tracking-wider border border-[var(--border)] px-3 py-1 rounded-full text-[var(--muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fotos */}
                  {project.imagesBefore && project.imagesAfter && (
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6">
                      {/* Antes Carousel */}
                      <div className="flex-1 w-full flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[var(--muted)]"></div>
                          <h4 className="text-sm tracking-widest text-[var(--muted)] font-semibold">ANTES</h4>
                        </div>
                        <ImageCarousel images={project.imagesBefore} altPrefix="Antes" />
                      </div>
                      
                      {/* Depois Carousel */}
                      <div className="flex-1 w-full flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                          <h4 className="text-sm tracking-widest text-[var(--accent)] font-semibold">DEPOIS</h4>
                        </div>
                        <ImageCarousel images={project.imagesAfter} altPrefix="Depois" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px]"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl bg-[var(--card)] border border-[var(--border)] ${project.colSpan}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Visualizer based on Category */}
                  <>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="object-cover object-center w-full h-full"
                        />
                      ) : project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center"
                          priority={index === 0}
                        />
                      ) : null}
                    </div>

                    {project.category === "saas" && (
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
          )}
        </AnimatePresence>
      </section>

      {/* SIDE SHEET (GAVETA DE DETALHES - APENAS PARA SITES E SAAS) */}
      <AnimatePresence>
        {selectedProject && selectedProject.category !== "social-media" && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-[var(--background)] border-l border-[var(--border)] z-50 overflow-y-auto flex flex-col shadow-2xl"
            >
              {/* Sheet Header */}
              <div className="sticky top-0 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] p-6 flex justify-between items-center z-10">
                <h3 className="text-xs tracking-widest text-[var(--muted)] uppercase">
                  {selectedProject.category === 'saas' ? 'SISTEMA SAAS' : 'VISÃO DO PROJETO'}
                </h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-[var(--card)] rounded-full transition-colors"
                >
                  <X size={20} className="text-[var(--muted)] hover:text-white transition-colors" />
                </button>
              </div>

              {/* Sheet Content */}
              <div className="p-8 md:p-10 flex-1 flex flex-col gap-10">
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-light mb-4">{selectedProject.title}</h2>
                  <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="h-px w-full bg-[var(--border)]"></div>

                <div>
                  <h4 className="text-xs tracking-widest text-[var(--muted)] mb-4">ARQUITETURA & ESTRATÉGIA</h4>
                  <p className="text-sm md:text-base text-[var(--foreground)] leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs tracking-widest text-[var(--muted)] mb-4">TECNOLOGIAS & TAGS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-sm border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-10 flex gap-4">
                  {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
                    <a 
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--foreground)] text-black py-4 px-6 rounded-sm flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent)] transition-colors"
                    >
                      <ExternalLink size={18} />
                      Acessar Projeto
                    </a>
                  )}
                  {selectedProject.repoUrl && selectedProject.repoUrl !== "#" && (
                    <a 
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-[var(--border)] hover:border-[var(--muted)] py-4 px-6 rounded-sm flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                      <Code size={18} />
                      Código Fonte
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
