import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { setServerUrl } from "./lib/router";
import { serverHead, renderHead } from "./lib/seo";
import { PROJECTS } from "./data/projects";

export const ROUTES = [
  "/",
  "/projects",
  "/services",
  "/about",
  "/process",
  "/testimonials",
  "/contact",
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
  "/404",
];

/** Routes listed in sitemap.xml (indexable only). */
export const SITEMAP = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.9", changefreq: "yearly" },
  { path: "/about", priority: "0.7", changefreq: "yearly" },
  { path: "/process", priority: "0.6", changefreq: "yearly" },
  { path: "/testimonials", priority: "0.5", changefreq: "monthly" },
  ...PROJECTS.filter((p) => !p.placeholder).map((p) => ({
    path: `/projects/${p.slug}`,
    priority: "0.7",
    changefreq: "yearly",
  })),
];

export function render(url: string) {
  setServerUrl(url);
  serverHead.current = null;
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
  return { html, head: serverHead.current ? renderHead(serverHead.current) : "" };
}
