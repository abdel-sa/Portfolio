"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Target,
    FolderOpen,
    GraduationCap,
    Cpu,
} from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import type { BentoItem } from "@/components/ui/bento-grid";
import { useLanguage } from "@/components/LanguageProvider";

const INTEREST_TAGS = [
    "Salesforce",
    "KI / LLMs",
    "Cloud & DevOps",
    "Cybersecurity",
    "Software Development",
];

export default function About() {
    const { t } = useLanguage();

    const ITEMS: BentoItem[] = [
        {
            title: t.about.pathTitle,
            description: t.about.pathDesc,
            icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
            colSpan: 2,
            hasPersistentHover: true,
        },
        {
            title: t.about.focusTitle,
            description: t.about.focusDesc,
            icon: <Target className="w-4 h-4 text-violet-400" />,
            tags: INTEREST_TAGS,
        },
        {
            title: t.about.projects,
            description: "",
            icon: <FolderOpen className="w-4 h-4 text-indigo-400" />,
            stat: "9",
        },
        {
            title: t.about.semester,
            description: "",
            icon: <GraduationCap className="w-4 h-4 text-violet-400" />,
            stat: "4.",
        },
        {
            title: t.about.technologies,
            description: "",
            icon: <Cpu className="w-4 h-4 text-cyan-400" />,
            stat: "10+",
        },
    ];

    return (
        <section id="about" className="relative py-24 bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                    className="text-center mb-12"
                >
                    <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">
                        {t.about.sectionTitle}
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                        {t.about.heading}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                >
                    <BentoGrid items={ITEMS} />
                </motion.div>
            </div>
        </section>
    );
}
