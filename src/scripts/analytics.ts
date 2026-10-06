// ============================================================
// Medición propia de Project Robin (panel "Web" del gestor Robin-Admin).
//
// SOLO funciona si el visitante ha aceptado las cookies de analítica en la
// ventana de cookies. Si no ha aceptado (o las rechaza después), no se envía nada.
//
// Qué mide: páginas vistas, de dónde viene, clics (con su posición dentro del
// elemento, para los mapas de calor), hasta dónde baja, tiempo activo, página de
// salida, vídeos (reproducción y % visto), formularios empezados/enviados,
// velocidad de carga (Core Web Vitals) y errores de JavaScript.
//
// Adónde lo manda: a PUBLIC_ANALYTICS_ENDPOINT (función web-collect del gestor).
// No guarda nombres, emails ni teléfonos: nunca lee lo que se escribe en los formularios.
// ============================================================

// Gestor Robin-Admin (se puede cambiar con la variable PUBLIC_ANALYTICS_ENDPOINT en Netlify)
const ENDPOINT = (import.meta.env.PUBLIC_ANALYTICS_ENDPOINT as string | undefined) || 'https://robin-admin-platform.netlify.app/api/web/collect';
const CONSENT_KEY = 'robin-consent';
const CONSENT_VERSION = 2;
const CONSENT_MAX_DAYS = 365;
const VISITOR_KEY = 'robin-vid'; // identificador aleatorio del navegador (13 meses)
const SESSION_KEY = 'robin-sid'; // identificador de la visita (30 min sin actividad)
const SESSION_IDLE_MS = 30 * 60 * 1000;

type Ev = { type: string; t: number; [k: string]: unknown };

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

const rid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

function visitorId(): string {
  try {
    const saved = JSON.parse(localStorage.getItem(VISITOR_KEY) || 'null');
    if (saved?.id && Date.now() - saved.at < 395 * 864e5) return saved.id;
    const id = rid();
    localStorage.setItem(VISITOR_KEY, JSON.stringify({ id, at: Date.now() }));
    return id;
  } catch {
    return 'anon';
  }
}

function sessionInfo(): { id: string; isNew: boolean } {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    if (saved?.id && Date.now() - saved.last < SESSION_IDLE_MS) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...saved, last: Date.now() }));
      return { id: saved.id, isNew: false };
    }
    const id = rid();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, last: Date.now() }));
    return { id, isNew: true };
  } catch {
    return { id: rid(), isNew: true };
  }
}

function device(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
}

// Selector corto y estable para volver a encontrar el elemento al pintar el mapa de calor
export function cssPath(el: Element | null): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node.nodeType === 1 && node !== document.body && parts.length < 6) {
    if (node.id && !/\d{3,}/.test(node.id)) {
      parts.unshift(`#${CSS.escape(node.id)}`);
      break;
    }
    const tag = node.tagName.toLowerCase();
    const parent: Element | null = node.parentElement;
    let part = tag;
    if (parent) {
      const same = [...parent.children].filter((c) => c.tagName === node!.tagName);
      if (same.length > 1) part += `:nth-of-type(${same.indexOf(node) + 1})`;
    }
    parts.unshift(part);
    node = parent;
  }
  return parts.join('>');
}

function labelOf(el: Element): string {
  const a = el.closest('a,button,[data-track],summary,label,input,select');
  const target = a || el;
  const text = (target.getAttribute('data-track') || target.getAttribute('aria-label') || (target as HTMLElement).innerText || target.getAttribute('alt') || '').trim();
  return text.replace(/\s+/g, ' ').slice(0, 80);
}

let started = false;
let stopped = false;

