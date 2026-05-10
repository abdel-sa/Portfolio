export interface ShaderConfig {
  proportion: number;
  softness: number;
  distortion: number;
  swirl: number;
  swirlIterations: number;
  shape: "checks" | "stripes" | "edge";
  shapeScale: number;
  colors: string[];
}

export interface Project {
  slug: string;
  title: string;
  icon: "Star" | "Brain" | "Database" | "Globe" | "TrendingUp" | "Shield";
  description: string;
  tags: string[];
  type: "FH Projekt" | "Eigenes Projekt" | "Freelance" | "Arbeit" | "FH Project" | "Personal Project" | "Work";
  year: string;
  problem: string;
  solution: string;
  solutionLabel?: string;
  features: string[];
  shader: ShaderConfig;
  context?: { title: string; text: string };
  screenshots?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "tos-analyzer",
    title: "ToS Analyzer",
    icon: "Shield" as const,
    description:
      "KI-gestützte Browser Extension die Datenschutzerklärungen und AGB automatisch analysiert und bewertet.",
    tags: [
      "JavaScript",
      "Chrome Extension",
      "Groq",
      "Claude",
      "OpenAI",
      "Manifest V3",
    ],
    type: "Eigenes Projekt",
    year: "2026",
    problem:
      "Niemand liest Datenschutzerklärungen oder AGB – sie sind zu lang, zu juristisch und zu zeitaufwändig. Trotzdem stimmen Millionen Menschen täglich blind zu und geben dabei oft weitreichende Rechte preis.",
    solution:
      "Eine Browser Extension die per Knopfdruck den Text der aktuellen Seite extrahiert, via flexibler API-Anbindung (Groq, Claude oder OpenAI) analysiert und strukturiert zurückgibt – mit Ampel-Score (A–E), kategorisierten Warnungen und Inline-Highlighting kritischer Klauseln direkt im Original-Text.",
    features: [
      "On-Demand Analyse per Klick (kein Auto-Scan)",
      "Ampel-Score A–E für den Gesamtdienst",
      "Kategorisierte Warnungen (Datenweitergabe, Kündigung, DSGVO etc.)",
      "Inline-Highlighting kritischer Klauseln im Text",
      "DSGVO & EU-Fokus (Deutsch)",
      "Kein eigener Server – direkte API-Kommunikation",
      "Lokale Speicherung via chrome.storage",
      "Kein Tracking, kein Datensammeln",
    ],
    shader: {
      proportion: 0.38,
      softness: 1.1,
      distortion: 0.17,
      swirl: 0.78,
      swirlIterations: 11,
      shape: "stripes",
      shapeScale: 0.1,
      colors: [
        "hsl(220, 80%, 12%)",
        "hsl(210, 90%, 42%)",
        "hsl(215, 85%, 22%)",
        "hsl(205, 95%, 52%)",
      ],
    },
    context: {
      title: "Warum dieses Projekt?",
      text: "ToS;DR ist der bekannteste Ansatz – aber crowd-sourced, veraltet und deckt nur große Dienste ab. ToS Analyzer schließt diese Lücke: on-demand, DSGVO-bewusst, auf Deutsch, für jeden beliebigen Dienst. Die Beta-Version ist zudem bereits erfolgreich im Chrome Extension Webstore gelauncht worden.",
    },
    screenshots: [
      "/Screenshot 2026-05-04 211103.png",
      "/Screenshot 2026-05-04 211134.png",
      "/Screenshot 2026-05-04 211147.png",
      "/Screenshot 2026-05-04 211157.png",
      "/Screenshot 2026-05-04 211217.png",
    ],
  },
  {
    slug: "tradesignal-ai",
    title: "TradeSignal AI",
    icon: "TrendingUp" as const,
    description:
      "Automatischer Trading Bot der Telegram-Signale per KI parsed und Orders in MetaTrader 5 ausführt.",
    tags: ["Python", "Groq API", "LLaMA", "MetaTrader 5", "Telethon"],
    type: "Eigenes Projekt",
    year: "2026",
    problem:
      "Trading-Signale aus Telegram-Kanälen manuell zu kopieren und in MetaTrader 5 einzugeben ist fehleranfällig, zeitintensiv und unmöglich bei mehreren Kanälen gleichzeitig zu skalieren.",
    solution:
      "Ein Python-Bot der via Telethon Telegram-Nachrichten in Echtzeit empfängt, sie mit LLaMA (via Groq API) parst und strukturiert, und dann vollautomatisch Orders mit korrektem SL/TP in MetaTrader 5 platziert.",
    features: [
      "Echtzeit-Monitoring mehrerer Telegram-Kanäle",
      "LLM-basiertes Signal-Parsing (LLaMA via Groq)",
      "Automatische Order-Ausführung in MetaTrader 5",
      "Stop-Loss und Take-Profit Verwaltung",
      "Fehlerbehandlung und Logging-System",
    ],
    shader: {
      proportion: 0.42,
      softness: 1.0,
      distortion: 0.22,
      swirl: 0.85,
      swirlIterations: 13,
      shape: "stripes",
      shapeScale: 0.12,
      colors: [
        "hsl(25, 100%, 32%)",
        "hsl(45, 100%, 62%)",
        "hsl(35, 90%, 38%)",
        "hsl(40, 100%, 68%)",
      ],
    },
    screenshots: ["/tradebot-screenshot-1.png", "/tradebot-screenshot-2.png"],
  },
  {
    slug: "freelance",
    title: "Freelance Web Development",
    icon: "Globe" as const,
    description:
      "3 Kundenprojekte eigenständig von Konzeption bis Deployment umgesetzt.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "Freelance",
    year: "2025 - laufend",
    problem:
      "Kleine Unternehmen und Selbstständige benötigten professionelle Web-Präsenzen, hatten aber kein Budget für Agenturen und keine technischen Kenntnisse zur Eigenumsetzung.",
    solution:
      "3 vollständige Website-Projekte von der ersten Konzeptbesprechung bis zum Live-Deployment – inkl. Design, Entwicklung, Hosting-Setup und Kundeneinweisung. Alle Projekte wurden termingerecht und im Budget geliefert.",
    features: [
      "Kundenberatung und Anforderungsanalyse",
      "Responsive Design für alle Gerätegrößen",
      "Performance-optimierter, barrierefreier Code",
      "Hosting-Setup und Domain-Konfiguration",
      "Kundeneinweisung und Dokumentation",
    ],
    shader: {
      proportion: 0.36,
      softness: 0.95,
      distortion: 0.15,
      swirl: 0.7,
      swirlIterations: 9,
      shape: "checks",
      shapeScale: 0.1,
      colors: [
        "hsl(150, 100%, 18%)",
        "hsl(170, 100%, 52%)",
        "hsl(140, 90%, 28%)",
        "hsl(160, 100%, 62%)",
      ],
    },
    screenshots: [
      "/freelance-final-1.png",
      "/freelance-final-2.png",
      "/freelance-final-3.png",
      "/freelance-final-4.png",
      "/freelance-final-5.png",
      "/freelance-final-6.png",
    ],
  },
  {
    slug: "mrp",
    title: "Media Ratings Platform",
    icon: "Star" as const,
    description:
      "RESTful HTTP Server mit Token-Auth, Rating-System und Content-Recommendations.",
    tags: ["C#", ".NET 8", "PostgreSQL", "Docker"],
    type: "FH Projekt",
    year: "2025",
    problem:
      "Es fehlte eine einheitliche Plattform, auf der Nutzer Medieninhalte bewerten und personalisierte Empfehlungen erhalten können – mit sicherer Authentifizierung und skalierbarer Architektur.",
    solution:
      "Ein RESTful HTTP Server in C#/.NET 8 mit Token-basierter Authentifizierung, einem vollständigen Rating-System und einem Recommendations-Modul, das auf Nutzerpräferenzen basiert. Persistenz via PostgreSQL, Deployment in Docker.",
    features: [
      "Token-basierte Authentifizierung (JWT)",
      "CRUD-API für Medieninhalte und Ratings",
      "Content-Recommendation-Engine",
      "PostgreSQL-Datenbankschema mit Migrationen",
      "Docker-Compose Setup für lokales & Produktiv-Deployment",
    ],
    shader: {
      proportion: 0.35,
      softness: 0.9,
      distortion: 0.16,
      swirl: 0.75,
      swirlIterations: 10,
      shape: "checks",
      shapeScale: 0.09,
      colors: [
        "hsl(240, 100%, 22%)",
        "hsl(270, 100%, 58%)",
        "hsl(250, 90%, 35%)",
        "hsl(265, 100%, 68%)",
      ],
    },
  },
  {
    slug: "moodle-pipeline",
    title: "Moodle pAIpline",
    icon: "Brain" as const,
    description:
      "KI-Pipeline zur automatischen Erstellung von Moodle-Kursen mit mehreren LLMs.",
    tags: ["Python", "Claude API", "ChatGPT", "PHP"],
    type: "FH Projekt",
    year: "2025",
    problem:
      "Die manuelle Erstellung strukturierter Moodle-Kurse ist zeitaufwendig und erfordert pädagogisches Know-how. Lehrende brauchen ein Werkzeug, das diesen Prozess automatisiert und gleichzeitig qualitativ hochwertige Inhalte erzeugt.",
    solution:
      "Eine mehrstufige KI-Pipeline in Python, die Eingabematerial (PDFs, Texte) verarbeitet, mit Claude und ChatGPT Kursstrukturen und Inhalte generiert, und diese via PHP-Skript direkt in Moodle importiert.",
    features: [
      "Multi-LLM-Pipeline (Claude API + ChatGPT)",
      "Automatische Kursstrukturierung aus Rohmaterial",
      "Generierung von Quizfragen und Lernzielen",
      "Direkt-Import in Moodle via PHP",
      "Modulares Pipeline-Design für einfache Erweiterung",
    ],
    shader: {
      proportion: 0.38,
      softness: 1.1,
      distortion: 0.2,
      swirl: 0.9,
      swirlIterations: 12,
      shape: "stripes",
      shapeScale: 0.11,
      colors: [
        "hsl(280, 100%, 28%)",
        "hsl(320, 100%, 58%)",
        "hsl(300, 90%, 38%)",
        "hsl(310, 100%, 68%)",
      ],
    },
  },
  {
    slug: "salesforce-crm",
    title: "Salesforce CRM – Reyada",
    icon: "Database" as const,
    description:
      "Salesforce Administrator – Mitarbeit an einem CRM-Projekt für ein Autohaus.",
    tags: ["Salesforce", "Scrum", "Jira", "Confluence"],
    type: "Arbeit",
    year: "2025",
    problem:
      "Das Autohaus benötigte ein strukturiertes CRM-System zur Verwaltung von Leads und Kaufverträgen.",
    solution:
      "Mitgewirkt bei der Entwicklung von Screen Flows, Verwaltung von User-Berechtigungen in der Sandbox und agiler Zusammenarbeit im Scrum-Team.",
    solutionLabel: "Meine Rolle",
    features: [
      "Screen Flows für Lead-Erstellung und Kaufverträge",
      "User- und Berechtigungsverwaltung",
      "Agile Arbeitsweise mit Jira & Confluence",
      "2-Wochen-Sprints mit Daily Standups",
    ],
    shader: {
      proportion: 0.4,
      softness: 1.2,
      distortion: 0.18,
      swirl: 0.8,
      swirlIterations: 11,
      shape: "stripes",
      shapeScale: 0.1,
      colors: [
        "hsl(210, 100%, 22%)",
        "hsl(190, 100%, 62%)",
        "hsl(200, 90%, 32%)",
        "hsl(195, 100%, 72%)",
      ],
    },
  },
];

