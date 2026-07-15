import { useEffect, useMemo } from "react";
import AgencyTrustBar from "./AgencyTrustBar";

// ─────────────────────────────────────────────────────────────────────────────
// /meeting-confirmed — shared demo confirmation page.
//
// Every variant's Calendly booking redirects here. The Google Ads conversion is
// a URL-based action in Google Ads that fires off the base tag's page view on
// this URL, so there is intentionally no gtag('event','conversion') snippet in
// this component (that would double-count).
//
// If Calendly is set to "Pass event details to your redirect", it appends
// invitee_full_name + event_start_time (and more) to the URL, which we use to
// personalize the page. Everything degrades gracefully on a direct visit.
// ─────────────────────────────────────────────────────────────────────────────

function useBookingDetails() {
  return useMemo(() => {
    const empty = { firstName: "", dateLabel: "", timeLabel: "" };
    if (typeof window === "undefined") return empty;

    const params = new URLSearchParams(window.location.search);

    const fullName = (params.get("invitee_full_name") || "").trim();
    const firstName = fullName ? fullName.split(/\s+/)[0].slice(0, 40) : "";

    let dateLabel = "";
    let timeLabel = "";
    const startRaw = params.get("event_start_time") || "";
    if (startRaw) {
      const start = new Date(startRaw);
      if (!isNaN(start.getTime())) {
        dateLabel = start.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        timeLabel = start.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        });
      }
    }

    return { firstName, dateLabel, timeLabel };
  }, []);
}

const COVER_POINTS = [
  "A quick look at how you manage inventory today, so we tailor the rest of the call to your setup.",
  "AI demand forecasting and automated reordering, the part that helps you hold less overstock and stop selling out of your best products.",
  "Real-time visibility across every channel you sell on, connecting Shopify, Amazon, and your accounting in one place.",
  "The workflows that fit how you operate, whether that is in-store pickup, wholesale, or FBA.",
];

const PREP_POINTS = [
  "Have a sense of the tools you use now, like Shopify, Amazon, QuickBooks, or spreadsheets.",
  "Think about your biggest headache, whether that is stockouts, overstock, or the time purchasing takes.",
  "A rough idea of your scale helps, like how many products or locations you manage. Estimates are fine.",
];

export default function MeetingConfirmedPage() {
  const { firstName, dateLabel, timeLabel } = useBookingDetails();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = "Demo confirmed | Spark Inventory";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06080d] flex flex-col">
      {/* Background layers — same as the hero, so the page feels native */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      {/* Minimal header — logo only, no nav or secondary CTAs, to keep focus */}
      <header className="relative z-10">
        <div className="max-w-[720px] mx-auto px-6 h-16 flex items-center">
          <a
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <img src="/spark_icon.png" alt="" className="w-8 h-8" />
            <span className="font-bold text-white text-base tracking-tight">Spark Inventory</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[720px] mx-auto px-6 pt-8 pb-16">
        {/* 1. Confirmation headline */}
        <div className="animate-fade-up text-center">
          <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#f0f2f5] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            {firstName ? `You're booked, ${firstName}` : "You're booked"}
          </h1>
          <p className="mt-3 text-[#b8bfcc] text-base sm:text-lg leading-relaxed">
            Your Spark in-store pickup demo is confirmed. Here is what happens next.
          </p>
        </div>

        {/* 2. Meeting details */}
        <section aria-labelledby="details-heading" className="animate-fade-up delay-100 mt-8 glass rounded-2xl p-6 sm:p-7">
          <h2 id="details-heading" className="sr-only">Meeting details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <dt className="text-[#8b95a8] text-xs font-medium uppercase tracking-wider mb-1.5">Date</dt>
              <dd className="text-[#f0f2f5] text-sm font-semibold">{dateLabel || "See your email"}</dd>
            </div>
            <div>
              <dt className="text-[#8b95a8] text-xs font-medium uppercase tracking-wider mb-1.5">Time</dt>
              <dd className="text-[#f0f2f5] text-sm font-semibold">{timeLabel || "See your email"}</dd>
            </div>
            <div>
              <dt className="text-[#8b95a8] text-xs font-medium uppercase tracking-wider mb-1.5">Duration</dt>
              <dd className="text-[#f0f2f5] text-sm font-semibold">30 minutes</dd>
            </div>
          </dl>
          <p className="mt-5 pt-5 border-t border-white/[0.08] text-[#b8bfcc] text-sm leading-relaxed">
            Your video call link and calendar invite are already in your inbox. If you do not see them, check your spam folder.
          </p>
        </section>

        {/* 3. What we will cover */}
        <section aria-labelledby="cover-heading" className="animate-fade-up delay-200 mt-10">
          <h2
            id="cover-heading"
            className="text-xl font-bold text-[#f0f2f5] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            What we will cover
          </h2>
          <ul className="mt-4 space-y-3">
            {COVER_POINTS.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-400/25 text-cyan-400 text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. How to prepare */}
        <section aria-labelledby="prep-heading" className="animate-fade-up delay-300 mt-10">
          <h2
            id="prep-heading"
            className="text-xl font-bold text-[#f0f2f5] tracking-tight"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            How to prepare
          </h2>
          <ul className="mt-4 space-y-3">
            {PREP_POINTS.map((point, i) => (
              <li key={i} className="flex gap-3">
                <svg className="shrink-0 mt-1 w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#b8bfcc] text-sm sm:text-base leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Reschedule / cancel */}
        <p className="animate-fade-up delay-300 mt-10 text-[#8b95a8] text-sm leading-relaxed">
          Need a different time? Use the reschedule or cancel links in your confirmation email. It takes a few seconds and you keep the same team.
        </p>
      </main>

      {/* 6. Light social proof — reuse the existing logo strip */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <AgencyTrustBar />
      </div>

      {/* Slim footer — only what is needed */}
      <footer className="relative z-10 border-t border-white/[0.06] py-6">
        <div className="max-w-[720px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8b95a8] text-xs">&copy; 2026 Spark Inventory. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="text-[#8b95a8] text-xs hover:text-white transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">Privacy</a>
            <a href="/support" className="text-[#8b95a8] text-xs hover:text-white transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
