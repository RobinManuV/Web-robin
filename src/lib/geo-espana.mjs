// ============================================================
// España según el país del visitante.
// La sección España se publica para todo el mundo (y Google la indexa), pero a
// quien entra desde los países de ESPANA_PAISES_OCULTA no se le enseña en el menú,
// la portada ni los formularios. Sus páginas siguen accesibles con enlace directo.
//
// Cómo funciona: en el HTML, lo que no debe ver ese visitante va entre
//   <!--geo-hide--> … <!--/geo-hide-->            (se quita para esos países)
//   <!--geo-only--><template data-geo-only> … </template><!--/geo-only-->
//                                                 (solo para esos países; para el resto se borra)
// La edge function netlify/edge-functions/geo-espana.ts aplica applyGeo() a cada página.
// Si la edge function no se ejecutara, se ve la versión internacional (template = invisible).
// ============================================================

export const ESPANA_PAISES_OCULTA = ['ES'];

const HIDE = /<!--geo-hide-->[\s\S]*?<!--\/geo-hide-->/g;
const ONLY = /<!--geo-only--><template data-geo-only>([\s\S]*?)<\/template><!--\/geo-only-->/g;

export function applyGeo(html, hideSpain) {
  if (!html.includes('<!--geo-')) return html;
  return hideSpain ? html.replace(HIDE, '').replace(ONLY, '$1') : html.replace(ONLY, '').replace(/<!--\/?geo-hide-->/g, '');
}
