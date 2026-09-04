import Image from 'next/image';
import Link from 'next/link';
import { imageKitImageUrl } from '@/content/media';
import ProjectMedia from './ProjectMedia';

export default function ProjectCard({ project, index, href = null, showGallery = false, mediaPreset = 'projectCard' }) {
  const meta = [project.location, project.year].filter(Boolean);
  const projectNumber = String(index + 1).padStart(2, '0');
  const cover = project.media?.cover || null;
  const gallery = project.media?.gallery || [];
  const mediaSizes = '(max-width: 720px) calc(100vw - 28px), (max-width: 1200px) 50vw, 720px';

  const content = (
    <>
      <div className="featured-project-media">
        {cover ? (
          <ProjectMedia
            media={cover}
            projectName={project.name}
            projectNumber={projectNumber}
            preset={mediaPreset}
            sizes={mediaSizes}
          />
        ) : (
          <div className="project-media-placeholder" aria-hidden="true">
            <div className="project-plate-header">
              <span>Archive projet</span>
              <span>Jawhara Tech</span>
            </div>
            <strong>{projectNumber}</strong>
            <div className="project-plate-footer">
              <span>{project.location || 'Lieu non publié'}</span>
              <span>{project.year || 'Année non publiée'}</span>
            </div>
          </div>
        )}
      </div>

      {showGallery && gallery.length > 0 && (
        <div className="project-gallery-strip" aria-label={`Autres vues de ${project.name}`}>
          {gallery.map((media) => (
            <div className={`project-gallery-thumb is-${media.orientation}`} key={media.id}>
              <Image
                src={imageKitImageUrl(media, 'projectThumb')}
                alt={media.alt}
                fill
                sizes="(max-width: 720px) 30vw, 180px"
              />
            </div>
          ))}
        </div>
      )}

      <div className="featured-project-body">
        <span className="featured-project-number" aria-hidden="true">{projectNumber}</span>
        <div>
          {meta.length > 0 && <p>{meta.join(' · ')}</p>}
          <h3>{project.name}</h3>
        </div>
      </div>
    </>
  );

  return (
    <article
      className={`featured-project-card${cover ? ' has-media' : ' has-placeholder'}${cover?.type === 'video' ? ' has-video' : ''}${cover?.orientation === 'portrait' ? ' has-portrait-media' : ''}${href ? ' is-linked' : ''}`}
      data-project-slug={project.slug}
    >
      {href ? (
        <Link className="featured-project-card-link" href={href} aria-label={`Voir le projet ${project.name}`}>
          {content}
        </Link>
      ) : content}
    </article>
  );
}
