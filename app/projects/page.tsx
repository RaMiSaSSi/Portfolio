import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects --- Amatun Shop, Amatun Delivery, Aventurooo and more, built with Angular, Spring Boot, React Native and PostgreSQL.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28">
      <Projects preview={false} />
    </div>
  );
}
