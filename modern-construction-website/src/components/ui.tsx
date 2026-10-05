import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { Link } from "../lib/router";
import { useInView } from "../lib/hooks";
import { px, type Photo } from "../data/site";
import { cn } from "../utils/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("mx-auto w-full max-w-[1600px] px-5 md:px-10 xl:px-16", className)}>{children}</Tag>;
}

/** Fade / slide-in on first view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Responsive photo with srcset. `object-fit: cover`. */
export function Img({
  photo,
  sizes = "100vw",
  widths = [480, 800, 1200, 1800, 2400],
  priority = false,
  className,
}: {
  photo: Photo;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  className?: string;
}) {
  const local = photo.src;
  const src = local ? `/photos/${local}.jpg` : px(photo.id!, 1200);
  const srcSet = local
    ? `/photos/${local}-640.jpg 640w, /photos/${local}.jpg ${photo.width ?? 1128}w`
    : widths.map((w) => `${px(photo.id!, w)} ${w}w`).join(", ");
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

/** Image that wipes in on scroll. Parent should set a `group` for hover zoom. */
export function RevealImg({
  photo,
  className,
  sizes,
  widths,
  delay = 0,
  zoom = true,
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  widths?: number[];
  delay?: number;
  zoom?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 });
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-ink/5", className)}>
      <div
        className={cn("img-reveal absolute inset-0", inView && "is-in")}
        style={{ "--d": `${delay}ms` } as CSSProperties}
      >
        <div className="img-reveal-inner">
          <Img
            photo={photo}
            sizes={sizes}
            widths={widths}
            className={cn(zoom && "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]")}
          />
        </div>
      </div>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 shrink-0 transition-transform duration-500 ease-out", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

type Variant = "dark" | "light" | "brand" | "outline" | "outlineLight";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-paper border-ink hover:bg-brand hover:border-brand",
  light: "bg-paper text-ink border-paper hover:bg-sand hover:border-sand",
  brand: "bg-brand text-paper border-brand hover:bg-ink hover:border-ink",
  outline: "border-ink text-ink hover:bg-ink hover:text-paper",
  outlineLight: "border-paper/60 text-paper hover:bg-paper hover:text-ink hover:border-paper",
};

export function Button({
  to,
  children,
  variant = "dark",
  className,
  arrow = true,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-h-[54px] items-center justify-center gap-3 border px-7 type-action transition-colors duration-300",
        variants[variant],
        className
      )}
    >
      {children}
      {arrow && <Arrow className="group-hover:translate-x-1" />}
    </Link>
  );
}

export function TextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-3 type-action",
        className
      )}
    >
      <span className="link-u pb-1">{children}</span>
      <Arrow className="group-hover:translate-x-1.5" />
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 type-label",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Opening block for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ink/15 pt-36 pb-14 md:pt-48 md:pb-20">
      <Container>
        <Eyebrow className="text-smoke fade-up">{eyebrow}</Eyebrow>
        <h1
          className="fade-up mt-8 max-w-[18ch] type-display-xl leading-[0.92]"
          style={{ "--d": "120ms" } as CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="fade-up mt-10 max-w-xl text-lg leading-relaxed text-smoke md:text-xl"
            style={{ "--d": "260ms" } as CSSProperties}
          >
            {intro}
          </p>
        )}
        {children}
      </Container>
    </header>
  );
}
