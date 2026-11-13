/**
 * Cloudflare Turnstile for the webinar sign-up, mirroring the app's own sign-up form
 * (web-app/src/helpers/turnstile.ts): same public site key, same `signup` action, run only on
 * submit. The server demands a token whenever its TURNSTILE_SECRET_KEY is set, so production
 * needs VITE_TURNSTILE_SITE_KEY here and sparkinventory.com on the widget's Cloudflare
 * hostname list. Without a key nothing loads and the form posts without a token.
 */
export const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
export const TURNSTILE_SIGNUP_ACTION = 'signup';
const TOKEN_TIMEOUT_MS = 30_000;

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const turnstileSiteKey = (): string | undefined => import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || undefined;

let scriptLoad: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptLoad ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing')));
    script.onerror = () => {
      scriptLoad = null;
      reject(new Error('Turnstile failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptLoad;
}

/**
 * Runs the challenge in `container` and resolves with a fresh token, or undefined when no site
 * key is configured or the challenge could not finish (the server then decides).
 */
export async function getTurnstileToken(container: HTMLElement): Promise<string | undefined> {
  const sitekey = turnstileSiteKey();
  if (!sitekey) return undefined;
  let api: TurnstileApi;
  try {
    api = await loadTurnstile();
  } catch {
    return undefined;
  }
  return new Promise<string | undefined>((resolve) => {
    const timer = window.setTimeout(() => resolve(undefined), TOKEN_TIMEOUT_MS);
    const done = (token?: string) => {
      window.clearTimeout(timer);
      resolve(token);
    };
    container.replaceChildren();
    const widgetId = api.render(container, {
      sitekey,
      action: TURNSTILE_SIGNUP_ACTION,
      execution: 'execute',
      appearance: 'interaction-only',
      callback: (token: string) => done(token),
      'error-callback': () => done(undefined),
      'timeout-callback': () => done(undefined),
    });
    api.execute(widgetId);
  });
}
