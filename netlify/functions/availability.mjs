// GET /api/availability → huecos libres de los próximos días.
// Solo aparecen huecos en los que el calendario de hello@project-robin.com está libre.
import { getHosts, busyByHost, lastErrors, serviceAccountEmail } from '../lib/google-calendar.mjs';
import { candidateSlots, freeSlots, config } from '../lib/slots.mjs';

export default async (req) => {
  const debug = new URL(req.url).searchParams.get('debug') === '1';
  const hosts = getHosts();
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return Response.json({ error: 'Reservas sin configurar' }, { status: 503 });
  }
  try {
    const now = new Date();
    const candidates = candidateSlots(now);
    if (!candidates.length) return Response.json({ slots: [] });
    const timeMin = new Date(candidates[0].start);
    const timeMax = new Date(candidates[candidates.length - 1].end);
    const busy = await busyByHost(hosts, timeMin, timeMax);
    const slots = freeSlots(candidates, hosts, busy).map((s) => ({
      start: new Date(s.start).toISOString(),
      end: new Date(s.end).toISOString(),
    }));
    const failed = hosts.filter((h) => busy[h.email] === null).map((h) => h.email);
    const body = { slots, slotMinutes: config().slotMin, timezone: 'Europe/Madrid' };
    if (debug) {
      // Diagnóstico sin datos sensibles: qué calendario falla y por qué
      body.debug = {
        calendarios: hosts.map((h) => h.email),
        cuentaServicio: serviceAccountEmail(),
        claveEmpiezaBien: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').includes('BEGIN PRIVATE KEY'),
        huecosTeoricos: candidates.length,
        errores: Object.fromEntries(failed.map((e) => [e, lastErrors[e] || 'desconocido'])),
      };
    }
    return Response.json(body, { headers: { 'Cache-Control': failed.length || debug ? 'no-store' : 'public, max-age=60' } });
  } catch (err) {
    console.error('[availability]', err);
    return Response.json({ error: 'No se pudo leer la agenda' }, { status: 502 });
  }
};
