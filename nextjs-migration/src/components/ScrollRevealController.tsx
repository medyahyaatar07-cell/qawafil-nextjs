"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Ported from section 3 of static/js/main.js: fade/slide in any `.reveal`
 * element as it scrolls into view, via IntersectionObserver, respecting
 * prefers-reduced-motion.
 *
 * The original ran this once, on a full-page load. In Next.js this
 * component is mounted once (in the root layout) and stays mounted across
 * client-side navigations, but each new page brings its own fresh
 * `.reveal` elements — so the effect re-scans the document whenever the
 * route (pathname) changes, not just on first mount.
 */
export default function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window) || reducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
