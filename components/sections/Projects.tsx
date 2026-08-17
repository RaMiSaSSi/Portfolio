"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, ChevronRight, ChevronLeft, Images, Layers, Zap, BookOpen, Sparkles } from "lucide-react";
import { projects, projectCategories, type Project, type ArchLayer } from "@/lib/data";

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
    "React Native":   { bg: "#61dafb12", text: "#67e8f9", border: "#61dafb30" },
    "Node.js":        { bg: "#33993312", text: "#86efac", border: "#33993330" },
    "Express":        { bg: "#33993312", text: "#86efac", border: "#33993330" },
    "Python":         { bg: "#3776ab12", text: "#93c5fd", border: "#3776ab30" },
    "PWA":            { bg: "#8b5cf612", text: "#c4b5fd", border: "#8b5cf630" },
  };
  return map[s] ?? { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.1)" };
};

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status !== "in-progress") return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full"
      style={{ background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      In progress
    </span>
  );
}

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
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: layer.color }} />
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

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, rgba(139,92,246,0.15), transparent 65%)`;

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px * 100);
    my.set(py * 100);
    rx.set(-(py - 0.5) * 7);
    ry.set((px - 0.5) * 9);
  }, [mx, my, rx, ry]);

  const onMouseLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  }, [rx, ry, mx, my]);

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`[perspective:1200px] ${className}`}>
      <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className="relative h-full">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        {children}
      </motion.div>
    </div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [shot, setShot] = useState(0);
  const shots = project.screenshots ?? [];

  const prev = () => setShot(s => (s - 1 + shots.length) % shots.length);
  const next = () => setShot(s => (s + 1) % shots.length);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && shots.length > 0) prev();
      if (e.key === "ArrowRight" && shots.length > 0) next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden"
        style={{
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border-2)",
          boxShadow: "0 0 90px rgba(139,92,246,0.22), 0 48px 96px rgba(0,0,0,0.65)",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4"
          style={{ background: "var(--color-bg-muted)", borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-violet-400 tracking-widest">PROJECT {project.number}</span>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="text-lg font-bold truncate" style={{ color: "var(--color-text-primary)" }}>
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
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
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="p-6 space-y-8">
            {shots.length > 0 && (
              <div>
                <motion.div
                  layoutId={`shot-${project.id}`}
                  className="relative aspect-video overflow-hidden rounded-xl"
                  style={{ border: "1px solid var(--color-border-2)", background: "var(--color-bg)" }}
                >
                  <div
                    className="absolute top-0 inset-x-0 z-10 flex items-center gap-2 px-3 py-2"
                    style={{ background: "rgba(10,10,18,0.6)", backdropFilter: "blur(8px)" }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="flex-1 mx-2 h-5 rounded-md flex items-center px-2 font-mono text-[9px] overflow-hidden whitespace-nowrap"
                      style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                    >
                      {project.id.replace(/-/g, ".")}.app
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: "#a78bfa" }}>
                      {String(shot + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                    </span>
                  </div>

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
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Capture suivante"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                        style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </motion.div>

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

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                {project.subtitle || "Case study"}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Role: <span style={{ color: "var(--color-text-secondary)" }}>{project.role}</span>
              </p>
              {project.description && (
                <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--color-text-secondary)" }}>
                  {project.description}
                </p>
              )}
            </div>

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

            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.problem && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <h4 className="font-semibold text-sm mb-2 text-red-400 flex items-center gap-1.5">
                      <span className="font-mono">01</span> Problem
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)" }}>
                    <h4 className="font-semibold text-sm mb-2 text-cyan-400 flex items-center gap-1.5">
                      <span className="font-mono">02</span> Solution
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-4" style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <ArchDiagram layers={project.arch} />
              </div>

              {project.features.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>
                    <Zap className="w-4 h-4 text-violet-400" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        <ChevronRight className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {project.challenges.length > 0 && (
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
            )}

            {project.learned.length > 0 && (
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
            )}

            {(project.github || project.demo) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BrowserMockup({ project, big = false }: { project: Project; big?: boolean }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(139,92,246,0.18)]"
      style={{ border: "1px solid var(--color-border-2)", background: "var(--color-bg)" }}
    >
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
      <div className={`relative overflow-hidden ${big ? "h-52 sm:h-64" : "h-40 sm:h-44"}`}>
        {project.screenshots.length > 1 && (
          <img
            src={project.screenshots[1]}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 rotate-[2deg] scale-95 group-hover:rotate-0 group-hover:scale-100"
          />
        )}
        <img
          src={project.screenshots[0]}
          alt={`${project.title} — interface`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:translate-x-10"
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), transparent 55%)" }}
        />
        <div
          className="absolute bottom-2 right-2 flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded-lg backdrop-blur"
          style={{ background: "rgba(0,0,0,0.55)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}
        >
          <Images className="w-3 h-3" />
          {String(project.screenshots.length).padStart(2, "0")} captures
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  big,
  onOpen,
}: {
  project: Project;
  index: number;
  big: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative ${big ? "md:col-span-6" : "md:col-span-2"} cursor-pointer`}
      onClick={onOpen}
    >
      <TiltCard className="h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="h-[2px] w-full transition-all duration-500"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #22d3ee)", opacity: 0.4 }}
          />
          <div
            className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500 z-20"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #22d3ee)" }}
          />

          <span
            aria-hidden
            className="absolute -top-5 -right-1 font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ fontSize: big ? "8rem" : "6rem", color: "rgba(139,92,246,0.07)" }}
          >
            {project.number}
          </span>

          <div className="pt-5 px-5 pb-0" style={{ transform: "translateZ(24px)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                PROJECT {project.number}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <BrowserMockup project={project} big={big} />
          </div>

          <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(40px)" }}>
            <h3
              className={`font-bold mt-0.5 group-hover:text-violet-300 transition-colors duration-300 ${big ? "text-2xl sm:text-3xl" : "text-xl"}`}
              style={{ color: "var(--color-text-primary)" }}
            >
              {project.title}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
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

            <div className="mt-4 flex-1">
              {project.description ? (
                <p className={`text-sm leading-relaxed ${big ? "" : "line-clamp-2"}`} style={{ color: "var(--color-text-secondary)" }}>
                  {project.description}
                </p>
              ) : (
                <p className="text-xs italic" style={{ color: "var(--color-text-muted)" }}>
                  Case study coming soon
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
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
        </div>
      </TiltCard>
    </motion.article>
  );
}

function FilterChips({ filter, onChange }: { filter: string; onChange: (f: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {projectCategories.map(c => {
        const active = filter === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`relative px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${active ? "text-white" : ""}`}
            style={{ border: "1px solid var(--color-border)" }}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  boxShadow: "0 4px 18px rgba(124,58,237,0.45)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        );
      })}
    </div>
  );
}

function TechMarquee({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <div
      className="relative mt-16 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
      aria-hidden
    >
      <div className="marquee-track flex w-max items-center py-4">
        {[0, 1].map(copy => (
          <div key={copy} className="flex shrink-0 items-center">
            {stack.map(s => (
              <span
                key={`${copy}-${s}`}
                className="flex items-center gap-8 px-4 font-mono text-xs whitespace-nowrap uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s}
                <span style={{ color: "#8b5cf6" }}>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--color-bg), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--color-bg), transparent)" }}
      />
    </div>
  );
}

export default function Projects({ preview = false }: { preview?: boolean }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  const list = preview ? projects.filter(p => p.featured) : projects;
  const filtered = filter === "All" ? list : list.filter(p => p.category.includes(filter));
  const allStack = Array.from(new Set(projects.flatMap(p => p.stack)));

  return (
    <>
      <section className="section" id="projects">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="section-label flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {preview ? "Selected Work" : "Projects"}
            </p>
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
                  {preview ? " A curated selection of what I ship." : " Click any card to explore the case study."}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {String(list.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                {preview && (
                  <Link href="/projects" className="btn-ghost flex-shrink-0">
                    All projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {!preview && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8"
              >
                <FilterChips filter={filter} onChange={setFilter} />
              </motion.div>
            )}
          </motion.div>

          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-mono py-16 text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              No projects in this category yet.
            </motion.p>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    big={filtered.length === 1 || i === 0}
                    onOpen={() => setSelected(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!preview && <TechMarquee stack={allStack} />}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal key={selected.id} project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
