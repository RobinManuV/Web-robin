// Se ejecuta después de `astro build`.
// Genera dist/_redirects con:
//  1. (Opcional) El portal del alumno: si se define PORTAL_ORIGIN, /login y /portal/*
//     se sirven desde ese sitio de Netlify. Si no, el botón Log In apunta a
//     https://project-robin.com/login, que hoy resuelve Cloudflare.
//  2. Redirecciones 301 de URLs antiguas de WordPress que no deben dar 404.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const origin = (process.env.PORTAL_ORIGIN || '').replace(/\/+$/, '');
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
  '# URLs antiguas de WordPress',
  '/feed/*              /blog/                 301',
  '/feed                /blog/                 301',
  '/comments/feed/*     /blog/                 301',
  '/wp-admin/*          /                      301',
  '/wp-login.php        https://project-robin.com/login   301',
  '/author/*            /sobre-nosotros/       301',
  '/category/*          /blog/                 301',
  '/servicios/pack-llegada/  /servicios/asesoramiento-completo/  301',
  '',
);

const file = 'dist/_redirects';
const previous = existsSync(file) ? readFileSync(file, 'utf8') : '';
writeFileSync(file, lines.join('\n') + '\n' + previous);
console.log(`✓ dist/_redirects generado${origin ? ` (portal: ${origin})` : ''}`);
