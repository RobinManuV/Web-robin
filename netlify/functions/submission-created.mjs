// Se ejecuta automáticamente cada vez que Netlify recibe un formulario
// (evento "submission-created"). Envía el lead a la Main Database de Notion
// con su etiqueta de origen. El aviso por email lo hace Netlify
// (Forms → Form notifications).
import { createLead } from '../lib/notion.mjs';

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 400, body: 'Bad payload' };
  }
  const form = payload.form_name;
  const d = payload.data || {};

  // La newsletter no es un lead comercial: se queda solo en Netlify Forms
  if (form === 'newsletter' && process.env.NOTION_NEWSLETTER !== 'true') {
    return { statusCode: 200, body: 'newsletter: no se envía a Notion' };
  }

  try {
    const res = await createLead({
      form,
      tag: d.tag || form,
      name: d.nombre || d.name,
      email: d.email,
      phone: d.telefono || d.phone,
      servicio: d.servicio,
      cargo: d.cargo,
      colegio: d.colegio,
      message: d.mensaje || d.message,
      page: d.pagina || payload.site_url,
    });
    console.log('[submission-created] Notion OK', form, d.tag, res.id || res);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('[submission-created] Notion error', err.message);
    return { statusCode: 500, body: 'notion error' };
  }
};
