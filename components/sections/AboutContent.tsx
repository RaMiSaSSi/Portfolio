"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Code2, Coffee, Target } from "lucide-react";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import { siteConfig } from "@/lib/data";
import { downloadCV } from "@/lib/download-cv";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "I write code that is readable, maintainable and follows SOLID principles.",
    color: "from-indigo-600 to-indigo-400",
  },
  {
    icon: Target,
    title: "Problem Solver",
    desc: "Every technical challenge is an opportunity to craft an elegant solution.",
    color: "from-cyan-600 to-cyan-400",
  },
  {
    icon: Coffee,
    title: "Continuous Learner",
    desc: "I stay up-to-date with modern frameworks, patterns and best practices.",
    color: "from-amber-600 to-amber-400",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero bio section */}
      <section className="section">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center max-w-5xl mx-auto">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col items-center gap-6"
            >
              {/* Avatar placeholder */}
              <div className="relative">
                <div className="w-52 h-52 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-6xl font-bold text-white shadow-2xl shadow-indigo-500/30">
                  AR {/* TODO: replace with <Image> when you have a photo */}
                </div>
                {/* Online ring */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 border-4 border-[#080810] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-xl font-bold text-white">{siteConfig.name}</p>
                <p className="text-sm text-slate-400">{siteConfig.title}</p>
                <p className="text-xs text-slate-600">{siteConfig.location}</p>
              </div>

              {/* Social buttons */}
              <div className="flex gap-3">
                {[
                  { href: siteConfig.github, icon: Github, label: "GitHub" },
                  { href: siteConfig.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <a
                href={siteConfig.cvUrl}
                download={siteConfig.cvFileName}
                onClick={(e) => {
                  e.preventDefault();
                  void downloadCV();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3 space-y-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                  About Me
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                  Passionate about building{" "}
                  <span className="gradient-text">great software</span>
                </h1>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    I&apos;m a Full-Stack Engineer based in {siteConfig.location} with a passion
                    for crafting scalable, well-architected applications. I specialise in Java
                    and Spring Boot on the backend, and Angular or React Native on the frontend.
                  </p>
                  <p>
                    I&apos;ve had the privilege of working across multiple companies --- from
                    government infrastructure projects to fast-paced SaaS startups --- which gave
                    me a broad perspective on how great software is built at scale.
                  </p>
                  <p>
                    When I&apos;m not coding, I&apos;m exploring new technologies, contributing to
                    side projects, and mentoring junior developers in my community.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass rounded-2xl p-4"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-3`}
                    >
                      <v.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{v.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Education />
      <Skills />
    </>
  );
}
