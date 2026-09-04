import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { CalendarDays, Check } from "lucide-react";
import FishbowlBookLink from "./FishbowlBookLink";
import { useCtaLinks, BOOKING_CTA } from "./links";

type HeroCopy = {
  firstLine: string;
  secondLine: string;
  body: string;
};

const DEFAULT_COPY: HeroCopy = {
  firstLine: "Fishbowl tracks it.",
  secondLine: "Spark forecasts it.",
  body:
    "Drop in your database backup. Sparki maps your data and prepares the import. You review and approve, then see what to order and when.",
};

const CAPTERRA_COPY: HeroCopy = {
  firstLine: "Built around what Fishbowl",
  secondLine: "reviewers say is missing.",
  body:
    "We analyzed 449 public Fishbowl reviews. Support, reporting, integrations, and customization were recurring complaints. Spark was built to address all four.",
};

const ALONGSIDE_COPY: HeroCopy = {
  firstLine: "Keep Fishbowl.",
  secondLine: "Run Spark next to it.",
  body: DEFAULT_COPY.body,
};

const HERO_VARIANTS = { default: DEFAULT_COPY, alongside: ALONGSIDE_COPY, capterra: CAPTERRA_COPY };

export default function FishbowlHero() {
  const { signupUrl } = useCtaLinks();
  const { search } = useLocation();

  // The head selects the initial variant. Keep client-side navigation in sync
  // before paint without replacing prerendered headline text during hydration.
  useLayoutEffect(() => {
    const angle = new URLSearchParams(search).get("utm_content")?.toLowerCase();
    document.documentElement.dataset.fishbowlAngle =
      angle === "alongside" || angle === "capterra" ? angle : "default";
  }, [search]);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-[#06080d]">
      <div className="absolute inset-0 bg-[#06080d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_74%_56%_at_50%_-8%,rgba(6,182,212,0.15),transparent_64%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_38%_at_82%_62%,rgba(139,92,246,0.10),transparent_62%)]" />
      <div className="absolute inset-0 dot-grid opacity-70" />
      <div className="absolute inset-0 noise" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.045] px-3.5 py-1.5 text-xs text-[#b8bfcc] backdrop-blur-xl sm:px-4 sm:py-2 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            For teams running Fishbowl Inventory
          </div>

          <h1 className="animate-fade-up delay-100 mt-4 text-[2.35rem] font-bold leading-[1.02] tracking-[-0.035em] sm:mt-5 sm:text-5xl lg:text-[4.35rem]">
            {Object.entries(HERO_VARIANTS).map(([angle, copy]) => (
              <span key={angle} data-fishbowl-copy={angle}>
                <span className="text-[#f4f6f9]">{copy.firstLine}</span>
                <span className="mt-1 block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {copy.secondLine}
                </span>
              </span>
            ))}
          </h1>

          <h2 className="animate-fade-up delay-200 mx-auto mt-5 max-w-[710px] text-lg font-semibold leading-snug tracking-tight text-cyan-200 sm:mt-6 sm:text-2xl">
            Your Fishbowl backup. Your first Spark forecast.
          </h2>

          <p className="animate-fade-up delay-200 mx-auto mt-3 max-w-[710px] text-[0.86rem] leading-[1.55] text-[#afb7c5] sm:text-base sm:leading-7 lg:text-lg">
            {Object.entries(HERO_VARIANTS).map(([angle, copy]) => (
              <span key={angle} data-fishbowl-copy={angle}>{copy.body}</span>
            ))}
          </p>

          <p className="animate-fade-up delay-200 mx-auto mt-3 max-w-[710px] text-sm leading-6 text-[#d0d6e0] sm:text-base">
            Run alongside Fishbowl, free until your current contract ends.
          </p>

          <div className="animate-fade-up delay-300 mt-5 flex flex-col justify-center gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
            <a href={signupUrl} className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white shadow-[0_14px_50px_rgba(6,182,212,0.18)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_60px_rgba(139,92,246,0.24)] sm:text-base">
              Start Free
            </a>
            <FishbowlBookLink className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-7 text-sm font-semibold text-[#f0f2f5] backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.075] sm:text-base">
              {BOOKING_CTA}
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
            </FishbowlBookLink>
          </div>

          <p className="animate-fade-up delay-300 mx-auto mt-3 max-w-md text-xs leading-5 text-[#9da7b8] sm:text-sm">
            Bring your backup. Sparki handles the mapping. You approve the import.
          </p>

          <div className="animate-fade-up delay-300 mx-auto mt-5 hidden max-w-2xl items-center justify-center gap-5 text-xs text-[#8993a3] sm:flex">
            {["Fishbowl keeps running", "Database backup to forecast", "No commitment to compare"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