export const PROJECTS_EN_TRANSLATIONS: Record<string, Partial<Project>> = {
  "tos-analyzer": {
    description: "AI-powered browser extension that automatically analyzes and scores privacy policies and terms of service.",
    type: "Personal Project",
    problem: "No one reads privacy policies or terms of service – they are too long, too legal, and too time-consuming. Yet millions of people blindly agree every day, often giving away far-reaching rights.",
    solution: "A browser extension that extracts the text of the current page at the push of a button, analyzes it via a flexible API connection (Groq, Claude or OpenAI) and returns it structured – with a traffic light score (A-E), categorized warnings, and inline highlighting of critical clauses directly in the original text.",
    features: [
      "On-demand analysis on click (no auto-scan)",
      "Traffic light score A-E for the entire service",
      "Categorized warnings (data sharing, termination, GDPR, etc.)",
      "Inline highlighting of critical clauses in the text",
      "GDPR & EU focus (German)",
      "No own server – direct API communication",
      "Local storage via chrome.storage",
      "No tracking, no data collection",
    ],
    context: {
      title: "Why this project?",
      text: "ToS;DR is the most well-known approach - but crowd-sourced, outdated, and only covers large services. ToS Analyzer fills this gap: on-demand, GDPR-aware, in German, for any service. The beta version has also already been successfully launched in the Chrome Extension Webstore.",
    },
  },
  "tradesignal-ai": {
    description: "Automatic trading bot that parses Telegram signals via AI and executes orders in MetaTrader 5.",
    type: "Personal Project",
    problem: "Manually copying trading signals from Telegram channels and entering them into MetaTrader 5 is error-prone, time-consuming, and impossible to scale across multiple channels simultaneously.",
    solution: "A Python bot that receives Telegram messages in real-time via Telethon, parses and structures them with LLaMA (via Groq API), and then fully automatically places orders with correct SL/TP in MetaTrader 5.",
    features: [
      "Real-time monitoring of multiple Telegram channels",
      "LLM-based signal parsing (LLaMA via Groq)",
      "Automatic order execution in MetaTrader 5",
      "Stop-loss and take-profit management",
      "Error handling and logging system",
    ],
  },
  "freelance": {
    description: "3 client projects implemented independently from conception to deployment.",
    type: "Freelance",
    problem: "Small businesses and freelancers needed professional web presences but had no budget for agencies and no technical knowledge to implement them themselves.",
    solution: "3 complete website projects from the initial concept meeting to live deployment - incl. design, development, hosting setup, and client briefing. All projects were delivered on time and within budget.",
    features: [
      "Client consultation and requirements analysis",
      "Responsive design for all screen sizes",
      "Performance-optimized, accessible code",
      "Hosting setup and domain configuration",
      "Client briefing and documentation",
    ],
  },
  "mrp": {
    description: "RESTful HTTP Server with token auth, rating system, and content recommendations.",
    type: "FH Project",
    problem: "There was no unified platform where users could rate media content and receive personalized recommendations - with secure authentication and scalable architecture.",
    solution: "A RESTful HTTP Server in C#/.NET 8 with token-based authentication, a full rating system, and a recommendations module based on user preferences. Persistence via PostgreSQL, deployment in Docker.",
    features: [
      "Token-based authentication (JWT)",
      "CRUD API for media content and ratings",
      "Content recommendation engine",
      "PostgreSQL database schema with migrations",
      "Docker-Compose setup for local & production deployment",
    ],
  },
  "moodle-pipeline": {
    description: "AI pipeline for the automatic creation of Moodle courses with multiple LLMs.",
    type: "FH Project",
    problem: "The manual creation of structured Moodle courses is time-consuming and requires pedagogical know-how. Teachers need a tool that automates this process while generating high-quality content.",
    solution: "A multi-stage AI pipeline in Python that processes input material (PDFs, texts), generates course structures and content with Claude and ChatGPT, and imports them directly into Moodle via a PHP script.",
    features: [
      "Multi-LLM pipeline (Claude API + ChatGPT)",
      "Automatic course structuring from raw material",
      "Generation of quiz questions and learning objectives",
      "Direct import into Moodle via PHP",
      "Modular pipeline design for easy expansion",
    ],
  },
  "salesforce-crm": {
    description: "Salesforce Administrator - participation in a CRM project for a car dealership.",
    type: "Work",
    problem: "The car dealership needed a structured CRM system to manage leads and sales contracts.",
    solution: "Contributed to the development of Screen Flows, management of user permissions in the sandbox, and agile collaboration in the Scrum team.",
    solutionLabel: "My Role",
    features: [
      "Screen Flows for lead creation and sales contracts",
      "User and permission management",
      "Agile workflow with Jira & Confluence",
      "2-week sprints with Daily Standups",
    ],
  },
};

export function getProjects(lang: string = "de"): Project[] {
  if (lang === "de") return PROJECTS;
  return PROJECTS.map(p => ({
    ...p,
    ...PROJECTS_EN_TRANSLATIONS[p.slug],
    type: (PROJECTS_EN_TRANSLATIONS[p.slug]?.type as any) || p.type,
  }));
}

export function getProject(slug: string, lang: string = "de"): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string, lang: string = "de"): Project | undefined {
  const projects = getProjects(lang);
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return projects[(idx + 1) % projects.length];
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
