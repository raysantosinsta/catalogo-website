"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Briefcase, Mail, X, ExternalLink } from "lucide-react";
import Image from "next/image";

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
  colSpan: string;
  demoUrl?: string;
  repoUrl?: string;
};

import data from "../data.json";

// Projects data
const projects: Project[] = data.projects;

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <h1 className="text-lg md:text-xl font-light tracking-widest pointer-events-auto">HIGHLANDER SANTOS</h1>
        <div className="flex gap-6 pointer-events-auto">
          <a href="#" className="hover:text-[var(--accent)] transition-colors"><Code size={20} strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors"><Briefcase size={20} strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors"><Mail size={20} strokeWidth={1.5} /></a>
        </div>
      </header>

      {/* CATALOG GRID */}
      <section className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative group cursor-pointer overflow-hidden rounded-sm bg-[var(--card)] border border-[var(--border)] ${project.colSpan}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Media Background */}
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
              
              {/* Overlay (Hover Effect) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                >
                  <h2 className="text-2xl md:text-3xl font-medium mb-2">{project.title}</h2>
                  <p className="text-[var(--muted)] text-sm md:text-base mb-6">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs tracking-wider border border-[var(--border)] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIDE SHEET (GAVETA DE DETALHES) */}
      <AnimatePresence>
        {selectedProject && (
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
                <h3 className="text-xs tracking-widest text-[var(--muted)]">VISÃO DO PROJETO</h3>
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
                  <h4 className="text-xs tracking-widest text-[var(--muted)] mb-4">ARQUITETURA</h4>
                  <p className="text-sm md:text-base text-[var(--foreground)] leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs tracking-widest text-[var(--muted)] mb-4">TECNOLOGIAS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-sm border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-10 flex gap-4">
                  {selectedProject.demoUrl && (
                    <a 
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--foreground)] text-black py-4 px-6 rounded-sm flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent)] transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.repoUrl && (
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
