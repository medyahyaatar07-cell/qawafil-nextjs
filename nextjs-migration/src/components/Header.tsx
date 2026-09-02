"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ASSOCIATION } from "@/lib/association";
import type { SiteContent } from "@/lib/content";
import { otherLang, type Lang } from "@/lib/i18n";

/**
 * Ported from templates/base.html's <header> + #mobile-nav, and the scroll
 * shrink / mobile menu logic from static/js/main.js. Combined into one
 * client component because the desktop header button and the mobile drawer
 * share the same open/close state.
 */
export default function Header({ lang, T }: { lang: Lang; T: SiteContent }) {
  const pathname = usePathname() ?? `/${lang}`;
  const segments = pathname.split("/").filter(Boolean); // e.g. ["ar", "work", "poverty"]
  const section = segments[1] ?? ""; // "" for home, else "about" | "work" | "donate" | "contact"

  const other = otherLang(lang);
  const alternateHref = "/" + [other, ...segments.slice(1)].join("/");

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes (client-side nav).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      firstMobileLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const navItems: { key: string; href: string; label: string }[] = [
    { key: "", href: `/${lang}`, label: T.nav.home },
    { key: "about", href: `/${lang}/about`, label: T.nav.about },
    { key: "work", href: `/${lang}/work`, label: T.nav.work },
    { key: "donate", href: `/${lang}/donate`, label: T.nav.donate },
    { key: "contact", href: `/${lang}/contact`, label: T.nav.contact },
  ];
  const isActive = (key: string) => section === key;

  return (
    <>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="site-header">
        <div className="container header-inner">
          <Link href={`/${lang}`} className="brand">
            <Image src="/images/logo-qawafil.png" alt={ASSOCIATION.nameAr} width={46} height={46} />
            <span className="brand-text">
              {ASSOCIATION.nameAr}
              <small>{lang === "fr" ? ASSOCIATION.nameFr : "Association Qawafil Al Khair"}</small>
            </span>
          </Link>

          <nav className="main-nav" aria-label="القائمة الرئيسية / Menu principal">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} aria-current={isActive(item.key) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href={alternateHref} className="lang-switch" aria-label={T.nav.langSwitchLabel}>
              {T.nav.langSwitchLabel}
            </Link>
            <Link href={`/${lang}/donate`} className="btn btn-primary" style={{ padding: "11px 22px" }}>
              {T.nav.ctaDonate}
            </Link>
            <button
              className="nav-toggle"
              id="nav-open-btn"
              aria-label={T.nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? " is-open" : ""}`} id="mobile-nav">
        <div className="mobile-nav-top">
          <span className="brand" style={{ color: "#fff" }}>
            <Image src="/images/logo-qawafil.png" alt="" width={40} height={40} />
            {ASSOCIATION.nameAr}
          </span>
          <button className="mobile-nav-close" id="nav-close-btn" aria-label={T.nav.closeMenu} onClick={() => setMobileOpen(false)}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-links" aria-label="القائمة الرئيسية للهاتف">
          {navItems.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              ref={i === 0 ? firstMobileLinkRef : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-nav-footer">
          <Link href={`/${lang}/donate`} className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            {T.nav.ctaDonate}
          </Link>
          <Link href={alternateHref} className="btn btn-outline">
            {T.nav.langSwitchLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
