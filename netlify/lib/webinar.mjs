// Correo de confirmación del registro en el webinar para padres.
// Se envía desde lead.mjs cuando el formulario es "webinar". Si falla, el registro no se pierde.
import { WEBINAR } from '../../src/data/webinar.mjs';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function correoWebinar({ nombre }) {
  const first = String(nombre || '').trim().split(/\s+/)[0] || '';
  const cuando = `${WEBINAR.fechaTexto} a las ${WEBINAR.hora} (${WEBINAR.zona})`;
  const subject = `Ya estás registrado en el webinar para padres · ${WEBINAR.fechaCorta}, ${WEBINAR.hora}`;
  const html = [
    `<p>Hola${first ? ` ${esc(first)}` : ''},</p>`,
    `<p>Ya estás registrado en el <b>webinar para padres</b> de Project Robin: todo lo que necesitas saber para que tu hijo o hija estudie en Holanda.</p>`,
    `<p><b>Cuándo:</b> ${esc(cuando)}<br><b>Quién:</b> los fundadores de Project Robin</p>`,
    `<p>El enlace para entrar se envía por el grupo de WhatsApp el ${esc(WEBINAR.diaEnlace)}. En las semanas previas también compartiremos por ahí información importante, así que únete ahora:</p>`,
    `<p><a href="${esc(WEBINAR.whatsapp)}" style="display:inline-block;background:#ecb34f;color:#2d3a64;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:8px">Unirme al grupo de WhatsApp</a></p>`,
    `<p style="font-size:13px;color:#555">Al unirte al grupo, los demás participantes podrán ver tu número de teléfono. Puedes salir del grupo cuando quieras.</p>`,
    `<p>Si tienes cualquier duda, responde a este correo.</p>`,
    `<p>Hasta pronto,<br>El equipo de Project Robin</p>`,
  ].join('');
  const text = [
    `Hola${first ? ` ${first}` : ''},`,
    '',
    'Ya estás registrado en el webinar para padres de Project Robin: todo lo que necesitas saber para que tu hijo o hija estudie en Holanda.',
    '',
    `Cuándo: ${cuando}`,
    'Quién: los fundadores de Project Robin',
    '',
    `El enlace para entrar se envía por el grupo de WhatsApp el ${WEBINAR.diaEnlace}. En las semanas previas también compartiremos por ahí información importante, así que únete ahora:`,
    WEBINAR.whatsapp,
    '',
    'Al unirte al grupo, los demás participantes podrán ver tu número de teléfono. Puedes salir del grupo cuando quieras.',
    '',
    'Si tienes cualquier duda, responde a este correo.',
    '',
    'Hasta pronto,',
    'El equipo de Project Robin',
  ].join('\n');
  return { subject, html, text };
}
