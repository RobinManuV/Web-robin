// /api/blog-panel — panel de control de la máquina de blogs (pide la contraseña BLOG_PANEL_PASSWORD).
// Muestra el estado de la semana, el registro y botones para lanzar la investigación.
// Se actualiza sola cada 10 segundos mientras hay trabajo en curso.
import { cfg, missingConfig } from '../lib/blog/config.mjs';
import { weekId } from '../lib/blog/dates.mjs';
import { getWeek } from '../lib/blog/store.mjs';
import { runInBackground } from '../lib/blog/pipeline.mjs';
import { page, esc } from '../lib/blog/views.mjs';
import { link } from '../lib/blog/sign.mjs';

const html = (body, status = 200) => new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });

import { createHmac, timingSafeEqual } from 'node:crypto';

// Contraseña del panel: variable BLOG_PANEL_PASSWORD en Netlify (no va en el código).
// Tras entrar, se guarda una cookie de sesión de 30 días para no pedirla cada vez.
const password = () => process.env.BLOG_PANEL_PASSWORD || '';
const COOKIE = 'robin_blog_panel';
const sessionToken = () => createHmac('sha256', `${cfg.secret()}|${password()}`).update('panel').digest('base64url');
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const cookieOk = (req) => {
  const m = (req.headers.get('cookie') || '').match(new RegExp(`${COOKIE}=([^;]+)`));
  return Boolean(password() && m && same(m[1], sessionToken()));
};
const loginPage = (msg = '') =>
  page(
    'Panel',
    `<div class="card"><h1>Panel de la máquina de blogs</h1>${msg ? `<p style="color:#b42318">${msg}</p>` : ''}
<form method="POST" action="/api/blog-panel"><input type="hidden" name="accion" value="login">
<p>Contraseña:</p><p><input name="password" type="password" autofocus style="padding:10px;font-size:16px;width:100%;max-width:360px"></p>
<p><button class="btn">Entrar</button></p></form></div>`,
  );

export default async (req) => {
  const url = new URL(req.url);
  if (!password() || !cfg.secret()) {
    return html(page('Panel', '<div class="card"><h1>Panel sin configurar</h1><p>Faltan las variables BLOG_PANEL_PASSWORD y/o BLOG_SECRET en Netlify.</p></div>'), 503);
  }

  // Formularios (login y acciones)
  const form = req.method === 'POST' ? new URLSearchParams(await req.text()) : null;
  if (form?.get('accion') === 'login') {
    if (!same(String(form.get('password') || ''), password())) return html(loginPage('Contraseña incorrecta.'), 401);
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/api/blog-panel',
        'Set-Cookie': `${COOKIE}=${sessionToken()}; Path=/api/blog-panel; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
      },
    });
  }
  if (form?.get('accion') === 'salir') {
    return new Response(null, { status: 303, headers: { Location: '/api/blog-panel', 'Set-Cookie': `${COOKIE}=; Path=/api/blog-panel; Max-Age=0` } });
  }
  if (!cookieOk(req)) return html(loginPage(), 401);

  const week = url.searchParams.get('s') || weekId();
  const self = (extra = '') => `/api/blog-panel?s=${week}${extra}`;

  let aviso = '';
  if (form) {
    const accion = form.get('accion');
    try {
      if (accion === 'investigar' || accion === 'forzar') {
        await runInBackground('blog-investigar-background', { week, force: accion === 'forzar' });
        aviso = 'Investigación lanzada. Esta página se actualiza sola.';
      } else if (accion === 'redactar') {
        await runInBackground('blog-redactar-background', { week });
        aviso = 'Redacción lanzada.';
      }
    } catch (err) {
      aviso = `No se pudo lanzar: ${esc(err.message)}`;
    }
    return new Response(null, { status: 303, headers: { Location: self(`&aviso=${encodeURIComponent(aviso)}`) } });
  }
  aviso = url.searchParams.get('aviso') || '';

  const data = await getWeek(week);
  const status = data?.status || 'sin datos';
  const working = ['investigando', 'redactando'].includes(status) || /lanzada/.test(aviso);
  const faltan = missingConfig(['anthropic', 'secret', 'github', 'unsplash']);
  const google = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;

  const check = (ok, label) => `<li>${ok ? '✅' : '❌'} ${label}</li>`;
  const drafts = Object.entries(data?.drafts || {})
    .map(
      ([slot, d]) =>
        `<li><strong>${slot}</strong>: ${esc(d.status)} ${d.article?.title ? `— ${esc(d.article.title)}` : ''} ${
          d.status !== 'error' && d.article ? `· <a href="${esc(link('/api/blog-borrador', week, { d: slot }))}">ver borrador</a>` : ''
        } ${d.url ? `· <a href="${esc(d.url)}">publicado</a>` : ''} ${d.error ? `<br><span style="color:#b42318">${esc(d.error)}</span>` : ''}</li>`,
    )
    .join('');

  const body = `
${working ? '<meta http-equiv="refresh" content="10">' : ''}
<div class="card"><h1>Panel de la máquina de blogs</h1>
<p>Semana del <strong>${esc(week)}</strong> · Estado: <span class="status">${esc(status)}</span> ${working ? '· <em>trabajando… (se actualiza cada 10 s)</em>' : ''}</p>
${aviso ? `<p style="background:#fbefdb;padding:10px 14px;border-radius:10px">${esc(aviso)}</p>` : ''}
${data?.error ? `<p style="color:#b42318"><strong>Error:</strong> ${esc(data.error)}</p>` : ''}
<form method="POST" action="${esc(self())}" style="display:flex;gap:10px;flex-wrap:wrap">
  ${!data || status === 'error' ? '<button class="btn" name="accion" value="investigar">Lanzar investigación ahora</button>' : '<button class="btn out" name="accion" value="forzar">Repetir investigación</button>'}
  ${data?.selection ? '<button class="btn out" name="accion" value="redactar">Volver a redactar</button>' : ''}
  ${data?.ideas?.length ? `<a class="btn out" href="${esc(link('/api/blog-elegir', week))}">Elegir ideas</a>` : ''}
  <button class="btn out" name="accion" value="salir" style="margin-left:auto">Salir</button>
</form></div>

<div class="card"><h2>Configuración</h2><ul>
${check(!faltan.includes('anthropic'), 'ANTHROPIC_API_KEY')}
${check(!faltan.includes('secret'), 'BLOG_SECRET')}
${check(true, 'BLOG_PANEL_PASSWORD')}
${check(!faltan.includes('github'), 'GITHUB_TOKEN')}
${check(!faltan.includes('unsplash'), 'UNSPLASH_ACCESS_KEY')}
${check(google || process.env.RESEND_API_KEY, 'Correo (cuenta de servicio de Google o RESEND_API_KEY)')}
</ul><p class="meta">Correos a: ${esc(cfg.emailTo())} · desde: ${esc(cfg.emailFrom())} · modelo: ${esc(cfg.model())}</p></div>

${data?.ideas?.length ? `<div class="card"><h2>Ideas</h2><ol>${data.ideas.map((i) => `<li>${esc(i.title)}</li>`).join('')}</ol></div>` : ''}
${drafts ? `<div class="card"><h2>Borradores</h2><ul>${drafts}</ul></div>` : ''}

<div class="card"><h2>Registro</h2>${
    data?.log?.length
      ? `<ul>${data.log.slice(-25).reverse().map((l) => `<li><span class="meta">${esc(new Date(l.at).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }))}</span> — ${esc(l.msg)}</li>`).join('')}</ul>`
      : '<p class="meta">Todavía no hay actividad esta semana.</p>'
  }</div>`;
  return html(page('Panel', body));
};
