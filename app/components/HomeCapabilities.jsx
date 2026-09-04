import Link from 'next/link';

const expertises = [
  {
    number: '01',
    title: 'Sonorisation professionnelle',
    description: 'Une diffusion claire et homogène, pensée pour le lieu, le format et le public.',
    href: '/sonorisation-evenement-agadir',
  },
  {
    number: '02',
    title: 'Éclairage événementiel',
    description: 'Une présence visuelle maîtrisée qui accompagne l’ambiance et le rythme de l’événement.',
    href: '/eclairage-evenementiel-agadir',
  },
  {
    number: '03',
    title: 'Écrans LED & vidéo',
    description: 'Des contenus lisibles et une intégration vidéo cohérente avec l’espace événementiel.',
    href: '/location-ecran-led-agadir',
  },
  {
    number: '04',
    title: 'Régie & conduite technique',
    description: 'Une conduite coordonnée pour assurer la continuité technique pendant l’événement.',
    href: '/production-technique-evenementielle-agadir',
  },
];

export default function HomeCapabilities() {
  return (
    <>
      <section className="home-expertise-section" id="expertise" aria-labelledby="expertise-title">
        <div className="shell expertise-layout">
          <div className="expertise-heading">
            <p className="section-index">03 — Expertises</p>
            <h2 id="expertise-title">Quatre expertises. Une seule exigence de maîtrise.</h2>
            <p>Des métiers complémentaires réunis autour de la qualité d’exécution.</p>
          </div>

          <ol className="expertise-list">
            {expertises.map((expertise) => (
              <li key={expertise.number}>
                <span>{expertise.number}</span>
                <div>
                  <h3>{expertise.title}</h3>
                  <p>{expertise.description}</p>
                  <Link href={expertise.href} aria-label={`Découvrir : ${expertise.title}`}>Découvrir</Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="capability-statement" aria-labelledby="capability-title">
        <div className="shell capability-inner">
          <p className="section-index">Une exigence constante</p>
          <h2 id="capability-title">
            <span>Petit événement.</span>
            <span>Grande scène.</span>
            <span>Même exigence.</span>
          </h2>
          <p>Du format le plus intime à la grande scène, l’attention technique reste entière.</p>
        </div>
      </section>
    </>
  );
}
