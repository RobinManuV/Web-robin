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

  // La búsqueda web puede devolver stop_reason "pause_turn": se continúa la conversación.
  for (let turn = 0; turn < 6; turn++) {
    const r = await call({ model: cfg.model(), max_tokens: maxTokens, system, messages, ...(tools ? { tools } : {}) });
    for (const block of r.content || []) {
      if (block.type === 'text') text += block.text;
      if (block.type === 'server_tool_use') searches++;
    }
    if (r.stop_reason !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: r.content });
  }

  return { json: extractJson(text), text, searches };
}

export function extractJson(text) {
  const fenced = [...text.matchAll(/```json\s*([\s\S]*?)```/g)].map((m) => m[1]);
  const candidates = fenced.length ? fenced.reverse() : [text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)];
  for (const c of candidates) {
    try {
      return JSON.parse(c);
    } catch {
      /* siguiente */
    }
  }
  throw new Error('Claude no devolvió un JSON válido');
}
