import type { Metadata } from "next";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Rami Sassi — a Full-Stack Software Engineer from Tunis, Tunisia, specialising in Angular, Spring Boot, NestJS, and DevOps.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <About />
        <Skills />
        <Experience />
      </div>
    </PageTransition>
  );
}
