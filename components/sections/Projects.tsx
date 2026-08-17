"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, ChevronRight, ChevronLeft, Images, Layers, Zap, BookOpen } from "lucide-react";
import { projects, type Project, type ArchLayer } from "@/lib/data";

// ─── Stack color map ──────────────────────────────────────────────────────────
const stackColor = (s: string) => {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    "Angular":        { bg: "#dd003112", text: "#ff6b6b", border: "#dd003130" },
    "Spring Boot":    { bg: "#6db33f12", text: "#86efac", border: "#6db33f30" },
    "PostgreSQL":     { bg: "#33679112", text: "#93c5fd", border: "#33679130" },
    "Docker":         { bg: "#2496ed12", text: "#7dd3fc", border: "#2496ed30" },
    "Python / Rasa":  { bg: "#3776ab12", text: "#93c5fd", border: "#3776ab30" },
    "WebSocket":      { bg: "#f59e0b12", text: "#fcd34d", border: "#f59e0b30" },
    "JWT":            { bg: "#8b5cf612", text: "#c4b5fd", border: "#8b5cf630" },
    "React":          { bg: "#61dafb12", text: "#67e8f9", border: "#61dafb30" },
    "Node.js":        { bg: "#33993312", text: "#86efac", border: "#33993330" },
  };
  return map[s] ?? { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.1)" };
};

