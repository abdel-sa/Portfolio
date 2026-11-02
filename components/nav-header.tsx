"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionId } from "@/lib/site";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionLink } from "@/components/SectionLink";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { CvDownload, CvDownloadInline } from "@/components/CvDownload";

type Position = { left: number; width: number; opacity: number };

const ICON_BUTTON =
  "p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.18] transition-all duration-200";

function SocialLinks() {
  return (
    <>
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={ICON_BUTTON}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </>
  );
}

const Tab = ({
  children,
  id,
  setPosition,
}: {
  children: React.ReactNode;
  id: SectionId;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const moveCursor = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
  };
  return (
    <li ref={ref} onMouseEnter={moveCursor} onFocus={moveCursor} className="relative z-10 block">
      <SectionLink
        id={id}
        className="block cursor-pointer px-4 py-1.5 text-xs text-white/55 hover:text-white focus-visible:text-white focus-visible:outline-none transition-colors duration-150 md:px-5 md:py-2 md:text-sm whitespace-nowrap"
      >
        {children}
      </SectionLink>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => (
  <motion.li
    aria-hidden="true"
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === "de" ? "en" : "de");
  const closeMenu = () => setMobileOpen(false);

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
        <SectionLink
          id="home"
          onNavigate={closeMenu}
          ariaLabel={t.a11y.backToTop}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 hover:from-indigo-300 hover:to-violet-300 transition-all duration-200 shrink-0"
        >
          AS
        </SectionLink>

        {/* Center: sliding-cursor pill nav */}
        <nav className="hidden md:block">
          <ul
            className="flex relative rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
            onBlur={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          >
            {SECTIONS.map(({ id, navKey }) => (
              <Tab key={id} id={id} setPosition={setPosition}>
                {t.nav[navKey]}
              </Tab>
            ))}
            <Cursor position={position} />
          </ul>
        </nav>

        {/* Right: social icons + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-bold hover:text-white hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-200 uppercase"
              aria-label={t.a11y.switchLanguage}
            >
              {language}
            </button>
            <CvDownload triggerClassName={ICON_BUTTON}>
              <Download className="w-4 h-4" />
            </CvDownload>
            <SocialLinks />
          </div>

          <button
            className="md:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-md border-b border-white/[0.08] overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {SECTIONS.map(({ id, navKey }) => (
                <SectionLink
                  key={id}
                  id={id}
                  onNavigate={closeMenu}
                  className="text-left text-white/60 hover:text-white transition-colors text-sm"
                >
                  {t.nav[navKey]}
                </SectionLink>
              ))}
              <div className="pt-3 border-t border-white/[0.06]">
                <CvDownloadInline />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toggleLanguage();
                    closeMenu();
                  }}
                  className="flex items-center justify-center px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-bold hover:text-white transition-all duration-200 uppercase"
                >
                  {language === "de" ? "Switch to EN" : "Zu DE wechseln"}
                </button>
                <SocialLinks />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavHeader;
