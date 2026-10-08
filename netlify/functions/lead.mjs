// POST /api/lead → guarda el lead en la Main Database de Notion con su etiqueta de origen.
// La web llama a esta función directamente al enviar cualquier formulario, así que
// no depende de que Netlify Forms esté configurado. (Netlify Forms se sigue usando
// en paralelo solo para los avisos por email y como copia.)
import { createLead } from '../lib/notion.mjs';
import { pingAnalytics } from '../lib/analytics-ping.mjs';
import { saveCrmLead } from '../lib/crm-lead.mjs';

const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const normalizedName = (v) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
const isBlockedName = (v) => normalizedName(v).replace(/[^a-z0-9]/g, '') === 'robertnat';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let d;
  try {
    const type = req.headers.get('content-type') || '';
    d = type.includes('application/json') ? await req.json() : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch {
    return Response.json({ error: 'Datos no válidos' }, { status: 400 });
  }

  if (d['bot-field'] || d.website) return Response.json({ ok: true }); // bot
  const form = clean(d['form-name'] || d.form || 'contacto', 40);
  const name = clean(d.nombre || d.name, 120);
  const email = clean(d.email, 160).toLowerCase();
  if (!isEmail(email)) return Response.json({ error: 'Email no válido' }, { status: 400 });

  // Filtro de prueba/anti-spam: responder como correcto, pero no persistir ni notificar.
  if (isBlockedName(name)) return Response.json({ ok: true, filtered: true });

  // La newsletter no es un lead comercial (se puede activar con NOTION_NEWSLETTER=true)
  if (form === 'newsletter' && process.env.NOTION_NEWSLETTER !== 'true') {
    return Response.json({ ok: true, notion: 'omitido' });
  }

  try {
    const lead = {
      form,
      tag: clean(d.tag || form, 80),
      name,
      email,
      phone: clean(d.telefono || d.phone, 40),
      servicio: clean(d.servicio, 80),
      curso: clean(d.curso, 60),
      cargo: clean(d.cargo, 120),
      colegio: clean(d.colegio, 160),
      message: clean(d.mensaje || d.message, 3000),
      page: clean(d.pagina, 200),
    };

    // Los formularios comerciales se guardan en CRM. La newsletter sigue siendo
    // una suscripción, no un lead comercial.
    if (form !== 'newsletter') await saveCrmLead(lead);

    const res = await createLead(lead);
    // Aviso anónimo al panel "Web" del gestor (qué formulario se usa); no bloquea la respuesta si falla
    await pingAnalytics('lead', { form, tag: d.tag || form, page: d.pagina, vid: d.vid });
    if (res.skipped) {
      console.error('[lead] Notion sin configurar (NOTION_TOKEN / NOTION_DATABASE_ID)');
      return Response.json({ ok: false, error: 'Notion sin configurar' }, { status: 503 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[lead] Error Notion:', err.message);
    const hint = /object_not_found|Could not find database/i.test(err.message)
      ? 'La base de datos no está compartida con la integración de Notion'
      : /unauthorized|API token is invalid/i.test(err.message)
        ? 'NOTION_TOKEN no válido'
        : 'Error al guardar en Notion';
    return Response.json({ ok: false, error: hint }, { status: 502 });
  }
};
