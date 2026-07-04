"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Backend:        "from-indigo-600 to-indigo-400",
  Frontend:       "from-cyan-600 to-cyan-400",
  Databases:      "from-emerald-600 to-emerald-400",
  "DevOps & Tools": "from-orange-600 to-orange-400",
  Other:          "from-purple-600 to-purple-400",
};

const badgeColors: Record<string, string> = {
  Backend:        "bg-indigo-500/10 text-indigo-300 border-indigo-500/25 hover:bg-indigo-500/20",
  Frontend:       "bg-cyan-500/10 text-cyan-300 border-cyan-500/25 hover:bg-cyan-500/20",
  Databases:      "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20",
  "DevOps & Tools": "bg-orange-500/10 text-orange-300 border-orange-500/25 hover:bg-orange-500/20",
  Other:          "bg-purple-500/10 text-purple-300 border-purple-500/25 hover:bg-purple-500/20",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What I bring to the table
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            A well-rounded toolkit built through real-world projects and continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={card}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 group glow-border transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-2 h-8 rounded-full bg-gradient-to-b ${categoryColors[group.category] ?? "from-slate-600 to-slate-400"}`}
                />
                <h3 className="font-semibold text-white">{group.category}</h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.07 }}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-default transition-all duration-200 ${
                      badgeColors[group.category] ?? "bg-slate-500/10 text-slate-300 border-slate-500/25"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
