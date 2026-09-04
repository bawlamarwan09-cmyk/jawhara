'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

function FormatPanel({ item, index, total, progress, reduceMotion }) {
  const step = total > 1 ? 1 / (total - 1) : 1;
  const start = index * step;
  const end = Math.min(1, start + step);
  const revealStart = Math.max(0, start - step * 0.68);
  const transformStart = Math.min(start, 0.999);
  const opacityStart = Math.min(start + step * 0.35, 0.999);
  const scale = useTransform(progress, [transformStart, end], [1, index === total - 1 ? 1 : 0.97]);
  const opacity = useTransform(progress, [opacityStart, end], [1, index === total - 1 ? 1 : 0.66]);
  const contentY = useTransform(progress, [revealStart, start], [28, 0]);
  const contentOpacity = useTransform(progress, [revealStart, start], [0.58, 1]);

  return (
    <motion.li
      className={`smooth-format-panel event-type-${item.emphasis}`}
      style={reduceMotion ? { zIndex: index + 1 } : { zIndex: index + 1, scale, opacity }}
    >
      <motion.div
        className="smooth-format-panel-content"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h3>{item.name}</h3>
      </motion.div>
    </motion.li>
  );
}

export function SmoothFormatsStack({ items }) {
  const stackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    mass: 0.25,
  });

  return (
    <ol
      ref={stackRef}
      className={`event-types-editorial-list smooth-formats-stack${reduceMotion ? ' is-reduced-motion' : ''}`}
      aria-label="Formats d’événements accompagnés"
    >
      {items.map((item, index) => (
        <FormatPanel
          item={item}
          index={index}
          total={items.length}
          progress={smoothProgress}
          reduceMotion={reduceMotion}
          key={item.name}
        />
      ))}
    </ol>
  );
}
