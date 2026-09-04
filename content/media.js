const imageKitPresets = {
  hero: { width: 2200, quality: 82 },
  projectCard: { width: 1440, quality: 80 },
  projectArchive: { width: 1800, quality: 82 },
  projectThumb: { width: 640, quality: 76 },
  team: { width: 1600, quality: 82 },
  equipment: { width: 1400, quality: 80 },
  service: { width: 1400, quality: 80 },
};

const videoPresets = {
  heroMobile: ['so-3', 'du-8', 'w-720', 'q-50', 'ac-none', 'f-mp4'],
  heroDesktop: ['so-3', 'du-8', 'w-960', 'q-50', 'ac-none', 'f-mp4'],
};

function addImageKitTransform(source, transformations) {
  const url = new URL(source);
  url.searchParams.set('tr', transformations.join(','));
  return url.toString();
}

export function imageKitImageUrl(media, preset = 'projectCard') {
  if (!media || media.type !== 'image') return null;

  const { width, quality } = imageKitPresets[preset] || imageKitPresets.projectCard;
  return addImageKitTransform(media.src, [`w-${width}`, `q-${quality}`, 'f-auto']);
}

export function imageKitVideoPosterUrl(media, preset = 'projectCard') {
  if (!media || media.type !== 'video' || !media.poster?.available) return null;

  const { width, quality } = imageKitPresets[preset] || imageKitPresets.projectCard;
  const source = new URL(media.src);
  const poster = media.poster.src
    ? new URL(media.poster.src)
    : new URL(`${source.origin}${source.pathname}/ik-thumbnail.jpg`);
  const updatedAt = source.searchParams.get('updatedAt');

  if (updatedAt) poster.searchParams.set('updatedAt', updatedAt);

  const transformations = [];
  if (media.poster.offset) transformations.push(`so-${media.poster.offset}`);
  transformations.push(`w-${width}`, `q-${quality}`, 'f-auto');
  poster.searchParams.set('tr', transformations.join(','));

  return poster.toString();
}

export function imageKitVideoUrl(media, preset) {
  if (!media || media.type !== 'video' || !videoPresets[preset]) return null;

  return addImageKitTransform(media.src, videoPresets[preset]);
}

