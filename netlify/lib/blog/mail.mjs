// Envío de correos de la máquina de blogs.
// Usa la misma cuenta de servicio de Google que las reservas (delegación de dominio),
// enviando como hello@project-robin.com. Requiere añadir el permiso
// https://www.googleapis.com/auth/gmail.send a la delegación (ver README).
// Alternativa: si existe RESEND_API_KEY, se envía con Resend.
import { JWT } from 'google-auth-library';
import { cfg } from './config.mjs';
import { serviceAccountEmail } from '../google-calendar.mjs';

function privateKey() {
  return (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').replace(/^"|"$/g, '');
}

const b64url = (s) => Buffer.from(s, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const encSubject = (s) => `=?UTF-8?B?${Buffer.from(s, 'utf8').toString('base64')}?=`;

async function sendGmail({ to, subject, html, text }) {
  const from = cfg.emailFrom();
  const client = new JWT({
    email: serviceAccountEmail(),
    key: privateKey(),
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    subject: from,
  });
  const boundary = `robin-${Date.now().toString(36)}`;
  const raw = [
    `From: Robin Blog <${from}>`,
    `To: ${to}`,
    `Subject: ${encSubject(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(text || '', 'utf8').toString('base64'),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html, 'utf8').toString('base64'),
    `--${boundary}--`,
  ].join('\r\n');
  await client.request({
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    method: 'POST',
    data: { raw: b64url(raw) },
  });
}

async function sendResend({ to, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: `Robin Blog <${cfg.emailFrom()}>`, to: [to], subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function sendMail(msg) {
  const to = msg.to || cfg.emailTo();
  if (process.env.BLOG_EMAIL_DRY_RUN === 'true') {
    console.log(`[blog mail · simulado] → ${to}: ${msg.subject}`);
    globalThis.__blogSentMail = [...(globalThis.__blogSentMail || []), { ...msg, to }];
    return;
  }
  if (process.env.RESEND_API_KEY) return sendResend({ ...msg, to });
  return sendGmail({ ...msg, to });
}
