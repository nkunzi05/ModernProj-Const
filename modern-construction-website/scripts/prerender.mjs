// Renders every route to static HTML so each page ships its own content,
// title, description, canonical URL and structured data.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render, ROUTES, SITEMAP } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

for (const url of ROUTES) {
  const { html, head } = render(url);
  const page = template.replace("<!--app-head-->", head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = url === "/" ? "index.html" : url === "/404" ? "404.html" : `${url.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log("prerendered", url.padEnd(36), "→", file);
}

const today = new Date().toISOString().slice(0, 10);
const SITE = "https://modernconstructionprojects.info";
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP.map(
  (s) =>
    `  <url><loc>${SITE}${s.path === "/" ? "/" : s.path}</loc><lastmod>${today}</lastmod><changefreq>${s.changefreq}</changefreq><priority>${s.priority}</priority></url>`
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), xml);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`sitemap.xml: ${SITEMAP.length} URLs`);
