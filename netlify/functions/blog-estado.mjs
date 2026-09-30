// /api/blog-estado — la usa el gestor (Robin-Admin, pestaña Web › Blog) desde su servidor.
// Autenticación: cabecera x-robin-blog-secret = BLOG_SECRET (nunca va en el navegador).
//   GET                         → estado de la semana actual y resumen de las últimas 8
//   POST {accion, semana?}      → accion: 'investigar' | 'forzar' | 'redactar'
import { timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { cfg } from '../lib/blog/config.mjs';
import { weekId, publishDates } from '../lib/blog/dates.mjs';
import { getWeek } from '../lib/blog/store.mjs';
import { runInBackground } from '../lib/blog/pipeline.mjs';
import { link } from '../lib/blog/sign.mjs';

const same = (a, b) => {
  const x = Buffer.from(String(a || ''));
  const y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
};

function summary(data) {
  if (!data) return null;
  return {
    week: data.week,
    status: data.status,
    error: data.error || null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    ideas: (data.ideas || []).map((i, n) => ({ n, title: i.title, angle: i.angle, audience: i.audience, sources: (i.sources || []).length })),
    selection: data.selection || null,
    chooseUrl: data.ideas?.length ? link('/api/blog-elegir', data.week) : null,
    drafts: Object.fromEntries(
      Object.entries(data.drafts || {}).map(([slot, d]) => [
        slot,
        {
          status: d.status,
          title: d.article?.title || null,
          publishOn: d.publishOn,
          url: d.url || null,
          error: d.error || null,
          previewUrl: d.article ? link('/api/blog-borrador', data.week, { d: slot }) : null,
        },
      ]),
    ),
    log: (data.log || []).slice(-20),
  };
}

export default async (req) => {
  if (!same(req.headers.get('x-robin-blog-secret'), cfg.secret())) return Response.json({ error: 'unauthorized' }, { status: 401 });

  if (req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    const week = /^\d{4}-\d{2}-\d{2}$/.test(body.semana || '') ? body.semana : weekId();
    const accion = body.accion;
    if (accion === 'investigar' || accion === 'forzar') {
      await runInBackground('blog-investigar-background', { week, force: accion === 'forzar' });
      return Response.json({ ok: true, week, msg: 'Investigación lanzada. El correo con las 5 ideas llegará en unos minutos.' });
    }
    if (accion === 'redactar') {
      await runInBackground('blog-redactar-background', { week });
      return Response.json({ ok: true, week, msg: 'Redacción lanzada.' });
    }
    return Response.json({ error: 'accion_no_valida' }, { status: 400 });
  }

  if (req.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });

  const current = weekId();
  const store = getStore({ name: 'blog-machine', consistency: 'strong' });
  const { blobs } = await store.list({ prefix: 'semana/' });
  const weeks = blobs.map((b) => b.key.replace('semana/', '')).sort().reverse().slice(0, 8);
  const history = [];
  for (const w of weeks) history.push(summary(await getWeek(w)));

  return Response.json({
    now: new Date().toISOString(),
    currentWeek: current,
    publishDates: publishDates(current),
    current: summary(await getWeek(current)),
    history: history.filter(Boolean),
    config: {
      model: cfg.model(),
      emailTo: cfg.emailTo(),
      ready: Boolean(cfg.anthropicKey() && cfg.secret() && cfg.githubToken()),
    },
  });
};
