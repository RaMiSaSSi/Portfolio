"use client";

import { useEffect, useRef, useState } from "react";

const markers = [
  { id: "home",        label: "00" },
  { id: "about",       label: "01" },
  { id: "skills",      label: "02" },
  { id: "projects",    label: "03" },
  { id: "engineering", label: "04" },
  { id: "experience",  label: "05" },
  { id: "contact",     label: "06" },
];

/**
 * Fixed right rail (desktop only) showing per-section scroll progress.
 * The active section is the one crossing the middle of the viewport; its
 * marker fills proportionally to how far the section has been scrolled.
 * Each marker is a button — clicking it smooth-scrolls to the section.
 */
export default function ScrollSectionProgress() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const mid = window.innerHeight / 2;
      let current = 0;
      let fill = 0;
      for (let i = 0; i < markers.length; i++) {
        const el = document.getElementById(markers[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          current = i;
          fill = Math.min(1, Math.max(0, (mid - rect.top) / rect.height));
          break;
        }
      }
      setActive(current);
      setProgress(fill);
    };

    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5"
    >
      {markers.map((m, i) => {
        const isActive = i === active;
        return (
          <button key={m.id} onClick={() => goTo(m.id)} className="group flex flex-col items-center gap-1.5">
            <span
              className={`font-mono text-[0.55rem] tracking-[0.18em] transition-colors duration-300 ${
                isActive ? "" : "opacity-50 group-hover:opacity-80"
              }`}
              style={{ color: isActive ? "var(--color-accent-bright)" : "var(--color-text-muted)" }}
            >
              {m.label}
            </span>
            <span
              className="block h-10 w-[3px] rounded-full overflow-hidden"
              style={{ background: "var(--color-border-warm)" }}
            >
              <span
                className="block w-full transition-all duration-300"
                style={{
                  height: isActive ? `${progress * 100}%` : "0%",
                  background: "linear-gradient(180deg, var(--color-accent), var(--color-rust))",
                  boxShadow: isActive ? "0 0 10px rgba(232,72,43,0.6)" : "none",
                }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}