"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";

// Flatten all tech items into a single ticker list
const allTech = skillCategories.flatMap(cat =>
  cat.items.map(item => ({ name: item.name, color: cat.color, category: cat.label }))
);

// Duplicate for seamless loop
const tickerItems = [...allTech, ...allTech];

export default function TechStack() {
  return (
    <section className="section-sm" id="tech" style={{ overflow: "hidden" }}>
      <div className="container-xl mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="section-label mb-2">Stack</p>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Technologies I work with
          </h2>
        </motion.div>
      </div>

      {/* Ticker row 1 — left to right */}
      <div className="relative mb-3">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
        />
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {tickerItems.slice(0, Math.ceil(tickerItems.length / 2) * 2).map((tech, i) => (
            <div
              key={`r1-${i}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 cursor-default select-none"
              style={{
                background: `${tech.color}10`,
                border: `1px solid ${tech.color}25`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: tech.color }}
              />
              <span
                className="font-mono text-xs font-medium whitespace-nowrap"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
              <span
                className="font-mono text-[9px] opacity-50 whitespace-nowrap hidden sm:block"
                style={{ color: tech.color }}
              >
                {tech.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker row 2 — right to left */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
        />
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {[...tickerItems].reverse().map((tech, i) => (
            <div
              key={`r2-${i}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 cursor-default select-none"
              style={{
                background: `${tech.color}08`,
                border: `1px solid ${tech.color}20`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: tech.color }}
              />
              <span
                className="font-mono text-xs font-medium whitespace-nowrap"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
