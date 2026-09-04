import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import PageFrame from './PageFrame';

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
  ];

  return (
    <PageFrame>
      <main className="internal-main about-page">
        <section className="internal-hero about-hero" aria-labelledby="page-title">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="internal-hero-grid">
              <div className="internal-hero-copy">
                <p className="section-index">Jawhara Tech · À propos</p>
                <h1 id="page-title">La technique prend forme sur le terrain.</h1>
              </div>
              <p className="about-hero-intro">
                Jawhara Tech accompagne les événements par une production technique coordonnée, portée par son équipe
                et son propre matériel, depuis Agadir et à travers le Maroc.
              </p>
            </div>
          </div>
        </section>

        <section className="about-position internal-section" aria-labelledby="about-position-title">
          <div className="shell about-position-grid">
            <p className="section-index">01 — Positionnement</p>
            <div>
              <h2 id="about-position-title">Plus qu’un besoin matériel : une exécution technique cohérente.</h2>
              <p>
                Le cœur de Jawhara Tech est la production technique événementielle. Sonorisation, éclairage, écrans
                LED et régie sont abordés comme des expertises à coordonner autour du déroulé, du lieu et du public.
              </p>
              <Link className="text-link" href="/production-technique-evenementielle-agadir">Voir l’approche complète</Link>
            </div>
          </div>
        </section>

        <section className="about-operations internal-section" aria-labelledby="about-operations-title">
          <div className="shell">
            <div className="internal-section-heading">
              <div>
                <p className="section-index">02 — Équipe & matériel</p>
                <h2 id="about-operations-title">Préparer, installer, exploiter, démonter.</h2>
              </div>
              <p>
                Une continuité humaine et matérielle relie la préparation aux gestes techniques réalisés pendant
                l’événement.
              </p>
            </div>
            <div className="about-operations-grid">
              <article>
                <span>Équipe de terrain</span>
                <h3>Une conduite portée par les personnes qui exécutent.</h3>
                <p>L’équipe coordonne l’installation, accompagne l’exploitation et organise le démontage.</p>
              </article>
              <article>
                <span>Matériel maîtrisé</span>
                <h3>Une configuration préparée selon le projet.</h3>
                <p>Le matériel propre de Jawhara Tech est composé et mis en œuvre selon les besoins identifiés.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-story internal-section" aria-labelledby="about-story-title">
          <div className="shell about-story-grid">
            <p className="section-index">03 — Trajectoire</p>
            <div>
              <h2 id="about-story-title">
                <span>Née à Tan-Tan.</span>
                <span>Développée sur le terrain.</span>
                <span>Aujourd’hui présente à Agadir et active à travers le Maroc.</span>
              </h2>
              <p>
                Cette origine reste un repère dans l’histoire de la marque. Le positionnement actuel s’appuie sur
                Agadir, le Souss-Massa et une capacité d’intervention à l’échelle nationale.
              </p>
            </div>
          </div>
        </section>

        <section className="internal-final-cta" aria-labelledby="about-cta-title">
          <div className="shell internal-final-cta-grid">
            <div>
              <p className="section-index">Continuer</p>
              <h2 id="about-cta-title">Voir le terrain. Puis parler du vôtre.</h2>
            </div>
            <div>
              <Link className="button button-primary" href="/realisations">Voir les réalisations</Link>
              <Link className="text-link" href="/devis">Présenter un projet</Link>
              <Link className="text-link" href="/contact">Contacter Jawhara Tech</Link>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
