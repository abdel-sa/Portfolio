"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ImageIcon, Star, Brain, Database, Globe, TrendingUp, Shield, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { getProject, getAdjacentProject } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ICON_MAP: Record<Project["icon"], LucideIcon> = {
  Star,
  Brain,
  Database,
  Globe,
  TrendingUp,
  Shield,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

function PlaceholderImage({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white/20 ${className}`}
    >
      <ImageIcon className="w-8 h-8" />
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  "FH Projekt": "bg-indigo-500/15 border-indigo-500/25 text-indigo-300",
  "FH Project": "bg-indigo-500/15 border-indigo-500/25 text-indigo-300",
  "Eigenes Projekt": "bg-violet-500/15 border-violet-500/25 text-violet-300",
  "Personal Project": "bg-violet-500/15 border-violet-500/25 text-violet-300",
  Freelance: "bg-emerald-500/15 border-emerald-500/25 text-emerald-300",
  Arbeit: "bg-amber-500/15 border-amber-500/25 text-amber-300",
  Work: "bg-amber-500/15 border-amber-500/25 text-amber-300",
};

export default function ProjectDetail({
  project: initialProject,
  nextProject: initialNextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const { t, language } = useLanguage();
  const project = getProject(initialProject.slug, language) || initialProject;
  const nextProject = initialNextProject ? getAdjacentProject(initialProject.slug, language) : undefined;
  const Icon = ICON_MAP[project.icon];
  const { shader } = project;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <main className="min-h-screen bg-[#030303] pt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/#projekte"
            className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.projectDetail.back}
          </Link>
        </motion.div>

        {/* Hero image */}
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

        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[project.type] ?? "bg-white/10 border-white/20 text-white/60"}`}
            >
              {project.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.10] text-white/45">
              {project.year}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Tech tags */}
        <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-sm bg-white/[0.05] border border-white/[0.10] text-white/65"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Problem + Solution cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <h2 className="text-white font-semibold">{t.projectDetail.problem}</h2>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-white font-semibold">{project.solutionLabel ?? t.projectDetail.myRole}</h2>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </motion.div>

        {/* Key features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-12"
        >
          <h2 className="text-white font-bold text-xl mb-5">{t.projectDetail.keyFeatures}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-indigo-400" />
                </span>
                <span className="text-white/60 text-sm leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Screenshots gallery */}
        {(project.screenshots && project.screenshots.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-16"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">{t.projectDetail.screenshots}</h2>
              <div className="flex shrink-0 items-center justify-start gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    carouselApi?.scrollPrev();
                  }}
                  disabled={!canScrollPrev}
                  className="disabled:pointer-events-auto h-8 w-8 rounded-full border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    carouselApi?.scrollNext();
                  }}
                  disabled={!canScrollNext}
                  className="disabled:pointer-events-auto h-8 w-8 rounded-full border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="w-full">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  breakpoints: {
                    "(max-width: 768px)": {
                      dragFree: true,
                    },
                  },
                }}
                className="relative"
              >
                <CarouselContent className="-ml-4">
                  {project.screenshots.map((src, i) => (
                    <CarouselItem key={i} className="pl-4 sm:basis-4/5 md:basis-[70%] lg:basis-[60%]">
                      <div 
                        className="group relative flex aspect-[16/10] cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] transition-all hover:border-white/[0.16]"
                        onClick={() => setSelectedImage(src)}
                      >
                        <img
                          src={src}
                          alt={`Screenshot ${i + 1}`}
                          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </motion.div>
        )}

        {/* Market context (optional) */}
        {project.context && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-16"
          >
            <h2 className="text-white font-bold text-xl mb-4">{project.context.title}</h2>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-white/55 text-sm leading-relaxed">{project.context.text}</p>
            </div>
          </motion.div>
        )}

        {/* Next project */}
        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="border-t border-white/[0.08] pt-10">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-4">{t.projectDetail.nextProject}</p>
              <Link
                href={`/projekte/${nextProject.slug}`}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors duration-300"
              >
                <div>
                  <p className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors">
                    {nextProject.title}
                  </p>
                  <p className="text-white/40 text-sm mt-1">{nextProject.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-6" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              src={selectedImage}
              alt="Fullscreen screenshot"
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
