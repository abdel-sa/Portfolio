import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, type Language } from "@/lib/i18n";

export async function getLanguage(): Promise<Language> {
  const value = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return value === "en" ? "en" : "de";
}
