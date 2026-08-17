"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { href: "/#about",       label: "About" },
  { href: "/#skills",      label: "Skills" },
  { href: "/#projects",    label: "Projects" },
  { href: "/#engineering", label: "Engineering" },
  { href: "/#experience",  label: "Experience" },
  { href: "/#contact",     label: "Contact" },
];

const socials = [
  { href: siteConfig.github,               icon: Github,  label: "GitHub" },
  { href: siteConfig.linkedin,             icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`,    icon: Mail,    label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}
    >
      <div className="container-xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #7c3aed, #22d3ee)" }}
              >
                RS
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
                  Rami Sassi
                </p>
                <p className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--color-text-secondary)" }}>
              Building scalable, production-ready applications — from frontend to infrastructure.
            </p>
            {siteConfig.availableForWork && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  color: "#34d399",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-mono text-[10px] uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-all duration-200 inline-block hover:translate-x-1"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4b5fd"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="font-mono text-[10px] uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Connect
            </h3>
            <div className="flex gap-2 mb-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.35)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-[11px] transition-colors duration-200"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
            >
              {siteConfig.email}
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p className="font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            © {year} Rami Sassi. All rights reserved.
          </p>
          <p className="font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            Designed & engineered with TypeScript · Next.js · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
