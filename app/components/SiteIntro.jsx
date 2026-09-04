'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const INTRO_SRC = 'https://ik.imagekit.io/latsqiyxk/LOOO.mp4';
const INTRO_STORAGE_KEY = 'jawhara_intro_played';
const TRANSITION_DURATION = 650;
const INITIAL_LOAD_TIMEOUT = 8000;
const STALL_GRACE_PERIOD = 3000;

export default function SiteIntro({ onComplete, onReveal }) {
  const videoRef = useRef(null);
  const revealTimerRef = useRef(null);
  const removalTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const stallTimerRef = useRef(null);
  const revealStartedRef = useRef(false);
  const completedRef = useRef(false);
  const skipButtonRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [phase, setPhase] = useState('waiting');

  const clearTimers = useCallback(() => {
    window.clearTimeout(revealTimerRef.current);
    window.clearTimeout(removalTimerRef.current);
    window.clearTimeout(safetyTimerRef.current);
    window.clearTimeout(stallTimerRef.current);
  }, []);

  const finishImmediately = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;
    clearTimers();
    revealStartedRef.current = true;
    document.documentElement.dataset.jawharaIntro = 'skip';
    videoRef.current?.pause();
    setPhase('complete');
    onReveal();
    onComplete();
  }, [clearTimers, onComplete, onReveal]);

  const beginReveal = useCallback(() => {
    if (revealStartedRef.current) return;

    revealStartedRef.current = true;
    window.clearTimeout(revealTimerRef.current);
    window.clearTimeout(safetyTimerRef.current);
    window.clearTimeout(stallTimerRef.current);
    setPhase('exiting');
    onReveal();

    removalTimerRef.current = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      document.documentElement.dataset.jawharaIntro = 'skip';
      videoRef.current?.pause();
      setPhase('complete');
      onComplete();
    }, TRANSITION_DURATION);
  }, [onComplete, onReveal]);

  useEffect(() => {
    const shouldPlay = document.documentElement.dataset.jawharaIntro === 'play';

    if (!shouldPlay) {
      finishImmediately();
      return undefined;
    }

    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      // The intro remains optional when browser storage is unavailable.
    }

    setVideoSrc(INTRO_SRC);
    setPhase('playing');
    safetyTimerRef.current = window.setTimeout(finishImmediately, INITIAL_LOAD_TIMEOUT);

    const handleKeyboard = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        beginReveal();
      } else if (event.key === 'Tab') {
        if (skipButtonRef.current) {
          event.preventDefault();
          skipButtonRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      clearTimers();
      window.removeEventListener('keydown', handleKeyboard);
      videoRef.current?.pause();
    };
  }, [beginReveal, clearTimers, finishImmediately]);

  const startPlayback = async () => {
    const video = videoRef.current;
    if (!video || revealStartedRef.current) return;

    try {
      await video.play();
    } catch {
      finishImmediately();
    }
  };

  const scheduleReveal = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    window.clearTimeout(revealTimerRef.current);
    const remaining = Math.max(0, video.duration - video.currentTime - TRANSITION_DURATION / 1000);
    revealTimerRef.current = window.setTimeout(beginReveal, remaining * 1000);
  };

  const handleWaiting = () => {
    if (revealStartedRef.current) return;
    window.clearTimeout(stallTimerRef.current);
    stallTimerRef.current = window.setTimeout(finishImmediately, STALL_GRACE_PERIOD);
  };

  const handlePlaying = () => {
    window.clearTimeout(safetyTimerRef.current);
    window.clearTimeout(stallTimerRef.current);
    scheduleReveal();
  };

  if (phase === 'complete') return null;

  return (
    <div className={`site-intro is-${phase}`} data-testid="site-intro">
      {videoSrc && (
        <video
          ref={videoRef}
          className="site-intro-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={scheduleReveal}
          onCanPlay={startPlayback}
          onPlaying={handlePlaying}
          onWaiting={handleWaiting}
          onStalled={handleWaiting}
          onEnded={beginReveal}
          onError={finishImmediately}
          onAbort={finishImmediately}
        />
      )}
      <button ref={skipButtonRef} className="site-intro-skip" type="button" onClick={beginReveal}>
        Passer
      </button>
    </div>
  );
}