// ─── Architecture mini-diagram ───────────────────────────────────────────────
function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>
        Architecture
      </p>
      <div className="flex flex-col gap-1">
        {layers.map((layer, i) => (
          <div key={layer.id} className="flex flex-col items-center">
            <motion.div
              className="arch-node w-full cursor-pointer"
              style={{
                borderColor: active === layer.id ? layer.color : undefined,
                background:  active === layer.id ? `${layer.color}10` : undefined,
                color:       active === layer.id ? layer.color : undefined,
              }}
              onHoverStart={() => setActive(layer.id)}
              onHoverEnd={() => setActive(null)}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-mono text-[10px] font-bold opacity-50 w-4">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: layer.color }}
              />
              <span className="font-semibold text-[11px] flex-1">{layer.label}</span>
              <span className="font-mono text-[9px] opacity-50">{layer.tech}</span>
            </motion.div>
            {i < layers.length - 1 && (
              <div className="w-px h-2 opacity-30" style={{ background: layers[i].color }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────
function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [shot, setShot] = useState(0);

  const shots = project.screenshots ?? [];

  const prev = () => setShot(s => (s - 1 + shots.length) % shots.length);
  const next = () => setShot(s => (s + 1) % shots.length);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border-2)",
          boxShadow: "0 0 80px rgba(139,92,246,0.2), 0 40px 80px rgba(0,0,0,0.6)",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: "var(--color-bg-muted)", borderBottom: "1px solid var(--color-border)" }}
        >
          <div>
            <span className="font-mono text-xs text-violet-400 tracking-widest">PROJECT {project.number}</span>
            <h3 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-all hover:bg-white/10"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Screenshot gallery */}
          {shots.length > 0 && (
            <div>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--color-border-2)", background: "var(--color-bg)" }}
              >
                {/* Chrome */}
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-muted)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span
                    className="flex-1 mx-2 h-5 rounded-md flex items-center px-2 font-mono text-[9px] overflow-hidden whitespace-nowrap"
                    style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                  >
                    {project.id.replace(/-/g, ".")}.app
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: "#a78bfa" }}>
                    {String(shot + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Stage */}
                <div className="relative aspect-video overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={shot}
                      src={shots[shot]}
                      alt={`${project.title} — capture ${shot + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -28 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>

                  {shots.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Capture précédente"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Capture suivante"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {shots.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setShot(i)}
                    aria-label={`Capture ${i + 1}`}
                    className="relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${i === shot ? "rgba(139,92,246,0.65)" : "var(--color-border)"}`,
                      boxShadow: i === shot ? "0 0 14px rgba(139,92,246,0.25)" : "none",
                      opacity: i === shot ? 1 : 0.55,
                    }}
                  >
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subtitle */}
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
              {project.subtitle}
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Role: <span style={{ color: "var(--color-text-secondary)" }}>{project.role}</span>
            </p>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map(s => {
              const c = stackColor(s);
              return (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg font-mono font-medium"
                  style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                >
                  {s}
                </span>
              );
            })}
          </div>

          {/* 2-col: Problem/Solution + Arch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              {/* Problem */}
              <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <h4 className="font-semibold text-sm mb-2 text-red-400 flex items-center gap-1.5">
                  <span className="font-mono">01</span> Problem
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {project.problem}
                </p>
              </div>
              {/* Solution */}
              <div className="rounded-xl p-4" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)" }}>
                <h4 className="font-semibold text-sm mb-2 text-cyan-400 flex items-center gap-1.5">
                  <span className="font-mono">02</span> Solution
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {project.solution}
                </p>
              </div>
            </div>
            {/* Architecture */}
            <div className="rounded-xl p-4" style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <ArchDiagram layers={project.arch} />
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>
              <Zap className="w-4 h-4 text-violet-400" />
              Key Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  <ChevronRight className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>
              <Layers className="w-4 h-4 text-amber-400" />
              Technical Challenges
            </h4>
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  <span className="font-mono text-amber-400 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Learned */}
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>
              <BookOpen className="w-4 h-4 text-emerald-400" />
              What I Learned
            </h4>
            <ul className="space-y-2">
              {project.learned.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onClick={onOpen}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full transition-all duration-500"
        style={{
          background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
          opacity: 0.4,
        }}
      />
      <div
        className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "linear-gradient(90deg, #8b5cf6, #22d3ee)" }}
      />

      {/* Screenshot — browser mockup with stacked "peek" effect */}
      {project.screenshots.length > 0 && (
        <div
          className="pt-5 px-5 pb-0"
          style={{ background: "linear-gradient(180deg, rgba(139,92,246,0.05), transparent)" }}
        >
          <div
            className="relative rounded-xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(139,92,246,0.18)]"
            style={{ border: "1px solid var(--color-border-2)", background: "var(--color-bg)" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-muted)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span
                className="flex-1 mx-2 h-5 rounded-md flex items-center px-2 font-mono text-[9px] overflow-hidden whitespace-nowrap"
                style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
              >
                {project.id.replace(/-/g, ".")}.app
              </span>
            </div>

            {/* Screenshot stage */}
            <div className="relative h-40 sm:h-44 overflow-hidden">
              <img
                src={project.screenshots[1]}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 rotate-[2deg] scale-95 group-hover:rotate-0 group-hover:scale-100"
              />
              <img
                src={project.screenshots[0]}
                alt={`${project.title} — interface`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:translate-x-12 group-hover:rotate-1"
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), transparent 55%)" }}
              />
              {/* Counter badge */}
              <div
                className="absolute bottom-2 right-2 flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded-lg backdrop-blur"
                style={{ background: "rgba(0,0,0,0.55)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                <Images className="w-3 h-3" />
                {String(project.screenshots.length).padStart(2, "0")} captures
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Number + title */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              PROJECT {project.number}
            </span>
            <h3 className="text-xl font-bold mt-0.5 group-hover:text-violet-300 transition-colors duration-300"
              style={{ color: "var(--color-text-primary)" }}
            >
              {project.title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {project.subtitle}
            </p>
          </div>
          <ArrowRight
            className="w-5 h-5 flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-400"
            style={{ color: "var(--color-text-muted)" }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(139,92,246,0.1)",
                color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--color-text-secondary)" }}>
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map(s => {
            const c = stackColor(s);
            return (
              <span
                key={s}
                className="font-mono text-[10px] px-2 py-0.5 rounded-lg"
                style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
              >
                {s}
              </span>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <button
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onClick={e => { e.stopPropagation(); onOpen(); }}
          >
            <span className="text-violet-400">→</span>
            <span className="group-hover:text-violet-300 transition-colors">View case study</span>
          </button>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={e => e.stopPropagation()}
                className="p-1.5 rounded-lg transition-all hover:text-white hover:bg-white/10"
                style={{ color: "var(--color-text-muted)" }}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                onClick={e => e.stopPropagation()}
                className="p-1.5 rounded-lg transition-all hover:text-cyan-400 hover:bg-cyan-400/10"
                style={{ color: "var(--color-text-muted)" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export default function Projects({ preview = false }: { preview?: boolean }) {
  const [selected, setSelected] = useState<Project | null>(null);

  const displayed = preview ? projects : projects;

  return (
    <>
      <section className="section" id="projects">
        <div className="container-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label">Projects</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {preview ? "Featured Projects" : "Engineering Projects"}
                </h2>
                <p className="mt-2 text-sm max-w-lg" style={{ color: "var(--color-text-secondary)" }}>
                  Real applications built from scratch — from architecture to deployment.
                  Click any card to explore the case study.
                </p>
              </div>
              {preview && (
                <a
                  href="#projects"
                  className="btn-ghost flex-shrink-0 self-start sm:self-auto"
                >
                  All projects
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayed.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={() => setSelected(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
