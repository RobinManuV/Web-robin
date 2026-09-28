// Estado de cada semana en Netlify Blobs (almacén "blog-machine").
// Clave: semana/<lunes>, p. ej. semana/2026-09-28
//
// {
//   week, range: {from, to}, createdAt,
//   status: 'investigando' | 'ideas' | 'redactando' | 'borradores' | 'error',
//   ideas: [ {title, angle, whyNow, audience, keywords[], sources[{title,url,publisher,date}]} ],
//   selection: { miercoles: <índice>, viernes: <índice> },
//   drafts: { miercoles: Draft, viernes: Draft },
//   log: [ {at, msg} ]
// }
// Draft = { ideaIndex, publishOn, status: 'redactando'|'pendiente'|'parado'|'publicado'|'error',
//           slug, markdown, article, images, publishedAt, url, error }
import { getStore } from '@netlify/blobs';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';

// En pruebas locales (BLOG_LOCAL_STORE=carpeta) se guarda en archivos en vez de Netlify Blobs
function localStore(dir) {
  mkdirSync(dir, { recursive: true });
  const f = (k) => `${dir}/${k.replace(/\//g, '__')}.json`;
  return {
    get: async (k) => (existsSync(f(k)) ? JSON.parse(readFileSync(f(k), 'utf8')) : null),
    setJSON: async (k, v) => writeFileSync(f(k), JSON.stringify(v, null, 2)),
    list: async ({ prefix }) => ({
      blobs: readdirSync(dir)
        .map((n) => n.replace(/__/g, '/').replace(/\.json$/, ''))
        .filter((k) => k.startsWith(prefix))
        .sort()
        .map((key) => ({ key })),
    }),
  };
}

const store = () =>
  process.env.BLOG_LOCAL_STORE ? localStore(process.env.BLOG_LOCAL_STORE) : getStore({ name: 'blog-machine', consistency: 'strong' });

export async function getWeek(week) {
  return (await store().get(`semana/${week}`, { type: 'json' })) || null;
}

export async function saveWeek(data) {
  data.updatedAt = new Date().toISOString();
  await store().setJSON(`semana/${data.week}`, data);
  return data;
}

export function log(data, msg) {
  data.log = data.log || [];
  data.log.push({ at: new Date().toISOString(), msg });
  console.log(`[blog ${data.week}] ${msg}`);
}

// Títulos de semanas anteriores, para no repetir temas
export async function pastIdeaTitles(limit = 60) {
  const { blobs } = await store().list({ prefix: 'semana/' });
  const titles = [];
  for (const b of blobs.slice(-12)) {
    const w = await store().get(b.key, { type: 'json' });
    (w?.ideas || []).forEach((i) => titles.push(i.title));
  }
  return titles.slice(-limit);
}
