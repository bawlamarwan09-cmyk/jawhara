'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/content/site';

function Brand() {
  return (
    <Image
      className="brand-logo"
      src={siteConfig.logo.fallbackSrc}
      alt={siteConfig.logo.alt}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      priority
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  };

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const firstLink = mobileMenuRef.current?.querySelector('a');
    window.requestAnimationFrame(() => firstLink?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        headerRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [],
      ).filter((element) => element.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktopQuery = window.matchMedia('(min-width: 1081px)');
    const closeAtDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', closeAtDesktop);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', closeAtDesktop);
    };
  }, [open]);

  return (
    <header
      id="top"
      ref={headerRef}
      className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <nav className="nav-shell" aria-label="Navigation principale">
        <Link
          className="brand-link"
          href="/"
          onClick={() => closeMenu(false)}
          aria-label={`${siteConfig.companyName} — Accueil`}
        >
          <Brand />
        </Link>

        <ul className="desktop-nav">
          {siteConfig.navigation.map((link) => (
            <li className={link.children ? 'desktop-nav-group' : undefined} key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              {link.children && (
                <ul className="desktop-subnav" aria-label="Services">
                  {link.children.map((child) => (
                    <li key={child.href}><Link href={child.href}>{child.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link className="button button-outline nav-quote nav-quote-desktop" href="/devis">
            {siteConfig.ctas.quote}
          </Link>

          <Link className="button button-outline nav-quote nav-quote-mobile" href="/devis">
            Devis
          </Link>

          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <nav
          ref={mobileMenuRef}
          className="mobile-nav is-open"
          id="mobile-navigation"
          aria-label="Navigation mobile"
        >
          <ul>
            {siteConfig.navigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => closeMenu(false)}>
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mobile-subnav" aria-label="Services">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => closeMenu(false)}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
