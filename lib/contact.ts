/** Gemeinsame Limits für Kontaktformular (Client) und API-Route (Server). */
export const CONTACT_LIMITS = {
  name: 100,
  email: 200,
  message: 5000,
} as const;

/** Formulare, die schneller als das abgeschickt werden, stammen fast sicher von Bots. */
export const MIN_FILL_TIME_MS = 3000;
