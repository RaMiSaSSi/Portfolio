"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Download, Github, Linkedin, Mail, MapPin, ChevronDown,
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

// ─── Graves Plan — fig. 1 — production stack ───────────────────────────────────
// Monochrome "engraving": hairline strokes, corner registration marks, SMIL dots.
const INK_MAIN = "#f2ede2";
const INK_DIM = "#8a8171";
const INK_MUTED = "#6b6455";
const LINE = "rgba(203,191,164,0.35)";
const BOX_FILL = "#161412";
const BOX_STROKE = "rgba(242,237,226,0.14)";
const ACCENT = "#e8482b";

function Box({
  x, y, w, label, sub,
}: { x: number; y: number; w: number; label: string; sub: string }) {
  const h = 34;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={BOX_FILL} stroke={BOX_STROKE} />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" className="font-mono" fontSize={10.5} fontWeight={700} fill={INK_MAIN}>
        {label}
      </text>
      <text x={x + w / 2} y={y + 28} textAnchor="middle" className="font-mono" fontSize={8} fill={INK_DIM}>
        {sub}
      </text>
    </g>
  );
}

function FlowDot({ d, dur }: { d: string; dur: string }) {
  return (
    <circle r={2.5} fill={ACCENT}>
      <animateMotion dur={dur} repeatCount="indefinite" path={d} />
    </circle>
  );
}

