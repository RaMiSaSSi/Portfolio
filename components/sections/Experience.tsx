"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";

const typeColors: Record<string, string> = {
  "full-time":  "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "internship": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "freelance":  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
};

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Work Experience
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            A journey through roles that shaped my engineering mindset.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line left-5 ml-0" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Icon node */}
                <div className="relative z-10 mt-1 flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass glass-hover rounded-2xl p-6 group glow-border">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-400 font-medium text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className={`self-start text-xs px-3 py-1 rounded-full border font-medium ${typeColors[exp.type]}`}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-slate-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
