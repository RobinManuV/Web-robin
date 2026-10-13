// ============================================================
// Idiomas de la web. El español es el idioma de origen y vive en la raíz
// (sin cambiar ninguna URL). El inglés, el portugués de Portugal y el de Brasil
// se generan en /en/, /pt/ y /br/ después del build (ver scripts/i18n.mjs y el README).
// ============================================================

export const DEFAULT_LANG = 'es';

export const LANGS = {
  es: { code: 'es', htmlLang: 'es', ogLocale: 'es_ES', label: 'ES', name: 'Español' },
  en: { code: 'en', htmlLang: 'en', ogLocale: 'en_GB', label: 'EN', name: 'English' },
  pt: { code: 'pt', htmlLang: 'pt-PT', ogLocale: 'pt_PT', label: 'PT', name: 'Português (Portugal)' },
  br: { code: 'br', htmlLang: 'pt-BR', ogLocale: 'pt_BR', label: 'BR', name: 'Português (Brasil)' },
};

export const TRANSLATED_LANGS = ['en', 'pt', 'br'];

// Lo que NO se traduce: blog (artículos, índice y categorías) y páginas legales.
// Esas páginas existen solo en español y desde /en/ y /pt/ se enlazan en español.
const LEGAL = ['/aviso-legal/', '/politica-de-cookies/', '/politica-de-privacidad/'];
export function isTranslatable(pathname) {
  const p = ensureSlash(stripLang(pathname));
  if (p === '/404/') return false;
  if (p === '/blog/' || p.startsWith('/blog/')) return false;
  return !LEGAL.includes(p);
}

export function ensureSlash(p) {
  return p.endsWith('/') ? p : `${p}/`;
}

// "/en/destinos/delft/" → "/destinos/delft/"
export function stripLang(pathname) {
  return pathname.replace(/^\/(en|pt|br)(?=\/|$)/, '') || '/';
}

// withLang('en', '/destinos/') → "/en/destinos/"; el español queda igual
export function withLang(lang, pathname) {
  const p = stripLang(pathname);
  if (lang === DEFAULT_LANG) return p;
  return p === '/' ? `/${lang}/` : `/${lang}${p}`;
}

// Idioma de una ruta ("/pt/colegios/" → "pt")
export function langOf(pathname) {
  const m = pathname.match(/^\/(en|pt|br)(?=\/|$)/);
  return m ? m[1] : DEFAULT_LANG;
}
