import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLanguage } from "@/lib/i18n-server";
import { SITE } from "@/lib/site";
import { getCertificate, getAdjacentCertificate, getAllCertificateSlugs } from "@/lib/certificates";
import CertificateDetail from "@/components/CertificateDetail";

export async function generateStaticParams() {
  return getAllCertificateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const certificate = getCertificate(slug, await getLanguage());
  if (!certificate) return {};
  return {
    title: `${certificate.title} – ${SITE.name}`,
    description: certificate.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const language = await getLanguage();
  const certificate = getCertificate(slug, language);
  if (!certificate) notFound();

  const next = getAdjacentCertificate(slug, language);

  return <CertificateDetail certificate={certificate} nextCertificate={next} />;
}
