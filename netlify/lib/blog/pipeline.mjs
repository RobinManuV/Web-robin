// ============================================================
// Máquina de blogs: los tres pasos de cada semana.
//   1. investigar(week)  → lunes: 5 ideas + correo con enlace para elegir
//   2. redactar(week)    → tras elegir: 2 borradores + correo con vista previa
//   3. publicar(week, slot) → miércoles / viernes: commit a GitHub (Netlify publica)
// ============================================================
import { cfg, missingConfig } from './config.mjs';
import { previousWeekRange, publishDates, todayMadrid, humanDate } from './dates.mjs';
import { getWeek, saveWeek, log, pastIdeaTitles } from './store.mjs';
import { askJson } from './claude.mjs';
import { SYSTEM_INVESTIGAR, promptInvestigar, SYSTEM_REDACTAR, promptRedactar, internalLinks, existingPostSlugs } from './prompts.mjs';
import { sendMail } from './mail.mjs';
import { emailIdeas, emailDrafts, emailSimple, esc } from './views.mjs';
import { link } from './sign.mjs';
import { findPhoto, trackDownload } from './unsplash.mjs';
import { bodyWithImages, buildMarkdown, slugify } from './article.mjs';
import { freeSlug, commitFile } from './github.mjs';

export const SLOTS = ['miercoles', 'viernes'];

async function notifyError(week, step, err) {
  console.error(`[blog ${week}] ${step}:`, err);
  await sendMail(
    emailSimple(
      `Blog Robin · Error en ${step} (${week})`,
      `Algo ha fallado en: ${step}`,
      `<p>${esc(err.message || String(err))}</p><p>Revisa los registros de las funciones en Netlify.</p>`,
    ),
  ).catch(() => {});
}

// ---------- 1. Investigar ----------
export async function investigar(week, { force = false } = {}) {
  const missing = missingConfig(['anthropic', 'secret']);
  if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);

  const existing = await getWeek(week);
  if (existing && !force && existing.status !== 'error') {
    console.log(`[blog ${week}] ya investigada (${existing.status}), no se repite`);
    return existing;
  }

  const range = previousWeekRange(week);
  const data = { week, range, createdAt: new Date().toISOString(), status: 'investigando', ideas: [], log: [] };
  log(data, 'Investigación iniciada');
  await saveWeek(data);

  try {
    const [pastTitles, existingPosts] = await Promise.all([pastIdeaTitles(), existingPostSlugs()]);
    const { json, searches } = await askJson({
      system: SYSTEM_INVESTIGAR,
      prompt: promptInvestigar({ range, pastTitles, existingPosts }),
      maxSearches: 15,
      maxTokens: 8000,
    });
    const ideas = (json.ideas || []).slice(0, 5);
    if (ideas.length < 5) throw new Error(`Solo se encontraron ${ideas.length} ideas`);
    Object.assign(data, { status: 'ideas', summary: json.summary || '', ideas });
    log(data, `5 ideas listas (${searches} búsquedas)`);
    await saveWeek(data);

    await sendMail(
      emailIdeas({ week, range, summary: data.summary, ideas, dates: publishDates(week), chooseUrl: link('/api/blog-elegir', week) }),
    );
    log(data, 'Correo de ideas enviado');
    return saveWeek(data);
  } catch (err) {
    data.status = 'error';
    data.error = err.message;
    log(data, `Error: ${err.message}`);
    await saveWeek(data);
    await notifyError(week, 'la investigación del lunes', err);
    throw err;
  }
}

