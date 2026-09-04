import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, DatabaseZap } from "lucide-react";
import { ensureCalendlyAssets } from "../calendly";
import { useCtaLinks } from "./links";
import { FISHBOWL_BOOKING_INTENT_EVENT } from "./FishbowlBookLink";

const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "li_fat_id",
];

type CalendlyInlineGlobal = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    resize?: boolean;
  }) => void;
};

function calendlyGlobal(): CalendlyInlineGlobal | undefined {
  return (window as unknown as { Calendly?: CalendlyInlineGlobal }).Calendly;
}

function buildConfirmationUrl(): string {
  const confirmation = new URL("/meeting-confirmed", window.location.origin);
  const current = new URLSearchParams(window.location.search);

  confirmation.searchParams.set("source", "fishbowl_lp");
  for (const key of ATTRIBUTION_PARAMS) {
    const value = current.get(key) || sessionStorage.getItem(`spark:${key}`);
    if (value) confirmation.searchParams.set(key, value);
  }

  return confirmation.toString();
}

export default function FishbowlBooking() {
  const { bookUrl } = useCtaLinks();
  const widgetRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) sessionStorage.setItem(`spark:${key}`, value);
    }
  }, []);

  useEffect(() => {
    const loadFromIntent = () => setShouldLoad(true);
    window.addEventListener(FISHBOWL_BOOKING_INTENT_EVENT, loadFromIntent);

    return () => {
      window.removeEventListener(FISHBOWL_BOOKING_INTENT_EVENT, loadFromIntent);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || initializedRef.current || !widgetRef.current) return;

    ensureCalendlyAssets();
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const calendly = calendlyGlobal();
      if (calendly?.initInlineWidget && widgetRef.current) {
        window.clearInterval(timer);
        initializedRef.current = true;
        calendly.initInlineWidget({
          url: bookUrl,
          parentElement: widgetRef.current,
          resize: true,
        });
        setIsInitialized(true);
      } else if (attempts >= 120) {
        window.clearInterval(timer);
        setLoadFailed(true);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [bookUrl, shouldLoad]);

  useEffect(() => {
    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") {
        window.location.assign(buildConfirmationUrl());
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  return (
    <section
      id="book"
      className="relative scroll-mt-16 overflow-hidden border-y border-white/[0.07] bg-[#080b12] py-14 lg:py-20"
      aria-labelledby="fishbowl-booking-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_52%_at_25%_40%,rgba(6,182,212,0.09),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-8 px-6 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12 lg:px-12">
        <div className="lg:sticky lg:top-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3.5 py-1.5 text-xs font-semibold text-cyan-200">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Working session
          </div>
          <h2 id="fishbowl-booking-title" className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[3.1rem]">
            Book 20 minutes.
            <span className="mt-1 block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Bring your inventory.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#aeb7c7]">
            No deck and no generic tour. We will look at your Fishbowl setup, your data, and the decisions Spark can make clearer.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "Your Fishbowl workflow, not a sample company",
              "A clear path from database backup to forecast",
              "No commitment required to compare the two",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#c9cfda]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10">
                  <Check className="h-3 w-3 text-emerald-300" aria-hidden="true" />
                </span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-200">
              <DatabaseZap className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xs leading-5 text-[#8f99aa]">
              Have a database backup ready? Great. If not, we can still map the next step together.
            </p>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[24px] border border-white/[0.10] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
          <div className="relative min-h-[690px] w-full bg-white" aria-label="Schedule a working session with Spark">
            <div ref={widgetRef} className="absolute inset-0" />
            {!shouldLoad && (
              <button
                type="button"
                onClick={() => setShouldLoad(true)}
                className="absolute inset-0 flex w-full flex-col items-center justify-center gap-4 bg-[#f7f9fc] px-8 text-center text-[#101522]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1020] text-cyan-300 shadow-xl">
                  <CalendarDays className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-lg font-semibold">Load available times</span>
                <span className="max-w-sm text-sm leading-6 text-[#5b6473]">The scheduler loads only when you are ready, keeping the landing page fast.</span>
              </button>
            )}
            {shouldLoad && !isInitialized && !loadFailed && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f7f9fc] text-sm font-medium text-[#5b6473]">
                Loading available times...
              </div>
            )}
            {loadFailed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f7f9fc] px-8 text-center">
                <p className="text-sm text-[#5b6473]">The inline calendar could not load.</p>
                <a href={bookUrl} className="rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white">
                  Open the booking calendar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
