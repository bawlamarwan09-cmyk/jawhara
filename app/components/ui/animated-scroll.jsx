'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProjectMedia from '../ProjectMedia';

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function AnimatedProjectScroll({ projects }) {
  const sectionRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [currentProject, setCurrentProject] = useState(0);
  const projectCount = projects.length;

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const section = sectionRef.current;
    if (!section || projectCount < 2) return undefined;

    let animationFrame = null;

    const updateProject = () => {
      animationFrame = null;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);
      const nextProject = Math.round(progress * (projectCount - 1));
      setCurrentProject((current) => (current === nextProject ? current : nextProject));
    };

    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateProject);
    };

    updateProject();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [projectCount]);

  const navigateTo = useCallback((index) => {
    const section = sectionRef.current;
    if (!section || projectCount < 2) return;

    const targetIndex = clamp(index, 0, projectCount - 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const targetTop = sectionTop + (targetIndex / (projectCount - 1)) * scrollDistance;

    window.scrollTo({
      top: targetTop,
      behavior: reducedMotionRef.current ? 'auto' : 'smooth',
    });
  }, [projectCount]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigateTo(currentProject + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateTo(currentProject - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      navigateTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      navigateTo(projectCount - 1);
    }
  };

  if (!projectCount) return null;

  return (
    <div
      ref={sectionRef}
      className="animated-projects-scroll"
      style={{ '--project-count': projectCount }}
    >
      <div
        className="animated-projects-viewport"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Parcourir les réalisations. Utilisez le défilement ou les touches fléchées."
      >
        {projects.map((project, index) => {
          const offset = index - currentProject;
          const isActive = index === currentProject;
          const mediaOnLeft = index % 2 === 0;
          const projectNumber = String(index + 1).padStart(2, '0');
          const meta = [project.location, project.year].filter(Boolean).join(' · ');
          const leftTransform = `translate3d(0, ${offset * 100}%, 0)`;
          const rightTransform = `translate3d(0, ${offset * -100}%, 0)`;
          const shouldMountMedia = Math.abs(offset) <= 1;

          const mediaPanel = (
            <div
              className={`animated-projects-half animated-projects-media ${mediaOnLeft ? 'is-left' : 'is-right'}`}
              style={{ transform: mediaOnLeft ? leftTransform : rightTransform }}
            >
              {shouldMountMedia && project.media?.cover ? (
                <ProjectMedia
                  media={project.media.cover}
                  projectName={project.name}
                  projectNumber={projectNumber}
                  preset="projectCard"
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              ) : (
                <div className="animated-projects-media-plate" aria-hidden="true">
                  <span>Archive Jawhara Tech</span>
                  <strong>{projectNumber}</strong>
                </div>
              )}
              <div className="animated-projects-media-shade" aria-hidden="true" />
              <p className="animated-projects-media-label" aria-hidden="true">
                Média vérifié · {projectNumber}
              </p>
            </div>
          );

          const copyPanel = (
            <div
              className={`animated-projects-half animated-projects-copy ${mediaOnLeft ? 'is-right' : 'is-left'}`}
              style={{ transform: mediaOnLeft ? rightTransform : leftTransform }}
            >
              <div className="animated-projects-copy-inner">
                <p className="animated-projects-overline">
                  Projet {projectNumber} <span aria-hidden="true">/</span> {String(projectCount).padStart(2, '0')}
                </p>
                {meta && <p className="animated-projects-meta">{meta}</p>}
                <h3>{project.name}</h3>
                <div className="animated-projects-rule" aria-hidden="true" />
                <p className="animated-projects-note">
                  Une réalisation documentée sur le terrain par Jawhara Tech.
                </p>
              </div>
            </div>
          );

          return (
            <article
              className={`animated-project-slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
              inert={isActive ? undefined : ''}
              key={project.slug}
            >
              {mediaPanel}
              {copyPanel}
            </article>
          );
        })}

        <div className="animated-projects-progress" aria-label="Choisir une réalisation">
          {projects.map((project, index) => (
            <button
              type="button"
              className={index === currentProject ? 'is-current' : undefined}
              aria-label={`Afficher ${project.name}`}
              aria-current={index === currentProject ? 'true' : undefined}
              onClick={() => navigateTo(index)}
              key={project.slug}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Projet {currentProject + 1} sur {projectCount} : {projects[currentProject].name}
        </p>
      </div>
    </div>
  );
}
