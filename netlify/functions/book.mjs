// POST /api/book → crea la reunión en Google Calendar (con Meet) en el
// calendario de la persona libre, invita al alumno y guarda el lead en Notion.
import { getHosts, busyByHost, createMeeting } from '../lib/google-calendar.mjs';
import { candidateSlots, freeSlots, pickHost, config } from '../lib/slots.mjs';
import { createLead } from '../lib/notion.mjs';

const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function madridLocalIso(date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(date).map((x) => [x.type, x.value]),
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'JSON inválido' }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true }); // honeypot: bot

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const tag = clean(body.tag || 'general', 80);
  const page = clean(body.page, 200);
  const start = Date.parse(body.start);

  if (!name || !isEmail(email) || !phone || !Number.isFinite(start) || !body.consent) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const hosts = getHosts();
  if (!hosts.length) return Response.json({ error: 'Reservas sin configurar' }, { status: 503 });

  // El hueco tiene que ser uno de los ofrecidos y seguir libre ahora mismo
  const candidate = candidateSlots().find((s) => s.start === start);
  if (!candidate) return Response.json({ error: 'Horario no válido' }, { status: 409 });

  const busy = await busyByHost(hosts, new Date(candidate.start - 86400e3 / 2), new Date(candidate.end + 86400e3 / 2));
  const [slot] = freeSlots([candidate], hosts, busy);
  if (!slot) return Response.json({ error: 'Ocupado' }, { status: 409 });

  const host = pickHost(slot.hosts, busy, slot.start);
  const startDate = new Date(slot.start);
  const endDate = new Date(slot.start + config().slotMin * 60e3);

  let event;
  try {
    event = await createMeeting({
      host,
      start: startDate,
      end: endDate,
      attendee: { email, name },
      summary: `Consulta gratuita Project Robin · ${name}`,
      description: [
        `Primera consulta gratuita (30 min) reservada desde la web.`,
        ``,
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        `Origen: ${tag}${page ? ` (${page})` : ''}`,
        message ? `\nMensaje:\n${message}` : '',
      ].join('\n'),
    });
  } catch (err) {
    console.error('[book] Error creando el evento:', err?.response?.data || err);
    return Response.json({ error: 'No se pudo crear la reunión' }, { status: 502 });
  }

  const meetingLink =
    event.hangoutLink || event.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri || '';

  // Notion no debe bloquear la reserva: si falla, queda en el log
  try {
    await createLead({
      name, email, phone, message, tag, page,
      form: 'reserva',
      host: host.name,
      meetingStart: madridLocalIso(startDate),
      meetingLink,
    });
  } catch (err) {
    console.error('[book] Notion:', err.message);
  }

  return Response.json({ ok: true, host: host.name.split(' ')[0], start: startDate.toISOString(), meetingLink });
};