export const mediaLibrary = {
  tifawineVideo: {
    id: 'tifawine-video',
    type: 'video',
    src: 'https://ik.imagekit.io/nwnfor2vv/-1344360990813787003.mp4?updatedAt=1788453769321',
    projectSlug: 'festival-tifawine-2026',
    cover: true,
    verified: true,
    alt: 'Vidéo du Festival Tifawine 2026',
    poster: { available: false, src: null, verified: false },
  },
  timizartVideo: {
    id: 'timizart-video',
    type: 'video',
    src: 'https://ik.imagekit.io/nwnfor2vv/886547486762342913.mp4?updatedAt=1788453682393',
    projectSlug: 'festival-timizart-tiznit-2026',
    cover: true,
    verified: true,
    alt: 'Vidéo du Festival Timizart à Tiznit en 2026',
    poster: { available: false, src: null, verified: false },
  },
  bilmawnVideo: {
    id: 'bilmawn-video',
    type: 'video',
    src: 'https://ik.imagekit.io/nwnfor2vv/8798443113216946833.mp4?updatedAt=1788453760103',
    projectSlug: 'carnaval-bilmawn-2026',
    cover: true,
    verified: true,
    alt: 'Vidéo du Carnaval Bilmawn 2026',
    poster: { available: false, src: null, verified: false },
  },
  amandierCover: {
    id: 'amandier-5082',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5082.jpeg?updatedAt=1788453538161',
    projectSlug: 'festival-amandier-tafraout-2026',
    cover: true,
    verified: true,
    orientation: 'landscape',
    alt: 'Scène du Festival de l’Amandier à Tafraout',
  },
  amandierStage: {
    id: 'amandier-5079',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5079.jpeg?updatedAt=1788453538562',
    projectSlug: 'festival-amandier-tafraout-2026',
    cover: false,
    verified: true,
    orientation: 'landscape',
    alt: 'Scène et écran du Festival de l’Amandier à Tafraout',
  },
  amandierAudience: {
    id: 'amandier-5081',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5081.jpeg?updatedAt=1788453539926',
    projectSlug: 'festival-amandier-tafraout-2026',
    cover: false,
    verified: true,
    orientation: 'landscape',
    alt: 'Public du Festival de l’Amandier à Tafraout',
  },
  souissiVideo: {
    id: 'souissi-video',
    type: 'video',
    src: 'https://ik.imagekit.io/latsqiyxk/-7735125059175399192.mp4?updatedAt=1788459181632',
    projectSlug: 'festival-souissi-rabat-2025',
    cover: true,
    verified: true,
    orientation: 'portrait',
    alt: 'Vidéo du Festival Souissi à Rabat en 2025',
    poster: {
      available: true,
      src: null,
      offset: 3,
      verified: true,
      alt: 'Scène du Festival Souissi à Rabat',
    },
  },
  tanTanCover: {
    id: 'tan-tan-5085',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5085.jpeg?updatedAt=1788453534743',
    projectSlug: 'moussem-tan-tan',
    cover: true,
    verified: true,
    orientation: 'portrait',
    alt: 'Scène du Moussem de Tan-Tan',
  },
  tanTanStage: {
    id: 'tan-tan-5086',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5086.jpeg?updatedAt=1788453536103',
    projectSlug: 'moussem-tan-tan',
    cover: false,
    verified: true,
    orientation: 'portrait',
    alt: 'Artistes sur la scène du Moussem de Tan-Tan',
  },
  tanTanPerformer: {
    id: 'tan-tan-5087',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5087.jpeg?updatedAt=1788453537117',
    projectSlug: 'moussem-tan-tan',
    cover: false,
    verified: true,
    orientation: 'portrait',
    alt: 'Musicien sur la scène du Moussem de Tan-Tan',
  },
  tanTanFlag: {
    id: 'tan-tan-5088',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5088.jpeg?updatedAt=1788453535616',
    projectSlug: 'moussem-tan-tan',
    cover: false,
    verified: true,
    orientation: 'portrait',
    alt: 'Drapeau marocain sur la scène du Moussem de Tan-Tan',
  },
  teamSound: {
    id: 'team-regie-5070',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5070.jpeg?updatedAt=1788453538553',
    projectSlug: null,
    cover: false,
    verified: true,
    orientation: 'landscape',
    alt: 'Régie son pendant un événement',
  },
  teamLighting: {
    id: 'team-regie-5071',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5071.jpeg?updatedAt=1788453538211',
    projectSlug: null,
    cover: false,
    verified: true,
    orientation: 'landscape',
    alt: 'Opération technique en régie pendant un événement',
  },
  teamOperation: {
    id: 'team-regie-5072',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5072.jpeg?updatedAt=1788453538111',
    projectSlug: null,
    cover: false,
    verified: true,
    orientation: 'landscape',
    alt: 'Équipe technique à un poste de régie pendant un événement',
  },
  teamPrimary: {
    id: 'team-regie-5073',
    type: 'image',
    src: 'https://ik.imagekit.io/nwnfor2vv/IMG_5073.jpeg?updatedAt=1788453537544',
    projectSlug: null,
    cover: true,
    verified: true,
    orientation: 'landscape',
    alt: 'Équipe technique en régie pendant un événement',
  },
};

export const projectMedia = {
  'festival-tifawine-2026': {
    cover: mediaLibrary.tifawineVideo,
    gallery: [],
  },
  'festival-timizart-tiznit-2026': {
    cover: mediaLibrary.timizartVideo,
    gallery: [],
  },
  'carnaval-bilmawn-2026': {
    cover: mediaLibrary.bilmawnVideo,
    gallery: [],
  },
  'festival-amandier-tafraout-2026': {
    cover: mediaLibrary.amandierCover,
    gallery: [mediaLibrary.amandierStage, mediaLibrary.amandierAudience],
  },
  'festival-souissi-rabat-2025': {
    cover: mediaLibrary.souissiVideo,
    gallery: [],
  },
  'moussem-tan-tan': {
    cover: mediaLibrary.tanTanCover,
    gallery: [mediaLibrary.tanTanStage, mediaLibrary.tanTanPerformer, mediaLibrary.tanTanFlag],
  },
};

export const teamMedia = {
  primary: mediaLibrary.teamPrimary,
  supporting: [mediaLibrary.teamSound, mediaLibrary.teamLighting, mediaLibrary.teamOperation],
};

export const equipmentMedia = {
  primary: mediaLibrary.teamLighting,
  caption: 'Régie technique pendant un événement',
};

export const serviceMedia = {
  production: {
    media: mediaLibrary.teamOperation,
    caption: 'Opération technique pendant un événement',
  },
  sound: {
    media: mediaLibrary.teamSound,
    caption: 'Régie son pendant un événement',
  },
  lighting: {
    media: mediaLibrary.amandierCover,
    caption: 'Scène du Festival de l’Amandier à Tafraout',
  },
  led: {
    media: mediaLibrary.amandierStage,
    caption: 'Scène et écran au Festival de l’Amandier à Tafraout',
  },
};

export const heroMedia = {
  video: mediaLibrary.souissiVideo,
  poster: mediaLibrary.amandierCover,
  videoPresets: {
    mobile: 'heroMobile',
    desktop: 'heroDesktop',
  },
};
