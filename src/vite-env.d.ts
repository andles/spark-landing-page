/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SIGNUP_URL_BASE?: string;
  /** Spark API origin (e.g. https://api.sparkinventory.com). When set, partner applications go to its approval queue. */
  readonly VITE_SPARK_API_URL?: string;
  readonly VITE_THEME?: 'classic' | 'nextgen';
  /** Spark web app origin the webinar sign-up hands its new session to. Defaults to https://app.sparkinventory.com. */
  readonly VITE_APP_URL?: string;
  /** Cloudflare Turnstile public site key, the same one the web app's sign-up uses. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Optional Super Admin onboarding-campaign token that tags webinar sign-ups. Its campaign must have no preset plan. */
  readonly VITE_CHEW_WEBINAR_CAMPAIGN_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
