import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export const LEGAL_LINK = "text-indigo-400 hover:text-indigo-300 transition-colors";

export type LegalSection = { heading: string; content: ReactNode };

export function LegalPage({
  backLabel,
  title,
  subtitle,
  note,
  sections,
  footer,
}: {
  backLabel: string;
  title: string;
  subtitle?: string;
  note?: string;
  sections: LegalSection[];
  footer?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#030303] px-4 md:px-6 pt-28 pb-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>

        <h1 className={`text-3xl font-bold text-white ${subtitle ? "mb-2" : "mb-8"}`}>{title}</h1>
        {subtitle && <p className="text-white/35 text-xs mb-8">{subtitle}</p>}
        {note && (
          <p className="mb-8 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/45 text-xs">
            {note}
          </p>
        )}

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-white font-semibold text-base mb-3">{section.heading}</h2>
              {section.content}
            </section>
          ))}
          {footer}
        </div>
      </div>
    </main>
  );
}
