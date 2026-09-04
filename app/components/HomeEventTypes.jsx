import { SmoothFormatsStack } from '@/components/ui/smooth-formats-stack';

const eventTypes = [
  { name: 'Festivals & concerts', emphasis: 'primary' },
  { name: 'Événements d’entreprise', emphasis: 'professional' },
  { name: 'Conférences', emphasis: 'professional' },
  { name: 'Événements institutionnels', emphasis: 'professional' },
  { name: 'Mariages', emphasis: 'standard' },
  { name: 'Événements privés', emphasis: 'standard' },
];

export default function HomeEventTypes() {
  return (
    <section className="home-event-types-section" aria-labelledby="home-event-types-title">
      <div className="shell event-types-editorial">
        <div className="event-types-editorial-heading">
          <p className="section-index">09 — Formats</p>
          <h2 id="home-event-types-title">La même rigueur, pour des formats différents.</h2>
          <p>
            La réponse technique s’adapte au contexte de l’événement sans perdre en lisibilité, en préparation ni en
            qualité d’exécution.
          </p>
        </div>

        <SmoothFormatsStack items={eventTypes} />
      </div>
    </section>
  );
}
