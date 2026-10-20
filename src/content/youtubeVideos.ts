// Spark's YouTube videos and the page each one is embedded on.
//
// One source of truth for both the on-page embed (YouTubeEmbed) and the
// VideoObject structured data (schemaGraph.ts). A video with an empty
// youtubeId renders nothing and adds no schema, so a slot can be wired to its
// page before the video URL is known.

export type YouTubeVideoKey =
  | 'quickbooks'
  | 'demand'
  | 'textWithSparki'
  | 'threePL'
  | 'wholesale'
  | 'customerReturns'
  | 'foundations';

export interface YouTubeVideo {
  /** 11 character id from the watch URL (youtube.com/watch?v=<id>). */
  youtubeId: string;
  /** Route path the video is embedded on, matching routeMeta. */
  pagePath: string;
  /** Video title as published on YouTube. */
  name: string;
  /** Video description as published on YouTube. */
  description: string;
  /** Publish date on YouTube (YYYY-MM-DD). */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT2M30S. */
  duration?: string;
}

export const youtubeVideos: Record<YouTubeVideoKey, YouTubeVideo[]> = {
  quickbooks: [
    { youtubeId: '', pagePath: '/features/accounting', name: '', description: '', uploadDate: '' },
  ],
  demand: [
    { youtubeId: '', pagePath: '/reduce-stockouts-overstock', name: '', description: '', uploadDate: '' },
  ],
  textWithSparki: [
    { youtubeId: '', pagePath: '/text-with-sparki', name: '', description: '', uploadDate: '' },
  ],
  threePL: [
    { youtubeId: '', pagePath: '/3pl', name: '', description: '', uploadDate: '' },
  ],
  wholesale: [
    { youtubeId: '', pagePath: '/features/wholesale-suppliers', name: '', description: '', uploadDate: '' },
  ],
  customerReturns: [
    { youtubeId: '', pagePath: '/features/sales', name: '', description: '', uploadDate: '' },
  ],
  foundations: [
    { youtubeId: '', pagePath: '/', name: '', description: '', uploadDate: '' },
  ],
};

export function publishedVideos(key: YouTubeVideoKey) {
  return youtubeVideos[key].filter((video) => video.youtubeId);
}

export function youtubeThumbnailUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}

// VideoObject nodes for every published YouTube video on a route. The first
// keeps the plain #video id other pages use; later ones are numbered. Pages
// that already describe a self-hosted video pass offset 1 so ids stay unique.
export function buildYouTubeVideoSchema(siteUrl: string, routePath: string, offset = 0) {
  const pageUrl = routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}/`;
  return Object.values(youtubeVideos)
    .flat()
    .filter((video) => video.youtubeId && video.pagePath === routePath)
    .map((video, index) => {
      const position = index + offset;
      return {
        '@type': 'VideoObject',
        '@id': `${pageUrl}#video${position === 0 ? '' : `-${position + 1}`}`,
        name: video.name,
        description: video.description,
        thumbnailUrl: [youtubeThumbnailUrl(video.youtubeId)],
        embedUrl: youtubeEmbedUrl(video.youtubeId),
        url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        uploadDate: video.uploadDate,
        ...(video.duration ? { duration: video.duration } : {}),
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#organization` },
        isPartOf: { '@id': `${pageUrl}#webpage` },
      };
    });
}
