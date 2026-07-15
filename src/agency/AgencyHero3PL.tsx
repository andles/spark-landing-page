import { useState, useEffect, useRef, useCallback } from "react";
import DashboardMockup from "./dashboard/DashboardMockup";
import BookACallButton from "./BookACallButton";

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

export default function AgencyHero3PL() {
  // "video" → playing | "fading" → cross-fading out | "done" → mockup + play btn
  const [phase, setPhase] = useState<"video" | "fading" | "done">("video");
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const remaining = Math.max(0, duration - currentTime);

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
    setPhase("video");
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
    <section className="relative min-h-screen bg-[#06080d]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#06080d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm text-[#b8bfcc] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            AI-Powered Inventory Platform
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-100 text-[2.4rem] sm:text-5xl lg:text-[5rem] font-bold leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            <span className="text-[#f0f2f5]">The tech-enabled 3PL</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              wins the next decade.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Give your clients AI demand forecasting, real-time visibility, and a self-serve portal under your brand. The capability that's beating commodity warehouses.
          </p>

          {/* CTA row */}
          <div className="animate-fade-up delay-300 mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.sparkinventory.com/sign-up"
              className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center"
            >
              Start Free Trial
            </a>
            <BookACallButton className="h-[46px] px-8 rounded-full glass border border-white/15 text-[#f0f2f5] font-semibold text-base hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center" />
          </div>
        </div>

        {/* ── Hero visual ─────────────────────────────────────────────────── */}
        <div className="dash-parallax mt-10 lg:mt-14 max-w-[1100px] mx-auto w-full hidden sm:block">
          <div className="dash-enter relative w-full">

            {/* Dashboard mockup — always in the DOM so the container has height.
                Invisible while video is playing, fades in as video ends. */}
            <div className={`transition-opacity duration-700 ${phase === "video" ? "opacity-0" : "opacity-100"}`}>
              <DashboardMockup />
            </div>

            {/* Play button — centered overlay shown only after video finishes */}
            {phase === "done" && (
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
                Always mounted (so play/pause is instant), hidden when done. */}
            <div
              className={`absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-700 ${
                phase === "done"
                  ? "opacity-0 pointer-events-none"
                  : phase === "fading"
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            >
              <video
                ref={videoRef}
                src={HERO_VIDEO_SRC}
                autoPlay
                muted
                playsInline
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

              {/* Controls — gradient scrim + progress bar + time + mute */}
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
                  {/* Scrubber knob — appears on hover */}
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
            </div>
            {/* ── end video + controls ────────────────────────────────────── */}

          </div>
        </div>
        {/* ── end hero visual ─────────────────────────────────────────────── */}

      </div>
    </section>
  );
}
