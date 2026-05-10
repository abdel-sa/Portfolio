import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Abdelrahman Salama",
};

export default function Impressum() {
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

        <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Angaben gemäß § 5 ECG</h2>
            <p>Abdelrahman Salama</p>
            <p>Wien, Österreich</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Kontakt</h2>
            <p>
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
            <h2 className="text-white font-semibold text-base mb-3">Zweck der Website</h2>
            <p>
              Diese Website dient ausschließlich der persönlichen Präsentation (Portfolio) und
              wird nicht zu gewerblichen Zwecken betrieben.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die
              Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
              deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website
              unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
              bedürfen der schriftlichen Zustimmung des Autors.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
