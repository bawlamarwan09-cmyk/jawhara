import { Cormorant_Garamond, Montserrat, Noto_Naskh_Arabic } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const metadata = {
  title: 'Jowharatech — Production & Régie Artistique',
  description:
    "Leader en production événementielle dans le sud du Maroc et au-delà. Festivals, scénographie, régie artistique.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${montserrat.variable} ${notoArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
