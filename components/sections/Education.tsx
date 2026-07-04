"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            Education
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Academic Background
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Building strong foundations through formal education and continuous learning.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="timeline-line" style={{ left: "20px" }} />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex gap-6"
              >
                {/* Icon node */}
                <div className="relative z-10 mt-1 flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass glass-hover rounded-2xl p-6 group glow-border">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-cyan-400 font-medium text-sm">
                        {edu.degree} -- {edu.field}
                      </p>
                    </div>
                    {edu.grade && (
                      <div className="self-start flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        <Award className="w-3 h-3" />
                        {edu.grade}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {edu.location}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
