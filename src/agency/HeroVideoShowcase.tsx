// ─────────────────────────────────────────────────────────────────────────────
// Shared hero visual: dashboard mockup + autoplay demo video with custom
// controls. Extracted from the four Agency hero variants, which duplicated
// this block verbatim.
//
// Loading behavior:
// - The mockup is visible immediately and stays visible until the video has
//   actually started playing (onPlaying), so a slow video download never
//   shows as an empty black box.
// - The <video> is only mounted on `sm`+ viewports once the showcase is near
//   the viewport. This keeps the demo from competing with the critical page
//   load while preserving autoplay when a visitor reaches it.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from "react";
import DashboardMockup from "./dashboard/DashboardMockup";

const HERO_VIDEO_SRC = "/hero-video.mp4";

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// Mute icon
function IconMuted() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  );
}

// Sound icon
function IconSound() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728" />
    </svg>
  );
}

export default function HeroVideoShowcase() {
  // "loading" → video mounted, buffering (mockup shows) | "video" → playing |
  // "fading" → cross-fading back to mockup | "done" → mockup + replay btn
  const [phase, setPhase] = useState<"loading" | "video" | "fading" | "done">("loading");
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Decided in an effect so a prerendered page and the first client render
  // agree (no hydration mismatch).
  const [mountVideo, setMountVideo] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const remaining = Math.max(0, duration - currentTime);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 640px)").matches) {
      const frame = window.requestAnimationFrame(() => setPhase("done"));
      return () => window.cancelAnimationFrame(frame);
    }

    const showcase = showcaseRef.current;
    if (!showcase || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setMountVideo(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMountVideo(true);
        observer.disconnect();
      },
      // Do not start the download merely because the top edge peeks into a
      // tall desktop viewport. Wait until the visitor is moving toward it.
      { rootMargin: "0px 0px -35% 0px" }
    );

    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  // "fading" → "done" after transition completes
  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("done"), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Pause video when done to stop background resource use
  useEffect(() => {
    if (phase === "done") videoRef.current?.pause();
  }, [phase]);

  // React's `muted` prop doesn't reliably update via re-render; sync directly
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const handleReplay = useCallback(() => {
    if (!videoRef.current) return;
    setPhase("loading");
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || duration <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      videoRef.current.currentTime = pct * duration;
    },
    [duration]
  );

  return (
    <div ref={showcaseRef} className="dash-parallax mt-10 lg:mt-14 max-w-[1100px] mx-auto w-full hidden sm:block">
      <div className="dash-enter relative w-full">

        {/* Dashboard mockup: always in the DOM so the container has height.
            Visible until the video actually plays, fades back in as it ends. */}
        <div className={`transition-opacity duration-700 ${phase === "video" ? "opacity-0" : "opacity-100"}`}>
          <DashboardMockup />
        </div>

        {/* Play button: centered overlay shown only after video finishes */}
        {phase === "done" && mountVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleReplay}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm hover:bg-black/60 hover:scale-105 transition-all duration-200"
              aria-label="Replay video"
            >
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Video + controls ─────────────────────────────────────────
            Mounted on sm+ only; invisible until playback starts. */}
        {mountVideo && (
          <div
            className={`absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-700 ${
              phase === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <video
              ref={videoRef}
              src={HERO_VIDEO_SRC}
              autoPlay
              muted
              playsInline
              preload="metadata"
              onPlaying={() => setPhase((p) => (p === "loading" ? "video" : p))}
              onEnded={() => setPhase("fading")}
              onError={() => setPhase("done")}
              onTimeUpdate={() =>
                videoRef.current && setCurrentTime(videoRef.current.currentTime)
              }
              onLoadedMetadata={() =>
                videoRef.current && setDuration(videoRef.current.duration)
              }
              className="w-full h-full object-cover"
            />

            {/* Controls: gradient scrim + progress bar + time + mute */}
            {(phase === "video" || phase === "fading") && (
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-14 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none">

                {/* Progress bar */}
                <div
                  role="slider"
                  aria-label="Video progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  onClick={handleProgressClick}
                  className="group relative h-[3px] bg-white/20 rounded-full cursor-pointer mb-3 pointer-events-auto hover:h-1 transition-all duration-150"
                >
                  {/* Filled track */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Scrubber knob: appears on hover */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ left: `calc(${progress}% - 6px)` }}
                  />
                </div>

                {/* Time display + mute toggle */}
                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="text-white/60 text-[11px] font-mono tabular-nums select-none">
                    {formatTime(currentTime)}
                    <span className="mx-1 text-white/30">/</span>
                    <span className="text-white/40">-{formatTime(remaining)}</span>
                  </span>

                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors duration-200"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    <span className={muted ? "text-white/50" : "text-white"}>
                      {muted ? <IconMuted /> : <IconSound />}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* ── end video + controls ────────────────────────────────────── */}

      </div>
    </div>
  );
}
