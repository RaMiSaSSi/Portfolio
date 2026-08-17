"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, type SkillItem } from "@/lib/data";

// ─── Category icons (emoji-free) ─────────────────────────────────────────────
const categoryIcons: Record<string, string> = {
  frontend:   "◈",
  backend:    "⬡",
  database:   "⬢",
  devops:     "◉",
  other:      "◇",
};

// ─── Chip ────────────────────────────────────────────────────────────────────
function Chip({
  item,
  color,
  onHover,
  isHovered,
}: {
  item: SkillItem;
  color: string;
  onHover: (item: SkillItem | null) => void;
  isHovered: boolean;
}) {
  return (
    <motion.button
      layout
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => onHover(item)}
      onHoverEnd={() => onHover(null)}
      className="tech-chip relative"
      style={{
        borderColor: isHovered ? `${color}60` : undefined,
        background: isHovered ? `${color}12` : undefined,
        color: isHovered ? "#f1f0fb" : undefined,
        boxShadow: isHovered ? `0 0 16px ${color}25` : undefined,
      }}
      aria-label={item.name}
    >
      {/* Active dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
        style={{ background: isHovered ? color : "rgba(255,255,255,0.2)" }}
      />
      <span className="font-mono text-[11px]">{item.name}</span>
    </motion.button>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [hoveredItem, setHoveredItem] = useState<SkillItem | null>(null);

  const category = skillCategories.find(c => c.id === activeCategory) ?? skillCategories[0];

  return (
    <section className="section" id="skills">
      <div className="container-xl">
        {/* ── Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">Skills & Technologies</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            What I bring to the table
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            A full-stack toolkit built through production projects — not theoretical exercises.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* ── Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {skillCategories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setHoveredItem(null); }}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive ? `${cat.color}18` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? cat.color + "50" : "rgba(255,255,255,0.07)"}`,
                    color: isActive ? cat.color : "var(--color-text-muted)",
                    boxShadow: isActive ? `0 0 16px ${cat.color}20` : "none",
                  }}
                >
                  <span className="font-mono mr-1.5 text-xs opacity-60">{categoryIcons[cat.id]}</span>
                  {cat.label}
                  <span
                    className="ml-2 text-xs rounded-full px-1.5 py-0.5 font-mono"
                    style={{
                      background: isActive ? `${cat.color}25` : "rgba(255,255,255,0.05)",
                      color: isActive ? cat.color : "var(--color-text-muted)",
                    }}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Category panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-xl"
                  style={{ color: category.color }}
                >
                  {categoryIcons[category.id]}
                </span>
                <div>
                  <h3
                    className="font-semibold text-base"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {category.label}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Grid: chips + tooltip */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Chips */}
                <div className="lg:col-span-3">
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                    initial="hidden"
                    animate="show"
                  >
                    {category.items.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={{
                          hidden: { opacity: 0, scale: 0.85 },
                          show:   { opacity: 1, scale: 1 },
                        }}
                      >
                        <Chip
                          item={item}
                          color={category.color}
                          onHover={setHoveredItem}
                          isHovered={hoveredItem?.name === item.name}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Tooltip card */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    {hoveredItem ? (
                      <motion.div
                        key={hoveredItem.name}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl p-4 h-full"
                        style={{
                          background: `${category.color}0c`,
                          border: `1px solid ${category.color}30`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: category.color }}
                          />
                          <span
                            className="font-mono text-xs font-semibold"
                            style={{ color: category.color }}
                          >
                            {hoveredItem.name}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                          {hoveredItem.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl p-4 flex items-center justify-center text-center h-full min-h-[80px]"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px dashed rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                          Hover a technology to learn more
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── All technologies summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <p
              className="text-center text-xs font-mono mb-4 tracking-widest uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              Quick overview — all technologies
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {skillCategories.flatMap(cat =>
                cat.items.map(item => (
                  <span
                    key={`${cat.id}-${item.name}`}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: `${cat.color}10`,
                      color: cat.color,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    {item.name}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
