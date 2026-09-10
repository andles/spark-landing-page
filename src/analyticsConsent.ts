// CookieYes is the existing marketing consent authority. Both Spark frontends
// require affirmative analytics consent, including direct app visits.
type ConsentWindow = Window & { getCkyConsent?: () => { categories?: { analytics?: boolean } } };

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const cookie = document.cookie?.split('; ').find((entry) => entry.startsWith('cookieyes-consent='));
  if (cookie) {
    try {
      return decodeURIComponent(cookie.slice('cookieyes-consent='.length)).split(',').includes('analytics:yes');
    } catch { return false; }
  }
  return (window as ConsentWindow).getCkyConsent?.().categories?.analytics === true;
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
