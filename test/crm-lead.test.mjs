import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { saveCrmLead } from '../netlify/lib/crm-lead.mjs';

beforeEach((t) => {
  const keys = ['ADMIN_SUPABASE_URL', 'ADMIN_SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_LEADS_TABLE'];
  const original = keys.map((key) => process.env[key]);
  process.env.ADMIN_SUPABASE_URL = 'https://crm.example.test';
  process.env.ADMIN_SUPABASE_SERVICE_ROLE_KEY = 'test-key';
  process.env.SUPABASE_LEADS_TABLE = 'crm_leads';
  t.after(() => keys.forEach((key, i) => original[i] === undefined ? delete process.env[key] : process.env[key] = original[i]));
});

const reservation = { name: 'Contacto de prueba', email: 'known@example.com', phone: '+34600000000', form: 'reserva', page: '/retarwebinar21-11/', lang: 'es' };

function mockCrm(t, { byEmail = null, byPhone = null, lookupStatus = 200, writeStatus = 201 } = {}) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (input, options = {}) => {
    const url = new URL(input);
    assert.equal(url.origin, 'https://crm.example.test');
    assert.equal(url.pathname, '/rest/v1/crm_leads');
    const method = options.method || 'GET';
    calls.push({ method, url, row: options.body ? JSON.parse(options.body) : null });
    if (method !== 'GET') return new Response('', { status: writeStatus });
    const existing = url.searchParams.has('email') ? byEmail : byPhone;
    return Response.json(existing ? [existing] : [], { status: lookupStatus });
  });
  return calls;
}

test('nuevas reservas de la landing guardan la marca y se excluyen de captación', async (t) => {
  const calls = mockCrm(t);
  const result = await saveCrmLead({ ...reservation, curso: 'Penúltimo curso (1º Bach, IB1, Year 12…)' });
  assert.deepEqual(result, { saved: true, updated: false });
  const writes = calls.filter((call) => call.method !== 'GET');
  assert.equal(writes.length, 1);
  assert.equal(writes[0].method, 'POST');
  const payload = writes[0].row.source_payload;
  assert.equal(payload.source, 'website');
  assert.equal(payload.form_name, 'reserva');
  assert.equal(payload.exclude_from_acquisition, true);
  assert.equal(payload.retargeting_reservation.page_url, '/retarwebinar21-11/');
  assert.equal(payload.retargeting_reservation.email, 'known@example.com');
  assert.equal(payload.retargeting_reservation.received_at, writes[0].row.source_created_at);
  assert.ok(Number.isFinite(Date.parse(payload.retargeting_reservation.received_at)));
});

test('el contacto existente conserva captación, fecha, asesor y fase; solo se añade la reserva', async (t) => {
  const existing = Object.freeze({
    id: 'known-lead', crm_stage: 'Contactado', owner_names: ['Manuel'], source_created_at: '2026-11-18T12:00:00Z',
    source_payload: Object.freeze({ source: 'meta', campaign_name: 'Webinar 21-11', page_url: '/webinar21-11/', form_name: 'webinar', crm_notes: [{ body: 'Nota existente' }] }),
  });
  const calls = mockCrm(t, { byEmail: existing });
  assert.deepEqual(await saveCrmLead(reservation), { saved: true, updated: true });
  assert.equal(calls.length, 2);
  const write = calls[1];
  assert.equal(write.method, 'PATCH');
  assert.equal(write.url.searchParams.get('id'), 'eq.known-lead');
  assert.deepEqual(Object.keys(write.row).sort(), ['source_payload', 'source_updated_at']);
  const { retargeting_reservation, ...original } = write.row.source_payload;
  assert.deepEqual(original, existing.source_payload);
  assert.equal(retargeting_reservation.form_name, 'reserva');
  assert.equal(retargeting_reservation.page_url, '/retarwebinar21-11/');
  assert.equal(existing.source_payload.retargeting_reservation, undefined);
});

