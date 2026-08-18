import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Engineering from "@/components/sections/Engineering";
import Contact from "@/components/sections/Contact";
import PageTransition from "@/components/layout/PageTransition";
import SectionDivider from "@/components/layout/SectionDivider";
import ScrollSnap from "@/components/layout/ScrollSnap";
import ScrollSectionProgress from "@/components/layout/ScrollSectionProgress";

export const metadata: Metadata = {
  title: "Rami Sassi — Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specialising in Angular, React, Spring Boot, NestJS and DevOps. Building scalable, production-ready applications from Tunis, Tunisia.",
};

export default function HomePage() {
  return (
    <div id="snap-root">
      <ScrollSnap />
      <ScrollSectionProgress />
      <PageTransition>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider flip />
        <Skills />
        <SectionDivider />
        <Projects preview />
        <SectionDivider flip />
        <Engineering />
        <SectionDivider />
        <Experience />
        <SectionDivider flip />
        <Contact />
      </PageTransition>
    </div>
  );
}