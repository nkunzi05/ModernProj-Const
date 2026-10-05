/**
 * ALL EDITABLE CONTENT LIVES IN src/data.
 *
 * - Only facts supplied by the business are stated as fact: name, location
 *   (Zimbabwe), phone, email, and the residential / commercial focus.
 * - `STATS` and `TESTIMONIALS` are intentionally empty. The sections that use
 *   them hide (stats) or show an honest empty state (testimonials) until real,
 *   verified data is added.
 * - Project entries in projects.ts are marked `placeholder: true`.
 */

/**
 * A photo is either a Pexels stock image (`id`) or a company photo stored in
 * /public/photos (`src` = file name without extension; a "-640" copy exists
 * for small screens). Company photos come first wherever they fit.
 */
export interface Photo {
  id?: number;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Pexels CDN helper (responsive widths, compressed). */
export const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Best single URL for a photo (used for social previews and <img src>). */
export const photoUrl = (p: Photo, w = 1200) => (p.src ? `/photos/${p.src}.jpg` : px(p.id!, w));

/** Company project photography (upscaled from the originals supplied). */
export const OWN = {
  modernHome: {
    src: "home-grey-modern",
    alt: "Completed single-storey home with charcoal-grey plastered walls, black window frames and a gravel forecourt",
    width: 1128,
    height: 808,
  },
  compactHome: {
    src: "home-grey-compact",
    alt: "Completed compact grey family home with a covered front stoop and sliding glass doors",
    width: 1128,
    height: 808,
  },
  homeRender: {
    src: "home-design-render",
    alt: "3D design render of a family home with a split butterfly roof, double garage and landscaped entrance",
    width: 1128,
    height: 808,
  },
  officeBlock: {
    src: "office-block",
    alt: "Multi-storey glass and concrete office block with a stone-clad retaining wall and visitor parking",
    width: 1128,
    height: 808,
  },
  steelCladCommercial: {
    src: "commercial-steel-clad",
    alt: "Steel-clad commercial unit with a glazed double-height reception entrance and marked parking bays",
    width: 1200,
    height: 800,
  },
  steelFrame: {
    src: "steel-frame-warehouse",
    alt: "Structural steel portal frame for a warehouse under construction, with roof purlins in place",
    width: 1128,
    height: 808,
  },
  housingFoundations: {
    src: "housing-foundations",
    alt: "Brick foundation walls for new housing units under construction, with completed double-storey units behind",
    width: 1128,
    height: 808,
  },
} satisfies Record<string, Photo>;

export const IMG = {
  hero: { id: 30661412, alt: "Construction workers in safety gear on scaffolding against a clear sky" },
  masvingo: { id: 30956783, alt: "Looking up the face of a high-rise building in Masvingo, Zimbabwe" },
  concrete: { id: 11312129, alt: "Minimalist concrete building facade with large windows and clean lines" },
  home: { id: 1127119, alt: "Contemporary house with large windows and a garden in warm afternoon light" },
  balconies: { id: 17499698, alt: "Sunlit building facade with balconies and deep window shadows" },
  yellowHouse: { id: 39491209, alt: "Modern house with a bold sculpted exterior" },
  suburbanHome: { id: 29324698, alt: "Modern family home with a wide driveway, garage and outdoor seating" },
  officeConcrete: { id: 9473066, alt: "Concrete office building facade with a regular rhythm of windows" },
  officeLow: { id: 4534504, alt: "Contemporary concrete office buildings seen from below against a clear sky" },
  officeGlass: { id: 5233311, alt: "Glass and concrete commercial building viewed from a low angle" },
  overpass: { id: 7107980, alt: "Concrete roadway overpass and pillars against a blue sky" },
  bridgeCranes: { id: 39584148, alt: "Cable-stayed bridge under construction with cranes against the sky" },
  bridgeAerial: { id: 32569685, alt: "Aerial view of an unfinished bridge structure during construction" },
  housingAerial: { id: 33326698, alt: "Aerial view of a planned residential area with mature greenery" },
  foundation: { id: 39893047, alt: "Aerial view of a concrete building foundation under construction" },
  siteWorkers: { id: 15458299, alt: "Workers on a sunlit concrete foundation under a clear blue sky" },
  scaffold2: { id: 30661413, alt: "Construction workers wearing safety gear on scaffolding" },
  rebarBW: { id: 39208824, alt: "Black and white view of stacked rebar on a construction site with a worker" },
  rebarWall: { id: 16001335, alt: "Weathered concrete wall with exposed reinforcing steel" },
  bricklaying: { id: 19688828, alt: "Hands laying bricks with mortar, close up of masonry work" },
  ceiling: { id: 6474129, alt: "Worker finishing a ceiling inside a building" },
  plasterboard: { id: 11427405, alt: "Worker in gloves cutting plasterboard for interior installation" },
  laserLevel: { id: 6473973, alt: "Laser level marking walls at an indoor construction site" },
  renovation: { id: 30592258, alt: "Workers renovating an interior space with tools and safety gear" },
  architect: { id: 7937758, alt: "Site professional in a hard hat inspecting a glass door in a new house" },
  framework: { id: 39869453, alt: "Worker on a construction site beside a steel framework" },
} satisfies Record<string, Photo>;

export const NAV = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

export type CategoryId = "residential" | "commercial" | "civil" | "development";

export const CATEGORIES: {
  id: CategoryId;
  n: string;
  title: string;
  short: string;
  text: string;
  photo: Photo;
}[] = [
  {
    id: "residential",
    n: "01",
    title: "Residential",
    short: "Residential",
    text: "Homes designed around how people actually live.",
    photo: OWN.modernHome,
  },
  {
    id: "commercial",
    n: "02",
    title: "Commercial",
    short: "Commercial",
    text: "Practical, durable spaces designed for business and growth.",
    photo: OWN.officeBlock,
  },
  {
    id: "civil",
    n: "03",
    title: "Civil & Infrastructure",
    short: "Civil",
    text: "Engineering and construction work built around performance, safety and longevity.",
    photo: IMG.bridgeCranes,
  },
  {
    id: "development",
    n: "04",
    title: "Development Projects",
    short: "Development",
    text: "From early planning through construction and completion.",
    photo: OWN.housingFoundations,
  },
];

export interface Service {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  applications: string[];
  photo: Photo;
}

export const SERVICES: Service[] = [
  {
    slug: "building-construction",
    name: "Building Construction",
    blurb: "New buildings, built as one coordinated job.",
    description:
      "From foundations to finishes, we build structures with a single point of accountability, so trades, materials and programme are managed together rather than chased separately.",
    applications: ["New homes", "Offices and retail space", "Extensions and additions"],
    photo: OWN.steelFrame,
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    blurb: "The works that carry everything else.",
    description:
      "Engineering-led construction where performance, safety and longevity matter most: the groundworks and structural elements that a project depends on.",
    applications: ["Site preparation and groundworks", "Drainage and hardstanding", "Structural concrete elements"],
    photo: IMG.bridgeAerial,
  },
  {
    slug: "residential-construction",
    name: "Residential Construction",
    blurb: "Homes built for the way you live.",
    description:
      "Comfortable, durable homes shaped around your family, your plot and your budget. We keep you informed from the first brief through to handover.",
    applications: ["Family homes", "Housing for rent or sale", "Home extensions"],
    photo: OWN.compactHome,
  },
  {
    slug: "commercial-construction",
    name: "Commercial Construction",
    blurb: "Spaces that work as hard as the business inside.",
    description:
      "Practical, durable commercial buildings designed around operations, growth and the cost of keeping them running.",
    applications: ["Offices", "Retail premises", "Business and service buildings"],
    photo: OWN.steelCladCommercial,
  },
  {
    slug: "concrete-construction",
    name: "Concrete Construction",
    blurb: "Structure, formed and finished with care.",
    description:
      "Reinforced and structural concrete work executed with attention to setting out, reinforcement and finish quality.",
    applications: ["Foundations and slabs", "Columns, beams and structural frames", "Exposed concrete finishes"],
    photo: IMG.rebarWall,
  },
  {
    slug: "ceiling-installation",
    name: "Ceiling Installation",
    blurb: "Clean lines overhead.",
    description:
      "Ceiling installation for new buildings and refurbishments, set out accurately and finished neatly.",
    applications: ["Homes", "Offices and commercial interiors", "Refurbishment projects"],
    photo: IMG.ceiling,
  },
  {
    slug: "renovation-refurbishment",
    name: "Renovation & Refurbishment",
    blurb: "Give an existing building a second life.",
    description:
      "Upgrading, repairing and reworking existing buildings, planned so the new work fits the old and disruption is kept in check.",
    applications: ["Home renovations", "Commercial refurbishments", "Interior reconfiguration"],
    photo: IMG.renovation,
  },
  {
    slug: "project-management",
    name: "Project Management",
    blurb: "One team keeping scope, time and cost in view.",
    description:
      "Structured management of the whole build: scope, programme, subcontractors, site quality and reporting back to you.",
    applications: ["Managed builds", "Multi-trade projects", "Clients who want a clear point of contact"],
    photo: IMG.architect,
  },
  {
    slug: "construction-consulting",
    name: "Construction Consulting",
    blurb: "Clear advice before you commit.",
    description:
      "Practical input on feasibility, scope, sequencing and buildability, so decisions are made with the facts in front of you.",
    applications: ["Early-stage planning", "Scope and budget reviews", "Site and buildability questions"],
    photo: OWN.homeRender,
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "Discover",
    lead: "Understand the client's goals, site, budget and requirements.",
    text: "We listen first, review the site and write down what a successful project looks like for you.",
    photo: IMG.architect,
  },
  {
    n: "02",
    title: "Plan",
    lead: "Develop the project strategy, scope, timelines and technical requirements.",
    text: "Scope, sequence and budget are agreed on paper before anyone breaks ground.",
    photo: IMG.laserLevel,
  },
  {
    n: "03",
    title: "Design & Engineer",
    lead: "Coordinate the technical and construction requirements necessary to move forward.",
    text: "Drawings, engineering input and construction detail are brought together so the build is resolved before it starts.",
    photo: OWN.homeRender,
  },
  {
    n: "04",
    title: "Build",
    lead: "Execute the project with structured project management and quality control.",
    text: "Work on site is organised, checked and reported on, with clear communication throughout.",
    photo: OWN.housingFoundations,
  },
  {
    n: "05",
    title: "Complete",
    lead: "Deliver the completed project and ensure the final work meets the agreed requirements.",
    text: "We walk the finished work with you against what was agreed, and close out outstanding items.",
    photo: OWN.modernHome,
  },
];

export const PRINCIPLES = [
  { n: "01", title: "Quality", text: "Work built to perform beyond completion." },
  { n: "02", title: "Accountability", text: "Clear communication and responsible project execution." },
  { n: "03", title: "Precision", text: "Attention to technical and construction detail." },
  { n: "04", title: "Long-term value", text: "Building with durability and practical value in mind." },
];

/**
 * VERIFIED COMPANY STATISTICS ONLY.
 * Leave empty to hide the section. Example:
 *   { value: 12, suffix: "", label: "Projects completed" }
 */
export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}
export const STATS: Stat[] = [];

/**
 * REAL CLIENT TESTIMONIALS ONLY (with permission). Example:
 *   { quote: "…", name: "Client name", project: "Residential build, Harare" }
 */
export interface Testimonial {
  quote: string;
  name: string;
  project: string;
}
export const TESTIMONIALS: Testimonial[] = [];

export const PROJECT_TYPE_OPTIONS = [
  "Residential",
  "Commercial",
  "Civil & Infrastructure",
  "Development project",
  "Renovation & Refurbishment",
  "Not sure yet",
];

export const BUDGET_OPTIONS = [
  "Under US$25,000",
  "US$25,000 – US$100,000",
  "US$100,000 – US$500,000",
  "Over US$500,000",
  "Prefer to discuss",
];

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Still planning / flexible",
];
