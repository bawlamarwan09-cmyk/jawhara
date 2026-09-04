'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function TimelineStep({ step, index, total, progress, reduceMotion }) {
  const center = total > 1 ? index / (total - 1) : 0;
  const activationRange = total > 1 ? 0.72 / (total - 1) : 1;
  const markerRange = total > 1 ? 0.52 / (total - 1) : 1;
  const opacity = useTransform(progress, (value) => {
    const proximity = 1 - clamp(Math.abs(value - center) / activationRange, 0, 1);
    return 0.28 + proximity * 0.72;
  });
  const y = useTransform(progress, (value) => {
    const delta = clamp((value - center) / activationRange, -1, 1);
    return delta < 0 ? Math.abs(delta) * 12 : delta * -6;
  });
  const filter = useTransform(progress, (value) => {
    const proximity = 1 - clamp(Math.abs(value - center) / activationRange, 0, 1);
    return `blur(${((1 - proximity) * 2.4).toFixed(2)}px)`;
  });
  const markerScale = useTransform(progress, (value) => {
    const proximity = 1 - clamp(Math.abs(value - center) / markerRange, 0, 1);
    return 0.76 + proximity * 0.34;
  });

  const animatedTextStyle = reduceMotion ? undefined : { opacity, y, filter };
  const markerStyle = reduceMotion ? undefined : { scale: markerScale };

  return (
    <li className={`proof-timeline-step${index % 2 === 0 ? ' is-left' : ' is-right'}`}>
      <motion.div className="proof-timeline-copy" style={animatedTextStyle}>
        <p className="proof-timeline-overline">
          Repère {String(index + 1).padStart(2, '0')}
          <span aria-hidden="true"> / {String(total).padStart(2, '0')}</span>
        </p>
        <div className="proof-timeline-projects">
          {step.projects.map((project) => (
            <article key={project.slug}>
              <h3>{project.name}</h3>
              {project.meta && <p>{project.meta}</p>}
            </article>
          ))}
        </div>
      </motion.div>

      <span className="proof-timeline-marker-shell" aria-hidden="true">
        <motion.span className="proof-timeline-marker" style={markerStyle} />
      </span>
    </li>
  );
}

export function StickyRealisationsTimeline({ steps }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!steps.length) return null;

  return (
    <div
      ref={sectionRef}
      className={`proof-timeline-scroll${reduceMotion ? ' is-reduced-motion' : ''}`}
      style={{
        '--proof-step-count': steps.length,
        '--proof-scroll-height': `${Math.max(300, steps.length * 55)}svh`,
        '--proof-line-inset': `${50 / steps.length}%`,
      }}
    >
      <div className="proof-timeline-sticky">
        <div className="shell proof-timeline-layout">
          <header className="proof-timeline-heading">
            <p className="section-index">01 — Réalisations documentées</p>
            <h2 id="proof-title">Sur le terrain, partout au Maroc.</h2>
          </header>

          <div className="proof-timeline-body">
            <div className="proof-timeline-line" aria-hidden="true">
              <motion.span style={{ scaleY: reduceMotion ? 1 : lineScale }} />
            </div>

            <ol className="proof-timeline-steps" aria-label="Réalisations documentées">
              {steps.map((step, index) => (
                <TimelineStep
                  step={step}
                  index={index}
                  total={steps.length}
                  progress={scrollYProgress}
                  reduceMotion={reduceMotion}
                  key={step.id}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
