import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(opts: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: opts.threshold ?? 0.12, rootMargin: opts.rootMargin ?? "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView] as const;
}

export function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}
