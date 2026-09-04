import type { ReactNode } from "react";

export const FISHBOWL_BOOKING_INTENT_EVENT = "spark:fishbowl-booking-intent";

export default function FishbowlBookLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    window.dispatchEvent(new Event(FISHBOWL_BOOKING_INTENT_EVENT));
  };

  return (
    <a href="#book" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
