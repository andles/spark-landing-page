import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function RevealItem({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`scroll-reveal-item${className ? ` ${className}` : ""}`}
      style={{ "--item-index": index } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default function ScrollReveal({
  children,
  className,
  delay,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: Record<string, string | number> = {};
  if (staggerChildren) {
    style["--stagger-delay"] = `${staggerChildren}ms`;
  }

  if (staggerChildren) {
    return (
      <div
        ref={ref}
        className={`scroll-reveal-parent${revealed ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal-item${revealed ? " is-revealed-solo" : ""}${className ? ` ${className}` : ""}`}
      style={delay !== undefined ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
