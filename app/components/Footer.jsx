import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <a
        href="#hero"
        className="logo brand-logo brand-logo-sm"
        style={{ textDecoration: 'none' }}
        aria-label="Jowharatech — Haut de page"
      >
        <Image
          src="/images/jowharatech-logo.jpg"
          alt="Jowharatech"
          width={1024}
          height={1024}
          className="brand-logo-img"
        />
      </a>
      <div className="footer-copy">
        Production &amp; Régie Artistique · Maroc — Sahara
        <br />© 2025 Jowharatech. Tous droits réservés.
      </div>
      <div className="footer-socials">
        <a
          href="https://www.facebook.com/jowharevent.sud"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Jowharatech"
          className="social-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
          </svg>
        </a>
      </div>
      <div className="footer-ar">الإنتاج والإدارة الفنية · المغرب</div>
    </footer>
  );
}
