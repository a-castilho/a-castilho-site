import { systems } from './sistemas/data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acastilho.com.br';

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${siteUrl}/sistemas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...systems.map((system) => ({
      url: `${siteUrl}/sistemas/${system.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    }))
  ];
}
