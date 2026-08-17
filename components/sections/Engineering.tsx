"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pipelineSteps } from "@/lib/data";

export default function Engineering() {
  const [active, setActive] = useState<string | null>(pipelineSteps[0].id);

  const activeStep = pipelineSteps.find(s => s.id === active);

  return (
    <section className="section" id="engineering">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">Engineering Approach</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Beyond the UI
          </h2>
          <p
            className="max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            I don't just build interfaces. I own the complete engineering lifecycle —
            from system design to containerized production deployment.
          </p>
        </motion.div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          {/* Step buttons (horizontal on desktop, vertical on mobile) */}
          <div className="relative">
            {/* Connection line */}
            <div
              className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 relative">
              {pipelineSteps.map((step, i) => {
                const isActive = active === step.id;
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActive(step.id)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all duration-200"
                    style={{
                      background: isActive ? `${step.color}12` : "var(--color-surface)",
                      border: `1px solid ${isActive ? step.color + "50" : "var(--color-border)"}`,
                      boxShadow: isActive ? `0 0 20px ${step.color}20` : "none",
                    }}
                    aria-label={step.label}
                  >
                    <span
                      className="font-mono text-[10px] tracking-widest"
                      style={{ color: isActive ? step.color : "var(--color-text-muted)" }}
                    >
                      {step.phase}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: isActive ? step.color : "var(--color-text-secondary)" }}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="pipeline-indicator"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: step.color }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            {activeStep && (
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: `${activeStep.color}08`,
                  border: `1px solid ${activeStep.color}25`,
                  boxShadow: `0 0 40px ${activeStep.color}10`,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="font-mono text-xs font-bold tracking-widest"
                        style={{ color: activeStep.color }}
                      >
                        PHASE {activeStep.phase}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `${activeStep.color}30` }} />
                    </div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {activeStep.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {activeStep.description}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-3"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Tools & Practices
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeStep.tools.map(tool => (
                        <span
                          key={tool}
                          className="font-mono text-xs px-3 py-1.5 rounded-lg font-medium"
                          style={{
                            background: `${activeStep.color}14`,
                            color: activeStep.color,
                            border: `1px solid ${activeStep.color}30`,
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pipeline flow visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-0 flex-wrap"
          >
            {pipelineSteps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div
                  className="font-mono text-[11px] px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${step.color}10`,
                    color: step.color,
                    border: `1px solid ${step.color}25`,
                  }}
                  onClick={() => setActive(step.id)}
                >
                  {step.label}
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="px-2 text-xs" style={{ color: "var(--color-text-muted)" }}>→</div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
