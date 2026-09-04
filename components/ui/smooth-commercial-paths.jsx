'use client';

import { Children, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export function SmoothCommercialPaths({ children }) {
  const stackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const panels = Children.toArray(children);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    mass: 0.25,
  });
  const firstPanelScale = useTransform(smoothProgress, [0.12, 0.72], [1, 0.965]);
  const firstPanelOpacity = useTransform(smoothProgress, [0.36, 0.78], [1, 0.64]);
  const firstPanelY = useTransform(smoothProgress, [0.12, 0.72], [0, -18]);
  const secondPanelContentY = useTransform(smoothProgress, [0.42, 0.82], [34, 0]);
  const secondPanelContentOpacity = useTransform(smoothProgress, [0.42, 0.72], [0.58, 1]);

  return (
    <div
      ref={stackRef}
      className={`smooth-commercial-stack${reduceMotion ? ' is-reduced-motion' : ''}`}
    >
      {panels.map((panel, index) => {
        const isFirst = index === 0;
        const panelStyle = reduceMotion || !isFirst
          ? undefined
          : { scale: firstPanelScale, opacity: firstPanelOpacity, y: firstPanelY };
        const contentStyle = reduceMotion || isFirst
          ? undefined
          : { y: secondPanelContentY, opacity: secondPanelContentOpacity };

        return (
          <motion.div
            className={`smooth-commercial-panel smooth-commercial-panel-${index + 1}`}
            style={panelStyle}
            key={`commercial-panel-${index + 1}`}
          >
            <motion.div className="smooth-commercial-panel-content" style={contentStyle}>
              {panel}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