// ---------- 2. Redactar ----------
export async function redactar(week) {
  const data = await getWeek(week);
  if (!data?.selection) throw new Error('No hay ideas elegidas para esta semana');
  const dates = publishDates(week);
  const links = await internalLinks();
  const usedPhotos = new Set();
  data.status = 'redactando';
  data.drafts = data.drafts || {};

  for (const slot of SLOTS) {
    const idx = data.selection[slot];
    if (idx === undefined || idx === null) continue;
    const prev = data.drafts[slot];
    if (prev && prev.ideaIndex === idx && ['pendiente', 'parado', 'publicado'].includes(prev.status)) continue; // ya hecho
    const draft = { ideaIndex: idx, publishOn: dates[slot], status: 'redactando' };
    data.drafts[slot] = draft;
    log(data, `Redactando ${slot}: ${data.ideas[idx].title}`);
    await saveWeek(data);

    try {
      const { json: article, searches } = await askJson({
        system: SYSTEM_REDACTAR,
        prompt: promptRedactar({ idea: data.ideas[idx], publishOn: humanDate(dates[slot]), internalLinks: links }),
        maxSearches: 10,
        maxTokens: 16000,
      });
      if (!article.body || !article.title) throw new Error('El artículo llegó incompleto');

      const hero = await findPhoto(article.heroImage?.query, usedPhotos);
      const photos = {};
      for (const img of article.images || []) photos[img.marker] = await findPhoto(img.query, usedPhotos);
      const body = bodyWithImages(article.body, article.images, photos);

      Object.assign(draft, {
        status: 'pendiente',
        slug: slugify(article.slug || article.title),
        article,
        hero: hero ? { ...hero, alt: article.heroImage?.alt || article.title } : null,
        photos,
        body,
        bodyHtmlSource: body,
        searches,
      });
      log(data, `Borrador ${slot} listo (${searches} búsquedas)`);
    } catch (err) {
      Object.assign(draft, { status: 'error', error: err.message });
      log(data, `Error redactando ${slot}: ${err.message}`);
    }
    await saveWeek(data);
  }

  data.status = 'borradores';
  await saveWeek(data);
  await sendMail(
    emailDrafts({
      week,
      drafts: data.drafts,
      previewUrl: (slot, accion) => link('/api/blog-borrador', week, { d: slot, ...(accion ? { accion } : {}) }),
    }),
  );
  log(data, 'Correo de borradores enviado');
  return saveWeek(data);
}

// ---------- 3. Publicar ----------
export async function publicar(week, slot, { now = false } = {}) {
  const data = await getWeek(week);
  const draft = data?.drafts?.[slot];
  if (!draft) return { skipped: 'sin borrador' };
  if (draft.status !== 'pendiente') return { skipped: `estado ${draft.status}` };
  if (missingConfig(['github']).length) throw new Error('Falta GITHUB_TOKEN');

  try {
    const date = now ? todayMadrid() : draft.publishOn;
    const slug = await freeSlug(draft.slug);
    const markdown = buildMarkdown({ article: draft.article, body: draft.body, hero: draft.hero, date });
    await commitFile(`src/content/blog/${slug}.md`, markdown, `Blog: ${draft.article.title}`);

    await Promise.all([trackDownload(draft.hero), ...Object.values(draft.photos || {}).map(trackDownload)]);
    Object.assign(draft, { status: 'publicado', slug, publishedAt: new Date().toISOString(), url: `${cfg.siteUrl()}/blog/${slug}/` });
    log(data, `Publicado ${slot}: ${draft.url}`);
    await saveWeek(data);

    await sendMail(
      emailSimple(
        `Blog Robin · Publicado: ${draft.article.title}`,
        'Blog publicado',
        `<p><strong>${esc(draft.article.title)}</strong></p><p>Estará en la web en un par de minutos, cuando Netlify termine de publicar:</p><p><a href="${esc(draft.url)}">${esc(draft.url)}</a></p>`,
      ),
    );
    return { published: draft.url };
  } catch (err) {
    draft.status = 'error';
    draft.error = err.message;
    await saveWeek(data);
    await notifyError(week, `la publicación del ${slot}`, err);
    throw err;
  }
}

// Llama a una función en segundo plano (hasta 15 min) desde otra función
export async function runInBackground(name, payload) {
  const base = (process.env.URL || cfg.siteUrl()).replace(/\/+$/, '');
  const res = await fetch(`${base}/.netlify/functions/${name}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-blog-secret': cfg.secret() },
    body: JSON.stringify(payload),
  });
  if (res.status >= 400) throw new Error(`No se pudo lanzar ${name}: ${res.status}`);
}
