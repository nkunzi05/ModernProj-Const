import type { CSSProperties } from "react";
import { Link, useRoute } from "../lib/router";
import { useSeo, breadcrumbs } from "../lib/seo";
import { CATEGORIES } from "../data/site";
import { PROJECTS, getProject } from "../data/projects";
import { Container, Eyebrow, PageHeader, Reveal, RevealImg, Img } from "../components/ui";
import { PortfolioGrid } from "../sections/Portfolio";
import { CtaBand } from "../sections/CtaBand";
import { cn } from "../utils/cn";
import NotFound from "./NotFound";
import { photoUrl } from "../data/site";
import { SITE } from "../lib/seo";

const absPhoto = (ph: Parameters<typeof photoUrl>[0]) => {
  const u = photoUrl(ph);
  return u.startsWith("/") ? `${SITE.url}${u}` : u;
};

export function ProjectsPage() {
  const { query } = useRoute();
  const type = query.get("type");
  const cat = CATEGORIES.find((c) => c.id === type);
  const list = cat ? PROJECTS.filter((p) => p.category === cat.id) : PROJECTS;

  useSeo({
    title: cat
      ? `${cat.title} Projects in Zimbabwe | Modern Construction`
      : "Construction Projects in Zimbabwe | Modern Construction",
    description: cat
      ? `${cat.title} construction projects by Modern Construction and Projects in Zimbabwe. ${cat.text}`
      : "Residential, commercial, civil and development projects by Modern Construction and Projects, a construction and civil engineering company in Zimbabwe.",
    path: type && cat ? `/projects?type=${cat.id}` : "/projects",
    jsonLd: breadcrumbs([{ name: "Projects", path: "/projects" }]),
  });

  const tabs = [{ id: "all", title: "All projects" }, ...CATEGORIES.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          cat ? (
            <>
              {cat.title} <em className="text-brand">projects</em>
            </>
          ) : (
            <>
              Our <em className="text-brand">work</em>
            </>
          )
        }
        intro={cat ? cat.text : "Residential, commercial, civil and development projects, organised by the kind of work they involve."}
      />
      <section aria-label="Project portfolio" className="bg-paper pb-24 pt-8 md:pb-36">
        <Container>
          <nav aria-label="Filter projects" className="no-scrollbar -mx-5 mb-12 flex gap-8 overflow-x-auto border-b border-ink/15 px-5 md:mx-0 md:mb-20 md:px-0">
            {tabs.map((t) => {
              const on = (t.id === "all" && !cat) || t.id === cat?.id;
              return (
                <Link
                  key={t.id}
                  to={t.id === "all" ? "/projects" : `/projects?type=${t.id}`}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "-mb-px shrink-0 whitespace-nowrap border-b-2 py-4 type-label transition-colors",
                    on ? "border-brand text-ink" : "border-transparent text-smoke hover:text-ink"
                  )}
                >
                  {t.title}
                </Link>
              );
            })}
          </nav>
          {list.length ? (
            <PortfolioGrid key={type ?? "all"} projects={list} />
          ) : (
            <p className="py-20 text-lg text-smoke">No projects in this category yet.</p>
          )}
          <p className="mt-16 max-w-xl border-t border-ink/15 pt-6 text-sm text-smoke">
            Projects marked &ldquo;Write-up coming&rdquo; show our own site photography; full case-study details
            are being added. Where a project has no photos of its own yet, stock imagery is used for illustration.
          </p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

const detailRows = (p: NonNullable<ReturnType<typeof getProject>>) => [
  { k: "Location", v: p.location },
  { k: "Project type", v: `${CATEGORIES.find((c) => c.id === p.category)?.title} / ${p.typeLabel}` },
  { k: "Scope", v: p.scope },
  { k: "Status", v: p.status },
  { k: "Year", v: p.year },
];

