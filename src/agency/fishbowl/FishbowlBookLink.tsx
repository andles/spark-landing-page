import { useCallback, type ReactNode } from "react";
import {
  ensureCalendlyAssets,
  isCalendlyReady,
  openCalendlyPopup,
} from "../calendly";
import { useCtaLinks } from "./links";

export default function FishbowlBookLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { bookUrl } = useCtaLinks();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    ensureCalendlyAssets();

    if (isCalendlyReady()) {
      openCalendlyPopup(bookUrl);
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (isCalendlyReady()) {
        window.clearInterval(timer);
        openCalendlyPopup(bookUrl);
      } else if (attempts >= 60) {
        window.clearInterval(timer);
        window.location.assign(bookUrl);
      }
    }, 50);
  }, [bookUrl]);

  return (
    <a
      href={bookUrl}
      onClick={handleClick}
      onPointerEnter={ensureCalendlyAssets}
      onFocus={ensureCalendlyAssets}
      onTouchStart={ensureCalendlyAssets}
      aria-haspopup="dialog"
      className={className}
    >
      {children}
    </a>
  );
}
