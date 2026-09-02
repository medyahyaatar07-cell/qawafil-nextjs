import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LANGS, isLang, dirFor, type Lang } from "@/lib/i18n";
import { getContent, getWorkArea, WORK_AREAS } from "@/lib/content";

/**
 * Ported from pages/templates/pages/work_detail.html + views.work_detail().
 * Django resolved the slug at request time and raised Http404 for an
 * unknown one; here generateStaticParams() pre-renders every known
 * (lang, slug) pair at build time, and notFound() covers any other slug
 * a visitor might still hit (a stale link, a typo).
 */
export function generateStaticParams() {
  return LANGS.flatMap((lang) => WORK_AREAS.map((area) => ({ lang, slug: area.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const area = getWorkArea(lang, params.slug);
  if (!area) return {};

  const T = getContent(lang);
  return {
    title: `${area.title} — ${T.meta.siteTitle}`,
    description: area.summary,
    openGraph: {
      type: "article",
      images: area.image ? [area.image] : undefined,
    },
  };
}

export default function WorkDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const dir = dirFor(lang);
  const area = getWorkArea(lang, params.slug);
  if (!area) notFound();

  const T = getContent(lang);

  return (
    <>
      <section className="detail-hero">
        <div className="container reveal is-visible">
          <Link
            href={`/${lang}/work`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              fontSize: "0.9rem",
              marginBottom: "18px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              style={dir === "rtl" ? { transform: "scaleX(-1)" } : undefined}
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            {T.work.backToList}
          </Link>
          <span className="num">{area.number} / 07</span>
          <h1>{area.title}</h1>
        </div>
      </section>

      <div className="container">
        {area.hasMedia && (
          <div className="detail-media reveal is-visible">
            <Image
              src={area.image ?? area.imageFallback ?? ""}
              alt={area.imageAlt}
              loading="eager"
              width={960}
              height={540}
            />
          </div>
        )}

        <div className="section--tight">
          <div className="detail-body reveal">
            <p>{area.body}</p>
          </div>

          {!area.hasMedia && <p className="no-media-note reveal">{T.work.noMediaNote}</p>}
        </div>
      </div>

      <section className="section section--soft" style={{ paddingBlock: "0 84px" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{T.work.title}</span>
            <h2>{T.work.title}</h2>
          </div>
          <div className="hero-ctas reveal">
            <Link href={`/${lang}/work`} className="btn btn-dark-outline">
              {T.work.backToList}
            </Link>
            <Link href={`/${lang}/donate`} className="btn btn-primary">
              {T.nav.ctaDonate}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
