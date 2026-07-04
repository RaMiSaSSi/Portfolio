import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Sassi Rami --- Full-Stack Engineer",
  description:
    "Full-Stack Engineer specialising in Java, Spring Boot, Angular and React Native. Explore my projects, experience and skills.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <Projects preview />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
