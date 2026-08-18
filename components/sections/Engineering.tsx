"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pipelineSteps } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Engineering() {
  const [active, setActive] = useState<string>(pipelineSteps[0].id);

  const activeStep = pipelineSteps.find(s => s.id === active) ?? pipelineSteps[0];

  return (
    <section className="section" id="engineering">
      <div className="container-xl">
        <SectionHeader
          index="04"
          label="engineering approach"
          title={
            <>
              Beyond the <em className="serif-accent">UI</em>
            </>
          }
          note="I don't just build interfaces. I own the complete engineering lifecycle — from system design to containerized production deployment."
          align="center"
        />

        {/* ── Timeline — desktop horizontal / mobile vertical ─────────── */}
        <div className="max-w-5xl mx-auto">
          <div className="hidden lg:block relative">
            <div
              className="absolute top-[15px] left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--color-border-warm), transparent)" }}
            />
            <div className="grid grid-cols-6">
              {pipelineSteps.map(step => {
                const isActive = active === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActive(step.id)}
                    aria-label={`Phase ${step.phase} — ${step.label}`}
                    className="group relative flex flex-col items-center pt-1 pb-6 min-h-[72px]"
                  >
                    <span
                      className="relative z-10 w-[13px] h-[13px] transition-all duration-250"
                      style={{
                        background: isActive ? step.color : "var(--color-bg)",
                        border: `1.5px solid ${isActive ? step.color : "var(--color-border-warm)"}`,
                        transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                        boxShadow: isActive ? `0 0 14px ${step.color}55` : "none",
                      }}
                    />
                    <span
                      className="absolute top-[15px] z-0 w-full h-px opacity-0"
                      aria-hidden
                    />
                    <span
                      className="font-mono text-[0.6rem] tracking-[0.2em] mt-3 uppercase transition-colors duration-200"
                      style={{ color: isActive ? step.color : "var(--color-text-muted)" }}
                    >
                      P{step.phase}
                    </span>
                    <span
                      className="font-display font-bold text-sm uppercase tracking-wide transition-colors duration-200"
                      style={{ color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical rail */}
          <div className="lg:hidden mb-8">
            <div className="relative pl-8">
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: "var(--color-border-warm)" }}
              />
              <div className="space-y-2">
                {pipelineSteps.map(step => {
                  const isActive = active === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActive(step.id)}
                      aria-expanded={isActive}
                      className="relative w-full text-left py-3 pr-3 transition-colors duration-200"
                      style={{ minHeight: 48 }}
                    >
                      <span
                        className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-transform duration-250"
                        style={{
                          background: isActive ? step.color : "var(--color-bg)",
                          border: `1.5px solid ${isActive ? step.color : "var(--color-border-warm)"}`,
                          transform: `translateY(-50%) ${isActive ? "rotate(45deg)" : "rotate(0deg)"}`,
                        }}
                      />
                      <span className="flex items-baseline gap-3">
                        <span
                          className="font-mono text-[0.62rem] tracking-[0.2em] uppercase"
                          style={{ color: isActive ? step.color : "var(--color-text-muted)" }}
                        >
                          P{step.phase}
                        </span>
                        <span
                          className="font-display font-bold uppercase tracking-wide text-sm transition-colors duration-200"
                          style={{ color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                        >
                          {step.label}
                        </span>
                        <span
                          className={`ml-auto font-mono text-xs transition-all duration-200 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ color: step.color }}
                        >
                          ▾
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Note — annotated detail ───────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: "1px solid var(--color-border-warm)",
                background: "var(--color-surface)",
              }}
            >
              <div
                className="flex items-center justify-between gap-3 px-5 py-2.5"
                style={{ borderBottom: "1px solid var(--color-border-warm)" }}
              >
                <span className="font-mono text-[0.62rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-rust)" }}>
                  Note — phase {activeStep.phase}
                </span>
                <span className="font-mono text-[0.62rem]" style={{ color: "var(--color-text-muted)" }}>
                  SPEC.{activeStep.phase}/06
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <h3
                  className="font-display font-bold text-xl sm:text-2xl uppercase mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {activeStep.label}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
                  {activeStep.description}
                </p>
                <p
                  className="font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-2.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Tools & practices
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeStep.tools.map(tool => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-3 py-1.5 rounded-sm font-medium"
                      style={{
                        background: `${activeStep.color}10`,
                        color: activeStep.color,
                        border: `1px solid ${activeStep.color}30`,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}