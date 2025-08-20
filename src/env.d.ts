/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string;
  readonly PUBLIC_API_HASH: string;
  readonly API_AUTH_TOKEN: string;
  readonly PUBLIC_API_PAGE_SLUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}