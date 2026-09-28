// Publicación: guarda el artículo como archivo .md en el repositorio de GitHub.
// Netlify detecta el commit en la rama principal y vuelve a publicar la web sola.
import { cfg } from './config.mjs';

async function gh(path, init = {}) {
  const res = await fetch(`https://api.github.com/repos/${cfg.githubRepo()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.githubToken()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'robin-blog-machine',
      ...(init.headers || {}),
    },
  });
  return res;
}

export async function fileExists(path) {
  const res = await gh(`/contents/${encodeURI(path)}?ref=${cfg.githubBranch()}`);
  return res.status === 200;
}

// Devuelve un slug libre (añade -2, -3… si ya existe un artículo con ese nombre)
export async function freeSlug(slug) {
  let s = slug;
  for (let n = 2; await fileExists(`src/content/blog/${s}.md`); n++) s = `${slug}-${n}`;
  return s;
}

export async function commitFile(path, content, message) {
  const res = await gh(`/contents/${encodeURI(path)}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch: cfg.githubBranch(),
      committer: { name: 'Robin Blog', email: cfg.emailFrom() },
    }),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}
