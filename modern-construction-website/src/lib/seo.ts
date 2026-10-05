import { useEffect } from "react";

export const SITE = {
  name: "Modern Construction and Projects",
  shortName: "Modern Construction",
  url: "https://modernconstructionprojects.info",
  phone: "+263 773 277 541",
  phoneHref: "tel:+263773277541",
  phoneE164: "+263773277541",
  email: "Sales@modernconstructionprojects.info",
  tagline: "Construction & Civil Engineering",
  logo: "https://modernconstructionprojects.info/brand/logo.png",
  defaultImage: "https://modernconstructionprojects.info/og-image.jpg",
};

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export const absUrl = (path: string) => (path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`);

/** Filled during prerendering so the build can write per-page <head> tags. */
export const serverHead: { current: SeoInput | null } = { current: null };

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(input: SeoInput) {
  if (typeof window === "undefined") serverHead.current = input;
  const { title, description, path, image, jsonLd, noindex } = input;
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const url = absUrl(path);
    const img = image || SITE.defaultImage;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.getElementById("route-jsonld")?.remove();
    if (ld) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = "route-jsonld";
      s.text = ld;
      document.head.appendChild(s);
    }
  }, [title, description, path, image, ld, noindex]);
}

/** Builds the <head> markup for a prerendered page. */
export function renderHead(h: SeoInput) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const url = absUrl(h.path);
  const img = h.image || SITE.defaultImage;
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
  ];
  if (h.jsonLd)
    tags.push(
      `<script type="application/ld+json" id="route-jsonld">${JSON.stringify(h.jsonLd).replace(/</g, "\\u003c")}</script>`
    );
  return tags.join("\n    ");
}

/** BreadcrumbList structured data for an interior page. */
export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absUrl(c.path),
  })),
});
