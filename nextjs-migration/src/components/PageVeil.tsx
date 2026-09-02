"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Ported from #page-veil in templates/base.html + section 5 of
 * static/js/main.js — a short dark curtain wipe between page navigations,
 * echoing the logo-animation's rhythm.
 *
 * The original site was a classic multi-page Django app: every internal
 * link was a full browser navigation, so the JS only had to cover the
 * *outgoing* page for 380ms (var(--dur-base)) before handing off to
 * window.location.href — the incoming page then simply rendered normally,
 * veil hidden by default.
 *
 * Next.js routes client-side (no full reload, no white flash to mask), so
 * a literal port would force every internal link back into a full page
 * reload — throwing away prefetching and defeating the point of the App
 * Router. Instead we keep the same interception rules (skip external
 * links, downloads, target=_blank, modifier-clicks, hash/mailto/tel links,
 * same-path links) but drive next/navigation's router.push() once the
 * curtain has covered the screen, then wipe it back out (using the
 * .animate-out keyframe the original CSS already defined but never
 * triggered) once the new route has committed. Net effect: the same
 * curtain motion, now bracketing the transition instead of only masking
 * an unload.
 */
const VEIL_MS = 380;

export default function PageVeil() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const navigatingRef = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (link.origin !== window.location.origin) return;
      if (link.pathname === window.location.pathname) return;

      e.preventDefault();
      navigatingRef.current = true;
      setPhase("in");
      window.setTimeout(() => {
        router.push(`${link.pathname}${link.search}${link.hash}`);
      }, VEIL_MS);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // Once the new route has actually committed, wipe the curtain back out.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!navigatingRef.current) return;
    navigatingRef.current = false;

    setPhase("out");
    const t = window.setTimeout(() => setPhase("idle"), VEIL_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const className =
    "page-transition-veil" + (phase === "in" ? " animate-in" : phase === "out" ? " animate-out" : "");

  return <div id="page-veil" className={className} aria-hidden="true" />;
}
