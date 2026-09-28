// /api/blog-elegir?s=<semana>&t=<firma> — página del correo del lunes para elegir los 2 blogs.
import { verify, link } from '../lib/blog/sign.mjs';
import { getWeek, saveWeek, log } from '../lib/blog/store.mjs';
import { publishDates } from '../lib/blog/dates.mjs';
import { pageChoose, pageMessage } from '../lib/blog/views.mjs';
import { runInBackground } from '../lib/blog/pipeline.mjs';

const html = (body, status = 200) => new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });

export default async (req) => {
  const url = new URL(req.url);
  const week = url.searchParams.get('s');
  if (!verify(week, url.searchParams.get('t'))) return html(pageMessage('Enlace no válido', 'Este enlace ha caducado o no es correcto.'), 403);

  const data = await getWeek(week);
  if (!data?.ideas?.length) return html(pageMessage('Sin ideas', 'Todavía no hay ideas para esta semana.'), 404);
  const dates = publishDates(week);

  if (req.method === 'POST') {
    const form = new URLSearchParams(await req.text());
    const miercoles = Number(form.get('miercoles'));
    const viernes = Number(form.get('viernes'));
    const valid = (n) => Number.isInteger(n) && n >= 0 && n < data.ideas.length;
    if (!valid(miercoles) || !valid(viernes) || miercoles === viernes) {
      return html(pageMessage('Revisa tu elección', 'Elige dos ideas distintas, una para el miércoles y otra para el viernes. <a href="javascript:history.back()">Volver</a>'), 400);
    }
    const published = Object.values(data.drafts || {}).some((d) => d.status === 'publicado');
    if (published) return html(pageMessage('Ya hay un blog publicado', 'Esta semana ya se ha publicado un blog, así que no se puede cambiar la elección.'), 409);

    data.selection = { miercoles, viernes };
    data.status = 'redactando';
    log(data, `Elegidas: miércoles ${miercoles + 1}, viernes ${viernes + 1}`);
    await saveWeek(data);
    await runInBackground('blog-redactar-background', { week });
    return html(
      pageMessage(
        '¡Hecho! Redactando…',
        `Claude está escribiendo los dos artículos: <strong>${data.ideas[miercoles].title}</strong> (miércoles) y <strong>${data.ideas[viernes].title}</strong> (viernes). En unos 10 minutos te llega un correo con los borradores.`,
      ),
    );
  }

  return html(pageChoose({ week, ideas: data.ideas, dates, action: link('/api/blog-elegir', week), selection: data.selection }));
};
