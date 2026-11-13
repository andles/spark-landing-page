// Forwards the first outside site that sent this visitor (www.google.com,
// chatgpt.com, …) to the app's sign-up page as `ref=`, so the account records
// the right signup channel. The app cannot see it itself: its own referrer is
// this site. Only the host name is kept, in sessionStorage for this tab's
// visit, never a full URL, a search query or a cookie.

const STORAGE_KEY = 'spark:first-referrer';
const OWN_HOSTS = ['sparkinventory.com', 'www.sparkinventory.com', 'app.sparkinventory.com'];
const SIGNUP_PATHS = ['/sign-up', '/shopify-trial'];

function externalHost(referrer: string): string | null {
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host.includes('.') && !OWN_HOSTS.includes(host) ? host : null;
  } catch {
    return null;
  }
}

/** Keeps the first outside referrer of this tab's visit; later pages on this site do not replace it. */
export function rememberFirstReferrer(referrer: string = document.referrer): void {
  const host = externalHost(referrer);
  if (!host) return;
  try {
    if (!sessionStorage.getItem(STORAGE_KEY)) sessionStorage.setItem(STORAGE_KEY, host);
  } catch {
    // Storage can be unavailable (private mode, blocked); the sign-up just goes without it.
  }
}

function firstReferrer(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * The link with `ref=` added when it is an app sign-up link that has none and an
 * outside referrer is known; any other link comes back unchanged.
 */
export function withSignupReferrer(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.hostname !== 'app.sparkinventory.com' || !SIGNUP_PATHS.includes(url.pathname) || url.searchParams.has('ref')) return href;
  const host = firstReferrer();
  if (!host) return href;
  url.searchParams.set('ref', host);
  return url.toString();
}
