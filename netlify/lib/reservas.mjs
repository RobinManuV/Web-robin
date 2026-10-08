// Avisos de las reservas de la primera consulta.
//  - Al reservar: aviso inmediato a hello@project-robin.com.
//  - 2 horas antes de la llamada: recordatorio a hello@ y al alumno
//    (lo envía la función programada recordatorios-reservas.mjs).
// Las reservas pendientes se guardan en Netlify Blobs (almacén "reservas").
import { getStore } from '@netlify/blobs';
import { sendMail } from './blog/mail.mjs';

export const AVISO_EQUIPO = process.env.BOOKING_NOTIFY_EMAIL || 'hello@project-robin.com';
export const RECORDATORIO_HORAS = 2;
const TZ = 'Europe/Madrid';

let override = null;
export const _usarAlmacen = (s) => (override = s); // solo para pruebas
const store = () => override || getStore({ name: 'reservas', consistency: 'strong' });
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const fecha = (ms) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(new Date(ms));

function filas(r) {
  return [
    ['Cuándo', `${fecha(r.start)} (hora de Madrid)`],
    ['Nombre', r.name],
    ['Email', r.email],
    ['Teléfono', r.phone],
    ['Curso', r.curso],
    ['Con', r.host],
    ['Origen', r.tag],
    ['Mensaje', r.message],
    ['Enlace Meet', r.meetingLink],
  ].filter(([, v]) => v);
}
const tabla = (r) =>
  `<table style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif">${filas(r)
    .map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#667"><b>${esc(k)}</b></td><td style="padding:4px 0">${esc(v)}</td></tr>`)
    .join('')}</table>`;
const texto = (r) => filas(r).map(([k, v]) => `${k}: ${v}`).join('\n');

// Guarda la reserva y avisa al equipo. Nunca debe romper la reserva: quien llama captura el error.
export async function registrarReserva(r) {
  const id = `${r.start}-${String(r.email).replace(/[^a-z0-9]/gi, '')}`.slice(0, 120);
  const reserva = { ...r, id, recordatorioEnviado: false, creada: Date.now() };
  const errores = [];
  try {
    await store().setJSON(`reserva/${id}`, reserva);
  } catch (e) {
    errores.push(`guardar: ${e.message}`);
  }
  try {
    await sendMail({
      to: AVISO_EQUIPO,
      fromName: 'Reservas Robin',
      subject: `Nueva reserva: ${r.name} · ${fecha(r.start)}`,
      html: `<p>Hay una nueva reserva de consulta gratuita:</p>${tabla(r)}`,
      text: `Nueva reserva de consulta gratuita\n\n${texto(r)}`,
    });
  } catch (e) {
    errores.push(`aviso: ${e.message}`);
  }
  if (errores.length) throw new Error(errores.join(' | '));
}

// Recordatorios pendientes: llamadas que empiezan dentro de 2 h (o menos) y aún no se han avisado.
export async function enviarRecordatorios(now = Date.now()) {
  const s = store();
  const { blobs } = await s.list({ prefix: 'reserva/' });
  let enviados = 0;
  for (const { key } of blobs) {
    const r = await s.get(key, { type: 'json' });
    if (!r) continue;
    if (r.start < now - 24 * 3600e3) {
      await s.delete(key); // limpieza de reservas pasadas
      continue;
    }
    if (r.recordatorioEnviado || r.start <= now || r.start - now > RECORDATORIO_HORAS * 3600e3) continue;
    const cuando = fecha(r.start);
    const meet = r.meetingLink ? `<p><a href="${esc(r.meetingLink)}">Entrar a la videollamada</a></p>` : '';
    try {
      await sendMail({
        to: AVISO_EQUIPO,
        fromName: 'Reservas Robin',
        subject: `En 2 horas: consulta con ${r.name} · ${cuando}`,
        html: `<p>Recordatorio: la consulta empieza en unas 2 horas.</p>${tabla(r)}`,
        text: `Recordatorio: la consulta empieza en unas 2 horas.\n\n${texto(r)}`,
      });
      await sendMail({
        to: r.email,
        fromName: 'Project Robin',
        subject: `Tu consulta con Project Robin es en 2 horas (${cuando})`,
        html: `<p>Hola ${esc(String(r.name).split(' ')[0])},</p><p>Te recordamos que tu primera consulta gratuita con Project Robin es <b>${esc(cuando)}</b> (hora de Madrid).</p>${meet}<p>Si no puedes asistir, responde a este correo y buscamos otro hueco.</p><p>¡Hasta ahora!<br>El equipo de Robin</p>`,
        text: `Hola ${String(r.name).split(' ')[0]},\n\nTe recordamos que tu primera consulta gratuita con Project Robin es ${cuando} (hora de Madrid).\n${r.meetingLink ? `Enlace: ${r.meetingLink}\n` : ''}\nSi no puedes asistir, responde a este correo y buscamos otro hueco.\n\nEl equipo de Robin`,
      });
      await s.setJSON(key, { ...r, recordatorioEnviado: true, recordatorioAt: Date.now() });
      enviados++;
    } catch (e) {
      console.error('[recordatorios]', key, e.message); // se reintenta en la siguiente ejecución
    }
  }
  return enviados;
}
