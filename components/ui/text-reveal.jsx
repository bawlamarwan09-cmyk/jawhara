'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function RevealWord({ children, index, total, progress, reduceMotion }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="text-reveal-word">
      <span className="text-reveal-word-ghost" aria-hidden="true">{children}</span>
      <motion.span
        className="text-reveal-word-active"
        style={{ opacity: reduceMotion ? 1 : opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function TextRevealByWord({ text, className = '' }) {
  const targetRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end center'],
  });

  return (
    <div ref={targetRef} className={`text-reveal ${className}`.trim()}>
      <div className="text-reveal-sticky">
        <p className="text-reveal-copy">
          {words.map((word, index) => (
            <RevealWord
              index={index}
              total={words.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
              key={`${word}-${index}`}
            >
              {word}
            </RevealWord>
          ))}
        </p>
      </div>
    </div>
  );
}
