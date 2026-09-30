// ============================================================
// Modo "mapa de calor": el gestor (Robin-Admin) abre la página en un iframe con
// ?robin_heatmap=1 y le envía los clics y el scroll medidos. La propia página los
// pinta encima de sí misma, así cada clic cae exactamente sobre su elemento aunque
// el ancho de pantalla sea distinto al del visitante.
// Solo acepta mensajes del origen del gestor (PUBLIC_ADMIN_ORIGIN).
// ============================================================

type Click = { sel?: string; rx?: number; ry?: number; x?: number; y?: number; pw?: number; n?: number };
type ScrollBand = { depth: number; pct: number }; // % de visitas que llegan a esa profundidad
type Msg = { type: 'robin-heatmap'; mode: 'clicks' | 'scroll'; clicks?: Click[]; scroll?: ScrollBand[] };

const ADMIN_ORIGIN = (import.meta.env.PUBLIC_ADMIN_ORIGIN as string | undefined)?.replace(/\/+$/, '') || '';
const allowed = (origin: string) => !!ADMIN_ORIGIN && ADMIN_ORIGIN.split(',').map((o) => o.trim()).includes(origin);

let layer: HTMLDivElement | null = null;

function docSize() {
  const el = document.documentElement;
  return { w: el.scrollWidth, h: Math.max(el.scrollHeight, document.body.scrollHeight) };
}

function reportSize() {
  if (window.parent === window || !ADMIN_ORIGIN) return;
  const { w, h } = docSize();
  for (const o of ADMIN_ORIGIN.split(',')) window.parent.postMessage({ type: 'robin-heatmap-size', w, h, path: location.pathname }, o.trim());
}

function resetLayer() {
  layer?.remove();
  const { w, h } = docSize();
  layer = document.createElement('div');
  Object.assign(layer.style, { position: 'absolute', left: '0', top: '0', width: `${w}px`, height: `${h}px`, pointerEvents: 'none', zIndex: '2147483646' });
  document.body.appendChild(layer);
  return { w, h };
}

// Paleta clásica: azul (pocos) → verde → amarillo → rojo (muchos)
function palette(): Uint8ClampedArray {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 1;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0.15, 'rgba(0,70,255,1)');
  grad.addColorStop(0.45, 'rgba(0,210,120,1)');
  grad.addColorStop(0.7, 'rgba(255,220,0,1)');
  grad.addColorStop(1, 'rgba(255,40,0,1)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 1);
  return g.getImageData(0, 0, 256, 1).data;
}

function drawClicks(clicks: Click[]) {
  const { w, h } = resetLayer();
  const scale = w * h > 6e6 ? Math.sqrt(6e6 / (w * h)) : 1; // limita la memoria en páginas muy largas
  const cw = Math.max(1, Math.round(w * scale));
  const ch = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  Object.assign(canvas.style, { width: `${w}px`, height: `${h}px`, position: 'absolute', left: '0', top: '0', opacity: '0.75' });
  const ctx = canvas.getContext('2d')!;
  const radius = 26 * scale;
  const max = Math.max(1, ...clicks.map((c) => c.n || 1));

  for (const c of clicks) {
    let px: number | null = null;
    let py: number | null = null;
    if (c.sel) {
      try {
        const el = document.querySelector(c.sel);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width || r.height) {
            px = r.left + window.scrollX + (c.rx ?? 0.5) * r.width;
            py = r.top + window.scrollY + (c.ry ?? 0.5) * r.height;
          }
        }
      } catch {}
    }
    if (px == null && c.x != null && c.y != null) {
      px = c.pw ? (c.x / c.pw) * w : c.x;
      py = c.y;
    }
    if (px == null || py == null) continue;
    const alpha = Math.min(1, 0.15 + (0.85 * (c.n || 1)) / max);
    const g = ctx.createRadialGradient(px * scale, py * scale, 0, px * scale, py * scale, radius);
    g.addColorStop(0, `rgba(0,0,0,${alpha})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(px * scale - radius, py * scale - radius, radius * 2, radius * 2);
  }

  const img = ctx.getImageData(0, 0, cw, ch);
  const pal = palette();
  for (let i = 0; i < img.data.length; i += 4) {
    const a = img.data[i + 3];
    if (!a) continue;
    const o = a * 4;
    img.data[i] = pal[o];
    img.data[i + 1] = pal[o + 1];
    img.data[i + 2] = pal[o + 2];
    img.data[i + 3] = Math.min(255, a + 60);
  }
  ctx.putImageData(img, 0, 0);
  layer!.appendChild(canvas);
}

function drawScroll(bands: ScrollBand[]) {
  const { h } = resetLayer();
  const sorted = [...bands].sort((a, b) => a.depth - b.depth);
  for (let i = 0; i < sorted.length; i++) {
    const b = sorted[i];
    const top = (b.depth / 100) * h;
    const next = i + 1 < sorted.length ? (sorted[i + 1].depth / 100) * h : h;
    // Rojo = casi todos llegan · azul = casi nadie llega
    const hue = Math.round((b.pct / 100) * 0 + (1 - b.pct / 100) * 220);
    const band = document.createElement('div');
    Object.assign(band.style, {
      position: 'absolute',
      left: '0',
      right: '0',
      top: `${top}px`,
      height: `${next - top}px`,
      background: `hsla(${hue},85%,50%,0.28)`,
      borderTop: '1px dashed rgba(23,38,61,0.5)',
    });
    const label = document.createElement('span');
    label.textContent = `${Math.round(b.pct)} % llega hasta aquí`;
    Object.assign(label.style, {
      position: 'absolute',
      right: '12px',
      top: '6px',
      font: '700 13px/1.2 Inter, system-ui, sans-serif',
      color: '#fff',
      background: 'rgba(23,38,61,0.85)',
      padding: '4px 8px',
      borderRadius: '6px',
    });
    band.appendChild(label);
    layer!.appendChild(band);
  }
}

export function initHeatmapView() {
  // La página no debe moverse sola dentro del panel
  const style = document.createElement('style');
  style.textContent = '*{animation:none!important;transition:none!important;scroll-behavior:auto!important}[data-cookie-banner]{display:none!important}';
  document.head.appendChild(style);

  window.addEventListener('message', (e) => {
    if (!allowed(e.origin)) return;
    const msg = e.data as Msg;
    if (msg?.type !== 'robin-heatmap') return;
    if (msg.mode === 'scroll') drawScroll(msg.scroll || []);
    else drawClicks(msg.clicks || []);
    reportSize();
  });
  window.addEventListener('load', () => setTimeout(reportSize, 300));
  window.addEventListener('resize', () => setTimeout(reportSize, 200));
  reportSize();
}
