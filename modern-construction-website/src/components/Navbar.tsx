import { useEffect, useState } from "react";
import { Link, useRoute } from "../lib/router";
import { useScrolled } from "../lib/hooks";
import { NAV } from "../data/site";
import { SITE } from "../lib/seo";
import { cn } from "../utils/cn";

export function Navbar() {
  const { path } = useRoute();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overHero = path === "/" && !scrolled && !open;
  const light = overHero || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          overHero
            ? "border-b border-transparent bg-transparent text-paper"
            : open
              ? "border-b border-paper/15 bg-transparent text-paper"
              : "border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-md"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10 xl:px-16",
            scrolled ? "h-16" : "h-20 md:h-24"
          )}
        >
          <Link to="/" aria-label={`${SITE.name}, home`} className="flex min-h-[44px] shrink-0 items-center">
            <img
              src={light ? "/brand/logo-light.png" : "/brand/logo.png"}
              alt={SITE.name}
              width={596}
              height={202}
              className={cn(
                "w-auto bg-transparent transition-[height] duration-500",
                scrolled ? "h-10 md:h-11" : "h-11 md:h-14"
              )}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
            {NAV.map((item) => {
              const active = path === item.to || path.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className="link-u py-2 type-action"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={cn(
                "hidden min-h-[46px] items-center border px-6 type-action transition-colors duration-300 xl:inline-flex",
                light
                  ? "border-paper/70 hover:bg-paper hover:text-ink"
                  : "border-ink bg-ink text-paper hover:border-brand hover:bg-brand"
              )}
            >
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-12 w-12 items-center justify-center xl:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-500",
                    open ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-500",
                    open ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pt-28 pb-8 text-paper transition-[opacity,visibility] duration-500 xl:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              tabIndex={open ? 0 : -1}
              className={cn(
                "flex items-baseline justify-between border-b border-paper/15 py-4 font-display text-[2rem] font-bold leading-none transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <Link
            to="/contact"
            tabIndex={open ? 0 : -1}
            className="flex min-h-[58px] items-center justify-center bg-brand type-action hover:bg-brand-deep"
          >
            Start a project
          </Link>
          <div className="mt-8 space-y-1 text-sm text-paper/70">
            <a href={SITE.phoneHref} tabIndex={open ? 0 : -1} className="block py-1">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1} className="block py-1 break-all">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
