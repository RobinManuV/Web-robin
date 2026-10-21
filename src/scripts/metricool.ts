// ============================================================
// Metricool (tracker de analítica web).
//
// Igual que src/scripts/analytics.ts: SOLO se carga si el visitante ha aceptado
// las cookies de analítica en la ventana de cookies. Si no ha aceptado, no se
// descarga ni se ejecuta nada de Metricool.
// ============================================================

const TRACKER_SRC = 'https://tracker.metricool.com/resources/be.js';
const TRACKER_HASH = 'ca7834ca7caffbaf64d6b96f89878536';
// Misma clave, versión y caducidad que src/components/CookieBanner.astro
const CONSENT_KEY = 'robin-consent';
const CONSENT_VERSION = 2;
const CONSENT_MAX_DAYS = 365;

let loaded = false;

function consentGiven(): boolean {
  try {
    const s = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (!s || s.v !== CONSENT_VERSION) return false;
    if (Date.now() - new Date(s.date).getTime() > CONSENT_MAX_DAYS * 864e5) return false;
    return !!s.analytics;
  } catch {
    return false;
  }
}

function load() {
  if (loaded) return;
  loaded = true;
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = TRACKER_SRC;
  const start = () => (window as any).beTracker?.t({ hash: TRACKER_HASH });
  script.onload = start;
  (script as any).onreadystatechange = start;
  document.head.appendChild(script);
}

if (consentGiven()) load();
window.addEventListener('robin:consent', ((e: CustomEvent) => {
  if (e.detail?.analytics) load();
}) as EventListener);