test('retargeting busca también por teléfono si no coincide el correo y evita crear otra ficha', async (t) => {
  const calls = mockCrm(t, { byPhone: { id: 'phone-match', source_payload: { source: 'meta' } } });
  await saveCrmLead(reservation);
  assert.deepEqual(calls.map((call) => call.method), ['GET', 'GET', 'PATCH']);
  assert.equal(calls[0].url.searchParams.get('email'), 'ilike.known@example.com');
  assert.equal(calls[1].url.searchParams.get('phone'), 'eq.+34600000000');
  assert.equal(calls[2].url.searchParams.get('id'), 'eq.phone-match');
  assert.equal(calls[2].row.source_payload.retargeting_reservation.email, reservation.email);
});

test('una segunda reserva mantiene la exclusión de la ficha de retargeting', async (t) => {
  const calls = mockCrm(t, { byEmail: { id: 'retargeting-lead', source_payload: { source: 'website', exclude_from_acquisition: true } } });
  await saveCrmLead(reservation);
  assert.equal(calls[1].row.source_payload.exclude_from_acquisition, true);
  assert.ok(calls[1].row.source_payload.retargeting_reservation.received_at);
});

test('la regla solo afecta a reservas de la URL exacta', async (t) => {
  for (const lead of [
    { ...reservation, page: '/retarwebinar21-11-extra/' },
    { ...reservation, page: '/contacto/?next=/retarwebinar21-11/' },
    { ...reservation, page: 'https://example.com/retarwebinar21-11/' },
    { ...reservation, page: 'javascript:/retarwebinar21-11/' },
    { ...reservation, form: 'contacto' },
  ]) {
    await t.test(`${lead.form}: ${lead.page}`, async (t) => {
      const calls = mockCrm(t);
      await saveCrmLead(lead);
      assert.equal(calls.length, 2);
      assert.equal(calls[1].row.source_payload.retargeting_reservation, undefined);
      assert.equal(calls[1].row.source_payload.exclude_from_acquisition, undefined);
    });
  }
});

test('admite URL absoluta con parámetros sin cambiar la URL original guardada', async (t) => {
  const calls = mockCrm(t);
  const page = 'https://project-robin.com/RETARWEBINAR21-11/?utm_source=meta';
  await saveCrmLead({ ...reservation, page });
  assert.equal(calls.at(-1).row.source_payload.retargeting_reservation.page_url, page);
});

test('un fallo de consulta no crea otra ficha por error', async (t) => {
  const calls = mockCrm(t, { lookupStatus: 503 });
  await assert.rejects(saveCrmLead(reservation), /Supabase lookup 503/);
  assert.deepEqual(calls.map((call) => call.method), ['GET']);
});

test('un fallo al guardar la reserva se comunica al handler', async (t) => {
  mockCrm(t, { writeStatus: 503 });
  await assert.rejects(saveCrmLead(reservation), /Supabase 503/);
});

test('la reserva habitual de un lead de la secuencia 30d conserva su campaña y registro original', async (t) => {
  const existing = { id: 'original-30d', source_payload: { source: 'meta', campaign_name: 'Campaña continua Candela', reactivation_30d: { campaign_id: 'holanda-inactive-30d-v1' } } };
  const calls = mockCrm(t, { byEmail: existing });
  await saveCrmLead({ ...reservation, page: '/contacto/' });
  assert.deepEqual(calls.map(call => call.method), ['GET', 'PATCH']);
  const update = calls[1];
  assert.equal(update.url.searchParams.get('id'), 'eq.original-30d');
  assert.deepEqual(Object.keys(update.row).sort(), ['source_payload', 'source_updated_at']);
  assert.equal(update.row.source_payload.campaign_name, 'Campaña continua Candela');
  assert.equal(update.row.source_payload.source, 'meta');
  assert.equal(update.row.source_payload.retargeting_reservation.page_url, '/contacto/');
  assert.equal(update.row.source_payload.exclude_from_acquisition, undefined);
});
