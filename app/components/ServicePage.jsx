import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/content/services';
import { verifiedProjects } from '@/content/projects';
import { imageKitImageUrl, serviceMedia } from '@/content/media';
import { createServiceSchema } from '@/lib/seo';
import Breadcrumbs from './Breadcrumbs';
import PageFrame from './PageFrame';
import { StructuredData } from './JsonLd';

function ProjectEvidence({ service }) {
  const projects = service.projectSlugs
    .map((slug) => verifiedProjects.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <section className="service-proof internal-section" aria-labelledby={`${service.key}-proof-title`}>
      <div className="shell service-proof-grid">
        <div>
          <p className="section-index">Repères de terrain</p>
          <h2 id={`${service.key}-proof-title`}>{service.proofTitle}</h2>
          <p>{service.proofCopy}</p>
          <Link className="text-link" href="/realisations">Voir toutes les réalisations</Link>
        </div>
        <ol className="service-proof-list">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{project.name}</strong>
                <p>{[project.location, project.year].filter(Boolean).join(' · ') || 'Informations complémentaires non publiées'}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ServicePage({ service }) {
  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: service.navLabel, href: service.path },
  ];
  const relatedServices = service.related.map((key) => services[key]).filter(Boolean);
  const visual = serviceMedia[service.key] || null;

  return (
    <PageFrame>
      <main className={`internal-main service-page service-page-${service.variant}`}>
        <StructuredData data={createServiceSchema(service)} />

        <section className="internal-hero service-hero" aria-labelledby="page-title">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="internal-hero-grid">
              <div className="internal-hero-copy">
                <p className="section-index">{service.eyebrow}</p>
                <h1 id="page-title">{service.title}</h1>
                <p>{service.description}</p>
                <div className="internal-hero-actions">
                  <Link className="button button-primary" href="/devis">Présenter mon projet</Link>
                  <Link className="text-link" href="/realisations">Voir l’expérience terrain</Link>
                </div>
              </div>
              <aside className="service-scope" aria-label="Périmètre d’intervention">
                <p>{service.scopeTitle}</p>
                <dl>
                  <div><dt>Présence</dt><dd>Agadir</dd></div>
                  <div><dt>Zone</dt><dd>Souss-Massa et Maroc</dd></div>
                  <div><dt>Approche</dt><dd>Besoin, préparation, terrain</dd></div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="service-overview internal-section" aria-labelledby={`${service.key}-overview-title`}>
          <div className={`shell service-overview-grid${visual ? ' has-media' : ''}`}>
            <p className="section-index">01 — Le besoin</p>
            <div>
              <h2 id={`${service.key}-overview-title`}>{service.overviewTitle}</h2>
              <p className="service-lede">{service.introduction}</p>
              <p>{service.overview}</p>
            </div>
            {visual && (
              <figure className="service-overview-media">
                <Image
                  src={imageKitImageUrl(visual.media, 'service')}
                  alt={visual.media.alt}
                  fill
                  sizes="(max-width: 980px) calc(100vw - 36px), 34vw"
                />
                <figcaption>{visual.caption}</figcaption>
              </figure>
            )}
          </div>
        </section>

        <section className="service-audience internal-section" aria-labelledby={`${service.key}-audience-title`}>
          <div className="shell">
            <div className="internal-section-heading">
              <div>
                <p className="section-index">02 — Pour qui</p>
                <h2 id={`${service.key}-audience-title`}>{service.audienceTitle}</h2>
              </div>
              <p>{service.audienceIntro}</p>
            </div>
            <div className="audience-grid">
              {service.audiences.map(([title, description], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-approach internal-section" aria-labelledby={`${service.key}-approach-title`}>
          <div className="shell">
            <div className="internal-section-heading">
              <div>
                <p className="section-index">03 — Méthode</p>
                <h2 id={`${service.key}-approach-title`}>{service.approachTitle}</h2>
              </div>
              <p>{service.approachIntro}</p>
            </div>
            <ol className="service-steps">
              {service.steps.map(([title, description], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ProjectEvidence service={service} />

        <section className="related-services internal-section" aria-labelledby={`${service.key}-related-title`}>
          <div className="shell related-services-grid">
            <div>
              <p className="section-index">Expertises associées</p>
              <h2 id={`${service.key}-related-title`}>{service.relatedTitle}</h2>
            </div>
            <ul>
              {relatedServices.map((related, index) => (
                <li key={related.key}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Link href={related.path}>{related.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="internal-final-cta" aria-labelledby={`${service.key}-cta-title`}>
          <div className="shell internal-final-cta-grid">
            <div>
              <p className="section-index">Votre projet</p>
              <h2 id={`${service.key}-cta-title`}>{service.closingTitle}</h2>
            </div>
            <div>
              <p>{service.closingCopy}</p>
              <Link className="button button-primary" href="/devis">Demander une étude</Link>
              <Link className="text-link" href="/contact">Contacter Jawhara Tech</Link>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
