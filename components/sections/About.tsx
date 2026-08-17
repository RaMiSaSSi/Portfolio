"use client";

import { motion } from "framer-motion";
import {
  Code2, Cpu, Shield, Layers, Rocket, BookOpen, Download,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";

const mindsetCards = [
  {
    icon: Layers,
    title: "Architecture First",
    desc: "I think in systems before writing code — data models, service boundaries and API contracts come first.",
    color: "#8b5cf6",
  },
  {
    icon: Code2,
    title: "Clean Code",
    desc: "SOLID principles, meaningful naming, and code that reads like documentation.",
    color: "#22d3ee",
  },
  {
    icon: Shield,
    title: "Security Minded",
    desc: "JWT, Spring Security, input validation and secrets management are never afterthoughts.",
    color: "#34d399",
  },
  {
    icon: Rocket,
    title: "Ship to Production",
    desc: "Docker, CI/CD pipelines and Nginx configs are part of my standard workflow, not extras.",
    color: "#f59e0b",
  },
  {
    icon: Cpu,
    title: "Performance Aware",
    desc: "Query optimization, caching with Redis, and lazy loading are built in from the start.",
    color: "#f87171",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Reading engineering blogs, building side projects and exploring new technologies weekly.",
    color: "#a78bfa",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Bio ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-3">About Me</p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              A software engineer who{" "}
              <span className="gradient-text">builds systems,</span>{" "}
              not just screens.
            </h2>

            <div className="space-y-4 text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                I'm{" "}
                <span style={{ color: "var(--color-text-primary)" }} className="font-medium">
                  Rami Sassi
                </span>
                , a junior full-stack software engineer and engineering student at{" "}
                <span style={{ color: "#a78bfa" }}>ESPRIT</span>, currently on
                a work-study (alternant) program. I specialise in building end-to-end
                web applications — from Angular or React frontends to Spring Boot or
                NestJS backends, containerized with Docker and deployed on Linux servers.
              </p>
              <p>
                What separates me from a typical junior developer is that I own the
                complete engineering lifecycle: I design the database schema, define the
                API contracts, build the frontend and backend, write the Dockerfiles,
                and configure the CI/CD pipeline. I don't stop at the UI.
              </p>
              <p>
                I'm particularly interested in{" "}
                <span style={{ color: "var(--color-text-primary)" }}>
                  backend architecture, DevOps, scalable systems and clean API design
                </span>
                . Every project I build is an opportunity to practice engineering
                discipline, not just ship features.
              </p>
            </div>

            {/* Quick facts */}
            <div
              className="rounded-2xl p-5 mb-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Location",  value: "Tunis, Tunisia" },
                  { label: "Status",    value: "Engineering Alternant" },
                  { label: "School",    value: "ESPRIT" },
                  { label: "Focus",     value: "Full-Stack + DevOps" },
                  { label: "Languages", value: "French, Arabic, English" },
                  { label: "Email",     value: siteConfig.email },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] tracking-widest uppercase mb-0.5"
                      style={{ color: "var(--color-text-muted)" }}>
                      {label}
                    </p>
                    <p className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => void downloadCV()}
              className="btn-primary"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </motion.div>

          {/* ── Right: Mindset cards ─────────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="font-mono text-[10px] tracking-widest uppercase mb-5"
              style={{ color: "var(--color-text-muted)" }}
            >
              Engineering Mindset
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mindsetCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={cardAnim}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group rounded-xl p-4 cursor-default transition-all duration-300"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${card.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${card.color}15`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${card.color}15` }}
                  >
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <h3
                    className="font-semibold text-sm mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
