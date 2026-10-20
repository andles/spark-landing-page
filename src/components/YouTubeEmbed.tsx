import { useState } from 'react';
import { Play } from 'lucide-react';
import {
  publishedVideos, youtubeEmbedUrl, youtubeThumbnailUrl, type YouTubeVideo, type YouTubeVideoKey,
} from '../content/youtubeVideos';

// Click-to-load facade: only a thumbnail image ships with the page. The
// YouTube player (and its scripts and cookies) loads when the visitor presses
// play, so the embed adds nothing to page speed until then.
function YouTubeFacade({ video }: { video: YouTubeVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.10] bg-[#090d15] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
        {playing ? (
          <iframe
            src={`${youtubeEmbedUrl(video.youtubeId)}?autoplay=1&rel=0&modestbranding=1`}
            title={video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.name}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={youtubeThumbnailUrl(video.youtubeId)}
              alt=""
              loading="lazy"
              decoding="async"
              width={480}
              height={360}
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 shadow-lg shadow-black/40 transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-white text-white" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 px-1 text-sm font-semibold text-white">{video.name.replace(/\s\|\sSpark Inventory$/, '')}</figcaption>
    </figure>
  );
}

/** Spark's YouTube video(s) for one topic, or nothing until a video id is set. */
export function YouTubeVideoSection({ videoKey, className = '' }: { videoKey: YouTubeVideoKey; className?: string }) {
  const videos = publishedVideos(videoKey);
  if (videos.length === 0) return null;

  return (
    <section className={`relative bg-[#06080d] px-6 py-12 md:px-8 lg:py-16 ${className}`}>
      <div className={`mx-auto grid gap-8 ${videos.length > 1 ? 'max-w-[1180px] md:grid-cols-2' : 'max-w-[900px]'}`}>
        {videos.map((video) => <YouTubeFacade key={video.youtubeId} video={video} />)}
      </div>
    </section>
  );
}
