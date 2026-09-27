import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Web de Project Robin. Todas las URLs terminan en "/" igual que en WordPress
// para no perder nada de lo que Google ya tiene indexado.
export default defineConfig({
  site: 'https://project-robin.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/reserva-confirmada/') && !page.includes('/gracias/'),
    }),
  ],
});
