"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ------ Project Card --------------------------------------------------------------------------------------------- */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const stackColors: Record<string, string> = {
    Angular:        "bg-red-500/10 text-red-300 border-red-500/20",
    "Spring Boot":  "bg-green-500/10 text-green-300 border-green-500/20",
    PostgreSQL:     "bg-blue-500/10 text-blue-300 border-blue-500/20",
    "React Native": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group glow-border glass rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Top gradient stripe */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 bg-[length:200%_100%] group-hover:animate-[gradient-rotate_2s_linear_infinite]" />

      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
          {project.featured && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              --- Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className={cn(
                "text-xs px-2.5 py-1 rounded-lg border font-medium",
                stackColors[s] ?? "bg-slate-500/10 text-slate-300 border-slate-500/20"
              )}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------ Projects section (used on home page as preview) --- */
export default function Projects({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <section className="section" id="projects">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {preview ? "Featured Projects" : "All Projects"}
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Real-world applications built from scratch --- from backend APIs to polished frontends.
          </p>
        </motion.div>

        {/* Filter bar */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  active === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "glass text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {(preview ? projects.filter((p) => p.featured) : filtered).map(
              (project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* View all link --- only in preview mode */}
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-slate-200 font-semibold text-sm hover:border-indigo-500/40 hover:text-white transition-all duration-300"
            >
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
