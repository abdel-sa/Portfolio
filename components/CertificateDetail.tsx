"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, FileText, ShieldCheck, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { getCertificate, getAdjacentCertificate } from "@/lib/certificates";
import type { Certificate } from "@/lib/certificates";
import { useLanguage } from "@/components/LanguageProvider";

const ICON_MAP: Record<Certificate["icon"], LucideIcon> = {
  ShieldCheck,
  Award,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

export default function CertificateDetail({
  certificate: initialCertificate,
  nextCertificate: initialNextCertificate,
}: {
  certificate: Certificate;
  nextCertificate?: Certificate;
}) {
  const { t, language } = useLanguage();
  const certificate = getCertificate(initialCertificate.slug, language) || initialCertificate;
  const nextCertificate = initialNextCertificate
    ? getAdjacentCertificate(initialCertificate.slug, language)
    : undefined;
  const Icon = ICON_MAP[certificate.icon];
  const { shader } = certificate;

  return (
    <main className="min-h-screen bg-[#030303] pt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/#zertifikate"
            className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.certificateDetail.back}
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...fadeUp(0.05)} className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden mb-10">
          <div className="absolute inset-0">
            <Warp
              style={{ height: "100%", width: "100%" }}
              proportion={shader.proportion}
              softness={shader.softness}
              distortion={shader.distortion}
              swirl={shader.swirl}
              swirlIterations={shader.swirlIterations}
              shape={shader.shape}
              shapeScale={shader.shapeScale}
              scale={1}
              rotation={0}
              speed={0.5}
              colors={shader.colors}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Icon className="w-20 h-20 text-white drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-indigo-500/15 border-indigo-500/25 text-indigo-300">
              {certificate.issuer}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.10] text-white/45">
              {certificate.date}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {certificate.title}
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">{certificate.description}</p>
        </motion.div>

        {/* Issuer / Date / Credential ID */}
        <motion.div
          {...fadeUp(0.15)}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-white/35 text-xs uppercase tracking-widest mb-1.5">
              {t.certificateDetail.issuedBy}
            </p>
            <p className="text-white/80 text-sm font-medium">{certificate.issuer}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <p className="text-white/35 text-xs uppercase tracking-widest mb-1.5">
              {t.certificateDetail.date}
            </p>
            <p className="text-white/80 text-sm font-medium">{certificate.date}</p>
          </div>
          {certificate.credentialId && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-1.5">
                {t.certificateDetail.credentialId}
              </p>
              <p className="text-white/80 text-sm font-medium truncate" title={certificate.credentialId}>
                {certificate.credentialId}
              </p>
            </div>
          )}
        </motion.div>

        {/* Skills gained */}
        <motion.div {...fadeUp(0.2)} className="mb-12">
          <h2 className="text-white font-bold text-xl mb-5">{t.certificateDetail.skillsGained}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {certificate.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-indigo-400" />
                </span>
                <span className="text-white/60 text-sm leading-relaxed">{skill}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* View PDF */}
        {certificate.fileUrl && (
          <motion.div {...fadeUp(0.25)} className="mb-16">
            <a
              href={certificate.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.10] text-white/80 hover:text-white hover:border-white/[0.20] transition-all duration-200 text-sm font-semibold"
            >
              <FileText className="w-4 h-4" />
              {t.certificateDetail.viewPdf}
            </a>
          </motion.div>
        )}

        {/* Next certificate */}
        {nextCertificate && (
          <motion.div {...fadeUp(0.3)}>
            <div className="border-t border-white/[0.08] pt-10">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-4">
                {t.certificateDetail.nextCertificate}
              </p>
              <Link
                href={`/zertifikate/${nextCertificate.slug}`}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors duration-300"
              >
                <div>
                  <p className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors">
                    {nextCertificate.title}
                  </p>
                  <p className="text-white/40 text-sm mt-1">{nextCertificate.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-6" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
