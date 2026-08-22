import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Scroll to the URL hash once the page has actually rendered, and keep it
// aligned while the layout settles.
//
// Why: on a fresh load of /page#section the browser does its native anchor
// scroll immediately. On a lazy route chunk the target may not exist yet; on
// any page, content above the target can still grow after mount (a mobile
// hero showcase mounting in an effect, fonts swapping, images sizing in),
// which pushes the target back down after the scroll. So for a short window
// we re-scroll whenever the document height changes, and stop the moment the
// visitor interacts so we never fight them. Sections carry scroll-margin-top
// for the fixed header, so a plain scrollIntoView is enough.
// ─────────────────────────────────────────────────────────────────────────────
const SETTLE_MS = 1500;
const USER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

export function useScrollToHashOnMount(): void {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    let done = false;
    const jump = () => {
      if (!done) el.scrollIntoView({ block: "start", behavior: "auto" });
    };
    const stop = () => {
      done = true;
      ro.disconnect();
      clearTimeout(timer);
      for (const ev of USER_EVENTS) window.removeEventListener(ev, stop);
    };

    const ro = new ResizeObserver(jump);
    const timer = setTimeout(stop, SETTLE_MS);

    jump();
    ro.observe(document.documentElement);
    for (const ev of USER_EVENTS) window.addEventListener(ev, stop, { passive: true });

    return stop;
  }, []);
}
