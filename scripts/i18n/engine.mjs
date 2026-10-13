// ============================================================
// Motor de traducción de HTML ya generado.
//
// Lee una página en español, localiza cada frase visible (textos, atributos
// alt/title/aria-label/placeholder, <title>, meta descriptions y JSON-LD) y la
// sustituye por su traducción del diccionario. Los cambios se hacen por posición
// sobre el HTML original, así que todo lo demás queda byte a byte igual
// (incluidas las marcas <!--geo-hide--> de la edge function).
//
// Diccionario: { "frase en español tal como sale en el HTML": "traducción" }.
// Si una frase no está, se deja en español y se avisa.
// ============================================================
import { parse } from 'parse5';

const INLINE = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd',
  'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'del', 'ins',
]);
const SKIP = new Set(['script', 'style', 'svg', 'noscript', 'textarea']);
const ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'data-title', 'data-alt'];
const META_TEXT = new Set(['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description']);
const IGNORE = [/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/, /^https?:\/\//i, /^[+\d][\d\s().-]{5,}$/, /^Copyright © \d{4} Project Robin$/];
const HAS_LETTER = /\p{L}/u;
const BRAND_SUFFIX = / \| Project Robin/g;

export const normalize = (s) => s.replace(/\s+/g, ' ').trim();
const worth = (s) => HAS_LETTER.test(s) && !IGNORE.some((r) => r.test(s));
const attrMap = (n) => Object.fromEntries((n.attrs || []).map((a) => [a.name, a.value]));

const textOf = (n) =>
  n.nodeName === '#text' ? n.value : (n.childNodes || []).map((c) => (SKIP.has(c.nodeName) ? '' : textOf(c))).join('');

// ¿Solo contiene texto y etiquetas en línea (negrita, enlaces, saltos…)?
function inlineOnly(n) {
  return (n.childNodes || []).every(
    (c) => c.nodeName === '#text' || c.nodeName === '#comment' || (INLINE.has(c.nodeName) && inlineOnly(c)),
  );
}

// Recoge los fragmentos traducibles de una página: [{ start, end, key, kind }]
export function collect(html) {
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const out = [];
  const push = (start, end, key, kind) => out.push({ start, end, key, kind });

  function attrValueRange(node, name) {
    const loc = node.sourceCodeLocation?.attrs?.[name];
    if (!loc) return null;
    const raw = html.slice(loc.startOffset, loc.endOffset);
    const eq = raw.indexOf('=');
    if (eq < 0) return null;
    let s = loc.startOffset + eq + 1;
    let e = loc.endOffset;
    if (html[s] === '"' || html[s] === "'") {
      s += 1;
      e -= 1;
    }
    return [s, e];
  }

  function visit(n) {
    const tag = n.nodeName;
    if (tag === '#comment' || tag === '#documentType') return;
    if (tag === '#text') {
      const loc = n.sourceCodeLocation;
      if (!loc) return;
      const raw = html.slice(loc.startOffset, loc.endOffset);
      // parse5 a veces alarga el último texto del <body> hasta la etiqueta de cierre: se ignora
      if (raw.includes('<') || !worth(normalize(n.value))) return;
      const key = normalize(raw);
      if (worth(key)) push(loc.startOffset, loc.endOffset, key, 'html');
      return;
    }
    const attrs = attrMap(n);

    if (tag === 'script') {
      if (attrs.type === 'application/ld+json') {
        const loc = n.sourceCodeLocation;
        if (loc?.startTag && loc?.endTag) push(loc.startTag.endOffset, loc.endTag.startOffset, '', 'jsonld');
      }
      return;
    }

    if (tag === 'meta') {
      const name = attrs.property || attrs.name;
      if (META_TEXT.has(name) && attrs.content) {
        const r = attrValueRange(n, 'content');
        if (r && worth(attrs.content)) push(r[0], r[1], attrs.content.trim(), 'attr');
      }
      return;
    }

    for (const a of ATTRS) {
      if (attrs[a] && worth(attrs[a])) {
        const r = attrValueRange(n, a);
        if (r) push(r[0], r[1], attrs[a].trim(), 'attr');
      }
    }
    if (tag === 'input' && ['submit', 'button'].includes(attrs.type) && attrs.value && worth(attrs.value)) {
      const r = attrValueRange(n, 'value');
      if (r) push(r[0], r[1], attrs.value.trim(), 'attr');
    }

    if (SKIP.has(tag)) return;
    // el selector de idioma lo reescribe la pasada de localización, no se traduce
    if (/\blang-switch\b/.test(attrs.class || '')) return;
    const kids = tag === 'template' ? n.content?.childNodes || [] : n.childNodes || [];
    const box = { childNodes: kids };
    const loc = n.sourceCodeLocation;
    const container = !['#document', 'html', 'body', 'head', 'template'].includes(tag);
    // Un elemento que solo envuelve a otro en línea (<li><a>Texto</a></li>): se traduce el texto, no la etiqueta
    const real = kids.filter((c) => c.nodeName !== '#comment' && !(c.nodeName === '#text' && !c.value.trim()));
    if (container && real.length === 1 && INLINE.has(real[0].nodeName) && real[0].nodeName !== 'br') {
      visit(real[0]);
      return;
    }
    if (container && loc?.startTag && loc?.endTag && kids.length && inlineOnly(box)) {
      const key = normalize(html.slice(loc.startTag.endOffset, loc.endTag.startOffset));
      if (worth(key) && worth(normalize(textOf(box)))) {
        push(loc.startTag.endOffset, loc.endTag.startOffset, key, 'html');
        return;
      }
    }
    for (const c of kids) visit(c);
  }

  visit(doc);
  return out;
}

// "Título | Project Robin | Project Robin" → ["Título", " | Project Robin | Project Robin"]
function splitBrand(key) {
  const m = key.match(/^(.*?)((?: \| Project Robin)+)$/);
  return m ? [m[1], m[2]] : [key, ''];
}

const escAttr = (s) => s.replace(/&(?!#?\w+;)/g, '&amp;').replace(/"/g, '&quot;');
const escHtml = (s) => s.replace(/&(?!#?\w+;)/g, '&amp;');

function lookup(dict, key) {
  if (dict[key]) return dict[key];
  const [base, suffix] = splitBrand(key);
  if (suffix && dict[base]) return dict[base] + suffix;
  return null;
}

// Traduce los textos del JSON-LD (solo valores con 3 o más palabras que no sean URLs)
function jsonLdLeaves(value, fn) {
  if (typeof value === 'string') return fn(value);
  if (Array.isArray(value)) return value.map((v) => jsonLdLeaves(v, fn));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k.startsWith('@') || ['url', 'logo', 'image', 'inLanguage', 'email', 'telephone', 'sameAs'].includes(k) ? v : jsonLdLeaves(v, fn)]));
  }
  return value;
}
const ldWorthy = (s) => worth(s) && s.trim().split(/\s+/).length >= 3;

/**
 * Traduce una página. Devuelve { html, missing: Set<string> }.
 * `inLanguage` sustituye al valor de inLanguage del JSON-LD.
 */
export function translate(html, dict, { inLanguage } = {}) {
  const missing = new Set();
  const edits = [];
  for (const u of collect(html)) {
    if (u.kind === 'jsonld') {
      let data;
      try {
        data = JSON.parse(html.slice(u.start, u.end));
      } catch {
        continue;
      }
      const next = jsonLdLeaves(data, (s) => {
        if (!ldWorthy(s)) return s;
        const t = lookup(dict, normalize(s));
        if (!t) missing.add(normalize(s));
        return t || s;
      });
      const fixed = inLanguage ? JSON.parse(JSON.stringify(next).replace(/"inLanguage":"es(-ES)?"/g, `"inLanguage":"${inLanguage}"`)) : next;
      edits.push({ start: u.start, end: u.end, text: JSON.stringify(fixed).replace(/</g, '\\u003c') });
      continue;
    }
    const t = lookup(dict, u.key);
    if (!t) {
      missing.add(u.key);
      continue;
    }
    if (u.kind === 'attr') {
      edits.push({ start: u.start, end: u.end, text: escAttr(t) });
    } else {
      const raw = html.slice(u.start, u.end);
      const lead = raw.match(/^\s*/)[0];
      const trail = raw.match(/\s*$/)[0];
      edits.push({ start: u.start, end: u.end, text: lead + escHtml(t) + trail });
    }
  }
  return { html: applyEdits(html, edits), missing };
}

export function applyEdits(html, edits) {
  let out = html;
  for (const e of [...edits].sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}

// Todos los fragmentos traducibles de una página (para generar la lista de pendientes)
export function keysOf(html) {
  const keys = new Set();
  for (const u of collect(html)) {
    if (u.kind === 'jsonld') {
      try {
        jsonLdLeaves(JSON.parse(html.slice(u.start, u.end)), (s) => (ldWorthy(s) && keys.add(normalize(s)), s));
      } catch {
        /* JSON no válido: se ignora */
      }
    } else {
      keys.add(splitBrand(u.key)[0]);
    }
  }
  return keys;
}

// Edita atributos de una página ya traducida: `fn(tag, attrs)` devuelve { nombre: nuevoValor } o null.
export function editAttrs(html, fn) {
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  (function walk(n) {
    if (n.attrs && n.sourceCodeLocation?.attrs) {
      const changes = fn(n.nodeName, attrMap(n), n);
      for (const [name, value] of Object.entries(changes || {})) {
        const loc = n.sourceCodeLocation.attrs[name];
        if (!loc) continue;
        edits.push({ start: loc.startOffset, end: loc.endOffset, text: `${name}="${escAttr(value)}"` });
      }
    }
    for (const c of n.nodeName === 'template' ? n.content?.childNodes || [] : n.childNodes || []) walk(c);
  })(doc);
  return applyEdits(html, edits);
}
