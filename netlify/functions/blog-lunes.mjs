// Tarea programada: cada lunes a las 08:00 (hora de Madrid en verano; 07:00 en invierno)
// lanza la investigación de la semana en segundo plano.
import { weekId } from '../lib/blog/dates.mjs';
import { runInBackground } from '../lib/blog/pipeline.mjs';

export default async () => {
  const week = weekId();
  await runInBackground('blog-investigar-background', { week });
  return new Response(`Investigación lanzada para la semana ${week}`);
};

export const config = { schedule: '0 6 * * 1' };
