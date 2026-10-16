// ============================================================
// Traducción de la web (español → inglés y portugués de Portugal).
//
//   node scripts/i18n.mjs build              → crea dist/en/ y dist/pt/ (se ejecuta en `npm run build`)
//   node scripts/i18n.mjs extract [--out f]  → lista las frases sin traducir (hace falta un build antes)
//   node scripts/i18n.mjs merge --pending p.json --in t.json
//                                            → añade traducciones [{id, en, pt}] a los diccionarios
//
// Diccionarios: src/i18n/en.json y src/i18n/pt.json  ({ "frase en español": "traducción" }).
// Una frase sin traducir se queda en español; con I18N_STRICT=1 el build falla.
// ============================================================
import { adaptPtBr } from './i18n/ptbr.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { translate, keysOf, editAttrs } from './i18n/engine.mjs';
import { LANGS, TRANSLATED_LANGS, isTranslatable, ensureSlash, withLang } from '../src/i18n/config.mjs';

const DIST = 'dist';
const SITE = 'https://project-robin.com';
const DICT_DIR = 'src/i18n';

// Páginas escritas directamente en portugués de Portugal (landings de campaña para Portugal).
// Viven en la raíz, sin copias en /en/, /pt/ ni /br/: su texto propio ya está en portugués y solo se
// traduce lo compartido (cabecera, pie, formularios, banner de cookies) con el diccionario pt.
const NATIVE_PT = ['/vaparaaholanda/'];

const readJson = (f, fallback) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : fallback);
const dictOf = (lang) => readJson(path.join(DICT_DIR, `${lang}.json`), {});

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

// Rutas de las páginas en español: "/destinos/delft/" → dist/destinos/delft/index.html
function spanishRoutes() {
  return walk(DIST)
    .filter((f) => f.endsWith(`${path.sep}index.html`))
    .map((f) => '/' + path.relative(DIST, path.dirname(f)).split(path.sep).join('/'))
    .map((r) => (r === '/.' || r === '/' ? '/' : ensureSlash(r)))
    .filter((r) => !/^\/(en|pt|br)(\/|$)/.test(r))
    .filter((r) => !NATIVE_PT.includes(r))
    .sort();
}
const fileOf = (route, lang) => path.join(DIST, lang && lang !== 'es' ? lang : '', route, 'index.html');

