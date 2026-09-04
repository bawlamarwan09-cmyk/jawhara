import { siteConfig } from '@/content/site';
import { absoluteUrl, getProductionOrigin } from '@/lib/seo';

export function StructuredData({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export default function JsonLd() {
  const siteUrl = getProductionOrigin();
  const organizationId = siteUrl ? `${siteUrl}/#organization` : null;
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...(organizationId ? { '@id': organizationId } : {}),
    name: 'Jawhara Tech',
    description:
      'Entreprise de production technique événementielle, sonorisation, éclairage, écrans LED et régie au Maroc.',
    areaServed: {
      '@type': 'Country',
      name: 'Maroc',
    },
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.socials.facebook || siteConfig.socials.instagram
      ? { sameAs: [siteConfig.socials.facebook, siteConfig.socials.instagram].filter(Boolean) }
      : {}),
    ...(siteUrl ? { url: siteUrl, logo: absoluteUrl(siteConfig.logo.fallbackSrc) } : {}),
  };

  const website = siteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Jawhara Tech',
        url: siteUrl,
        inLanguage: 'fr-MA',
        publisher: { '@id': organizationId },
      }
    : null;

  const data = [organization, website].filter(Boolean);

  return <StructuredData data={data} />;
}
