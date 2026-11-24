// Guarda un lead recibido desde cualquier formulario público en el CRM.
import { LANG_NAMES, normLang, paisDeTag } from './lang.mjs';

const clean = (value, max = 10000) => String(value ?? '').trim().slice(0, max);

export async function saveCrmLead(lead) {
  const baseUrl = String(process.env.ADMIN_SUPABASE_URL || process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.ADMIN_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE || 'crm_leads';
  if (!baseUrl || !key) throw new Error('CRM Supabase credentials are not configured');

  const message = clean(lead.message);
  const details = [
    message && `Mensaje del formulario:\n${message}`,
    lead.form && `Formulario: ${clean(lead.form, 80)}`,
    lead.page && `Página: ${clean(lead.page, 300)}`,
    paisDeTag(lead.tag) && `País: ${paisDeTag(lead.tag)}`,
    `Idioma: ${LANG_NAMES[normLang(lead.lang)]}`,
    lead.curso && `Curso: ${clean(lead.curso, 60)}`,
    lead.educacion && `Sistema educativo: ${clean(lead.educacion, 60)}`,
    lead.intereses && `Intereses: ${clean(lead.intereses, 400)}`,
    lead.colegio && `Colegio: ${clean(lead.colegio, 200)}`,
    lead.cargo && `Cargo: ${clean(lead.cargo, 160)}`,
  ].filter(Boolean).join('\n\n');
  const now = new Date().toISOString();
  let retargeting = isRetargetingReservation(lead);
  const row = {
    name: clean(lead.name, 240) || clean(lead.email, 320) || clean(lead.phone, 80) || 'Lead web',
    email: clean(lead.email, 320).toLowerCase() || null,
    phone: clean(lead.phone, 80) || null,
    summary: [lead.servicio, lead.tag].map((value) => clean(value, 100)).filter(Boolean).join(' · ') || null,
    body_text: message || details || null,
    comment: details || null,
    crm_stage: 'Por contactar',
    source_payload: {
      source: 'website',
      form_name: clean(lead.form, 80) || 'contacto',
      tag: clean(lead.tag, 100) || null,
      page_url: clean(lead.page, 300) || null,
      lang: normLang(lead.lang),
      country: paisDeTag(lead.tag) || null,
      service: clean(lead.servicio, 120) || null,
      course: clean(lead.curso, 60) || null,
      education_system: clean(lead.educacion, 60) || null,
      interests: clean(lead.intereses, 400) || null,
      school: clean(lead.colegio, 200) || null,
      role: clean(lead.cargo, 160) || null,
      utm_source: clean(lead.utm_source, 160) || null,
      utm_medium: clean(lead.utm_medium, 160) || null,
      created_via: 'website_form',
    },
    source_created_at: now,
    source_updated_at: now,
  };

  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' };
  const endpoint = `${baseUrl}/rest/v1/${encodeURIComponent(table)}`;
  let existing = null;
  const identities = (retargeting ? [emailFilter(lead.email), phoneFilter(lead.phone)] : [emailFilter(lead.email) || phoneFilter(lead.phone)]).filter(Boolean);
  for (const identity of identities) {
    const lookup = new URLSearchParams({ select: 'id,source_payload', limit: '1', ...identity });
    const found = await fetch(`${endpoint}?${lookup}`, { headers });
    if (!found.ok) throw new Error(`Supabase lookup ${found.status}: ${await found.text()}`);
    existing = (await found.json())[0] || null;
    if (existing) break;
  }
  retargeting ||= lead.form === 'reserva' && existing?.source_payload?.reactivation_30d?.campaign_id === 'holanda-inactive-30d-v1';
  if (retargeting) {
    const reservation = { ...row.source_payload, email: row.email, received_at: now };
    row.source_payload = {
      ...(existing?.source_payload || row.source_payload),
      retargeting_reservation: reservation,
      ...(!existing ? { exclude_from_acquisition: true } : {}),
    };
  } else if (existing) {
    row.source_payload = { ...(existing.source_payload || {}), ...row.source_payload };
  }
  // Reactivation must not reset acquisition, stage or advisor on an existing lead.
  const fields = retargeting && existing ? { source_payload: row.source_payload, source_updated_at: now } : row;
  const response = existing
    ? await fetch(`${endpoint}?id=eq.${encodeURIComponent(existing.id)}`, { method: 'PATCH', headers, body: JSON.stringify(fields) })
    : await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(fields) });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
  return { saved: true, updated: Boolean(existing) };
}

function isRetargetingReservation(lead) {
  if (clean(lead.form, 80).toLowerCase() !== 'reserva') return false;
  try {
    const url = new URL(lead.page, 'https://project-robin.com');
    return ['http:', 'https:'].includes(url.protocol)
      && ['project-robin.com', 'www.project-robin.com'].includes(url.hostname)
      && url.pathname.replace(/\/+$/, '').toLowerCase() === '/retarwebinar21-11';
  } catch (_) { return false; }
}

function emailFilter(value) {
  const email = clean(value, 320).toLowerCase();
  return email ? { email: `ilike.${email}` } : null;
}

function phoneFilter(value) {
  const phone = clean(value, 80);
  return phone ? { phone: `eq.${phone}` } : null;
}
