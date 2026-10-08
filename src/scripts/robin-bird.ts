// Pájaro Robin en vuelo (SVG) para el carrusel del Método Robin.
// Mira a la derecha. Las alas son dos grupos con id para girarlas desde el script:
//   [data-wing="near"] y [data-wing="far"], con pivote en (100, 78).
const NAVY = '#2d3a64';
const CREAM = '#fcfbf8';
const SHADE = '#e6e3d8';
const YELLOW = '#f2b523';

const wing = (id: string, fill: string) => `
  <g data-wing="${id}" transform="translate(100 78)">
    <path d="M8 4C20-20 12-60-22-90C-32-70-42-40-34-10C-30 4-10 10 8 4Z" fill="${fill}" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-2-8C2-32-4-54-18-74M-16-6C-16-26-22-42-30-56" fill="none" stroke="${NAVY}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
  </g>`;

export const BIRD_SVG = `<svg viewBox="-10 -30 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" overflow="visible">
  ${wing('far', SHADE)}
  <g stroke="${NAVY}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
    <path d="M64 80L8 94L16 104L60 102Z"/>
    <ellipse cx="108" cy="90" rx="56" ry="34" transform="rotate(-8 108 90)"/>
    <circle cx="152" cy="60" r="25"/>
  </g>
  <g fill="${CREAM}">
    <path d="M64 80L8 94L16 104L60 102Z"/>
    <ellipse cx="108" cy="90" rx="56" ry="34" transform="rotate(-8 108 90)"/>
    <circle cx="152" cy="60" r="25"/>
  </g>
  <path d="M92 104C106 80 150 86 142 108C132 124 98 124 92 104Z" fill="${YELLOW}"/>
  <path d="M96 100C110 92 128 96 134 106" fill="none" stroke="${NAVY}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
  <path d="M174 55L202 64L174 73Z" fill="${CREAM}" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M138 52Q152 44 168 50L166 62Q154 70 141 62Z" fill="${NAVY}"/>
  <path d="M139 54L122 50" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>
  <path d="M112 118L94 142M126 118L110 146" stroke="${NAVY}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${wing('near', CREAM)}
</svg>`;

/** Gira las alas: 0° = arriba, 90° = hacia delante, 170° = abajo. */
export function setWings(root: Element, near: number, far = near - 12) {
  root.querySelector('[data-wing="near"]')?.setAttribute('transform', `translate(100 78) rotate(${near.toFixed(1)})`);
  root.querySelector('[data-wing="far"]')?.setAttribute('transform', `translate(100 78) rotate(${far.toFixed(1)}) scale(.92)`);
}
