// Instrucciones para Claude: investigación semanal y redacción de artículos.
// Si quieres cambiar el tono, el público o las reglas, cambia este archivo.
import { cfg } from './config.mjs';

const TONO = `
TONO DE ROBIN (obligatorio):
- Straight talker: hablamos sin rodeos de costes, becas, riesgos y beneficios. Nada de "vivir la experiencia" sin datos detrás.
- Culturally curious: curiosidad real por la cultura y la vida del sitio, sin clichés turísticos.
- Real voice: humanos de verdad. Sin jerga publicitaria, sin frases hechas, sin exagerar. A nadie le gustan los que se esfuerzan demasiado.
- Posicionamiento: "The world is your campus". Tan prácticos como los padres, tan cercanos como los amigos y tan ambiciosos como el estudiante.
- Tuteo, español de España, frases claras y cortas.
`;

const PUBLICO = `
PÚBLICO: estudiantes españoles de 16-19 años (Bachillerato, IB, A-Levels) y sus familias, que deciden qué y dónde estudiar en la universidad,
con especial interés en estudiar fuera (Holanda y Europa). A los padres les preocupan el coste total, la seguridad, las becas y la empleabilidad.
Project Robin es una asesoría que acompaña a estudiar en Holanda y en grados multicampus europeos: elección de carrera, aplicación, alojamiento y llegada.
`;

export const SYSTEM_INVESTIGAR = `Eres el editor de contenidos de Project Robin. Detectas qué temas de educación preocupan en España cada semana
y propones artículos que de verdad sirvan al público de Robin.
${PUBLICO}
Reglas: no inventes noticias ni datos. Cada idea debe apoyarse en fuentes reales que hayas encontrado con la búsqueda web, con su URL.`;

export function promptInvestigar({ range, pastTitles, existingPosts }) {
  return `Investiga qué temas de EDUCACIÓN EN ESPAÑA han sido tendencia entre el ${range.from} y el ${range.to} (ambos incluidos).

Busca en: medios españoles (El País Educación, El Mundo, ABC, La Vanguardia, 20minutos, elDiario.es, Europa Press, Magisnet, Universidad.es…),
fuentes oficiales (Ministerio de Educación, Ministerio de Universidades, BOE, CRUE, universidades), foros y comunidades (Reddit: r/spain, r/askspain,
r/Universitarios y similares; Forocoches, Menéame), y publicaciones públicas de LinkedIn que aparezcan en buscadores.
Haz varias búsquedas distintas (selectividad/PAU, notas de corte, becas, precios de matrícula, alquiler de estudiantes, FP, empleabilidad de los grados,
estudiar fuera, universidades privadas, doble grado, inglés/certificados, orientación en colegios…).

Descarta temas que no conecten con la decisión universitaria del público de Robin (por ejemplo, conflictos laborales de profesores de primaria,
polémicas políticas sin impacto práctico o temas centrados en programas de intercambio Erasmus).
No repitas estos temas ya propuestos o publicados:
${[...pastTitles, ...existingPosts].map((t) => `- ${t}`).join('\n') || '- (ninguno)'}

Elige las 5 MEJORES ideas de artículo: tendencia real esa semana + utilidad para el público + ángulo propio de Robin (comparar con Holanda/Europa,
costes reales, qué hacer ahora). Ordénalas de más a menos recomendable.

Devuelve SOLO un bloque \`\`\`json con este formato:
{
  "summary": "2-3 frases sobre qué ha movido la conversación educativa esa semana",
  "ideas": [
    {
      "title": "Título de trabajo del artículo (máx. 70 caracteres)",
      "angle": "Qué contaría el artículo y con qué enfoque de Robin (2-3 frases)",
      "whyNow": "Por qué es tendencia esa semana, con el dato o hecho concreto",
      "audience": "estudiantes | familias | ambos",
      "keywords": ["palabra clave principal", "secundaria", "secundaria"],
      "score": 1-10,
      "sources": [ { "title": "…", "publisher": "…", "url": "https://…", "date": "YYYY-MM-DD" } ]
    }
  ]
}`;
}

export const SYSTEM_REDACTAR = `Eres redactor senior de Project Robin y experto en SEO y GEO (optimización para respuestas de IA como ChatGPT, Perplexity o Google AI Overviews).
${PUBLICO}
${TONO}
REGLAS DE VERACIDAD (innegociables):
- Solo afirmas datos que hayas comprobado con la búsqueda web en fuentes fiables. Cada cifra, fecha o requisito lleva su enlace a la fuente en el propio texto.
- Si un dato no está claro o varía, lo dices ("según X…", "a fecha de…"). Nunca inventes cifras, citas, estudios ni testimonios.
- Prioriza fuentes oficiales y medios de referencia. Nada de blogs de agencias competidoras como fuente principal.
- No prometas admisiones, becas ni resultados.`;

