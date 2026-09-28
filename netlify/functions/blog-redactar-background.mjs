// Segundo plano (hasta 15 min): Claude redacta los 2 blogs elegidos y se envían los borradores.
import { internalOk } from '../lib/blog/sign.mjs';
import { redactar } from '../lib/blog/pipeline.mjs';

export default async (req) => {
  if (!internalOk(req)) return new Response('No autorizado', { status: 401 });
  const { week } = await req.json().catch(() => ({}));
  if (!week) return new Response('Falta la semana', { status: 400 });
  await redactar(week);
  return new Response('ok');
};

export const config = { background: true };
