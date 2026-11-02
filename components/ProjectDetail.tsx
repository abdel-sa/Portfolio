"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { getProject, getAdjacentProject } from "@/lib/projects";
import type { Project, ProjectType } from "@/lib/projects";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { ShaderBackground } from "@/components/ui/shader-background";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const TYPE_COLORS: Record<ProjectType, string> = {
  fh: "bg-indigo-500/15 border-indigo-500/25 text-indigo-300",
  personal: "bg-violet-500/15 border-violet-500/25 text-violet-300",
  freelance: "bg-emerald-500/15 border-emerald-500/25 text-emerald-300",
  work: "bg-amber-500/15 border-amber-500/25 text-amber-300",
};

const CAROUSEL_BUTTON =
  "disabled:pointer-events-auto h-8 w-8 rounded-full border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white";

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
  const { shader } = project;
  const screenshots = project.screenshots ?? [];

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex !== null ? screenshots[selectedIndex] : undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    const frame = requestAnimationFrame(updateSelection);
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    return () => {
      cancelAnimationFrame(frame);
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi]);

  const screenshotAlt = (i: number) => `${project.title} – Screenshot ${i + 1}`;

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
          <ShaderBackground shader={shader} speed={0.5} className="absolute inset-0" />
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[project.type]}`}>
              {t.projectTypes[project.type]}
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
        <motion.div {...fadeUp(0.2)} className="grid md:grid-cols-2 gap-6 mb-12">
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
        <motion.div {...fadeUp(0.25)} className="mb-12">
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
        {screenshots.length > 0 && (
          <motion.div {...fadeUp(0.3)} className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">{t.projectDetail.screenshots}</h2>
              <div className="flex shrink-0 items-center justify-start gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label={t.a11y.previous}
                  className={CAROUSEL_BUTTON}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollNext()}
                  disabled={!canScrollNext}
                  aria-label={t.a11y.next}
                  className={CAROUSEL_BUTTON}
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
                  {screenshots.map((src, i) => (
                    <CarouselItem key={src.src} className="pl-4 sm:basis-4/5 md:basis-[70%] lg:basis-[60%]">
                      <button
                        type="button"
                        aria-label={`${t.a11y.enlargeScreenshot} ${i + 1}`}
                        className="group relative flex w-full aspect-[16/10] cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] transition-all hover:border-white/[0.16]"
                        onClick={() => setSelectedIndex(i)}
                      >
                        <Image
                          src={src}
                          alt={screenshotAlt(i)}
                          fill
                          sizes="(min-width: 1024px) 540px, (min-width: 768px) 70vw, (min-width: 640px) 80vw, 100vw"
                          placeholder="blur"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </motion.div>
        )}

        {/* Market context (optional) */}
        {project.context && (
          <motion.div {...fadeUp(0.35)} className="mb-16">
            <h2 className="text-white font-bold text-xl mb-4">{project.context.title}</h2>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-white/55 text-sm leading-relaxed">{project.context.text}</p>
            </div>
          </motion.div>
        )}

        {/* Next project */}
        {nextProject && (
          <motion.div {...fadeUp(0.35)}>
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
        {selectedImage && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={screenshotAlt(selectedIndex)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label={t.a11y.close}
              autoFocus
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              <Image
                src={selectedImage}
                alt={screenshotAlt(selectedIndex)}
                sizes="95vw"
                placeholder="blur"
                className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
