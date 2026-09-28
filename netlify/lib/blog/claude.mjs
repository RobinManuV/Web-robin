// Llamadas a la API de Claude (Anthropic) con la herramienta de búsqueda web.
// Docs: https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool
import { cfg } from './config.mjs';

const API = 'https://api.anthropic.com/v1/messages';

async function call(body) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'x-api-key': cfg.anthropicKey(),
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 500)}`);
  return res.json();
}

/**
 * Pide a Claude una respuesta JSON, dejándole buscar en la web.
 * Devuelve { json, text, searches } donde json es el último bloque ```json``` de la respuesta.
 */
export async function askJson({ system, prompt, maxSearches = 10, maxTokens = 16000 }) {
  const tools = maxSearches
    ? [
        {
          type: cfg.webSearchTool(),
          name: 'web_search',
          max_uses: maxSearches,
          user_location: { type: 'approximate', country: 'ES', timezone: 'Europe/Madrid' },
        },
      ]
    : undefined;

  const messages = [{ role: 'user', content: prompt }];
  let text = '';
  let searches = 0;
  let stop = '';

  // La búsqueda web puede devolver stop_reason "pause_turn": se continúa la conversación.
  for (let turn = 0; turn < 6; turn++) {
    const r = await call({ model: cfg.model(), max_tokens: maxTokens, system, messages, ...(tools ? { tools } : {}) });
    for (const block of r.content || []) {
      if (block.type === 'text') text += block.text;
      if (block.type === 'server_tool_use') searches++;
    }
    stop = r.stop_reason;
    if (stop !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: r.content });
  }

  let json = tryJson(text);
  if (!json) {
    // Segundo intento: se le pasa lo que escribió y se le pide solo el JSON, sin buscar.
    console.warn(`[blog] JSON no válido (stop_reason=${stop}, ${text.length} caracteres). Reparando…`);
    const r = await call({
      model: cfg.model(),
      max_tokens: maxTokens,
      system: 'Conviertes texto en JSON válido. Respondes SOLO con JSON, sin texto antes ni después y sin ```.',
      messages: [
        {
          role: 'user',
          content: `Este es el resultado de una investigación${stop === 'max_tokens' ? ' (se cortó antes de terminar; completa lo que falte de forma coherente)' : ''}. Devuélvelo como un único JSON válido con el formato que se pidió:\n\n--- FORMATO PEDIDO ---\n${prompt.slice(prompt.lastIndexOf('```json'))}\n\n--- RESULTADO ---\n${text}`,
        },
      ],
    });
    json = tryJson((r.content || []).filter((b) => b.type === 'text').map((b) => b.text).join(''));
  }
  if (!json) throw new Error(`Claude no devolvió un JSON válido (motivo de parada: ${stop}, ${text.length} caracteres)`);
  return { json, text, searches };
}

// Busca el JSON en la respuesta: bloques ```json```, luego del primer { al último }
function tryJson(text) {
  const fenced = [...String(text).matchAll(/```(?:json)?\s*([\s\S]*?)```/g)].map((m) => m[1]).reverse();
  const brace = text.indexOf('{') >= 0 ? [text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)] : [];
  for (const c of [...fenced, ...brace]) {
    try {
      const v = JSON.parse(c);
      if (v && typeof v === 'object') return v;
    } catch {
      /* siguiente */
    }
  }
  return null;
}

export function extractJson(text) {
  const v = tryJson(text);
  if (!v) throw new Error('Claude no devolvió un JSON válido');
  return v;
}
