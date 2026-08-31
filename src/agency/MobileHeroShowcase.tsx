// ─────────────────────────────────────────────────────────────────────────────
// Mobile (< sm) hero visual, shared by the hero variants that use HeroVideoShowcase.
//
// The shared HeroVideoShowcase is hidden below `sm` and never mounts its
// <video> there, because autoplaying a product demo on a phone can consume
// data before the visitor asks for it. This component fills that gap on mobile:
//   1. a 16:9 tap-to-play video (poster frame, preload="none", so nothing
//      downloads until the visitor taps), then
//   2. the same DashboardMockup the desktop page shows, which already
//      collapses to a single column below `lg`.
//
// Mounting rules matter here. DashboardMockup's chart paints its bars and
// trend line with SVG gradients referenced by id (url(#ag-barGrad) etc.), and
// url(#id) resolves to the FIRST element with that id in the document. If two
// mockups are in the DOM, whichever comes first wins, and if that one is
// display:none the gradient paints nothing. So this component:
//   - only mounts below `sm` (decided in an effect, so the prerendered HTML
//     and the first client render agree), and
//   - must be rendered BEFORE HeroVideoShowcase in the hero, so on mobile its
//     visible gradients are the ones that resolve.
// On sm+ it renders nothing, and the shared showcase is the only mockup.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useState, useEffect, useCallback } from "react";
import DashboardMockup from "./dashboard/DashboardMockup";

const HERO_VIDEO_POSTER = "/hero-video-poster-mobile.webp";

export default function MobileHeroShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    // Post-mount on purpose: matchMedia is client-only and the prerendered
    // markup must match the first client render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => setStarted(false));
  }, []);

  if (!isMobile) return null;

  return (
    <div className="sm:hidden mt-8 w-full space-y-6">
      {/* Tap-to-play demo video */}
      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c1019] aspect-video">
        <video
          ref={videoRef}
          poster={HERO_VIDEO_POSTER}
          preload="none"
          playsInline
          controls={started}
          onEnded={() => setStarted(false)}
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play demo video"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 active:bg-black/40 transition-colors"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-black/50 border border-white/25 backdrop-blur-sm">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-white text-xs font-semibold tracking-wide drop-shadow">
              Watch the 75 second demo
            </span>
          </button>
        )}
      </div>

      {/* Dashboard mockup. Below lg it already stacks to one column; on a phone
          that makes it ~1300px tall, so the bottom row (invoices, top sellers,
          velocity changes) is hidden here and the visitor sees the stats bar,
          the sales chart, and the reorder recommendations. */}
      <div className="relative [&_.dash-bottom]:hidden">
        <DashboardMockup />
      </div>
    </div>
  );
}
