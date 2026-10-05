import { Link } from "../lib/router";
import { PROJECTS, type Project } from "../data/projects";
import { CATEGORIES } from "../data/site";
import { Arrow, Container, Eyebrow, RevealImg, Reveal, TextLink } from "../components/ui";
import { cn } from "../utils/cn";

const PATTERN = [
  { col: "md:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { col: "md:col-span-5", aspect: "aspect-[4/5]", offset: "md:mt-28" },
  { col: "md:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { col: "md:col-span-7", aspect: "aspect-[4/3]", offset: "md:mt-28" },
  { col: "md:col-span-8", aspect: "aspect-[16/10]", offset: "" },
  { col: "md:col-span-4", aspect: "aspect-[4/5]", offset: "md:mt-24" },
];

export function ProjectCard({ project, slot, className }: { project: Project; slot: number; className?: string }) {
  const pat = PATTERN[slot % PATTERN.length];
  const cat = CATEGORIES.find((c) => c.id === project.category)!;
  return (
    <Reveal className={cn(pat.col, pat.offset, className)}>
      <Link to={`/projects/${project.slug}`} className="group block" aria-label={`${project.name}, ${project.typeLabel}`}>
        <div className="relative">
          <RevealImg
            photo={project.hero}
            className={pat.aspect}
            sizes="(min-width:768px) 58vw, 100vw"
            widths={[600, 900, 1400, 1900]}
          />
          {project.placeholder && (
            <span className="absolute left-4 top-4 bg-paper/90 px-2.5 py-1 type-label text-ink">
              Write-up coming
            </span>
          )}
          {/* hover info (pointer devices) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/75 to-transparent p-6 pt-16 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:[@media(hover:hover)]:block"
          >
            <span className="inline-flex translate-y-2 items-center gap-3 type-label transition-transform duration-500 group-hover:translate-y-0">
              View project <Arrow className="group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[2rem] leading-[1.05] md:text-4xl">{project.name}</h3>
            <p className="mt-2 type-label text-smoke">
              {cat.title} <span className="mx-1.5 text-bone">/</span> {project.location}{" "}
              <span className="mx-1.5 text-bone">/</span> {project.typeLabel}
            </p>
          </div>
          <Arrow className="mt-3 h-5 w-5 transition-all duration-500 group-hover:translate-x-2 group-hover:text-brand" />
        </div>
      </Link>
    </Reveal>
  );
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-16 xl:gap-x-10">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} slot={i} />
      ))}
    </div>
  );
}

export function PortfolioPreview() {
  return (
    <section aria-labelledby="portfolio-title" className="bg-paper py-24 md:py-36">
      <Container>
        <Reveal className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-smoke">Selected work</Eyebrow>
            <h2 id="portfolio-title" className="mt-6 type-display-lg leading-[0.92]">
              Projects, <em className="text-brand">up close</em>
            </h2>
          </div>
          <TextLink to="/projects">All projects</TextLink>
        </Reveal>
        <PortfolioGrid projects={PROJECTS.slice(0, 4)} />
        <div className="mt-20 flex justify-center md:mt-28">
          <Link
            to="/projects"
            className="group inline-flex min-h-[54px] items-center gap-3 border border-ink px-8 type-action transition-colors hover:bg-ink hover:text-paper"
          >
            Browse all projects <Arrow className="group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
