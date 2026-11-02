import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLanguage } from "@/lib/i18n-server";
import { SITE } from "@/lib/site";
import { getProject, getAdjacentProject, getAllSlugs } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, await getLanguage());
  if (!project) return {};
  return {
    title: `${project.title} – ${SITE.name}`,
    description: project.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const language = await getLanguage();
  const project = getProject(slug, language);
  if (!project) notFound();

  const next = getAdjacentProject(slug, language);

  return <ProjectDetail project={project} nextProject={next} />;
}
