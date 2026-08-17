"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="section-sm" id="education">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Education</p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Academic Background
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="flex gap-5 rounded-2xl p-5 transition-all duration-300"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              }}
            >
              <div className="flex-shrink-0 mt-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #0891b2, #22d3ee)", boxShadow: "0 4px 16px rgba(34,211,238,0.2)" }}
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
                      {edu.degree} — {edu.field}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400">{edu.institution}</p>
                  </div>
                  {edu.grade && (
                    <span
                      className="self-start font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(52,211,153,0.12)",
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.25)",
                      }}
                    >
                      {edu.grade}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />{edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />{edu.location}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
