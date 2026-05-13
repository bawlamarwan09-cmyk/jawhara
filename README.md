# Jowharatech — Next.js

Site Jowharatech (Production & Régie Artistique) reconstruit en **Next.js 14 (App Router)**.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `app/layout.js` — layout racine, polices Google via `next/font`, metadata.
- `app/page.js` — page d'accueil composant toutes les sections.
- `app/globals.css` — styles globaux.
- `app/components/` — sections : `Cursor`, `Navbar`, `Hero`, `About`, `Expertises`, `References`, `Contact`, `Footer`, `RevealObserver`.

## Build production

```bash
npm run build
npm start
```
# jawhara
