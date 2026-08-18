"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, ChevronRight, ChevronLeft, X, Images, Layers, Zap, BookOpen, Maximize2, CheckCircle2 } from "lucide-react";
import type { Project, ArchLayer } from "@/lib/data";
import { useState } from "react";

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

function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1.5">
      {layers.map((layer, i) => (
        <div key={layer.id} className="flex flex-col items-start">
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default w-full"
            style={{
              background: active === layer.id ? `${layer.color}14` : "var(--color-surface)",
              border: `1px solid ${active === layer.id ? `${layer.color}60` : "var(--color-border)"}`,
              color: active === layer.id ? layer.color : "var(--color-text-secondary)",
              boxShadow: active === layer.id ? `0 0 24px ${layer.color}25` : "none",
            }}
            onHoverStart={() => setActive(layer.id)}
            onHoverEnd={() => setActive(null)}
            whileHover={{ x: 5 }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: layer.color, boxShadow: `0 0 10px ${layer.color}80` }}
            />
            <span className="font-mono text-sm font-semibold flex-1">{layer.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider opacity-40">{layer.tech}</span>
          </motion.div>
          {i < layers.length - 1 && (
            <div className="ml-4 w-px h-3" style={{ background: `${layers[i].color}50` }} />
          )}
        </div>
      ))}
    </div>
  );
}

