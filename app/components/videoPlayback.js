let activeVideo = null;
let activeProjectSlot = null;

export function mediaAutoplayAllowed() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const constrainedConnection = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

  return !reducedMotion && !constrainedConnection;
}

export async function playExclusively(video) {
  if (!video) return false;

  if (activeVideo && activeVideo !== video) {
    activeVideo.pause();
  }

  activeVideo = video;

  try {
    await video.play();
    return true;
  } catch {
    if (activeVideo === video) activeVideo = null;
    return false;
  }
}

export function releaseVideo(video) {
  if (activeVideo === video) activeVideo = null;
}

export function claimProjectSlot(slot) {
  if (activeProjectSlot && activeProjectSlot !== slot) {
    activeProjectSlot.deactivate();
  }

  activeProjectSlot = slot;
}

export function releaseProjectSlot(slot) {
  if (activeProjectSlot === slot) activeProjectSlot = null;
}
