import { serviceNavigation } from './services';

const verifiedValue = (value, flag) => {
  if (flag !== 'true' || !value?.trim()) return null;
  return value.trim();
};

const verifiedExperienceYears = verifiedValue(
  process.env.NEXT_PUBLIC_EXPERIENCE_YEARS,
  process.env.NEXT_PUBLIC_EXPERIENCE_YEARS_VERIFIED,
);

export const siteConfig = {
  companyName: 'Jawhara Tech',
  logo: {
    fallbackSrc: '/images/jawhara-tech-logo-transparent.png',
    alt: 'Jawhara Tech — production technique événementielle',
    width: 1535,
    height: 1024,
    approvedAssetAvailable: true,
  },
  navigation: [
    { href: '/', label: 'Accueil' },
    { href: '/production-technique-evenementielle-agadir', label: 'Solutions', children: serviceNavigation },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ],
  ctas: {
    quote: 'Demander un devis',
    technicalStudy: 'Demander une étude technique',
    projects: 'Découvrir nos réalisations',
  },
  coverage: ['Présence à Agadir', 'Partout au Maroc'],
  contact: {
    phone: verifiedValue(
      process.env.NEXT_PUBLIC_CONTACT_PHONE,
      process.env.NEXT_PUBLIC_CONTACT_PHONE_VERIFIED,
    ),
    whatsapp: verifiedValue(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_VERIFIED,
    ),
    email: verifiedValue(
      process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      process.env.NEXT_PUBLIC_CONTACT_EMAIL_VERIFIED,
    ),
    address: verifiedValue(
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS_VERIFIED,
    ),
  },
  socials: {
    facebook: verifiedValue(
      process.env.NEXT_PUBLIC_FACEBOOK_URL,
      process.env.NEXT_PUBLIC_FACEBOOK_URL_VERIFIED,
    ),
    instagram: verifiedValue(
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_INSTAGRAM_URL_VERIFIED,
    ),
  },
  legal: {
    identity: verifiedValue(
      process.env.NEXT_PUBLIC_LEGAL_IDENTITY,
      process.env.NEXT_PUBLIC_LEGAL_IDENTITY_VERIFIED,
    ),
  },
  experience: {
    years: verifiedExperienceYears ? Number(verifiedExperienceYears) : null,
    verified: Boolean(verifiedExperienceYears),
  },
  seo: {
    title: 'Jawhara Tech — Technique événementielle à Agadir',
    description:
      'Production technique, sonorisation, éclairage et écrans LED pour événements à Agadir et partout au Maroc.',
  },
};
