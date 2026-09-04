import { getProductionOrigin } from '@/lib/seo';

export default function robots() {
  const siteUrl = getProductionOrigin();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl } : {}),
  };
}
