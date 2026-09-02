import type { Metadata } from "next";
import Image from "next/image";

import { ASSOCIATION } from "@/lib/association";
import { getContent } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";

/** Ported from pages/templates/pages/donate.html + views.donate(). */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  return {
    title: `${T.donate.title} — ${T.meta.siteTitle}`,
    description: T.donate.text.split("\n")[0],
    openGraph: { type: "website" },
  };
}

export default function DonatePage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);

  return (
    <>
      <section className="section section--dark" style={{ paddingBlock: "70px 60px" }}>
        <div className="container reveal is-visible">
          <span className="eyebrow">{T.nav.donate}</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, maxWidth: "20ch" }}>{T.donate.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "60ch", marginTop: "16px", whiteSpace: "pre-line" }}>
            {T.donate.text}
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <h2>{T.donate.methodsTitle}</h2>
          </div>

          {/* الشعارات الرسمية الأصلية لتطبيقات Bankily وMasrivi وSedad كما زوّدتنا بها
              الجمعية — دون أي إعادة رسم أو تغيير ألوان، وغير قابلة للنقر (عرض بصري فقط). */}
          <div className="donate-methods reveal" role="list" aria-label={T.donate.methodsTitle}>
            <div className="method-card method-card--dark" role="listitem">
              <span className="logo-frame">
                <Image src="/images/icon-bankily.webp" alt="Bankily" width={120} height={60} />
              </span>
              <span className="visual-tag">{T.donate.visualOnlyNote}</span>
            </div>
            <div className="method-card" role="listitem">
              <span className="logo-frame">
                <Image src="/images/icon-masrivi.webp" alt="Masrivi" width={120} height={60} />
              </span>
              <span className="name">Masrivi</span>
              <span className="visual-tag">{T.donate.visualOnlyNote}</span>
            </div>
            <div className="method-card" role="listitem">
              <span className="logo-frame">
                <Image src="/images/icon-sedad.webp" alt="Sedad" width={120} height={60} />
              </span>
              <span className="name">Sedad</span>
              <span className="visual-tag">{T.donate.visualOnlyNote}</span>
            </div>
          </div>

          <div className="donate-number reveal">
            <div>
              <span className="label">{T.donate.numberLabel}</span>
              <span className="value">{ASSOCIATION.phone}</span>
            </div>
          </div>

          <p className="security-note reveal">{T.donate.securityNote}</p>
        </div>
      </section>
    </>
  );
}
