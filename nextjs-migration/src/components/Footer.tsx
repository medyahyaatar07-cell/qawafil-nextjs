import Image from "next/image";
import Link from "next/link";

import { ASSOCIATION } from "@/lib/association";
import type { SiteContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export default function Footer({ lang, T }: { lang: Lang; T: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image src="/images/logo-qawafil.png" alt={ASSOCIATION.nameAr} width={44} height={44} />
              <strong>{ASSOCIATION.nameAr}</strong>
            </div>
            <p className="tagline">{T.footer.tagline}</p>
          </div>
          <div className="footer-col">
            <h4>{T.footer.linksTitle}</h4>
            <ul>
              <li>
                <Link href={`/${lang}`}>{T.nav.home}</Link>
              </li>
              <li>
                <Link href={`/${lang}/about`}>{T.nav.about}</Link>
              </li>
              <li>
                <Link href={`/${lang}/work`}>{T.nav.work}</Link>
              </li>
              <li>
                <Link href={`/${lang}/donate`}>{T.nav.donate}</Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`}>{T.nav.contact}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{T.footer.contactTitle}</h4>
            <ul>
              <li>
                <a href={`tel:${ASSOCIATION.phone}`}>{ASSOCIATION.phone}</a>
              </li>
              <li>
                <a href={`https://wa.me/${ASSOCIATION.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${ASSOCIATION.email}`}>{ASSOCIATION.email}</a>
              </li>
              <li>
                <a href={ASSOCIATION.facebookUrl} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>{lang === "fr" ? ASSOCIATION.addressFr : ASSOCIATION.addressAr}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {ASSOCIATION.nameAr} — {T.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
