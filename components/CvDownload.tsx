"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

const LANGUAGE_NAMES: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
};

/** Aktuelle Seitensprache zuerst */
function useCvOptions() {
  const { language } = useLanguage();
  const order: Language[] = language === "de" ? ["de", "en"] : ["en", "de"];
  return order.map((lang) => ({ lang, label: LANGUAGE_NAMES[lang], ...SITE.cv[lang] }));
}

/**
 * Download-Button, der ein kleines Menü öffnet: Lebenslauf auf Deutsch oder Englisch.
 */
export function CvDownload({
  triggerClassName,
  children,
  side = "bottom",
  align = "end",
}: {
  triggerClassName: string;
  children: ReactNode;
  side?: "top" | "bottom";
  align?: "end" | "center";
}) {
  const { t } = useLanguage();
  const options = useCvOptions();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.a11y.downloadCV}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={triggerClassName}
      >
        {children}
      </button>

      <div
        className={cn(
          "absolute z-50",
          side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
          align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              role="menu"
              initial={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-56 p-1.5 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/[0.10] shadow-xl shadow-black/40 text-left"
            >
              <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                {t.a11y.downloadCV}
              </p>
              {options.map(({ lang, label, url, fileName }) => (
                <a
                  key={lang}
                  href={url}
                  download={fileName}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:text-white focus-visible:outline-none transition-colors"
                >
                  <Download className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="flex-1">{label}</span>
                  <span className="text-[10px] font-semibold tracking-wider text-white/30">PDF</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Variante ohne Popover (z. B. im Mobile-Menü, das overflow-hidden ist):
 * beide Sprachen direkt als Buttons.
 */
export function CvDownloadInline() {
  const { t } = useLanguage();
  const options = useCvOptions();

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-white/40 text-xs mr-1">
        <Download className="w-3.5 h-3.5" />
        {t.hero.downloadCV}
      </span>
      {options.map(({ lang, label, url, fileName }) => (
        <a
          key={lang}
          href={url}
          download={fileName}
          aria-label={`${t.a11y.downloadCV}: ${label}`}
          className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-semibold hover:text-white hover:border-white/[0.18] transition-all duration-200"
        >
          {label}
        </a>
      ))}
    </div>
  );
}
