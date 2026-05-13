const expertises = [
  {
    n: '01', icon: '⬡',
    title: 'Production Technique',
    titleAr: 'الإنتاج التقني',
    desc: "Installation complète de scènes professionnelles, structures modulaires adaptées à tous les formats d'événements, son et lumière de dernière génération.",
  },
  {
    n: '02', icon: '◈',
    title: 'Scénographie & Décor',
    titleAr: 'التصميم والديكور',
    desc: "Conception artistique de l'espace, décors sur mesure, identité visuelle de l'événement, LED walls et structures d'affichage grand format.",
  },
  {
    n: '03', icon: '◎',
    title: 'Sonorisation & Éclairage',
    titleAr: 'الصوت والإضاءة',
    desc: 'Systèmes audio haute performance, éclairage scénique spectaculaire, équipe technique expérimentée pour une expérience visuelle exceptionnelle.',
  },
  {
    n: '04', icon: '◇',
    title: 'Régie Artistique',
    titleAr: 'الإدارة الفنية',
    desc: 'Coordination des artistes et équipes, planning technique, gestion de la logistique, accompagnement des équipes internationales et nationales.',
  },
  {
    n: '05', icon: '◉',
    title: 'Événements en Plein Air',
    titleAr: 'الفعاليات في الهواء الطلق',
    desc: 'Spécialiste des événements dans des environnements naturels et désertiques, structures adaptées aux conditions climatiques du Sahara.',
  },
  {
    n: '06', icon: '✦',
    title: 'Dimension Internationale',
    titleAr: 'البعد الدولي',
    desc: 'Expérience avec artistes et équipes du monde entier, maîtrise des standards techniques internationaux, rayonnement au-delà des frontières du Maroc.',
  },
];

export default function Expertises() {
  return (
    <section id="expertises">
      <div className="section-center">
        <div className="center-badge">
          <div className="line line-r" />
          <span>Nos Expertises</span>
          <div className="line line-l" />
        </div>
        <h2 className="exp-h2 display">
          Un savoir-faire{' '}
          <span className="gold-gradient" style={{ fontWeight: 600 }}>
            reconnu
          </span>
        </h2>
        <p className="exp-ar">خبرة معترف بها في كل جانب من جوانب الإنتاج</p>
      </div>
      <div className="exp-grid reveal">
        {expertises.map((e) => (
          <div className="exp-card" key={e.n}>
            <div className="exp-top-line" />
            <div className="exp-bg-num">{e.n}</div>
            <div className="exp-icon-sym">{e.icon}</div>
            <div className="exp-title">{e.title}</div>
            <div className="exp-title-ar">{e.titleAr}</div>
            <div className="exp-div" />
            <p className="exp-desc">{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
