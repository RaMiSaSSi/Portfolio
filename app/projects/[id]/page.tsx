import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectGallery from "@/components/ProjectGallery";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectGallery project={project} />;
}
