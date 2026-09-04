import Link from 'next/link';
import { verifiedProjects } from '@/content/projects';
import Breadcrumbs from './Breadcrumbs';
import PageFrame from './PageFrame';
import ProjectCard from './ProjectCard';

export default function ProjectsIndexPage() {
  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'Réalisations', href: '/realisations' },
  ];

  return (
    <PageFrame>
      <main className="internal-main projects-index-page">
        <section className="internal-hero projects-index-hero" aria-labelledby="page-title">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="internal-hero-grid">
              <div className="internal-hero-copy">
                <p className="section-index">Expérience terrain · Maroc</p>
                <h1 id="page-title">Réalisations événementielles.</h1>
              </div>
              <div className="projects-index-intro">
                <p>
                  Six rendez-vous documentés dans les données vérifiées de Jawhara Tech, avec des médias associés à
                  chaque projet par l’équipe et aucun périmètre technique ajouté sans confirmation.
                </p>
                <strong>{String(verifiedProjects.length).padStart(2, '0')} projets vérifiés</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-archive" aria-labelledby="projects-archive-title">
          <div className="shell">
            <div className="projects-archive-heading">
              <div>
                <p className="section-index">Archive sélectionnée</p>
                <h2 id="projects-archive-title">Une archive de terrain, projet par projet.</h2>
              </div>
              <p>
                Photographies et films restent attachés à leur projet vérifié. Les fiches pourront recevoir un lien
                de détail plus tard, sans modifier cette structure éditoriale.
              </p>
            </div>
            <div className="projects-index-grid">
              {verifiedProjects.map((project, index) => (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.slug}
                  showGallery
                  mediaPreset="projectArchive"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="internal-final-cta" aria-labelledby="projects-cta-title">
          <div className="shell internal-final-cta-grid">
            <div>
              <p className="section-index">Votre événement</p>
              <h2 id="projects-cta-title">Préparons le prochain rendez-vous.</h2>
            </div>
            <div>
              <p>Présentez le format, la date et le lieu pour commencer à cadrer votre besoin technique.</p>
              <Link className="button button-primary" href="/devis">Demander une étude</Link>
              <Link className="text-link" href="/production-technique-evenementielle-agadir">Découvrir notre approche</Link>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
