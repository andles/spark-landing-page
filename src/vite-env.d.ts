/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SIGNUP_URL_BASE?: string;
  /** Spark API origin (e.g. https://api.sparkinventory.com). When set, partner applications go to its approval queue. */
  readonly VITE_SPARK_API_URL?: string;
  readonly VITE_THEME?: 'classic' | 'nextgen';
  /** Spark web app origin the webinar sign-up hands its new session to. Defaults to https://app.sparkinventory.com. */
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