function EngravedPlan() {
  return (
    <div
      className="relative rounded-sm select-none"
      style={{ border: "1px solid rgba(242,237,226,0.12)", background: "#121110" }}
      aria-hidden
    >
      {/* Corner registration marks */}
      {[
        "top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1",
      ].map(pos => (
        <svg key={pos} className={`absolute ${pos} w-3 h-3`} viewBox="0 0 12 12">
          <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(203,191,164,0.4)" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(203,191,164,0.4)" strokeWidth="1" />
        </svg>
      ))}

      <svg viewBox="0 0 460 500" className="w-full h-auto block">
        {/* faint dot grid */}
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(203,191,164,0.07)" />
          </pattern>
        </defs>
        <rect width="460" height="500" fill="url(#dots)" />

        {/* ── connectors ── */}
        <g stroke={LINE} strokeWidth="1" fill="none">
          <path d="M 230 44 V 74" strokeDasharray="4 4" />
          <path d="M 230 108 V 138" />
          <path d="M 230 172 V 206" strokeDasharray="4 4" />
          <path d="M 170 240 H 100 V 266" />
          <path d="M 290 240 h 70 V 266" />
          <path d="M 100 300 V 326" />
          <path d="M 360 300 V 326" />
          <path d="M 100 360 H 115 V 396 H 230" />
          <path d="M 360 360 H 345 V 396 H 230" />
        </g>
        <g>
          <FlowDot d="M 230 44 V 74" dur="1.1s" />
          <FlowDot d="M 230 172 V 206" dur="1.4s" />
        </g>

        {/* ── annotation: measure ── */}
        <g stroke="rgba(203,191,164,0.3)" strokeWidth="1">
          <line x1="248" y1="187" x2="288" y2="187" />
          <line x1="248" y1="184" x2="248" y2="190" />
          <line x1="288" y1="184" x2="288" y2="190" />
        </g>
        <text x="294" y="190" className="font-mono" fontSize={9} fill={INK_MUTED}>⇄ WS · 80ms</text>

        {/* ── nodes ── */}
        <Box x={170} y={10} w={120} label="CLIENT" sub="web / mobile" />
        <Box x={170} y={74} w={120} label="ANGULAR SPA" sub="frontend" />
        <Box x={170} y={138} w={120} label="REST / GRAPHQL" sub="gateway" />
        <Box x={10} y={240} w={120} label="SPRING BOOT" sub="backend" />
        <Box x={300} y={240} w={150} label="REDIS / RASA · PY" sub="cache · ai svc" />
        <Box x={10} y={326} w={120} label="POSTGRESQL" sub="primary db" />
        <Box x={300} y={326} w={150} label="ORACLE CLOUD" sub="vps · nginx" />
        <Box x={95} y={396} w={270} label="DOCKER · CI/CD" sub="containerized deploys" />

        {/* JWT tag */}
        <text x="170" y="232" className="font-mono" fontSize={9} fill={INK_MUTED}>JWT · OAuth2 ↑</text>
        {/* status */}
        <circle cx="444" cy="20" r="4" fill={ACCENT}>
          <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x="444" y="40" textAnchor="middle" className="font-mono" fontSize={8} fill={INK_DIM}>OPR</text>
      </svg>

      {/* Caption bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderTop: "1px solid rgba(242,237,226,0.1)" }}
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: INK_DIM }}>
          FIG. 1 — PROD. STACK
        </span>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: INK_MUTED }}>
          OPR: NOMINAL
        </span>
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
      {/* Background — warm ink, no neon */}
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-60" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.25fr] gap-10 items-center min-h-[calc(100vh-5rem)]">
          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <div className="flex flex-col py-14">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="flex items-center gap-2.5 mb-6"
            >
              <span className="w-2 h-2" style={{ background: "var(--color-accent)" }} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: "var(--color-rust)" }}>
                Status: open — alternant 06/2026
              </span>
            </motion.div>

            {/* Marker */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-[0.65rem] tracking-[0.24em] uppercase mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              cv.00 — full-stack software engineer · tunis, tn
            </motion.p>

            {/* Headline — clip reveal */}
            <div className="overflow-hidden pb-1">
              <motion.h1
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.5rem,8vw,4.75rem)] font-bold uppercase leading-[1.02] tracking-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                Building digital products{" "}
                <em className="serif-accent not-italic uppercase" style={{ fontStyle: "italic" }}>
                  from interface
                </em>{" "}
                to infrastructure.
              </motion.h1>
            </div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mt-6 h-7"
            >
              <span className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>$</span>
              <span className="font-mono text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <span ref={typeRef} />
              </span>
              <span className="font-mono text-sm" style={{ color: "var(--color-accent-bright)" }}>▊</span>
            </motion.div>

            {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-[0.95rem] leading-relaxed mt-6 max-w-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                I build modern full-stack applications using{" "}
                <span style={{ color: "#ff7a5c", fontWeight: 600 }}>Angular / React</span>,{" "}
                <span style={{ color: "#5fbfa9", fontWeight: 600 }}>Spring Boot / NestJS</span>, and{" "}
                <span style={{ color: "#d9a441", fontWeight: 600 }}>Docker / CI/CD</span>{" "}
                — handling everything from database design to cloud deployment.
              </motion.p>

              {/* Location */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.68 }}
                className="flex items-center gap-1.5 text-xs mt-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--color-rust)" }} />
                {siteConfig.location} — Engineering Student / Alternant at ESPRIT
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.74, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 mt-8"
              >
                <Link href="#projects" className="btn-primary w-full sm:w-auto">
                  View my work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#contact" className="btn-ghost w-full sm:w-auto">
                  Let&apos;s connect
                </Link>
                <button
                  onClick={() => void downloadCV()}
                  className="btn-ghost w-full sm:w-auto"
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
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 mt-8"
              >
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border-warm)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,72,43,0.5)";
                      (e.currentTarget as HTMLElement).style.color = "#ff7a5c";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-warm)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
                <span className="ml-3 font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
                  ramisassi11@gmail.com
                </span>
              </motion.div>

            {/* Mobile stack strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 lg:hidden"
            >
              <div className="rule mb-3" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                Stack // Angular · Spring Boot · PostgreSQL · Docker · React Native
              </p>
              <div className="rule mt-3" />
            </motion.div>
          </div>

          {/* ── Right: Engraved plan ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:max-w-[760px] ml-auto w-full"
          >
            <EngravedPlan />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: "var(--color-text-muted)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "var(--color-rust)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}