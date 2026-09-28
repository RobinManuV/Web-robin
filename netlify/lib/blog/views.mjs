// Plantillas HTML: correos y páginas de la máquina de blogs (elegir, vista previa, avisos).
import { marked } from 'marked';
import { humanDate } from './dates.mjs';

const NAVY = '#2d3a64';
const ACCENT = '#ecb34f';
const CREAM = '#fcfbf8';

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const btn = (href, label, primary = true) =>
  `<a href="${esc(href)}" style="display:inline-block;padding:12px 22px;border-radius:6px;font-weight:700;text-decoration:none;${
    primary ? `background:${ACCENT};color:${NAVY};` : `border:2px solid ${NAVY};color:${NAVY};`
  }">${esc(label)}</a>`;

function emailShell(title, inner) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:${CREAM};font-family:Inter,Arial,sans-serif;color:${NAVY}">
<div style="max-width:640px;margin:0 auto;padding:28px 18px">
<p style="font-size:26px;font-weight:800;letter-spacing:.02em;margin:0 0 18px">ROBIN · Blog</p>
<div style="background:#fff;border-radius:16px;padding:26px">
<h1 style="font-size:22px;margin:0 0 14px">${esc(title)}</h1>
${inner}
</div>
<p style="font-size:12px;opacity:.7;margin-top:16px">Máquina de blogs de Project Robin · Este correo se envía automáticamente.</p>
</div></body></html>`;
}

// ---------- Correo del lunes: 5 ideas ----------
export function emailIdeas({ week, range, summary, ideas, chooseUrl, dates }) {
  const list = ideas
    .map(
      (i, n) => `<div style="border-top:1px solid #e6e6ea;padding:14px 0">
<p style="margin:0 0 4px;font-size:13px;opacity:.7">IDEA ${n + 1} · ${esc(i.audience || '')} · relevancia ${esc(i.score ?? '')}/10</p>
<p style="margin:0 0 6px;font-size:17px;font-weight:700">${esc(i.title)}</p>
<p style="margin:0 0 6px;font-size:14px;line-height:1.5">${esc(i.angle)}</p>
<p style="margin:0 0 6px;font-size:13px;line-height:1.5"><strong>Por qué ahora:</strong> ${esc(i.whyNow)}</p>
<p style="margin:0;font-size:12px;line-height:1.6">${(i.sources || [])
        .slice(0, 3)
        .map((s) => `<a href="${esc(s.url)}" style="color:${NAVY}">${esc(s.publisher || s.title)}</a>`)
        .join(' · ')}</p>
</div>`,
    )
    .join('');
  const html = emailShell(
    `5 ideas para esta semana (${range.from} → ${range.to})`,
    `<p style="font-size:15px;line-height:1.55;margin:0 0 10px">${esc(summary)}</p>
${list}
<p style="margin:22px 0 8px;font-size:15px">Elige cuál se publica el <strong>${esc(humanDate(dates.miercoles))}</strong> y cuál el <strong>${esc(
      humanDate(dates.viernes),
    )}</strong>:</p>
<p style="margin:0 0 6px">${btn(chooseUrl, 'Elegir los 2 blogs de la semana')}</p>`,
  );
  const text = `5 ideas para la semana ${week}\n\n${summary}\n\n${ideas
    .map((i, n) => `${n + 1}. ${i.title}\n   ${i.angle}\n`)
    .join('\n')}\nElige aquí: ${chooseUrl}`;
  return { subject: `Blog Robin · 5 ideas de la semana (${week})`, html, text };
}

// ---------- Correo con los borradores ----------
export function emailDrafts({ week, drafts, previewUrl }) {
  const rows = Object.entries(drafts)
    .map(([slot, d]) => {
      if (d.status === 'error') {
        return `<p style="color:#b42318"><strong>${esc(humanDate(d.publishOn))}:</strong> no se pudo redactar (${esc(d.error)}).</p>`;
      }
      return `<div style="border-top:1px solid #e6e6ea;padding:14px 0">
