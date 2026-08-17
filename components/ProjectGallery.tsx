"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, ChevronRight, ChevronLeft, X, Images, Layers, Zap, BookOpen } from "lucide-react";
import type { Project, ArchLayer } from "@/lib/data";
import { useState } from "react";

function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1">
      {layers.map((layer, i) => (
        <div key={layer.id} className="flex flex-col items-start">
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-default w-full"
            style={{
              background: active === layer.id ? `${layer.color}12` : "rgba(22,22,37,0.8)",
              border: `1px solid ${active === layer.id ? layer.color + "50" : "rgba(255,255,255,0.06)"}`,
              color: active === layer.id ? layer.color : "rgba(255,255,255,0.6)",
            }}
            onHoverStart={() => setActive(layer.id)}
            onHoverEnd={() => setActive(null)}
            whileHover={{ x: 4 }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: layer.color }}
            />
            <span className="font-mono text-xs font-semibold flex-1">{layer.label}</span>
            <span className="font-mono text-[10px] opacity-40">{layer.tech}</span>
          </motion.div>
          {i < layers.length - 1 && (
            <div className="ml-3 w-px h-2" style={{ background: `${layers[i].color}40` }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProjectGallery({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shots = project.screenshots ?? [];

  const prevShot = () => setLightbox(s => (s === null ? s : (s - 1 + shots.length) % shots.length));
  const nextShot = () => setLightbox(s => (s === null ? s : (s + 1) % shots.length));

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-10"
        >
          <Link
            href="/#projects"
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

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
            {project.title}
          </h1>
          <p className="text-lg mb-4" style={{ color: "var(--color-text-secondary)" }}>
            {project.subtitle}
          </p>
          <p className="text-sm max-w-2xl leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map(s => (
              <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-lg"
                style={{ background: "var(--color-surface)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
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
        </motion.div>

        {/* Realizations — creative screenshot gallery */}
        {shots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-14"
          >
            <h2
              className="flex items-center gap-2 font-semibold text-base mb-1"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Images className="w-4 h-4 text-violet-400" /> Realizations
            </h2>
            <p className="text-xs mb-6" style={{ color: "var(--color-text-muted)" }}>
              {shots.length} captures — click any shot to zoom in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {shots.map((s, i) => (
                <motion.button
                  key={s}
                  onClick={() => setLightbox(i)}
                  animate={{ rotate: i % 2 === 0 ? -1.2 : 1.2, zIndex: i === 0 ? 1 : 0 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer text-left ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  }}
                  aria-label={`Capture ${i + 1}`}
                >
                  <img
                    src={s}
                    alt={`${project.title} — capture ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-2 font-mono text-[10px] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span
                      className="px-2 py-0.5 rounded-md backdrop-blur"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="px-2 py-0.5 rounded-md backdrop-blur" style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.75)" }}>
                      Capture
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Case Study Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Problem */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <h2 className="font-semibold text-base mb-3 text-red-400 flex items-center gap-2">
              <span className="font-mono text-xs">01</span> Problem
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {project.problem}
            </p>
          </div>
          {/* Solution */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)" }}>
            <h2 className="font-semibold text-base mb-3 text-cyan-400 flex items-center gap-2">
              <span className="font-mono text-xs">02</span> Solution
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {project.solution}
            </p>
          </div>
        </motion.div>

        {/* Architecture + Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Architecture */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <h2 className="font-semibold text-base mb-4" style={{ color: "var(--color-text-primary)" }}>
              Architecture
            </h2>
            <ArchDiagram layers={project.arch} />
          </div>
          {/* Features */}
          <div className="rounded-2xl p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <Zap className="w-4 h-4 text-violet-400" /> Key Features
            </h2>
            <ul className="space-y-2.5">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  <ChevronRight className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Challenges + Learned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Challenges */}
          <div className="rounded-2xl p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <Layers className="w-4 h-4 text-amber-400" /> Technical Challenges
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  <span className="font-mono text-xs text-amber-400 flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          {/* Learned */}
          <div className="rounded-2xl p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
              <BookOpen className="w-4 h-4 text-emerald-400" /> What I Learned
            </h2>
            <ul className="space-y-3">
              {project.learned.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
              style={{
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border-2)",
                boxShadow: "0 0 80px rgba(139,92,246,0.2), 0 40px 80px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
                <span className="font-mono text-[10px]" style={{ color: "#a78bfa" }}>
                  {String(lightbox + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                  className="p-1 rounded-lg transition-all hover:bg-white/10"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stage */}
              <div className="relative aspect-video overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox}
                    src={shots[lightbox]}
                    alt={`${project.title} — capture ${lightbox + 1}`}
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
                      onClick={prevShot}
                      aria-label="Capture précédente"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextShot}
                      aria-label="Capture suivante"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg backdrop-blur transition-all hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.5)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div
                className="flex gap-2 px-3 py-3 overflow-x-auto"
                style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-muted)" }}
              >
                {shots.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setLightbox(i)}
                    aria-label={`Capture ${i + 1}`}
                    className="relative flex-shrink-0 w-16 h-10 rounded-md overflow-hidden transition-all duration-300"
                    style={{
                      border: `1px solid ${i === lightbox ? "rgba(139,92,246,0.65)" : "var(--color-border)"}`,
                      boxShadow: i === lightbox ? "0 0 12px rgba(139,92,246,0.25)" : "none",
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
