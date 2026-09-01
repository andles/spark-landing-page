/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SIGNUP_URL_BASE?: string;
  readonly VITE_THEME?: 'classic' | 'nextgen';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
