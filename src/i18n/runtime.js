// Idioma de la página en el navegador, para los textos que viven dentro de scripts
// (mensajes de formularios, reservador, menú…). Los textos del HTML se traducen en el
// build (scripts/i18n.mjs); estos no, así que cada script lleva su tabla es / en / pt.
const htmlLang = ((typeof document !== 'undefined' && document.documentElement.lang) || 'es').toLowerCase();
// pt-BR → 'br' (portugués de Brasil); pt-PT → 'pt'
export const lang = htmlLang === 'pt-br' ? 'br' : htmlLang.slice(0, 2);
export const locale = { es: 'es-ES', en: 'en-GB', pt: 'pt-PT', br: 'pt-BR' }[lang] || 'es-ES';

// pick({ es: {...}, en: {...}, pt: {...} }) → la tabla del idioma de la página (español si falta)
export const pick = (tables) => tables[lang] || (lang === 'br' && tables.pt) || tables.es;
