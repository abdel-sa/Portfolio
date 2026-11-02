"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionLink } from "@/components/SectionLink";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { SECTIONS, SITE } from "@/lib/site";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#030303] border-t border-white/[0.08]">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                            AS
                        </span>
                        <p className="text-white/35 text-sm text-center md:text-left">
                            {t.footer.slogan}
                        </p>
                    </div>

                    {/* Nav */}
                    <nav>
                        <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                            {SECTIONS.map(({ id, navKey }) => (
                                <li key={id}>
                                    <SectionLink
                                        id={id}
                                        className="text-sm text-white/40 hover:text-white transition-colors"
                                    >
                                        {t.nav[navKey]}
                                    </SectionLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social */}
                    <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map(({ label, Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.16] transition-all duration-200"
                            >
                                <Icon className="w-4 h-4 text-current" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col items-center gap-3">
                    <p className="text-white/25 text-xs">
                        © {new Date().getFullYear()} {SITE.name}. {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/impressum" className="text-white/25 text-xs hover:text-white/50 transition-colors">
                            {t.footer.impressum}
                        </Link>
                        <span className="text-white/15 text-xs">·</span>
                        <Link href="/datenschutz" className="text-white/25 text-xs hover:text-white/50 transition-colors">
                            {t.footer.datenschutz}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
