/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CIVIC_CLIENT_ID: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}