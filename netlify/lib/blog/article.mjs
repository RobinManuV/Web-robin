// Convierte la respuesta de Claude en el archivo Markdown del blog (src/content/blog/<slug>.md).
import { esc } from './views.mjs';

const q = (v) => JSON.stringify(v ?? ''); // JSON es YAML válido: comillas y acentos seguros

export function slugify(s) {
  return String(s || 'articulo')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function figure(photo, alt, caption) {
  const cap = [caption ? esc(caption) : '', photo.creditHtml].filter(Boolean).join(' · ');
  return `<figure>
  <img src="${esc(photo.url)}" alt="${esc(alt)}" width="${photo.width}" height="${photo.height}" loading="lazy" />
  <figcaption>${cap}</figcaption>
</figure>`;
}

// Sustituye {{IMAGEN_n}} por su <figure>; si falta la foto, quita el marcador
export function bodyWithImages(body, images = [], photos = {}) {
  let out = String(body || '');
  for (const img of images) {
    const marker = `{{${img.marker}}}`;
    const photo = photos[img.marker];
    out = out.replace(marker, photo ? figure(photo, img.alt, img.caption) : '');
  }
  return out.replace(/\{\{IMAGEN_\d+\}\}/g, '').replace(/\n{3,}/g, '\n\n').trim();
}

export function buildMarkdown({ article, body, hero, date }) {
  const fm = [
    '---',
    `title: ${q(article.title)}`,
    `seoTitle: ${q(article.seoTitle ? `${article.seoTitle} | Project Robin` : '')}`,
    `description: ${q(article.description)}`,
    `date: ${date}`,
    `image: ${q(hero?.url || '/wp-content/uploads/2026/04/Robin-en-Bici.png')}`,
    `imageAlt: ${q(article.heroImage?.alt || article.title)}`,
    ...(hero ? [`imageCredit: ${q(hero.author)}`, `imageCreditUrl: ${q(hero.authorUrl)}`] : []),
    `category: ${q(article.category || 'Actualidad educativa')}`,
    `keywords: ${q((article.keywords || []).join(', '))}`,
    'faq:',
    ...(article.faq || []).flatMap((f) => [`  - q: ${q(f.q)}`, `    a: ${q(f.a)}`]),
    'sources:',
    ...(article.sources || []).flatMap((s) => [
      `  - title: ${q(s.title)}`,
      `    url: ${q(s.url)}`,
      `    publisher: ${q(s.publisher || '')}`,
    ]),
    'generated: true',
    '---',
    '',
  ];
  return `${fm.join('\n')}${body}\n`;
}
