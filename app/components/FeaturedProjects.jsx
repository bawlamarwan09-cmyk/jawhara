import Link from 'next/link';
import { featuredProjects } from '@/content/projects';
import { TextRevealByWord } from '@/components/ui/text-reveal';
import AnimatedProjectScroll from './ui/animated-scroll';

export default function FeaturedProjects() {
  return (
    <section className="featured-projects-section" id="realisations" aria-labelledby="featured-projects-title">
      <div className="shell">
        <div className="featured-projects-heading">
          <div>
            <p className="section-index">04 — Réalisations</p>
            <h2 id="featured-projects-title">Quelques réalisations.</h2>
          </div>
          <div className="featured-projects-summary">
            <p>Une sélection de rendez-vous culturels réalisés au Maroc.</p>
            <p className="featured-projects-count" aria-label={`${featuredProjects.length} projets sélectionnés`}>
              <strong aria-hidden="true">{String(featuredProjects.length).padStart(2, '0')}</strong>
              <span>projets<br />sélectionnés</span>
            </p>
          </div>
        </div>
      </div>

      <TextRevealByWord
        className="featured-projects-text-reveal"
        text="Des scènes. Des équipes sur le terrain. Des événements documentés à travers le Maroc."
      />

      <AnimatedProjectScroll projects={featuredProjects} />

      <div className="featured-projects-action shell">
        <Link className="text-link" href="/realisations">Voir toutes les réalisations</Link>
      </div>
    </section>
  );
}
