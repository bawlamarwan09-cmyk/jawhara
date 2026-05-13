export default function Footer() {
  return (
    <footer>
      <a href="#hero" className="logo" style={{ textDecoration: 'none' }}>
        <div className="logo-diamond" style={{ width: 26, height: 26 }}>
          <div className="logo-inner" style={{ width: 10, height: 10 }} />
        </div>
        <div className="logo-text" style={{ fontSize: 15 }}>
          Jowhara<span>tech</span>
        </div>
      </a>
      <div className="footer-copy">
        Production &amp; Régie Artistique · Maroc — Sahara
        <br />© 2025 Jowharatech. Tous droits réservés.
      </div>
      <div className="footer-ar">الإنتاج والإدارة الفنية · المغرب</div>
    </footer>
  );
}
