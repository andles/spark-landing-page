// ─────────────────────────────────────────────────────────────────────────────
// CTA destinations for the /fishbowl-alternative campaign page.
//
// Built on the shared ctaLinks module: the visitor's own utm_* / gclid are
// forwarded into Calendly and signup (ad attribution wins), the page is always
// identified as fishbowl_lp (utm_content, and source= on signup), and when the
// visitor has no UTMs these defaults apply. A URL hash (#migrate etc.) lives
// outside the query string, so anchors never interfere with this.
// ─────────────────────────────────────────────────────────────────────────────
import { buildCtaUrls, useCtaLinks as useSharedCtaLinks, type CtaLinks, type CtaLinkOptions } from "../ctaLinks";

export const LEAD_SOURCE = "fishbowl_lp";

const OPTIONS: CtaLinkOptions = {
  source: LEAD_SOURCE,
  defaults: {
    utm_source: LEAD_SOURCE,
    utm_medium: "landing_page",
    utm_campaign: "fishbowl_alternative",
  },
};

/** Default (no incoming UTMs) links. Used for the prerendered HTML. */
export const { bookUrl: BOOK_URL, signupUrl: SIGNUP_URL } = buildCtaUrls("", OPTIONS);

/** CTA links that merge in the current page's UTMs (see ../ctaLinks). */
export function useCtaLinks(): CtaLinks {
  return useSharedCtaLinks(OPTIONS);
}

/** Primary CTA label, used in the hero and the closing section. */
export const PRIMARY_CTA = "See it with your data";
