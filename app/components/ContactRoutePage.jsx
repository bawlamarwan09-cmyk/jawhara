import Link from 'next/link';
import { siteConfig } from '@/content/site';
import Breadcrumbs from './Breadcrumbs';
import Contact from './Contact';
import PageFrame from './PageFrame';

const phoneHref = siteConfig.contact.phone
  ? `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`
  : null;

const whatsappHref = siteConfig.contact.whatsapp
  ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`
  : null;

export default function ContactRoutePage() {
  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];
  const hasDirectContact = Boolean(
    siteConfig.contact.phone || siteConfig.contact.whatsapp || siteConfig.contact.email || siteConfig.contact.address,
  );

  return (
    <PageFrame>
      <main className="internal-main contact-page">
        <section className="internal-hero contact-hero" aria-labelledby="page-title">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="internal-hero-grid">
              <div className="internal-hero-copy">
                <p className="section-index">Jawhara Tech · Contact</p>
                <h1 id="page-title">Contacter Jawhara Tech à Agadir.</h1>
                <p>Présente à Agadir et active à travers le Maroc pour les besoins de production technique événementielle.</p>
              </div>
              <div className="contact-route-action">
                <p>
                  {hasDirectContact
                    ? 'Utilisez une coordonnée vérifiée ou présentez directement votre événement avec le formulaire.'
                    : 'Aucune coordonnée directe non vérifiée n’est publiée. Le formulaire projet reste le point de contact principal.'}
                </p>
                <a className="button button-primary" href="#devis">Présenter mon projet</a>
              </div>
            </div>
          </div>
        </section>

        {hasDirectContact && (
          <section className="verified-contact-section internal-section" aria-labelledby="verified-contact-title">
            <div className="shell">
              <p className="section-index">Coordonnées vérifiées</p>
              <h2 id="verified-contact-title">Choisir un moyen de contact.</h2>
              <address className="verified-contact-grid">
                {siteConfig.contact.phone && <a href={phoneHref}><span>Téléphone</span><strong>{siteConfig.contact.phone}</strong></a>}
                {siteConfig.contact.whatsapp && <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><strong>{siteConfig.contact.whatsapp}</strong></a>}
                {siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}><span>Email</span><strong>{siteConfig.contact.email}</strong></a>}
                {siteConfig.contact.address && <span><small>Adresse</small><strong>{siteConfig.contact.address}</strong></span>}
              </address>
            </div>
          </section>
        )}

        <Contact />

        <section className="contact-related internal-section" aria-labelledby="contact-related-title">
          <div className="shell related-services-grid">
            <div>
              <p className="section-index">Avant de nous écrire</p>
              <h2 id="contact-related-title">Situer le type d’accompagnement recherché.</h2>
            </div>
            <ul>
              <li><span>01</span><Link href="/production-technique-evenementielle-agadir">Production technique</Link></li>
              <li><span>02</span><Link href="/location-materiel-evenementiel-agadir">Location de matériel</Link></li>
              <li><span>03</span><Link href="/realisations">Réalisations</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
