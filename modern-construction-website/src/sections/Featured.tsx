import { PROJECTS } from "../data/projects";
import { Link } from "../lib/router";
import { Button, Container, Eyebrow, Reveal, RevealImg } from "../components/ui";

export function Featured() {
  const p = PROJECTS[0];
  const meta = [
    { k: "Location", v: p.location },
    { k: "Project type", v: `${p.typeLabel}, residential` },
    { k: "Scope", v: p.scope },
    { k: "Status", v: p.status },
  ];

  return (
    <section aria-labelledby="featured-title" className="bg-ink pt-24 text-paper md:pt-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <Eyebrow className="text-paper/60">Featured project</Eyebrow>
            <h2 id="featured-title" className="mt-6 type-display-xl leading-[0.9]">
              {p.name}
            </h2>
            <p className="mt-6 type-action text-paper/60">
              Residential / {p.location}
              {p.placeholder && <span className="ml-4 border border-paper/30 px-2 py-1 text-paper/70">Write-up coming</span>}
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4">
            <p className="text-lg leading-relaxed text-paper/75">{p.summary}</p>
            <Button to={`/projects/${p.slug}`} variant="light" className="mt-8">
              View project
            </Button>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-14 md:mt-20">
        <Link to={`/projects/${p.slug}`} className="group block" aria-label={`View project: ${p.name}`}>
          <RevealImg
            photo={p.hero}
            className="aspect-[4/3] md:aspect-[16/8]"
            sizes="(min-width:1600px) 1500px, 100vw"
            widths={[800, 1280, 1920, 2560]}
          />
        </Link>
      </Container>

      <Container className="pb-24 pt-14 md:pb-36 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <dl className="md:col-span-4">
            {meta.map((m) => (
              <Reveal key={m.k} className="border-t border-paper/20 py-5">
                <dt className="type-label text-paper/50">{m.k}</dt>
                <dd className="mt-1 font-display text-2xl">{m.v}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="grid grid-cols-2 gap-4 md:col-span-8 md:gap-6">
            <div className="group">
              <RevealImg photo={p.gallery[0]} className="aspect-[3/4]" sizes="(min-width:768px) 33vw, 50vw" delay={100} />
            </div>
            <div className="group mt-12 md:mt-24">
              <RevealImg photo={p.gallery[1]} className="aspect-[3/4]" sizes="(min-width:768px) 33vw, 50vw" delay={250} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
