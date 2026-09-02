import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import LogoIntro from "@/components/LogoIntro";
import type { CSSVars } from "@/lib/css-vars";
import { getContent, getWorkAreas } from "@/lib/content";
import { isLang, type Lang } from "@/lib/i18n";

/**
 * Ported from pages/templates/pages/home.html + views.home(). The
 * "teaser" selection logic (areas with real media first, then the rest,
 * capped at 4) is copied verbatim from views.py's list comprehension.
 */
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);
  return {
    title: `${T.hero.eyebrow} — ${T.hero.title}`,
    description: T.meta.siteDescription,
    openGraph: { type: "website" },
  };
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "ar";
  const T = getContent(lang);

  const allAreas = getWorkAreas(lang);
  const teaser = [...allAreas.filter((a) => a.hasMedia), ...allAreas.filter((a) => !a.hasMedia)].slice(0, 4);

  return (
    <>
      <LogoIntro associationName={T.meta.siteTitle} skipLabel={T.hero.skipIntro} />

      <section className="hero">
        <div className="container hero-inner">
          <div className="reveal is-visible">
            <span className="hero-eyebrow">{T.hero.eyebrow}</span>
            <h1>{T.hero.title}</h1>
            <p className="lead">{T.hero.text}</p>
            <div className="hero-ctas">
              <Link href={`/${lang}/about`} className="btn btn-primary">
                {T.hero.btnPrimary}
              </Link>
              <Link href={`/${lang}/donate`} className="btn btn-outline">
                {T.hero.btnSecondary}
              </Link>
            </div>
          </div>

          <div className="hero-visual reveal is-visible" aria-hidden="true">
            <span className="ring r1" />
            <span className="ring r2" />
            <span
              className="dot"
              style={{ "--r": "150px", top: "50%", left: "50%", margin: "-5px", animationDuration: "9s" } as CSSVars}
            />
            <span
              className="dot"
              style={
                {
                  "--r": "150px",
                  top: "50%",
                  left: "50%",
                  margin: "-5px",
                  animationDuration: "9s",
                  animationDelay: "-3s",
                  background: "var(--c-orange)",
                } as CSSVars
              }
            />
            <span
              className="dot"
              style={
                {
                  "--r": "112px",
                  top: "50%",
                  left: "50%",
                  margin: "-5px",
                  animationDuration: "7s",
                  animationDirection: "reverse",
                  background: "var(--c-orange-light)",
                } as CSSVars
              }
            />
            <div className="core">
              <Image src="/images/logo-qawafil.png" alt="" width={80} height={80} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{T.work.title}</span>
            <h2>{T.about.title}</h2>
            <p>{T.about.intro}</p>
          </div>
          <div className="hero-ctas reveal">
            <Link href={`/${lang}/about`} className="btn btn-dark-outline">
              {T.hero.btnPrimary}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: "var(--c-offwhite)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{T.work.title}</span>
            <h2>{T.work.subtitle}</h2>
          </div>
          <div className="work-grid">
            {teaser.map((area) => (
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
          <div className="hero-ctas reveal" style={{ marginTop: "36px" }}>
            <Link href={`/${lang}/work`} className="btn btn-primary">
              {T.work.title}
            </Link>
          </div>
        </div>
      </section>

      <section className="spread-section">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">{T.spread.title}</span>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 800 }}>{T.spread.title}</h2>
          </div>
          <div className="spread-map reveal" aria-hidden="true">
            <svg
              viewBox="0 0 400 480"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="خريطة موريتانيا وقوافل الخير المتحركة نحو مختلف ربوع الوطن"
            >
              <defs>
                {/* رمز مجرّد (Silhouette) لجمل — بلا تفاصيل زائدة، ومتناسق مع الهوية البصرية */}
                <symbol id="qawafil-camel" viewBox="0 0 120 70">
                  <path
                    d="M28,40 L25,62 M40,42 L46,60 M62,40 L60,62 M74,40 L80,60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={4.2}
                    strokeLinecap="round"
                  />
                  <path d="M15,32 C10,36 6,40 4,46" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
                  <path
                    d="M14,38 C10,34 12,26 20,24 C22,14 34,6 46,6 C54,6 58,12 55,18
                     C64,14 72,15 76,20 C80,17 86,18 88,22 C90,26 86,30 80,29
                     C82,34 78,39 70,40 C62,44 46,44 36,42 C28,44 18,43 14,38 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M80,26 C84,20 90,14 98,10 C102,8 106,7 110,9 C113,10.5 113,13 110,14.5
                     C107,16 103,15 100,17 C97,19 92,22 88,26 C85,29 81,29 80,26 Z"
                    fill="currentColor"
                  />
                  <path d="M99,9 L102,3 L104,9 Z" fill="currentColor" />
                </symbol>
              </defs>

              {/* حدود موريتانيا مستخرجة نقطة بنقطة من الخريطة المرجعية الدقيقة التي زوّدنا بها (وليست حدود السنغال أو مالي) */}
              <path
                d="M380.6,129.4 L292.6,74.7 L278.9,62.2 L265.2,57.0 L262.4,87.1 L264.8,102.0 L167.5,103.6 L167.5,172.4 L150.3,180.0 L142.6,190.5 L143.0,223.8 L24.0,224.6 L20.8,243.5 L25.2,233.9 L33.7,251.6 L37.7,251.2 L38.5,261.6 L42.5,262.8 L40.5,265.6 L42.9,268.4 L38.1,268.9 L34.5,276.5 L36.5,281.3 L33.3,286.9 L44.1,300.6 L50.6,326.7 L49.8,334.8 L30.1,369.4 L29.7,396.7 L32.1,386.2 L39.7,373.8 L70.3,370.6 L76.3,365.3 L86.3,368.1 L99.6,366.5 L112.1,377.8 L111.3,381.0 L115.7,386.6 L126.5,385.8 L139.8,411.2 L145.8,416.4 L148.6,415.2 L154.3,424.0 L160.7,427.2 L168.7,423.2 L168.7,418.0 L174.8,407.9 L183.2,405.5 L197.3,421.2 L208.5,410.4 L230.3,411.2 L237.1,406.7 L239.1,400.3 L241.1,405.5 L357.3,407.1 L365.3,377.0 L355.3,369.0 L328.7,137.8 L332.4,140.6 L348.0,131.4 Z"
                fill="rgba(255,139,36,0.07)"
                stroke="rgba(255,139,36,0.5)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />

              <path id="qroute1" d="M86,320 C 140,270 175,180 213,120" fill="none" stroke="var(--c-orange)" strokeWidth={2.2} className="path-dash" />
              <path id="qroute2" d="M86,320 C 200,240 280,190 340,130" fill="none" stroke="var(--c-orange)" strokeWidth={2.2} className="path-dash" />
              <path id="qroute3" d="M86,320 C 190,290 280,285 338,270" fill="none" stroke="var(--c-orange)" strokeWidth={2.2} className="path-dash" />
              <path id="qroute4" d="M86,320 C 170,360 220,385 256,402" fill="none" stroke="var(--c-orange)" strokeWidth={2.2} className="path-dash" />
              <path id="qroute5" d="M86,320 C 110,350 125,365 131,385" fill="none" stroke="var(--c-orange)" strokeWidth={2.2} className="path-dash" />

              {/* نقطة انطلاق القافلة */}
              <circle cx="86" cy="320" r="7" fill="var(--c-orange)" />
              <circle cx="86" cy="320" r="16" fill="none" stroke="var(--c-orange)" strokeWidth={1.5} className="pulse-dot" />

              {/* نقاط الوصول: نقطة ثابتة + نبضة خفيفة راقية عند وصول كل قافلة */}
              <circle className="arrival-dot" cx="213" cy="120" r="4" />
              <circle className="arrival-pulse" cx="213" cy="120" r="6" style={{ "--arr-dur": "5.2s", "--arr-delay": "5.2s" } as CSSVars} />
              <circle className="arrival-dot" cx="340" cy="130" r="4" />
              <circle className="arrival-pulse" cx="340" cy="130" r="6" style={{ "--arr-dur": "5.6s", "--arr-delay": "5.6s" } as CSSVars} />
              <circle className="arrival-dot" cx="338" cy="270" r="4" />
              <circle className="arrival-pulse" cx="338" cy="270" r="6" style={{ "--arr-dur": "4.2s", "--arr-delay": "4.2s" } as CSSVars} />
              <circle className="arrival-dot" cx="256" cy="402" r="4" />
              <circle className="arrival-pulse" cx="256" cy="402" r="6" style={{ "--arr-dur": "4.6s", "--arr-delay": "4.6s" } as CSSVars} />
              <circle className="arrival-dot" cx="131" cy="385" r="4" />
              <circle className="arrival-pulse" cx="131" cy="385" r="6" style={{ "--arr-dur": "3.2s", "--arr-delay": "3.2s" } as CSSVars} />

              {/* قوافل الإبل: كل قافلة تسير على مسارها بتباعد وتفاوت بسيط في السرعة والتوقيت
                  تُخفى تلقائياً مع تفضيل تقليل الحركة (SMIL لا يخضع لخفض مدة الحركة العام) */}
              <g className="qawafil-caravans">
                {/* المسار 1 — الشمال */}
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel qawafil-camel--lead" width="15" height="8.8" x="-7.5" y="-7">
                  <animateMotion dur="5.2s" begin="0s" repeatCount="indefinite" rotate="auto" path="M86,320 C 140,270 175,180 213,120" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.35s" begin="0.7s" repeatCount="indefinite" rotate="auto" path="M86,320 C 140,270 175,180 213,120" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.1s" begin="1.4s" repeatCount="indefinite" rotate="auto" path="M86,320 C 140,270 175,180 213,120" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.45s" begin="2.1s" repeatCount="indefinite" rotate="auto" path="M86,320 C 140,270 175,180 213,120" />
                </use>

                {/* المسار 2 — الشمال الشرقي */}
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel qawafil-camel--lead" width="15" height="8.8" x="-7.5" y="-7">
                  <animateMotion dur="5.6s" begin="0.2s" repeatCount="indefinite" rotate="auto" path="M86,320 C 200,240 280,190 340,130" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.75s" begin="0.9s" repeatCount="indefinite" rotate="auto" path="M86,320 C 200,240 280,190 340,130" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.5s" begin="1.6s" repeatCount="indefinite" rotate="auto" path="M86,320 C 200,240 280,190 340,130" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="5.9s" begin="2.3s" repeatCount="indefinite" rotate="auto" path="M86,320 C 200,240 280,190 340,130" />
                </use>

                {/* المسار 3 — الشرق */}
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel qawafil-camel--lead" width="15" height="8.8" x="-7.5" y="-7">
                  <animateMotion dur="4.2s" begin="0.4s" repeatCount="indefinite" rotate="auto" path="M86,320 C 190,290 280,285 338,270" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="4.35s" begin="1.1s" repeatCount="indefinite" rotate="auto" path="M86,320 C 190,290 280,285 338,270" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="4.1s" begin="1.8s" repeatCount="indefinite" rotate="auto" path="M86,320 C 190,290 280,285 338,270" />
                </use>

                {/* المسار 4 — الجنوب الشرقي */}
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel qawafil-camel--lead" width="15" height="8.8" x="-7.5" y="-7">
                  <animateMotion dur="4.6s" begin="0.6s" repeatCount="indefinite" rotate="auto" path="M86,320 C 170,360 220,385 256,402" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="4.75s" begin="1.3s" repeatCount="indefinite" rotate="auto" path="M86,320 C 170,360 220,385 256,402" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="18" height="10.5" x="-9" y="-8">
                  <animateMotion dur="4.5s" begin="2.0s" repeatCount="indefinite" rotate="auto" path="M86,320 C 170,360 220,385 256,402" />
                </use>

                {/* المسار 5 — الجنوب */}
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel qawafil-camel--lead" width="14" height="8.2" x="-7" y="-6.5">
                  <animateMotion dur="3.2s" begin="0.3s" repeatCount="indefinite" rotate="auto" path="M86,320 C 110,350 125,365 131,385" />
                </use>
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel camel-extra" width="16" height="9.3" x="-8" y="-7">
                  <animateMotion dur="3.35s" begin="1.0s" repeatCount="indefinite" rotate="auto" path="M86,320 C 110,350 125,365 131,385" />
                </use>
              </g>

              {/* رمز ثابت للقافلة يظهر فقط مع تفضيل تقليل الحركة، لضمان وصول الفكرة بصرياً دون حركة */}
              <g className="qawafil-static-camel">
                <use href="#qawafil-camel" xlinkHref="#qawafil-camel" className="qawafil-camel" width="26" height="15.2" x="140" y="248" />
              </g>
            </svg>
          </div>
          <p className="spread-text reveal">{T.spread.text}</p>
          <p className="spread-highlight reveal">{T.spread.tagline}</p>
        </div>
      </section>
    </>
  );
}
