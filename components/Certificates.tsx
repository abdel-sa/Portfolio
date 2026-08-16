"use client";

import { motion } from "framer-motion";
import { Warp } from "@paper-design/shaders-react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCertificates } from "@/lib/certificates";
import type { Certificate } from "@/lib/certificates";
import { useLanguage } from "@/components/LanguageProvider";

const ICON_MAP: Record<Certificate["icon"], LucideIcon> = {
  ShieldCheck,
  Award,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function Certificates() {
  const { t, language } = useLanguage();
  const certificates = getCertificates(language);

  return (
    <section id="zertifikate" className="relative py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 tracking-widest uppercase mb-4">
            {t.certificates.sectionTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            {t.certificates.heading}
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
            {t.certificates.subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => {
            const Icon = ICON_MAP[certificate.icon];
            const { shader } = certificate;
            return (
              <motion.div
                key={certificate.slug}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative h-80 group"
              >
                {/* Shader background */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
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
                    speed={0.6}
                    colors={shader.colors}
                  />
                </div>

                {/* Card overlay */}
                <div className="relative z-10 h-full flex flex-col p-7 rounded-3xl bg-black/75 border border-white/10 group-hover:bg-black/65 transition-colors duration-300">
                  {/* Header: Icon & Issuer */}
                  <div className="flex justify-between items-start mb-5 gap-3">
                    <Icon className="w-10 h-10 text-white drop-shadow-lg shrink-0" />
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-white/10 border border-white/20 text-white/80 uppercase text-right">
                      {certificate.issuer}
                    </span>
                  </div>

                  {/* Title + description */}
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-200/80 text-sm leading-relaxed flex-grow">
                    {certificate.description}
                  </p>

                  {/* Date */}
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-white/10 border border-white/15 text-white/70">
                      {certificate.date}
                    </span>
                  </div>

                  {/* Link */}
                  <Link
                    href={`/zertifikate/${certificate.slug}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 group/link w-fit"
                  >
                    {t.certificates.viewCertificate}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
