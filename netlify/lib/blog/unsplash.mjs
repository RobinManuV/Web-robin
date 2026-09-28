// Imágenes de Unsplash (gratuitas, con crédito al fotógrafo).
// Normas de la API: enlazar la imagen desde Unsplash (hotlink), acreditar al autor
// y avisar a Unsplash cuando se usa (download_location). Todo eso se hace aquí.
import { cfg } from './config.mjs';

const UTM = 'utm_source=project_robin&utm_medium=referral';

export async function findPhoto(query, usedIds = new Set()) {
  if (!cfg.unsplashKey() || !query) return null;
  const u = new URL('https://api.unsplash.com/search/photos');
  u.searchParams.set('query', query);
  u.searchParams.set('per_page', '10');
  u.searchParams.set('orientation', 'landscape');
  u.searchParams.set('content_filter', 'high');
  const res = await fetch(u, { headers: { Authorization: `Client-ID ${cfg.unsplashKey()}`, 'Accept-Version': 'v1' } });
  if (!res.ok) {
    console.error(`[unsplash] ${res.status} ${await res.text()}`);
    return null;
  }
  const { results = [] } = await res.json();
  const p = results.find((r) => !usedIds.has(r.id));
  if (!p) return null;
  usedIds.add(p.id);
  const name = p.user?.name || 'Unsplash';
  const profile = `${p.user?.links?.html || 'https://unsplash.com'}?${UTM}`;
  return {
    id: p.id,
    url: `${p.urls.raw}&w=1600&q=80&fm=jpg&fit=crop`,
    width: 1600,
    height: Math.round((1600 * (p.height || 1067)) / (p.width || 1600)),
    author: name,
    authorUrl: profile,
    downloadLocation: p.links?.download_location,
    creditHtml: `Foto de <a href="${profile}" rel="noopener">${name}</a> en <a href="https://unsplash.com/?${UTM}" rel="noopener">Unsplash</a>`,
  };
}

// Obligatorio según las normas de Unsplash cuando la foto se publica
export async function trackDownload(photo) {
  if (!photo?.downloadLocation || !cfg.unsplashKey()) return;
  try {
    await fetch(photo.downloadLocation, { headers: { Authorization: `Client-ID ${cfg.unsplashKey()}` } });
  } catch {
    /* no crítico */
  }
}
