'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const slides = [
  { src: '/images/festival-4.jpg', alt: 'Moussem Tan Tan — Show drones, carte du Maroc dans le ciel' },
  { src: '/images/festival-1.jpg', alt: 'Festival Soussi Rabat — Pyrotechnie' },
  { src: '/images/festival-5.jpg', alt: 'Festival Semaine du Chameau — Vue aérienne scène & faisceaux' },
  { src: '/images/festival-2.jpg', alt: 'Festival Soussi Rabat — Jets CO₂' },
  { src: '/images/festival-6.jpg', alt: 'Talguit\'art Agadir — Bombino Band, Niger' },
  { src: '/images/festival-7.jpg', alt: 'Talguit\'art Agadir — Faisceaux & identité visuelle' },
  { src: '/images/festival-3.jpg', alt: 'Festival Soussi Rabat — Sparkulars' },
  { src: '/images/festival-8.jpg', alt: 'Régie technique — Console lumière en festival' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const GOLD = '#C9A84C', GOLD_L = '#E8C96A', GOLD_D = '#9B7D2E';

    const pts = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.5 + 0.15,
    }));

    const shapes = [
      { x: 0.78, y: 0.38, type: 'diamond', s: 90,  spd: 0.004,  c: GOLD,   a: 0.65, f: 0 },
      { x: 0.88, y: 0.18, type: 'tri',     s: 44,  spd: 0.007,  c: GOLD_L, a: 0.45, f: 1.2 },
      { x: 0.68, y: 0.72, type: 'diamond', s: 55,  spd: 0.003,  c: GOLD_D, a: 0.38, f: 0.6 },
      { x: 0.92, y: 0.58, type: 'ring',    s: 70,  spd: 0.002,  c: GOLD,   a: 0.18, f: 0.3 },
      { x: 0.73, y: 0.12, type: 'ring',    s: 35,  spd: 0.005,  c: GOLD_L, a: 0.22, f: 0.9 },
      { x: 0.62, y: 0.48, type: 'diamond', s: 130, spd: 0.0015, c: GOLD,   a: 0.07, f: 0.2 },
      { x: 0.83, y: 0.82, type: 'tri',     s: 30,  spd: 0.009,  c: GOLD_D, a: 0.3,  f: 1.5 },
    ];

    let t = 0;
    let raf;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a})`;
        ctx.fill();
      });

      shapes.forEach((s) => {
        const cx = s.x * W + Math.sin(t + s.f) * 10;
        const cy = s.y * H + Math.cos(t + s.f * 0.7) * 7;
        const rot = t * s.spd * 60;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.globalAlpha = s.a;
        ctx.strokeStyle = s.c;
        ctx.lineWidth = 1.2;
        if (s.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -s.s);
          ctx.lineTo(s.s * 0.58, 0);
          ctx.lineTo(0, s.s);
          ctx.lineTo(-s.s * 0.58, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.globalAlpha = s.a * 0.15;
          ctx.fillStyle = s.c;
          ctx.fill();
        } else if (s.type === 'tri') {
          ctx.beginPath();
          ctx.moveTo(0, -s.s);
          ctx.lineTo(s.s * 0.86, s.s * 0.5);
          ctx.lineTo(-s.s * 0.86, s.s * 0.5);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, s.s, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(0, 0, s.s * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });

      const ox = W * 0.78, oy = H * 0.42;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 140);
      g.addColorStop(0, 'rgba(201,168,76,.13)');
      g.addColorStop(0.5, 'rgba(201,168,76,.05)');
      g.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, 140, 0, Math.PI * 2);
      ctx.fill();

      const pulse = 0.22 + Math.sin(t * 1.8) * 0.06;
      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(t * 0.5);
      ctx.strokeStyle = `rgba(201,168,76,${pulse})`;
      ctx.lineWidth = 0.9;
      ctx.setLineDash([5, 9]);
      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(-t * 0.3);
      ctx.strokeStyle = `rgba(201,168,76,${pulse * 0.6})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const core = ctx.createRadialGradient(ox, oy, 0, ox, oy, 22);
      core.addColorStop(0, 'rgba(232,201,106,.35)');
      core.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(ox, oy, 22, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`hero-slide${i === active ? ' active' : ''}`}
            aria-hidden={i !== active}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hero-slide-img"
            />
          </div>
        ))}
      </div>
      <canvas id="hero-canvas" ref={canvasRef} />
      <div className="hero-grad1" />
      <div className="hero-grad2" />
      <div className="hero-vignette" />

      <div className="hero-slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot${i === active ? ' active' : ''}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <div className="hero-content">
        <span className="hero-ar">خبراء الإنتاج والإدارة الفنية</span>
        <h1 className="hero-h1">
          <span style={{ display: 'block' }}>Des scènes</span>
          <span className="line-gold" style={{ display: 'block' }}>qui marquent</span>
          <span style={{ display: 'block' }}>les esprits.</span>
        </h1>
        <div className="divider" style={{ margin: '16px 0' }} />
        <p className="hero-sub">
          Des festivals qui transcendent les frontières. Leader en production
          événementielle dans le sud du Maroc et au-delà.
        </p>
        <div className="hero-btns">
          <a href="#references" className="btn-gold" style={{ textDecoration: 'none' }}>
            Nos Réalisations
          </a>
          <a href="#expertises" className="btn-outline" style={{ textDecoration: 'none' }}>
            Nos Expertises
          </a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="h-stat">
          <div className="num">20+</div>
          <div className="lbl">Années d&apos;expérience</div>
          <div className="ar">سنة خبرة</div>
        </div>
        <div className="h-stat">
          <div className="num">8+</div>
          <div className="lbl">Festivals majeurs</div>
          <div className="ar">مهرجانات كبرى</div>
        </div>
        <div className="h-stat">
          <div className="num">100%</div>
          <div className="lbl">Satisfaction</div>
          <div className="ar">رضا العملاء</div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
