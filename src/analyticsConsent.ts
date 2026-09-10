// CookieYes owns the consent choice on both Spark domains. Its initial
// analytics:no value is not a rejection until action:yes records a decision.
export type AnalyticsConsent = 'pending' | 'accepted' | 'rejected';

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof document === 'undefined') return 'pending';
  const cookie = document.cookie?.split(';').map((part) => part.trim()).find((entry) => entry.startsWith('cookieyes-consent='));
  if (!cookie) return 'pending';
  try {
    const values = decodeURIComponent(cookie.slice('cookieyes-consent='.length)).split(',');
    if (!values.includes('action:yes')) return 'pending';
    if (values.includes('analytics:yes')) return 'accepted';
    if (values.includes('analytics:no')) return 'rejected';
  } catch {
    // Malformed or expired consent never authorizes collection.
  }
  return 'pending';
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'accepted';
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
