import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getContent, getWorkAreas } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";

/** Ported from pages/templates/pages/work_list.html + views.work_list(). */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  return {
    title: `${T.work.title} — ${T.meta.siteTitle}`,
    description: T.work.subtitle,
    openGraph: { type: "website" },
  };
}

export default function WorkListPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  const workAreas = getWorkAreas(lang);

  return (
    <>
      <section className="section section--dark" style={{ paddingBlock: "70px 60px" }}>
        <div className="container reveal is-visible">
          <span className="eyebrow">{T.work.title}</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, maxWidth: "22ch" }}>{T.work.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.78)", maxWidth: "60ch", marginTop: "16px" }}>{T.work.subtitle}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="work-grid">
            {workAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/${lang}/work/${area.slug}`}
                className={`work-card${area.hasMedia ? " has-media" : ""} reveal`}
              >
                {area.hasMedia ? (
                  <>
                    <div className="media">
                      <Image
                        src={area.image ?? area.imageFallback ?? ""}
                        alt={area.imageAlt}
                        loading="lazy"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="body">
                      <span className="num">{area.number}</span>
                      <h3>{area.title}</h3>
                      <p>{area.summary}</p>
                      <span className="link-row">
                        {T.work.readMore}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="num">{area.number}</span>
                    <h3>{area.title}</h3>
                    <p>{area.summary}</p>
                    <span className="link-row">
                      {T.work.readMore}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="arc" aria-hidden="true" />
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
