// Idioma del visitante (es / en / pt / br) y textos que recibe el alumno en su idioma:
// invitación de Google Calendar y recordatorio de la consulta. Los avisos al equipo
// van siempre en español, con una fila "Idioma" para saber en qué idioma responder.
export const LANG_NAMES = { es: 'Español', en: 'English', pt: 'Português', br: 'Português (Brasil)' };
export const LOCALES = { es: 'es-ES', en: 'en-GB', pt: 'pt-PT', br: 'pt-BR' };

export const normLang = (v) => {
  const raw = String(v ?? '').trim().toLowerCase();
  const l = raw === 'pt-br' || raw === 'br' ? 'br' : raw.slice(0, 2);
  return l in LANG_NAMES ? l : 'es';
};

// Invitación de Google Calendar que ve el alumno
export function invitacion(lang, { name, phone, email, curso, tag, page, message }) {
  const origen = `${tag}${page ? ` (${page})` : ''}`;
  const T = {
    es: {
      summary: `Consulta gratuita Project Robin · ${name}`,
      intro: 'Primera consulta gratuita (30 min) reservada desde la web.',
      rows: [`Nombre: ${name}`, `Email: ${email}`, `Teléfono: ${phone}`, ...(curso ? [`Curso: ${curso}`] : []), `Origen: ${origen}`],
      message: '\nMensaje:\n',
    },
    en: {
      summary: `Free consultation with Project Robin · ${name}`,
      intro: 'Free first consultation (30 min) booked through the website.',
      rows: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, ...(curso ? [`Year: ${curso}`] : []), `Source: ${origen}`],
      message: '\nMessage:\n',
    },
    pt: {
      summary: `Consulta gratuita Project Robin · ${name}`,
      intro: 'Primeira consulta gratuita (30 min) reservada através do site.',
      rows: [`Nome: ${name}`, `Email: ${email}`, `Telefone: ${phone}`, ...(curso ? [`Ano: ${curso}`] : []), `Origem: ${origen}`],
      message: '\nMensagem:\n',
    },
    br: {
      summary: `Consulta gratuita Project Robin · ${name}`,
      intro: 'Primeira consulta gratuita (30 min) agendada pelo site.',
      rows: [`Nome: ${name}`, `E-mail: ${email}`, `Telefone: ${phone}`, ...(curso ? [`Ano: ${curso}`] : []), `Origem: ${origen}`],
      message: '\nMensagem:\n',
    },
  }[lang];
  return {
    summary: T.summary,
    description: [T.intro, '', ...T.rows, message ? `${T.message}${message}` : ''].join('\n'),
  };
}

// Recordatorio que recibe el alumno 2 h antes
export function recordatorio(lang, { first, cuando, meetingLink, esc }) {
  const T = {
    es: {
      subject: `Tu consulta con Project Robin es en 2 horas (${cuando})`,
      hello: `Hola ${first},`,
      body: `Te recordamos que tu primera consulta gratuita con Project Robin es <b>${esc(cuando)}</b> (hora de Madrid).`,
      join: 'Entrar a la videollamada',
      cancel: 'Si no puedes asistir, responde a este correo y buscamos otro hueco.',
      bye: '¡Hasta ahora!<br>El equipo de Robin',
      text: `Te recordamos que tu primera consulta gratuita con Project Robin es ${cuando} (hora de Madrid).`,
      link: 'Enlace',
      textBye: 'El equipo de Robin',
    },
    en: {
      subject: `Your Project Robin consultation is in 2 hours (${cuando})`,
      hello: `Hi ${first},`,
      body: `This is a reminder that your free first consultation with Project Robin is on <b>${esc(cuando)}</b> (Madrid time).`,
      join: 'Join the video call',
      cancel: 'If you cannot make it, reply to this email and we will find another slot.',
      bye: 'See you soon!<br>The Robin team',
      text: `This is a reminder that your free first consultation with Project Robin is on ${cuando} (Madrid time).`,
      link: 'Link',
      textBye: 'The Robin team',
    },
    pt: {
      subject: `A tua consulta com a Project Robin é daqui a 2 horas (${cuando})`,
      hello: `Olá ${first},`,
      body: `Lembramos-te de que a tua primeira consulta gratuita com a Project Robin é <b>${esc(cuando)}</b> (hora de Madrid).`,
      join: 'Entrar na videochamada',
      cancel: 'Se não puderes comparecer, responde a este email e encontramos outro horário.',
      bye: 'Até já!<br>A equipa da Robin',
      text: `Lembramos-te de que a tua primeira consulta gratuita com a Project Robin é ${cuando} (hora de Madrid).`,
      link: 'Ligação',
      textBye: 'A equipa da Robin',
    },
    br: {
      subject: `Sua consulta com a Project Robin é daqui a 2 horas (${cuando})`,
      hello: `Olá ${first},`,
      body: `Lembramos que a sua primeira consulta gratuita com a Project Robin é <b>${esc(cuando)}</b> (horário de Madri).`,
      join: 'Entrar na videochamada',
      cancel: 'Se você não puder participar, responda a este e-mail e encontraremos outro horário.',
      bye: 'Até já!<br>A equipe da Robin',
      text: `Lembramos que a sua primeira consulta gratuita com a Project Robin é ${cuando} (horário de Madri).`,
      link: 'Link',
      textBye: 'A equipe da Robin',
    },
  }[lang];
  const meet = meetingLink ? `<p><a href="${esc(meetingLink)}">${T.join}</a></p>` : '';
  return {
    subject: T.subject,
    html: `<p>${esc(T.hello)}</p><p>${T.body}</p>${meet}<p>${T.cancel}</p><p>${T.bye}</p>`,
    text: `${T.hello}\n\n${T.text}\n${meetingLink ? `${T.link}: ${meetingLink}\n` : ''}\n${T.cancel}\n\n${T.textBye}`,
  };
}
