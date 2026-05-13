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

// Runs before React hydrates, so the saved theme/lang are applied
// instantly and there is no flash of the wrong color scheme.
const themeBootstrap = `
(function(){try{
  var t = localStorage.getItem('jwt-theme');
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
  var l = localStorage.getItem('jwt-lang');
  document.documentElement.setAttribute('data-lang', l === 'ar' ? 'ar' : 'fr');
}catch(e){}})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      data-theme="light"
      data-lang="fr"
      className={`${cormorant.variable} ${montserrat.variable} ${notoArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
