import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

export function useCountUp(
  end: number,
  duration: number,
  active: boolean,
  options: CountUpOptions = {}
) {
  const { decimals = 0, prefix = "", suffix = "", separator = "," } = options;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, end, duration]);

  const formatted = value.toFixed(decimals);
  const [intPart, decPart] = formatted.split(".");
  const withSeparator = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const display = decPart ? `${withSeparator}.${decPart}` : withSeparator;

  return `${prefix}${display}${suffix}`;
}
