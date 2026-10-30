"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { useI18n } from "../../lib/i18n";
import { projects, Project } from "../../data/projects";
import { BlurReveal } from "../ui/BlurReveal";
import { Orb } from "../ui/Orb";
import { DynamicCompanion } from "../companions/DynamicCompanion";
import { useSpawnContext } from "../companions/SpawnContext";
import { SpawnSlot } from "../companions/types";
import { playPokeSound } from "../../lib/sound";

export function ProjectsSection() {
  const { t, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { assignments } = useSpawnContext();

  const categories = [
    { id: "all", label: t.projects.filterAll },
    { id: "web", label: t.projects.filterWeb },
    { id: "desktop", label: t.projects.filterDesktop },
    { id: "system", label: t.projects.filterSystem },
    { id: "localization", label: t.projects.filterLocalization },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "system") {
      return (
        project.category.includes("system") ||
        project.category.includes("automation")
      );
    }
    return project.category.includes(
      activeCategory as Project["category"][number]
    );
  });

  // Randomized selection of at most 3 cards to host peeker companions
  const peekerSlotsByIndex = useMemo(() => {
    const count = Math.min(3, filteredProjects.length);
    if (count === 0) return {};

    const seedString = `${assignments["projects-card-0"] || "c0"}-${assignments["projects-card-1"] || "c1"}-${assignments["projects-card-2"] || "c2"}-${activeCategory}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash * 31 + seedString.charCodeAt(i)) >>> 0;
    }

    const availableIndices = Array.from({ length: filteredProjects.length }, (_, i) => i);
    let rngState = hash || 987654321;
    const lcg = () => {
      rngState = (rngState * 1664525 + 1013904223) >>> 0;
      return rngState / 4294967296;
    };

    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(lcg() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    const chosenIndices = availableIndices.slice(0, count);
    const slotMap: Record<number, SpawnSlot> = {};
    chosenIndices.forEach((cardIdx, slotIdx) => {
      slotMap[cardIdx] = `projects-card-${slotIdx}` as SpawnSlot;
    });

    return slotMap;
  }, [filteredProjects.length, assignments, activeCategory]);

  // Handle modal close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative w-full pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]/50 overflow-hidden scroll-mt-16"
    >
      <Orb top="30%" left="-5%" size={500} delay={2} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <BlurReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] tracking-[-0.04em]">
                {t.projects.title}
              </h2>
              <p className="text-[var(--ink-muted)] mt-2 text-base max-w-lg">
                {t.projects.subtitle}
              </p>
            </div>

            {/* Filter Chips - Retro Pixel Segmented Chassis */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--surface-2)] border-2 border-[var(--line)] shadow-[3px_3px_0px_var(--line)] self-start sm:self-auto rounded-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (!isActive) {
                        try {
                          playPokeSound();
                        } catch {
                          // Ignore
                        }
                      }
                      setActiveCategory(cat.id);
                    }}
                    className={`relative px-3 py-1.5 text-xs font-pixel tracking-wider select-none cursor-pointer transition-all border ${
                      isActive
                        ? "border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] font-bold shadow-[2px_2px_0px_var(--accent)]"
                        : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--line)]/50"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {isActive && <span className="text-[var(--accent)] text-[10px]">▶</span>}
                      <span>{cat.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            </div>
        </BlurReveal>

        {/* Bento Grid with smooth fade-out then fade-in transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, idx) => {
              const isFeatured = project.featured;

              return (
                <div
                  key={project.slug}
                  style={{ zIndex: idx + 1 }}
                  className={`relative ${
                    isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                  }`}
                >
                  {/* Peeking Mini Characters behind project cards (max 3, randomized across cards) */}
                  {peekerSlotsByIndex[idx] && (
                    <DynamicCompanion slot={peekerSlotsByIndex[idx]} />
                  )}

                  <div
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label={`${project.title} — ${t.projects.details}`}
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    className="group relative z-10 w-full h-full rounded-none bg-[var(--surface)] border-2 border-[var(--line)] hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] shadow-[4px_4px_0px_var(--line)] hover:shadow-[5px_5px_0px_var(--accent)] transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                  {/* Top Cover Visual */}
                  <div className="relative w-full h-48 sm:h-56 bg-[var(--surface-2)] overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={project.cover.endsWith(".svg")}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4 line-clamp-2">
                        {project.summary[locale]}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]/60">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-none border border-[var(--line)]/80 bg-[var(--surface-2)] text-[11px] font-mono text-[var(--ink-muted)] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[11px] font-mono text-[var(--ink-muted)]">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Shared Layout Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none bg-[var(--surface)] border-2 border-[var(--line)] shadow-[8px_8px_0px_rgba(0,0,0,0.6)] p-6 sm:p-8 z-10 text-[var(--ink)]"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3
                    id="project-modal-title"
                    className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--ink)]"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--accent)] font-semibold mt-1">
                    {selectedProject.role[locale]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-none bg-[var(--surface-2)] border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] cursor-pointer"
                  aria-label={t.projects.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cover Graphic in Modal */}
              <div className="relative w-full h-56 sm:h-64 rounded-none border-2 border-[var(--line)] shadow-[3px_3px_0px_var(--line)] overflow-hidden mb-6 bg-[var(--surface-2)]">
                <Image
                  src={selectedProject.cover}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  unoptimized={selectedProject.cover.endsWith(".svg")}
                  className="object-cover"
                />
              </div>

              {/* In-depth Narrative */}
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                  {selectedProject.description[locale]}
                </p>

                {selectedProject.outcome && (
                  <div className="border-l-2 border-[var(--accent)] pl-4 py-1">
                    <span className="text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider block mb-1">
                      {t.projects.modalOutcome}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                      {selectedProject.outcome[locale]}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Details */}
              <div className="mb-6">
                <span className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-wider block mb-2">
                  {t.projects.modalStack}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-none border border-[var(--line)] shadow-[1px_1px_0px_var(--line)] bg-[var(--surface-2)] text-xs font-mono text-[var(--ink)] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--line)]">
                {selectedProject.links.repo && (
                  <a
                    href={selectedProject.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)] font-pixel text-xs tracking-wider bg-[var(--ink)] text-[var(--surface)] hover:opacity-90 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.projects.viewRepo}</span>
                  </a>
                )}
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)] font-pixel text-xs tracking-wider bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.projects.viewLive}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
