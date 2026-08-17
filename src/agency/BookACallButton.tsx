import { useEffect, useCallback } from "react";
import { CALENDLY_URL, ensureCalendlyAssets, openCalendlyPopup } from "./calendly";

// "Book a Call" CTA — opens the Calendly scheduler in a popup overlay instead of
// navigating away. The href stays the Calendly URL as a no-JS fallback. Shared
// across every landing page; pass the caller's own className to keep each
// button's styling. The Google Ads conversion is NOT fired here anymore: it
// fires on the /meeting-confirmed page that Calendly redirects to after an
// actual booking, so we count booked demos instead of clicks.
//
// `url` lets a campaign page pass a tagged scheduling link (e.g. with UTM
// params so the booking is attributable to that page). Defaults to the shared
// CALENDLY_URL, so existing callers are unaffected.
export default function BookACallButton({
  className,
  children = "Book a Call",
  url = CALENDLY_URL,
}: {
  className?: string;
  children?: React.ReactNode;
  url?: string;
}) {
  // Preload Calendly's popup assets so the scheduler opens instantly on click.
  useEffect(() => {
    ensureCalendlyAssets();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      openCalendlyPopup(url);
    },
    [url]
  );

  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
