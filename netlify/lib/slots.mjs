// Cálculo de huecos libres para la primera consulta (30 min).
// Todo se calcula en hora de Madrid.
//
// Variables opcionales:
//   BOOKING_SCHEDULE          JSON con el horario por día de la semana (1=lunes … 7=domingo)
//                             por defecto: lunes a viernes 10:00–20:00
//   BOOKING_SLOT_MINUTES      duración de la llamada (30)
//   BOOKING_MIN_NOTICE_HOURS  antelación mínima para reservar (12)
//   BOOKING_DAYS_AHEAD        días que se muestran (14)
//   BOOKING_BUFFER_MINUTES    margen libre antes/después de otras reuniones (0)

export const TZ = 'Europe/Madrid';

const DEFAULT_SCHEDULE = {
  1: [['10:00', '20:00']],
  2: [['10:00', '20:00']],
  3: [['10:00', '20:00']],
  4: [['10:00', '20:00']],
  5: [['10:00', '20:00']],
};

export function config() {
  let schedule = DEFAULT_SCHEDULE;
  try {
    if (process.env.BOOKING_SCHEDULE) schedule = JSON.parse(process.env.BOOKING_SCHEDULE);
  } catch {
    console.error('[booking] BOOKING_SCHEDULE no es un JSON válido; uso el horario por defecto');
  }
  return {
    schedule,
    slotMin: Number(process.env.BOOKING_SLOT_MINUTES || 30),
    noticeH: Number(process.env.BOOKING_MIN_NOTICE_HOURS || 12),
    daysAhead: Number(process.env.BOOKING_DAYS_AHEAD || 14),
    bufferMin: Number(process.env.BOOKING_BUFFER_MINUTES || 0),
  };
}

// Partes de una fecha en hora de Madrid
function madridParts(date) {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  const wd = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[p.weekday];
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute, wd };
}

// Convierte una hora "de pared" de Madrid a un instante UTC (respeta horario de verano)
export function madridToDate(y, m, d, h, min) {
  let guess = Date.UTC(y, m - 1, d, h, min);
  for (let i = 0; i < 2; i++) {
    const p = madridParts(new Date(guess));
    const asUtc = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min);
    guess += Date.UTC(y, m - 1, d, h, min) - asUtc;
  }
  return new Date(guess);
}

// Todos los huecos teóricos del horario (sin mirar calendarios)
export function candidateSlots(now = new Date()) {
  const { schedule, slotMin, noticeH, daysAhead } = config();
  const earliest = now.getTime() + noticeH * 3600e3;
  const slots = [];
  const today = madridParts(now);
  for (let i = 0; i <= daysAhead; i++) {
    const noon = madridToDate(today.y, today.m, today.d, 12, 0);
    const day = madridParts(new Date(noon.getTime() + i * 86400e3));
    const ranges = schedule[day.wd] || schedule[String(day.wd)] || [];
    for (const [from, to] of ranges) {
      const [fh, fm] = from.split(':').map(Number);
      const [th, tm] = to.split(':').map(Number);
      let t = madridToDate(day.y, day.m, day.d, fh, fm).getTime();
      const endT = madridToDate(day.y, day.m, day.d, th, tm).getTime();
      while (t + slotMin * 60e3 <= endT) {
        if (t >= earliest) slots.push({ start: t, end: t + slotMin * 60e3 });
        t += slotMin * 60e3;
      }
    }
  }
  return slots;
}

export function isFree(busy, start, end) {
  if (!busy) return false;
  const buf = config().bufferMin * 60e3;
  return !busy.some(([bs, be]) => bs < end + buf && be > start - buf);
}

// Para cada hueco, quién está libre
export function freeSlots(candidates, hosts, busyMap) {
  return candidates
    .map((s) => ({ ...s, hosts: hosts.filter((h) => isFree(busyMap[h.email], s.start, s.end)) }))
    .filter((s) => s.hosts.length > 0);
}

// Reparto: la persona libre con menos reuniones ese día
export function pickHost(freeHosts, busyMap, start) {
  const dayStart = start - (start % 86400e3);
  const load = (h) => (busyMap[h.email] || []).filter(([bs]) => bs >= dayStart && bs < dayStart + 86400e3).length;
  return [...freeHosts].sort((a, b) => load(a) - load(b) || Math.random() - 0.5)[0];
}
