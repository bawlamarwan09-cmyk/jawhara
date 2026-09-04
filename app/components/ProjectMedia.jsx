'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { imageKitImageUrl, imageKitVideoPosterUrl } from '@/content/media';
import {
  claimProjectSlot,
  mediaAutoplayAllowed,
  playExclusively,
  releaseProjectSlot,
  releaseVideo,
} from './videoPlayback';

function VideoPlate({ projectNumber }) {
  return (
    <div className="project-video-plate" aria-hidden="true">
      <div>
        <span>Film de terrain</span>
        <span>Vidéo vérifiée</span>
      </div>
      <strong>{projectNumber}</strong>
    </div>
  );
}

function UnavailablePlate({ projectNumber }) {
  return (
    <div className="project-video-plate is-unavailable" aria-hidden="true">
      <div>
        <span>Archive projet</span>
        <span>Média indisponible</span>
      </div>
      <strong>{projectNumber}</strong>
    </div>
  );
}

function ImageMedia({ media, projectNumber, preset, sizes }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const imageSrc = imageKitImageUrl(media, preset);

  if (!imageSrc || posterFailed) {
    return <UnavailablePlate projectNumber={projectNumber} />;
  }

  return (
    <Image
      src={imageSrc}
      alt={media.alt}
      fill
      sizes={sizes}
      onError={() => setPosterFailed(true)}
    />
  );
}

function VideoMedia({ media, projectName, projectNumber, preset, sizes }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const manualPauseRef = useRef(false);
  const manualPlayRef = useRef(false);
  const autoplayAllowedRef = useRef(false);
  const [videoMounted, setVideoMounted] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const posterSrc = imageKitVideoPosterUrl(media, preset);

  const slotRef = useRef(null);
  if (!slotRef.current) {
    slotRef.current = {
      deactivate: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          releaseVideo(videoRef.current);
        }
        setVideoMounted(false);
        setIsPlaying(false);
      },
    };
  }

  useEffect(() => {
    autoplayAllowedRef.current = mediaAutoplayAllowed();
    const container = containerRef.current;

    if (!container) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const meaningfullyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.55;
        setInViewport(meaningfullyVisible);

        if (meaningfullyVisible && autoplayAllowedRef.current && !manualPauseRef.current) {
          claimProjectSlot(slotRef.current);
          setVideoMounted(true);
        }

        if (!meaningfullyVisible) {
          manualPlayRef.current = false;
          if (videoRef.current) {
            videoRef.current.pause();
            releaseVideo(videoRef.current);
          }
          setVideoMounted(false);
          releaseProjectSlot(slotRef.current);

          if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
            manualPauseRef.current = false;
          }
        }
      },
      { threshold: [0, 0.55, 1] },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      releaseProjectSlot(slotRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoMounted) return undefined;

    if (inViewport && !manualPauseRef.current && (autoplayAllowedRef.current || manualPlayRef.current)) {
      playExclusively(video);
    } else if (!inViewport) {
      video.pause();
      releaseVideo(video);
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        video.pause();
        releaseVideo(video);
      } else if (inViewport && !manualPauseRef.current && autoplayAllowedRef.current) {
        playExclusively(video);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      video.pause();
      releaseVideo(video);
    };
  }, [inViewport, videoMounted]);

  const toggleVideo = () => {
    const video = videoRef.current;

    if (!videoMounted || !video) {
      manualPauseRef.current = false;
      manualPlayRef.current = true;
      setInViewport(true);
      setVideoFailed(false);
      claimProjectSlot(slotRef.current);
      setVideoMounted(true);
      return;
    }

    if (video.paused) {
      manualPauseRef.current = false;
      manualPlayRef.current = true;
      claimProjectSlot(slotRef.current);
      playExclusively(video);
    } else {
      manualPauseRef.current = true;
      manualPlayRef.current = false;
      video.pause();
      releaseVideo(video);
    }
  };

  return (
    <div ref={containerRef} className={`project-video-shell${isPlaying ? ' is-playing' : ''}`}>
      {posterSrc && !posterFailed ? (
        <Image
          src={posterSrc}
          alt={media.poster.alt}
          fill
          sizes={sizes}
          onError={() => setPosterFailed(true)}
        />
      ) : (
        <VideoPlate projectNumber={projectNumber} />
      )}

      {videoMounted && !videoFailed && (
        <video
          ref={videoRef}
          className="project-video-player"
          muted
          playsInline
          preload="none"
          poster={posterSrc || undefined}
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            releaseVideo(videoRef.current);
          }}
          onError={() => setVideoFailed(true)}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}

      {videoFailed && (
        <div className="project-video-error" role="status">
          <span>Vidéo momentanément indisponible.</span>
        </div>
      )}

      <button
        className="project-video-toggle"
        type="button"
        onClick={toggleVideo}
        aria-pressed={isPlaying}
        aria-label={`${isPlaying ? 'Mettre en pause' : 'Lire'} la vidéo : ${projectName}`}
      >
        <span className={`project-video-play-icon${posterSrc && !posterFailed ? ' is-over-media' : ''}${isPlaying ? ' is-pause' : ''}`} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ProjectMedia({ media, projectName, projectNumber, preset = 'projectCard', sizes }) {
  if (media.type === 'image') {
    return <ImageMedia media={media} projectNumber={projectNumber} preset={preset} sizes={sizes} />;
  }

  return (
    <VideoMedia
      media={media}
      projectName={projectName}
      projectNumber={projectNumber}
      preset={preset}
      sizes={sizes}
    />
  );
}
