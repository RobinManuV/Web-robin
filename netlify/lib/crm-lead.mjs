// Guarda un lead recibido desde cualquier formulario público en el CRM.
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
    lead.colegio && `Colegio: ${clean(lead.colegio, 200)}`,
    lead.cargo && `Cargo: ${clean(lead.cargo, 160)}`,
  ].filter(Boolean).join('\n\n');
  const now = new Date().toISOString();
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
      service: clean(lead.servicio, 120) || null,
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
  const identity = emailFilter(lead.email) || phoneFilter(lead.phone);
  if (identity) {
    const lookup = new URLSearchParams({ select: 'id,source_payload', limit: '1', ...identity });
    const found = await fetch(`${endpoint}?${lookup}`, { headers });
    if (!found.ok) throw new Error(`Supabase lookup ${found.status}: ${await found.text()}`);
    existing = (await found.json())[0] || null;
  }
  if (existing) {
    row.source_payload = { ...(existing.source_payload || {}), ...row.source_payload };
  }
  const response = existing
    ? await fetch(`${endpoint}?id=eq.${encodeURIComponent(existing.id)}`, { method: 'PATCH', headers, body: JSON.stringify(row) })
    : await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(row) });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
  return { saved: true, updated: Boolean(existing) };
}

function emailFilter(value) {
  const email = clean(value, 320).toLowerCase();
  return email ? { email: `ilike.${email}` } : null;
}

function phoneFilter(value) {
  const phone = clean(value, 80);
  return phone ? { phone: `eq.${phone}` } : null;
}
