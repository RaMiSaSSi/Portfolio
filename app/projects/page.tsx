import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Rami Sassi — CoBeez (SaaS formation platform), PR9Auto (garage management), Aventuroo (travel platform) and more, built with Angular, Spring Boot and Docker.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <Projects preview={false} />
      </div>
    </PageTransition>
  );
}
