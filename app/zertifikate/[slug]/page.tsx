import { notFound } from "next/navigation";
import { getCertificate, getAdjacentCertificate, getAllCertificateSlugs } from "@/lib/certificates";
import CertificateDetail from "@/components/CertificateDetail";

export async function generateStaticParams() {
  return getAllCertificateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certificate = getCertificate(slug);
  if (!certificate) return {};
  return {
    title: `${certificate.title} – Abdelrahman Salama`,
    description: certificate.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certificate = getCertificate(slug);
  if (!certificate) notFound();

  const next = getAdjacentCertificate(slug);

  return <CertificateDetail certificate={certificate} nextCertificate={next} />;
}
