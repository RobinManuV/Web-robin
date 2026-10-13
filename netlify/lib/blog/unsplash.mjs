// Imágenes de Unsplash (gratuitas, con crédito al fotógrafo).
// Normas de la API: enlazar la imagen desde Unsplash (hotlink), acreditar al autor
// y avisar a Unsplash cuando se usa (download_location). Todo eso se hace aquí.
import { cfg } from './config.mjs';
import { askJson } from './claude.mjs';
import { CRITERIOS_FOTOS } from './prompts.mjs';

const UTM = 'utm_source=project_robin&utm_medium=referral';

// Claude revisa las candidatas (por su descripción y etiquetas) y elige la que cumple los criterios, o ninguna.
async function chooseCandidate(candidates, context) {
  const list = candidates.map((r, n) => ({
    n,
    descripcion: r.alt_description || r.description || '',
    etiquetas: (r.tags || []).map((t) => t.title).filter(Boolean).slice(0, 8),
  }));
  try {
    const { json } = await askJson({
      system: `Eres el editor de fotos del blog de Project Robin, una asesoría para estudiar en Holanda. Eliges la foto que mejor encaja con el artículo y con su público, o ninguna.\n${CRITERIOS_FOTOS}`,
      prompt: `ARTÍCULO: ${context.title || ''} (${context.category || ''})
USO DE LA FOTO: ${context.use || 'imagen de apoyo'}
DESCRIPCIÓN PREVISTA: ${context.alt || ''}

CANDIDATAS (solo tienes su descripción y etiquetas):
${JSON.stringify(list, null, 1)}

Elige la candidata que cumple los criterios y encaja mejor. Si ninguna cumple, devuelve null.
Devuelve SOLO este JSON:
\`\`\`json
{ "choice": 0, "reason": "una frase" }
\`\`\``,
      maxSearches: 0,
      maxTokens: 400,
    });
    const n = json.choice;
    console.log(`[unsplash] "${context.use}" → ${Number.isInteger(n) ? n : 'ninguna'}: ${json.reason || ''}`);
    return Number.isInteger(n) && n >= 0 && n < candidates.length ? candidates[n] : null;
  } catch (err) {
    console.error('[unsplash] no se pudo elegir la foto:', err.message);
    return null; // mejor sin foto que una foto sin revisar
  }
}

export async function findPhoto(query, usedIds = new Set(), context = {}) {
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
  const candidates = results.filter((r) => !usedIds.has(r.id));
  if (!candidates.length) return null;
  const p = await chooseCandidate(candidates, context);
  if (!p) return null;
  usedIds.add(p.id);
  const name = p.user?.name || 'Unsplash';
  const profile = `${p.user?.links?.html || 'https://unsplash.com'}?${UTM}`;
  return {
    id: p.id,
    // Siempre 16:9 recortada por Unsplash: se ve igual en móvil y en ordenador
    url: `${p.urls.raw}&w=1600&h=900&q=80&fm=jpg&fit=crop&crop=entropy`,
    width: 1600,
    height: 900,
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
