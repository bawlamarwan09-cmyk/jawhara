import Image from 'next/image';

const shots = [
  {
    src: '/images/festival-4.jpg',
    title: 'Moussem Tan Tan',
    subtitle: 'Show de drones · Carte du Maroc en vol',
    ar: 'موسم طانطان',
    tag: 'Drone Show',
  },
  {
    src: '/images/festival-1.jpg',
    title: 'Festival Soussi Rabat',
    subtitle: 'Effets pyrotechniques · Scène principale',
    ar: 'مهرجان السويسي الرباط',
    tag: 'Pyrotechnie',
  },
  {
    src: '/images/festival-5.jpg',
    title: 'Festival Semaine du Chameau',
    subtitle: 'Vue aérienne · Faisceaux laser',
    ar: 'مهرجان أسبوع الجمل',
    tag: 'Scénographie',
  },
  {
    src: '/images/festival-6.jpg',
    title: 'Talguit\'art Agadir',
    subtitle: 'Bombino Band · Niger',
    ar: 'تالكيتارت أكادير',
    tag: 'Concert live',
  },
  {
    src: '/images/festival-2.jpg',
    title: 'Festival Soussi Rabat',
    subtitle: 'Jets de CO₂ · Show live',
    ar: 'مهرجان السويسي الرباط',
    tag: 'Effets scéniques',
  },
  {
    src: '/images/festival-7.jpg',
    title: 'Talguit\'art Agadir',
    subtitle: 'Faisceaux & identité visuelle',
    ar: 'تالكيتارت أكادير',
    tag: 'Lumière',
  },
  {
    src: '/images/festival-3.jpg',
    title: 'Festival Soussi Rabat',
    subtitle: 'Sparkulars · LED walls',
    ar: 'مهرجان السويسي الرباط',
    tag: 'Lumière & LED',
  },
  {
    src: '/images/festival-8.jpg',
    title: 'Régie technique',
    subtitle: 'Console lumière · Direction artistique',
    ar: 'الإدارة التقنية',
    tag: 'Régie',
  },
];

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="section-center">
        <div className="center-badge">
          <div className="line line-r" />
          <span>Galerie</span>
          <div className="line line-l" />
        </div>
        <h2 className="exp-h2 display">
          Captures de <span className="gold-gradient" style={{ fontWeight: 600 }}>scène</span>
        </h2>
        <p className="exp-ar">لقطات حية من مهرجاناتنا</p>
      </div>

      <div className="gallery-grid reveal">
        {shots.map((s, i) => (
          <figure
            className="gallery-card"
            key={s.src}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="gallery-img-wrap">
              <Image
                src={s.src}
                alt={`${s.title} — ${s.subtitle}`}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                className="gallery-img"
                priority={i === 0}
              />
              <div className="gallery-overlay" />
              <span className="gallery-tag">{s.tag}</span>
            </div>
            <figcaption className="gallery-caption">
              <div className="gallery-title">{s.title}</div>
              <div className="gallery-sub">{s.subtitle}</div>
              <div className="gallery-ar">{s.ar}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
