import { PRINCIPLES } from "../data/site";
import { Container, Eyebrow, Reveal } from "../components/ui";

export function Why() {
  return (
    <section aria-labelledby="why-title" className="bg-brand py-24 text-paper md:py-40">
      <Container>
        <Reveal>
          <Eyebrow className="text-paper/70">Why work with us</Eyebrow>
        </Reveal>
        <h2
          id="why-title"
          className="mt-8 text-[clamp(2rem,7.2vw,7.25rem)] uppercase leading-[0.88] tracking-[-0.01em]"
        >
          <Reveal as="span" className="block">
            Built around
          </Reveal>
          <Reveal as="span" delay={120} className="block md:pl-[12vw]">
            Precision.
          </Reveal>
          <Reveal as="span" delay={240} className="block md:pl-[4vw]">
            Accountability.
          </Reveal>
          <Reveal as="span" delay={360} className="block md:pl-[20vw]">
            Value.
          </Reveal>
        </h2>

        <dl className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-32 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="border-t border-paper/40 pt-6">
              <p className="type-label text-paper/70">{p.n}</p>
              <dt className="mt-8 font-display text-2xl font-bold uppercase leading-none md:text-3xl">{p.title}</dt>
              <dd className="mt-4 max-w-[26ch] text-paper/85">{p.text}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
