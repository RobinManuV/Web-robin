// /api/blog-admin?clave=<BLOG_SECRET>&accion=investigar|redactar|estado[&s=<semana>][&force=1]
// Para lanzar la máquina a mano (por ejemplo, la primera vez, para probar).
import { cfg } from '../lib/blog/config.mjs';
import { weekId } from '../lib/blog/dates.mjs';
import { getWeek } from '../lib/blog/store.mjs';
import { runInBackground } from '../lib/blog/pipeline.mjs';

export default async (req) => {
  const url = new URL(req.url);
  if (!cfg.secret() || url.searchParams.get('clave') !== cfg.secret()) return new Response('No autorizado', { status: 401 });
  const week = url.searchParams.get('s') || weekId();
  const accion = url.searchParams.get('accion') || 'estado';

  if (accion === 'investigar') {
    await runInBackground('blog-investigar-background', { week, force: url.searchParams.get('force') === '1' });
    return Response.json({ ok: true, week, msg: 'Investigación lanzada: el correo llegará en unos minutos' });
  }
  if (accion === 'redactar') {
    await runInBackground('blog-redactar-background', { week });
    return Response.json({ ok: true, week, msg: 'Redacción lanzada' });
  }
  const data = await getWeek(week);
  return Response.json({
    week,
    status: data?.status || 'sin datos',
    ideas: data?.ideas?.map((i) => i.title),
    selection: data?.selection,
    drafts: Object.fromEntries(Object.entries(data?.drafts || {}).map(([k, d]) => [k, { status: d.status, title: d.article?.title, url: d.url, error: d.error }])),
    log: data?.log?.slice(-15),
  });
};
