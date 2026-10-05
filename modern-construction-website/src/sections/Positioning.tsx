import { IMG } from "../data/site";
import { Container, Eyebrow, Reveal, RevealImg, TextLink } from "../components/ui";

export function Positioning({ showLink = true }: { showLink?: boolean }) {
  return (
    <section aria-labelledby="about-title" className="overflow-hidden bg-sand py-24 md:py-40">
      <Container>
        <Reveal>
          <Eyebrow className="text-smoke">About us</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2
            id="about-title"
            className="mt-8 max-w-[18ch] type-display-lg leading-[0.95]"
          >
            We don&rsquo;t just build structures. <em className="text-brand">We build what comes next.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4 md:pt-10">
            <Reveal>
              <p className="text-lg leading-relaxed md:text-xl">
                Modern Construction and Projects is a construction and civil engineering company working across Zimbabwe. We build homes and
                commercial spaces, and we take responsibility for the whole job: the engineering, the programme, the
                site and the finish.
              </p>
              <p className="mt-6 leading-relaxed text-smoke">
                One accountable team, straight answers and work that is built to last well beyond handover.
              </p>
              {showLink && (
                <div className="mt-8">
                  <TextLink to="/about">More about us</TextLink>
                </div>
              )}
            </Reveal>
          </div>
          <div className="group md:col-span-8">
            <RevealImg
              photo={IMG.concrete}
              className="aspect-[4/3] md:aspect-[16/11]"
              sizes="(min-width:768px) 66vw, 100vw"
              widths={[800, 1280, 1920]}
            />
            <p className="mt-3 text-sm text-smoke">Concrete, steel and glass. Honest materials, resolved in detail.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
