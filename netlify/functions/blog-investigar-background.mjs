// Segundo plano (hasta 15 min): Claude investiga las tendencias y se envía el correo con 5 ideas.
import { internalOk } from '../lib/blog/sign.mjs';
import { investigar } from '../lib/blog/pipeline.mjs';
import { weekId } from '../lib/blog/dates.mjs';

export default async (req) => {
  if (!internalOk(req)) return new Response('No autorizado', { status: 401 });
  const { week = weekId(), force = false } = await req.json().catch(() => ({}));
  await investigar(week, { force });
  return new Response('ok');
};

export const config = { background: true };
