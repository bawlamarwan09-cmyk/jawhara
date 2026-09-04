const normalizePath = (path = '/') => (path.startsWith('/') ? path : `/${path}`);

export function getProductionOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (!configured) return null;

  try {
    const url = new URL(configured);
    const hostname = url.hostname.toLowerCase();
    const blockedHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]']);
    const isLocalhost = blockedHosts.has(hostname) || hostname.endsWith('.localhost');
    if (!['http:', 'https:'].includes(url.protocol) || isLocalhost) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function absoluteUrl(path = '/') {
  const origin = getProductionOrigin();
  if (!origin) return null;
  return new URL(normalizePath(path), `${origin}/`).toString();
}

export function createPageMetadata({ title, description, path }) {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: 'website',
      locale: 'fr_MA',
      siteName: 'Jawhara Tech',
      title,
      description,
      ...(canonical ? { url: canonical, images: ['/og.png'] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(canonical ? { images: ['/og.png'] } : {}),
    },
  };
}

export function createBreadcrumbSchema(items) {
  const origin = getProductionOrigin();
  if (!origin) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(normalizePath(item.href), `${origin}/`).toString(),
    })),
  };
}

export function createServiceSchema(service) {
  const origin = getProductionOrigin();
  const url = absoluteUrl(service.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.navLabel,
    description: service.seoDescription,
    provider: origin
      ? { '@id': `${origin}/#organization` }
      : { '@type': 'Organization', name: 'Jawhara Tech' },
    areaServed: [
      { '@type': 'City', name: 'Agadir' },
      { '@type': 'AdministrativeArea', name: 'Souss-Massa' },
      { '@type': 'Country', name: 'Maroc' },
    ],
    ...(url ? { url } : {}),
  };
}

export const publishedRoutes = [
  '/',
  '/production-technique-evenementielle-agadir',
  '/location-materiel-evenementiel-agadir',
  '/sonorisation-evenement-agadir',
  '/eclairage-evenementiel-agadir',
  '/location-ecran-led-agadir',
  '/realisations',
  '/a-propos',
  '/devis',
  '/contact',
];
