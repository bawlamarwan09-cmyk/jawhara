import { Manrope, Space_Grotesk } from 'next/font/google';
import { siteConfig } from '@/content/site';
import { getProductionOrigin } from '@/lib/seo';
import JsonLd from './components/JsonLd';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = getProductionOrigin();
const { title, description } = siteConfig.seo;
const introBootstrap = `
  (function () {
    var mode = 'play';
    try {
      var seen = window.sessionStorage.getItem('jawhara_intro_played') === 'true';
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      var constrained = Boolean(connection && (connection.saveData || /^(slow-)?2g$/.test(connection.effectiveType || '')));
      mode = seen || reducedMotion || constrained ? 'skip' : 'play';
    } catch (error) {
      mode = 'skip';
    }
    document.documentElement.dataset.jawharaIntro = mode;
  }());
`;

export const metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: title,
    template: '%s | Jawhara Tech',
  },
  description,
  applicationName: 'Jawhara Tech',
  keywords: [
    'production technique événementielle Agadir',
    'sonorisation événement Agadir',
    'éclairage événementiel Agadir',
    'écrans LED événement Agadir',
    'production technique événement Maroc',
  ],
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    siteName: 'Jawhara Tech',
    title,
    description,
    ...(siteUrl
      ? {
          url: '/',
          images: [
            {
              url: '/og.png',
              width: 1200,
              height: 630,
              alt: 'Jawhara Tech — production technique événementielle au Maroc',
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    ...(siteUrl ? { images: ['/og.png'] } : {}),
  },
  icons: {
    icon: siteConfig.logo.fallbackSrc,
    apple: siteConfig.logo.fallbackSrc,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090909',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
