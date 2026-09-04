export const metadata = {
  title: "Page introuvable",
  description: "La page demandée n’existe pas sur le site de Jawhara Tech.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-index">Erreur 404</p>
      <h1>Cette page n’existe pas.</h1>
      <p>Revenez à l’accueil pour découvrir les services de production technique de Jawhara Tech.</p>
      <a className="button button-primary" href="/">Retour à l’accueil</a>
    </main>
  );
}
