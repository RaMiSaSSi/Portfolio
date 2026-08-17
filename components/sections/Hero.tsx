"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, animate, useTransform } from "framer-motion";
import {
  ArrowRight, Download, Github, Linkedin, Mail, Terminal,
  MapPin, ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let idx = 0, charIdx = 0, deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const word = words[idx];
      if (!ref.current) return;
      if (!deleting) {
        ref.current.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) { deleting = true; timeout = setTimeout(tick, pause); return; }
      } else {
        ref.current.textContent = word.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % words.length; }
      }
      timeout = setTimeout(tick, deleting ? speed / 2 : speed);
    }
    timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [words, speed, pause]);
  return ref;
}

// ─── System Architecture Visualization ───────────────────────────────────────
const ARCH_NODES = [
  { id: "user",  label: "Client",       sublabel: "Browser / Mobile",  color: "#22d3ee",  icon: "◉", x: 50,  y: 6 },
  { id: "fe",    label: "Angular",      sublabel: "Frontend SPA",       color: "#dd0031",  icon: "A", x: 50,  y: 22 },
  { id: "api",   label: "REST API",     sublabel: "HTTP / WebSocket",   color: "#a78bfa",  icon: "⇄", x: 50,  y: 38 },
  { id: "be",    label: "Spring Boot",  sublabel: "Backend Services",   color: "#6db33f",  icon: "◈", x: 22,  y: 56 },
  { id: "ai",    label: "AI Service",   sublabel: "Python / Rasa",      color: "#3776ab",  icon: "⬡", x: 78,  y: 56 },
  { id: "db",    label: "PostgreSQL",   sublabel: "Primary DB",         color: "#336791",  icon: "⬢", x: 22,  y: 74 },
  { id: "cache", label: "Redis",        sublabel: "Cache / Sessions",   color: "#dc382d",  icon: "◈", x: 78,  y: 74 },
  { id: "ops",   label: "Docker",       sublabel: "Containerized",      color: "#2496ed",  icon: "□", x: 50,  y: 90 },
];

const CONNECTIONS = [
  { from: "user", to: "fe",    animated: true },
  { from: "fe",   to: "api",   animated: true },
  { from: "api",  to: "be",    animated: true },
  { from: "api",  to: "ai",    animated: false },
  { from: "be",   to: "db",    animated: true },
  { from: "be",   to: "cache", animated: false },
  { from: "be",   to: "ops",   animated: false },
  { from: "ai",   to: "ops",   animated: false },
];

function ArchVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(interval);
  }, []);

  // Cycle active node every 1.8s
  useEffect(() => {
    const nodes = ARCH_NODES.map(n => n.id);
    let i = 0;
    const interval = setInterval(() => {
      setActiveNode(nodes[i % nodes.length]);
      i++;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const nodeMap = Object.fromEntries(ARCH_NODES.map(n => [n.id, n]));

  return (
    <div className="relative w-full h-[480px] select-none" aria-hidden>
      {/* Background grid */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5 bg-[#0c0c18]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)"
        }} />
      </div>

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(139,92,246,0.5)" />
          </marker>
        </defs>
        {CONNECTIONS.map(({ from, to, animated }) => {
          const fn = nodeMap[from], tn = nodeMap[to];
          if (!fn || !tn) return null;
          const x1 = `${fn.x}%`, y1 = `${fn.y + 5}%`;
          const x2 = `${tn.x}%`, y2 = `${tn.y - 2}%`;
          const isActive = activeNode === from || activeNode === to;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isActive ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.18)"}
                strokeWidth={isActive ? "1.5" : "1"}
                strokeDasharray={animated ? "4 4" : undefined}
                markerEnd="url(#arrow)"
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
              {animated && isActive && (
                <circle r="2.5" fill="#a78bfa" opacity="0.9">
                  <animateMotion
                    dur="1.2s"
                    repeatCount="indefinite"
                    path={`M ${fn.x}% ${fn.y + 5}% L ${tn.x}% ${tn.y - 2}%`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {ARCH_NODES.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
            onHoverStart={() => setActiveNode(node.id)}
            onHoverEnd={() => setActiveNode(null)}
            animate={{ y: isActive ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-center"
              style={{
                background: isActive
                  ? `${node.color}18`
                  : "rgba(22,22,37,0.9)",
                borderColor: isActive ? node.color : "rgba(255,255,255,0.07)",
                boxShadow: isActive
                  ? `0 0 20px ${node.color}33, 0 0 40px ${node.color}15`
                  : "none",
                transition: "all 0.3s",
                minWidth: "80px",
              }}
            >
              <span
                className="font-mono text-xs font-bold"
                style={{ color: node.color }}
              >
                {node.icon}
              </span>
              <span className="text-[11px] font-semibold text-white leading-none">
                {node.label}
              </span>
              <span className="text-[9px] text-white/40 leading-none font-mono">
                {node.sublabel}
              </span>
            </div>
            {/* Pulse on active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ border: `1px solid ${node.color}` }}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Corner label */}
      <div className="absolute top-3 left-4 font-mono text-[10px] text-white/25 tracking-widest">
        SYSTEM / ARCHITECTURE
      </div>
      <div className="absolute top-3 right-4 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] text-white/25">LIVE</span>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
const roles = [
  "Full-Stack Engineer",
  "Spring Boot Developer",
  "Angular Architect",
  "DevOps Practitioner",
  "Systems Builder",
];

const socials = [
  { href: siteConfig.github,   icon: Github,   label: "GitHub" },
  { href: siteConfig.linkedin, icon: Linkedin,  label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
];

export default function Hero() {
  const typeRef = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Radial glows */}
        <div className="absolute -top-1/4 left-0 w-[700px] h-[700px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full bg-violet-800/[0.08] blur-[80px]" />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col py-16"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 self-start"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-violet-300 tracking-wide">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            {/* Technical label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="section-label mb-3"
            >
              FULL-STACK SOFTWARE ENGINEER
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Building digital products{" "}
              <span className="gradient-text">from interface to infrastructure.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2 mb-5 h-8"
            >
              <Terminal className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <span className="font-mono text-sm text-violet-300">
                <span ref={typeRef} />
                <span className="animate-pulse text-violet-400">_</span>
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base leading-relaxed mb-2 max-w-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I build modern full-stack applications using{" "}
              <span className="text-violet-300 font-medium">Angular / React</span>,{" "}
              <span className="text-green-400 font-medium">Spring Boot / NestJS</span>, and{" "}
              <span className="text-cyan-400 font-medium">Docker / CI/CD</span>{" "}
              — handling everything from database design to cloud deployment.
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1.5 text-xs mb-8"
              style={{ color: "var(--color-text-muted)" }}
            >
              <MapPin className="w-3.5 h-3.5 text-violet-500" />
              {siteConfig.location} — Engineering Student / Alternant at ESPRIT
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link href="#projects" className="btn-primary">
                View my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#contact" className="btn-ghost">
                Let's connect
              </Link>
              <button
                onClick={() => void downloadCV()}
                className="btn-ghost"
                aria-label="Download CV"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-1"
            >
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "var(--color-text-muted)" }}
              >
                ramisassi11@gmail.com
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Architecture Visualization ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <ArchVisualization />
            <p className="text-center font-mono text-[11px] mt-3" style={{ color: "var(--color-text-muted)" }}>
              Hover nodes to inspect the architecture
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
