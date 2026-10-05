# Mapa de redirecciones de Project Robin

La web nueva mantiene las URLs públicas principales de WordPress. Las redirecciones se generan en `scripts/postbuild.mjs` y se publican en `dist/_redirects`.

## Redirecciones ya preparadas

| URL antigua | Destino | Código | Motivo |
|---|---|---:|---|
| `/feed` y `/feed/*` | `/blog/` | 301 | Feeds de WordPress |
| `/comments/feed/*` | `/blog/` | 301 | Feed de comentarios |
| `/wp-admin/*` | `/` | 301 | Rutas internas de administración |
| `/wp-login.php` | `/login` | 301 | Login antiguo de WordPress |
| `/author/*` | `/sobre-nosotros/` | 301 | Archivo de autores |
| `/category/*` | `/blog/` | 301 | Categorías antiguas |
| `/servicios/erasmus` y `/servicios/erasmus/` | `/servicios/` | 301 | Servicio retirado |

## URLs que se conservan

Las siguientes familias se generan con la misma ruta pública y no necesitan redirección cuando el cambio de hosting se haga:

- `/`
- `/destinos/` y `/destinos/<ciudad>/`
- `/blog/` y `/blog/<articulo>/`
- `/comunidad/`
- `/colegios/`
- `/contacto/`
- `/sobre-nosotros/`
- `/servicios/` y `/servicios/<servicio>/`
- `/the-european-experience/`
- `/universidades/<universidad-multicampus>/`
- `/aviso-legal/`
- `/politica-de-cookies/`
- `/politica-de-privacidad/`

## Pendiente de validar antes del cambio DNS

- Exportar el sitemap de la instalación WordPress actual y comparar todas sus URLs con `dist/sitemap-index.xml`.
- Confirmar si existen URLs antiguas con extensiones `.html`, parámetros o variaciones sin barra final.
- Confirmar el destino definitivo de las rutas de España si siguen despublicadas (`ESPANA_PUBLICADA = false`).
- Confirmar el origen del portal y activar `PORTAL_ORIGIN` en Netlify solo cuando tengamos su URL de producción.

No se debe eliminar WordPress mientras estas comprobaciones estén pendientes.
