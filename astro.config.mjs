import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ESPANA_PUBLICADA, ESPANA_RUTAS } from './src/data/site.js';

// Web de Project Robin. Todas las URLs terminan en "/" igual que en WordPress
// para no perder nada de lo que Google ya tiene indexado.
export default defineConfig({
  site: 'https://project-robin.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/reserva-confirmada/') &&
        !page.includes('/gracias/') &&
        !page.includes('/yuselico-studios/') &&
        !/\/the-european-experience\/.+-2\/$/.test(page) && // duplicados: canonical a /universidades/<slug>/ // landing de campaña, solo con enlace directo
        (ESPANA_PUBLICADA || !ESPANA_RUTAS.some((r) => page.endsWith(r))),
    }),
  ],
});
