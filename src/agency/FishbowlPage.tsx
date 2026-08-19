// ─────────────────────────────────────────────────────────────────────────────
// FISHBOWL ALTERNATIVE campaign landing page (/fishbowl-alternative).
// Destination for Google Ads traffic from "fishbowl alternative", "fishbowl
// custom reports", "fishbowl shopify integration", etc. Deliberately half
// the section count of AgencyPage: every section answers a Fishbowl-specific
// complaint. Sections live in ./fishbowl/; CTA links + source tagging in
// ./fishbowl/links.ts.
//
// Sitelink anchors (Google Ads sitelink assets deep-link into the page):
//   #migrate  FishbowlMigration      #reports / #sync  FishbowlComparison
//   #book     FishbowlCTA
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from "react";
import FishbowlHeader from "./fishbowl/FishbowlHeader";
import FishbowlHero from "./fishbowl/FishbowlHero";
import FishbowlMigration from "./fishbowl/FishbowlMigration";
import FishbowlComparison from "./fishbowl/FishbowlComparison";
import FishbowlTrust from "./fishbowl/FishbowlTrust";
import FishbowlCTA from "./fishbowl/FishbowlCTA";
import AgencyFooter from "./AgencyFooter";

/**
 * Scroll to the URL hash once the page has actually rendered.
 *
 * This page is a lazy route chunk. On a fresh load of /fishbowl-alternative#book
 * the browser performs its native anchor scroll against the prerendered HTML
 * (which does contain the ids) and then React hydrates; on a plain SPA-shell
 * load (no prerender, e.g. the dev server) the target doesn't exist yet when
 * the browser looks for it, so nothing scrolls. Either way, re-running the
 * scroll after mount makes the anchor reliable. scroll-margin-top on the
 * sections handles the fixed-header offset, so plain scrollIntoView is enough.
 *
 * Content above the target can still grow after mount (the mobile hero
 * showcase mounts in an effect, fonts swap, images size in), which would push
 * the target back down after we scrolled. So for a short settle window we
 * re-scroll whenever the document height changes, and stop immediately on any
 * user interaction so we never fight the visitor.
 */
const HASH_SETTLE_MS = 1500;

function useScrollToHashOnMount() {
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

    const USER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const ro = new ResizeObserver(jump); // document height changed: re-align
    const timer = setTimeout(stop, HASH_SETTLE_MS);

    jump();
    ro.observe(document.documentElement);
    for (const ev of USER_EVENTS) window.addEventListener(ev, stop, { passive: true });

    return stop;
  }, []);
}

export default function FishbowlPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <FishbowlHeader />
      <main>
        <FishbowlHero />
        <FishbowlMigration />
        <FishbowlComparison />
        <FishbowlTrust />
        <FishbowlCTA />
      </main>
      <AgencyFooter />
    </div>
  );
}
