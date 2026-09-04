import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/content/site';

const services = [
  ['Production technique complète', '/production-technique-evenementielle-agadir'],
  ['Location de matériel', '/location-materiel-evenementiel-agadir'],
  ['Sonorisation professionnelle', '/sonorisation-evenement-agadir'],
  ['Éclairage événementiel', '/eclairage-evenementiel-agadir'],
  ['Écrans LED & vidéo', '/location-ecran-led-agadir'],
  ['Régie & conduite technique', '/production-technique-evenementielle-agadir'],
];

const navigation = [
  ['Réalisations', '/realisations'],
  ['À propos', '/a-propos'],
  ['Devis', '/devis'],
  ['Contact', '/contact'],
];

const footerPhoneHref = siteConfig.contact.phone
  ? 'tel:' + siteConfig.contact.phone.replace(/[^+\d]/g, '')
  : null;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand-link" href="/" aria-label="Jawhara Tech — Accueil">
            <Image
              className="brand-logo footer-logo"
              src={siteConfig.logo.fallbackSrc}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
            />
          </Link>
          <p>Production technique, sonorisation, éclairage, écrans LED et régie événementielle au Maroc.</p>
          {siteConfig.socials.facebook && (
            <a className="footer-social" href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          )}
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {services.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2>Navigation</h2>
          <ul>
            {navigation.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <address>
            {siteConfig.contact.phone && <a href={footerPhoneHref}>{siteConfig.contact.phone}</a>}
            {siteConfig.contact.email && (
              <a href={'mailto:' + siteConfig.contact.email}>{siteConfig.contact.email}</a>
            )}
            {siteConfig.contact.address && <span>{siteConfig.contact.address}</span>}
            {!siteConfig.contact.phone && !siteConfig.contact.email && !siteConfig.contact.address && (
              <Link href="/devis">Utiliser le formulaire de projet</Link>
            )}
          </address>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Jawhara Tech. Tous droits réservés.</p>
        <a href="#top">Retour en haut</a>
      </div>
    </footer>
  );
}