function CardSection({
  children,
  tint,
  accent,
  delay = 0,
  wide = false,
}: {
  children: React.ReactNode;
  tint?: string;
  accent?: [string, string];
  delay?: number;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${wide ? "md:col-span-2" : ""}`}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {tint && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(150deg, ${tint}10, transparent 62%)` }}
        />
      )}
      {accent && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${accent[0]}, ${accent[1]})` }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function SectionTitle({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <h2 className="flex items-center gap-3 font-semibold text-lg mb-6" style={{ color: "var(--color-text-primary)" }}>
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
      >
        {icon}
      </span>
      {label}
    </h2>
  );
}

export default function ProjectGallery({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shots = project.screenshots ?? [];
  const isMobile = project.layout === "mobile";

  const prevShot = () => setLightbox(s => (s === null ? s : (s - 1 + shots.length) % shots.length));
  const nextShot = () => setLightbox(s => (s === null ? s : (s + 1) % shots.length));

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="relative">
        <div
          className="absolute top-0 inset-x-0 h-[520px] pointer-events-none"
          style={{ background: "radial-gradient(65% 100% at 50% 0%, rgba(139,92,246,0.12), transparent 72%)" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-12"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4b5fd"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Link>
            <span className="w-px h-4" style={{ background: "var(--color-border)" }} />
            <span className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
              PROJECT {project.number}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#22d3ee)", boxShadow: "0 0 12px rgba(139,92,246,0.7)" }}
              />
              <span style={{ color: "#a78bfa" }}>Case Study</span>
              {project.status === "in-progress" && (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  In progress
                </span>
              )}
            </p>
            <h1
              className="text-4xl sm:text-6xl font-bold leading-[1.05] mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl mb-6" style={{ color: "#a78bfa" }}>
              {project.subtitle || "Engineering case study"}
            </p>
            {project.description && (
              <p className="text-base leading-relaxed max-w-3xl mb-8" style={{ color: "var(--color-text-secondary)" }}>
                {project.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-3 py-1 rounded-full"
                  style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map(s => {
                const c = stackColor(s);
                return (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-lg"
                    style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                  >
                    {s}
                  </span>
                );
              })}
            </div>

            {project.role && (
              <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
                Role: <span style={{ color: "var(--color-text-secondary)" }}>{project.role}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" style={{ padding: "0.6rem 1.4rem", fontSize: "0.8rem" }}>
                  <Github className="w-4 h-4" /> View Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs" style={{ padding: "0.6rem 1.4rem", fontSize: "0.8rem" }}>
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {shots.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-14"
              >
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <h2 className="flex items-center gap-3 font-semibold text-lg" style={{ color: "var(--color-text-primary)" }}>
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}
                      >
                        <Images className="w-4 h-4" />
                      </span>
                      Realizations
                    </h2>
                    <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
                      {shots.length} captures — click any shot to zoom.
                    </p>
                  </div>
                  <span
                    className="font-mono text-[10px] px-2.5 py-1 rounded-lg flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}
                  >
                    01 / {String(shots.length).padStart(2, "0")}
                  </span>
                </div>

                {isMobile ? (
                  <div className="flex justify-center">
                    <motion.button
                      onClick={() => setLightbox(0)}
                      whileHover={{ scale: 1.01, y: -6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="relative block overflow-hidden rounded-[2.75rem] cursor-zoom-in group text-left w-full max-w-[300px] sm:max-w-[320px]"
                      style={{
                        border: "6px solid #1c1c30",
                        outline: "1px solid var(--color-border-2)",
                        background: "#0a0a12",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(139,92,246,0.14)",
                      }}
                      aria-label="Ouvrir la capture principale"
                    >
                      <div
                        className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 py-3"
                        style={{ background: "linear-gradient(180deg, rgba(10,10,18,0.6), transparent)" }}
                      >
                        <span className="font-mono text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                          9:41
                        </span>
                        <div className="w-20 h-5 rounded-full" style={{ background: "rgba(10,10,18,0.9)", border: "1px solid rgba(255,255,255,0.08)" }} />
                        <span className="flex items-center gap-1 font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                        </span>
                      </div>
                      <div className="relative aspect-[9/19] w-full overflow-hidden">
                        <img
                          src={shots[0]}
                          alt={`${project.title} — main capture`}
                          loading="eager"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,18,0.45))" }}
                        />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] px-3 py-2 rounded-xl backdrop-blur"
                          style={{ background: "rgba(10,10,18,0.65)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <span>{project.title} — Capture 01</span>
                          <span className="flex items-center gap-1" style={{ color: "#a78bfa" }}>
                            <Maximize2 className="w-3 h-3" /> Zoom
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => setLightbox(0)}
                    whileHover={{ scale: 1.008 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="relative w-full block overflow-hidden rounded-2xl cursor-zoom-in group text-left"
                    style={{
                      border: "1px solid var(--color-border-2)",
                      background: "var(--color-surface)",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(139,92,246,0.1)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ borderBottom: "1px solid var(--color-border)", background: "rgba(18,18,31,0.6)", backdropFilter: "blur(10px)" }}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                      <span
                        className="flex-1 mx-3 h-6 rounded-md flex items-center px-3 font-mono text-[10px] overflow-hidden whitespace-nowrap"
                        style={{ background: "var(--color-surface-1)", color: "var(--color-text-muted)" }}
                      >
                        {project.id.replace(/-/g, ".")}.app
                      </span>
                      <span
                        className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(34,211,238,0.1)", color: "#67e8f9", border: "1px solid rgba(34,211,238,0.25)" }}
                      >
                        <Maximize2 className="w-3 h-3" /> Fullscreen
                      </span>
                    </div>
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/8.5] overflow-hidden">
                      <img
                        src={shots[0]}
                        alt={`${project.title} — main capture`}
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(180deg, transparent 55%, rgba(10,10,18,0.5))" }}
                      />
                      <div
                        className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] px-3 py-2 rounded-xl backdrop-blur"
                        style={{ background: "rgba(10,10,18,0.6)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <span>{project.title} — Capture 01</span>
                        <span style={{ color: "#a78bfa" }}>Click to zoom ↗</span>
                      </div>
                    </div>
                  </motion.button>
                )}
              </motion.div>

              {shots.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className={`grid gap-6 mb-16 ${isMobile ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
                >
                  {shots.slice(1).map((s, i) => (
                    <motion.button
                      key={s}
                      onClick={() => setLightbox(i + 1)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      animate={{ rotate: i % 2 === 0 ? -0.8 : 0.8 }}
                      className={`group relative overflow-hidden cursor-zoom-in text-left ${
                        isMobile ? "rounded-[1.5rem]" : "rounded-2xl"
                      }`}
                      style={
                        isMobile
                          ? {
                              border: "4px solid #1c1c30",
                              outline: "1px solid var(--color-border)",
                              background: "#0a0a12",
                              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                            }
                          : {
                              border: "1px solid var(--color-border)",
                              background: "var(--color-surface)",
                              boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
                            }
                      }
                      aria-label={`Capture ${i + 2}`}
                    >
                      {isMobile && (
                        <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-1.5 pb-5"
                          style={{ background: "linear-gradient(180deg, rgba(10,10,18,0.55), transparent)" }}
                        >
                          <div className="w-10 h-3 rounded-full" style={{ background: "rgba(10,10,18,0.9)" }} />
                        </div>
                      )}
                      <img
                        src={s}
                        alt={`${project.title} — capture ${i + 2}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ aspectRatio: isMobile ? "9 / 17" : "4 / 3" }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <span
                          className="px-2 py-0.5 rounded-md backdrop-blur"
                          style={{ background: "rgba(0,0,0,0.6)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}
                        >
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        <span className="px-2 py-0.5 rounded-md backdrop-blur" style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.75)" }}>
                          Expand
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </>
          )}

          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {project.problem && (
                <CardSection tint="#f87171" accent={["#f87171", "#f87171"]}>
                  <SectionTitle
                    icon={<span className="font-mono text-sm font-bold">01</span>}
                    label="Problem"
                    color="#f87171"
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {project.problem}
                  </p>
                </CardSection>
              )}
              {project.solution && (
                <CardSection tint="#22d3ee" accent={["#22d3ee", "#67e8f9"]}>
                  <SectionTitle
                    icon={<span className="font-mono text-sm font-bold">02</span>}
                    label="Solution"
                    color="#67e8f9"
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {project.solution}
                  </p>
                </CardSection>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CardSection tint="#8b5cf6" accent={["#8b5cf6", "#22d3ee"]}>
              <SectionTitle
                icon={<Layers className="w-4 h-4" />}
                label="Architecture"
                color="#a78bfa"
              />
              <ArchDiagram layers={project.arch} />
            </CardSection>

            {project.features.length > 0 && (
              <CardSection tint="#34d399" accent={["#8b5cf6", "#34d399"]}>
                <SectionTitle
                  icon={<Zap className="w-4 h-4" />}
                  label="Key Features"
                  color="#a78bfa"
                />
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardSection>
            )}
          </div>

          {(project.challenges.length > 0 || project.learned.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {project.challenges.length > 0 && (
                <CardSection tint="#f59e0b" accent={["#f59e0b", "#f87171"]}>
                  <SectionTitle
                    icon={<Layers className="w-4 h-4" />}
                    label="Technical Challenges"
                    color="#fbbf24"
                  />
                  <ul className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        <span className="font-mono text-xs text-amber-400 flex-shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardSection>
              )}
              {project.learned.length > 0 && (
                <CardSection tint="#34d399" accent={["#34d399", "#8b5cf6"]}>
                  <SectionTitle
                    icon={<BookOpen className="w-4 h-4" />}
                    label="What I Learned"
                    color="#34d399"
                  />
                  <ul className="space-y-3">
                    {project.learned.map((l, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2"
                          style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
                        />
                        {l}
                      </li>
                    ))}
                  </ul>
                </CardSection>
              )}
            </div>
          )}

          {(project.github || project.demo) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center py-10 mb-4"
            >
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" style={{ padding: "0.7rem 1.5rem", fontSize: "0.8rem" }}>
                  <Github className="w-4 h-4" /> View Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs" style={{ padding: "0.7rem 1.5rem", fontSize: "0.8rem" }}>
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setLightbox(null)} />
            <motion.div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border-2)",
                boxShadow: "0 0 90px rgba(139,92,246,0.25), 0 48px 96px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
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
                  {String(lightbox + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                  className="p-1 rounded-lg transition-all hover:bg-white/10 flex-shrink-0"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative flex-1 min-h-0 bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox}
                    src={shots[lightbox]}
                    alt={`${project.title} — capture ${lightbox + 1}`}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: "75vh" }}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                {shots.length > 1 && (
                  <>
                    <button
                      onClick={prevShot}
                      aria-label="Capture précédente"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl backdrop-blur transition-all hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextShot}
                      aria-label="Capture suivante"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl backdrop-blur transition-all hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div
                className="flex gap-2 px-4 py-3 overflow-x-auto flex-shrink-0"
                style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-muted)" }}
              >
                {shots.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setLightbox(i)}
                    aria-label={`Capture ${i + 1}`}
                    className="relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${i === lightbox ? "rgba(139,92,246,0.65)" : "var(--color-border)"}`,
                      boxShadow: i === lightbox ? "0 0 14px rgba(139,92,246,0.25)" : "none",
                      opacity: i === lightbox ? 1 : 0.55,
                    }}
                  >
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}