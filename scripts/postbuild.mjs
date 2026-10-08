// Se ejecuta después de `astro build`.
// Genera dist/_redirects con:
//  1. (Opcional) El portal del alumno: si se define PORTAL_ORIGIN, /login y /portal/*
//     se sirven desde ese sitio de Netlify. Si no, el botón Log In apunta a
//     https://project-robin.com/login, que hoy resuelve Cloudflare.
//  2. Redirecciones 301 de URLs antiguas de WordPress que no deben dar 404.
import { writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { ESPANA_PUBLICADA, ESPANA_RUTAS } from '../src/data/site.js';

const origin = (process.env.PORTAL_ORIGIN || '').replace(/\/+$/, '');
const adminOrigin = (process.env.PUBLIC_ADMIN_ORIGIN || 'https://robin-admin-platform.netlify.app').replace(/\/+$/, '');
const lines = [];

if (origin) {
  lines.push(
    '# Portal del alumno (proxy, la URL se queda en project-robin.com)',
    `/login        ${origin}/portal/   200!`,
    `/login/       ${origin}/portal/   200!`,
    `/login/*      ${origin}/portal/   200!`,
    `/portal       ${origin}/portal/   200!`,
    `/portal/*     ${origin}/portal/:splat   200!`,
    '',
  );
}

lines.push(
  '# Acceso corto al login administrativo',
  `/admin        ${adminOrigin}/   302`,
  `/admin/       ${adminOrigin}/   302`,
  '',
  '# URLs antiguas de WordPress',
  '/feed/*              /blog/                 301',
  '/feed                /blog/                 301',
  '/comments/feed/*     /blog/                 301',
  '/wp-admin/*          /                      301',
  '/wp-login.php        https://project-robin.com/login   301',
  '/author/*            /sobre-nosotros/       301',
  '/category/*          /blog/                 301',
  '/servicios/erasmus/        /servicios/            301',
  '/servicios/erasmus         /servicios/            301',
  '',
);

// España sin publicar: se borran sus páginas del build y redirigen a la home (302 temporal).
if (!ESPANA_PUBLICADA) {
  for (const r of ESPANA_RUTAS) rmSync(`dist${r}`, { recursive: true, force: true });
  lines.push(
    '# España sin publicar (ESPANA_PUBLICADA = false en src/data/site.js)',
    ...ESPANA_RUTAS.flatMap((r) => [`${r.replace(/\/$/, '')}   /   302!`, `${r}   /   302!`]),
    '',
  );
}

const file = 'dist/_redirects';
const previous = existsSync(file) ? readFileSync(file, 'utf8') : '';
writeFileSync(file, lines.join('\n') + '\n' + previous);
console.log(`✓ dist/_redirects generado${origin ? ` (portal: ${origin})` : ''}${ESPANA_PUBLICADA ? '' : ' · España oculta'}`);
