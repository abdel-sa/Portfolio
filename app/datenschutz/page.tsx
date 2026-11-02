import type { Metadata } from "next";
import { LegalPage, LEGAL_LINK, type LegalSection } from "@/components/LegalPage";
import { getLanguage } from "@/lib/i18n-server";
import { LANGUAGE_COOKIE } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage();
  return { title: `${language === "en" ? "Privacy Policy" : "Datenschutz"} – ${SITE.name}` };
}

const emailLink = (
  <a href={`mailto:${SITE.email}`} className={LEGAL_LINK}>
    {SITE.email}
  </a>
);

const resendLink = (label: string) => (
  <a
    href="https://resend.com/legal/privacy-policy"
    target="_blank"
    rel="noopener noreferrer"
    className={LEGAL_LINK}
  >
    {label}
  </a>
);

const dsbLink = (
  <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className={LEGAL_LINK}>
    www.dsb.gv.at
  </a>
);

const cookieName = <code className="text-white/80">{LANGUAGE_COOKIE}</code>;

const CONTENT: Record<
  "de" | "en",
  { back: string; title: string; subtitle: string; note?: string; updated: string; sections: LegalSection[] }
> = {
  de: {
    back: "Zurück",
    title: "Datenschutzerklärung",
    subtitle: "Gemäß DSGVO (EU) 2016/679 und DSG (Österreich)",
    updated: "Stand: November 2026",
    sections: [
      {
        heading: "1. Verantwortlicher",
        content: (
          <p>
            {SITE.name}
            <br />
            Wien, Österreich
            <br />
            E-Mail: {emailLink}
          </p>
        ),
      },
      {
        heading: "2. Erhobene Daten",
        content: (
          <>
            <p className="mb-3">
              Diese Website erhebt nur jene Daten, die Sie freiwillig über das Kontaktformular
              übermitteln:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Ihr Name</li>
              <li>Ihre E-Mail-Adresse</li>
              <li>Der Inhalt Ihrer Nachricht</li>
            </ul>
            <p className="mt-3">
              Es werden keine Tracking- oder Analyse-Skripte eingesetzt und keine weiteren
              personenbezogenen Daten automatisch erhoben.
            </p>
          </>
        ),
      },
      {
        heading: "3. Cookies",
        content: (
          <p>
            Diese Website setzt ausschließlich ein technisch notwendiges Cookie ({cookieName}),
            und zwar nur dann, wenn Sie die Sprache der Website umschalten. Es speichert
            lediglich die gewählte Sprache (Deutsch oder Englisch), enthält keine
            personenbezogenen Daten, wird nicht für Tracking verwendet und läuft nach 12 Monaten
            ab. Rechtsgrundlage ist § 165 Abs. 3 TKG 2021 bzw. Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Bereitstellung der gewünschten Sprache).
          </p>
        ),
      },
      {
        heading: "4. Zweck der Verarbeitung",
        content: (
          <p>
            Die über das Kontaktformular übermittelten Daten werden ausschließlich zur
            Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet. Eine Weitergabe an
            Dritte erfolgt nicht, abgesehen vom technischen E-Mail-Versand (siehe Punkt 7).
          </p>
        ),
      },
      {
        heading: "5. Rechtsgrundlage",
        content: (
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung / vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Beantwortung von Anfragen).
          </p>
        ),
      },
      {
        heading: "6. Speicherdauer",
        content: (
          <p>
            Ihre Daten werden nur so lange gespeichert, wie es für die Bearbeitung Ihrer
            Anfrage erforderlich ist, bzw. solange gesetzliche Aufbewahrungsfristen bestehen.
          </p>
        ),
      },
      {
        heading: "7. E-Mail-Versand via Resend",
        content: (
          <p>
            Für den technischen Versand von Kontaktanfragen wird der Dienst{" "}
            <span className="text-white/80">Resend</span> (Resend Inc., USA) genutzt. Die
            übermittelten Daten (Name, E-Mail, Nachricht) werden dabei an die Server von
            Resend übertragen. Resend verarbeitet Daten gemäß seiner eigenen{" "}
            {resendLink("Datenschutzrichtlinie")}.
          </p>
        ),
      },
      {
        heading: "8. Ihre Rechte",
        content: (
          <>
            <p className="mb-3">Sie haben gemäß DSGVO folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-3">Zur Ausübung dieser Rechte wenden Sie sich bitte per E-Mail an {emailLink}.</p>
          </>
        ),
      },
      {
        heading: "9. Beschwerderecht",
        content: (
          <>
            <p>
              Sie haben das Recht, bei der österreichischen Datenschutzbehörde Beschwerde
              einzulegen:
            </p>
            <p className="mt-2">
              Österreichische Datenschutzbehörde
              <br />
              Barichgasse 40–42, 1030 Wien
              <br />
              {dsbLink}
            </p>
          </>
        ),
      },
    ],
  },
  en: {
    back: "Back",
    title: "Privacy Policy",
    subtitle: "Pursuant to GDPR (EU) 2016/679 and the Austrian Data Protection Act (DSG)",
    note: "This is a translation for convenience. Only the German version is legally binding.",
    updated: "Last updated: November 2026",
    sections: [
      {
        heading: "1. Controller",
        content: (
          <p>
            {SITE.name}
            <br />
            Vienna, Austria
            <br />
            Email: {emailLink}
          </p>
        ),
      },
      {
        heading: "2. Data collected",
        content: (
          <>
            <p className="mb-3">
              This website only collects the data you voluntarily submit via the contact form:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>The content of your message</li>
            </ul>
            <p className="mt-3">
              No tracking or analytics scripts are used and no other personal data is collected
              automatically.
            </p>
          </>
        ),
      },
      {
        heading: "3. Cookies",
        content: (
          <p>
            This website only sets one strictly necessary cookie ({cookieName}), and only when
            you switch the site language. It stores nothing but the selected language (German or
            English), contains no personal data, is not used for tracking and expires after 12
            months. The legal basis is § 165 (3) TKG 2021 and Art. 6 (1) (f) GDPR (legitimate
            interest in providing the requested language).
          </p>
        ),
      },
      {
        heading: "4. Purpose of processing",
        content: (
          <p>
            Data submitted via the contact form is used exclusively to handle your request and
            to get in touch with you. It is not passed on to third parties, except for the
            technical email delivery (see section 7).
          </p>
        ),
      },
      {
        heading: "5. Legal basis",
        content: (
          <p>
            Processing is based on Art. 6 (1) (b) GDPR (pre-contractual measures) and Art. 6
            (1) (f) GDPR (legitimate interest in responding to enquiries).
          </p>
        ),
      },
      {
        heading: "6. Retention period",
        content: (
          <p>
            Your data is only stored for as long as necessary to handle your request, or for as
            long as statutory retention periods apply.
          </p>
        ),
      },
      {
        heading: "7. Email delivery via Resend",
        content: (
          <p>
            Contact requests are delivered using the service{" "}
            <span className="text-white/80">Resend</span> (Resend Inc., USA). The submitted
            data (name, email, message) is transferred to Resend&apos;s servers. Resend
            processes data in accordance with its own {resendLink("privacy policy")}.
          </p>
        ),
      },
      {
        heading: "8. Your rights",
        content: (
          <>
            <p className="mb-3">Under the GDPR you have the following rights:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Right of access (Art. 15 GDPR)</li>
              <li>Right to rectification (Art. 16 GDPR)</li>
              <li>Right to erasure (Art. 17 GDPR)</li>
              <li>Right to restriction of processing (Art. 18 GDPR)</li>
              <li>Right to data portability (Art. 20 GDPR)</li>
              <li>Right to object (Art. 21 GDPR)</li>
            </ul>
            <p className="mt-3">To exercise these rights, please contact me by email at {emailLink}.</p>
          </>
        ),
      },
      {
        heading: "9. Right to lodge a complaint",
        content: (
          <>
            <p>You have the right to lodge a complaint with the Austrian Data Protection Authority:</p>
            <p className="mt-2">
              Österreichische Datenschutzbehörde
              <br />
              Barichgasse 40–42, 1030 Vienna
              <br />
              {dsbLink}
            </p>
          </>
        ),
      },
    ],
  },
};

export default async function Datenschutz() {
  const c = CONTENT[await getLanguage()];
  return (
    <LegalPage
      backLabel={c.back}
      title={c.title}
      subtitle={c.subtitle}
      note={c.note}
      sections={c.sections}
      footer={
        <p className="text-white/25 text-xs pt-4 border-t border-white/[0.06]">{c.updated}</p>
      }
    />
  );
}
