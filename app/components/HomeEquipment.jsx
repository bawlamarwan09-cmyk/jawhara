import Image from 'next/image';
import { equipmentMedia, imageKitImageUrl } from '@/content/media';

const equipmentPrinciples = [
  {
    number: '01',
    title: 'Préparé pour le projet',
    description: 'La solution est composée selon le format, le lieu et les besoins identifiés.',
  },
  {
    number: '02',
    title: 'Maîtrisé sur le terrain',
    description: 'Le matériel est installé et exploité par l’équipe Jawhara Tech.',
  },
  {
    number: '03',
    title: 'Disponible selon le besoin',
    description: 'En production complète ou en location accompagnée, le périmètre reste adapté à l’événement.',
  },
];

export default function HomeEquipment() {
  return (
    <section className="home-equipment-section" id="materiel" aria-labelledby="home-equipment-title">
      <div className="shell equipment-ownership-layout">
        <div className="equipment-ownership-heading">
          <p className="section-index">05 — Maîtrise opérationnelle</p>
          <h2 id="home-equipment-title">
            <span>Notre matériel.</span>
            <span>Notre maîtrise.</span>
          </h2>
          <p>
            Jawhara Tech travaille avec son propre matériel technique, préparé selon les besoins de chaque événement
            et mis en œuvre par son équipe.
          </p>
        </div>

        <figure className="equipment-control equipment-media">
          <Image
            src={imageKitImageUrl(equipmentMedia.primary, 'equipment')}
            alt={equipmentMedia.primary.alt}
            fill
            sizes="(max-width: 980px) calc(100vw - 36px), 36vw"
          />
          <span className="equipment-control-label">Préparation technique</span>
          <figcaption>{equipmentMedia.caption}</figcaption>
        </figure>

        <ol className="equipment-principles">
          {equipmentPrinciples.map((principle) => (
            <li key={principle.number}>
              <span>{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
