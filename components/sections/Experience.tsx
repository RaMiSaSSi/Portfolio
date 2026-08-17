"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";
import { experiences, education } from "@/lib/data";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  "alternance": {
    bg:     "rgba(139,92,246,0.12)",
    text:   "#c4b5fd",
    border: "rgba(139,92,246,0.3)",
  },
  "internship": {
    bg:     "rgba(245,158,11,0.12)",
    text:   "#fcd34d",
    border: "rgba(245,158,11,0.3)",
  },
  "project": {
    bg:     "rgba(34,211,238,0.12)",
    text:   "#67e8f9",
    border: "rgba(34,211,238,0.3)",
  },
};

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">Career</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Experience & Education
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
            An engineering path shaped by real projects, academic rigour and continuous learning.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(139,92,246,0.15)" }}
              >
                <Briefcase className="w-4 h-4 text-violet-400" />
              </div>
              <h3
                className="font-semibold text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                Professional Experience
              </h3>
            </div>

            <div className="relative">
              <div className="timeline-line left-5 ml-0" />
              <div className="space-y-8">
                {experiences.map((exp, i) => {
                  const colors = typeColors[exp.type] ?? typeColors["project"];
                  return (
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
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                            boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                          }}
                        >
                          <Briefcase className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Card */}
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="flex-1 rounded-2xl p-6 group transition-all duration-300"
                        style={{
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.3)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(139,92,246,0.1)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                          <div>
                            <h4
                              className="text-base font-bold group-hover:text-violet-300 transition-colors"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {exp.role}
                            </h4>
                            <p className="text-sm font-medium text-violet-400">{exp.company}</p>
                          </div>
                          <span
                            className="self-start text-xs px-2.5 py-1 rounded-full font-mono font-medium flex-shrink-0"
                            style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                          >
                            {exp.type}
                          </span>
                        </div>

                        {/* Meta */}
                        <div
                          className="flex flex-wrap gap-4 text-xs mb-4"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-violet-400" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-violet-400" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((point, j) => (
                            <li
                              key={j}
                              className="flex gap-2.5 text-xs leading-relaxed"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "#8b5cf6" }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map(t => (
                            <span
                              key={t}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-lg"
                              style={{
                                background: "rgba(139,92,246,0.1)",
                                color: "#a78bfa",
                                border: "1px solid rgba(139,92,246,0.2)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(34,211,238,0.12)" }}
              >
                <GraduationCap className="w-4 h-4 text-cyan-400" />
              </div>
              <h3
                className="font-semibold text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.25)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h4
                        className="font-bold text-sm"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {edu.degree} — {edu.field}
                      </h4>
                      <p className="text-xs font-medium text-cyan-400">{edu.institution}</p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-xs flex-shrink-0"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {edu.description}
                  </p>
                  {edu.grade && (
                    <span
                      className="inline-block mt-2 font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(52,211,153,0.12)",
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.25)",
                      }}
                    >
                      {edu.grade}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
