import Link from 'next/link';
import { verifiedProjects } from '@/content/projects';
import { StickyRealisationsTimeline } from '@/components/ui/sticky-realisations-timeline';
import { SmoothCommercialPaths } from '@/components/ui/smooth-commercial-paths';

const productionStages = [
  'Étude des besoins',
  'Solution technique',
  'Installation',
  'Exploitation',
  'Démontage',
];

const rentalSupport = [
  'Transport selon le besoin',
  'Installation et démontage',
  'Assistance technique en option',
];

const proofSteps = verifiedProjects.map((project, index) => ({
  id: `proof-step-${index + 1}`,
  projects: [{
    name: project.name,
    slug: project.slug,
    meta: [project.location, project.year].filter(Boolean).join(' · '),
  }],
}));

export default function HomeProofAndPaths() {
  return (
    <>
      <section className="home-proof-section" aria-labelledby="proof-title">
        <StickyRealisationsTimeline steps={proofSteps} />
      </section>

      <section className="commercial-paths-section" id="services" aria-labelledby="paths-title">
        <div className="shell">
          <div className="paths-heading">
            <p className="section-index">02 — Deux approches</p>
            <h2 id="paths-title">Une réponse technique adaptée à votre besoin.</h2>
          </div>

          <SmoothCommercialPaths>
            <article className="commercial-path commercial-path-production">
              <div className="commercial-path-header">
                <span>01</span>
                <p>Prise en charge globale</p>
              </div>
              <h3>Production technique complète</h3>
              <p className="commercial-path-copy">
                Jawhara Tech étudie votre événement et prend en charge l’exécution technique, de la préparation au
                démontage.
              </p>
              <ol className="production-stages" aria-label="Étapes de la production technique">
                {productionStages.map((stage) => <li key={stage}>{stage}</li>)}
              </ol>
              <Link className="commercial-path-link" href="/production-technique-evenementielle-agadir">
                Explorer la production technique
              </Link>
            </article>

            <article className="commercial-path commercial-path-rental">
              <div className="commercial-path-header">
                <span>02</span>
                <p>Besoin ciblé</p>
              </div>
              <h3>Location de matériel</h3>
              <p className="commercial-path-copy">
                Accédez au matériel technique adapté aux besoins de votre événement, avec les services terrain utiles
                à votre configuration.
              </p>
              <ul className="rental-support">
                {rentalSupport.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className="commercial-path-link" href="/location-materiel-evenementiel-agadir">
                Explorer la location de matériel
              </Link>
            </article>
          </SmoothCommercialPaths>
        </div>
      </section>
    </>
  );
}
