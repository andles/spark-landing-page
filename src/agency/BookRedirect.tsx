import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// /book-a-call — conversion-tracking interstitial.
//
// The "Book a Call" CTA points here instead of straight to Calendly. This page
// fires a Google Ads conversion, then forwards the prospect to Calendly. Because
// every click lands on this single URL first, it's an easy, reliable place to
// measure "Book a Call" conversions.
// ─────────────────────────────────────────────────────────────────────────────

// Where prospects ultimately land.
const CALENDLY_URL = "https://calendly.com/jason-sparkinventory/30min";

// Google Ads conversion "send_to". The account tag (AW-17962279599) is already
// loaded globally in index.html — you only need to add the conversion LABEL:
//
//   Google Ads → Goals → Conversions → New conversion action → Website
//   → create an action for "Book a Call" → copy its conversion label
//     (looks like "AbC-D_efGhIjK12345")
//   → set the value below to  "AW-17962279599/AbC-D_efGhIjK12345"
//
// Until you replace the label, the redirect still works; the conversion just
// won't register in Google Ads.
const CONVERSION_SEND_TO = "AW-17962279599/REPLACE_WITH_CONVERSION_LABEL";

type Gtag = (...args: unknown[]) => void;

export default function BookRedirect() {
  useEffect(() => {
    let redirected = false;
    const go = () => {
      if (redirected) return;
      redirected = true;
      // replace() so this interstitial isn't left in the back-button history.
      window.location.replace(CALENDLY_URL);
    };

    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") {
      // event_callback forwards to Calendly as soon as the hit is recorded.
      gtag("event", "conversion", {
        send_to: CONVERSION_SEND_TO,
        event_callback: go,
      });
    }

    // Fallback: forward anyway if gtag is blocked, slow, or never calls back.
    const fallback = setTimeout(go, 1500);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080d] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-10 h-10 rounded-full border-2 border-white/15 border-t-cyan-400 animate-spin mb-6" />
      <p
        className="text-[#f0f2f5] text-lg font-semibold"
        style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
      >
        Taking you to our booking calendar…
      </p>
      <p className="text-[#b8bfcc] text-sm mt-2">
        Not redirected?{" "}
        <a href={CALENDLY_URL} className="text-cyan-400 hover:text-cyan-300 transition-colors">
          Click here
        </a>
        .
      </p>
    </div>
  );
}
