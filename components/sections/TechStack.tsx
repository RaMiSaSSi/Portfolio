"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { techStack } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 18 },
  },
};

export default function TechStack() {
  return (
    <section className="section-sm" id="tech">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Technologies I work with
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group glow-border glass glass-hover rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default transition-colors duration-300"
            >
              <span
                className="text-3xl filter drop-shadow-md group-hover:scale-125 transition-transform duration-300"
                role="img"
                aria-label={tech.name}
              >
                {tech.icon}
              </span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              {/* Glow dot */}
              <span
                className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
