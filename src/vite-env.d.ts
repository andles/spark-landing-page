/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THEME?: 'classic' | 'nextgen';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
