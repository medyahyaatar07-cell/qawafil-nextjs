import type { Metadata } from "next";

import { ASSOCIATION } from "@/lib/association";
import { getContent } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";

/** Ported from pages/templates/pages/about.html + views.about(). */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  return {
    title: `${T.about.title} — ${T.meta.siteTitle}`,
    description: T.about.intro,
    openGraph: { type: "website" },
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);

  return (
    <>
      <section className="section section--dark" style={{ paddingBlock: "70px 60px" }}>
        <div className="container reveal is-visible">
          <span className="eyebrow">{T.about.title}</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, maxWidth: "20ch" }}>{T.about.title}</h1>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="prose reveal" style={{ maxWidth: "76ch" }}>
            <p>{T.about.intro}</p>
            <p>{T.about.body2}</p>
            <p>{T.about.body3}</p>
            <p>{T.about.body4}</p>
          </div>

          <div className="about-cards reveal">
            {T.about.cards.map((card) => (
              <div className="about-card" key={card.label}>
                <span className="label">{card.label}</span>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--c-offwhite)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{T.vision.title}</span>
            <h2>{T.vision.title}</h2>
            <p>{T.vision.text}</p>
          </div>
          <div className="pull-quote reveal">{T.vision.highlight}</div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{T.mission.title}</span>
            <h2>{T.mission.title}</h2>
            <p>{T.mission.text}</p>
          </div>

          <div className="verse-grid reveal">
            {T.mission.verses.map((v) => (
              <div className="verse-card" key={v.source}>
                <p className="verse-text">&quot;{v.text}&quot;</p>
                <p className="verse-source">{v.source}</p>
              </div>
            ))}
          </div>

          <div className="hadith-card reveal">
            <p>&quot;{T.mission.hadith}&quot;</p>
            <p className="source">{T.mission.hadithSource}</p>
          </div>
        </div>
      </section>

      <section className="section chairwoman">
        <div className="container">
          <div className="chairwoman-inner reveal">
            <div>
              <div className="chairwoman-mark" aria-hidden="true">
                ”
              </div>
              <div className="chairwoman-sig">
                {T.chairwoman.signature}
                <span className="role">{ASSOCIATION.nameAr}</span>
              </div>
            </div>
            <div>
              <span className="eyebrow">{T.chairwoman.title}</span>
              <h2 style={{ fontSize: "clamp(1.4rem,2.6vw,1.9rem)", fontWeight: 800, marginBottom: "22px" }}>
                {T.chairwoman.title}
              </h2>
              <div className="prose">
                {T.chairwoman.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
