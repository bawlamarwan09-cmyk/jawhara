import { getProductionOrigin, publishedRoutes } from '@/lib/seo';

export default function sitemap() {
  const siteUrl = getProductionOrigin();

  if (!siteUrl) return [];

  return publishedRoutes.map((path) => ({
    url: new URL(path, `${siteUrl}/`).toString(),
    changeFrequency: path === '/' ? 'monthly' : 'quarterly',
    priority: path === '/' ? 1 : path === '/devis' ? 0.9 : 0.8,
  }));
}
