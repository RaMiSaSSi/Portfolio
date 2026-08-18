"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download, Github } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#about",       label: "About",      anchor: true },
  { href: "/#skills",      label: "Skills",     anchor: true },
  { href: "/#projects",    label: "Projects",   anchor: true },
  { href: "/#engineering", label: "Engineering",anchor: true },
  { href: "/#experience",  label: "Experience", anchor: true },
  { href: "/#contact",     label: "Contact",    anchor: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "engineering", "experience", "contact"];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => {
    const section = href.replace("/#", "");
    return activeSection === section;
  };

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: "2px",
          transformOrigin: "0%",
          background: "linear-gradient(90deg, #e8482b, #d9a441, #e8482b)",
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-3 inset-x-4 z-50 transition-all duration-500 rounded-2xl",
          scrolled
            ? "shadow-2xl shadow-black/30"
            : "border border-transparent"
        )}
        style={{
          background: scrolled
            ? "rgba(14,13,11,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        }}
      >
        <nav className="container-xl flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[11px] text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #e8482b, #d9a441)" }}
            >
              RS
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
                Rami
              </span>
              <span className="font-semibold text-sm text-[#e3b94f]">Sassi</span>
              <span className="font-mono text-[10px] ml-1 opacity-40" style={{ color: "var(--color-text-muted)" }}>
                .dev
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200",
                      active
                        ? "text-[#ff7a5c]"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(232,72,43,0.12)", border: "1px solid rgba(232,72,43,0.25)" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              aria-label="GitHub"
              style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#ff7a5c";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,72,43,0.3)";
                (e.currentTarget as HTMLElement).style.background = "rgba(232,72,43,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => void downloadCV()}
              className="btn-primary text-xs px-3 py-2"
              style={{ padding: "0.45rem 1rem", fontSize: "0.75rem" }}
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 h-11 w-11 rounded-lg transition-all flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ color: "var(--color-text-muted)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                        isActive(link.href)
                          ? "text-[#ff7a5c]"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                      style={
                        isActive(link.href)
                          ? { background: "rgba(232,72,43,0.12)", border: "1px solid rgba(232,72,43,0.2)" }
                          : {}
                      }
                    >
                      {isActive(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8482b]" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  className="pt-2 flex items-center gap-2"
                >
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <button
                    onClick={() => void downloadCV()}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: "linear-gradient(135deg, #e8482b, #b3541e)" }}
                  >
                    <Download className="w-4 h-4" /> Resume
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
