import { Link } from "../lib/router";
import { NAV } from "../data/site";
import { SITE } from "../lib/seo";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <Container className="pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src="/brand/logo-light.png"
              alt={SITE.name}
              width={596}
              height={202}
              loading="lazy"
              className="h-auto w-56 bg-transparent md:w-64"
            />
            <p className="mt-8 max-w-sm text-paper/70">
              Residential, commercial and civil construction across Zimbabwe.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="type-label text-paper/50">
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-u inline-block py-1.5 text-lg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="type-label text-paper/50">
              Contact
            </h2>
            <ul className="mt-5 space-y-5 text-lg">
              <li>
                <span className="block text-sm text-paper/50">Phone</span>
                <a href={SITE.phoneHref} className="link-u inline-block py-1">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="block text-sm text-paper/50">Email</span>
                <a href={`mailto:${SITE.email}`} className="link-u inline-block break-all py-1">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-8 inline-flex min-h-[50px] items-center border border-paper/50 px-6 type-action transition-colors hover:bg-paper hover:text-ink"
            >
              Start a project
            </Link>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none whitespace-nowrap font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-paper/[0.06] md:mt-28"
        >
          MODERN
        </p>

        <div className="flex flex-col gap-2 border-t border-paper/15 py-7 text-sm text-paper/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Construction &amp; Civil Engineering, Zimbabwe</p>
        </div>
      </Container>
    </footer>
  );
}
