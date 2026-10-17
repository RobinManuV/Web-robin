// Webinar para padres. Lo usan la landing (/webinar21-11/) y el correo de confirmación
// (netlify/lib/webinar.mjs), así que fecha, hora y enlace del grupo se cambian solo aquí.
export const WEBINAR = {
  // Fin de la cuenta atrás: sábado 21 de noviembre de 2026, 12:00 (Madrid, CET = UTC+1)
  fechaISO: '2026-11-21T12:00:00+01:00',
  fechaTexto: 'sábado 21 de noviembre de 2026',
  fechaCorta: '21 de noviembre',
  hora: '12:00',
  zona: 'hora de Madrid',
  // El enlace de la emisión se manda por el grupo el día antes
  diaEnlace: 'viernes 20 de noviembre',
  // Grupo de WhatsApp (enlace de invitación sin parámetros de seguimiento)
  whatsapp: 'https://chat.whatsapp.com/KuMAsBfBlLJHAvWgX5j9dE',
};
