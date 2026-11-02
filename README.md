# Portfolio – Abdelrahman Salama

Meine persönliche Portfolio-Website: Projekte, Skills, Zertifikate und Kontaktformular, auf Deutsch und Englisch.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion für Animationen
- [@paper-design/shaders-react](https://github.com/paper-design/shaders) für die animierten Hintergründe
- [Resend](https://resend.com) für den Versand des Kontaktformulars

## Lokal starten

```bash
npm install
npm run dev
```

Danach läuft die Seite auf [http://localhost:3000](http://localhost:3000).

### Umgebungsvariablen

Für das Kontaktformular wird eine `.env.local` gebraucht:

```bash
RESEND_API_KEY=re_...
```

Ohne Key funktioniert alles außer dem Versenden von Nachrichten.

## Scripts

| Befehl          | Beschreibung              |
| --------------- | ------------------------- |
| `npm run dev`   | Entwicklungsserver        |
| `npm run build` | Produktions-Build         |
| `npm run start` | Produktions-Build starten |
| `npm run lint`  | ESLint                    |

## Struktur

```
app/                  Seiten und API-Route (/api/contact)
components/           Abschnitte der Startseite und Detailseiten
components/ui/        Wiederverwendbare UI-Bausteine
lib/site.ts           Zentrale Daten: Name, E-Mail, Social Links, Navigation
lib/i18n.ts           Übersetzungen (DE/EN)
lib/projects.ts       Projekte inkl. englischer Übersetzung
lib/certificates.ts   Zertifikate inkl. englischer Übersetzung
assets/screenshots/   Projekt-Screenshots (werden über next/image optimiert)
public/               CV und Zertifikats-PDFs
```

## Inhalte pflegen

- **Neues Projekt:** Eintrag in `PROJECTS` in `lib/projects.ts` anlegen, englische Texte in `PROJECTS_EN_TRANSLATIONS` ergänzen. Screenshots nach `assets/screenshots/` legen und oben in der Datei importieren.
- **Neues Zertifikat:** Eintrag in `lib/certificates.ts`, PDF nach `public/certificates/`.
- **Lebenslauf:** `public/cv.pdf` ersetzen.

Die Sprache wird in einem Cookie gespeichert, damit die Seite direkt vom Server in der richtigen Sprache ausgeliefert wird.
