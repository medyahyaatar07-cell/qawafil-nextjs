/**
 * Locale plumbing shared across the app. There are only two supported
 * languages (Arabic and French — no English), matching the Django project's
 * settings.LANGUAGES exactly.
 */
export const LANGS = ["ar", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "ar";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Safe fallback, mirroring pages/views.py's `_lang()` helper. */
export function safeLang(value: string | undefined | null): Lang {
  if (value && isLang(value)) return value;
  return DEFAULT_LANG;
}

export function dirFor(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function otherLang(lang: Lang): Lang {
  return lang === "ar" ? "fr" : "ar";
}
