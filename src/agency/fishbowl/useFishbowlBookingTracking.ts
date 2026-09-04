import { useEffect } from "react";

const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "li_fat_id",
];

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

export function useFishbowlBookingTracking() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) sessionStorage.setItem(`spark:${key}`, value);
    }
  }, []);

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
}
