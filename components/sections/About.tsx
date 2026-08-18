"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";
import SectionHeader from "@/components/ui/SectionHeader";

const principles = [
  {
    title: "Architecture First",
    desc: "I think in systems before writing code — data models, service boundaries and API contracts come first.",
  },
  {
    title: "Clean Code",
    desc: "SOLID principles, meaningful naming, and code that reads like documentation.",
  },
  {
    title: "Security Minded",
    desc: "JWT, Spring Security, input validation and secrets management are never afterthoughts.",
  },
  {
    title: "Ship to Production",
    desc: "Docker, CI/CD pipelines and Nginx configs are part of my standard workflow, not extras.",
  },
  {
    title: "Performance Aware",
    desc: "Query optimization, caching with Redis, and lazy loading are built in from the start.",
  },
  {
    title: "Continuous Learning",
    desc: "Reading engineering blogs, building side projects and exploring new technologies weekly.",
  },
];

const facts = [
  { label: "Location",  value: "Tunis, Tunisia" },
  { label: "Status",    value: "Engineering Alternant" },
  { label: "School",    value: "ESPRIT" },
  { label: "Focus",     value: "Full-Stack + DevOps" },
  { label: "Languages", value: "French, Arabic, English" },
  { label: "Email",     value: siteConfig.email },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container-xl">
        <SectionHeader
          index="01"
          label="about"
          title={
            <>
              A software engineer who <em className="serif-accent">builds systems,</em>{" "}
              not just screens.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* ── Left: Bio ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                I&apos;m{" "}
                <span style={{ color: "var(--color-text-primary)" }} className="font-medium">
                  Rami Sassi
                </span>
                , a junior full-stack software engineer and engineering student at{" "}
                <em className="serif-accent">ESPRIT</em>, currently on
                a work-study (alternant) program. I specialise in building end-to-end
                web applications — from Angular or React frontends to Spring Boot or
                NestJS backends, containerized with Docker and deployed on Linux servers.
              </p>
              <p>
                What separates me from a typical junior developer is that I own the
                complete engineering lifecycle: I design the database schema, define the
                API contracts, build the frontend and backend, write the Dockerfiles,
                and configure the CI/CD pipeline. I don&apos;t stop at the UI.
              </p>
              <p>
                I&apos;m particularly interested in{" "}
                <span style={{ color: "var(--color-text-primary)" }}>
                  backend architecture, DevOps, scalable systems and clean API design
                </span>
                . Every project I build is an opportunity to practice engineering
                discipline, not just ship features.
              </p>
            </div>

            {/* Pull-quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative pl-5 mb-8"
              style={{ borderLeft: "2px solid var(--color-accent)" }}
            >
              <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                <span style={{ color: "var(--color-accent-bright)" }}>01.</span> A full-stack
                engineer isn&apos;t someone who writes frontend and backend — it&apos;s someone who
                understands the whole path a request travels, and makes every hop
                intentional.
              </p>
            </motion.blockquote>

            {/* Ledger / quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-8"
              style={{ border: "1px solid var(--color-border-warm)", background: "var(--color-surface)" }}
            >
              <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--color-border-warm)" }}>
                <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-rust)" }}>
                  REC. 01 — FACT SHEET
                </span>
                <span className="font-mono text-[0.6rem]" style={{ color: "var(--color-text-muted)" }}>÷018</span>
              </div>
              <div className="grid grid-cols-2">
                {facts.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="px-4 py-3"
                    style={{
                      borderRight: i % 2 === 0 ? "1px solid var(--color-border-warm)" : undefined,
                      borderBottom: i < 4 ? "1px solid var(--color-border-warm)" : undefined,
                    }}
                  >
                    <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase mb-1"
                      style={{ color: "var(--color-text-muted)" }}>
                      {label}
                    </p>
                    <p className="text-xs font-medium break-all" style={{ color: "var(--color-text-primary)" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <button onClick={() => void downloadCV()} className="btn-primary">
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </motion.div>

          {/* ── Right: Principles — liste éditoriale ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="font-mono text-[0.65rem] tracking-[0.22em] uppercase mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Working principles — engineering mindset
            </p>

            <div>
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="group flex items-start gap-5 py-5 cursor-default"
                  style={{ borderBottom: "1px solid var(--color-border-warm)" }}
                >
                  <span
                    className="font-mono text-sm flex-shrink-0 transition-colors duration-200"
                    style={{ color: "var(--color-rust)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className="font-display font-bold text-base uppercase tracking-wide transition-colors duration-200 group-hover:text-white"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {p.title}
                      </h3>
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 font-mono text-xs"
                        style={{ color: "var(--color-accent-bright)" }}
                      >
                        →
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mt-1.5" style={{ color: "var(--color-text-secondary)" }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}