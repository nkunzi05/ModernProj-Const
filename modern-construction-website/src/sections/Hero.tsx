import type { CSSProperties } from "react";
import { Link } from "../lib/router";
import { CATEGORIES, IMG } from "../data/site";
import { Button, Container, Img } from "../components/ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[620px] w-full flex-col overflow-hidden bg-ink text-paper">
      <div className="hero-zoom absolute inset-0">
        <Img photo={IMG.hero} priority sizes="100vw" widths={[800, 1280, 1920, 2560]} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/50" />

      <Container className="relative mt-auto pb-8 md:pb-12">
        <h1 className="max-w-[16ch] text-[clamp(2.1rem,9.6vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] md:text-[clamp(3.25rem,5.4vw,5.75rem)] md:leading-[1]">
          <span className="line-mask">
            <span style={d(150)}>Building</span>
          </span>
          <span className="line-mask">
            <span style={d(280)}>Zimbabwe&rsquo;s</span>
          </span>
          <span className="line-mask">
            <span style={d(410)}>
              <span className="max-md:block">Next</span> <span className="max-md:block">Generation.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <div className="fade-up max-w-md" style={d(900)}>
            <p className="text-base leading-relaxed text-paper/85 md:text-lg">
              Construction and civil engineering delivered with precision, accountability and long-term value.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="light">
                Start a project
              </Button>
              <Button to="/projects" variant="outlineLight" arrow={false}>
                View our work
              </Button>
            </div>
          </div>

          <div className="fade-up hidden items-center gap-4 md:flex" style={d(1200)} aria-hidden="true">
            <span className="type-label text-paper/70">Scroll</span>
            <span className="relative block h-14 w-px overflow-hidden bg-paper/25">
              <span className="scroll-line absolute inset-0 bg-paper" />
            </span>
          </div>
        </div>

        <nav
          aria-label="Project types"
          className="fade-up mt-10 hidden grid-cols-4 border-t border-paper/25 md:grid"
          style={d(1100)}
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/projects?type=${c.id}`}
              className="group flex items-center justify-between py-5 pr-6 type-label text-paper/80 transition-colors hover:text-paper"
            >
              <span>
                <span className="mr-3 text-paper/45">{c.n}</span>
                {c.title}
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">&rarr;</span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