export function ProjectDetail({ slug }: { slug: string }) {
  const p = getProject(slug);
  useSeo({
    title: p ? `${p.name} | Modern Construction` : "Project not found | Modern Construction",
    description: p ? p.summary : "This project could not be found.",
    path: `/projects/${slug}`,
    image: p ? absPhoto(p.hero) : undefined,
    noindex: !p || p.placeholder,
    jsonLd: p
      ? breadcrumbs([
          { name: "Projects", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ])
      : undefined,
  });
  if (!p) return <NotFound />;

  const cat = CATEGORIES.find((c) => c.id === p.category)!;
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const rows = detailRows(p);

  return (
    <>
      <header className="pt-32 md:pt-44">
        <Container>
          <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-3 type-label text-smoke">
            <Link to="/projects" className="link-u py-2">
              Projects
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              {p.name}
            </span>
          </nav>
          <h1
            className="fade-up mt-8 type-display-xl leading-[0.9]"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            {p.name}
          </h1>
          <dl
            className="fade-up mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 md:grid-cols-4"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            {[
              { k: "Location", v: p.location },
              { k: "Project type", v: cat.title },
              { k: "Type", v: p.typeLabel },
              { k: "Year", v: p.year },
            ].map((m) => (
              <div key={m.k}>
                <dt className="type-label text-smoke">{m.k}</dt>
                <dd className="mt-1 font-display text-2xl">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <Container className="mt-12 md:mt-16">
          <div className="group">
            <RevealImg
              photo={p.hero}
              className="aspect-[4/3] md:aspect-[16/8]"
              sizes="(min-width:1600px) 1500px, 100vw"
              widths={[800, 1280, 1920, 2560]}
              zoom={false}
            />
          </div>
        </Container>
        {p.placeholder && (
          <Container className="mt-6">
            <p className="border-l-2 border-brand bg-sand px-5 py-4 text-sm text-smoke">
              <strong className="text-ink">Write-up coming.</strong> The text below is placeholder content showing the
              structure of a finished case study; the full details of this project are being added.
            </p>
          </Container>
        )}
      </header>

      <article className="bg-paper py-20 md:py-32">
        <Container>
          {[
            { label: "Project overview", body: p.summary, big: true },
            { label: "The brief", body: p.brief },
            { label: "The approach", body: p.approach },
          ].map((s) => (
            <Reveal key={s.label} className="grid gap-5 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
              <h2 className="type-label text-smoke md:col-span-4">
                {s.label}
              </h2>
              <p
                className={cn(
                  "md:col-span-7",
                  s.big ? "font-display text-[1.55rem] font-medium leading-[1.22] md:text-4xl" : "max-w-2xl text-lg leading-relaxed md:text-xl"
                )}
              >
                {s.body}
              </p>
            </Reveal>
          ))}

          <Reveal className="grid gap-5 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
            <h2 className="type-label text-smoke md:col-span-4">
              The work
            </h2>
            <ul className="md:col-span-7">
              {p.work.map((w, i) => (
                <li key={i} className="flex gap-6 border-b border-ink/10 py-4 text-lg first:pt-0 last:border-b-0">
                  <span className="font-display text-2xl text-brand">0{i + 1}</span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="grid gap-5 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14">
            <h2 className="type-label text-smoke md:col-span-4">
              Project details
            </h2>
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 md:col-span-7">
              {rows.map((r) => (
                <div key={r.k} className="border-b border-ink/10 pb-4">
                  <dt className="type-label text-smoke">{r.k}</dt>
                  <dd className="mt-1 text-lg">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>

        <Container className="mt-10">
          <h2 className="sr-only">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            <div className="group md:col-span-7">
              <RevealImg photo={p.gallery[0]} className="aspect-[4/3]" sizes="(min-width:768px) 58vw, 100vw" widths={[600, 900, 1400, 1900]} />
            </div>
            <div className="group md:col-span-5 md:mt-24">
              <RevealImg photo={p.gallery[1]} className="aspect-[4/5]" sizes="(min-width:768px) 41vw, 100vw" widths={[600, 900, 1400]} delay={120} />
            </div>
            <div className="group md:col-span-12">
              <RevealImg photo={p.gallery[2]} className="aspect-[4/3] md:aspect-[21/9]" sizes="100vw" widths={[800, 1280, 1920, 2560]} />
            </div>
          </div>
        </Container>

        <Container className="mt-24 md:mt-36">
          <Reveal className="grid gap-5 md:grid-cols-12">
            <Eyebrow className="text-smoke md:col-span-4">Final outcome</Eyebrow>
            <p className="font-display text-[1.55rem] font-medium leading-[1.22] md:col-span-8 md:text-4xl">{p.outcome}</p>
          </Reveal>
        </Container>
      </article>

      <section aria-label="Next project" className="border-t border-ink/15 bg-sand">
        <Container>
          <Link to={`/projects/${next.slug}`} className="group grid items-center gap-8 py-14 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
              <p className="type-label text-smoke">Next project</p>
              <p className="mt-3 font-display text-4xl leading-none md:text-6xl">{next.name}</p>
              <span className="mt-6 inline-flex items-center gap-3 type-action">
                View project <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
              </span>
            </div>
            <div className="aspect-[16/9] overflow-hidden md:col-span-7 md:col-start-6">
              <Img photo={next.hero} sizes="(min-width:768px) 58vw, 100vw" widths={[600, 900, 1400]} className="transition-transform duration-[1400ms] group-hover:scale-105" />
            </div>
          </Link>
        </Container>
      </section>

      <CtaBand title="Discuss your project" text="Share the basics of what you're planning and we'll come back to you with the next step." cta="Discuss your project" />
    </>
  );
}
