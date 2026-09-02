"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ported from home.html's {% block logo_intro %} + section 4 of
 * static/js/main.js: a full-screen looping logo-animation splash that
 * plays once per browser session (sessionStorage-gated), auto-dismisses
 * when the video ends or after a 2.6s hard cap (whichever comes first),
 * and can be skipped. Reduced-motion visitors skip straight past it.
 * Used only on the home page, mirroring the original.
 */
export default function LogoIntro({
  associationName,
  skipLabel,
}: {
  associationName: string;
  skipLabel: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideRef = useRef<() => void>(() => {});

  useEffect(() => {
    function hide() {
      setHidden(true);
      try {
        sessionStorage.setItem("qawafilIntroSeen", "1");
      } catch {
        // sessionStorage unavailable (private mode, disabled storage, etc.)
        // — fall through, the intro just plays again next time.
      }
      window.setTimeout(() => setRemoved(true), 650);
    }
    hideRef.current = hide;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("qawafilIntroSeen") === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen || reducedMotion) {
      hide();
      return;
    }

    const maxTimer = window.setTimeout(hide, 2600);
    const video = videoRef.current;
    const onEnded = () => {
      window.clearTimeout(maxTimer);
      hide();
    };
    video?.addEventListener("ended", onEnded);
    video?.play().catch(hide);

    return () => {
      window.clearTimeout(maxTimer);
      video?.removeEventListener("ended", onEnded);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`logo-intro${hidden ? " is-hidden" : ""}`}
      id="logo-intro"
      role="dialog"
      aria-label={associationName}
    >
      <video ref={videoRef} autoPlay muted playsInline aria-hidden="true">
        <source src="/video/logo-animation.mp4" type="video/mp4" />
      </video>
      <button type="button" className="skip-intro-btn" onClick={() => hideRef.current()}>
        {skipLabel}
      </button>
    </div>
  );
}
