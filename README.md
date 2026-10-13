# Web de Project Robin

Web de [project-robin.com](https://project-robin.com), hecha con [Astro](https://astro.build) y publicada en Netlify.
Sustituye a la web de WordPress + Elementor y **mantiene exactamente las mismas URLs**.

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Textos de las ciudades de Holanda (`/destinos/...`) | `src/data/destinos.js` |
| Universidades de España y multicampus | `src/data/universidades.js` |
| Servicios (Asesoramiento, Aeroespaciales Delft, Pack Llegada, Mentoría) | `src/data/servicios.js` (la página de Aeroespaciales Delft está en `src/pages/servicios/aeroespaciales-delft.astro`) |
| Menú, contacto, equipo, testimonios, cifras de la home | `src/data/site.js` |
| Artículos del blog | `src/content/blog/*.md` (un archivo por artículo) |
| Páginas legales | `src/content/legal/*.md` |
| Home y resto de páginas | `src/pages/` |
| Colores, tipografías, botones y estilos comunes | `src/styles/global.css` |
| Estilos de una página concreta | `src/styles/pages/<página>.css` |
| Estilos de un bloque que se repite (cabecera, pie, formulario…) | `src/styles/components/<bloque>.css` |

### Cómo están organizados los estilos

- El HTML (`src/pages`, `src/components`, `src/layouts`) no lleva estilos dentro: todo el CSS está en `src/styles/`.
- `global.css`: variables (colores, medidas), tipografía, botones, contenedores y utilidades comunes.
- `pages/*.css`: una hoja por página o plantilla. Cada página pone su clase en el `<main>` (`page-home`, `page-destino`…) y todas sus reglas empiezan por esa clase, para que no afecten a otras páginas.
- `components/*.css`: una hoja por componente. Sus reglas empiezan por la clase raíz del componente (`.site-header`, `.site-footer`, `.lead-form`…).
- Solo quedan atributos `style` para valores que vienen de los datos (fotos de fondo, número de columnas, retrasos de animación) y el fragmento oficial de Google Tag Manager.

Para añadir un artículo al blog, copia cualquier `.md` de `src/content/blog/`, cambia el nombre del archivo (será la URL) y el texto.

## Formularios y etiquetas de origen

Todos los formularios se guardan directamente en la **Main Database de Notion** (función `netlify/functions/lead.mjs`, en `/api/lead`) y, en paralelo, se envían a **Netlify Forms** para los avisos por email.
Cada formulario manda un campo `tag` con el origen del lead, que se guarda en Notion en la columna **Origen web** y en el comentario.

| Página | Etiqueta |
|---|---|
| Home (reserva) | `general` |
| `/contacto/` | `contacto` (o lo que venga en `?origen=` en la URL) |
| `/contacto-estudiar-en-espana/` | `espana` |
| Botón "Pack Llegada" de una ciudad | `pack-llegada-<ciudad>` (p. ej. `pack-llegada-maastricht`) |
| Ciudades de Holanda (reserva) | `holanda-<ciudad>` |
| Universidades de España | `espana-<universidad>` |
| Universidades multicampus | `multicampus-<universidad>` |
| Servicios | `asesoramiento-completo`, `aeroespaciales-delft`, `pack-llegada`, `mentoria` |
| `/colegios/` | `colegios` |
| Blog | `blog-<artículo>` |
| Newsletter | `newsletter-holanda`, `newsletter-espana`, `newsletter-multicampus` (no va a Notion) |

**Para una landing nueva:** enlaza al contacto con `/contacto/?origen=nombre-de-la-campana` o usa `<LeadForm tag="nombre-de-la-campana" />` en la página. La columna TIPO de Notion se rellena sola: `Llegada` si la etiqueta contiene "llegada", `Mentoría` si contiene "mentoria", `Delft` si contiene "delft" y `General` en el resto.

Además, cada envío lanza el evento `lead_submit` (con `lead_tag`) y cada reserva el evento `booking_confirmed` en el `dataLayer`, para usarlos como conversiones en Google Tag Manager.

## Reservas con Google Calendar

El reservador (`src/components/BookingWidget.astro`) usa dos funciones:

- `GET /api/availability`: huecos libres de las próximas 2 semanas en el calendario de **hello@project-robin.com**, de **lunes a viernes de 17:00 a 21:00** (hora de Madrid). Sábados y domingos no.
- `POST /api/book`: vuelve a comprobar que el hueco sigue libre, crea el evento con **Google Meet** en el calendario de hello@project-robin.com, invita al alumno por email y crea el lead en Notion (con la fecha en la columna *Meeting*).

### Configuración de Google (una sola vez, la hace un admin de Google Workspace)

1. En [Google Cloud Console](https://console.cloud.google.com/) crea un proyecto y activa la **Google Calendar API**.
2. Crea una **cuenta de servicio** y descarga una clave en formato JSON.
3. En [admin.google.com](https://admin.google.com) → Seguridad → Control de acceso y datos → Controles de API → **Delegación en todo el dominio** → Añadir nuevo:
   - ID de cliente: el `client_id` de la cuenta de servicio
   - Permisos (scope): `https://www.googleapis.com/auth/calendar`
4. Copia `client_email` y `private_key` del JSON en las variables de entorno de Netlify (ver abajo).

## Variables de entorno en Netlify

*Site configuration → Environment variables*

| Variable | Obligatoria | Valor |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Sí | `client_email` del JSON de la cuenta de servicio |
| `GOOGLE_PRIVATE_KEY` | Sí | `private_key` del JSON, entera, con `-----BEGIN PRIVATE KEY-----` |
| `BOOKING_HOSTS` | No | Por defecto `Project Robin:hello@project-robin.com`. Solo si algún día quieres usar otro calendario (o varios, separados por comas) |
| `NOTION_TOKEN` | Sí | Token de una integración interna de Notion (notion.so/my-integrations) |
| `NOTION_DATABASE_ID` | Sí | `1eb069542601804c8f6fc22553255077` (Main Database) |
| `PORTAL_ORIGIN` | No | Solo si quieres que este sitio sirva `/login` por proxy desde el sitio de Netlify del portal (`https://xxxx.netlify.app`) |
| `BOOKING_SCHEDULE` | No | Horario en JSON (1 = lunes … 7 = domingo). Por defecto lunes a viernes 17:00–21:00: `{"1":[["17:00","21:00"]],"2":[["17:00","21:00"]],"3":[["17:00","21:00"]],"4":[["17:00","21:00"]],"5":[["17:00","21:00"]]}` |
| `BOOKING_MIN_NOTICE_HOURS` | No | Antelación mínima para reservar (por defecto `12`) |
| `BOOKING_DAYS_AHEAD` | No | Días que se muestran (por defecto `14`) |
| `BOOKING_BUFFER_MINUTES` | No | Margen libre entre reuniones (por defecto `0`) |
| `NOTION_NEWSLETTER` | No | `true` para mandar también las altas de la newsletter a Notion |

En Notion, comparte la **Main Database** con la integración (menú `···` → Conexiones → tu integración).

Los avisos por email de cada formulario se configuran en Netlify: *Forms → Form notifications → Email notification*.

## Portal del alumno (Log In)

El botón **Log In** lleva a `https://project-robin.com/login` (definido en `src/data/site.js`). Hoy esa ruta la resuelve Cloudflare hacia el portal.
**Al cambiar el dominio a este sitio de Netlify**, comprueba que la regla de Cloudflare para `/login` y `/portal/*` sigue activa; si no, define `PORTAL_ORIGIN` con la URL de Netlify del portal y este sitio hará de proxy (reglas en `dist/_redirects`, generadas por `scripts/postbuild.mjs`).

## Desarrollo en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Para probar las funciones en local: `npx netlify dev` (con las variables en un `.env`).

## Diagnóstico

- Agenda: abre `/api/availability?debug=1` para ver qué calendario falla y el mensaje exacto de Google.
- Formularios: si no llegan a Notion, el propio formulario muestra el error y en Netlify → Logs → Functions → `lead` aparece el detalle.

## Máquina de blogs (automática)

Cada semana propone 4 temas (2 de actualidad y 2 informativos sobre estudiar en Holanda) y escribe dos artículos, a tu elección, para el blog con la API de Claude (Anthropic).

| Cuándo | Qué pasa |
|---|---|
| **Lunes 08:00** | Claude busca en la web (medios, fuentes oficiales, foros, Reddit y lo público de LinkedIn) envía a `BLOG_EMAIL_TO` un correo con **4 ideas** y un botón para elegir: **2 de actualidad** (temas de educación en España de la semana anterior) y **2 informativas** (guías sobre estudiar en Holanda que responden preguntas que se hacen las familias y que el blog aún no cubre). |
| **Al elegir** | En la página del correo marcas qué idea sale el miércoles y cuál el viernes (cualquier combinación de las 4). Las de actualidad salen en la categoría «Actualidad educativa» y las informativas en «Estudiar en Holanda». En unos 10 minutos llega otro correo con los **2 borradores** (vista previa, botón **Parar** y **Publicar ahora**). |
| **Miércoles y viernes 09:00** | Se publica el borrador del día (si no lo has parado): la máquina guarda el `.md` en GitHub y Netlify publica la web sola. Te llega un correo con el enlace. |

(Las horas son de verano; en invierno, una hora antes, porque Netlify programa en UTC.)

Cada artículo sale con: título SEO, meta description, entradilla que responde directamente (GEO), bloque "Lo esencial", H2 en forma de pregunta, tabla si hay datos, enlaces a las fuentes y a páginas de Robin, 1-2 imágenes de Unsplash con texto alternativo y pie de foto con crédito, preguntas frecuentes (con schema FAQPage) y lista de fuentes.

**Archivos:** `netlify/lib/blog/` (lógica; las instrucciones a Claude están en `prompts.mjs`) y `netlify/functions/blog-*.mjs`. El estado de cada semana se guarda en Netlify Blobs (almacén `blog-machine`).

### Variables de entorno (Netlify → Site configuration → Environment variables)

| Variable | Obligatoria | Valor |
|---|---|---|
| `ANTHROPIC_API_KEY` | Sí | Clave de la API de Anthropic (console.anthropic.com → API keys). La búsqueda web debe estar activada en la organización. |
| `BLOG_SECRET` | Sí | Una contraseña larga inventada. Firma los enlaces del correo. |
| `BLOG_PANEL_PASSWORD` | Sí | Contraseña para entrar al panel `/api/blog-panel`. |
| `GITHUB_TOKEN` | Sí | Token *fine-grained* de GitHub solo para el repo `web-robin`, con permiso **Contents: Read and write**. |
| `UNSPLASH_ACCESS_KEY` | Sí | "Access Key" de una app gratuita en unsplash.com/developers. |
| `BLOG_EMAIL_TO` | No | Por defecto `manuel@project-robin.com`. |
| `BLOG_EMAIL_FROM` | No | Por defecto `hello@project-robin.com`. |
| `BLOG_MODEL` | No | Modelo de Claude. Por defecto `claude-sonnet-5`. |
| `GITHUB_REPO` / `GITHUB_BRANCH` | No | Por defecto `RobinManuV/web-robin` y `main`. |
| `RESEND_API_KEY` | No | Solo si prefieres enviar los correos con Resend en vez de con Gmail. |

**Correo:** se envía con la misma cuenta de servicio de Google que las reservas. En admin.google.com → Seguridad → Controles de API → Delegación en todo el dominio, edita la entrada de la cuenta de servicio y añade el permiso `https://www.googleapis.com/auth/gmail.send` (junto al de calendar, separados por coma).

### Criterios de las fotos

Las fotos de Unsplash no se cogen a ciegas: Claude recibe las candidatas de cada búsqueda y elige la que cumple los criterios, o ninguna (sin foto de portada se usa la imagen por defecto de Robin; sin foto de apoyo se omite). Los criterios están en `CRITERIOS_FOTOS` (`netlify/lib/blog/prompts.mjs`): encajar con el tema y con el público (estudiantes españoles de 16-19 años y familias), jóvenes en entornos de estudio o ciudad, sin escenas de trabajo ajenas al tema, sin otros países o contextos que den una imagen equivocada y sin texto ni logotipos. Se decide por el entorno, la edad y la actividad, no por el aspecto de las personas. Claude solo ve la descripción y las etiquetas de cada foto, no la imagen: la vista previa del borrador sigue siendo la revisión final.

### Probarla a mano

- **Panel de control:** `/api/blog-panel` (pide `BLOG_PANEL_PASSWORD`; estado, registro, configuración y botón "Lanzar investigación ahora")
- Ver estado en JSON: `/api/blog-admin?clave=<BLOG_SECRET>`
- Lanzar la investigación ahora: `/api/blog-admin?clave=<BLOG_SECRET>&accion=investigar` (añade `&force=1` para repetirla)

### Fotos de las ciudades

`public/fotos/ciudades/` (`<ciudad>-card.webp` 800×600 para las tarjetas y `<ciudad>-hero.webp` 1920×1080 para el carrusel de la home y redes). Fotos gratuitas de Unsplash (licencia Unsplash: uso comercial, sin atribución obligatoria). Identificadores en images.unsplash.com:

- twente: `photo-1713680993894-6b08588da50b`
- breda: `photo-1569496453553-f35768ed0e36`
- leiden: `photo-1713733720850-a948838c90a8`
- groningen: `photo-1629205819196-d1073d5c4f2d`
- amsterdam: `photo-1605704320412-5c3255bf47a9`
- la-haya: `photo-1586174035695-35ab9e19215c`
- utrecht: `photo-1564085027787-7f8911ca8d91`
- rotterdam: `photo-1614521272693-73052eaefc51`
- delft: `photo-1623967680609-442921aa33ef`
- maastricht: `photo-1666533587027-1e53dd317e65`
- eindhoven: `photo-1664993305337-582a5d02ab38`

## Medición propia para el gestor (pestaña "Web" de Robin-Admin)

- `src/scripts/analytics.ts`: mide páginas, origen, clics (para mapas de calor), scroll, tiempo activo, salida, vídeos, formularios (nunca lo escrito), velocidad y errores. **Solo si el visitante acepta las cookies de analítica**; deja de medir en cuanto las rechaza.
- `src/scripts/heatmap-view.ts`: cuando el gestor abre una página con `?robin_heatmap=1`, la web pinta encima el mapa de calor que le envía el gestor (solo acepta mensajes de `PUBLIC_ADMIN_ORIGIN`).
- `netlify/lib/analytics-ping.mjs`: `lead.mjs` y `book.mjs` avisan al gestor de cada formulario o reserva enviados (anónimo: sin nombre, email ni teléfono) para saber qué formularios se usan más.
- `netlify/functions/blog-estado.mjs`: estado de la máquina de blogs para el gestor (cabecera `x-robin-blog-secret` = `BLOG_SECRET`).

Variables de entorno de la web:

| Variable | Valor |
|---|---|
| `PUBLIC_ANALYTICS_ENDPOINT` | opcional; por defecto `https://robin-admin-platform.netlify.app/api/web/collect` |
| `PUBLIC_ADMIN_ORIGIN` | opcional; por defecto `https://robin-admin-platform.netlify.app` |
| `ANALYTICS_SERVER_SECRET` | igual que `WEB_ANALYTICS_SERVER_SECRET` en el gestor |

## España según el país del visitante

`ESPANA_PUBLICADA = true` (src/data/site.js): las páginas de España se publican y Google las indexa.
A quien entra **desde España** no se le muestra España en el menú, la portada ni el formulario
(edge function `netlify/edge-functions/geo-espana.ts` + `src/lib/geo-espana.mjs`, marcadores
`<GeoHide>` / `<GeoOnly>`). Con enlace directo, sus páginas se pueden ver desde cualquier país.
Para probarlo sin VPN: añade `?pais=ES` o `?pais=MX` a cualquier URL.

## Idiomas (ES / EN / PT-PT / PT-BR)

La web está en español en la raíz y se traduce al inglés (`/en/…`) y al portugués de Portugal (`/pt/…`) y de Brasil (`/br/…`) **después del build**: `npm run build` ejecuta `scripts/i18n.mjs build`, que lee el HTML de `dist/`, sustituye cada frase por su traducción y escribe `dist/en/**`, `dist/pt/**` y `dist/br/**` con los mismos slugs.

- **Qué se traduce:** todas las páginas salvo el blog (`/blog/**`), las legales (`/aviso-legal/`, `/politica-de-cookies/`, `/politica-de-privacidad/`) y `/404/`. Los enlaces desde una página traducida a esas rutas llevan a la versión en español.
- **Diccionarios:** `src/i18n/en.json`, `src/i18n/pt.json` y `src/i18n/br.json`. La clave es la frase en español tal cual sale en el HTML (espacios normalizados). Si falta una clave, esa frase se queda en español y el build avisa; con `I18N_STRICT=1` el build falla.
- **Texto nuevo o cambiado en español:** `npm run i18n:pendientes` (equivale a `node scripts/i18n.mjs extract --out pendientes.json`) lista las frases sin traducir con la página donde aparecen. Se traducen y se incorporan con `node scripts/i18n.mjs merge --pending pendientes.json --in lote.txt` (líneas `id ||| inglés ||| portugués [||| portugués de Brasil]`; si falta la columna BR se adapta sola desde el portugués de Portugal; comprueba que coinciden las etiquetas HTML y los números).
- **SEO:** `<html lang>`, canonical, `og:locale`, bloque hreflang (es, en, pt-PT, pt-BR, x-default) en todas las páginas traducibles y `sitemap-i18n.xml` enlazado desde `sitemap-index.xml`.
- **Selector de idioma:** `src/components/LangSwitch.astro` (cabecera y menú móvil). No se traduce, lo reescribe el motor en cada idioma.
- **Textos dentro de scripts:** usar `src/i18n/runtime.js` (`lang`, `locale`, `pick({es, en, pt, br})`; si falta `br` usa `pt`).
- **Leads y reservas:** los formularios envían `idioma`; se guarda en Notion y en el CRM (`source_payload.lang`, línea "Idioma:") y en la reserva. El email de confirmación y el recordatorio al alumno van en su idioma (`netlify/lib/lang.mjs`); los avisos al equipo siguen en español.
- **Estilo de las traducciones:** inglés británico; portugués de Portugal con "tu"; portugués de Brasil con "você", generado desde el de Portugal con `scripts/i18n/ptbr.mjs` (reglas de pronombres, verbos y léxico) y revisable a mano en `src/i18n/br.json`.; marca "Project Robin" y eslogan "The world is your campus" sin traducir.

### Idioma por defecto según el país

La edge function `netlify/edge-functions/idioma-portugal.ts` redirige (302) la **portada `/`** a `/pt/` si el visitante entra desde Portugal y a `/br/` si entra desde Brasil. Solo la primera visita: el selector de idioma guarda la cookie `robin_lang` y, con ella, no se vuelve a redirigir. Tampoco se redirige a bots, buscadores ni previsualizadores de enlaces. Para probarlo sin VPN: `/?pais=PT` o `/?pais=BR`.
