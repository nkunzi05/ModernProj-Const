import { useState, type CSSProperties } from "react";
import { SERVICES, type Service } from "../data/site";
import { Arrow, Button, Container, Eyebrow, Img, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

function Detail({ s }: { s: Service }) {
  return (
    <div className="fade-up" style={{ "--d": "0ms" } as CSSProperties}>
      <p className="max-w-lg text-lg leading-relaxed">{s.description}</p>
      <h4 className="mt-8 type-label text-smoke">
        Typical applications
      </h4>
      <ul className="mt-3 max-w-lg divide-y divide-ink/10 border-y border-ink/10">
        {s.applications.map((a) => (
          <li key={a} className="py-3">
            {a}
          </li>
        ))}
      </ul>
      <Button to={`/contact?service=${encodeURIComponent(s.name)}`} className="mt-8">
        Discuss this service
      </Button>
    </div>
  );
}

export function Services({ asPage = false }: { asPage?: boolean }) {
  const [i, setI] = useState(0);
  const current = SERVICES[i];

  return (
    <section aria-labelledby="services-title" className="bg-sand py-24 md:py-36">
      <Container>
        {!asPage && (
          <Reveal className="mb-14 grid items-end gap-8 md:mb-20 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className="text-smoke">Services</Eyebrow>
              <h2 id="services-title" className="mt-6 type-display-lg leading-[0.92]">
                What we <em className="text-brand">do</em>
              </h2>
            </div>
            <p className="text-lg text-smoke md:col-span-4">
              Select a service to see what it covers and where it is typically used.
            </p>
          </Reveal>
        )}
        {asPage && <h2 id="services-title" className="sr-only">All services</h2>}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="border-b border-ink/20 lg:col-span-7">
            {SERVICES.map((s, idx) => {
              const on = idx === i;
              return (
                <li key={s.slug} className="border-t border-ink/20">
                  <button
                    type="button"
                    onClick={() => setI(idx)}
                    onMouseEnter={() => window.matchMedia("(min-width:1024px) and (hover:hover)").matches && setI(idx)}
                    aria-expanded={on}
                    aria-controls={`svc-${s.slug}`}
                    className="group flex min-h-[72px] w-full items-baseline gap-5 py-5 text-left md:gap-8 md:py-6"
                  >
                    <span className="type-label w-7 shrink-0 text-smoke">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[1.6rem] font-semibold leading-[1.1] transition-all duration-500 md:text-[2.4rem]",
                        on ? "translate-x-1 text-ink" : "text-ink/45 group-hover:text-ink"
                      )}
                    >
                      {s.name}
                    </span>
                    <Arrow
                      className={cn(
                        "self-center transition-all duration-500",
                        on ? "translate-x-0 opacity-100 max-lg:rotate-90" : "-translate-x-2 opacity-0"
                      )}
                    />
                  </button>

                  {/* mobile / tablet: inline accordion */}
                  <div
                    id={`svc-${s.slug}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-700 ease-out lg:hidden",
                      on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-10 pl-12 md:pl-[3.75rem]">
                        {on && (
                          <>
                            <div className="mb-6 aspect-[16/10] overflow-hidden bg-bone">
                              <Img photo={s.photo} sizes="100vw" widths={[480, 800, 1200]} />
                            </div>
                            <p className="mb-5 font-display text-xl font-semibold text-brand">{s.blurb}</p>
                            <Detail s={s} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* desktop: sticky detail panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28" aria-live="polite">
              <div className="relative aspect-[4/4.2] overflow-hidden bg-bone">
                {SERVICES.map((s, idx) => (
                  <div
                    key={s.slug}
                    className={cn(
                      "absolute inset-0 transition-all duration-[800ms] ease-out",
                      idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    )}
                  >
                    <Img photo={s.photo} sizes="40vw" widths={[600, 900, 1200]} />
                  </div>
                ))}
              </div>
              <p className="mb-6 mt-6 font-display text-2xl font-semibold text-brand">{current.blurb}</p>
              <Detail key={current.slug} s={current} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
