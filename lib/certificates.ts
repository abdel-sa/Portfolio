import type { ShaderConfig } from "@/lib/projects";

export interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  icon: "ShieldCheck" | "Award";
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  fileUrl?: string;
  shader: ShaderConfig;
}

export const CERTIFICATES: Certificate[] = [
  {
    slug: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    icon: "ShieldCheck" as const,
    date: "Juli 2026",
    description:
      "Einführender Kurs der Cisco Networking Academy zu den Grundlagen der Cybersecurity – von aktuellen Bedrohungen und Angriffsarten bis zu Datenschutz und grundlegenden Verteidigungskonzepten.",
    skills: [
      "Bedrohungen & Angriffsarten",
      "Grundlagen Netzwerksicherheit",
      "Datenschutz & Datensicherheit",
      "Sicherheitskonzepte & Best Practices",
    ],
    credentialId: "e793bb78-3b85-44fe-9e6d-57c96033e40e",
    fileUrl: "/certificates/cisco-introduction-to-cybersecurity.pdf",
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
  },
  {
    slug: "ebcl",
    title: "European Business Competence* Licence (EBC*L)",
    issuer: "EBC*L International",
    icon: "Award" as const,
    date: "Februar – Mai 2025",
    description:
      "Zertifizierung in kaufmännischem Grundlagenwissen – Rechnungswesen, betriebswirtschaftliche Kennzahlen und Unternehmensführung.",
    skills: [
      "Rechnungswesen & Bilanzierung",
      "Kennzahlenanalyse & Unternehmenserfolg",
      "Unternehmensziele & -führung",
      "Kosten- und Finanzmanagement",
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
  },
];

export const CERTIFICATES_EN_TRANSLATIONS: Record<string, Partial<Certificate>> = {
  "cisco-cybersecurity": {
    date: "July 2026",
    description:
      "Introductory course by Cisco Networking Academy covering cybersecurity fundamentals – from current threats and attack types to data privacy and basic defense concepts.",
    skills: [
      "Threats & attack types",
      "Network security fundamentals",
      "Data privacy & data security",
      "Security concepts & best practices",
    ],
  },
  ebcl: {
    date: "February – May 2025",
    description:
      "Certification in fundamental business knowledge – accounting, key business metrics, and company management.",
    skills: [
      "Accounting & financial statements",
      "Key metrics & business performance",
      "Business goals & management",
      "Cost and financial management",
    ],
  },
};

export function getCertificates(lang: string = "de"): Certificate[] {
  if (lang === "de") return CERTIFICATES;
  return CERTIFICATES.map((c) => ({
    ...c,
    ...CERTIFICATES_EN_TRANSLATIONS[c.slug],
  }));
}

export function getCertificate(slug: string, lang: string = "de"): Certificate | undefined {
  return getCertificates(lang).find((c) => c.slug === slug);
}

export function getAdjacentCertificate(slug: string, lang: string = "de"): Certificate | undefined {
  const certificates = getCertificates(lang);
  const idx = certificates.findIndex((c) => c.slug === slug);
  if (idx === -1) return undefined;
  return certificates[(idx + 1) % certificates.length];
}

export function getAllCertificateSlugs(): string[] {
  return CERTIFICATES.map((c) => c.slug);
}
