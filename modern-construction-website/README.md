# Modern Construction and Projects — website

React + Vite + Tailwind. Every page is prerendered to static HTML for search engines.

## Commands
- `npm install` — install
- `npm run dev` — local development
- `npm run build` — builds to `dist/` (client build → server render → one HTML file per page + sitemap.xml)

## Deploying (Vercel)
`vercel.json` is included: build command `npm run build`, output `dist`, clean URLs.
Point the domain modernconstructionprojects.info at the project, then submit
`https://modernconstructionprojects.info/sitemap.xml` in Google Search Console.

## Editing content
All text, services, projects and contact details live in `src/data/` and `src/lib/seo.ts`.
The six projects in `src/data/projects.ts` are samples (`placeholder: true`, hidden from Google).
Replace them with real work and set `placeholder: false`; they are added to the sitemap automatically.

## Enquiry form
Sends through FormSubmit to the address in `src/lib/seo.ts`. The first submission sends an
activation email to that inbox that must be confirmed once. Attachments: one file, 5 MB max.

See DESIGN_SYSTEM.md for colours, type and components.
