// ─────────────────────────────────────────────────────────────────────────────
// Site-wide CTA link builder: Calendly booking + app signup, with the page's
// own UTM parameters forwarded so ad attribution survives into the booking
// and the signup.
//
// - Incoming utm_* / gclid on the landing URL are forwarded as-is and take
//   precedence over any page defaults.
// - A page may pass `defaults` (applied only when the visitor has no UTMs)
//   and a `source` tag, which is always added as utm_content (Calendly stores
//   it) and as `source=` on the signup URL, so the page stays identifiable
//   no matter what the ad passed.
// - The URL hash (#section) is not part of the query string, so in-page
//   anchors never interfere with any of this.
//
// useCtaLinks() renders the default links first (so prerendered HTML and the
// first client render agree) and swaps in the merged links in an effect.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { CALENDLY_URL } from "./calendly";
import type { SignupPlanSlug } from "./pricingData";

export const SIGNUP_URL_BASE = "https://app.sparkinventory.com/sign-up";

/** Params Calendly and the app both accept. */
const FORWARDED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

export interface CtaLinkOptions {
  /** Applied only when the visitor arrived without their own UTMs. */
  defaults?: Record<string, string>;
  /** Page identifier, added as utm_content (unless the ad set one) and source=. */
  source?: string;
}

export interface CtaLinks {
  bookUrl: string;
  signupUrl: string;
}

export interface SignupIntent {
  plan: SignupPlanSlug;
  businessType?: '3pl';
}

/**
 * Adds a plan-selection contract to an app signup URL without disturbing its
 * attribution parameters. The app allowlists these values before using them.
 */
export function withSignupIntent(signupUrl: string, intent: SignupIntent): string {
  const url = new URL(signupUrl);
  url.searchParams.set('plan', intent.plan);
  if (intent.businessType) url.searchParams.set('business_type', intent.businessType);
  return url.toString();
}

export function buildCtaUrls(search: string = "", opts: CtaLinkOptions = {}): CtaLinks {
  const incoming = new URLSearchParams(search);
  const hasIncomingUtms = FORWARDED_PARAMS.some((k) => incoming.get(k));

  const params: Record<string, string> = hasIncomingUtms ? {} : { ...(opts.defaults ?? {}) };
  for (const key of FORWARDED_PARAMS) {
    const v = incoming.get(key);
    if (v) params[key] = v;
  }
  if (opts.source && !params.utm_content) params.utm_content = opts.source;

  const qs = new URLSearchParams(params).toString();
  const signupParams = new URLSearchParams(opts.source ? { source: opts.source } : {});
  for (const [k, v] of Object.entries(params)) signupParams.set(k, v);
  const signupQs = signupParams.toString();

  return {
    bookUrl: qs ? `${CALENDLY_URL}?${qs}` : CALENDLY_URL,
    signupUrl: signupQs ? `${SIGNUP_URL_BASE}?${signupQs}` : SIGNUP_URL_BASE,
  };
}

/**
 * CTA links for the current page, with the page's UTMs merged in after mount.
 * `opts` must be stable across renders (module constant or memoized).
 */
export function useCtaLinks(opts?: CtaLinkOptions): CtaLinks {
  const [links, setLinks] = useState<CtaLinks>(() => buildCtaUrls("", opts));
  useEffect(() => {
    const search = window.location.search;
    if (!search) return;
    setLinks(buildCtaUrls(search, opts));
    // opts is expected to be referentially stable; see docblock.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return links;
}
