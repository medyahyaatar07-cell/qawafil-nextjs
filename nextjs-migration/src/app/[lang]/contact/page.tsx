import type { Metadata } from "next";
import Image from "next/image";

import { ASSOCIATION } from "@/lib/association";
import { getContent } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";

/** Ported from pages/templates/pages/contact.html + views.contact(). */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  return {
    title: `${T.contact.title} — ${T.meta.siteTitle}`,
    description: T.contact.text.split("\n")[0],
    openGraph: { type: "website" },
  };
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  const address = lang === "fr" ? ASSOCIATION.addressFr : ASSOCIATION.addressAr;

  return (
    <>
      <section className="section section--dark" style={{ paddingBlock: "70px 60px" }}>
        <div className="container reveal is-visible">
          <span className="eyebrow">{T.nav.contact}</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, maxWidth: "20ch" }}>{T.contact.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "60ch", marginTop: "16px", whiteSpace: "pre-line" }}>
            {T.contact.text}
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="contact-grid reveal">
            <div className="contact-card">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <span className="label">{T.contact.labels.address}</span>
                <span className="value">{address}</span>
              </div>
            </div>

            <div className="contact-card">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <div>
                <span className="label">{T.contact.labels.phone}</span>
                <a
                  className="value"
                  href={`tel:${ASSOCIATION.phone}`}
                  style={{ direction: "ltr", display: "inline-block", unicodeBidi: "isolate" }}
                >
                  {ASSOCIATION.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <span className="icon icon--logo" aria-hidden="true">
                <Image src="/images/icon-whatsapp.webp" alt="" width={40} height={40} />
              </span>
              <div>
                <span className="label">{T.contact.labels.whatsapp}</span>
                <a
                  className="value"
                  href={`https://wa.me/${ASSOCIATION.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ direction: "ltr", display: "inline-block", unicodeBidi: "isolate" }}
                >
                  {ASSOCIATION.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <span className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v16H4z" opacity={0} />
                  <path d="m22 6-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <div>
                <span className="label">{T.contact.labels.email}</span>
                <a
                  className="value"
                  href={`mailto:${ASSOCIATION.email}`}
                  style={{ direction: "ltr", display: "inline-block", unicodeBidi: "isolate", wordBreak: "break-all" }}
                >
                  {ASSOCIATION.email}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <span className="icon icon--logo" aria-hidden="true">
                <Image src="/images/icon-facebook.webp" alt="" width={40} height={40} />
              </span>
              <div>
                <span className="label">{T.contact.labels.facebook}</span>
                <a className="value" href={ASSOCIATION.facebookUrl} target="_blank" rel="noopener noreferrer">
                  {T.contact.labels.facebookValue}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
