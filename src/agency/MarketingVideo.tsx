type MarketingVideoProps = {
  mp4Src: string;
  webmSrc: string;
  posterSrc: string;
  captionsSrc: string;
  videoLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  className?: string;
};

export default function MarketingVideo({
  mp4Src,
  webmSrc,
  posterSrc,
  captionsSrc,
  videoLabel,
  eyebrow,
  title,
  summary,
  className = "",
}: MarketingVideoProps) {
  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.10] bg-[#090d15] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
        <video
          controls
          playsInline
          preload="none"
          poster={posterSrc}
          aria-label={videoLabel}
          className="h-full w-full object-cover"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
          <track
            kind="captions"
            src={captionsSrc}
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support embedded video.
        </video>
      </div>

      <figcaption className="mt-4 px-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
          {eyebrow}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[#8b95a8]">{summary}</p>
      </figcaption>
    </figure>
  );
}
