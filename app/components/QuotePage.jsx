import Breadcrumbs from './Breadcrumbs';
import Contact from './Contact';
import PageFrame from './PageFrame';

export default function QuotePage() {
  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'Devis', href: '/devis' },
  ];

  return (
    <PageFrame>
      <main className="internal-main quote-page">
        <section className="internal-hero quote-hero" aria-labelledby="page-title">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="internal-hero-grid">
              <div className="internal-hero-copy">
                <p className="section-index">Demande de projet · Agadir et Maroc</p>
                <h1 id="page-title">Demander une étude pour votre événement.</h1>
              </div>
              <div className="quote-hero-intro">
                <p>
                  Commencez par les cinq informations essentielles : type d’événement, date, lieu, nom et téléphone.
                  L’email et le message restent optionnels.
                </p>
                <a className="button button-primary" href="#devis">Accéder au formulaire</a>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-expectations internal-section" aria-labelledby="quote-expectations-title">
          <div className="shell quote-expectations-grid">
            <div>
              <p className="section-index">Après votre demande</p>
              <h2 id="quote-expectations-title">Un premier cadre pour comprendre le projet.</h2>
            </div>
            <ol>
              <li><span>01</span><p>Les informations obligatoires permettent de situer le besoin.</p></li>
              <li><span>02</span><p>Les éléments complémentaires aident à préciser le contexte technique.</p></li>
              <li><span>03</span><p>La suite est définie selon les informations disponibles et le périmètre du projet.</p></li>
            </ol>
          </div>
        </section>

        <Contact />
      </main>
    </PageFrame>
  );
}
