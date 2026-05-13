export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="reveal">
          <div className="section-badge">
            <div className="divider" />
            <span className="badge-label">À Propos</span>
            <span className="badge-ar">من نحن</span>
          </div>
          <h2 className="about-h2">
            Notre force réside dans notre capacité à allier{' '}
            <span className="accent">tradition et modernité</span> sur chaque
            scène.
          </h2>
          <div className="hr-gold" />
          <p className="body-p">
            Depuis plusieurs années, notre entreprise est au cœur de
            l&apos;organisation et de la production des plus grands festivals et
            événements culturels du Maroc et de la région.
          </p>
          <p className="body-p">
            Spécialisée dans la gestion technique, la scénographie et la régie
            artistique, notre équipe passionnée met son expertise au service de
            chaque événement pour créer des expériences inoubliables.
          </p>
          <div className="blockquote-box">
            <p>قوتنا تكمن في قدرتنا على الجمع بين التراث والحداثة على كل خشبة مسرح</p>
          </div>
          <a
            href="#expertises"
            className="btn-outline"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              marginTop: 8,
            }}
          >
            Découvrir nos expertises
          </a>
        </div>

        <div className="reveal" style={{ transitionDelay: '.2s' }}>
          <div className="stats-grid">
            <div className="stat-card wide">
              <div className="big-n">20+</div>
              <div className="clabel">Années d&apos;expérience</div>
              <div className="car">سنة من الخبرة</div>
            </div>
            <div className="stat-card">
              <div className="big-n" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
                8+
              </div>
              <div className="clabel">Festivals</div>
              <div className="car">مهرجانات</div>
            </div>
            <div className="stat-card">
              <div className="big-n" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
                100%
              </div>
              <div className="clabel">Satisfaction</div>
              <div className="car">رضا تام</div>
            </div>
            <div className="quote-card">
              <p>
                &laquo; L&apos;événement parfait naît d&apos;une vision audacieuse
                et d&apos;une exécution irréprochable. &raquo;
              </p>
              <div className="qa">— Jowharatech, notre philosophie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
