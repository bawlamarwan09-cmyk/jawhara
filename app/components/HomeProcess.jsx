const processSteps = [
  ['01', 'Votre événement', 'Le format, le lieu et les premières contraintes donnent le point de départ.'],
  ['02', 'Étude des besoins', 'Les objectifs et les conditions réelles du site sont cadrés.'],
  ['03', 'Solution technique', 'Une réponse cohérente est définie selon le besoin identifié.'],
  ['04', 'Préparation & installation', 'Les moyens sont préparés, installés et vérifiés sur place.'],
  ['05', 'Exploitation technique', 'L’équipe accompagne la conduite technique pendant l’événement.'],
  ['06', 'Démontage', 'La dépose et la fin d’intervention sont organisées avec la même rigueur.'],
];

export default function HomeProcess() {
  return (
    <section className="home-process-section" aria-labelledby="home-process-title">
      <div className="shell">
        <div className="home-process-heading">
          <p className="section-index">08 — Méthode</p>
          <h2 id="home-process-title">Un projet conduit de bout en bout.</h2>
          <p>Une séquence lisible pour garder la maîtrise avant, pendant et après l’événement.</p>
        </div>

        <ol className="technical-timeline">
          {processSteps.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
