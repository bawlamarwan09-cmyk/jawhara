'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';
import { heroMedia, imageKitImageUrl, imageKitVideoUrl } from '@/content/media';
import { mediaAutoplayAllowed, playExclusively, releaseVideo } from './videoPlayback';
import SiteIntro from './SiteIntro';

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [introState, setIntroState] = useState('pending');
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const posterSrc = imageKitImageUrl(heroMedia.poster, 'hero');
  const mobileVideoSrc = imageKitVideoUrl(heroMedia.video, heroMedia.videoPresets.mobile);
  const desktopVideoSrc = imageKitVideoUrl(heroMedia.video, heroMedia.videoPresets.desktop);

  const revealHero = useCallback(() => setIntroState('revealing'), []);
  const completeIntro = useCallback(() => setIntroState('complete'), []);

  useEffect(() => {
    if (introState === 'pending') return;

    const autoplayAllowed = mediaAutoplayAllowed();
    if (autoplayAllowed) {
      setVideoSrc(window.matchMedia('(max-width: 720px)').matches ? mobileVideoSrc : desktopVideoSrc);
    }
    setVideoEnabled(autoplayAllowed);
  }, [desktopVideoSrc, introState, mobileVideoSrc]);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video || !videoEnabled) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2 && document.visibilityState === 'visible') {
          playExclusively(video);
        } else {
          video.pause();
          releaseVideo(video);
        }
      },
      { threshold: [0, 0.2] },
    );

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        video.pause();
        releaseVideo(video);
      }
    };

    observer.observe(hero);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      video.pause();
      releaseVideo(video);
    };
  }, [videoEnabled]);

  return (
    <>
      <SiteIntro onReveal={revealHero} onComplete={completeIntro} />

      <section ref={heroRef} className="hero" id="accueil" aria-labelledby="hero-title" data-intro={introState}>
        <div className="hero-media" aria-hidden="true">
          <Image
            src={posterSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="hero-image"
          />
          {videoEnabled && videoSrc && (
            <video
              ref={videoRef}
              className={`hero-video${videoReady ? ' is-ready' : ''}`}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster={posterSrc}
              tabIndex={-1}
              onCanPlay={() => setVideoReady(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-amber-light" aria-hidden="true" />
        <div className="hero-studio" aria-hidden="true">
          <div className="hero-studio-rail" />
          {[0, 1, 2].map((light) => (
            <div className={`hero-studio-light hero-studio-light-${light + 1}`} key={light}>
              <span className="hero-studio-mount" />
              <span className="hero-studio-fixture" />
              <span className="hero-studio-beam" />
            </div>
          ))}
          <div className="hero-studio-floor" />
        </div>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="hero-kicker">Production technique événementielle · Agadir</p>
            <h1 id="hero-title">
              <span>La technique</span>
              <span>au cœur de vos</span>
              <span className="hero-title-accent">événements.</span>
            </h1>
            <p className="hero-lead">
              Production technique, sonorisation, éclairage et écrans LED pour événements à Agadir et partout au Maroc.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#devis">
                {siteConfig.ctas.technicalStudy}
              </a>
              <a className="button button-ghost" href="#realisations">
                {siteConfig.ctas.projects}
              </a>
            </div>
            <ul className="trust-row" aria-label="Zone d’intervention">
              {siteConfig.coverage.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
