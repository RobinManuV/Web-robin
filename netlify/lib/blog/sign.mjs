// Enlaces firmados: el correo lleva ?s=<semana>&t=<firma> y solo quien tenga
// ese enlace puede elegir, parar o publicar los blogs de esa semana.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cfg } from './config.mjs';

export function sign(week) {
  return createHmac('sha256', cfg.secret()).update(`blog:${week}`).digest('base64url').slice(0, 32);
}

export function verify(week, token) {
  if (!cfg.secret() || !week || !token) return false;
  const a = Buffer.from(sign(week));
  const b = Buffer.from(String(token));
  return a.length === b.length && timingSafeEqual(a, b);
}

// Llamadas internas entre funciones (cabecera x-blog-secret)
export function internalOk(req) {
  const s = cfg.secret();
  return Boolean(s) && req.headers.get('x-blog-secret') === s;
}

export function link(path, week, extra = {}) {
  const u = new URL(path, cfg.siteUrl());
  u.searchParams.set('s', week);
  u.searchParams.set('t', sign(week));
  Object.entries(extra).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}
