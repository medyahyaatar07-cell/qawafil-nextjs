import type { Metadata } from "next";
import Link from "next/link";

import { getContent } from "@/lib/content";
import { safeLang } from "@/lib/i18n";

/**
 * Ported from pages/templates/pages/404.html + views.handler404. Next.js
 * renders this automatically for any unmatched route under /[lang]/..., and
 * whenever a page explicitly calls notFound() (e.g. an unknown work-area
 * slug in work/[slug]/page.tsx).
 *
 * Note: this file cannot read the dynamic [lang] route param directly (the
 * not-found boundary doesn't receive route params), so we can't know for
 * certain which language the visitor was on. We fall back to Arabic, same
 * default as the rest of the app — this mirrors the `_lang()` safe-fallback
 * helper from the original views.py.
 */
export const metadata: Metadata = {
  title: getContent("ar").notFound.title,
};

export default function NotFound() {
  const lang = safeLang(undefined);
  const T = getContent(lang);

  return (
    <div className="error-page">
      <span className="code" aria-hidden="true">
        404
      </span>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "10px" }}>{T.notFound.title}</h1>
      <p style={{ color: "var(--c-gray)", maxWidth: "50ch", marginTop: "12px" }}>{T.notFound.text}</p>
      <Link href={`/${lang}`} className="btn btn-primary" style={{ marginTop: "26px" }}>
        {T.notFound.back}
      </Link>
    </div>
  );
}
