"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  index,
  label,
  title,
  note,
  align = "left",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  note?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={`relative mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}>
      {/* Marker row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-rust)" }}>
          FIG. {index}
        </span>
        <span
          className="font-mono text-[0.65rem] tracking-[0.22em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          — {label}
        </span>
        <span className="rule flex-1 max-w-[10rem]" aria-hidden />
      </motion.div>

      {/* Title — clip reveal */}
      <div className="overflow-hidden pb-1">
        <motion.h2
          initial={{ y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[1.05] tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </motion.h2>
      </div>

      {note && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`mt-4 max-w-xl text-sm leading-relaxed ${centered ? "mx-auto" : ""}`}
          style={{ color: "var(--color-text-secondary)" }}
        >
          {note}
        </motion.p>
      )}

      {/* Page number */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`absolute right-2 top-0 font-mono text-[0.65rem] tracking-[0.2em] ${
          centered ? "hidden" : ""
        }`}
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden
      >
        {index} ⁄ 06
      </motion.span>
    </div>
  );
}