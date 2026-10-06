// Aviso anónimo al panel "Web" del gestor cuando alguien envía un formulario o reserva.
// No lleva nombre, email ni teléfono: solo qué formulario, desde qué página y, si el
// visitante aceptó la analítica, su identificador aleatorio (para ver su recorrido).
// Sirve para saber qué formularios se usan más (cuenta el 100 % de envíos, no solo los
// de quien acepta cookies, porque no identifica a nadie).
// Variables: ANALYTICS_ENDPOINT (URL de web-collect en el gestor) y ANALYTICS_SERVER_SECRET.

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);

export async function pingAnalytics(type, { form, tag, page, vid } = {}) {
  const url = process.env.ANALYTICS_ENDPOINT || process.env.PUBLIC_ANALYTICS_ENDPOINT || 'https://robin-admin-platform.netlify.app/api/web/collect';
  const secret = process.env.ANALYTICS_SERVER_SECRET;
  if (!url || !secret) return;
  const body = {
    v: 1,
    server: true,
    vid: /^[\w-]{8,64}$/.test(vid || '') ? vid : null,
    path: clean(page, 200) || null,
    events: [{ type, t: Date.now(), form: clean(form, 40), form_tag: clean(tag, 80) }],
  };
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', 'x-robin-analytics-secret': secret },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    });
  } catch (err) {
    console.error('[analytics-ping]', err.message);
  }
}
