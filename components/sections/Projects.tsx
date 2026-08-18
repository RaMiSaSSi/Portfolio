"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, ChevronRight, ChevronLeft, Images, Layers, Zap, BookOpen, Check } from "lucide-react";
import { projects, projectCategories, type Project, type ArchLayer } from "@/lib/data";

const stackColor = (s: string) => {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    "Angular":        { bg: "#dd003112", text: "#ff6b6b", border: "#dd003130" },
    "Spring Boot":    { bg: "#6db33f12", text: "#86efac", border: "#6db33f30" },
    "PostgreSQL":     { bg: "#33679112", text: "#93c5fd", border: "#33679130" },
    "Docker":         { bg: "#2496ed12", text: "#7dd3fc", border: "#2496ed30" },
    "Python / Rasa":  { bg: "#3776ab12", text: "#93c5fd", border: "#3776ab30" },
    "WebSocket":      { bg: "#f59e0b12", text: "#fcd34d", border: "#f59e0b30" },
    "JWT":            { bg: "#e8482b12", text: "#cbbfa4", border: "#e8482b30" },
    "React":          { bg: "#61dafb12", text: "#7fd6c0", border: "#61dafb30" },
    "React Native":   { bg: "#61dafb12", text: "#7fd6c0", border: "#61dafb30" },
    "Node.js":        { bg: "#33993312", text: "#86efac", border: "#33993330" },
    "Express":        { bg: "#33993312", text: "#86efac", border: "#33993330" },
    "Python":         { bg: "#3776ab12", text: "#93c5fd", border: "#3776ab30" },
    "PWA":            { bg: "#e8482b12", text: "#cbbfa4", border: "#e8482b30" },
  };
  return map[s] ?? { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.6)", border: "rgba(255,255,255,0.1)" };
};

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status !== "in-progress") return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-sm"
      style={{ background: "rgba(217,164,65,0.1)", color: "#e3b94f", border: "1px solid rgba(217,164,65,0.35)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d9a441" }} />
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
  const glow = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, rgba(232,72,43,0.15), transparent 65%)`;

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

function ModalSection({
  icon,
  label,
  color,
  className = "",
  children,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 ${className}`}
      style={{
        background: `linear-gradient(150deg, ${color}0d, transparent 62%)`,
        border: `1px solid ${color}26`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
      />
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
        >
          {icon}
        </span>
        <h4 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
          {label}
        </h4>
      </div>
      {children}
    </div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [shot, setShot] = useState(0);
  const shots = project.screenshots ?? [];
  const isMobile = project.layout === "mobile";

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
          background: "linear-gradient(180deg, var(--color-bg-muted) 0%, var(--color-surface) 100%)",
          border: "1px solid var(--color-border-2)",
          boxShadow: "0 0 90px rgba(232,72,43,0.22), 0 48px 96px rgba(0,0,0,0.65)",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-72 pointer-events-none"
          style={{
            background: "radial-gradient(70% 100% at 50% 0%, rgba(232,72,43,0.14), transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #e8482b, #d9a441, transparent)" }}
        />
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4"
          style={{ background: "linear-gradient(180deg, var(--color-bg-muted) 60%, transparent)", borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs tracking-widest" style={{ color: "#b3541e" }}>
                PROJECT {project.number}
              </span>
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "linear-gradient(135deg, #e8482b, #d9a441)", boxShadow: "0 0 8px rgba(232,72,43,0.9)" }}
              />
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
                  className={`relative overflow-hidden ${
                    isMobile
                      ? "mx-auto aspect-[9/17] w-full max-w-[270px] sm:max-w-[300px] rounded-[2rem]"
                      : "aspect-video rounded-xl"
                  }`}
                  style={
                    isMobile
                      ? { border: "6px solid #23201b", outline: "1px solid var(--color-border-2)", background: "#0a0908" }
                      : { border: "1px solid var(--color-border-2)", background: "var(--color-bg)" }
                  }
                >
                  {isMobile ? (
                    <div
                      className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-2.5"
                      style={{ background: "linear-gradient(180deg, rgba(12,11,9,0.55), transparent)" }}
                    >
                      <span className="font-mono text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                        9:41
                      </span>
                      <div className="w-16 h-4 rounded-full" style={{ background: "rgba(12,11,9,0.9)", border: "1px solid rgba(255,255,255,0.08)" }} />
                      <span className="font-mono text-[9px]" style={{ color: "#b3541e" }}>
                        {String(shot + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="absolute top-0 inset-x-0 z-10 flex items-center gap-2 px-3 py-2"
                      style={{ background: "rgba(12,11,9,0.6)", backdropFilter: "blur(8px)" }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      <span className="flex-1 mx-2 h-5 rounded-md flex items-center px-2 font-mono text-[9px] overflow-hidden whitespace-nowrap"
                        style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                      >
                        {project.id.replace(/-/g, ".")}.app
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: "#b3541e" }}>
                        {String(shot + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                      </span>
                    </div>
                  )}

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

                  {isMobile && (
                    <div
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 w-20 h-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    />
                  )}

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
                      className={`relative flex-shrink-0 overflow-hidden transition-all duration-300 ${
                        isMobile ? "rounded-2xl w-12 h-24" : "rounded-lg w-20 h-12"
                      }`}
                      style={{
                        border: `1px solid ${i === shot ? "rgba(232,72,43,0.65)" : "var(--color-border)"}`,
                        boxShadow: i === shot ? "0 0 14px rgba(232,72,43,0.25)" : "none",
                        opacity: i === shot ? 1 : 0.55,
                      }}
                    >
                      <img src={s} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              className="relative overflow-hidden rounded-2xl p-5"
              style={{
                background: "linear-gradient(150deg, rgba(232,72,43,0.09), rgba(34,211,238,0.04) 55%, transparent)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p className="text-base font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                {project.subtitle || "Case study"}
              </p>
              <p
                className="text-xs font-mono flex flex-wrap items-center gap-x-3 gap-y-1 mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span style={{ color: "#b3541e" }}>ROLE:</span>
                <span style={{ color: "var(--color-text-secondary)" }}>{project.role}</span>
              </p>
              {project.description && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {project.description}
                </p>
              )}
              {project.stack.length > 0 && (
                <div
                  className="flex flex-wrap gap-2 pt-4 mt-4"
                  style={{ borderTop: "1px dashed var(--color-border)" }}
                >
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
              )}
            </div>

            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.problem && (
                  <ModalSection
                    icon={<span className="font-mono text-[10px] font-bold">01</span>}
                    label="Problem"
                    color="#e8482b"
                  >
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {project.problem}
                    </p>
                  </ModalSection>
                )}
                {project.solution && (
                  <ModalSection
                    icon={<span className="font-mono text-[10px] font-bold">02</span>}
                    label="Solution"
                    color="#7fd6c0"
                  >
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {project.solution}
                    </p>
                  </ModalSection>
                )}
              </div>
            )}

            {(project.arch.length > 0 || project.features.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.arch.length > 0 && (
                  <ModalSection
                    icon={<Layers className="w-3.5 h-3.5" />}
                    label="Architecture"
                    color="#b3541e"
                    className="h-full"
                  >
                    <ArchDiagram layers={project.arch} />
                  </ModalSection>
                )}

                {project.features.length > 0 && (
                  <ModalSection
                    icon={<Zap className="w-3.5 h-3.5" />}
                    label="Key Features"
                    color="#d9a441"
                    className="h-full"
                  >
                    <ul className="grid grid-cols-1 gap-2.5">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                          <span
                            className="flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0 mt-0.5"
                            style={{ background: "#d9a44118", border: "1px solid #d9a44133", color: "#d9a441" }}
                          >
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </ModalSection>
                )}
              </div>
            )}

            {project.challenges.length > 0 && (
              <ModalSection
                icon={<span className="font-mono text-[10px] font-bold">{String(project.challenges.length).padStart(2, "0")}</span>}
                label="Technical Challenges"
                color="#c96f4a"
              >
                <ul className="space-y-2.5">
                  {project.challenges.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs rounded-lg px-3 py-2"
                      style={{ background: "#c96f4a08", border: "1px solid #c96f4a14", color: "var(--color-text-secondary)" }}
                    >
                      <span className="font-mono text-amber-400 flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </ModalSection>
            )}

            {project.learned.length > 0 && (
              <ModalSection
                icon={<BookOpen className="w-3.5 h-3.5" />}
                label="What I Learned"
                color="#a3a04e"
              >
                <ul className="space-y-2.5">
                  {project.learned.map((l, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs rounded-lg px-3 py-2"
                      style={{ background: "#a3a04e08", border: "1px solid #a3a04e14", color: "var(--color-text-secondary)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: "#a3a04e", boxShadow: "0 0 8px rgba(52,211,153,0.7)" }}
                      />
                      {l}
                    </li>
                  ))}
                </ul>
              </ModalSection>
            )}

            {(project.github || project.demo) && (
              <div
                className="rounded-2xl p-5 flex flex-wrap items-center justify-center gap-3"
                style={{ background: "rgba(232,72,43,0.05)", border: "1px solid var(--color-border)" }}
              >
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
  const isMobile = project.layout === "mobile";

  if (isMobile) {
    return (
      <div className="flex justify-center">
        <div
          className="relative rounded-[1.75rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(232,72,43,0.18)]"
          style={{ border: "5px solid #23201b", outline: "1px solid var(--color-border-2)", background: "#0a0908" }}
        >
          <div
            className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-2"
            style={{ background: "linear-gradient(180deg, rgba(12,11,9,0.55), transparent)" }}
          >
            <span className="font-mono text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
              9:41
            </span>
            <div className="w-14 h-4 rounded-full" style={{ background: "rgba(12,11,9,0.9)", border: "1px solid rgba(255,255,255,0.08)" }} />
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="w-1 h-1 rounded-full bg-emerald-400/40" />
            </span>
          </div>
          <div className={`relative aspect-[9/17] overflow-hidden ${big ? "w-52 sm:w-64" : "w-36 sm:w-44"}`}>
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
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:translate-x-8"
            />
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), transparent 55%)" }}
            />
            <div
              className="absolute bottom-2 right-2 flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded-lg backdrop-blur transition-opacity duration-300 group-hover:opacity-0"
              style={{ background: "rgba(0,0,0,0.55)", color: "#cbbfa4", border: "1px solid rgba(232,72,43,0.3)" }}
            >
              <Images className="w-3 h-3" />
              {String(project.screenshots.length).padStart(2, "0")} captures
            </div>
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_16px_48px_rgba(232,72,43,0.18)]"
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
          style={{ background: "rgba(0,0,0,0.55)", color: "#cbbfa4", border: "1px solid rgba(232,72,43,0.3)" }}
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
  const accents = [
    ["#e8482b", "#b3541e"],
    ["#d9a441", "#8f7a3f"],
    ["#c96f4a", "#a34b33"],
    ["#3f8f7f", "#2f6b60"],
    ["#5b7ba6", "#3d5678"],
  ];
  const [a1, a2] = accents[index % accents.length];

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
            background:
              "linear-gradient(165deg, var(--color-surface-1) 0%, var(--color-surface) 55%, rgba(22,22,37,0.45) 100%)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 6px 28px rgba(0,0,0,0.32)",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${a1}55`;
            e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.45), 0 0 44px ${a1}22`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.32)";
          }}
        >
          <div
            aria-hidden
            className="absolute -top-28 -right-20 w-80 h-80 rounded-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle, ${a1}2b, transparent 65%)` }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-80"
            style={{ background: `radial-gradient(circle, ${a2}22, transparent 65%)` }}
          />

          <div
            className="h-[2px] w-full transition-all duration-500"
            style={{ background: `linear-gradient(90deg, ${a1}, ${a2})`, opacity: 0.45 }}
          />
          <div
            className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500 z-30"
            style={{ background: `linear-gradient(90deg, ${a1}, ${a2})` }}
          />

          <span
            aria-hidden
            className="absolute -top-3 -right-2 font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
            style={{
              fontSize: big ? "7.5rem" : "5.5rem",
              color: "transparent",
              WebkitTextStroke: `1px ${a1}40`,
            }}
          >
            {project.number}
          </span>

          <div
            className="flex items-center justify-between px-5 pt-4 pb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <span
              className="flex items-center gap-2 font-mono text-[10px] tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: a1, boxShadow: `0 0 8px ${a1}` }}
              />
              PROJECT {project.number}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <div className="px-5 pb-5" style={{ transform: "translateZ(24px)" }}>
            <BrowserMockup project={project} big={big} />
          </div>

          <div className="px-6 pb-5 flex flex-col flex-1" style={{ transform: "translateZ(40px)" }}>
            <h3
              className={`font-bold group-hover:text-white transition-colors duration-300 ${big ? "text-2xl sm:text-3xl" : "text-xl"}`}
              style={{ color: "var(--color-text-primary)" }}
            >
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
                {project.subtitle}
              </p>
            )}

            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${a1}12`,
                      color: "#cbbfa4",
                      border: `1px solid ${a1}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

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

            <div className="flex flex-wrap gap-1.5 mt-4">
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
          </div>

          <div
            className="flex items-center justify-between gap-3 px-6 py-4 mt-auto"
            style={{
              borderTop: "1px solid var(--color-border)",
              background: `linear-gradient(90deg, ${a1}0d, transparent 65%)`,
            }}
          >
            <button
              className="flex items-center gap-2 text-xs font-medium transition-colors group-hover:text-white"
              style={{ color: "var(--color-text-muted)" }}
              onClick={e => { e.stopPropagation(); onOpen(); }}
            >
              View case study
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                style={{ color: a1 }}
              />
            </button>
            <div className="flex items-center gap-1.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={e => e.stopPropagation()}
                  className="p-2 rounded-full transition-all duration-300 hover:text-white"
                  style={{ color: "var(--color-text-muted)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a1}22`; e.currentTarget.style.borderColor = `${a1}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
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
                  className="p-2 rounded-full transition-all duration-300 hover:text-white"
                  style={{ color: "var(--color-text-muted)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a2}22`; e.currentTarget.style.borderColor = `${a2}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
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
            className={`relative px-4 py-2 font-mono text-xs transition-colors ${active ? "text-white" : ""}`}
            style={{ border: "1px solid var(--color-border)" }}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #e8482b, #b3541e)",
                  boxShadow: "0 4px 18px rgba(232,72,43,0.35)",
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
                <span style={{ color: "#e8482b" }}>•</span>
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
  const [spotlight, setSpotlight] = useState(0);
  const [hoverLock, setHoverLock] = useState(false);
  const [gridHeight, setGridHeight] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const list = preview ? projects.filter(p => p.featured) : projects;
  const ordered = preview ? [...list.slice(spotlight), ...list.slice(0, spotlight)] : list;
  const filtered = filter === "All" ? ordered : ordered.filter(p => p.category.includes(filter));
  const allStack = Array.from(new Set(projects.flatMap(p => p.stack)));
  const paused = hoverLock || !!selected || list.length < 2;

  useEffect(() => {
    if (!preview || paused) return;
    const id = setInterval(() => setSpotlight(s => (s + 1) % list.length), 5000);
    return () => clearInterval(id);
  }, [preview, paused, list.length]);

  useEffect(() => {
    if (!preview) return;
    const el = gridRef.current;
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    setGridHeight(h);
    const t = setTimeout(() => setGridHeight(null), 750);
    return () => clearTimeout(t);
  }, [preview, spotlight]);

  return (
    <>
      <section className="section" id="projects">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-rust)" }}>
                FIG. 03
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                — {preview ? "featured works" : "engineering projects"}
              </span>
              <span className="rule flex-1 max-w-[10rem]" aria-hidden />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="overflow-hidden pb-1">
                <motion.h2
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[1.05] tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {preview ? (
                    <>
                      Featured <em className="serif-accent">projects</em>
                    </>
                  ) : (
                    <>
                      Engineering <em className="serif-accent">projects</em>
                    </>
                  )}
                </motion.h2>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 pb-1">
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

            <p className="mt-4 text-sm max-w-lg" style={{ color: "var(--color-text-secondary)" }}>
              Real applications built from scratch — from architecture to deployment.
              {preview ? " A curated selection of what I ship." : " Click any card to explore the case study."}
            </p>

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

            {preview && list.length > 1 && (
              <div className="mt-8 flex items-center gap-2">
                {list.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSpotlight(i)}
                    aria-label={`Mettre en avant ${p.title}`}
                    className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                    style={{
                      width: spotlight === i ? 28 : 10,
                      background: spotlight === i ? "linear-gradient(90deg, #e8482b, #d9a441)" : "var(--color-border-2)",
                    }}
                  />
                ))}
              </div>
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
            <motion.div
              ref={gridRef}
              layout
              className="grid grid-cols-1 md:grid-cols-6 gap-6 [overflow-anchor:none]"
              style={gridHeight !== null ? { height: gridHeight } : undefined}
              onMouseEnter={() => setHoverLock(true)}
              onMouseLeave={() => setHoverLock(false)}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    big={preview ? i === 0 : filtered.length === 1 || i === 0}
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
