import { useState } from "react";
import { Link } from "../lib/router";
import { CATEGORIES } from "../data/site";
import { Arrow, Container, Eyebrow, Img, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

export function ProjectTypes() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="types-title" className="bg-paper py-24 md:py-36">
      <Container>
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <Eyebrow className="text-smoke">Project types</Eyebrow>
            <h2 id="types-title" className="mt-6 type-display-lg leading-[0.92]">
              What we <em className="text-brand">build</em>
            </h2>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4">
            <p className="text-lg text-smoke">
              Four kinds of work, one standard. Choose a category to see how we approach it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-14 md:mt-20">
          <ul className="flex flex-col gap-4 lg:h-[660px] lg:flex-row lg:gap-0">
            {CATEGORIES.map((c, i) => {
              const isActive = active === i;
              return (
                <li
                  key={c.id}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "relative h-[440px] overflow-hidden bg-ink text-paper transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] lg:h-auto lg:min-w-0 lg:basis-0",
                    isActive ? "lg:grow-[3.4]" : "lg:grow-[1]",
                    i > 0 && "lg:border-l lg:border-paper/25"
                  )}
                >
                  <Link
                    to={`/projects?type=${c.id}`}
                    onFocus={() => setActive(i)}
                    aria-label={`${c.title} projects`}
                    className="group absolute inset-0 block"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]",
                        !isActive && "lg:scale-[1.12]"
                      )}
                    >
                      <Img photo={c.photo} sizes="(min-width:1024px) 50vw, 100vw" widths={[600, 900, 1400]} />
                    </div>
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 transition-colors duration-700",
                        isActive
                          ? "bg-gradient-to-t from-ink/85 via-ink/15 to-ink/30"
                          : "bg-gradient-to-t from-ink/80 via-ink/35 to-ink/50 lg:bg-ink/55"
                      )}
                    />

                    <span className="absolute left-6 top-6 type-label text-paper/80 md:left-8 md:top-8">
                      {c.n}
                    </span>

                    {/* collapsed label (desktop only) */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-8 left-7 hidden text-3xl font-bold uppercase leading-none transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 font-display lg:block",
                        isActive ? "opacity-0" : "opacity-100 delay-300"
                      )}
                    >
                      {c.title}
                    </span>

                    {/* expanded content */}
                    <div
                      className={cn(
                        "absolute inset-x-0 bottom-0 p-6 transition-all duration-700 md:p-8 lg:w-[34rem] lg:max-w-full",
                        isActive
                          ? "translate-y-0 opacity-100 lg:delay-300"
                          : "lg:pointer-events-none lg:translate-y-4 lg:opacity-0"
                      )}
                    >
                      <h3 className="font-display text-[1.8rem] uppercase leading-[0.98] md:text-[2.6rem] xl:text-5xl">{c.title}</h3>
                      <p className="mt-4 max-w-sm text-paper/85">{c.text}</p>
                      <span className="mt-6 inline-flex items-center gap-3 border-b border-paper/60 pb-1 type-label">
                        View projects
                        <Arrow className="group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
