export const SITE = {
  name: "Abdelrahman Salama",
  email: "rahman.salama78@gmail.com",
  cv: {
    de: { url: "/cv-de.pdf", fileName: "Lebenslauf_Abdelrahman_Salama.pdf" },
    en: { url: "/cv-en.pdf", fileName: "CV_Abdelrahman_Salama.pdf" },
  },
  github: "https://github.com/abdel-sa",
  linkedin: "https://linkedin.com/in/abdelrahman-salama-2b5817367",
  // Studienbeginn FH Technikum Wien (Wintersemester 2024/25)
  studyStart: { year: 2024, month: 9 },
} as const;

export type SectionId = "home" | "about" | "skills" | "projekte" | "zertifikate" | "kontakt";

export const SECTIONS: { id: SectionId; navKey: "home" | "about" | "skills" | "projects" | "certificates" | "contact" }[] = [
  { id: "home", navKey: "home" },
  { id: "about", navKey: "about" },
  { id: "skills", navKey: "skills" },
  { id: "projekte", navKey: "projects" },
  { id: "zertifikate", navKey: "certificates" },
  { id: "kontakt", navKey: "contact" },
];

/**
 * Laufendes Semester. Wintersemester beginnt im September, Sommersemester im Februar.
 */
export function getCurrentSemester(now: Date = new Date()): number {
  const semesterKey = (year: number, month: number) =>
    year * 2 + (month >= 9 ? 1 : month >= 2 ? 0 : -1);

  const start = semesterKey(SITE.studyStart.year, SITE.studyStart.month);
  const current = semesterKey(now.getFullYear(), now.getMonth() + 1);
  return Math.max(1, current - start + 1);
}
