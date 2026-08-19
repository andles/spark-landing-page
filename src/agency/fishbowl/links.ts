// ─────────────────────────────────────────────────────────────────────────────
// CTA destinations for the /fishbowl-alternative campaign page.
//
// Same booking + signup flows as the rest of the site, tagged so leads from
// this page are identifiable downstream. Calendly stores utm_* params on the
// booking; the app signup receives them as query params.
//
// UTM forwarding: when the visitor arrives from an ad with its own UTMs
// (e.g. ?utm_source=google&utm_medium=cpc&utm_campaign=fishbowl_alt), those
// are forwarded into the CTA links and take precedence over our defaults, so
// the booking carries the ad's attribution. The page itself is always
// identified via utm_content=fishbowl_lp (and `source=fishbowl_lp` on signup),
// which survives regardless of what the ad passes. A URL hash (#migrate etc.)
// lives outside the query string, so anchors never interfere with this.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { CALENDLY_URL } from "../calendly";

export const LEAD_SOURCE = "fishbowl_lp";

const SIGNUP_BASE = "https://app.sparkinventory.com/sign-up";

/** Default attribution when the visitor has no UTMs of their own. */
const DEFAULT_UTMS: Record<string, string> = {
  utm_source: LEAD_SOURCE,
  utm_medium: "landing_page",
  utm_campaign: "fishbowl_alternative",
};

/** Names Calendly and the app both accept. */
const FORWARDED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

/**
 * Build the two CTA URLs for a given page query string.
 * Exported (not just the hook) so it is easy to unit-check and to reuse.
 */
export function buildCtaUrls(search: string = ""): { bookUrl: string; signupUrl: string } {
  const incoming = new URLSearchParams(search);
  const utms: Record<string, string> = { ...DEFAULT_UTMS };
  for (const key of FORWARDED_PARAMS) {
    const v = incoming.get(key);
    if (v) utms[key] = v;
  }
  // Always identify the page, even when the ad sets utm_source/medium/campaign.
  if (!incoming.get("utm_content")) utms.utm_content = LEAD_SOURCE;

  const qs = new URLSearchParams(utms).toString();
  return {
    bookUrl: `${CALENDLY_URL}?${qs}`,
    signupUrl: `${SIGNUP_BASE}?source=${LEAD_SOURCE}&${qs}`,
  };
}

/** Default (no incoming UTMs) links. Used for the prerendered HTML. */
export const { bookUrl: BOOK_URL, signupUrl: SIGNUP_URL } = buildCtaUrls("");

/**
 * CTA links that merge in the current page's UTMs. The defaults render first
 * so the prerendered HTML and the first client render agree; the merged links
 * are applied in an effect once the real query string is available.
 */
export function useCtaLinks(): { bookUrl: string; signupUrl: string } {
  const [links, setLinks] = useState({ bookUrl: BOOK_URL, signupUrl: SIGNUP_URL });
  useEffect(() => {
    const search = window.location.search;
    if (!search) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only value, post-hydration on purpose
    setLinks(buildCtaUrls(search));
  }, []);
  return links;
}

/** Primary CTA label, used in the hero and the closing section. */
export const PRIMARY_CTA = "See it with your data";
