'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#hero', fr: 'Accueil', ar: 'الرئيسية' },
  { href: '#about', fr: 'À Propos', ar: 'من نحن' },
  { href: '#expertises', fr: 'Expertises', ar: 'خدماتنا' },
  { href: '#references', fr: 'Références', ar: 'مراجعنا' },
  { href: '#contact', fr: 'Contact', ar: 'اتصل بنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="logo">
          <div className="logo-diamond">
            <div className="logo-inner" />
          </div>
          <div className="logo-text">
            Jowhara<span>tech</span>
          </div>
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li className="nav-link" key={l.href}>
              <a href={l.href}>
                <span className="fr">{l.fr}</span>
                <span className="ar">{l.ar}</span>
              </a>
            </li>
          ))}
        </ul>
        <LangToggle className="nav-lang" />
        <ThemeToggle className="nav-theme" />
        <a
          href="#contact"
          className="btn-gold nav-cta"
          style={{ textDecoration: 'none' }}
        >
          Nous Contacter
        </a>
        <div
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          role="button"
        >
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close}>
                <span className="fr">{l.fr}</span>
                <span className="ar">{l.ar}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-controls">
          <LangToggle className="mobile-lang" />
          <ThemeToggle className="mobile-theme" />
        </div>
        <a
          href="#contact"
          className="btn-gold"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 20,
            textDecoration: 'none',
          }}
          onClick={close}
        >
          Nous Contacter
        </a>
      </div>
    </>
  );
}
