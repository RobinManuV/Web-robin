// ============================================================
// Máquina de blogs de Project Robin: configuración común.
// Todas las claves van en las variables de entorno de Netlify (ver README).
// ============================================================

// Limpia espacios, saltos de línea y comillas pegados por error al copiar una clave
const clean = (v) => String(v || '').trim().replace(/^["']|["']$/g, '').trim();

export const cfg = {
  // Anthropic (API de Claude)
  anthropicKey: () => clean(process.env.ANTHROPIC_API_KEY),
  model: () => process.env.BLOG_MODEL || 'claude-sonnet-5',
  webSearchTool: () => process.env.BLOG_WEB_SEARCH_TOOL || 'web_search_20250305',

  // Correo
  emailTo: () => process.env.BLOG_EMAIL_TO || 'manuel@project-robin.com',
  emailFrom: () => process.env.BLOG_EMAIL_FROM || 'hello@project-robin.com',

  // Seguridad de los enlaces del correo y de las llamadas internas
  secret: () => clean(process.env.BLOG_SECRET),

  // Publicación en GitHub (Netlify despliega solo al recibir el commit)
  githubToken: () => clean(process.env.GITHUB_TOKEN),
  githubRepo: () => process.env.GITHUB_REPO || 'RobinManuV/web-robin',
  githubBranch: () => process.env.GITHUB_BRANCH || 'main',

  // Imágenes
  unsplashKey: () => clean(process.env.UNSPLASH_ACCESS_KEY),

  // URL pública de la web (Netlify la define sola en producción como URL)
  siteUrl: () => (process.env.BLOG_SITE_URL || process.env.URL || 'https://project-robin.com').replace(/\/+$/, ''),
};

export function missingConfig(keys) {
  const map = {
    anthropic: cfg.anthropicKey(),
    secret: cfg.secret(),
    github: cfg.githubToken(),
    unsplash: cfg.unsplashKey(),
  };
  return keys.filter((k) => !map[k]);
}