// ---------- enlaces ----------
function rewriteHref(value, lang, routes) {
  let v = value.trim();
  let abs = '';
  if (v.startsWith(`${SITE}/`)) {
    abs = SITE;
    v = v.slice(SITE.length);
  }
  if (!v.startsWith('/') || v.startsWith('//')) return value;
  const m = v.match(/^([^?#]*)(.*)$/);
  const p = ensureSlash(m[1]);
  if (!routes.has(p)) return value;
  return abs + withLang(lang, p) + m[2];
}

// ---------- una página traducida ----------
// `native`: página escrita en ese idioma que vive en la raíz (NATIVE_PT): conserva su URL y su `pagina`.
function localize(html, lang, route, routes, native = false) {
  const L = LANGS[lang];
  let out = html.replace(/<html lang="es"/, `<html lang="${L.htmlLang}"`);
  out = editAttrs(out, (tag, a) => {
    if (!native && tag === 'link' && a.rel === 'canonical' && a.href) return { href: SITE + withLang(lang, new URL(a.href).pathname) };
    if (!native && tag === 'meta' && a.property === 'og:url' && a.content) return { content: SITE + withLang(lang, new URL(a.content).pathname) };
    if (tag === 'meta' && a.property === 'og:locale') return { content: L.ogLocale };
    if (tag === 'a' && a['data-lang']) {
      const target = a['data-lang'];
      return { href: routes.has(route) && !native ? withLang(target, route) : withLang(target, '/'), 'aria-current': String(target === lang) };
    }
    if (tag === 'a' && a.href) {
      const next = rewriteHref(a.href, lang, routes);
      return next !== a.href ? { href: next } : null;
    }
    if (tag === 'form' && a.action) {
      const next = rewriteHref(a.action, lang, routes);
      return next !== a.action ? { action: next } : null;
    }
    if (!native && tag === 'input' && a.name === 'pagina') return { value: withLang(lang, a.value || route) };
    if (tag === 'input' && a.name === 'idioma') return { value: lang };
    return null;
  });
  return out;
}

const indexable = (html) => !/<meta name="robots" content="[^"]*noindex/.test(html);

function hreflangBlock(route) {
  const url = (l) => SITE + withLang(l, route);
  return [
    `<link rel="alternate" hreflang="es" href="${url('es')}" />`,
    ...TRANSLATED_LANGS.map((l) => `<link rel="alternate" hreflang="${LANGS[l].htmlLang}" href="${url(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url('es')}" />`,
  ].join('\n    ');
}

function addHreflang(html, route) {
  if (html.includes('hreflang="x-default"') || !indexable(html)) return html;
  return html.replace('</head>', `    ${hreflangBlock(route)}\n  </head>`);
}

// ---------- sitemap ----------
function writeSitemap(routes) {
  const file = path.join(DIST, 'sitemap-0.xml');
  if (!existsSync(file)) return 0;
  const locs = [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => routes.has(ensureSlash(p)));
  const entries = TRANSLATED_LANGS.flatMap((lang) =>
    locs.map((p) => {
      const alt = [
        ['es', 'es'],
        ...TRANSLATED_LANGS.map((l) => [LANGS[l].htmlLang, l]),
      ]
        .map(([h, l]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${SITE + withLang(l, p)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${SITE + withLang(lang, p)}</loc>\n${alt}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + withLang('es', p)}"/>\n  </url>`;
    }),
  );
  writeFileSync(
    path.join(DIST, 'sitemap-i18n.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`,
  );
  const idx = path.join(DIST, 'sitemap-index.xml');
  if (existsSync(idx)) {
    const x = readFileSync(idx, 'utf8');
    if (!x.includes('sitemap-i18n.xml')) writeFileSync(idx, x.replace('</sitemapindex>', `<sitemap><loc>${SITE}/sitemap-i18n.xml</loc></sitemap></sitemapindex>`));
  }
  return entries.length;
}

// ---------- build ----------
function build() {
  const routes = new Set(spanishRoutes().filter(isTranslatable));
  const dicts = Object.fromEntries(TRANSLATED_LANGS.map((l) => [l, dictOf(l)]));
  const missing = Object.fromEntries(TRANSLATED_LANGS.map((l) => [l, new Map()]));
  let pages = 0;

  for (const route of routes) {
    const es = readFileSync(fileOf(route), 'utf8');
    for (const lang of TRANSLATED_LANGS) {
      const t = translate(es, dicts[lang], { inLanguage: LANGS[lang].htmlLang });
      for (const k of t.missing) missing[lang].set(k, (missing[lang].get(k) || 0) + 1);
      let html = localize(t.html, lang, route, routes);
      html = addHreflang(html, route);
      const f = fileOf(route, lang);
      mkdirSync(path.dirname(f), { recursive: true });
      writeFileSync(f, html);
      pages++;
    }
    writeFileSync(fileOf(route), addHreflang(es, route)); // el español solo gana los hreflang
  }
  // Páginas nativas en portugués: se traduce solo lo compartido; las frases propias (que no están en el
  // diccionario) se dejan tal cual, así que aquí no se avisa de "frases sin traducir".
  for (const route of NATIVE_PT.filter((r) => existsSync(fileOf(r)))) {
    const t = translate(readFileSync(fileOf(route), 'utf8'), dicts.pt, { inLanguage: LANGS.pt.htmlLang });
    writeFileSync(fileOf(route), localize(t.html, 'pt', route, routes, true));
    pages++;
  }
  const urls = writeSitemap(routes);
  console.log(`✓ i18n: ${pages} páginas (${routes.size} × ${TRANSLATED_LANGS.length}) · ${urls} URLs en sitemap-i18n.xml`);
  let pending = 0;
  for (const lang of TRANSLATED_LANGS) {
    const n = missing[lang].size;
    pending += n;
    if (n) console.warn(`  ⚠ ${lang}: ${n} frases sin traducir (se ven en español). Lista: node scripts/i18n.mjs extract`);
  }
  if (pending && process.env.I18N_STRICT === '1') {
    console.error('I18N_STRICT=1: hay frases sin traducir.');
    process.exit(1);
  }
}

// ---------- extract ----------
function extract(out) {
  const routes = spanishRoutes().filter(isTranslatable);
  const where = new Map();
  for (const route of routes) {
    for (const k of keysOf(readFileSync(fileOf(route), 'utf8'))) {
      if (!where.has(k)) where.set(k, []);
      where.get(k).push(route);
    }
  }
  const dicts = Object.fromEntries(TRANSLATED_LANGS.map((l) => [l, dictOf(l)]));
  const pending = [...where.entries()]
    .filter(([k]) => TRANSLATED_LANGS.some((l) => !dicts[l][k]))
    .sort((a, b) => b[1].length - a[1].length || a[1][0].localeCompare(b[1][0]) || a[0].localeCompare(b[0]))
    .map(([es, pages], i) => ({ id: i + 1, es, pages: pages.length > 3 ? [...pages.slice(0, 3), `+${pages.length - 3}`] : pages }));
  const words = pending.reduce((n, p) => n + p.es.split(/\s+/).length, 0);
  if (out) writeFileSync(out, JSON.stringify(pending, null, 1));
  console.log(`Pendientes: ${pending.length} frases (${words} palabras) de ${where.size} en total${out ? ` → ${out}` : ''}`);
}

// ---------- merge ----------
const tagSig = (s) => (s.match(/<\/?[a-z][^>]*>/gi) || []).map((t) => t.replace(/\s+/g, ' ').replace(/\s*\/?>$/, '>').toLowerCase());
const nums = (s) => (s.replace(/<[^>]+>/g, ' ').match(/\d+(?:[.,\s ]\d{3})*(?:[.,]\d+)?/g) || []).map((n) => n.replace(/[.,\s ]/g, '')).sort().join('|');
function merge(pendingFile, inFile) {
  const pending = new Map(readJson(pendingFile, []).map((p) => [p.id, p.es]));
  // Acepta JSON ([{id, en, pt, br?}]) o texto (una línea por frase: "id ||| inglés ||| portugués [||| portugués de Brasil]").
  // Si falta `br`, se adapta automáticamente desde `pt` (scripts/i18n/ptbr.mjs).
  const batch = inFile.endsWith('.txt')
    ? readFileSync(inFile, 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => {
        const [id, en, pt, br] = l.split(' ||| ');
        return { id: Number(id), en, pt, br };
      })
    : readJson(inFile, []);
  const dicts = Object.fromEntries(TRANSLATED_LANGS.map((l) => [l, dictOf(l)]));
  let added = 0;
  const warn = [];
  for (const item of batch) {
    const es = pending.get(item.id);
    if (!es) {
      warn.push(`id ${item.id}: no existe en la lista de pendientes`);
      continue;
    }
    for (const lang of TRANSLATED_LANGS) {
      const t = ((lang === 'br' ? item.br || (item.pt ? adaptPtBr(item.pt) : '') : item[lang]) ?? '').trim();
      if (!t) {
        warn.push(`id ${item.id} (${lang}): vacío`);
        continue;
      }
      if (tagSig(es).join() !== tagSig(t).join()) warn.push(`id ${item.id} (${lang}): las etiquetas HTML no coinciden → ${es.slice(0, 60)}`);
      if (nums(es) !== nums(t)) warn.push(`id ${item.id} (${lang}): los números no coinciden → ${es.slice(0, 60)}`);
      dicts[lang][es] = t;
      added++;
    }
  }
  for (const lang of TRANSLATED_LANGS) {
    const sorted = Object.fromEntries(Object.entries(dicts[lang]).sort(([a], [b]) => a.localeCompare(b, 'es')));
    writeFileSync(path.join(DICT_DIR, `${lang}.json`), JSON.stringify(sorted, null, 1) + '\n');
  }
  console.log(`Añadidas ${added} traducciones.${warn.length ? `\nAvisos (${warn.length}):\n  ` + warn.join('\n  ') : ''}`);
}

const [cmd, ...args] = process.argv.slice(2);
const arg = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (cmd === 'build') build();
  else if (cmd === 'extract') extract(arg('--out'));
  else if (cmd === 'merge') merge(arg('--pending'), arg('--in'));
  else console.log('Uso: node scripts/i18n.mjs build | extract [--out f.json] | merge --pending p.json --in t.json');
}
