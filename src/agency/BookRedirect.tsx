import { useEffect } from "react";
import { CALENDLY_URL } from "./calendly";

// ─────────────────────────────────────────────────────────────────────────────
// /book-a-call — pure redirect to Calendly. It no longer fires a Google Ads
// conversion: conversions are now counted on /meeting-confirmed (the post-booking
// redirect), so a visit to this URL must not be counted as a conversion.
// ─────────────────────────────────────────────────────────────────────────────

export default function BookRedirect() {
  useEffect(() => {
    // replace() so this interstitial isn't left in the back-button history.
    window.location.replace(CALENDLY_URL);
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
