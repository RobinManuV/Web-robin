// /api/blog-borrador?s=<semana>&t=<firma>&d=<miercoles|viernes>[&accion=parar|reanudar|publicar]
// Vista previa del borrador y botones para pararlo, reactivarlo o publicarlo ya.
import { verify, link } from '../lib/blog/sign.mjs';
import { getWeek, saveWeek, log } from '../lib/blog/store.mjs';
import { pagePreview, pageMessage } from '../lib/blog/views.mjs';
import { publicar, SLOTS } from '../lib/blog/pipeline.mjs';

const html = (body, status = 200) => new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });

export default async (req) => {
  const url = new URL(req.url);
  const week = url.searchParams.get('s');
  const slot = url.searchParams.get('d');
  const accion = url.searchParams.get('accion');
  if (!verify(week, url.searchParams.get('t')) || !SLOTS.includes(slot)) {
    return html(pageMessage('Enlace no válido', 'Este enlace ha caducado o no es correcto.'), 403);
  }

  const data = await getWeek(week);
  const draft = data?.drafts?.[slot];
  if (!draft) return html(pageMessage('Sin borrador', 'Todavía no hay borrador para este día.'), 404);

  if (accion === 'parar' && draft.status === 'pendiente') {
    draft.status = 'parado';
    log(data, `Parado ${slot}`);
    await saveWeek(data);
  } else if (accion === 'reanudar' && draft.status === 'parado') {
    draft.status = 'pendiente';
    log(data, `Reactivado ${slot}`);
    await saveWeek(data);
  } else if (accion === 'publicar' && ['pendiente', 'parado'].includes(draft.status)) {
    draft.status = 'pendiente';
    await saveWeek(data);
    await publicar(week, slot, { now: true });
  }

  const fresh = (await getWeek(week)).drafts[slot];
  const links = {
    parar: link('/api/blog-borrador', week, { d: slot, accion: 'parar' }),
    reanudar: link('/api/blog-borrador', week, { d: slot, accion: 'reanudar' }),
    publicar: link('/api/blog-borrador', week, { d: slot, accion: 'publicar' }),
  };
  if (fresh.status === 'error') return html(pageMessage('Este borrador falló', fresh.error || 'Error desconocido'));
  return html(pagePreview({ draft: fresh, slot, links }));
};
