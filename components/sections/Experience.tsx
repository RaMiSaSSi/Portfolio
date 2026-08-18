"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";
import { experiences, education } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  "alternance": {
    bg:     "rgba(232,72,43,0.1)",
    text:   "#ff7a5c",
    border: "rgba(232,72,43,0.3)",
  },
  "internship": {
    bg:     "rgba(217,164,65,0.1)",
    text:   "#e3b94f",
    border: "rgba(217,164,65,0.3)",
  },
  "project": {
    bg:     "rgba(91,123,166,0.1)",
    text:   "#8fb0d6",
    border: "rgba(91,123,166,0.3)",
  },
};

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container-xl">
        <SectionHeader
          index="05"
          label="career"
          title={
            <>
              Experience & <em className="serif-accent">education</em>
            </>
          }
          note="An engineering path shaped by real projects, academic rigour and continuous learning."
        />

        <div className="max-w-3xl mx-auto space-y-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(232,72,43,0.12)" }}
              >
                <Briefcase className="w-4 h-4" style={{ color: "#ff7a5c" }} />
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
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #b3541e, #8a3f17)",
                            boxShadow: "0 4px 16px rgba(179,84,30,0.35)",
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
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,72,43,0.3)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(232,72,43,0.08)";
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
                              className="text-base font-bold group-hover:text-white transition-colors"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              {exp.role}
                            </h4>
                            <p className="text-sm font-medium" style={{ color: "#e3b94f" }}>{exp.company}</p>
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
                            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--color-rust)" }} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--color-rust)" }} />
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
                                style={{ background: "#e8482b" }}
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
                                background: "rgba(232,72,43,0.08)",
                                color: "#cbbfa4",
                                border: "1px solid rgba(232,72,43,0.2)",
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
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(91,123,166,0.12)" }}
              >
                <GraduationCap className="w-4 h-4" style={{ color: "#8fb0d6" }} />
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
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(91,123,166,0.35)";
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
                      <p className="text-xs font-medium" style={{ color: "#8fb0d6" }}>{edu.institution}</p>
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
                        background: "rgba(163,160,78,0.12)",
                        color: "#c2bf7d",
                        border: "1px solid rgba(163,160,78,0.3)",
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
