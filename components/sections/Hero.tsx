"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { ArrowRight, Download, Github, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";

// --- Typewriter hook ---
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let idx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[idx];
      if (!ref.current) return;

      if (!deleting) {
        ref.current.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(tick, pause);
          return;
        }
      } else {
        ref.current.textContent = word.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % words.length;
        }
      }
      timeout = setTimeout(tick, deleting ? speed / 2 : speed);
    }

    timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [words, speed, pause]);

  return ref;
}

// --- Animated grid background ---
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow top-center */}
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      {/* Radial glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
      {/* Floating orbs */}
      {[
        { x: "15%", y: "25%", size: 6, color: "#6366f1", delay: 0 },
        { x: "80%", y: "15%", size: 4, color: "#22d3ee", delay: 1.2 },
        { x: "60%", y: "70%", size: 5, color: "#818cf8", delay: 0.6 },
        { x: "10%", y: "75%", size: 3, color: "#22d3ee", delay: 1.8 },
        { x: "90%", y: "55%", size: 4, color: "#6366f1", delay: 0.9 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size * 4,
            height: orb.size * 4,
            backgroundColor: orb.color,
            boxShadow: `0 0 ${orb.size * 10}px ${orb.color}`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- Stat counter ---
function StatCounter({ value, label }: { value: number; label: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useSpring(count, { stiffness: 80, damping: 15 });

  useEffect(() => {
    animate(count, value, { duration: 2, ease: "easeOut" });
  }, [count, value]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white flex items-end justify-center gap-0.5">
        <motion.span>{rounded}</motion.span>
        <span className="text-indigo-400">+</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

// --- Hero ---
const roles = [
  "Full-Stack Engineer",
  "Spring Boot Expert",
  "Angular Developer",
  "React Native Builder",
  "Java Architect",
];

export default function Hero() {
  const typeRef = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center pt-24">
      <GridBackground />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-indigo-500/20 text-sm text-indigo-300"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Available for new opportunities</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="h-12 mb-6 flex items-center justify-center"
          >
            <p className="text-xl sm:text-2xl text-slate-300 font-medium">
              <span ref={typeRef} className="text-cyan-400" />
              <span className="animate-pulse text-cyan-400">|</span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mb-10"
          >
            <MapPin className="w-4 h-4 text-indigo-400" />
            {siteConfig.location}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={siteConfig.cvUrl}
              download={siteConfig.cvFileName}
              onClick={(e) => {
                e.preventDefault();
                void downloadCV();
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-slate-200 font-semibold text-sm hover:border-indigo-500/40 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-slate-200 font-semibold text-sm hover:border-indigo-500/40 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="inline-flex items-center gap-12 glass border border-white/10 rounded-2xl px-10 py-6"
          >
            <StatCounter value={1} label="Years Exp." />
            <div className="w-px h-8 bg-white/10" />
            <StatCounter value={3} label="Projects" />
            <div className="w-px h-8 bg-white/10" />
            <StatCounter value={10} label="Technologies" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs text-slate-600 uppercase tracking-widest">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
