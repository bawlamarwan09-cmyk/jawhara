const festivals = [
  { n: '01', name: 'Moussem Tan Tan', desc: 'Festival International de la Culture Sahraouie', region: 'Tan Tan', tag: 'Culture' },
  { n: '02', name: 'Festival Guelmim', desc: 'Célébration des traditions du Souss', region: 'Guelmim', tag: 'Tradition' },
  { n: '03', name: 'Talguitart Agadir', desc: 'Festival de musique — Agadir', region: 'Agadir', tag: 'Musique' },
  { n: '04', name: 'Festival des Amandiers', desc: 'Lumières de Tafraout', region: 'Tafraout', tag: 'Arts' },
  { n: '05', name: 'Festival Timizar', desc: 'Arts et culture de la région', region: 'Souss', tag: 'Culture' },
  { n: '06', name: 'Festival Tifawine', desc: 'Lumières de Tafraout', region: 'Tafraout', tag: 'Arts' },
  { n: '07', name: 'Festival Idennayer', desc: 'Célébration amazighe', region: 'Maroc', tag: 'Amazigh' },
  { n: '08', name: 'Festival Souissi Rabat', desc: 'Grande scène nationale, Rabat', region: 'Rabat', tag: 'National' },
];

export default function References() {
  return (
    <section id="references">
      <div
        className="section-badge"
        style={{ maxWidth: 1200, margin: '0 auto 10px' }}
      >
        <div className="divider" />
        <span className="badge-label">Nos Références</span>
        <span className="badge-ar">مراجعنا</span>
      </div>
      <div className="ref-header">
        <h2 className="ref-h2 reveal">
          Festivals &amp;<br />
          <span className="accent">Événements</span><br />
          Marquants
        </h2>
        <p className="ref-sub-note reveal" style={{ transitionDelay: '.2s' }}>
          Des événements qui ont marqué l&apos;histoire culturelle du Maroc et du Sahara.
        </p>
      </div>

      <div className="fest-list reveal">
        {festivals.map((f) => (
          <div className="fest-row" key={f.n}>
            <span className="fest-n">{f.n}</span>
            <div className="fest-vl" />
            <div className="fest-info">
              <div className="fest-name">{f.name}</div>
              <div className="fest-desc">{f.desc}</div>
            </div>
            <span className="fest-region">{f.region}</span>
            <span className="fest-tag">{f.tag}</span>
            <div className="fest-arr">→</div>
          </div>
        ))}
      </div>

      <div className="phil-box reveal">
        <div className="bg-quote">&ldquo;</div>
        <div className="phil-inner">
          <div className="phil-fr">
            <div className="phil-quote-text">
              &laquo; L&apos;événement parfait naît d&apos;une vision audacieuse
              et d&apos;une exécution irréprochable. &raquo;
            </div>
            <div className="phil-author">— Jowharatech, notre philosophie</div>
          </div>
          <div className="phil-ar-text">
            &laquo;الحدث المثالي يولد من رؤية جريئة وتنفيذ لا تشوبه شائبة&raquo;
          </div>
        </div>
      </div>
    </section>
  );
}
