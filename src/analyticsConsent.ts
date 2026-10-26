// CookieYes owns the consent choice on both Spark domains, and its geo rules
// pick the law per visitor. Under an opt-in law (gdpr: EU and UK) nothing
// counts until action:yes records a decision, so an initial analytics:no is
// not a rejection. Under an opt-out law (ccpa: the US notice) the category
// values CookieYes writes on the first visit are the choice until the visitor
// opts out. An unknown law (CookieYes not loaded yet, or no banner configured
// for the region) is treated as opt-in.
// Keep this file aligned with web-app/src/helpers/analyticsConsent.ts in the
// monorepo.
export type AnalyticsConsent = 'pending' | 'accepted' | 'rejected';

declare global {
  interface Window {
    getCkyConsent?: () => { activeLaw?: string };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

const optOutLaws = new Set(['ccpa']);

function consentValues(): Map<string, string> | undefined {
  if (typeof document === 'undefined') return undefined;
  const cookie = document.cookie?.split(';').map((part) => part.trim()).find((entry) => entry.startsWith('cookieyes-consent='));
  if (!cookie) return undefined;
  try {
    return new Map(decodeURIComponent(cookie.slice('cookieyes-consent='.length)).split(',').map((entry) => {
      const separator = entry.indexOf(':');
      return [entry.slice(0, separator), entry.slice(separator + 1)];
    }));
  } catch {
    // Malformed or expired consent never authorizes collection.
    return undefined;
  }
}

// The law of the banner CookieYes chose for this visitor, or '' before its
// banner has loaded.
export function consentLaw(): string {
  try {
    return (typeof window !== 'undefined' && window.getCkyConsent?.().activeLaw) || '';
  } catch {
    return '';
  }
}

export function isOptOutLaw(law = consentLaw()): boolean {
  return optOutLaws.has(law);
}

export function getAnalyticsConsent(): AnalyticsConsent {
  const values = consentValues();
  if (!values) return 'pending';
  if (values.get('action') !== 'yes' && !isOptOutLaw()) return 'pending';
  if (values.get('analytics') === 'yes') return 'accepted';
  if (values.get('analytics') === 'no') return 'rejected';
  return 'pending';
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'accepted';
}

export function hasGlobalPrivacyControl(): boolean {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

// Session replay follows analytics consent once CookieYes reports the law:
// after an explicit Accept under an opt-in law, and under the US notice until
// the visitor opts out of analytics. The US notice names the recording, and a
// browser sending Global Privacy Control is never recorded under it.
export function hasReplayConsent(): boolean {
  const law = consentLaw();
  if (law === '' || !hasAnalyticsConsent()) return false;
  return !isOptOutLaw(law) || !hasGlobalPrivacyControl();
}

export function subscribeAnalyticsConsent(onChange: () => void): () => void {
  document.addEventListener('cookieyes_banner_load', onChange);
  document.addEventListener('cookieyes_consent_update', onChange);
  window.addEventListener('focus', onChange);
  return () => {
    document.removeEventListener('cookieyes_banner_load', onChange);
    document.removeEventListener('cookieyes_consent_update', onChange);
    window.removeEventListener('focus', onChange);
  };
}