export function promptRedactar({ idea, publishOn, internalLinks }) {
  return `Escribe un artículo para el blog de Project Robin que se publicará el ${publishOn}.

IDEA ELEGIDA:
${JSON.stringify(idea, null, 2)}

Antes de escribir, verifica y amplía los datos con la búsqueda web (fuentes oficiales y medios de referencia, lo más recientes posible).

ESTRUCTURA (SEO + GEO):
1. Entradilla de 2-3 frases que responda directamente a la pregunta principal (los buscadores y las IA citan este párrafo).
2. Un bloque "**Lo esencial**" con 3-5 viñetas con los datos clave y su fuente.
3. 4-6 secciones con H2 (##) formuladas como las preguntas que se hace el lector; H3 (###) si hace falta. Incluye al menos una tabla en Markdown si hay datos comparables.
4. Una sección que conecte el tema con estudiar fuera (Holanda o Europa) cuando tenga sentido, sin forzarlo y sin sonar a anuncio.
5. Cierre práctico: qué hacer ahora, paso a paso.
6. NO escribas el H1 ni la sección de preguntas frecuentes en el cuerpo: van aparte en el JSON.
- Extensión del cuerpo: 1.200-1.800 palabras.
- Enlaces externos: 5-10 a las fuentes, dentro del texto, con anchor text descriptivo (nunca "aquí").
- Enlaces internos: 2-4 a páginas de Project Robin que encajen, SOLO de esta lista:
${internalLinks.map((l) => `  - ${l}`).join('\n')}
- Marca en el texto dónde van 1-2 imágenes de apoyo escribiendo una línea sola con {{IMAGEN_1}} y {{IMAGEN_2}} (después de un párrafo, nunca dentro de una tabla).

Devuelve SOLO un bloque \`\`\`json con este formato:
{
  "title": "H1 del artículo (máx. 70 caracteres, con la palabra clave al principio)",
  "seoTitle": "Título para Google (máx. 60 caracteres)",
  "description": "Meta description (140-155 caracteres, con la palabra clave y un motivo para hacer clic)",
  "slug": "url-corta-en-minusculas-con-guiones",
  "category": "Actualidad educativa",
  "keywords": ["…"],
  "heroImage": { "query": "búsqueda en inglés para Unsplash (2-4 palabras, foto realista)", "alt": "texto alternativo descriptivo en español" },
  "images": [
    { "marker": "IMAGEN_1", "query": "búsqueda en inglés para Unsplash", "alt": "texto alternativo descriptivo", "caption": "pie de foto en español que aporte contexto" },
    { "marker": "IMAGEN_2", "query": "…", "alt": "…", "caption": "…" }
  ],
  "body": "Cuerpo completo en Markdown",
  "faq": [ { "q": "Pregunta frecuente real", "a": "Respuesta de 2-4 frases, autocontenida" } ],
  "sources": [ { "title": "Título de la fuente", "publisher": "Medio u organismo", "url": "https://…", "date": "YYYY-MM-DD" } ]
}
Incluye 4-5 preguntas frecuentes y todas las fuentes que hayas enlazado.`;
}

// Páginas internas a las que puede enlazar (se leen del sitemap de la web publicada)
export async function internalLinks() {
  const base = cfg.siteUrl();
  const fixed = [
    `${base}/destinos/ (estudiar en Holanda: guía de ciudades)`,
    `${base}/servicios/asesoramiento-completo/ (acompañamiento completo)`,
    `${base}/servicios/pack-llegada/ (alojamiento y llegada)`,
    `${base}/servicios/mentoria/ (mentoría de 90 minutos)`,
    `${base}/the-european-experience/ (grados multicampus en Europa)`,
    `${base}/contacto/ (consulta gratuita)`,
  ];
  try {
    const xml = await (await fetch(`${base}/sitemap-0.xml`)).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].replace('https://project-robin.com', base))
      .filter((u) => /\/(blog|destinos|universidades|servicios)\/[^/]+\/$/.test(u));
    return [...fixed, ...urls.filter((u) => !fixed.some((f) => f.startsWith(u)))];
  } catch {
    return fixed;
  }
}

// Títulos (slugs) de artículos ya publicados, para no repetir
export async function existingPostSlugs() {
  try {
    const xml = await (await fetch(`${cfg.siteUrl()}/sitemap-0.xml`)).text();
    return [...xml.matchAll(/\/blog\/([^/<]+)\/<\/loc>/g)].map((m) => m[1].replace(/-/g, ' '));
  } catch {
    return [];
  }
}
