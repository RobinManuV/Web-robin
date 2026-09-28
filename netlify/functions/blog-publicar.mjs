// Tarea programada: miércoles y viernes a las 09:00 (hora de Madrid en verano; 08:00 en invierno)
// publica el borrador que toca, salvo que se haya parado.
import { weekId, weekdayMadrid, publishDates, humanDate } from '../lib/blog/dates.mjs';
import { getWeek } from '../lib/blog/store.mjs';
import { publicar } from '../lib/blog/pipeline.mjs';
import { sendMail } from '../lib/blog/mail.mjs';
import { emailSimple, esc } from '../lib/blog/views.mjs';
import { link } from '../lib/blog/sign.mjs';

export default async () => {
  const week = weekId();
  const slot = weekdayMadrid() === 'Wed' ? 'miercoles' : weekdayMadrid() === 'Fri' ? 'viernes' : null;
  if (!slot) return new Response('Hoy no se publica');

  const data = await getWeek(week);
  if (!data?.selection) {
    // Nadie eligió ideas: se avisa (solo el miércoles, para no repetir)
    if (slot === 'miercoles' && data?.ideas?.length) {
      await sendMail(
        emailSimple(
          `Blog Robin · Aún no has elegido los blogs (${week})`,
          'Aún no has elegido los blogs de esta semana',
          `<p>Hoy no se publica nada. Si eliges ahora, el de miércoles saldrá en cuanto pulses "Publicar ahora" en el borrador y el del ${esc(
            humanDate(publishDates(week).viernes),
          )} se publicará solo.</p><p><a href="${esc(link('/api/blog-elegir', week))}">Elegir ahora</a></p>`,
        ),
      );
    }
    return new Response('Sin selección');
  }
  const r = await publicar(week, slot);
  return new Response(JSON.stringify(r));
};

export const config = { schedule: '0 7 * * 3,5' };
