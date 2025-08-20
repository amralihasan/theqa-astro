// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // or 'server' if you need full SSR
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  }
});
