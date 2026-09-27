// Crea los leads en la "Main Database" de Notion.
// Variables: NOTION_TOKEN (integración interna) y NOTION_DATABASE_ID.
//
// Columnas que rellena (tal cual se llaman hoy en Notion):
//   Nombre · Email · Phone · Contact date · comentario primer contacto ·
//   TIPO · Meeting · responsable · colegio · Origen web
// "Origen web" guarda la etiqueta de la página/landing (general, pack-llegada,
// colegios, holanda-maastricht…). Si la columna no existe, se crea el lead igual
// y la etiqueta queda escrita en el comentario.

const NOTION_VERSION = '2022-06-28';

// Etiqueta de la web → opción de la columna TIPO que ya usáis
function tipoFromTag(tag = '') {
  const t = tag.toLowerCase();
  if (t.includes('llegada')) return 'Llegada';
  if (t.includes('mentoria') || t.includes('mentoría')) return 'Mentoría';
  if (t.includes('delft')) return 'Delft';
  if (t.includes('latam')) return 'LATAM';
  return 'General';
}

function madridToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
}

const rt = (s) => [{ type: 'text', text: { content: String(s).slice(0, 1990) } }];

function responsableOption(name = '') {
  const n = name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  if (n.startsWith('noel')) return 'Noel';
  if (n.startsWith('maria')) return 'María';
  if (n.startsWith('manuel') || n.startsWith('manu')) return 'Manuel';
  return null;
}

export async function createLead(lead) {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_DATABASE_ID;
  if (!token || !db) {
    console.warn('[notion] Falta NOTION_TOKEN o NOTION_DATABASE_ID; el lead no se envía a Notion');
    return { skipped: true };
  }

  const comment = [
    lead.tag && `Origen web: ${lead.tag}`,
    lead.form && `Formulario: ${lead.form}`,
    lead.servicio && `Servicio: ${lead.servicio}`,
    lead.cargo && `Cargo: ${lead.cargo}`,
    lead.page && `Página: ${lead.page}`,
    lead.meetingLink && `Meet: ${lead.meetingLink}`,
    lead.message && `\n${lead.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  const props = {
    Nombre: { title: rt(lead.name || lead.email || 'Lead web') },
    'Contact date': { date: { start: madridToday() } },
    TIPO: { select: { name: tipoFromTag(lead.tag) } },
    'comentario primer contacto': { rich_text: rt(comment) },
  };
  if (lead.email) props.Email = { email: lead.email };
  if (lead.phone) props.Phone = { phone_number: lead.phone };
  if (lead.colegio) props.colegio = { rich_text: rt(lead.colegio) };
  if (lead.meetingStart) props.Meeting = { date: { start: lead.meetingStart, time_zone: 'Europe/Madrid' } };
  const resp = responsableOption(lead.host);
  if (resp) props.responsable = { multi_select: [{ name: resp }] };

  const send = (properties) =>
    fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id: db }, properties }),
    });

  // Intento 1: con la columna "Origen web"
  let res = await send(lead.tag ? { ...props, 'Origen web': { select: { name: lead.tag.slice(0, 90) } } } : props);
  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 400 && txt.includes('Origen web')) {
      res = await send(props); // la columna no existe todavía
    } else {
      throw new Error(`Notion ${res.status}: ${txt}`);
    }
  }
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  const page = await res.json();
  return { id: page.id, url: page.url };
}
