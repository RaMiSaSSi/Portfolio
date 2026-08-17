"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const socials = [
  {
    href:    siteConfig.github,
    icon:    Github,
    label:   "GitHub",
    handle:  "@RaMiSaSSi",
    color:   "#c4b5fd",
    bg:      "rgba(139,92,246,0.1)",
    border:  "rgba(139,92,246,0.25)",
  },
  {
    href:    siteConfig.linkedin,
    icon:    Linkedin,
    label:   "LinkedIn",
    handle:  "in/ramisassi",
    color:   "#60a5fa",
    bg:      "rgba(96,165,250,0.1)",
    border:  "rgba(96,165,250,0.25)",
  },
  {
    href:    `mailto:${siteConfig.email}`,
    icon:    Mail,
    label:   "Email",
    handle:  siteConfig.email,
    color:   "#34d399",
    bg:      "rgba(52,211,153,0.1)",
    border:  "rgba(52,211,153,0.25)",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // TODO: connect to Resend, EmailJS or Formspree
    await new Promise(r => setTimeout(r, 1200));
    console.log("Contact form:", data);
    setSubmitted(true);
    reset();
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm placeholder-transparent transition-all duration-200 focus:outline-none`;
  const inputStyle = {
    background:  "var(--color-surface)",
    border:      "1px solid var(--color-border)",
    color:       "var(--color-text-primary)",
  };

  return (
    <section className="section" id="contact">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label">Contact</p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Let's build something useful.
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Have a project in mind, a role to discuss, or just want to say hello?
            I'm always open to interesting conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Info card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.15)" }}
                >
                  <MapPin className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    Tunis, Tunisia
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    UTC+1 — response within 24h
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 pt-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400">
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-2">
              {socials.map(({ href, icon: Icon, label, handle, color, bg, border }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl p-4 group transition-all duration-250"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = border;
                    (e.currentTarget as HTMLElement).style.background = bg;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {label}
                    </p>
                    <p className="text-[11px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                      {handle}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform duration-200"
                    style={{ color }}
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(52,211,153,0.12)" }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
                    Thanks for reaching out — I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      {...register("subject")}
                      placeholder="Project enquiry / collaboration..."
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
