import { notFound } from "next/navigation";
import { getProject, getAdjacentProject, getAllSlugs } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} – Abdelrahman Salama`,
    description: project.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return <ProjectDetail project={project} nextProject={next} />;
}
