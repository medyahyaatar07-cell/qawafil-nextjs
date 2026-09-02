/**
 * Official association info — single source of truth used across templates
 * and SEO metadata. Ported verbatim from qawafil/settings.py's ASSOCIATION
 * dict.
 */
export const ASSOCIATION = {
  nameAr: "جمعية قوافل الخير",
  nameFr: "Association Qawafil Al Khair",
  phone: "+222 34330001",
  phoneDisplay: "34 33 00 01",
  whatsappNumber: "22234330001", // international format, no + or spaces, for wa.me links
  email: "kawafilalkhair07@gmail.com",
  facebookUrl: "https://www.facebook.com/share/18SeC4YKWb/",
  addressAr: "تيارت – المقاطعة الشمالية – موريتانيا",
  addressFr: "Teyarett – Moughataa du Nord – Mauritanie",
  hqAr: "نواكشوط",
  hqFr: "Nouakchott",
} as const;
