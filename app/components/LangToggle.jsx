'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'jwt-lang';

export default function LangToggle({ className = '' }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ar' || saved === 'fr') {
      setLang(saved);
      document.documentElement.setAttribute('data-lang', saved);
    } else {
      document.documentElement.setAttribute('data-lang', 'fr');
    }
  }, []);

  const switchTo = (value) => {
    setLang(value);
    document.documentElement.setAttribute('data-lang', value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label="Langue">
      <button
        type="button"
        className={`lang-opt${lang === 'fr' ? ' active' : ''}`}
        onClick={() => switchTo('fr')}
        aria-pressed={lang === 'fr'}
      >
        FR
      </button>
      <span className="lang-sep" aria-hidden="true">/</span>
      <button
        type="button"
        className={`lang-opt${lang === 'ar' ? ' active' : ''}`}
        onClick={() => switchTo('ar')}
        aria-pressed={lang === 'ar'}
      >
        AR
      </button>
    </div>
  );
}
