// Pájaro Robin en vuelo (SVG), dibujado a partir de los pájaros de las ilustraciones del Método Robin
// (cuerpo redondo, gafas grandes, pico amarillo, barriga amarilla, cola hacia atrás).
// Mira a la derecha. Las alas son dos grupos que se giran desde el script con setWings().
const LINE = '#23365a';
const LENS = '#232c44';
const YELLOW = '#f2ba2b';
const SW = 7;

// Ala: en reposo (θ = 0) está plegada sobre el cuerpo, hacia la cola. Pivote en el hombro (320, 470).
const WING_PATH = 'M342 436C290 400 175 436 62 530L30 556L50 584L24 610L62 632C170 666 292 626 338 544C356 512 360 468 342 436Z';
const WING_LINES = 'M306 462C230 480 150 520 70 584M322 502C262 546 180 590 96 622';

const wing = (id: 'near' | 'far') => `
  <g data-wing="${id}" transform="translate(320 470)">
    <g transform="translate(-320 -470)">
      <path d="${WING_PATH}" fill="${id === 'far' ? '#e8ecf6' : '#fff'}" stroke="${LINE}" stroke-width="${SW}" stroke-linejoin="round"/>
      <path d="${WING_LINES}" fill="none" stroke="${LINE}" stroke-width="5" stroke-linecap="round" opacity=".8"/>
    </g>
  </g>`;

const BODY = 'M232 268C255 200 320 150 395 148C475 146 540 192 556 255L560 300C576 350 578 400 572 450C568 540 530 640 440 688C380 708 290 700 215 660C150 650 80 640 44 626C40 600 20 560 5 540C120 480 215 400 232 268Z';

export const BIRD_SVG = `<svg viewBox="-20 -60 680 840" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" overflow="visible">
  ${wing('far')}
  <path d="M330 696L246 744M246 744L222 738M246 744L232 768" fill="none" stroke="${LINE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M372 700L300 752M300 752L276 748M300 752L286 774" fill="none" stroke="${LINE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${BODY}" fill="#fff" stroke="${LINE}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M250 684C280 560 360 444 470 430C530 422 562 440 566 458C560 560 520 642 432 690C380 706 300 702 250 684Z" fill="${YELLOW}"/>
  <path d="M330 452C322 500 310 540 262 590" fill="none" stroke="${LINE}" stroke-width="${SW - 1}" stroke-linecap="round"/>
  <path d="M215 300L332 256" stroke="${LENS}" stroke-width="12" stroke-linecap="round"/>
  <path d="M330 250C372 238 440 236 472 242L478 266C482 322 442 346 400 342C346 332 322 292 330 250Z" fill="${LENS}"/>
  <path d="M476 226L608 205C612 236 590 276 528 284L478 266Z" fill="${LENS}"/>
  <path d="M478 306C500 294 552 298 580 316L604 322L560 338C520 352 488 346 478 326Z" fill="${YELLOW}" stroke="${LINE}" stroke-width="6" stroke-linejoin="round"/>
  ${wing('near')}
</svg>`;

/** Gira las alas: 0° = plegadas sobre el cuerpo, ~105° = arriba, negativo = abajo (aleteo hacia abajo). */
export function setWings(root: Element, near: number, far = near * 0.82 - 4) {
  root.querySelector('[data-wing="near"]')?.setAttribute('transform', `translate(320 470) rotate(${near.toFixed(1)})`);
  root.querySelector('[data-wing="far"]')?.setAttribute('transform', `translate(320 470) rotate(${far.toFixed(1)})`);
}
