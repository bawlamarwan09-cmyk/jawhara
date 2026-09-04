import { projectMedia } from './media';

export const projects = [
  {
    name: 'Festival Tifawine 2026',
    slug: 'festival-tifawine-2026',
    year: 2026,
    location: null,
    media: projectMedia['festival-tifawine-2026'],
    featured: true,
    verified: true,
    detailsVerified: false,
  },
  {
    name: 'Festival Timizart — Tiznit 2026',
    slug: 'festival-timizart-tiznit-2026',
    year: 2026,
    location: 'Tiznit',
    media: projectMedia['festival-timizart-tiznit-2026'],
    featured: true,
    verified: true,
    detailsVerified: false,
  },
  {
    name: 'Carnaval Bilmawn 2026',
    slug: 'carnaval-bilmawn-2026',
    year: 2026,
    location: null,
    media: projectMedia['carnaval-bilmawn-2026'],
    featured: true,
    verified: true,
    detailsVerified: false,
  },
  {
    name: 'Festival de l’Amandier — Tafraout 2026',
    slug: 'festival-amandier-tafraout-2026',
    year: 2026,
    location: 'Tafraout',
    media: projectMedia['festival-amandier-tafraout-2026'],
    featured: true,
    verified: true,
    detailsVerified: false,
  },
  {
    name: 'Festival Souissi — Rabat 2025',
    slug: 'festival-souissi-rabat-2025',
    year: 2025,
    location: 'Rabat',
    media: projectMedia['festival-souissi-rabat-2025'],
    featured: false,
    verified: true,
    detailsVerified: false,
  },
  {
    name: 'Moussem de Tan-Tan',
    slug: 'moussem-tan-tan',
    year: null,
    location: 'Tan-Tan',
    media: projectMedia['moussem-tan-tan'],
    featured: false,
    verified: true,
    detailsVerified: false,
  },
];

export const verifiedProjects = projects.filter((project) => project.verified);
export const featuredProjects = projects.filter((project) => project.verified && project.featured);
