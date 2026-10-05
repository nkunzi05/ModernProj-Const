import { useEffect, useRef, useState } from "react";
import { PROCESS } from "../data/site";
import { Container, Eyebrow, Img, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-42% 0px -48% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="process-title" className="bg-paper py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow className="text-smoke">Our process</Eyebrow>
                <h2 id="process-title" className="mt-6 type-display-lg leading-[0.92]">
                  From first brief to <em className="text-brand">final build.</em>
                </h2>
                <p className="mt-6 max-w-sm text-lg text-smoke">
                  Five clear stages, so you always know what has been decided and what happens next.
                </p>
              </Reveal>

              {/* desktop: image follows the active stage */}
              <div className="relative mt-10 hidden aspect-[4/4.4] overflow-hidden bg-sand lg:block">
                {PROCESS.map((s, i) => (
                  <div
                    key={s.n}
                    className={cn(
                      "absolute inset-0 transition-all duration-[900ms] ease-out",
                      active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    )}
                  >
                    <Img photo={s.photo} sizes="40vw" widths={[600, 900, 1200]} />
                  </div>
                ))}
                <div className="absolute bottom-0 left-0 bg-paper px-5 py-3 type-label">
                  {PROCESS[active].n} / 0{PROCESS.length}
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            {/* progress rail */}
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-ink/15">
              <div
                className="w-full bg-brand transition-[height] duration-700 ease-out"
                style={{ height: `${((active + 1) / PROCESS.length) * 100}%` }}
              />
            </div>

            <ol className="pl-6 md:pl-12">
              {PROCESS.map((s, i) => (
                <li
                  key={s.n}
                  data-index={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="border-b border-ink/10 py-10 last:border-b-0 md:py-14 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center"
                >
                  <Reveal>
                    <div className="flex items-start gap-6 md:gap-10">
                      <span
                        className={cn(
                          "font-display text-[4.5rem] font-bold leading-[0.8] tracking-[-0.04em] transition-colors duration-700 md:text-[7.5rem]",
                          active === i ? "text-brand" : "text-bone"
                        )}
                      >
                        {s.n}
                      </span>
                      <div className="pt-1 md:pt-4">
                        <h3 className="text-2xl uppercase leading-tight tracking-[0.02em] md:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-4 max-w-md text-lg leading-snug">{s.lead}</p>
                        <p className="mt-3 max-w-md text-smoke">{s.text}</p>
                      </div>
                    </div>
                    <div className="mt-8 aspect-[16/10] overflow-hidden bg-sand lg:hidden">
                      <Img photo={s.photo} sizes="100vw" widths={[480, 800, 1200]} />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
