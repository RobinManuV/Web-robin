// Fechas de la máquina de blogs, siempre en hora de Madrid.
// La "semana" se identifica por su lunes: p. ej. 2026-09-28.

const TZ = 'Europe/Madrid';

function madridParts(date) {
  return Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
}

// Fecha (YYYY-MM-DD) de hoy en Madrid
export function todayMadrid(now = new Date()) {
  const p = madridParts(now);
  return `${p.year}-${p.month}-${p.day}`;
}

function addDays(iso, n) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const WEEKDAY = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

// Lunes de la semana actual (en Madrid)
export function weekId(now = new Date()) {
  const p = madridParts(now);
  return addDays(`${p.year}-${p.month}-${p.day}`, -WEEKDAY[p.weekday]);
}

// Rango de la semana anterior (lunes a domingo) que se investiga
export function previousWeekRange(week) {
  return { from: addDays(week, -7), to: addDays(week, -1) };
}

// Días de publicación de una semana
export function publishDates(week) {
  return { miercoles: addDays(week, 2), viernes: addDays(week, 4) };
}

export function humanDate(iso) {
  return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}

export function weekdayMadrid(now = new Date()) {
  return madridParts(now).weekday; // 'Mon', 'Wed'…
}
