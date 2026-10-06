// Edge function: quita la sección España del menú, la portada y los formularios
// a quien entra desde España (ver src/lib/geo-espana.mjs). Solo toca páginas HTML.
import type { Config, Context } from '@netlify/edge-functions';
import { applyGeo, ESPANA_PAISES_OCULTA } from '../../src/lib/geo-espana.mjs';

export default async (req: Request, context: Context) => {
  const res = await context.next();
  if (!(res.headers.get('content-type') || '').includes('text/html')) return res;
  const country = context.geo?.country?.code || '';
  // ?pais=ES / ?pais=MX para comprobarlo sin VPN
  const forced = new URL(req.url).searchParams.get('pais');
  const hide = ESPANA_PAISES_OCULTA.includes((forced || country).toUpperCase());
  const html = await res.text();
  const headers = new Headers(res.headers);
  headers.delete('content-length');
  headers.delete('etag');
  // La respuesta cambia según el país: que el navegador no la reutilice tal cual en otro sitio
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return new Response(applyGeo(html, hide), { status: res.status, headers });
};

export const config: Config = {
  path: '/*',
  excludedPath: ['/_astro/*', '/wp-content/*', '/fotos/*', '/api/*', '/.netlify/*', '/*.xml', '/*.txt', '/*.json', '/*.webp', '/*.jpg', '/*.jpeg', '/*.png', '/*.gif', '/*.svg', '/*.ico', '/*.js', '/*.css', '/*.woff2', '/*.mp4', '/*.pdf'],
};
