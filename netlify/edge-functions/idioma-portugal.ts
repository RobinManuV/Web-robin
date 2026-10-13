// Edge function: quien entra a la portada (/) desde Portugal ve la web en portugués de Portugal (/pt/)
// y desde Brasil en portugués de Brasil (/br/).
// - Solo la primera visita: si la persona ya eligió idioma con el selector queda la cookie
//   `robin_lang` y no se vuelve a redirigir.
// - No se redirige a buscadores ni a previsualizadores de enlaces (siguen viendo el español).
// ?pais=PT o ?pais=BR permiten comprobarlo sin VPN.
import type { Config, Context } from '@netlify/edge-functions';

const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse|headless/i;

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (BOTS.test(req.headers.get('user-agent') || '')) return;
  if ((req.headers.get('cookie') || '').includes('robin_lang=')) return;
  const country = (url.searchParams.get('pais') || context.geo?.country?.code || '').toUpperCase();
  const destino = { PT: '/pt/', BR: '/br/' }[country];
  if (!destino) return;
  return new Response(null, {
    status: 302,
    headers: { Location: destino, 'Cache-Control': 'no-store', Vary: 'Cookie' },
  });
};

export const config: Config = { path: '/' };