<p style="margin:0 0 4px;font-size:13px;opacity:.7">Se publica el ${esc(humanDate(d.publishOn))}</p>
<p style="margin:0 0 10px;font-size:17px;font-weight:700">${esc(d.article?.title)}</p>
<p style="margin:0">${btn(previewUrl(slot), 'Ver borrador')} &nbsp; ${btn(previewUrl(slot, 'parar'), 'Parar', false)}</p>
</div>`;
    })
    .join('');
  const html = emailShell(
    'Tus 2 borradores están listos',
    `<p style="font-size:15px;line-height:1.55;margin:0">Se publicarán solos en su día. Si alguno no te convence, ábrelo y pulsa <strong>Parar</strong>.</p>${rows}`,
  );
  const text = `Borradores de la semana ${week}:\n${Object.entries(drafts)
    .map(([slot, d]) => `- ${d.publishOn}: ${d.article?.title || d.error} → ${previewUrl(slot)}`)
    .join('\n')}`;
  return { subject: `Blog Robin · Borradores listos (${week})`, html, text };
}

export function emailSimple(subject, title, bodyHtml, text) {
  return { subject, html: emailShell(title, bodyHtml), text: text || title };
}

// ---------- Páginas web ----------
export function page(title, inner) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(title)} · Robin Blog</title>
<style>
*{box-sizing:border-box}body{margin:0;background:${CREAM};color:${NAVY};font-family:Inter,system-ui,Arial,sans-serif;line-height:1.5}
.wrap{max-width:860px;margin:0 auto;padding:28px 16px 60px}.brand{font-weight:800;font-size:24px;margin:0 0 18px}
.card{background:#fff;border-radius:16px;padding:22px;margin-bottom:16px;box-shadow:0 8px 30px rgba(45,58,100,.08)}
h1{font-size:26px;margin:0 0 10px}h2{font-size:20px}a{color:${NAVY}}
.btn{display:inline-block;background:${ACCENT};color:${NAVY};border:0;border-radius:6px;padding:12px 22px;font-weight:700;font-size:16px;text-decoration:none;cursor:pointer}
.btn.out{background:#fff;border:2px solid ${NAVY}}.btn.red{background:#b42318;color:#fff}
.idea{border:2px solid #e6e6ea;border-radius:14px;padding:16px;margin:10px 0}.idea h3{margin:0 0 6px;font-size:18px}
.meta{font-size:13px;opacity:.7}.pick{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px}
.pick label{display:flex;gap:6px;align-items:center;font-weight:700;border:2px solid ${NAVY};border-radius:999px;padding:6px 14px;cursor:pointer}
.status{display:inline-block;border-radius:999px;padding:4px 12px;font-weight:700;font-size:13px;background:${ACCENT}}
.status.parado{background:#b42318;color:#fff}.status.publicado{background:#2e7d32;color:#fff}
article img{max-width:100%;border-radius:12px}article table{border-collapse:collapse;width:100%}article td,article th{border:1px solid #ddd;padding:8px}
figure{margin:20px 0}figcaption{font-size:13px;opacity:.75;margin-top:6px}
</style></head><body><div class="wrap"><p class="brand">ROBIN · Blog</p>${inner}</div></body></html>`;
}

export function pageChoose({ week, ideas, dates, action, selection }) {
  const opts = (slot) =>
    ideas
      .map(
        (_, n) =>
          `<label><input type="radio" name="${slot}" value="${n}" ${selection?.[slot] === n ? 'checked' : ''} required> ${n + 1}</label>`,
      )
      .join('');
  return page(
    'Elige los blogs',
    `<div class="card"><h1>Elige los 2 blogs de esta semana</h1>
<p>Marca qué idea se publica el <strong>${esc(humanDate(dates.miercoles))}</strong> y cuál el <strong>${esc(
      humanDate(dates.viernes),
    )}</strong>. En unos 10 minutos te llegan los borradores por correo.</p></div>
${ideas
  .map(
    (i, n) => `<div class="idea"><p class="meta">IDEA ${n + 1} · ${esc(i.audience || '')} · relevancia ${esc(i.score ?? '')}/10</p>
<h3>${esc(i.title)}</h3><p>${esc(i.angle)}</p><p class="meta"><strong>Por qué ahora:</strong> ${esc(i.whyNow)}</p>
<p class="meta">${(i.sources || []).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.publisher || s.title)}</a>`).join(' · ')}</p></div>`,
  )
  .join('')}
<form method="POST" action="${esc(action)}" class="card">
<p><strong>Miércoles:</strong></p><div class="pick">${opts('miercoles')}</div>
<p style="margin-top:18px"><strong>Viernes:</strong></p><div class="pick">${opts('viernes')}</div>
<p style="margin-top:22px"><button class="btn" type="submit">Redactar estos 2 blogs</button></p>
</form>`,
  );
}

export function pagePreview({ draft, slot, links }) {
  const a = draft.article || {};
  const body = marked.parse(draft.bodyHtmlSource || '');
  return page(
    a.title || 'Borrador',
    `<div class="card"><p><span class="status ${esc(draft.status)}">${esc(draft.status)}</span> · Se publica el ${esc(
      humanDate(draft.publishOn),
    )} (${esc(slot)})</p>
<p class="meta">SEO: ${esc(a.seoTitle)} — ${esc(a.description)}</p>
<p style="display:flex;gap:10px;flex-wrap:wrap">
${draft.status === 'parado' ? `<a class="btn" href="${esc(links.reanudar)}">Reactivar</a>` : `<a class="btn red" href="${esc(links.parar)}">Parar</a>`}
${draft.status !== 'publicado' ? `<a class="btn out" href="${esc(links.publicar)}">Publicar ahora</a>` : `<a class="btn out" href="${esc(draft.url)}">Ver publicado</a>`}
</p></div>
<article class="card"><h1>${esc(a.title)}</h1>
${draft.hero ? `<figure><img src="${esc(draft.hero.url)}" alt="${esc(draft.hero.alt)}"><figcaption>${draft.hero.creditHtml}</figcaption></figure>` : ''}
${body}
<h2>Preguntas frecuentes</h2>${(a.faq || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
<h2>Fuentes</h2><ul>${(a.sources || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a> (${esc(s.publisher || '')})</li>`).join('')}</ul>
</article>`,
  );
}

export function pageMessage(title, text) {
  return page(title, `<div class="card"><h1>${esc(title)}</h1><p>${text}</p></div>`);
}
