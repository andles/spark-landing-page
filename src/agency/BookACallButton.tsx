import { useEffect, useCallback } from "react";
import { CALENDLY_URL, ensureCalendlyAssets, fireBookACallConversion, openCalendlyPopup } from "./calendly";

// "Book a Call" CTA — opens the Calendly scheduler in a popup overlay and fires
// the Google Ads conversion on click, instead of navigating away. The href stays
// the Calendly URL as a no-JS fallback. Shared across every landing page so all
// Book a Call buttons behave identically; pass the caller's own className to keep
// each button's existing styling.
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
    fireBookACallConversion();
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
