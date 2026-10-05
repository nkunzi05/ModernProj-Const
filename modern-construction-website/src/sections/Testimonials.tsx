import { useState } from "react";
import { TESTIMONIALS } from "../data/site";
import { SITE } from "../lib/seo";
import { Container, Eyebrow, Reveal, TextLink } from "../components/ui";

export function Testimonials({ asPage = false }: { asPage?: boolean }) {
  const H = asPage ? "h1" : "h2";
  const [i, setI] = useState(0);
  const has = TESTIMONIALS.length > 0;
  const t = has ? TESTIMONIALS[i] : null;
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`My experience with ${SITE.name}`)}`;

  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-24 md:py-40">
      <Container>
        <Reveal>
          <Eyebrow className="text-smoke">Testimonials</Eyebrow>
        </Reveal>

        {t ? (
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <H id="testimonials-title" className="sr-only">
              What clients say
            </H>
            <div className="md:col-span-1">
              <span aria-hidden="true" className="font-display text-[6rem] leading-[0.6] text-brand md:text-[9rem]">
                &ldquo;
              </span>
            </div>
            <figure className="md:col-span-10">
              <blockquote
                key={i}
                className="fade-up font-display text-[clamp(1.56rem,3.59vw,3.59rem)] leading-[1.08]"
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 border-t border-ink/15 pt-5">
                <span className="block text-lg font-semibold">{t.name}</span>
                <span className="text-sm uppercase tracking-[0.16em] text-smoke">{t.project}</span>
              </figcaption>
              {TESTIMONIALS.length > 1 && (
                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="h-12 w-12 border border-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => setI((i + 1) % TESTIMONIALS.length)}
                    className="h-12 w-12 border border-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    &rarr;
                  </button>
                </div>
              )}
            </figure>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <H
                id="testimonials-title"
                className="type-display-lg leading-[0.94]"
              >
                Client words, <em className="text-brand">in their own voice.</em>
              </H>
            </Reveal>
            <Reveal delay={150} className="md:col-span-4 md:pt-6">
              <p className="text-lg leading-relaxed">
                We only publish feedback from clients who have agreed to it, with their name and the project it
                relates to. Our first testimonials will appear here.
              </p>
              <p className="mt-5 text-smoke">Built with us? We would be glad to hear how it went.</p>
              <div className="mt-6 flex flex-col items-start gap-1">
                <a
                  href={mailto}
                  className="group inline-flex min-h-[44px] items-center gap-3 type-action"
                >
                  <span className="link-u pb-1">Share your experience</span>
                </a>
                <TextLink to="/projects">Browse projects</TextLink>
              </div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
