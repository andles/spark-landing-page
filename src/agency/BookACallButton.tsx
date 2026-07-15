import { useEffect, useCallback } from "react";
import { CALENDLY_URL, ensureCalendlyAssets, openCalendlyPopup } from "./calendly";

// "Book a Call" CTA — opens the Calendly scheduler in a popup overlay instead of
// navigating away. The href stays the Calendly URL as a no-JS fallback. Shared
// across every landing page; pass the caller's own className to keep each
// button's styling. The Google Ads conversion is NOT fired here anymore: it
// fires on the /meeting-confirmed page that Calendly redirects to after an
// actual booking, so we count booked demos instead of clicks.
export default function BookACallButton({
  className,
  children = "Book a Call",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  // Preload Calendly's popup assets so the scheduler opens instantly on click.
  useEffect(() => {
    ensureCalendlyAssets();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCalendlyPopup();
  }, []);

  return (
    <a
      href={CALENDLY_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
