import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Abdelrahman Salama",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#030303] px-4 md:px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Datenschutzerklärung</h1>
        <p className="text-white/35 text-xs mb-8">Gemäß DSGVO (EU) 2016/679 und DSG (Österreich)</p>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">1. Verantwortlicher</h2>
            <p>
              Abdelrahman Salama<br />
              Wien, Österreich<br />
              E-Mail:{" "}
              <a
                href="mailto:rahman.salama78@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                rahman.salama78@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">2. Erhobene Daten</h2>
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
              Es werden keine Cookies gesetzt, keine Tracking-Skripte eingesetzt und keine
              weiteren personenbezogenen Daten automatisch erhoben.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">3. Zweck der Verarbeitung</h2>
            <p>
              Die über das Kontaktformular übermittelten Daten werden ausschließlich zur
              Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet. Eine Weitergabe an
              Dritte erfolgt nicht.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">4. Rechtsgrundlage</h2>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung / vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">5. Speicherdauer</h2>
            <p>
              Ihre Daten werden nur so lange gespeichert, wie es für die Bearbeitung Ihrer
              Anfrage erforderlich ist, bzw. solange gesetzliche Aufbewahrungsfristen bestehen.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">6. E-Mail-Versand via Resend</h2>
            <p>
              Für den technischen Versand von Kontaktanfragen wird der Dienst{" "}
              <span className="text-white/80">Resend</span> (Resend Inc., USA) genutzt. Die
              übermittelten Daten (Name, E-Mail, Nachricht) werden dabei an die Server von
              Resend übertragen. Resend verarbeitet Daten gemäß seiner eigenen{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Datenschutzrichtlinie
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">7. Ihre Rechte</h2>
            <p className="mb-3">Sie haben gemäß DSGVO folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung dieser Rechte wenden Sie sich bitte per E-Mail an{" "}
              <a
                href="mailto:rahman.salama78@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                rahman.salama78@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">8. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, bei der österreichischen Datenschutzbehörde Beschwerde
              einzulegen:
            </p>
            <p className="mt-2">
              Österreichische Datenschutzbehörde<br />
              Barichgasse 40–42, 1030 Wien<br />
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                www.dsb.gv.at
              </a>
            </p>
          </section>

          <p className="text-white/25 text-xs pt-4 border-t border-white/[0.06]">
            Stand: Mai 2026
          </p>
        </div>
      </div>
    </main>
  );
}
