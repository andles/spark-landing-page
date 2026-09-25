/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SIGNUP_URL_BASE?: string;
  /** Spark API origin (e.g. https://api.sparkinventory.com). When set, partner applications go to its approval queue. */
  readonly VITE_SPARK_API_URL?: string;
  readonly VITE_THEME?: 'classic' | 'nextgen';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
