"use client";

import { motion } from "framer-motion";
import { Globe, Terminal, Database, Cloud, Languages } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useLanguage } from "@/components/LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();

  const ORBITAL_DATA = [
    {
      id: 1,
      title: t.skills.orbital.frontend.title,
      date: "",
      content: "HTML/CSS, JavaScript, React, TypeScript",
      category: "frontend",
      icon: Globe,
      relatedIds: [2, 5],
      status: "completed" as const,
      energy: 85,
      skills: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
    },
    {
      id: 2,
      title: t.skills.orbital.backend.title,
      date: "",
      content: "C#/.NET, Python, PHP, SQL, PostgreSQL",
      category: "backend",
      icon: Terminal,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 75,
      skills: ["C#/.NET", "Python", "PHP", "SQL", "PostgreSQL"],
    },
    {
      id: 3,
      title: t.skills.orbital.crm.title,
      date: "",
      content: "Salesforce, Jira, Confluence, Git",
      category: "crm",
      icon: Database,
      relatedIds: [4, 2],
      status: "completed" as const,
      energy: 80,
      skills: ["Salesforce", "Jira", "Confluence", "Git"],
    },
    {
      id: 4,
      title: t.skills.orbital.devops.title,
      date: "",
      content: "Docker, Azure, GitHub",
      category: "devops",
      icon: Cloud,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 65,
      skills: ["Docker", "Azure", "GitHub"],
    },
    {
      id: 5,
      title: t.skills.orbital.languages.title,
      date: "",
      content: t.skills.orbital.languages.content,
      category: "languages",
      icon: Languages,
      relatedIds: [1],
      status: "completed" as const,
      energy: 90,
      skills: t.skills.orbital.languages.skills,
    },
  ];

  return (
    <section id="skills" className="relative py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-4"
        >
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">
            {t.skills.sectionTitle}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            {t.skills.heading}
          </h2>
          <p className="mt-3 text-white/35 text-sm">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Orbital visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <RadialOrbitalTimeline timelineData={ORBITAL_DATA} centerLabel="AS" />
        </motion.div>

      </div>
    </section>
  );
}
