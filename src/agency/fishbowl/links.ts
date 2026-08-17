// ─────────────────────────────────────────────────────────────────────────────
// CTA destinations for the /fishbowl-alternative campaign page.
//
// Same booking + signup flows as the rest of the site, tagged with a source so
// leads from this page are identifiable downstream. Calendly stores UTM params
// on the booking; the app signup receives them as query params.
// ─────────────────────────────────────────────────────────────────────────────
import { CALENDLY_URL } from "../calendly";

export const LEAD_SOURCE = "fishbowl_lp";

const utm = new URLSearchParams({
  utm_source: LEAD_SOURCE,
  utm_medium: "landing_page",
  utm_campaign: "fishbowl_alternative",
}).toString();

/** Calendly link with UTM tags (opened in the shared popup). */
export const BOOK_URL = `${CALENDLY_URL}?${utm}`;

/** App signup with a `source` param plus the same UTM tags. */
export const SIGNUP_URL = `https://app.sparkinventory.com/sign-up?source=${LEAD_SOURCE}&${utm}`;

/** Primary CTA label, used in the hero and the closing section. */
export const PRIMARY_CTA = "See it with your data";