function start() {
  if (started || !ENDPOINT) return;
  started = true;
  stopped = false;

  const vid = visitorId();
  const session = sessionInfo();
  const path = location.pathname;
  const queue: Ev[] = [];
  const is404 = !!document.querySelector('meta[name="robin-404"]');

  const push = (type: string, data: Record<string, unknown> = {}) => {
    if (stopped) return;
    queue.push({ type, t: Date.now(), ...data });
    if (queue.length >= 20) flush();
  };

  function flush(useBeacon = false) {
    if (!queue.length || stopped) return;
    const body = JSON.stringify({ v: 1, vid, sid: session.id, path, device: device(), events: queue.splice(0) });
    // text/plain evita la petición previa CORS; el servidor lo lee como JSON
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT!, new Blob([body], { type: 'text/plain' }));
    } else {
      fetch(ENDPOINT!, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {});
    }
  }
  const timer = window.setInterval(() => flush(), 5000);

  // ---------- Página vista y origen ----------
  const params = new URLSearchParams(location.search);
  let ref = '';
  try {
    ref = document.referrer && new URL(document.referrer).host !== location.host ? document.referrer : '';
  } catch {}
  push('page_view', {
    title: document.title.slice(0, 160),
    ref: ref.slice(0, 300),
    new_session: session.isNew,
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    vw: window.innerWidth,
    lang: navigator.language,
    is404: is404 || undefined,
  });

  // ---------- Clics (mapa de calor) ----------
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null;
      if (!target || target.closest('[data-cookie-banner]')) return;
      const el = target.closest('a,button,input,select,textarea,summary,label,[data-track]') || target;
      const r = el.getBoundingClientRect();
      const link = el.closest('a');
      push('click', {
        sel: cssPath(el),
        rx: r.width ? +((e.clientX - r.left) / r.width).toFixed(3) : 0.5,
        ry: r.height ? +((e.clientY - r.top) / r.height).toFixed(3) : 0.5,
        x: Math.round(e.pageX),
        y: Math.round(e.pageY),
        pw: document.documentElement.scrollWidth,
        ph: document.documentElement.scrollHeight,
        label: labelOf(el),
        tag: el.tagName.toLowerCase(),
        href: link ? link.getAttribute('href')?.slice(0, 200) : undefined,
        cta: !!el.closest('.btn,[data-track]') || undefined,
      });
    },
    { capture: true, passive: true },
  );

  // ---------- Scroll y tiempo activo ----------
  let maxDepth = 0;
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const d = h > 0 ? Math.min(100, Math.round((window.scrollY / h) * 100)) : 100;
    if (d > maxDepth) maxDepth = d;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let activeMs = 0;
  let lastTick = Date.now();
  let lastInput = Date.now();
  ['pointermove', 'keydown', 'scroll', 'touchstart'].forEach((ev) => window.addEventListener(ev, () => (lastInput = Date.now()), { passive: true }));
  const tick = window.setInterval(() => {
    const now = Date.now();
    // Cuenta como activo si la pestaña está visible y hubo actividad en los últimos 30 s
    if (document.visibilityState === 'visible' && now - lastInput < 30000) activeMs += now - lastTick;
    lastTick = now;
  }, 1000);

  // ---------- Formularios (nunca se lee lo escrito) ----------
  const formName = (f: HTMLFormElement) => {
    const n = (f.querySelector('input[name="form-name"]') as HTMLInputElement)?.value || f.getAttribute('name') || (f.closest('[data-booking]') ? 'reserva' : 'formulario');
    const tag = (f.querySelector('input[name="tag"]') as HTMLInputElement)?.value || (f.closest('[data-booking]') as HTMLElement)?.dataset.tag || '';
    return { form: n.slice(0, 40), form_tag: tag.slice(0, 80) };
  };
  const startedForms = new WeakSet<HTMLFormElement>();
  document.addEventListener(
    'focusin',
    (e) => {
      const f = (e.target as Element)?.closest?.('form') as HTMLFormElement | null;
      if (!f || startedForms.has(f)) return;
      startedForms.add(f);
      push('form_start', formName(f));
    },
    true,
  );
  document.addEventListener('submit', (e) => push('form_submit', formName(e.target as HTMLFormElement)), true);

  // ---------- Vídeos (YouTube) ----------
  const videoProgress = new Map<string, Set<number>>();
  window.addEventListener('robin:video-play', ((e: CustomEvent) => {
    push('video_play', { video: e.detail.id, title: e.detail.title, where: e.detail.where });
  }) as EventListener);
  window.addEventListener('message', (e) => {
    if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin || 'http://x').host)) return;
    let data: any;
    try {
      data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
    } catch {
      return;
    }
    const info = data?.info;
    if (!info || !info.duration || info.currentTime == null) return;
    const frame = [...document.querySelectorAll<HTMLIFrameElement>('[data-yt] iframe')].find((f) => f.contentWindow === e.source);
    const id = frame?.closest<HTMLElement>('[data-yt]')?.dataset.yt;
    if (!id) return;
    const pct = (info.currentTime / info.duration) * 100;
    const done = videoProgress.get(id) || new Set<number>();
    for (const m of [25, 50, 75, 95]) {
      if (pct >= m && !done.has(m)) {
        done.add(m);
        push('video_progress', { video: id, pct: m === 95 ? 100 : m });
      }
    }
    videoProgress.set(id, done);
  });

  // ---------- Velocidad (Core Web Vitals) ----------
  const vitals: Record<string, number> = {};
  try {
    new PerformanceObserver((l) => {
      const last = l.getEntries().at(-1) as any;
      if (last) vitals.lcp = Math.round(last.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as any[]) if (!e.hadRecentInput) vitals.cls = +((vitals.cls || 0) + e.value).toFixed(4);
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as any[]) vitals.inp = Math.max(vitals.inp || 0, Math.round(e.duration));
    }).observe({ type: 'event', buffered: true, durationThreshold: 40 } as any);
  } catch {}
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

  // ---------- Errores de JavaScript ----------
  let errors = 0;
  window.addEventListener('error', (e) => {
    if (errors++ >= 5) return;
    push('js_error', { msg: String(e.message).slice(0, 200), src: String(e.filename || '').slice(0, 200), line: e.lineno });
  });

  // ---------- Salida de la página ----------
  let left = false;
  const leave = () => {
    if (left) return;
    left = true;
    push('page_leave', {
      active_ms: activeMs,
      depth: maxDepth,
      lcp: vitals.lcp,
      cls: vitals.cls,
      inp: vitals.inp,
      ttfb: nav ? Math.round(nav.responseStart) : undefined,
    });
    flush(true);
  };
  window.addEventListener('pagehide', leave);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });

  // Si el visitante retira el consentimiento, se deja de medir en el acto
  window.addEventListener('robin:consent', ((e: CustomEvent) => {
    if (!e.detail?.analytics) {
      stopped = true;
      queue.length = 0;
      clearInterval(timer);
      clearInterval(tick);
      try {
        localStorage.removeItem(VISITOR_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      } catch {}
    }
  }) as EventListener);
}

// Dentro del panel (mapa de calor) la página no se mide
const inHeatmap = new URLSearchParams(location.search).has('robin_heatmap');
if (inHeatmap) {
  import('./heatmap-view').then((m) => m.initHeatmapView());
} else {
  if (consentGiven()) start();
  window.addEventListener('robin:consent', ((e: CustomEvent) => {
    if (e.detail?.analytics) {
      started = false;
      start();
    }
  }) as EventListener);
}
