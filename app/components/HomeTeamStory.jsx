import Image from 'next/image';
import { imageKitImageUrl, teamMedia } from '@/content/media';

export default function HomeTeamStory() {
  return (
    <>
      <section className="home-team-section" aria-labelledby="home-team-title">
        <div className="shell home-team-layout">
          <div className="home-team-heading">
            <p className="section-index">06 — L’équipe</p>
            <h2 id="home-team-title">
              <span>Une équipe</span>
              <span>de terrain.</span>
            </h2>
          </div>

          <figure className="team-field-visual team-field-media">
            <Image
              src={imageKitImageUrl(teamMedia.primary, 'team')}
              alt={teamMedia.primary.alt}
              fill
              sizes="(max-width: 980px) calc(100vw - 36px), 62vw"
            />
            <figcaption>Régie · Terrain</figcaption>
          </figure>

          <div className="home-team-copy">
            <p>
              La technique prend forme sur le terrain. L’équipe Jawhara Tech coordonne l’exécution, assure
              l’installation, accompagne l’exploitation pendant l’événement puis organise le démontage.
            </p>
            <p>Une continuité humaine entre la préparation et le dernier geste technique.</p>
          </div>
        </div>
      </section>

      <section className="home-story-section" aria-labelledby="home-story-title">
        <div className="story-trace" aria-hidden="true" />
        <div className="shell home-story-layout">
          <p className="section-index">07 — Trajectoire</p>
          <h2 id="home-story-title">
            <span>Née à Tan-Tan.</span>
            <span>Développée sur le terrain.</span>
            <span>Aujourd’hui présente à Agadir</span>
            <span>et active à travers le Maroc.</span>
          </h2>
          <p>
            Une histoire de marque façonnée par les événements, avec une identité qui reste d’abord technique,
            opérationnelle et tournée vers le terrain.
          </p>
        </div>
      </section>
    </>
  );
}
