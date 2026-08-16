"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/components/LanguageProvider";

type Position = { left: number; width: number; opacity: number };

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.18] transition-all duration-200"
    >
      {children}
    </a>
  );
}

const Tab = ({
  children,
  id,
  setPosition,
  onNavigate,
}: {
  children: React.ReactNode;
  id: string;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onNavigate: (id: string) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onClick={() => onNavigate(id)}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs text-white/55 hover:text-white transition-colors duration-150 md:px-5 md:py-2 md:text-sm whitespace-nowrap"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => (
  <motion.li
    animate={position}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className="absolute z-0 h-7 rounded-full bg-white/[0.08] md:h-8"
  />
);

function NavHeader() {
  const { t, language, setLanguage } = useLanguage();
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.home, id: "home" },
    { label: t.nav.about, id: "about" },
    { label: t.nav.skills, id: "skills" },
    { label: t.nav.projects, id: "projekte" },
    { label: t.nav.certificates, id: "zertifikate" },
    { label: t.nav.contact, id: "kontakt" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#030303]/90 backdrop-blur-md border-b border-white/[0.08]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-6">
        {/* Left: AS initials */}
        <button
          onClick={() => scrollTo("home")}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 hover:from-indigo-300 hover:to-violet-300 transition-all duration-200 shrink-0"
        >
          AS
        </button>

        {/* Center: sliding-cursor pill nav */}
        <ul
          className="hidden md:flex relative rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          {NAV_LINKS.map((link) => (
            <Tab key={link.id} id={link.id} setPosition={setPosition} onNavigate={scrollTo}>
              {link.label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>

        {/* Right: social icons + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "de" ? "en" : "de")}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-bold hover:text-white hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-200 uppercase"
              aria-label="Toggle Language"
            >
              {language}
            </button>
            <a
              href="/cv.pdf"
              download
              aria-label="Lebenslauf herunterladen"
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.18] transition-all duration-200"
            >
              <Download className="w-4 h-4" />
            </a>
            <SocialLink href="https://github.com/abdel-sa" label="GitHub">
              <GitHubIcon className="w-4 h-4" />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/abdelrahman-salama-2b5817367" label="LinkedIn">
              <LinkedInIcon className="w-4 h-4" />
            </SocialLink>
          </div>

          <button
            className="md:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-md border-b border-white/[0.08] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-2 pt-1 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setLanguage(language === "de" ? "en" : "de");
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-bold hover:text-white transition-all duration-200 uppercase"
                >
                  {language === "de" ? "Switch to EN" : "Zu DE wechseln"}
                </button>
                <a
                  href="/cv.pdf"
                  download
                  aria-label="Lebenslauf herunterladen"
                  className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.18] transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                </a>
                <SocialLink href="https://github.com/abdel-sa" label="GitHub">
                  <GitHubIcon className="w-4 h-4" />
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/abdelrahman-salama-2b5817367" label="LinkedIn">
                  <LinkedInIcon className="w-4 h-4" />
                </SocialLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavHeader;
