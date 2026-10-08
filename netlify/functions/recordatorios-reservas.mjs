// Función programada: cada 10 minutos envía el recordatorio de las consultas que empiezan en ≤ 2 h.
import { enviarRecordatorios } from '../lib/reservas.mjs';

export default async () => {
  const n = await enviarRecordatorios();
  console.log(`[recordatorios] enviados: ${n}`);
};

export const config = { schedule: '*/10 * * * *' };
