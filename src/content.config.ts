import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Artículos del blog: un archivo .md por artículo en src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string(),
    category: z.string().default('Estudiar en Holanda'),
    draft: z.boolean().default(false),
  }),
});

// Páginas legales (aviso legal, cookies, privacidad)
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});

export const collections = { blog, legal };
