# Web de Project Robin

Web de [project-robin.com](https://project-robin.com), hecha con [Astro](https://astro.build) y publicada en Netlify.
Sustituye a la web de WordPress + Elementor y **mantiene exactamente las mismas URLs**.

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Textos de las ciudades de Holanda (`/destinos/...`) | `src/data/destinos.js` |
| Universidades de España y multicampus | `src/data/universidades.js` |
| Servicios (Mentoría, Asesoramiento, Erasmus) | `src/data/servicios.js` |
| Menú, contacto, equipo, testimonios, cifras de la home | `src/data/site.js` |
| Artículos del blog | `src/content/blog/*.md` (un archivo por artículo) |
| Páginas legales | `src/content/legal/*.md` |
| Home y resto de páginas | `src/pages/` |
| Colores y tipografías | `src/styles/global.css` |

Para añadir un artículo al blog, copia cualquier `.md` de `src/content/blog/`, cambia el nombre del archivo (será la URL) y el texto.

## Formularios y etiquetas de origen

Todos los formularios van a **Netlify Forms** y, desde ahí, a la **Main Database de Notion** (función `netlify/functions/submission-created.mjs`).
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
| Servicios | `mentoria`, `asesoramiento-completo`, `erasmus` |
| `/colegios/` | `colegios` |
| Blog | `blog-<artículo>` |
| Newsletter | `newsletter-holanda`, `newsletter-espana`, `newsletter-multicampus` (no va a Notion) |

**Para una landing nueva:** enlaza al contacto con `/contacto/?origen=nombre-de-la-campana` o usa `<LeadForm tag="nombre-de-la-campana" />` en la página. La columna TIPO de Notion se rellena sola: `Llegada` si la etiqueta contiene "llegada", `Mentoría` si contiene "mentoria", `Delft` si contiene "delft" y `General` en el resto.

Además, cada envío lanza el evento `lead_submit` (con `lead_tag`) y cada reserva el evento `booking_confirmed` en el `dataLayer`, para usarlos como conversiones en Google Tag Manager.

## Reservas con Google Calendar

El reservador (`src/components/BookingWidget.astro`) usa dos funciones:

- `GET /api/availability`: huecos libres de las próximas 2 semanas. Un hueco sale si **al menos uno** de Noel, María o Manuel está libre.
- `POST /api/book`: vuelve a comprobar que el hueco sigue libre, crea el evento con **Google Meet** en el calendario de la persona libre con menos reuniones ese día, invita al alumno por email y crea el lead en Notion (con la fecha en la columna *Meeting* y el *responsable*).

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
| `BOOKING_HOSTS` | Sí | `Noel:noel@project-robin.com,María:maria@project-robin.com,Manuel:manuel@project-robin.com` (con los emails reales) |
| `NOTION_TOKEN` | Sí | Token de una integración interna de Notion (notion.so/my-integrations) |
| `NOTION_DATABASE_ID` | Sí | `1eb069542601804c8f6fc22553255077` (Main Database) |
| `PORTAL_ORIGIN` | Sí | URL del sitio de Netlify del portal del alumno, p. ej. `https://xxxx.netlify.app` |
| `BOOKING_SCHEDULE` | No | Horario en JSON. Por defecto lunes a viernes 10:00–20:00: `{"1":[["10:00","20:00"]],"2":[["10:00","20:00"]],"3":[["10:00","20:00"]],"4":[["10:00","20:00"]],"5":[["10:00","20:00"]]}` |
| `BOOKING_MIN_NOTICE_HOURS` | No | Antelación mínima para reservar (por defecto `12`) |
| `BOOKING_DAYS_AHEAD` | No | Días que se muestran (por defecto `14`) |
| `BOOKING_BUFFER_MINUTES` | No | Margen libre entre reuniones (por defecto `0`) |
| `NOTION_NEWSLETTER` | No | `true` para mandar también las altas de la newsletter a Notion |

En Notion, comparte la **Main Database** con la integración (menú `···` → Conexiones → tu integración).

Los avisos por email de cada formulario se configuran en Netlify: *Forms → Form notifications → Email notification*.

## Portal del alumno (`/login`)

`/login` y `/portal/*` se sirven desde el sitio de Netlify del portal (variable `PORTAL_ORIGIN`) mediante un proxy: la URL se queda en `project-robin.com/login`. Las reglas se generan en `dist/_redirects` al hacer el build (`scripts/postbuild.mjs`).

## Desarrollo en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Para probar las funciones en local: `npx netlify dev` (con las variables en un `.env`).
