import type { Metadata } from "next";
import { LegalPage, LEGAL_LINK, type LegalSection } from "@/components/LegalPage";
import { getLanguage } from "@/lib/i18n-server";
import { SITE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage();
  return { title: `${language === "en" ? "Legal Notice" : "Impressum"} – ${SITE.name}` };
}

const emailLink = (
  <a href={`mailto:${SITE.email}`} className={LEGAL_LINK}>
    {SITE.email}
  </a>
);

const CONTENT: Record<"de" | "en", { back: string; title: string; note?: string; sections: LegalSection[] }> = {
  de: {
    back: "Zurück",
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß § 5 ECG",
        content: (
          <>
            <p>{SITE.name}</p>
            <p>Wien, Österreich</p>
          </>
        ),
      },
      { heading: "Kontakt", content: <p>E-Mail: {emailLink}</p> },
      {
        heading: "Zweck der Website",
        content: (
          <p>
            Diese Website dient ausschließlich der persönlichen Präsentation (Portfolio) und
            wird nicht zu gewerblichen Zwecken betrieben.
          </p>
        ),
      },
      {
        heading: "Haftungsausschluss",
        content: (
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die
            Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
            deren Betreiber verantwortlich.
          </p>
        ),
      },
      {
        heading: "Urheberrecht",
        content: (
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website
            unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
            bedürfen der schriftlichen Zustimmung des Autors.
          </p>
        ),
      },
    ],
  },
  en: {
    back: "Back",
    title: "Legal Notice",
    note: "This is a translation for convenience. Only the German version is legally binding.",
    sections: [
      {
        heading: "Information pursuant to § 5 ECG (Austrian E-Commerce Act)",
        content: (
          <>
            <p>{SITE.name}</p>
            <p>Vienna, Austria</p>
          </>
        ),
      },
      { heading: "Contact", content: <p>Email: {emailLink}</p> },
      {
        heading: "Purpose of this website",
        content: (
          <p>
            This website serves exclusively as a personal presentation (portfolio) and is not
            operated for commercial purposes.
          </p>
        ),
      },
      {
        heading: "Disclaimer",
        content: (
          <p>
            Despite careful review, I accept no liability for the content of external links.
            The operators of linked pages are solely responsible for their content.
          </p>
        ),
      },
      {
        heading: "Copyright",
        content: (
          <p>
            The content and works created by the site operator are subject to Austrian
            copyright law. Any reproduction, editing, distribution or other use beyond the
            limits of copyright law requires the author&apos;s written consent.
          </p>
        ),
      },
    ],
  },
};

export default async function Impressum() {
  const c = CONTENT[await getLanguage()];
  return <LegalPage backLabel={c.back} title={c.title} note={c.note} sections={c.sections} />;
}
