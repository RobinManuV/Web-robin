// Acceso a Google Calendar con una cuenta de servicio de Google Workspace
// con "delegación de todo el dominio" (domain-wide delegation).
// Así la web puede leer la disponibilidad de Noel, María y Manuel y crear
// la reunión (con Google Meet) directamente en el calendario de quien la atiende.
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export function getHosts() {
  // BOOKING_HOSTS="Noel:noel@project-robin.com,María:maria@project-robin.com,Manuel:manuel@project-robin.com"
  const raw = process.env.BOOKING_HOSTS || '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const [name, email] = pair.includes(':') ? pair.split(':') : [pair.split('@')[0], pair];
      return { name: name.trim(), email: email.trim().toLowerCase() };
    });
}

function privateKey() {
  let key = process.env.GOOGLE_PRIVATE_KEY || '';
  // Netlify guarda los saltos de línea como "\n" literales
  key = key.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
  return key;
}

const clients = new Map();
function clientFor(email) {
  if (!clients.has(email)) {
    clients.set(
      email,
      new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey(),
        scopes: SCOPES,
        subject: email, // actúa como esa persona
      }),
    );
  }
  return clients.get(email);
}

async function api(email, method, path, body, query = {}) {
  const client = clientFor(email);
  const url = new URL(`https://www.googleapis.com/calendar/v3${path}`);
  Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await client.request({ url: url.toString(), method, data: body });
  return res.data;
}

// Devuelve los bloques ocupados de cada persona entre timeMin y timeMax
export async function busyByHost(hosts, timeMin, timeMax) {
  const results = await Promise.all(
    hosts.map(async (h) => {
      try {
        const data = await api(h.email, 'POST', '/freeBusy', {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          timeZone: 'Europe/Madrid',
          items: [{ id: h.email }],
        });
        const cal = data.calendars?.[h.email];
        if (cal?.errors?.length) throw new Error(JSON.stringify(cal.errors));
        return [h.email, (cal?.busy || []).map((b) => [Date.parse(b.start), Date.parse(b.end)])];
      } catch (err) {
        console.error(`[calendar] freeBusy falló para ${h.email}:`, err.message);
        return [h.email, null]; // null = no sabemos; no lo ofrecemos
      }
    }),
  );
  return Object.fromEntries(results);
}

export async function createMeeting({ host, start, end, attendee, summary, description }) {
  return api(
    host.email,
    'POST',
    '/calendars/primary/events',
    {
      summary,
      description,
      start: { dateTime: start.toISOString(), timeZone: 'Europe/Madrid' },
      end: { dateTime: end.toISOString(), timeZone: 'Europe/Madrid' },
      attendees: [{ email: attendee.email, displayName: attendee.name }],
      reminders: { useDefault: true },
      conferenceData: {
        createRequest: {
          requestId: `robin-${start.getTime()}-${Math.random().toString(36).slice(2, 10)}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      extendedProperties: { private: { source: 'project-robin-web' } },
    },
    { conferenceDataVersion: 1, sendUpdates: 'all' },
  );
}
