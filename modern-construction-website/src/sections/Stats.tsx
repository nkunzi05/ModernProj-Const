import { STATS, type Stat } from "../data/site";
import { useCountUp, useInView } from "../lib/hooks";
import { Container, Eyebrow } from "../components/ui";

function Figure({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = useCountUp(stat.value, inView);
  return (
    <div ref={ref} className="border-t border-paper/25 pt-6">
      <p className="font-display text-[clamp(3.12rem,7.02vw,6.63rem)] leading-[0.9]">
        {stat.prefix}
        {n.toLocaleString("en-US")}
        {stat.suffix}
      </p>
      <p className="mt-4 type-label text-paper/65">{stat.label}</p>
    </div>
  );
}

/** Renders only when verified statistics exist in src/data/site.ts. */
export function Stats() {
  if (STATS.length === 0) return null;
  return (
    <section aria-labelledby="stats-title" className="bg-ink py-24 text-paper md:py-36">
      <Container>
        <Eyebrow className="text-paper/60">In numbers</Eyebrow>
        <h2 id="stats-title" className="mt-6 max-w-[14ch] type-display-md leading-[0.95]">
          The work, <em className="text-brand-bright">counted.</em>
        </h2>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Figure key={s.label} stat={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
